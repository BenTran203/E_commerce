/**
 * PAYMENTS CONTROLLER
 * 
 * Handles Stripe payment integration including:
 * - Creating payment intents
 * - Processing payments
 * - Handling webhooks
 * - Managing refunds
 */

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-07-30.basil',
})

/**
 * CREATE PAYMENT INTENT
 * POST /api/payments/create-intent
 */
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const { orderId } = req.body

    // Get order details
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: req.user.id
      }
    })

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe uses cents
      currency: order.currency.toLowerCase(),
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: req.user.id
      },
      automatic_payment_methods: {
        enabled: true
      }
    })

    res.status(200).json({
      status: 'success',
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    })

  } catch (error: any) {
    console.error('Create payment intent error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to create payment intent',
      error: error.message
    })
  }
}

/**
 * CONFIRM PAYMENT
 * POST /api/payments/confirm
 */
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const { paymentIntentId, orderId } = req.body

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        status: 'error',
        message: 'Payment not completed'
      })
    }

    // Get payment method details
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method as string
    )

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        status: 'PAID',
        paymentMethod: 'CARD',
        stripePaymentId: paymentIntent.id,
        stripeChargeId: paymentIntent.latest_charge as string,
        last4: paymentMethod.card?.last4,
        brand: paymentMethod.card?.brand,
        expiryMonth: paymentMethod.card?.exp_month,
        expiryYear: paymentMethod.card?.exp_year
      }
    })

    // Update order payment status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED'
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'Payment confirmed successfully',
      data: { payment }
    })

  } catch (error: any) {
    console.error('Confirm payment error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to confirm payment',
      error: error.message
    })
  }
}

/**
 * STRIPE WEBHOOK HANDLER
 * POST /api/payments/webhook
 */
export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await handlePaymentSuccess(paymentIntent)
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      await handlePaymentFailure(failedPayment)
      break

    case 'charge.refunded':
      const refund = event.data.object as Stripe.Charge
      await handleRefund(refund)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId

    if (!orderId) {
      console.error('Order ID not found in payment intent metadata')
      return
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED'
      }
    })

    console.log(`Payment successful for order ${orderId}`)

    // TODO: Send confirmation email
    // await sendOrderConfirmationEmail(orderId)

  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

/**
 * Handle payment failure
 */
async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId

    if (!orderId) {
      console.error('Order ID not found in payment intent metadata')
      return
    }

    // Create failed payment record
    await prisma.payment.create({
      data: {
        orderId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        status: 'FAILED',
        paymentMethod: 'CARD',
        stripePaymentId: paymentIntent.id,
        failureReason: paymentIntent.last_payment_error?.message,
        failureCode: paymentIntent.last_payment_error?.code
      }
    })

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'FAILED'
      }
    })

    console.log(`Payment failed for order ${orderId}`)

  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

/**
 * Handle refund
 */
async function handleRefund(charge: Stripe.Charge) {
  try {
    // Find payment by stripe charge ID
    const payment = await prisma.payment.findFirst({
      where: { stripeChargeId: charge.id }
    })

    if (!payment) {
      console.error('Payment not found for charge:', charge.id)
      return
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'REFUNDED' }
    })

    // Update order status
    await prisma.order.update({
      where: { id: payment.orderId },
      data: {
        paymentStatus: 'REFUNDED',
        status: 'REFUNDED'
      }
    })

    console.log(`Refund processed for order ${payment.orderId}`)

  } catch (error) {
    console.error('Error handling refund:', error)
  }
}

/**
 * CREATE REFUND
 * POST /api/payments/refund
 * Requires: ADMIN role
 */
export const createRefund = async (req: Request, res: Response) => {
  try {
    const { orderId, amount, reason } = req.body

    // Get order and payment
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        payments: {
          where: { status: 'PAID' },
          take: 1
        }
      }
    })

    if (!order || order.payments.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Order or payment not found'
      })
    }

    const payment = order.payments[0]

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: payment.stripePaymentId || '',
      amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
      reason: reason || 'requested_by_customer'
    })

    // Update payment status
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: refund.amount === payment.amount * 100 ? 'REFUNDED' : 'PARTIALLY_REFUNDED'
      }
    })

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: refund.amount === order.total * 100 ? 'REFUNDED' : 'PARTIALLY_REFUNDED',
        status: 'REFUNDED'
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'Refund processed successfully',
      data: { refund }
    })

  } catch (error: any) {
    console.error('Create refund error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to process refund',
      error: error.message
    })
  }
}

/**
 * GET PAYMENT METHODS
 * GET /api/payments/methods
 */
export const getPaymentMethods = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    // In a production app, you would store customer IDs and retrieve their payment methods
    // For now, return available payment methods
    res.status(200).json({
      status: 'success',
      data: {
        methods: ['card', 'apple_pay', 'google_pay']
      }
    })

  } catch (error: any) {
    console.error('Get payment methods error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch payment methods',
      error: error.message
    })
  }
}


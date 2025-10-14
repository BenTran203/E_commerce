import { Router } from 'express'
import {
  createPaymentIntent,
  confirmPayment,
  handleWebhook,
  createRefund,
  getPaymentMethods
} from '../controllers/payments'
import { authenticate, authorize } from '../middleware/auth'
import express from 'express'

const router = Router()

// Webhook route (must use raw body)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
)

// Protected routes
router.post('/create-intent', authenticate, createPaymentIntent)
router.post('/confirm', authenticate, confirmPayment)
router.get('/methods', authenticate, getPaymentMethods)

// Admin only
router.post('/refund', authenticate, authorize('ADMIN'), createRefund)

export default router


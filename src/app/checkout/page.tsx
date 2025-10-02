'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Link from 'next/link'
export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearAllItems } = useCart()
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const shippingCost = total > 100 ? 0 : 10
  const tax = total * 0.1
  const finalTotal = total + shippingCost + tax

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate shipping details
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      alert('Please fill in all required fields')
      return
    }
    setStep('payment')
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate payment details
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all payment details')
      return
    }
    
    // Simulate order placement
    setTimeout(() => {
      setStep('success')
      clearAllItems()
    }, 1500)
  }

  if (items.length === 0 && step !== 'success') {
    router.push('/cart')
    return null
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 md:p-12 max-w-md text-center shadow-lg"
        >
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-primary-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-primary-600 mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
          <Link href="/pages/shop">
  <Button className="w-full">
    Continue Shopping
  </Button>
</Link>
            <Button onClick={() => router.push('/orders')} variant="secondary" className="w-full">
              View Orders
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-8">
      <div className="container-luxury max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => step === 'payment' ? setStep('details') : router.push('/cart')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            {step === 'payment' ? 'Back to Shipping' : 'Back to Cart'}
          </button>
          <h1 className="text-3xl md:text-4xl font-serif text-primary-900">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'details' ? 'bg-primary-900 text-white' : 'bg-green-500 text-white'
              }`}>
                {step === 'details' ? '1' : '✓'}
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 bg-primary-200" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-primary-900 text-white' : 'bg-primary-200 text-primary-600'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === 'details' ? (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleContinueToPayment}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-serif text-primary-900 mb-6">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                  />
                  
                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={handleInputChange('city')}
                      required
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={handleInputChange('state')}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange('zipCode')}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-6">
                  Continue to Payment
                </Button>
              </motion.form>
            ) : (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePlaceOrder}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-serif text-primary-900 mb-6">Payment Information</h2>
                
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange('cardNumber')}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  
                  <Input
                    label="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange('cardName')}
                    placeholder="John Doe"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChange={handleInputChange('expiryDate')}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange('cvv')}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-primary-600 mt-6 p-4 bg-primary-50 rounded-lg">
                  <Lock size={16} />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <Button type="submit" size="lg" className="w-full mt-6 flex items-center justify-center gap-2">
                  <CreditCard size={20} />
                  Place Order - ${finalTotal.toFixed(2)}
                </Button>
              </motion.form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="text-xl font-serif text-primary-900 mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-primary-600">
                        Qty: {item.quantity} {item.size && `• ${item.size}`}
                      </p>
                      <p className="text-sm font-semibold text-primary-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-primary-200">
                <div className="flex justify-between text-primary-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-900 pt-2 border-t border-primary-200">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}


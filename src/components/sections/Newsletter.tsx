'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import { isValidEmail } from '@/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import toast from 'react-hot-toast'
import { withTranslation } from '@/utils/i18n/withTranslation'
import type { WithTranslationProps } from '@/utils/i18n/withTranslation'

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubscribed(true)
      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="section-spacing bg-primary-900 text-white">
      <div className="container-luxury">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white bg-opacity-10 p-4 rounded-full">
              <Mail size={32} className="text-white" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-semibold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Stay Inspired
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-lg text-primary-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join our community of style enthusiasts. Get exclusive access to new collections, 
            styling tips, and special offers delivered directly to your inbox.
          </motion.p>

          {/* Benefits */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Early Access',
                description: 'Be first to shop new arrivals and limited collections'
              },
              {
                title: 'Exclusive Offers',
                description: 'Receive subscriber-only discounts and special promotions'
              },
              {
                title: 'Style Guide',
                description: 'Expert styling tips and seasonal trend insights'
              }
            ].map((benefit, index) => (
              <div key={benefit.title} className="text-center">
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-primary-300">{benefit.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Newsletter Form */}
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-none text-white placeholder-primary-300 focus:outline-none focus:border-opacity-40 transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                  className="w-full bg-white text-primary-900 hover:bg-primary-100 py-4"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                </Button>
              </form>
            ) : (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 rounded-none p-6 mb-4">
                  <Check size={32} className="text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-400 mb-2">Welcome to Timeless!</h3>
                  <p className="text-sm text-primary-300">
                    You've been successfully subscribed to our newsletter.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-sm text-primary-400 hover:text-white transition-colors"
                >
                  Subscribe another email
                </button>
              </motion.div>
            )}

            <p className="text-xs text-primary-400 mt-4 leading-relaxed">
              By subscribing, you agree to receive marketing emails from Timeless. 
              You can unsubscribe at any time. View our{' '}
              <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter 
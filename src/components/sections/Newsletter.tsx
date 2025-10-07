'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import { isValidEmail } from '@/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const Newsletter: React.FC = () => {
  const { t } = useTranslation()
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
            {t('newsletter.title')}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-lg text-primary-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('newsletter.description')}
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
                title: t('newsletter.benefits.earlyAccess.title'),
                description: t('newsletter.benefits.earlyAccess.description')
              },
              {
                title: t('newsletter.benefits.exclusiveOffers.title'),
                description: t('newsletter.benefits.exclusiveOffers.description')
              },
              {
                title: t('newsletter.benefits.styleGuide.title'),
                description: t('newsletter.benefits.styleGuide.description')
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
                    placeholder={t('newsletter.placeholder')}
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
                  {isLoading ? t('newsletter.subscribing') : t('newsletter.subscribe')}
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
                  <h3 className="font-semibold text-green-400 mb-2">{t('newsletter.success.title')}</h3>
                  <p className="text-sm text-primary-300">
                    {t('newsletter.success.message')}
                  </p>
                </div>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-sm text-primary-400 hover:text-white transition-colors"
                >
                  {t('newsletter.success.another')}
                </button>
              </motion.div>
            )}

            <p className="text-xs text-primary-400 mt-4 leading-relaxed">
              {t('newsletter.disclaimer')}{' '}
              <a href="/privacy" className="underline hover:text-white">{t('newsletter.privacy')}</a>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter 
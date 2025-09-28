'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  agreeToTerms: z.boolean().refine(val => val, 'You must agree to our terms')
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours',
    value: 'hello@timeless.com',
    action: 'mailto:hello@timeless.com'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Fri from 8am to 6pm (GMT+7)',
    value: '+84 123 456 789',
    action: 'tel:+84123456789'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come visit our flagship store',
    value: 'Ho Chi Minh City, Vietnam',
    action: null
  }
]

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unworn items with original tags. Items must be in original condition.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Domestic shipping takes 2-3 business days. International shipping takes 5-10 business days depending on location.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide. Shipping costs and delivery times vary by destination.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can track your package on our website or the carrier\'s site.'
  }
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      agreeToTerms: false
    }
  })

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setValue('name', `${user.firstName} ${user.lastName}`)
      setValue('email', user.email)
    }
  }, [isAuthenticated, user, setValue])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form submitted:', data)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-primary-900 mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-primary-600 mb-6">
            Thank you for contacting us. We&apos;ll get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-luxury text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif text-primary-900 mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-600 max-w-2xl mx-auto"
          >
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow"
                >
                  <Icon size={48} className="text-primary-900 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-primary-600 text-sm mb-4">
                    {info.description}
                  </p>
                  {info.action ? (
                    <a
                      href={info.action}
                      className="text-primary-900 font-medium hover:text-primary-700 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-primary-900 font-medium">
                      {info.value}
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <h2 className="text-2xl font-serif text-primary-900 mb-6">
                Send us a Message
              </h2>
              
              {isAuthenticated && user && (
                <div className="bg-primary-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-primary-700">
                    ✨ We&apos;ve pre-filled your information since you&apos;re logged in!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Name *
                    </label>
                    <input
                      {...register('name')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-500' : 'border-primary-200'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-primary-200'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-primary-200'
                    }`}
                    placeholder="+84 123 456 789"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Subject *
                  </label>
                  <select
                    {...register('subject')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-primary-200'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Shipping Issue">Shipping Issue</option>
                    <option value="Return Request">Return Request</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.message ? 'border-red-500' : 'border-primary-200'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    {...register('agreeToTerms')}
                    type="checkbox"
                    className="mt-1 mr-2"
                  />
                  <label className="text-sm text-primary-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-primary-900 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-primary-900 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
                )}

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif text-primary-900 mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-primary-100 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary-50 transition-colors"
                    >
                      <span className="font-medium text-primary-900">
                        {faq.question}
                      </span>
                      <span className={`transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === index ? 'auto' : 0,
                        opacity: openFaq === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-primary-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary-900 text-white rounded-2xl">
                <h3 className="text-xl font-semibold mb-2">
                  Still have questions?
                </h3>
                <p className="text-primary-100 mb-4">
                  Can&apos;t find the answer you&apos;re looking for? Please chat with us.
                </p>
                <Button variant="secondary" size="sm">
                  Start Live Chat
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
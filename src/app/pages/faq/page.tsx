'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Search, ShoppingBag, Truck, CreditCard, RotateCcw, Package, User } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '@/components/ui/Input'

export default function FAQPage() {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'returns', name: 'Returns', icon: RotateCcw },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'account', name: 'Account', icon: User }
  ]

  const faqs = [
    {
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'Browse our collections, add items to your cart, and proceed to checkout. You\'ll need to create an account or sign in, provide shipping information, and complete payment to finalize your order.'
    },
    {
      category: 'orders',
      question: 'Can I modify or cancel my order after placing it?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service immediately if you need to make changes. Once an order has been processed for shipment, modifications are no longer possible.'
    },
    {
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.'
    },
    {
      category: 'shipping',
      question: 'What are your shipping options?',
      answer: 'We offer Standard (5-7 days, $10 or free over $100), Express (2-3 days, $25), and Next Day ($45) shipping. International shipping is available to over 25 countries with delivery in 7-14 business days.'
    },
    {
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship to over 25 countries worldwide. Shipping costs and delivery times vary by destination. Customs duties and taxes are the responsibility of the customer.'
    },
    {
      category: 'shipping',
      question: 'When will my order ship?',
      answer: 'Orders placed before 2 PM PST ship the same day. Orders placed after 2 PM or on weekends/holidays will ship the next business day.'
    },
    {
      category: 'shipping',
      question: 'My tracking shows my package is delayed. What should I do?',
      answer: 'Shipping delays can occasionally occur due to weather, carrier issues, or peak seasons. If your package is significantly delayed, please contact our customer service team with your tracking number for assistance.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached, unworn and unwashed. Return shipping is free for US customers.'
    },
    {
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'Log into your account, go to order history, and select the items you wish to return. Print the prepaid return label, pack the items securely, and drop off at any authorized shipping location.'
    },
    {
      category: 'returns',
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 5-10 business days after we receive and inspect your return. The refund will be issued to your original payment method.'
    },
    {
      category: 'returns',
      question: 'Can I exchange an item?',
      answer: 'Yes! Follow the return process for the original item and place a new order for the item you want. If there\'s a price difference, we\'ll either refund you or send a payment link.'
    },
    {
      category: 'returns',
      question: 'What items cannot be returned?',
      answer: 'Final sale items, intimate apparel, swimwear, personalized items, items without tags, used items, and gift cards cannot be returned.'
    },
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, PayPal, and Apple Pay.'
    },
    {
      category: 'payments',
      question: 'Is it safe to use my credit card on your site?',
      answer: 'Yes! We use industry-standard SSL encryption and secure payment gateways. We never store your complete credit card information on our servers.'
    },
    {
      category: 'payments',
      question: 'When will I be charged for my order?',
      answer: 'Your payment method is charged immediately when you place your order. If an item is out of stock or your order is cancelled, a full refund will be issued.'
    },
    {
      category: 'payments',
      question: 'Do you offer payment plans?',
      answer: 'Currently, we do not offer payment plans or financing options. Full payment is required at checkout.'
    },
    {
      category: 'products',
      question: 'How do I find my size?',
      answer: 'Check our detailed Size Guide page for comprehensive measurements and fit information. If you\'re between sizes, we recommend sizing up for a more comfortable fit.'
    },
    {
      category: 'products',
      question: 'Are your products true to size?',
      answer: 'Yes, our products generally run true to size. Each product page includes fit information and customer reviews that often mention sizing details.'
    },
    {
      category: 'products',
      question: 'How do I care for my items?',
      answer: 'Care instructions are included on the label of each garment. Generally, we recommend washing in cold water, hanging to dry, and following specific fabric care guidelines.'
    },
    {
      category: 'products',
      question: 'When will out-of-stock items be restocked?',
      answer: 'Restock dates vary by product. You can sign up for email notifications on product pages to be notified when items are back in stock.'
    },
    {
      category: 'account',
      question: 'Do I need an account to make a purchase?',
      answer: 'Yes, you need to create an account to complete a purchase. This allows you to track orders, save addresses, and easily manage returns.'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to create a new password.'
    },
    {
      category: 'account',
      question: 'Can I change my email address?',
      answer: 'Yes! Log into your account, go to Settings, and update your email address. You\'ll need to verify the new email address.'
    },
    {
      category: 'account',
      question: 'How do I update my shipping address?',
      answer: 'In your account settings, go to "Addresses" where you can add, edit, or remove shipping addresses. You can also update the address during checkout.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <HelpCircle size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t('Frequently Asked Questions')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            {t('Find answers to common questions about orders, shipping, returns, and more.')}
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b border-primary-100">
        <div className="container-luxury max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="pl-12 py-4 text-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white/50">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary-900 text-white shadow-lg'
                      : 'bg-white text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="container-luxury max-w-4xl">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle size={64} className="mx-auto text-primary-300 mb-4" />
              <h3 className="text-xl font-semibold text-primary-900 mb-2">No results found</h3>
              <p className="text-primary-600">
                Try adjusting your search or browse a different category.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-primary-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-primary-50/50 transition-colors"
                  >
                    <span className="font-semibold text-primary-900 pr-4">{faq.question}</span>
                    <span
                      className={`transform transition-transform text-primary-500 flex-shrink-0 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-primary-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary-900 text-white rounded-2xl p-8 md:p-12 text-center"
          >
            <HelpCircle size={48} className="mx-auto mb-4 text-primary-200" />
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Still Have Questions?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our customer service team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pages/contact"
                className="inline-block bg-white text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@timeless.com"
                className="inline-block bg-white/10 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Email Us
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-primary-200">
                <strong>Customer Service Hours:</strong> Monday - Friday, 9 AM - 6 PM PST
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-primary-50">
        <div className="container-luxury max-w-4xl">
          <h3 className="text-xl font-serif text-primary-900 mb-6 text-center">
            Helpful Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/pages/size-guide"
              className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <Package className="mx-auto mb-2 text-primary-900" size={24} />
              <p className="font-medium text-primary-900">Size Guide</p>
            </a>
            <a
              href="/pages/shipping-returns"
              className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <Truck className="mx-auto mb-2 text-primary-900" size={24} />
              <p className="font-medium text-primary-900">Shipping & Returns</p>
            </a>
            <a
              href="/pages/contact"
              className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <User className="mx-auto mb-2 text-primary-900" size={24} />
              <p className="font-medium text-primary-900">Contact Us</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}


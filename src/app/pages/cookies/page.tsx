'use client'

import { motion } from 'framer-motion'
import { Cookie, Settings, BarChart3, Target, Shield, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'

export default function CookiePolicyPage() {
  const { t } = useTranslation()
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: true,
    preferences: true
  })

  const cookieTypes = [
    {
      icon: Shield,
      name: t('legalPages.cookies.types.essential.name'),
      key: 'essential',
      required: true,
      description: t('legalPages.cookies.types.essential.description'),
      examples: [
        t('common.sessionManagement'),
        t('common.authenticationCookies'),
        t('common.securityCookies'),
        t('common.shoppingCartCookies')
      ]
    },
    {
      icon: BarChart3,
      name: t('legalPages.cookies.types.analytics.name'),
      key: 'analytics',
      required: false,
      description: t('legalPages.cookies.types.analytics.description'),
      examples: [
        'Google Analytics',
        t('common.pageViewTracking'),
        t('common.userBehaviorAnalysis'),
        t('common.performanceMonitoring')
      ]
    },
    {
      icon: Target,
      name: t('legalPages.cookies.types.marketing.name'),
      key: 'marketing',
      required: false,
      description: t('legalPages.cookies.types.marketing.description'),
      examples: [
        'Facebook Pixel',
        'Google Ads',
        t('common.retargetingCookies'),
        t('common.adPreferenceCookies')
      ]
    },
    {
      icon: Settings,
      name: t('legalPages.cookies.types.preference.name'),
      key: 'preferences',
      required: false,
      description: t('legalPages.cookies.types.preference.description'),
      examples: [
        t('common.languagePreferences'),
        t('common.themeSettings'),
        t('common.layoutCustomization'),
        t('common.regionCurrencySettings')
      ]
    }
  ]

  const handleToggle = (key: string) => {
    if (key !== 'essential') {
      setPreferences(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
    }
  }

  const handleSavePreferences = () => {
    // Save preferences to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    alert('Your cookie preferences have been saved!')
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    alert('All cookies have been accepted!')
  }

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    setPreferences(onlyEssential)
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential))
    alert('Only essential cookies are enabled.')
  }

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
            <Cookie size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t('legalPages.cookies.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            {t('legalPages.cookies.subtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm text-primary-300 mt-4"
          >
            {t('legalPages.lastUpdated', { date: 'October 14, 2025' })}
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-12"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-4">{t('legalPages.cookies.what.title')}</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.cookies.what.p1')}
            </p>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.cookies.what.p2')}
            </p>
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-sm text-primary-700">
                <strong>{t('common.yourControl')}:</strong> {t('legalPages.cookies.what.control')}
              </p>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif text-primary-900 mb-8 text-center"
            >
              {t('legalPages.cookies.types.title')}
            </motion.h2>

            {cookieTypes.map((type, index) => {
              const Icon = type.icon
              const isEnabled = preferences[type.key as keyof typeof preferences]
              
              return (
                <motion.div
                  key={type.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm mb-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-primary-900" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-serif text-primary-900">{type.name}</h3>
                          {type.required && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                              {t('legalPages.cookies.types.essential.required')}
                            </span>
                          )}
                        </div>
                        <p className="text-primary-600 leading-relaxed">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle(type.key)}
                        disabled={type.required}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          isEnabled ? 'bg-primary-900' : 'bg-gray-300'
                        } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            isEnabled ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pl-16">
                    <h4 className="text-sm font-semibold text-primary-800 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {type.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-primary-600 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Preference Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6 text-center">
              {t('legalPages.cookies.manage.title')}
            </h2>
            <p className="text-primary-600 text-center mb-6">
              {t('legalPages.cookies.manage.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleAcceptAll} size="lg" className="flex-1 sm:flex-none">
                {t('legalPages.cookies.manage.acceptAll')}
              </Button>
              <Button onClick={handleSavePreferences} variant="secondary" size="lg" className="flex-1 sm:flex-none">
                {t('legalPages.cookies.manage.savePreferences')}
              </Button>
              <Button onClick={handleRejectAll} variant="secondary" size="lg" className="flex-1 sm:flex-none">
                {t('legalPages.cookies.manage.rejectNonEssential')}
              </Button>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Third-Party Cookies</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These third parties may use cookies, web beacons, and other technologies to collect or receive information from our website and use that information to provide measurement services and targeted ads.
            </p>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary-900 mb-2">Third-party services we use include:</h4>
              <ul className="space-y-1 text-sm text-primary-700">
                <li>• Google Analytics for website analytics</li>
                <li>• Facebook Pixel for marketing and retargeting</li>
                <li>• Stripe and PayPal for payment processing</li>
                <li>• Mailchimp for email marketing</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <div className="flex items-start gap-4">
              <Trash2 className="text-primary-900 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h2 className="text-2xl font-serif text-primary-900 mb-4">How to Delete Cookies</h2>
                <p className="text-primary-600 leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1">Chrome</h4>
                    <p className="text-sm text-primary-600">Settings → Privacy and security → Cookies and other site data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1">Firefox</h4>
                    <p className="text-sm text-primary-600">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1">Safari</h4>
                    <p className="text-sm text-primary-600">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1">Edge</h4>
                    <p className="text-sm text-primary-600">Settings → Privacy, search, and services → Cookies and site permissions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Do Not Track Signals</h2>
            <p className="text-primary-600 leading-relaxed">
              Some browsers incorporate a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Tracking is not the same as using or collecting information in connection with a website. For these purposes, tracking refers to collecting personally identifiable information from consumers who use or visit a website or online service as they move across different websites over time. Currently, our website does not respond to DNT signals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Changes to This Policy</h2>
            <p className="text-primary-600 leading-relaxed">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date. You are advised to review this Cookie Policy periodically for any changes.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-primary-900 text-white rounded-2xl p-8 text-center"
          >
            <Cookie size={48} className="mx-auto mb-4 text-primary-200" />
            <h2 className="text-2xl font-serif mb-4">{t('common.questionsAboutCookies')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('legalPages.cookies.contact')}
            </p>
            <a
              href="mailto:privacy@timeless.com"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              privacy@timeless.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


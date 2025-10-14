'use client'

import { motion } from 'framer-motion'
import { FileText, Scale, ShoppingBag, CreditCard, AlertCircle, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function TermsOfServicePage() {
  const { t } = useTranslation()

  const sections = [
    {
      icon: Users,
      title: t('legalPages.terms.account.title'),
      content: [
        {
          subtitle: t('common.accountCreation'),
          text: t('legalPages.terms.account.creation')
        },
        {
          subtitle: t('common.accountResponsibilities'),
          text: t('legalPages.terms.account.responsibilities')
        },
        {
          subtitle: t('common.accountTermination'),
          text: t('legalPages.terms.account.termination')
        }
      ]
    },
    {
      icon: ShoppingBag,
      title: t('legalPages.terms.orders.title'),
      content: [
        {
          subtitle: t('common.productDescriptions'),
          text: t('legalPages.terms.orders.descriptions')
        },
        {
          subtitle: t('common.orderAcceptance'),
          text: t('legalPages.terms.orders.acceptance')
        },
        {
          subtitle: t('common.pricing'),
          text: t('legalPages.terms.orders.pricing')
        }
      ]
    },
    {
      icon: CreditCard,
      title: t('common.paymentTerms'),
      content: [
        {
          subtitle: t('common.paymentMethods'),
          text: t('common.paymentMethodsText')
        },
        {
          subtitle: t('common.paymentProcessing'),
          text: t('common.paymentProcessingText')
        },
        {
          subtitle: t('common.taxesAndFees'),
          text: t('common.taxesAndFeesText')
        }
      ]
    },
    {
      icon: Scale,
      title: t('common.returnsAndRefunds'),
      content: [
        {
          subtitle: t('common.returnPolicy'),
          text: t('common.returnPolicyText')
        },
        {
          subtitle: t('common.refundProcessing'),
          text: t('common.refundProcessingText')
        },
        {
          subtitle: t('common.exchanges'),
          text: t('common.exchangesText')
        }
      ]
    }
  ]

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
            <FileText size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t('legalPages.terms.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            {t('legalPages.terms.subtitle')}
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
            <h2 className="text-2xl font-serif text-primary-900 mb-4">{t('legalPages.terms.agreement.title')}</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.terms.agreement.p1')}
            </p>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.terms.agreement.p2')}
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-yellow-800">
                  <strong>{t('common.important')}:</strong> {t('legalPages.terms.agreement.important')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Sections */}
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm mb-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary-900" size={24} />
                  </div>
                  <h2 className="text-2xl font-serif text-primary-900">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-primary-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Intellectual Property</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              All content on our website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Timeless or its content suppliers and is protected by international copyright laws.
            </p>
            <p className="text-primary-600 leading-relaxed">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Prohibited Activities</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="space-y-2 text-primary-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Violating any applicable laws or regulations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Infringing on intellectual property rights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Transmitting viruses, malware, or other harmful code</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Attempting to gain unauthorized access to our systems</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Harassing, abusing, or harming other users</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Using automated systems to access the Services</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Limitation of Liability</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              To the maximum extent permitted by law, Timeless shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
            <p className="text-primary-600 leading-relaxed">
              Our total liability for any claims arising from or relating to these Terms or the Services shall not exceed the amount you paid to us in the twelve months preceding the claim.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Disclaimer of Warranties</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              Our Services are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="text-primary-600 leading-relaxed">
              We do not warrant that the Services will be uninterrupted, timely, secure, or error-free, or that defects will be corrected. We make no warranties about the accuracy, reliability, completeness, or timeliness of any content.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Governing Law</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
            <p className="text-primary-600 leading-relaxed">
              Any disputes arising from these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Changes to Terms</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the new Terms on our website and updating the "Last Updated" date.
            </p>
            <p className="text-primary-600 leading-relaxed">
              Your continued use of the Services after such modifications constitutes your acceptance of the updated Terms. If you do not agree to the modified Terms, you must stop using the Services.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-primary-900 text-white rounded-2xl p-8 text-center"
          >
            <Scale size={48} className="mx-auto mb-4 text-primary-200" />
            <h2 className="text-2xl font-serif mb-4">{t('common.questionsAboutTerms')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('legalPages.terms.contact')}
            </p>
            <a
              href="mailto:legal@timeless.com"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              legal@timeless.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


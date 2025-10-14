'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Mail, UserX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicyPage() {
  const { t } = useTranslation()

  const sections = [
    {
      icon: Database,
      title: t('legalPages.privacy.sections.collect.title'),
      content: [
        {
          subtitle: t('common.personalInfo'),
          text: t('legalPages.privacy.sections.collect.personal')
        },
        {
          subtitle: t('common.automaticInfo'),
          text: t('legalPages.privacy.sections.collect.automatic')
        },
        {
          subtitle: t('common.cookies'),
          text: t('legalPages.privacy.sections.collect.cookies')
        }
      ]
    },
    {
      icon: Eye,
      title: t('legalPages.privacy.sections.use.title'),
      content: [
        {
          subtitle: t('common.orderProcessing'),
          text: t('legalPages.privacy.sections.use.orders')
        },
        {
          subtitle: t('common.communication'),
          text: t('legalPages.privacy.sections.use.communication')
        },
        {
          subtitle: t('common.improvement'),
          text: t('legalPages.privacy.sections.use.improvement')
        },
        {
          subtitle: t('common.legalCompliance'),
          text: t('legalPages.privacy.sections.use.legal')
        }
      ]
    },
    {
      icon: Lock,
      title: t('legalPages.privacy.sections.security.title'),
      content: [
        {
          subtitle: t('common.securityMeasures'),
          text: t('legalPages.privacy.sections.security.measures')
        },
        {
          subtitle: t('common.paymentSecurity'),
          text: t('legalPages.privacy.sections.security.payment')
        },
        {
          subtitle: t('common.employeeAccess'),
          text: t('legalPages.privacy.sections.security.employee')
        }
      ]
    },
    {
      icon: UserX,
      title: t('legalPages.privacy.sections.rights.title'),
      content: [
        {
          subtitle: t('common.accessCorrection'),
          text: t('legalPages.privacy.sections.rights.access')
        },
        {
          subtitle: t('common.dataDeletion'),
          text: t('legalPages.privacy.sections.rights.deletion')
        },
        {
          subtitle: t('common.marketingOptOut'),
          text: t('legalPages.privacy.sections.rights.optout')
        },
        {
          subtitle: t('common.dataPortability'),
          text: t('legalPages.privacy.sections.rights.portability')
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
            <Shield size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t('legalPages.privacy.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            {t('legalPages.privacy.subtitle')}
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
            <h2 className="text-2xl font-serif text-primary-900 mb-4">{t('legalPages.privacy.intro.title')}</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.privacy.intro.p1')}
            </p>
            <p className="text-primary-600 leading-relaxed">
              {t('legalPages.privacy.intro.p2')}
            </p>
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

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">{t('legalPages.privacy.thirdParty.title')}</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.privacy.thirdParty.description')}
            </p>
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-sm text-primary-700">
                <strong>{t('common.thirdPartyServicesInclude')}:</strong> {t('legalPages.privacy.thirdParty.services')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">International Data Transfers</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.
            </p>
            <p className="text-primary-600 leading-relaxed">
              We take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy and no transfer of your personal data will take place unless there are adequate controls in place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Children's Privacy</h2>
            <p className="text-primary-600 leading-relaxed">
              Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so we can take necessary actions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Changes to This Policy</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>
            <p className="text-primary-600 leading-relaxed">
              You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-primary-900 text-white rounded-2xl p-8 text-center"
          >
            <Mail size={48} className="mx-auto mb-4 text-primary-200" />
            <h2 className="text-2xl font-serif mb-4">{t('common.questionsAboutPrivacy')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('legalPages.privacy.contact')}
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


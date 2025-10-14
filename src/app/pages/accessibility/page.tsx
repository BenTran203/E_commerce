'use client'

import { motion } from 'framer-motion'
import { Accessibility, Eye, Keyboard, Volume2, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'

export default function AccessibilityPage() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Keyboard,
      title: t('legalPages.accessibility.features.keyboard.title'),
      description: t('legalPages.accessibility.features.keyboard.description'),
      details: [
        t('common.tabThroughElements'),
        t('common.useEnterSpace'),
        t('common.navigateMenusArrows'),
        t('common.pressEscToClose')
      ]
    },
    {
      icon: Eye,
      title: t('legalPages.accessibility.features.screenReader.title'),
      description: t('legalPages.accessibility.features.screenReader.description'),
      details: [
        t('common.meaningfulAltText'),
        t('common.properHeadingHierarchy'),
        t('common.ariaLabels'),
        t('common.skipNavigation')
      ]
    },
    {
      icon: Eye,
      title: t('legalPages.accessibility.features.visual.title'),
      description: t('legalPages.accessibility.features.visual.description'),
      details: [
        t('common.wcagCompliant'),
        t('common.textResizable'),
        t('common.clearFocusIndicators'),
        t('common.noColorReliance')
      ]
    },
    {
      icon: Volume2,
      title: t('legalPages.accessibility.features.audio.title'),
      description: t('legalPages.accessibility.features.audio.description'),
      details: [
        t('common.closedCaptions'),
        t('common.transcriptsAvailable'),
        t('common.noAutoPlay'),
        t('common.volumeControlsAccessible')
      ]
    }
  ]

  const standards = [
    {
      name: 'WCAG 2.1 Level AA',
      description: t('legalPages.accessibility.standards.wcag'),
      status: t('legalPages.accessibility.standards.inProgress')
    },
    {
      name: 'ADA Compliance',
      description: t('legalPages.accessibility.standards.ada'),
      status: t('legalPages.accessibility.standards.inProgress')
    },
    {
      name: 'Section 508',
      description: t('legalPages.accessibility.standards.section508'),
      status: t('legalPages.accessibility.standards.inProgress')
    }
  ]

  const assistiveTech = [
    {
      category: t('legalPages.accessibility.assistiveTech.screenReaders'),
      tools: ['JAWS', 'NVDA', 'VoiceOver', 'TalkBack', 'Narrator']
    },
    {
      category: t('legalPages.accessibility.assistiveTech.browserExtensions'),
      tools: ['High Contrast Mode', 'Reader Mode', 'Voice Control', 'Zoom Extensions']
    },
    {
      category: t('legalPages.accessibility.assistiveTech.osFeatures'),
      tools: ['Windows Narrator', 'macOS VoiceOver', 'Android TalkBack', 'iOS VoiceOver']
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
            <Accessibility size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t('legalPages.accessibility.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            {t('legalPages.accessibility.subtitle')}
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

      {/* Commitment Section */}
      <section className="py-16">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-12"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-4">{t('legalPages.accessibility.commitment.title')}</h2>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.accessibility.commitment.p1')}
            </p>
            <p className="text-primary-600 leading-relaxed mb-4">
              {t('legalPages.accessibility.commitment.p2')}
            </p>
            <div className="flex items-start gap-3 bg-primary-50 p-4 rounded-lg">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-primary-700">
                {t('legalPages.accessibility.commitment.feedback')}
              </p>
            </div>
          </motion.div>

          {/* Accessibility Features */}
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif text-primary-900 mb-8 text-center"
            >
              {t('legalPages.accessibility.features.title')}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-primary-900" size={24} />
                      </div>
                      <h3 className="text-xl font-serif text-primary-900">{feature.title}</h3>
                    </div>
                    <p className="text-primary-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-primary-600">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Standards Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-12"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">{t('legalPages.accessibility.standards.title')}</h2>
            <p className="text-primary-600 mb-6">
              {t('legalPages.accessibility.standards.description')}
            </p>
            <div className="space-y-4">
              {standards.map((standard, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-primary-100 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-900 mb-1">{standard.name}</h3>
                    <p className="text-sm text-primary-600">{standard.description}</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {standard.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Assistive Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-12"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">{t('legalPages.accessibility.assistiveTech.title')}</h2>
            <p className="text-primary-600 mb-6">
              {t('legalPages.accessibility.assistiveTech.description')}
            </p>
            <div className="space-y-6">
              {assistiveTech.map((tech, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-primary-900 mb-3">{tech.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Limitations & Alternatives */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-2xl font-serif text-primary-900 mb-4">Known Limitations</h2>
                <p className="text-primary-600 mb-4">
                  Despite our best efforts, some content on our website may not yet be fully accessible. We are actively working to address these issues:
                </p>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-primary-600">Some older PDF documents may not be fully tagged for screen readers</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-primary-600">Third-party embedded content may not meet our accessibility standards</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-primary-600">Some complex interactive features are being enhanced for better accessibility</span>
              </li>
            </ul>
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-sm text-primary-700 mb-2">
                <strong>Need an alternative format?</strong>
              </p>
              <p className="text-sm text-primary-700">
                If you encounter content that is not accessible, please contact us. We will work with you to provide the information in an alternative format.
              </p>
            </div>
          </motion.div>

          {/* Browser Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-12"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Adjusting Your Browser Settings</h2>
            <p className="text-primary-600 mb-6">
              Most browsers allow you to adjust settings to improve accessibility:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-primary-100 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">Text Size</h3>
                <p className="text-sm text-primary-600">
                  Increase text size: Press <kbd className="px-2 py-1 bg-primary-100 rounded text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 bg-primary-100 rounded text-xs">+</kbd> (Windows) or <kbd className="px-2 py-1 bg-primary-100 rounded text-xs">Cmd</kbd> + <kbd className="px-2 py-1 bg-primary-100 rounded text-xs">+</kbd> (Mac)
                </p>
              </div>
              <div className="p-4 border border-primary-100 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">High Contrast</h3>
                <p className="text-sm text-primary-600">
                  Enable high contrast mode in your browser or operating system settings for better visibility
                </p>
              </div>
              <div className="p-4 border border-primary-100 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">Reader Mode</h3>
                <p className="text-sm text-primary-600">
                  Most browsers offer a reader mode that simplifies page layout and removes distractions
                </p>
              </div>
              <div className="p-4 border border-primary-100 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">Zoom</h3>
                <p className="text-sm text-primary-600">
                  Zoom entire page: Press <kbd className="px-2 py-1 bg-primary-100 rounded text-xs">Ctrl</kbd> + scroll wheel or use browser zoom controls
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testing & Evaluation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-12"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">Testing & Continuous Improvement</h2>
            <p className="text-primary-600 mb-4">
              We regularly evaluate our website's accessibility through:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-primary-600">Automated accessibility testing tools</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-primary-600">Manual testing with screen readers and keyboard navigation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-primary-600">User feedback from people with disabilities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-primary-600">Regular accessibility audits by third-party experts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-primary-600">Ongoing training for our development and content teams</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-primary-900 text-white rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <MessageSquare size={64} className="text-primary-200 flex-shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-serif mb-3">Feedback & Assistance</h2>
                <p className="text-primary-100 mb-4">
                  We welcome your feedback on the accessibility of our website. If you have difficulty accessing any content or feature, please let us know.
                </p>
                <div className="space-y-2 text-sm text-primary-100">
                  <p><strong>Email:</strong> accessibility@timeless.com</p>
                  <p><strong>Phone:</strong> +1 (800) 123-4567</p>
                  <p><strong>Response Time:</strong> We aim to respond within 2 business days</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="secondary" className="bg-white text-primary-900 hover:bg-primary-50">
                  Report an Issue
                </Button>
                <a href="/pages/contact">
                  <Button variant="secondary" className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-full">
                    Contact Support
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


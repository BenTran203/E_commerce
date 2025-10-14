'use client'

import { motion } from 'framer-motion'
import { Heart, Award, Users, Sparkles, Globe, Leaf } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()

const stats = [
  { labelKey: 'about.impact.stats.customers', value: '50K+', icon: Users },
  { labelKey: 'about.impact.stats.products', value: '200K+', icon: Award },
  { labelKey: 'about.impact.stats.countries', value: '25+', icon: Globe },
  { labelKey: 'about.impact.stats.years', value: '10+', icon: Sparkles }
]

const values = [
  {
    icon: Heart,
    titleKey: 'about.values.passion.title',
    descKey: 'about.values.passion.description'
  },
  {
    icon: Leaf,
    titleKey: 'about.values.sustainable.title',
    descKey: 'about.values.sustainable.description'
  },
  {
    icon: Users,
    titleKey: 'about.values.customer.title',
    descKey: 'about.values.customer.description'
  },
  {
    icon: Globe,
    titleKey: 'about.values.global.title',
    descKey: 'about.values.global.description'
  }
]
  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(250, 249, 246, 0.9), rgba(250, 249, 246, 0.9)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop")'
          }}
        />
        
        <div className="relative container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif text-primary-900 mb-6"
            >
              {t('about.hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-600 leading-relaxed"
            >
              {t('about.hero.description')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-6">
                {t('about.mission.title')}
              </h2>
              <p className="text-primary-600 text-lg mb-6 leading-relaxed">
                {t('about.mission.description1')}
              </p>
              <p className="text-primary-600 text-lg mb-8 leading-relaxed">
                {t('about.mission.description2')}
              </p>
              <Button size="lg"> <Link href="/pages/collections">{t('about.mission.cta')}</Link> </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1502355984-b735cb2550ce?q=80&w=1169&auto=format&fit=crop&"
                alt="Timeless craftsmanship"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <Heart className="text-red-500" size={24} />
                  <div>
                    <p className="font-semibold text-primary-900">{t('about.mission.badge.title')}</p>
                    <p className="text-sm text-primary-600">{t('about.mission.badge.since')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              {t('about.impact.title')}
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              {t('about.impact.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon size={48} className="mx-auto mb-4 text-primary-200" />
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-primary-200">{t(stat.labelKey)}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              {t('about.values.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <Icon size={48} className="text-primary-900 mb-4" />
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-primary-600 leading-relaxed">
                    {t(value.descKey)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white/50">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4">
              {t('about.journey.title')}
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              {t('about.journey.description')}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-primary-200"></div>
            
            {['2014', '2016', '2018', '2020', '2022', '2024'].map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <span className="text-primary-500 font-medium text-sm">{year}</span>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {t(`about.journey.timeline.${year}.title`)}
                    </h3>
                    <p className="text-primary-600">{t(`about.journey.timeline.${year}.description`)}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-900 rounded-full border-4 border-luxury-cream"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              {t('about.team.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Linh Nguyen',
                role: 'Founder & Creative Director',
                image: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
              },
              {
                name: 'David Chen',
                role: 'Head of Design',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop'
              },
              {
                name: 'Mai Tran',
                role: 'Sustainability Officer',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop'
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-primary-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
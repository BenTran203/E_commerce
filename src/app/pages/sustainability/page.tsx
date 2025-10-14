'use client'

import { motion } from 'framer-motion'
import { Leaf, Recycle, Droplet, Wind, Heart, Users, Award, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function SustainabilityPage() {
  const { t } = useTranslation()

  const commitments = [
    {
      icon: Recycle,
      title: 'Circular Fashion',
      description: 'We design products for longevity and recyclability, minimizing waste through innovative circular design principles.',
      stats: '85% recyclable materials'
    },
    {
      icon: Droplet,
      title: 'Water Conservation',
      description: 'Our manufacturing processes use 70% less water than industry standards through advanced water recycling systems.',
      stats: '70% less water usage'
    },
    {
      icon: Wind,
      title: 'Carbon Neutral',
      description: 'We offset 100% of our carbon emissions and are working towards becoming carbon negative by 2030.',
      stats: '100% carbon offset'
    },
    {
      icon: Users,
      title: 'Ethical Labor',
      description: 'Fair wages, safe working conditions, and respect for workers\' rights across our entire supply chain.',
      stats: 'Fair Trade certified'
    }
  ]

  const initiatives = [
    {
      year: '2024',
      title: 'Zero Waste Packaging',
      description: 'Launched 100% recyclable and compostable packaging across all products.',
      impact: '500 tons of plastic waste eliminated annually'
    },
    {
      year: '2023',
      title: 'Renewable Energy',
      description: 'Transitioned all facilities to 100% renewable energy sources.',
      impact: '2,000 tons of CO2 emissions reduced'
    },
    {
      year: '2022',
      title: 'Sustainable Materials',
      description: 'Introduced organic cotton and recycled fabric collections.',
      impact: '1 million kg of organic materials sourced'
    },
    {
      year: '2021',
      title: 'Supply Chain Transparency',
      description: 'Implemented full traceability system for all materials.',
      impact: '100% supplier transparency achieved'
    }
  ]

  const goals = [
    {
      year: '2026',
      goal: 'Carbon Negative Operations',
      description: 'Remove more carbon from the atmosphere than we emit through nature-based solutions and innovative technologies.'
    },
    {
      year: '2027',
      goal: 'Zero Landfill Waste',
      description: 'Achieve zero waste to landfill across all operations and product lifecycle through comprehensive recycling programs.'
    },
    {
      year: '2028',
      goal: '100% Sustainable Materials',
      description: 'Source all materials from sustainable, organic, or recycled sources with full supply chain certification.'
    },
    {
      year: '2030',
      goal: 'Industry Leadership',
      description: 'Set new industry standards for sustainable fashion and help 100+ brands transition to sustainable practices.'
    }
  ]

  const certifications = [
    'B Corporation Certified',
    'Fair Trade Certified',
    'GOTS (Global Organic Textile Standard)',
    'OEKO-TEX Standard 100',
    'Bluesign Certified',
    'Carbon Neutral Certified'
  ]

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.8), rgba(21, 128, 61, 0.9)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&h=1080&fit=crop")'
          }}
        />
        
        <div className="relative container-luxury text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Leaf size={64} className="mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            Our Commitment to Sustainability
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Building a better future through sustainable practices, ethical manufacturing, and environmental responsibility.
          </motion.p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center"
          >
            <h2 className="text-3xl font-serif text-primary-900 mb-6">Our Mission</h2>
            <p className="text-lg text-primary-600 leading-relaxed mb-6">
              At Timeless, we believe that fashion should never come at the cost of our planet or its people. We're committed to creating beautiful, high-quality products while minimizing our environmental impact and ensuring ethical practices throughout our supply chain.
            </p>
            <p className="text-primary-700 font-medium">
              "Sustainability isn't just part of our business—it's the foundation of everything we do."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Commitments */}
      <section className="py-16 bg-white/50">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-primary-900 mb-4">Our Commitments</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Four pillars guide our sustainability efforts and shape every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon
              return (
                <motion.div
                  key={commitment.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-green-700" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-primary-900 mb-3">{commitment.title}</h3>
                  <p className="text-primary-600 mb-4 leading-relaxed">{commitment.description}</p>
                  <div className="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-lg font-semibold text-sm">
                    {commitment.stats}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Initiatives Timeline */}
      <section className="py-16">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <TrendingUp size={48} className="mx-auto text-primary-900 mb-4" />
            <h2 className="text-3xl font-serif text-primary-900 mb-4">Our Progress</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Milestone achievements on our sustainability journey.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-green-200"></div>
            
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {initiative.year}
                    </span>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-primary-600 mb-3">{initiative.description}</p>
                    <p className="text-sm text-green-700 font-medium">
                      Impact: {initiative.impact}
                    </p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-luxury-cream"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-16 bg-white/50">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Award size={48} className="mx-auto text-primary-900 mb-4" />
            <h2 className="text-3xl font-serif text-primary-900 mb-4">Our 2030 Goals</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Ambitious targets that will transform our industry and protect our planet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-600"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-green-600">{goal.year}</span>
                  <h3 className="text-lg font-semibold text-primary-900">{goal.goal}</h3>
                </div>
                <p className="text-sm text-primary-600">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-3xl font-serif text-primary-900 mb-8 text-center">
              Certifications & Partnerships
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <p className="text-sm font-medium text-green-800 text-center">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Take Action */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container-luxury max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-serif mb-4">Join Us in Making a Difference</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Every purchase you make supports our sustainability initiatives. Together, we can create a more sustainable future for fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pages/shop"
                className="inline-block bg-white text-green-900 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                Shop Sustainable
              </a>
              <a
                href="/pages/contact"
                className="inline-block bg-white/10 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-4">
              Transparency & Accountability
            </h2>
            <p className="text-primary-600 mb-6">
              We believe in complete transparency about our sustainability practices. Download our annual sustainability report to see our detailed progress, challenges, and goals.
            </p>
            <button className="bg-primary-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors">
              Download 2025 Sustainability Report
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


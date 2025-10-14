'use client'

import { motion } from 'framer-motion'
import { Newspaper, Download, Mail, Image as ImageIcon, Award, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'

export default function PressPage() {
  const { t } = useTranslation()

  const pressReleases = [
    {
      date: 'October 1, 2025',
      title: 'Timeless Launches Sustainable Winter Collection',
      excerpt: 'New eco-friendly line features recycled materials and carbon-neutral production, setting new industry standards for sustainable fashion.',
      category: 'Product Launch'
    },
    {
      date: 'September 15, 2025',
      title: 'Timeless Expands to European Markets',
      excerpt: 'Company announces strategic expansion into 10 new European countries, bringing luxury sustainable fashion to international customers.',
      category: 'Business'
    },
    {
      date: 'August 20, 2025',
      title: 'Timeless Wins Fashion Innovation Award',
      excerpt: 'Recognized for groundbreaking use of sustainable materials and ethical manufacturing practices at the Global Fashion Summit.',
      category: 'Awards'
    },
    {
      date: 'July 5, 2025',
      title: 'Partnership with Environmental Organizations',
      excerpt: 'Timeless announces partnership with leading environmental groups to promote sustainable fashion and reduce industry carbon footprint.',
      category: 'Sustainability'
    }
  ]

  const mediaFeatures = [
    {
      outlet: 'Vogue',
      title: '"The Future of Sustainable Luxury Fashion"',
      date: 'September 2025',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop'
    },
    {
      outlet: 'Forbes',
      title: '"How Timeless is Revolutionizing E-Commerce"',
      date: 'August 2025',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop'
    },
    {
      outlet: 'Elle',
      title: '"10 Brands Leading the Sustainable Fashion Movement"',
      date: 'July 2025',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '25+', label: 'Countries Served' },
    { value: '200K+', label: 'Products Sold' },
    { value: '10+', label: 'Years Experience' }
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
            <Newspaper size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            Press & Media
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            Latest news, press releases, and media resources about Timeless.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-luxury max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-primary-900 mb-4">Latest Press Releases</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Stay updated with the latest news and announcements from Timeless.
            </p>
          </motion.div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center gap-4 mb-3 md:mb-0">
                    <span className="text-sm text-primary-500">{release.date}</span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-900 text-xs font-medium rounded-full">
                      {release.category}
                    </span>
                  </div>
                  <Button size="sm" variant="secondary" className="self-start md:self-auto">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
                <h3 className="text-2xl font-serif text-primary-900 mb-3">{release.title}</h3>
                <p className="text-primary-600 leading-relaxed">{release.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Features */}
      <section className="py-16 bg-white/50">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Award size={48} className="mx-auto text-primary-900 mb-4" />
            <h2 className="text-3xl font-serif text-primary-900 mb-4">Featured In</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              See what leading media outlets are saying about Timeless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={feature.image}
                  alt={feature.outlet}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm font-semibold text-primary-900 mb-2">
                    {feature.outlet}
                  </div>
                  <h3 className="text-lg font-serif text-primary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-primary-500">{feature.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-16">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <ImageIcon size={48} className="text-primary-900 mb-4" />
                <h2 className="text-3xl font-serif text-primary-900 mb-4">
                  Press Kit & Brand Assets
                </h2>
                <p className="text-primary-600 mb-6">
                  Download our comprehensive press kit including high-resolution logos, brand guidelines, product images, and company information.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-primary-600">
                    <TrendingUp size={16} className="mr-2 text-primary-500" />
                    <span>High-resolution logos (PNG, SVG, EPS)</span>
                  </div>
                  <div className="flex items-center text-sm text-primary-600">
                    <TrendingUp size={16} className="mr-2 text-primary-500" />
                    <span>Brand guidelines and color palettes</span>
                  </div>
                  <div className="flex items-center text-sm text-primary-600">
                    <TrendingUp size={16} className="mr-2 text-primary-500" />
                    <span>Product photography library</span>
                  </div>
                  <div className="flex items-center text-sm text-primary-600">
                    <TrendingUp size={16} className="mr-2 text-primary-500" />
                    <span>Company fact sheet and bios</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  <Download size={20} className="mr-2" />
                  Download Full Press Kit
                </Button>
                <Button variant="secondary" className="w-full" size="lg">
                  <ImageIcon size={20} className="mr-2" />
                  View Brand Guidelines
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Mail size={48} className="mx-auto mb-6 text-primary-200" />
            <h2 className="text-3xl font-serif mb-4">Media Inquiries</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              For press inquiries, interviews, or media requests, please contact our communications team.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="space-y-4 text-left">
                <div>
                  <p className="text-sm text-primary-300 mb-1">Press Contact</p>
                  <p className="font-semibold">Media Relations Team</p>
                </div>
                <div>
                  <p className="text-sm text-primary-300 mb-1">Email</p>
                  <a href="mailto:press@timeless.com" className="font-semibold hover:text-primary-200 transition-colors">
                    press@timeless.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-primary-300 mb-1">Phone</p>
                  <a href="tel:+18001234567" className="font-semibold hover:text-primary-200 transition-colors">
                    +1 (800) 123-4567
                  </a>
                </div>
                <div>
                  <p className="text-sm text-primary-300 mb-1">Response Time</p>
                  <p className="font-semibold">Within 24 hours</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-300 mt-6">
              Please allow 1-2 business days for media kit and asset requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm"
          >
            <Newspaper size={48} className="mx-auto text-primary-900 mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif text-primary-900 mb-4">
              Subscribe to Press Updates
            </h2>
            <p className="text-primary-600 mb-6 max-w-2xl mx-auto">
              Stay informed about our latest news, press releases, and media coverage. Subscribe to receive updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-primary-900"
              />
              <Button className="sm:w-auto">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


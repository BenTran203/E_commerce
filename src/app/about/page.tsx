'use client'

import { motion } from 'framer-motion'
import { Heart, Award, Users, Sparkles, Globe, Leaf } from 'lucide-react'
import Button from '@/components/ui/Button'

const stats = [
  { label: 'Happy Customers', value: '50K+', icon: Users },
  { label: 'Products Sold', value: '200K+', icon: Award },
  { label: 'Countries', value: '25+', icon: Globe },
  { label: 'Years of Excellence', value: '10+', icon: Sparkles }
]

const values = [
  {
    icon: Heart,
    title: 'Passion for Quality',
    description: 'Every piece in our collection is carefully selected for its exceptional quality, craftsmanship, and attention to detail.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Fashion',
    description: 'We believe in responsible fashion that respects both people and the planet, choosing eco-friendly materials and ethical practices.'
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Our customers are at the heart of everything we do. We strive to exceed expectations and build lasting relationships.'
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Celebrating diversity and connecting fashion lovers worldwide through shared appreciation for timeless style.'
  }
]

const timeline = [
  {
    year: '2014',
    title: 'The Beginning',
    description: 'Founded with a vision to make premium fashion accessible to everyone, starting from a small studio in Vietnam.'
  },
  {
    year: '2016',
    title: 'First Collection',
    description: 'Launched our signature Vietnamese Heritage collection, blending traditional craftsmanship with modern design.'
  },
  {
    year: '2018',
    title: 'International Expansion',
    description: 'Expanded to serve customers across Asia, bringing our unique aesthetic to a broader audience.'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Embraced e-commerce and digital innovation, making our collections available worldwide.'
  },
  {
    year: '2022',
    title: 'Sustainable Initiative',
    description: 'Launched our sustainability program, partnering with eco-friendly suppliers and supporting local artisans.'
  },
  {
    year: '2024',
    title: 'Today',
    description: 'Continuing to evolve and innovate while staying true to our core values of quality, authenticity, and style.'
  }
]

export default function AboutPage() {
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
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-600 leading-relaxed"
            >
              Born from a passion for timeless elegance and authentic craftsmanship, 
              Timeless represents more than fashion—it&apos;s a celebration of heritage, 
              quality, and the art of thoughtful design.
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
                Crafting Timeless Elegance
              </h2>
              <p className="text-primary-600 text-lg mb-6 leading-relaxed">
                At Timeless, we believe that true style transcends seasonal trends. 
                Our mission is to curate and create pieces that embody lasting elegance, 
                superior quality, and authentic craftsmanship.
              </p>
              <p className="text-primary-600 text-lg mb-8 leading-relaxed">
                Each item in our collection tells a story—of skilled artisans, 
                premium materials, and a commitment to excellence that spans generations. 
                We&apos;re not just selling clothing; we&apos;re preserving traditions and 
                celebrating the art of fine fashion.
              </p>
              <Button size="lg">Explore Our Collections</Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&auto=format&fit=crop"
                alt="Timeless craftsmanship"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <Heart className="text-red-500" size={24} />
                  <div>
                    <p className="font-semibold text-primary-900">Made with Love</p>
                    <p className="text-sm text-primary-600">Since 2014</p>
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
              Our Impact
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and the trust our customers place in us
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon size={48} className="mx-auto mb-4 text-primary-200" />
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-primary-200">{stat.label}</p>
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
              Our Values
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every product we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <Icon size={48} className="text-primary-900 mb-4" />
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-primary-600 leading-relaxed">
                    {value.description}
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
              Our Journey
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              From humble beginnings to global recognition—the milestones that shaped our story
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-primary-200"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <span className="text-primary-500 font-medium text-sm">{item.year}</span>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary-600">{item.description}</p>
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
              The Team Behind Timeless
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Meet the passionate individuals who bring our vision to life every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Linh Nguyen',
                role: 'Founder & Creative Director',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop'
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

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Join Our Story
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Become part of the Timeless community and discover fashion that 
              celebrates authenticity, quality, and timeless style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Shop Collections
              </Button>
              <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-primary-900">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
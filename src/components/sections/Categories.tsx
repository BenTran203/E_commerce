'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
  itemCount: number
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Essentials',
      slug: 'essentials',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
      description: 'Timeless basics that form the foundation of every wardrobe',
      itemCount: 0,
    },
    {
      id: '2',
      name: 'Outerwear',
      slug: 'outerwear',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop',
      description: 'Sophisticated layers for every season and occasion',
      itemCount: 0,
    },
    {
      id: '3',
      name: 'Formal',
      slug: 'formal',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
      description: 'Elegant pieces for professional and special occasions',
      itemCount: 0,
    },
    {
      id: '4',
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop',
      description: 'Carefully curated accessories to complete your look',
      itemCount: 0,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="section-spacing bg-white">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Explore our carefully curated collections, each designed to complement your unique style and lifestyle.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/shop/${category.slug}`}>
                <div className="relative overflow-hidden bg-primary-50 aspect-[3/4] mb-4">
                  {/* Category Image */}
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  
                  {/* Hover text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="text-primary-600 p-2 shadow-luxury bg-white/80 rounded">
                      <span>Look for more</span>
                    </div>
                  </div>
                </div>

                {/* Category Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary-600 leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-xs text-primary-500 font-medium">
                    {category.itemCount} items
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/shop" 
            className="inline-flex items-center text-primary-700 hover:text-primary-900 font-medium group transition-colors duration-200"
          >
            View All Products
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Categories 
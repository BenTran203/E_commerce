'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/utils'
import Button from '@/components/ui/Button'

const FeaturedProducts: React.FC = () => {
  const { featuredProducts, fetchFeaturedProducts, isLoading } = useProducts()
  const { addItem } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const productsToShow = 4 // Number of products to show at once

  useEffect(() => {
    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])

  // Auto-rotate products every 3 seconds
  useEffect(() => {
    if (featuredProducts.length > productsToShow) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 1 >= featuredProducts.length ? 0 : prevIndex + 1
        )
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [featuredProducts.length])

  // Get current visible products
  const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + productsToShow)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  if (isLoading) {
    return (
      <section className="section-spacing bg-luxury-sand">
        <div className="container-luxury">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-primary-200 rounded w-64 mx-auto mb-4" />
              <div className="h-4 bg-primary-200 rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-spacing bg-luxury-sand overflow-hidden">
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
            Featured Collection
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Handpicked pieces that embody our commitment to quality, style, and timeless appeal.
          </p>
        </motion.div>

        {/* Products Grid with Animation */}
        <div className="relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div 
              key={currentIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {visibleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="group"
                >
                  <div className="card-luxury p-0 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.images[0]?.url || '/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Sale Badge */}
                      {product.isOnSale && product.salePercentage && (
                        <div className="absolute top-4 left-4 bg-primary-900 text-white px-3 py-1 text-sm font-medium">
                          -{product.salePercentage}%
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <button className="bg-white p-2 shadow-luxury hover:shadow-luxury-lg transition-shadow">
                          <Heart size={18} className="text-primary-700 hover:text-red-500 transition-colors" />
                        </button>
                        <button 
                          onClick={() => addItem(product)}
                          className="bg-white p-2 shadow-luxury hover:shadow-luxury-lg transition-shadow"
                        >
                          <ShoppingBag size={18} className="text-primary-700 hover:text-primary-900 transition-colors" />
                        </button>
                      </div>

                      {/* Quick Shop Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-95 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Link href={`/products/${product.id}`}>
                          <Button variant="secondary" size="sm" fullWidth>
                            Quick View
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-primary-900 mb-2 hover:text-primary-700 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-primary-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-primary-600">
                          ({product.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-semibold text-primary-900">
                          {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-primary-500 line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Available Colors */}
                      {product.colors.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-primary-600">Colors:</span>
                          <div className="flex space-x-1">
                            {product.colors.slice(0, 4).map((color) => (
                              <div
                                key={color.id}
                                className="w-4 h-4 rounded-full border border-primary-200"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                            {product.colors.length > 4 && (
                              <span className="text-xs text-primary-500">
                                +{product.colors.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(featuredProducts.length / productsToShow) }).map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / productsToShow) === idx 
                  ? 'bg-primary-900' 
                  : 'bg-primary-300'
              }`}
              onClick={() => setCurrentIndex(idx * productsToShow)}
            />
          ))}
        </div>

        {/* View All Products Link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/shop">
            <Button variant="secondary" size="lg">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts
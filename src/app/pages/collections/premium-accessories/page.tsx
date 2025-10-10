'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Heart, Star, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import productsData from '@/data/products.json'
import { useTranslation } from 'react-i18next'
import { getProductName, getProductDescription } from '@/utils/productTranslation'

const collectionSlug = 'premium-accessories'
const collection = productsData.collections.find(c => c.slug === collectionSlug)
const collectionProducts = productsData.products.filter(p => 
  collection?.productIds.includes(p.id)
)

export default function PremiumAccessoriesPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${collection?.image}")`,
          }}
        />
        
        <div className="relative container-luxury text-center text-white">
          <Link href="/pages/collections" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>{t('collectionPages.backToCollections')}</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Sparkles size={48} className="mx-auto text-yellow-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            {t('collectionPages.premiumAccessories.name')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-white/90"
          >
            {t('collectionPages.premiumAccessories.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              {collectionProducts.length} {t('collectionPages.luxuryItems')}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collectionProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {product.isOnSale && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        -{product.salePercentage}%
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors">
                        <Heart size={18} className="text-primary-900" />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-3 left-3 bg-primary-900/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                      Premium
                    </div>
                  </div>
                </Link>
                
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-primary-500 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-serif text-primary-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-1">
                      {getProductName(product.id, product.name, t)}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                    {getProductDescription(product.id, product.description, t)}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.isOnSale && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <Button className="w-full group">
                    <ShoppingCart size={18} className="mr-2" />
                    {t('collectionPages.addToCart')}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Features */}
      <section className="py-16 bg-white/50">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-8 bg-white rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-primary-900" size={28} />
              </div>
              <h3 className="text-xl font-serif text-primary-900 mb-2">{t('collectionPages.premiumAccessories.features.craftsmanship.title')}</h3>
              <p className="text-primary-600">
                {t('collectionPages.premiumAccessories.features.craftsmanship.description')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8 bg-white rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary-900" size={28} />
              </div>
              <h3 className="text-xl font-serif text-primary-900 mb-2">{t('collectionPages.premiumAccessories.features.statement.title')}</h3>
              <p className="text-primary-600">
                {t('collectionPages.premiumAccessories.features.statement.description')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8 bg-white rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary-900" size={28} />
              </div>
              <h3 className="text-xl font-serif text-primary-900 mb-2">{t('collectionPages.premiumAccessories.features.investment.title')}</h3>
              <p className="text-primary-600">
                {t('collectionPages.premiumAccessories.features.investment.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-16">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
            </div>
            <div className="relative z-10">
              <Sparkles size={40} className="mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                {t('collectionPages.premiumAccessories.gift.title')}
              </h2>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                {t('collectionPages.premiumAccessories.gift.description')}
              </p>
              <Button variant="secondary" className="bg-white text-primary-900 hover:bg-primary-50">
                {t('collectionPages.premiumAccessories.gift.button')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


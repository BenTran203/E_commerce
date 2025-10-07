'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import productsData from '@/data/products.json'
import { Product } from '@/types'
import { useTranslation } from 'react-i18next'
import { getProductName, getProductDescription, getCategoryName, getBrandName } from '@/utils/productTranslation'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { t } = useTranslation()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details')
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    // Find the product by ID
    const foundProduct = productsData.products.find(p => p.id === params.id) as Product | undefined
    
    if (foundProduct) {
      setProduct(foundProduct)
      
      // Set default selections
      if (foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0].id)
      }
      if (foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0].id)
      }

      // Get related products from same category
      const related = productsData.products
        .filter(p => 
          p.id !== foundProduct.id && 
          p.category.id === foundProduct.category.id
        )
        .slice(0, 4) as Product[]
      setRelatedProducts(related)
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-primary-900 mb-4">Product not found</h2>
          <Button onClick={() => router.push('/shop')}>Back to Shop</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const selectedColorObj = product.colors.find(c => c.id === selectedColor)
    const selectedSizeObj = product.sizes.find(s => s.id === selectedSize)

    addItem(product, quantity, selectedSizeObj?.value, selectedColorObj?.name)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const discount = product.isOnSale && product.salePercentage 
    ? product.salePercentage 
    : product.originalPrice 
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0

  return (
    <div className="min-h-screen bg-luxury-cream">
      <div className="container-luxury py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-primary-600 mb-8">
          <button onClick={() => router.push('/')} className="hover:text-primary-900">
            Home
          </button>
          <span>/</span>
          <button onClick={() => router.push('/shop')} className="hover:text-primary-900">
            Shop
          </button>
          <span>/</span>
          <button 
            onClick={() => router.push(`/shop?category=${product.category.slug}`)} 
            className="hover:text-primary-900"
          >
            {getCategoryName(product.category.slug, product.category.name, t)}
          </button>
          <span>/</span>
          <span className="text-primary-900">{getProductName(product.id, product.name, t)}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]?.url || product.images[0]?.url}
                alt={product.images[currentImageIndex]?.alt || product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {product.isOnSale && discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? 'border-primary-900'
                        : 'border-transparent hover:border-primary-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary-600 text-sm">
                  {getBrandName(product.brand.slug, product.brand.name, t)}
                </span>
                <span className="text-primary-300">•</span>
                <span className="text-primary-600 text-sm">SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4">
                {getProductName(product.id, product.name, t)}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-primary-600 text-sm">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-primary-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-primary-600 leading-relaxed mb-6">
                {getProductDescription(product.id, product.description, t)}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-3">
                  Color: {product.colors.find(c => c.id === selectedColor)?.name}
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.id
                          ? 'border-primary-900 ring-2 ring-primary-200'
                          : 'border-primary-200 hover:border-primary-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    >
                      {selectedColor === color.id && (
                        <Check 
                          size={20} 
                          className="mx-auto" 
                          style={{ 
                            color: color.hex === '#FFFFFF' || color.hex === '#F5F5DC' 
                              ? '#000000' 
                              : '#FFFFFF' 
                          }} 
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-3">
                  Size: {product.sizes.find(s => s.id === selectedSize)?.name}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`px-4 py-2 border-2 rounded-lg transition-all ${
                        selectedSize === size.id
                          ? 'border-primary-900 bg-primary-900 text-white'
                          : 'border-primary-200 hover:border-primary-400'
                      }`}
                    >
                      {size.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-primary-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-primary-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-primary-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-primary-600">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                variant="ghost"
                size="lg"
                className="px-6"
                aria-label="Add to wishlist"
              >
                <Heart 
                  size={24} 
                  className={isWishlisted ? 'fill-red-500 text-red-500' : ''} 
                />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-primary-200">
              <div className="flex flex-col items-center text-center">
                <Truck className="text-primary-900 mb-2" size={24} />
                <span className="text-xs text-primary-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="text-primary-900 mb-2" size={24} />
                <span className="text-xs text-primary-600">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="text-primary-900 mb-2" size={24} />
                <span className="text-xs text-primary-600">Easy Returns</span>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Sold by</p>
                  <p className="font-semibold text-primary-900">{product.vendor.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{product.vendor.rating}</span>
                  <span className="text-sm text-primary-600">
                    ({product.vendor.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-primary-200 mb-6">
            <div className="flex gap-8">
              {(['details', 'care', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-primary-900 border-b-2 border-primary-900'
                      : 'text-primary-600 hover:text-primary-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    Product Details
                  </h3>
                  <p className="text-primary-600 leading-relaxed mb-6">
                    {getProductDescription(product.id, product.description, t)}
                  </p>
                </div>

                {product.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-primary-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.materials.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-3">Materials</h4>
                    {product.materials.map((material, index) => (
                      <div key={index} className="mb-3">
                        <p className="font-medium text-primary-800">{material.name}</p>
                        <p className="text-sm text-primary-600">
                          {material.properties.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  Care Instructions
                </h3>
                <ul className="space-y-3">
                  {product.care.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={20} className="text-primary-900 flex-shrink-0 mt-0.5" />
                      <span className="text-primary-600">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  Customer Reviews
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold text-primary-900">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-primary-600">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                </div>
                <p className="text-primary-600">
                  Reviews feature coming soon...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif text-primary-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.images[0]?.url}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-primary-600 mb-1">
                      {relatedProduct.brand.name}
                    </p>
                    <h3 className="font-semibold text-primary-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary-900">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-primary-400 line-through">
                          ${relatedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



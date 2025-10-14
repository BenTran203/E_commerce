'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

// Mock wishlist data
const mockWishlist = [
  {
    id: '1',
    product: {
      id: 'p1',
      name: 'Classic White T-Shirt',
      price: 49.99,
      originalPrice: 69.99,
      slug: 'classic-white-t-shirt',
      images: [{
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        alt: 'Classic White T-Shirt'
      }],
      brand: { name: 'Timeless' },
      category: { name: 'T-Shirts' },
      isOnSale: true,
      stock: 10
    },
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    product: {
      id: 'p2',
      name: 'Leather Jacket',
      price: 549.99,
      slug: 'leather-jacket',
      images: [{
        url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
        alt: 'Leather Jacket'
      }],
      brand: { name: 'Premium' },
      category: { name: 'Jackets' },
      isOnSale: false,
      stock: 5
    },
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    product: {
      id: 'p3',
      name: 'Casual Sneakers',
      price: 129.99,
      slug: 'casual-sneakers',
      images: [{
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        alt: 'Casual Sneakers'
      }],
      brand: { name: 'Comfort' },
      category: { name: 'Shoes' },
      isOnSale: false,
      stock: 0 // Out of stock
    },
    createdAt: '2024-01-22T00:00:00Z'
  }
]

export default function WishlistPage() {
  const { user, isLoading } = useAuth()
  const { addItem } = useCart()
  const [wishlistItems, setWishlistItems] = useState(mockWishlist)

  const handleRemove = (id: string) => {
    if (confirm('Remove this item from your wishlist?')) {
      setWishlistItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleAddToCart = (item: any) => {
    addItem(item.product, 1)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <p className="text-primary-600">Please log in to view your wishlist.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-12">
      <div className="container-luxury max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-primary-900 mb-2">My Wishlist</h1>
            <p className="text-primary-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Heart size={64} className="mx-auto text-primary-300 mb-4" />
              <h3 className="text-xl font-serif text-primary-900 mb-2">Your wishlist is empty</h3>
              <p className="text-primary-600 mb-6">
                Save items you love for later
              </p>
              <Link href="/pages/shop">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  {/* Product Image */}
                  <Link href={`/product/${item.product.id}`} className="block relative">
                    <div className="aspect-square overflow-hidden bg-primary-50">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {item.product.isOnSale && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Sale
                      </div>
                    )}
                    {item.product.stock === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white px-4 py-2 rounded-lg font-semibold text-primary-900">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleRemove(item.id)
                      }}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs text-primary-600 mb-1">{item.product.brand.name}</p>
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-primary-900 mb-2 hover:text-primary-700 transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-primary-900">
                        ${item.product.price.toFixed(2)}
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-sm text-primary-400 line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        disabled={item.product.stock === 0}
                        className="flex-1 flex items-center justify-center gap-2"
                        size="sm"
                      >
                        <ShoppingCart size={16} />
                        {item.product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                      <Link href={`/product/${item.product.id}`}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="p-2"
                        >
                          <ExternalLink size={16} />
                        </Button>
                      </Link>
                    </div>

                    {/* Added Date */}
                    <p className="text-xs text-primary-400 mt-3">
                      Added {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}


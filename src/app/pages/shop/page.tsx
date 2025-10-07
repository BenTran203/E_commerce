'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid3X3, List, ChevronDown, X } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { Product, ProductFilters } from '@/types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useTranslation } from 'react-i18next'
import { getProductName, getProductDescription, getCategoryName, getBrandName } from '@/utils/productTranslation'

export default function ShopPage() {
  const { t } = useTranslation()
  const {
    products,
    isLoading,
    fetchProducts,
    updateSearchQuery,
    updateSortBy,
    updateFilters,
    resetFilters,
    searchQuery,
    sortBy,
    filters,
    currentPage,
    totalPages,
    changePage
  } = useProducts()

  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  // Mock data for filters
  const categories = [
    { id: '1', name: 'Casual' },
    { id: '2', name: 'Winter' },
    { id: '3', name: 'Formal' },
    { id: '4', name: 'Accessories' },
    { id: '5', name: 'Summer' },
    { id: '6', name: 'Street Style' }
  ]

  const brands = [
    'Timeless', 'Heritage', 'Aurum', 'Coastal', 'Urban Edge', 
    'Professional', 'Nordic'
  ]

  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#1F3A93' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Brown', hex: '#8B4513' }
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  // Collection mapping to categories for filtering
  const collectionToCategories = {
    'casual-everyday': ['Casual'],
    'formal-excellence': ['Formal'],
    'premium-accessories': ['Accessories'],
    'winter-warmth': ['Winter'],
    'street-style-culture': ['Street Style'],
    'summer-breeze': ['Summer']
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle collection filtering from URL
  useEffect(() => {
    const collection = searchParams.get('collection')
    if (collection && collectionToCategories[collection as keyof typeof collectionToCategories]) {
      const categoryNames = collectionToCategories[collection as keyof typeof collectionToCategories]
      const categoryIds = categories
        .filter(cat => categoryNames.includes(cat.name))
        .map(cat => cat.id)
      
      setSelectedCategories(categoryIds)
      
      // Apply the filter
      const newFilters: Partial<ProductFilters> = {
        categories: categoryIds,
        brands: selectedBrands,
        priceRange,
        colors: selectedColors,
        sizes: selectedSizes
      }
      updateFilters(newFilters)
      fetchProducts()
    }
  }, [searchParams])

  // Instant search with debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts()
    }, 300) // 300ms delay for smooth instant search

    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  // Auto-apply filters when they change
  useEffect(() => {
    const newFilters: Partial<ProductFilters> = {
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
      colors: selectedColors,
      sizes: selectedSizes
    }
    updateFilters(newFilters)
    fetchProducts()
  }, [selectedCategories, selectedBrands, priceRange, selectedColors, selectedSizes])

  // Auto-fetch when sort changes
  useEffect(() => {
    if (sortBy) {
      fetchProducts()
    }
  }, [sortBy])

  const handleSearch = (query: string) => {
    updateSearchQuery(query)
    // fetchProducts is now called automatically via useEffect
  }

  const handleSort = (sortOption: string) => {
    updateSortBy(sortOption as any)
    // fetchProducts is now called automatically via useEffect
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 500])
    resetFilters()
    // fetchProducts is now called automatically via useEffect
  }

  const handleAddToCart = (product: Product) => {
    addItem(
      product,
      1,
      product.sizes?.[0]?.value,
      product.colors?.[0]?.name
    )
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-8">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {searchParams.get('collection') ? (
            <>
              <h1 className="text-4xl md:text-5xl font-serif text-primary-900 mb-4">
                {collectionToCategories[searchParams.get('collection') as keyof typeof collectionToCategories]?.[0]} Collection
              </h1>
              <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                Explore our curated {collectionToCategories[searchParams.get('collection') as keyof typeof collectionToCategories]?.[0].toLowerCase()} pieces
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-serif text-primary-900 mb-4">
                {t('shop.title')}
              </h1>
              <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                {t('shop.description')}
              </p>
            </>
          )}
        </motion.div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full lg:w-96"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
            <Input
              placeholder={t('shop.search')}
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            {/* View Mode Toggle */}
            <div className="flex items-center border border-primary-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-900 text-white' : 'text-primary-600'}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-900 text-white' : 'text-primary-600'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none bg-white border border-primary-200 rounded-lg px-4 py-2 pr-8 text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">{t('shop.sortBy.newest')}</option>
                <option value="price-low">{t('shop.sortBy.priceLow')}</option>
                <option value="price-high">{t('shop.sortBy.priceHigh')}</option>
                <option value="name">{t('shop.sortBy.name')}</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-400" size={16} />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 relative"
            >
              <Filter size={16} />
              {t('shop.filters')}
              {(selectedCategories.length + selectedBrands.length + selectedColors.length + selectedSizes.length > 0 || priceRange[1] < 500) && (
                <span className="absolute -top-2 -right-2 bg-primary-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedCategories.length + selectedBrands.length + selectedColors.length + selectedSizes.length + (priceRange[1] < 500 ? 1 : 0)}
                </span>
              )}
            </Button>
          </motion.div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="w-80 bg-white rounded-xl shadow-sm p-6 h-fit"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-primary-900">{t('shop.filters')}</h3>
                    {(selectedCategories.length + selectedBrands.length + selectedColors.length + selectedSizes.length > 0 || priceRange[1] < 500) && (
                      <span className="bg-primary-900 text-white text-xs px-2 py-1 rounded-full">
                        {selectedCategories.length + selectedBrands.length + selectedColors.length + selectedSizes.length + (priceRange[1] < 500 ? 1 : 0)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-primary-400 hover:text-primary-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-primary-800 mb-3">{t('shop.priceRange')}</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-primary-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-primary-800 mb-3">{t('nav.collections')}</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category.id])
                            } else {
                              setSelectedCategories(selectedCategories.filter(id => id !== category.id))
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-primary-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-medium text-primary-800 mb-3">{t('shop.brands')}</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand])
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand))
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-primary-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-medium text-primary-800 mb-3">{t('shop.colors')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          if (selectedColors.includes(color.name)) {
                            setSelectedColors(selectedColors.filter(c => c !== color.name))
                          } else {
                            setSelectedColors([...selectedColors, color.name])
                          }
                        }}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColors.includes(color.name) 
                            ? 'border-primary-900 ring-2 ring-primary-200' 
                            : 'border-primary-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h4 className="font-medium text-primary-800 mb-3">{t('shop.sizes')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          if (selectedSizes.includes(size)) {
                            setSelectedSizes(selectedSizes.filter(s => s !== size))
                          } else {
                            setSelectedSizes([...selectedSizes, size])
                          }
                        }}
                        className={`px-3 py-1 text-sm border rounded ${
                          selectedSizes.includes(size)
                            ? 'border-primary-900 bg-primary-900 text-white'
                            : 'border-primary-200 text-primary-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="space-y-3">
                  <div className="text-xs text-primary-500 text-center bg-primary-50 py-2 px-3 rounded-lg">
                    {t('shop.applyInstantly')}
                  </div>
                  <Button
                    variant="secondary"
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    {t('shop.clearFilters')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            {!isLoading && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-primary-600">
                  {products.length === 0 ? (
                    <span>{t('shop.noProducts')}</span>
                  ) : (
                    <span>
                      {t('shop.showing')} <strong>{products.length}</strong> {products.length !== 1 ? t('shop.products') : t('shop.product')}
                    </span>
                  )}
                </p>
                {products.length === 0 && (selectedCategories.length > 0 || selectedBrands.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[1] < 500) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary-600 hover:text-primary-900 underline"
                  >
                    {t('shop.clearFilters')}
                  </button>
                )}
              </div>
            )}
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="mb-4">
                  <Filter className="w-16 h-16 mx-auto text-primary-300" />
                </div>
                <h3 className="text-xl font-medium text-primary-900 mb-2">{t('shop.noProducts')}</h3>
                <p className="text-primary-600 mb-6">
                  {t('shop.noProductsDesc')}
                </p>
                <Button onClick={clearAllFilters}>
                  {t('shop.clearFilters')}
                </Button>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`grid gap-6 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div 
                        className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'}`}
                        onClick={() => router.push(`/product/${product.id}`)}
                      >
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isOnSale && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                            -{product.salePercentage}%
                          </div>
                        )}
                      </div>
                      
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <h3 
                          className="font-medium text-primary-900 mb-2 hover:text-primary-700 cursor-pointer"
                          onClick={() => router.push(`/product/${product.id}`)}
                        >
                          {getProductName(product.id, product.name, t)}
                        </h3>
                        <p className="text-primary-600 text-sm mb-3 line-clamp-2">
                          {getProductDescription(product.id, product.description, t)}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-primary-900">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-primary-400 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-yellow-500">★</span>
                            <span className="text-sm text-primary-600">{product.rating}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/product/${product.id}`)
                            }}
                            className="flex-1"
                            size="sm"
                            variant="secondary"
                          >
                            {t('shop.viewDetails')}
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddToCart(product)
                            }}
                            className="flex-1"
                            size="sm"
                          >
                            {t('shop.addToCart')}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <Button
                      variant="secondary"
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {t('shop.pagination.previous')}
                    </Button>
                    
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => changePage(i + 1)}
                          className={`px-3 py-2 rounded ${
                            currentPage === i + 1
                              ? 'bg-primary-900 text-white'
                              : 'text-primary-600 hover:bg-primary-100'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="secondary"
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {t('shop.pagination.next')}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
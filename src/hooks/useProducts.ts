"use client"

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import {
  setProducts,
  setFeaturedProducts,
  setCurrentProduct,
  setLoading,
  setError,
  setSearchQuery,
  setSortBy,
  setFilters,
  clearFilters,
  setCurrentPage,
} from '@/store/slices/productsSlice'
import productsData from '@/data/products.json'
import { Product, ProductFilters } from '@/types'
import { useQuery } from 'react-query'

const productsAPI = {
  getProducts: async ({ filters, searchQuery, sortBy, page }: { filters: ProductFilters; searchQuery: string; sortBy: "name" | "price-low" | "price-high" | "newest"; page: number }): Promise<Product[]> => {
    let filteredProducts = productsData.products.map(product => ({
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })) as Product[]

    // Apply search query
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      filteredProducts = filteredProducts.filter(product => {
        const searchableText = [
          product.name,
          product.description,
          product.brand.name,
          product.category.name,
          ...product.tags,
          product.sku
        ].join(' ').toLowerCase()
        
        return searchableText.includes(query)
      })
    }

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.categories!.includes(product.category.id)
      )
    }

    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.brands!.includes(product.brand.name)
      )
    }

    // Apply price range filter
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.priceRange![0] &&
        product.price <= filters.priceRange![1]
      )
    }

    // Apply color filter
    if (filters.colors && filters.colors.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.colors.some(color => filters.colors!.includes(color.name))
      )
    }

    // Apply size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.sizes.some(size => filters.sizes!.includes(size.value))
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        // Keep default order (newest first)
        break
    }

    return filteredProducts
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    // Get 6 products that are on sale
    return productsData.products
      .filter(product => product.isOnSale)
      .map(product => ({
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))
      .slice(0, 10) as Product[]
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const product = productsData.products.find(p => p.id === id);
    if (!product) return null;
    return {
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Product;
  },
}

export function useProducts() {
  const dispatch = useDispatch()
  const {
    products,
    featuredProducts,
    currentProduct,
    filters,
    isLoading,
    error,
    searchQuery,
    sortBy,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.products)

  // Fetch products with filters
  const { refetch: fetchProducts } = useQuery(
    ['products', filters, searchQuery, sortBy, currentPage],
    () => productsAPI.getProducts({filters,searchQuery,sortBy,page: currentPage}),
    {
      onSuccess: (data) => {
        dispatch(setProducts(data))
      },
      onError: (err) => {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch products'))
      },
      enabled: false, // Manual fetch
    }
  )

  // Fetch featured products
  const { refetch: fetchFeaturedProducts } = useQuery(
    ['featured-products'],
    productsAPI.getFeaturedProducts,
    {
      onSuccess: (data) => {
        dispatch(setFeaturedProducts(data))
      },
      onError: (err) => {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch featured products'))
      },
    }
  )

  // Fetch single product
  const fetchProduct = async (id: string) => {
    try {
      dispatch(setLoading(true))
      const product = await productsAPI.getProductById(id)
      dispatch(setCurrentProduct(product))
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch product'))
    }
  }

  const updateSearchQuery = (query: string) => {
    dispatch(setSearchQuery(query))
  }

  const updateSortBy = (sort: typeof sortBy) => {
    dispatch(setSortBy(sort))
  }

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    dispatch(setFilters(newFilters))
  }

  const resetFilters = () => {
    dispatch(clearFilters())
  }

  const changePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  return {
    products,
    featuredProducts,
    currentProduct,
    filters,
    isLoading,
    error,
    searchQuery,
    sortBy,
    currentPage,
    totalPages,
    fetchProducts,
    fetchFeaturedProducts,
    fetchProduct,
    updateSearchQuery,
    updateSortBy,
    updateFilters,
    resetFilters,
    changePage,
  }
}
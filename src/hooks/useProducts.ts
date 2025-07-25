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
import { Product, ProductFilters } from '@/types'
import { useQuery } from 'react-query'

// Mock API functions - replace with actual API calls
const productsAPI = {
  getProducts: async (params: any): Promise<Product[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock products data
    return [
      {
        id: '1',
        name: 'Essential Cotton T-Shirt',
        description: 'Premium cotton t-shirt with minimalist design',
        price: 29.99,
        originalPrice: 39.99,
        images: [
          {
            id: '1',
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            alt: 'Essential Cotton T-Shirt',
            isPrimary: true,
            order: 1,
          },
        ],
        category: { id: '1', name: 'T-Shirts', slug: 't-shirts', isActive: true },
        brand: { id: '1', name: 'Timeless', slug: 'timeless', isActive: true },
        sizes: [
          { id: '1', name: 'Small', value: 'S', category: 'clothing' },
          { id: '2', name: 'Medium', value: 'M', category: 'clothing' },
          { id: '3', name: 'Large', value: 'L', category: 'clothing' },
        ],
        colors: [
          { id: '1', name: 'White', hex: '#FFFFFF' },
          { id: '2', name: 'Black', hex: '#000000' },
        ],
        materials: [
          { id: '1', name: '100% Cotton', properties: ['Breathable', 'Soft'] },
        ],
        care: ['Machine wash cold', 'Tumble dry low'],
        features: ['Pre-shrunk', 'Side-seamed'],
        stock: 50,
        isOnSale: true,
        salePercentage: 25,
        rating: 4.5,
        reviewCount: 128,
        sku: 'TS-001',
        tags: ['essential', 'cotton', 'basic'],
        isActive: true,
        vendor: {
          id: '1',
          name: 'Timeless',
          slug: 'timeless',
          email: 'vendor@timeless.com',
          address: {
            firstName: 'Timeless',
            lastName: 'Store',
            address1: '123 Fashion Ave',
            city: 'New York',
            state: 'NY',
            country: 'US',
            postalCode: '10001',
          },
          rating: 4.8,
          reviewCount: 1250,
          totalProducts: 50,
          totalSales: 10000,
          isVerified: true,
          isActive: true,
          commission: 15,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ] as Product[]
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    const products = await productsAPI.getProducts({})
    return products.slice(0, 4)
  },
  
  getProductById: async (id: string): Promise<Product | null> => {
    const products = await productsAPI.getProducts({})
    return products.find(p => p.id === id) || null
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
    () => productsAPI.getProducts({
      filters,
      searchQuery,
      sortBy,
      page: currentPage,
    }),
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
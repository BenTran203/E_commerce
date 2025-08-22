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

      // New product: Puffer Jacket
      {
        id: '2',
        name: 'Insulated Puffer Jacket',
        description: 'Lightweight, water-resistant puffer jacket with premium insulation for cold-weather comfort.',
        price: 149.99,
        originalPrice: 199.99,
        images: [
          {
            id: '2',
            url: 'https://images.unsplash.com/photo-1706765779494-2705542ebe74?q=80&w=751&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Insulated Puffer Jacket',
            isPrimary: true,
            order: 1,
          },
        ],
        category: { id: '2', name: 'Outerwear', slug: 'outerwear', isActive: true },
        brand: { id: '2', name: 'Heritage', slug: 'heritage', isActive: true },
        sizes: [
          { id: '4', name: 'Small', value: 'S', category: 'clothing' },
          { id: '5', name: 'Medium', value: 'M', category: 'clothing' },
          { id: '6', name: 'Large', value: 'L', category: 'clothing' },
          { id: '7', name: 'X-Large', value: 'XL', category: 'clothing' },
        ],
        colors: [
          { id: '3', name: 'Navy', hex: '#1F3A93' },
          { id: '4', name: 'Olive', hex: '#556B2F' },
        ],
        materials: [
          { id: '2', name: 'Polyester Shell', properties: ['Water-resistant', 'Durable'] },
          { id: '3', name: 'Synthetic Insulation', properties: ['Warm', 'Lightweight'] },
        ],
        care: ['Spot clean', 'Do not bleach', 'Tumble dry low'],
        features: ['Packable', 'Insulated', 'Water-resistant shell'],
        stock: 30,
        isOnSale: true,
        salePercentage: 25,
        rating: 4.6,
        reviewCount: 85,
        sku: 'PJ-002',
        tags: ['puffer', 'jacket', 'outerwear'],
        isActive: true,
        vendor: {
          id: '2',
          name: 'Heritage Goods',
          slug: 'heritage-goods',
          email: 'sales@heritage.com',
          address: {
            firstName: 'Heritage',
            lastName: 'HQ',
            address1: '456 Outer St',
            city: 'London',
            state: 'LN',
            country: 'UK',
            postalCode: 'SW1A1AA',
          },
          rating: 4.7,
          reviewCount: 640,
          totalProducts: 120,
          totalSales: 54000,
          isVerified: true,
          isActive: true,
          commission: 12,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      // New product: Suite
      {
        id: '3',
        name: 'Modern Tailored Suite',
        description: 'Refined two-piece suit with a modern silhouette and breathable wool blend — perfect for formal occasions and office wear.',
        price: 349.99,
        originalPrice: 449.99,
        images: [
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Modern Tailored Suite',
            isPrimary: true,
            order: 1,
          },
        ],
        category: { id: '3', name: 'Suits', slug: 'suits', isActive: true },
        brand: { id: '3', name: 'Aurum Tailoring', slug: 'aurum', isActive: true },
        sizes: [
          { id: '8', name: '38R', value: '38R', category: 'clothing' },
          { id: '9', name: '40R', value: '40R', category: 'clothing' },
          { id: '10', name: '42R', value: '42R', category: 'clothing' },
        ],
        colors: [
          { id: '5', name: 'Charcoal', hex: '#333333' },
          { id: '6', name: 'Navy', hex: '#1F3A93' },
        ],
        materials: [
          { id: '4', name: 'Wool Blend', properties: ['Breathable', 'Wrinkle-resistant'] },
        ],
        care: ['Dry clean only'],
        features: ['Tailored fit', 'Half-canvas construction'],
        stock: 12,
        isOnSale: false,
        salePercentage: 0,
        rating: 4.8,
        reviewCount: 42,
        sku: 'ST-003',
        tags: ['suit', 'tailored', 'formal'],
        isActive: true,
        vendor: {
          id: '3',
          name: 'Aurum Collective',
          slug: 'aurum-collective',
          email: 'hello@aurum.com',
          address: {
            firstName: 'Aurum',
            lastName: 'Studio',
            address1: '789 Bespoke Ln',
            city: 'Milan',
            state: 'MI',
            country: 'IT',
            postalCode: '20121',
          },
          rating: 4.9,
          reviewCount: 310,
          totalProducts: 85,
          totalSales: 32000,
          isVerified: true,
          isActive: true,
          commission: 10,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      // New product: Watch
      {
        id: '4',
        name: 'Classic Heritage Watch',
        description: 'Precision quartz movement with a minimalist dial and stainless steel case — a timeless accessory.',
        price: 219.99,
        originalPrice: 279.99,
        images: [
          {
            id: '4',
            url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V2F0Y2h8ZW58MHx8MHx8fDI%3D',
            alt: 'Classic Heritage Watch',
            isPrimary: true,
            order: 1,
          },
        ],
        category: { id: '4', name: 'Accessories', slug: 'accessories', isActive: true },
        brand: { id: '4', name: 'Aurum Timepieces', slug: 'aurum-time', isActive: true },
        sizes: [],
        colors: [
          { id: '7', name: 'Silver', hex: '#C0C0C0' },
          { id: '8', name: 'Gold', hex: '#D4AF37' },
        ],
        materials: [
          { id: '5', name: 'Stainless Steel', properties: ['Durable', 'Corrosion-resistant'] },
          { id: '6', name: 'Leather Strap', properties: ['Comfortable', 'Premium'] },
        ],
        care: ['Wipe clean with a soft cloth', 'Avoid water exposure'],
        features: ['Quartz movement', '3ATM water resistance'],
        stock: 40,
        isOnSale: true,
        salePercentage: 21,
        rating: 4.4,
        reviewCount: 210,
        sku: 'WT-004',
        tags: ['watch', 'accessory', 'timeless'],
        isActive: true,
        vendor: {
          id: '4',
          name: 'Aurum Watches',
          slug: 'aurum-watches',
          email: 'support@aurumwatches.com',
          address: {
            firstName: 'Aurum',
            lastName: 'Watches',
            address1: '101 Timepiece Rd',
            city: 'Geneva',
            state: 'GE',
            country: 'CH',
            postalCode: '1201',
          },
          rating: 4.6,
          reviewCount: 980,
          totalProducts: 210,
          totalSales: 150000,
          isVerified: true,
          isActive: true,
          commission: 14,
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
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductFilters } from "@/types";

interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  currentProduct: Product | null;
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: "name" | "price-low" | "price-high" | "newest";
  currentPage: number;
  totalPages: number;
}

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  filters: {
    categories: [],
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    brands: [],
  },
  isLoading: false,
  error: null,
  searchQuery: "",
  sortBy: "newest",
  currentPage: 1,
  totalPages: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<typeof initialState.sortBy>) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = "";
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
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
  setTotalPages,
} = productsSlice.actions;

export default productsSlice.reducer;

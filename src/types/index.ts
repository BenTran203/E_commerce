// User & Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: "CUSTOMER" | "ADMIN" | "customer" | "admin"; // Support both uppercase and lowercase
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
  theme: "light" | "dark" | "auto";
  currency: string;
  language: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  category: Category;
  brand: Brand;
  sizes: Size[];
  colors: Color[];
  materials: Material[];
  care: string[];
  features: string[];
  stock: number;
  isOnSale: boolean;
  salePercentage?: number;
  rating: number;
  reviewCount: number;
  sku: string;
  tags: string[];
  isActive: boolean;  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  isActive: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  website?: string;
  isActive: boolean;
}

export interface Size {
  id: string;
  name: string;
  value: string;
  category: "clothing" | "shoes" | "accessories";
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  image?: string;
}

export interface Material {
  id: string;
  name: string;
  description?: string;
  properties: string[];
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  selectedVariant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size?: string;
  color?: string;
  price?: number;
  stock: number;
  sku: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "stripe" | "apple_pay" | "google_pay";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

// Address Types
export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone?: string;
  isDefault?: boolean;
}

// Search & Filter Types
export interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  materials?: string[];
  onSale?: boolean;
  inStock?: boolean;
  rating?: number;
}

export interface SearchFilters extends ProductFilters {
  query: string;
  sortBy: "relevance" | "price-low" | "price-high" | "newest" | "rating";
  page: number;
  limit: number;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  isVerified: boolean;
  isRecommended: boolean;
  helpfulVotes: number;
  createdAt: string;
  updatedAt: string;
  user: Pick<User, "firstName" | "lastName" | "avatar">;
}

// Newsletter & Marketing Types
export interface NewsletterSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  subscribedAt: string;
  preferences: {
    newProducts: boolean;
    sales: boolean;
    blog: boolean;
  };
}

// AI Integration Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  type?: "text" | "product_recommendation" | "order_status" | "support";
  metadata?: Record<string, any>;
}

export interface ProductRecommendation {
  product: Product;
  reason: string;
  confidence: number;
  type: "similar" | "complementary" | "trending" | "personalized";
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  addedAt: string;
}

// Notifications Types
export interface Notification {
  id: string;
  userId: string;
  type: "order" | "product" | "promotion" | "system";
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface CheckoutForm {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  paymentMethod: string;
  savePaymentMethod: boolean;
  notes?: string;
}

// Component Props Types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

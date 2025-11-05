/**
 * API Client
 * Centralized API communication with the backend
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

// Helper function to set auth token
export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", token);
}

// Helper function to remove auth token
export function removeAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
}

// Base fetch function with auth headers
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Network error" }));
    throw new Error(error.message || "API request failed");
  }

  return response.json();
}

// Auth API
export const authAPI = {
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (response.data.tokens.accessToken) {
      setAuthToken(response.data.tokens.accessToken);
    }
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (response.data.tokens.accessToken) {
      setAuthToken(response.data.tokens.accessToken);
    }
    return response.data;
  },

  logout: async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    removeAuthToken();
  },

  getCurrentUser: async () => {
    const response = await apiFetch("/auth/me");
    return response.data.user;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiFetch("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
    if (response.data.accessToken) {
      setAuthToken(response.data.accessToken);
    }
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiFetch(`/products${queryString}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiFetch(`/products/${id}`);
    return response.data.product;
  },

  getFeatured: async () => {
    const response = await apiFetch("/products/featured");
    return response.data.products;
  },
};

// Cart API
export const cartAPI = {
  get: async () => {
    const response = await apiFetch("/cart");
    return response.data;
  },

  add: async (productId: string, quantity: number = 1, variantId?: string) => {
    const response = await apiFetch("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity, variantId }),
    });
    return response.data;
  },

  update: async (itemId: string, quantity: number) => {
    const response = await apiFetch(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    return response.data;
  },

  remove: async (itemId: string) => {
    await apiFetch(`/cart/${itemId}`, { method: "DELETE" });
  },

  clear: async () => {
    await apiFetch("/cart", { method: "DELETE" });
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData: any) => {
    const response = await apiFetch("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
    return response.data.order;
  },

  getAll: async (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiFetch(`/orders${queryString}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiFetch(`/orders/${id}`);
    return response.data.order;
  },

  cancel: async (id: string) => {
    const response = await apiFetch(`/orders/${id}/cancel`, { method: "POST" });
    return response.data.order;
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await apiFetch("/users/profile");
    return response.data.user;
  },

  updateProfile: async (userData: any) => {
    const response = await apiFetch("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
    return response.data.user;
  },

  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await apiFetch("/users/change-password", {
      method: "POST",
      body: JSON.stringify(passwordData),
    });
  },

  // Addresses
  getAddresses: async () => {
    const response = await apiFetch("/users/addresses");
    return response.data.addresses;
  },

  createAddress: async (addressData: any) => {
    const response = await apiFetch("/users/addresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    });
    return response.data.address;
  },

  updateAddress: async (id: string, addressData: any) => {
    const response = await apiFetch(`/users/addresses/${id}`, {
      method: "PUT",
      body: JSON.stringify(addressData),
    });
    return response.data.address;
  },

  deleteAddress: async (id: string) => {
    await apiFetch(`/users/addresses/${id}`, { method: "DELETE" });
  },

  // Wishlist
  getWishlist: async () => {
    const response = await apiFetch("/users/wishlist");
    return response.data.wishlistItems;
  },

  addToWishlist: async (productId: string) => {
    const response = await apiFetch("/users/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
    return response.data.wishlistItem;
  },

  removeFromWishlist: async (productId: string) => {
    await apiFetch(`/users/wishlist/${productId}`, { method: "DELETE" });
  },
};

// Reviews API
export const reviewsAPI = {
  getProductReviews: async (productId: string, params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    const response = await apiFetch(
      `/reviews/product/${productId}${queryString}`,
    );
    return response.data;
  },

  create: async (reviewData: any) => {
    const response = await apiFetch("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
    return response.data.review;
  },

  update: async (id: string, reviewData: any) => {
    const response = await apiFetch(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(reviewData),
    });
    return response.data.review;
  },

  delete: async (id: string) => {
    await apiFetch(`/reviews/${id}`, { method: "DELETE" });
  },

  voteHelpful: async (id: string) => {
    const response = await apiFetch(`/reviews/${id}/helpful`, {
      method: "POST",
    });
    return response.data.review;
  },
};

// Payments API
export const paymentsAPI = {
  createIntent: async (orderId: string) => {
    const response = await apiFetch("/payments/create-intent", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });
    return response.data;
  },

  confirmPayment: async (paymentIntentId: string, orderId: string) => {
    const response = await apiFetch("/payments/confirm", {
      method: "POST",
      body: JSON.stringify({ paymentIntentId, orderId }),
    });
    return response.data.payment;
  },
};

export default {
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  user: userAPI,
  reviews: reviewsAPI,
  payments: paymentsAPI,
};

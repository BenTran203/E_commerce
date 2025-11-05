import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        size?: string;
        color?: string;
      }>,
    ) => {
      const { product, quantity, size, color } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          product,
          quantity,
          size,
          color,
        });
      }

      // Recalculate totals
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;

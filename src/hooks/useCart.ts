import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} from '@/store/slices/cartSlice'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export function useCart() {
  const dispatch = useDispatch()
  const { items, total, itemCount, isOpen } = useSelector((state: RootState) => state.cart)

  const addItem = (
    product: Product,
    quantity: number = 1,
    size?: string,
    color?: string
  ) => {
    dispatch(addToCart({ product, quantity, size, color }))
    toast.success(`${product.name} added to cart`)
  }

  const removeItem = (itemId: string) => {
    dispatch(removeFromCart(itemId))
    toast.success('Item removed from cart')
  }

  const updateItemQuantity = (itemId: string, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }))
  }

  const clearAllItems = () => {
    dispatch(clearCart())
    toast.success('Cart cleared')
  }

  const toggle = () => {
    dispatch(toggleCart())
  }

  const open = () => {
    dispatch(openCart())
  }

  const close = () => {
    dispatch(closeCart())
  }

  const getItemById = (itemId: string) => {
    return items.find(item => item.id === itemId)
  }

  const isProductInCart = (productId: string, size?: string, color?: string) => {
    return items.some(
      item =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
    )
  }

  const getProductQuantity = (productId: string, size?: string, color?: string) => {
    const item = items.find(
      item =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
    )
    return item?.quantity || 0
  }

  return {
    items,
    total,
    itemCount,
    isOpen,
    addItem,
    removeItem,
    updateItemQuantity,
    clearAllItems,
    toggle,
    open,
    close,
    getItemById,
    isProductInCart,
    getProductQuantity,
  }
} 
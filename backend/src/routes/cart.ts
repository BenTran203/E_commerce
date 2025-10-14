import { Router } from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cart'
import { authenticate } from '../middleware/auth'

const router = Router()

// All cart routes require authentication
router.use(authenticate)

router.get('/', getCart)
router.post('/', addToCart)
router.put('/:id', updateCartItem)
router.delete('/:id', removeFromCart)
router.delete('/', clearCart)

export default router


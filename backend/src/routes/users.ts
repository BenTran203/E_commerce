import { Router } from 'express'
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist
} from '../controllers/users'
import { authenticate } from '../middleware/auth'

const router = Router()

// All user routes require authentication
router.use(authenticate)

// Profile routes
router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.post('/change-password', changePassword)

// Address routes
router.get('/addresses', getUserAddresses)
router.post('/addresses', createAddress)
router.put('/addresses/:id', updateAddress)
router.delete('/addresses/:id', deleteAddress)

// Wishlist routes
router.get('/wishlist', getUserWishlist)
router.post('/wishlist', addToWishlist)
router.delete('/wishlist/:productId', removeFromWishlist)

export default router


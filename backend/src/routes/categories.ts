import { Router } from 'express'
import {
  getAllCategories,
  getCategoryByIdentifier,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categories'
import { authenticate, authorize } from '../middleware/auth'

const router = Router()

// Public routes
router.get('/', getAllCategories)
router.get('/:identifier', getCategoryByIdentifier)

// Admin only routes
router.post('/', authenticate, authorize('ADMIN'), createCategory)
router.put('/:id', authenticate, authorize('ADMIN'), updateCategory)
router.delete('/:id', authenticate, authorize('ADMIN'), deleteCategory)

export default router


import { Router } from 'express'
import {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
  getCurrentUser
} from '../controllers/auth'
import { authenticate } from '../middleware/auth'

const router = Router()

// Public routes
const routes = [
    {path: '/register', handler: register},
    {path: '/login', handler: login },
    {path: '/refresh', handler: refreshToken},
    {path: '/forgot-password', handler: forgotPassword},
    {path: '/reset-password', handler: resetPassword},
    {path: '/verify-email', handler: verifyEmail},
    {path: '/logout', handler: verifyEmail},
]
routes.forEach(r => router.post(r.path, r.handler))

// Protected routes
router.post('/logout', authenticate, logout)
router.get('/me', authenticate, getCurrentUser)

export default router
/**
 * AUTHENTICATION CONTROLLER
 * 
 * This controller handles user authentication operations including:
 * - User registration
 * - User login
 * - Password reset
 * - Email verification
 * - Token refresh
 * 
 * LEARNING OBJECTIVES:
 * - Implement secure user registration and login
 * - Learn password hashing with bcrypt
 * - Understand JWT token management
 * - Handle email verification workflow
 * - Implement password reset functionality
 * 
 * IMPLEMENTATION STEPS:
 * 1. Install required dependencies: bcryptjs, jsonwebtoken
 * 2. Set up email service (nodemailer)
 * 3. Implement each authentication method
 * 4. Add proper validation and error handling
 * 5. Test each endpoint thoroughly
 */

import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { generateToken, generateRefreshToken, verifyRefreshToken } from '@/middleware/auth'
import { sendEmail } from '@/services/email' // Implement this service
// import { validateRegistration, validateLogin } from '@/utils/validation' // Implement validation
import {registerValidator} from '@/middleware/validator'
const prisma = new PrismaClient()

/**
 * USER REGISTRATION
 * 
 * POST /api/auth/register
 * 
 * Register a new user account
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role = 'CUSTOMER' } = req.body

    // TODO: Implement validation

    const validate = registerValidator.safeParse(req.body)
    if (!validate.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation has failed, check your validation method for register',
        errors: validate.error.errors
      })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })
    
    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'This email has already exists'
      })
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 15)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPass,
        firstName,
        lastName,
        role
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true
      }
    })

    // Generate tokens
    const accessToken = generateToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    // TODO: Send verification email not finish
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Timeless - Verify Your Email',
      template: 'email-verification',
      data: {
        firstName: user.firstName,
        verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
      }
    })

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during registration'
    })
  }
}

/**
 * USER LOGIN
 * 
 * POST /api/auth/login
 * 
 * Authenticate user and return access token
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe = false } = req.body

    // TODO: Implement validation
    // const validation = validateLogin(req.body)
    // if (!validation.isValid) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Validation failed',
    //     errors: validation.errors
    //   })
    // }

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isEmailVerified: true
      }
    })

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      })
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account has been deactivated. Please contact support.'
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      })
    }

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Generate tokens
    const accessToken = generateToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during login'
    })
  }
}  

/**
 * REFRESH TOKEN
 * 
 * POST /api/auth/refresh
 * 
 * Generate new access token using refresh token
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token is required'
      })
    }

    // Verify refresh token
    let userId: string
    try {
      const decoded = verifyRefreshToken(refreshToken)
      userId = decoded.userId
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired refresh token'
      })
    }

    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        isActive: true
      }
    })

    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found or account deactivated'
      })
    }

    // Generate new access token
    const newAccessToken = generateToken(user.id)

    res.status(200).json({
      status: 'success',
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken
      }
    })

  } catch (error) {
    console.error('Token refresh error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during token refresh'
    })
  }
}

/**
 * FORGOT PASSWORD
 * 
 * POST /api/auth/forgot-password
 * 
 * Send password reset email
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required'
      })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        isActive: true
      }
    })

    // Always return success to prevent email enumeration
    if (!user || !user.isActive) {
      return res.status(200).json({
        status: 'success',
        message: 'If an account with that email exists, a password reset link has been sent.'
      })
    }

    // Generate password reset token (short-lived)
    const resetToken = generateToken(user.id) // Consider using a different secret for reset tokens

    // TODO: Save reset token to database with expiration
    // TODO: Send password reset email
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Password Reset Request',
    //   template: 'password-reset',
    //   data: {
    //     firstName: user.firstName,
    //     resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    //   }
    // })

    res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, a password reset link has been sent.'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during password reset request'
    })
  }
}

/**
 * RESET PASSWORD
 * 
 * POST /api/auth/reset-password
 * 
 * Reset user password using reset token
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Token and new password are required'
      })
    }

    // TODO: Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 8 characters long'
      })
    }

    // Verify reset token
    // TODO: Implement proper reset token verification with database lookup
    // This is a simplified version - in production, use a separate token table
    
    // Hash new password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // TODO: Update user password and invalidate reset token
    // const user = await prisma.user.update({
    //   where: { id: userId },
    //   data: { 
    //     password: hashedPassword,
    //     updatedAt: new Date()
    //   }
    // })

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during password reset'
    })
  }
}

/**
 * VERIFY EMAIL
 * 
 * POST /api/auth/verify-email
 * 
 * Verify user email address
 */
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Verification token is required'
      })
    }

    // TODO: Verify email verification token
    // This would typically involve decoding the token and updating the user record

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully'
    })

  } catch (error) {
    console.error('Email verification error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during email verification'
    })
  }
}

/**
 * LOGOUT
 * 
 * POST /api/auth/logout
 * 
 * Logout user (invalidate tokens)
 */
export const logout = async (req: Request, res: Response) => {
  try {
    // TODO: Implement token blacklisting
    // In a production environment, you would typically:
    // 1. Add the token to a blacklist/revoked tokens table
    // 2. Set a short TTL in Redis for performance
    // 3. Check this blacklist in the authentication middleware

    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    })

  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during logout'
    })
  }
}

/**
 * GET CURRENT USER
 * 
 * GET /api/auth/me
 * 
 * Get current authenticated user information
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authenticated'
      })
    }

    // Fetch complete user information
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        phone: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    })

  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

/**
 * IMPLEMENTATION NOTES:
 * 
 * 1. **Security Best Practices**:
 *    - Always hash passwords with bcrypt (salt rounds ≥ 12)
 *    - Use secure, random tokens for email verification and password reset
 *    - Implement rate limiting on auth endpoints
 *    - Add CAPTCHA for registration and login after failed attempts
 *    - Use HTTPS in production
 * 
 * 2. **Validation**:
 *    - Implement proper input validation using Joi or Zod
 *    - Validate email format and password strength
 *    - Sanitize user inputs to prevent XSS
 * 
 * 3. **Error Handling**:
 *    - Don't expose sensitive information in error messages
 *    - Log authentication events for monitoring
 *    - Implement consistent error response format
 * 
 * 4. **Performance**:
 *    - Cache user sessions in Redis
 *    - Use database indexes on email and other frequently queried fields
 *    - Implement connection pooling for database
 * 
 * NEXT STEPS:
 * 1. Implement proper input validation
 * 2. Set up email service (nodemailer)
 * 3. Add password strength validation
 * 4. Implement rate limiting
 * 5. Add comprehensive tests
 * 6. Set up monitoring and logging
 */ 
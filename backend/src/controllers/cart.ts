/**
 * CART CONTROLLER
 * 
 * Handles shopping cart operations
 */

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GET USER CART
 * GET /api/cart
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            images: {
              where: { isPrimary: true },
              take: 1
            },
            brand: {
              select: { name: true }
            }
          }
        },
        variant: true
      }
    })

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      const price = item.variant?.price || item.product.price
      return sum + (price * item.quantity)
    }, 0)

    res.status(200).json({
      status: 'success',
      data: {
        items: cartItems,
        itemCount: cartItems.length,
        subtotal
      }
    })

  } catch (error) {
    console.error('Get cart error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch cart'
    })
  }
}

/**
 * ADD ITEM TO CART
 * POST /api/cart
 */
export const addToCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const { productId, variantId, quantity = 1 } = req.body

    // Validate product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { variants: true }
    })

    if (!product || !product.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      })
    }

    // Check stock availability
    if (product.trackInventory && product.stock < quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient stock'
      })
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId_variantId: {
          userId: req.user.id,
          productId,
          variantId: variantId || null
        }
      }
    })

    let cartItem

    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity
        },
        include: {
          product: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1
              }
            }
          },
          variant: true
        }
      })
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user.id,
          productId,
          variantId,
          quantity
        },
        include: {
          product: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1
              }
            }
          },
          variant: true
        }
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Item added to cart',
      data: { cartItem }
    })

  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to add item to cart'
    })
  }
}

/**
 * UPDATE CART ITEM QUANTITY
 * PUT /api/cart/:id
 */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const { id } = req.params
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Quantity must be at least 1'
      })
    }

    // Verify ownership
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId: req.user.id
      },
      include: { product: true }
    })

    if (!cartItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart item not found'
      })
    }

    // Check stock
    if (cartItem.product.trackInventory && cartItem.product.stock < quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient stock'
      })
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: {
        product: {
          include: {
            images: {
              where: { isPrimary: true },
              take: 1
            }
          }
        },
        variant: true
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'Cart updated',
      data: { cartItem: updatedItem }
    })

  } catch (error) {
    console.error('Update cart error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to update cart'
    })
  }
}

/**
 * REMOVE ITEM FROM CART
 * DELETE /api/cart/:id
 */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const { id } = req.params

    // Verify ownership
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    })

    if (!cartItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart item not found'
      })
    }

    await prisma.cartItem.delete({
      where: { id }
    })

    res.status(200).json({
      status: 'success',
      message: 'Item removed from cart'
    })

  } catch (error) {
    console.error('Remove from cart error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to remove item from cart'
    })
  }
}

/**
 * CLEAR CART
 * DELETE /api/cart
 */
export const clearCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    })

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared'
    })

  } catch (error) {
    console.error('Clear cart error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to clear cart'
    })
  }
}


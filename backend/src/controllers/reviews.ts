/**
 * REVIEWS CONTROLLER
 * 
 * Handles product review operations
 */

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GET PRODUCT REVIEWS
 * GET /api/reviews/product/:productId
 */
export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const { page = '1', limit = '10', sortBy = 'newest' } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    let orderBy: any = { createdAt: 'desc' }
    if (sortBy === 'rating-high') {
      orderBy = { rating: 'desc' }
    } else if (sortBy === 'rating-low') {
      orderBy = { rating: 'asc' }
    } else if (sortBy === 'helpful') {
      orderBy = { helpfulVotes: 'desc' }
    }

    const [reviews, total, stats] = await Promise.all([
      prisma.review.findMany({
        where: { productId },
        skip,
        take: limitNum,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        }
      }),
      prisma.review.count({ where: { productId } }),
      prisma.review.groupBy({
        by: ['rating'],
        where: { productId },
        _count: { rating: true }
      })
    ])

    // Calculate rating distribution
    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
    stats.forEach(stat => {
      ratingDistribution[stat.rating as keyof typeof ratingDistribution] = stat._count.rating
    })

    // Calculate average rating
    const totalRatings = stats.reduce((sum, stat) => sum + stat._count.rating, 0)
    const sumRatings = stats.reduce((sum, stat) => sum + (stat.rating * stat._count.rating), 0)
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0

    res.status(200).json({
      status: 'success',
      data: {
        reviews,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        },
        stats: {
          averageRating,
          totalReviews: totalRatings,
          ratingDistribution
        }
      }
    })

  } catch (error) {
    console.error('Get reviews error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reviews'
    })
  }
}

/**
 * CREATE REVIEW
 * POST /api/reviews
 */
export const createReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const {
      productId,
      rating,
      title,
      comment,
      images = [],
      isRecommended = false
    } = req.body

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        status: 'error',
        message: 'Rating must be between 1 and 5'
      })
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      })
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId
        }
      }
    })

    if (existingReview) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already reviewed this product'
      })
    }

    // Check if user purchased this product (verified purchase)
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: req.user.id,
          status: 'DELIVERED'
        }
      }
    })

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        productId,
        rating,
        title,
        comment,
        images,
        isRecommended,
        isVerified: !!hasPurchased
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    })

    // Update product rating
    const allReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true }
    })

    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: avgRating,
        reviewCount: allReviews.length
      }
    })

    res.status(201).json({
      status: 'success',
      message: 'Review submitted successfully',
      data: { review }
    })

  } catch (error) {
    console.error('Create review error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to create review'
    })
  }
}

/**
 * UPDATE REVIEW
 * PUT /api/reviews/:id
 */
export const updateReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const { id } = req.params
    const { rating, title, comment, images, isRecommended } = req.body

    // Verify ownership
    const existingReview = await prisma.review.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    })

    if (!existingReview) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      })
    }

    const review = await prisma.review.update({
      where: { id },
      data: {
        rating,
        title,
        comment,
        images,
        isRecommended
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    })

    // Update product rating
    const allReviews = await prisma.review.findMany({
      where: { productId: existingReview.productId },
      select: { rating: true }
    })

    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

    await prisma.product.update({
      where: { id: existingReview.productId },
      data: { rating: avgRating }
    })

    res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: { review }
    })

  } catch (error) {
    console.error('Update review error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to update review'
    })
  }
}

/**
 * DELETE REVIEW
 * DELETE /api/reviews/:id
 */
export const deleteReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const { id } = req.params

    // Verify ownership
    const review = await prisma.review.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    })

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      })
    }

    await prisma.review.delete({
      where: { id }
    })

    // Update product rating
    const remainingReviews = await prisma.review.findMany({
      where: { productId: review.productId },
      select: { rating: true }
    })

    const avgRating = remainingReviews.length > 0
      ? remainingReviews.reduce((sum, r) => sum + r.rating, 0) / remainingReviews.length
      : 0

    await prisma.product.update({
      where: { id: review.productId },
      data: {
        rating: avgRating,
        reviewCount: remainingReviews.length
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'Review deleted successfully'
    })

  } catch (error) {
    console.error('Delete review error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete review'
    })
  }
}

/**
 * VOTE REVIEW AS HELPFUL
 * POST /api/reviews/:id/helpful
 */
export const voteReviewHelpful = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const review = await prisma.review.update({
      where: { id },
      data: {
        helpfulVotes: { increment: 1 }
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'Vote recorded',
      data: { review }
    })

  } catch (error) {
    console.error('Vote review error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to vote review'
    })
  }
}


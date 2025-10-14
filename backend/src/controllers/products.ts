/**
 * PRODUCTS CONTROLLER
 * 
 * Handles all product-related operations including:
 * - Product listing with filters, search, and pagination
 * - Product details
 * - Product creation (vendor/admin)
 * - Product updates (vendor/admin)
 * - Product deletion (vendor/admin)
 */

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GET ALL PRODUCTS
 * GET /api/products
 * 
 * Query parameters:
 * - page: page number (default: 1)
 * - limit: items per page (default: 20)
 * - search: search query
 * - category: category ID
 * - brand: brand ID
 * - minPrice: minimum price
 * - maxPrice: maximum price
 * - sortBy: name | price | rating | newest (default: newest)
 * - isOnSale: boolean
 * - isFeatured: boolean
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '20',
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sortBy = 'newest',
      isOnSale,
      isFeatured
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    // Build where clause
    const where: any = {
      isActive: true
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } }
      ]
    }

    if (category) {
      where.categoryId = category as string
    }

    if (brand) {
      where.brandId = brand as string
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice as string)
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string)
    }

    if (isOnSale === 'true') {
      where.isOnSale = true
    }

    if (isFeatured === 'true') {
      where.isFeatured = true
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: 'desc' }
    switch (sortBy) {
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'price':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'rating':
        orderBy = { rating: 'desc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
        break
    }

    // Fetch products
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          brand: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          vendor: {
            select: {
              id: true,
              name: true,
              slug: true,
              rating: true
            }
          },
          images: {
            where: { isPrimary: true },
            take: 1
          }
        }
      }),
      prisma.product.count({ where })
    ])

    res.status(200).json({
      status: 'success',
      data: {
        products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    })

  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch products'
    })
  }
}

/**
 * GET SINGLE PRODUCT
 * GET /api/products/:id
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        vendor: {
          select: {
            id: true,
            name: true,
            slug: true,
            rating: true,
            reviewCount: true
          }
        },
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        variants: {
          where: { isActive: true }
        },
        specifications: true,
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
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
        }
      }
    })

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      })
    }

    // Increment view count
    await prisma.product.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    })

    res.status(200).json({
      status: 'success',
      data: { product }
    })

  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to get product from database'
    })
  }
}

/**
 * CREATE PRODUCT
 * POST /api/products
 * 
 * Requires: VENDOR or ADMIN role
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      costPrice,
      stock,
      sku,
      categoryId,
      brandId,
      tags,
      weight,
      dimensions,
      metaTitle,
      metaDescription,
      isOnSale,
      isFeatured,
      images,
      variants,
      specifications
    } = req.body

    // Get or create vendor for user
    let vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id }
    })

    if (!vendor && req.user.role === 'VENDOR') {
      return res.status(403).json({
        status: 'error',
        message: 'Vendor account not found. Please complete vendor registration.'
      })
    }

    // If admin, use first vendor or create placeholder
    if (req.user.role === 'ADMIN' && !vendor) {
      vendor = await prisma.vendor.findFirst()
    }

    if (!vendor) {
      return res.status(400).json({
        status: 'error',
        message: 'No vendor available'
      })
    }

    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        price,
        originalPrice,
        costPrice,
        stock,
        sku,
        categoryId,
        brandId,
        vendorId: vendor.id,
        tags,
        weight,
        dimensions,
        metaTitle,
        metaDescription,
        isOnSale: isOnSale || false,
        isFeatured: isFeatured || false,
        images: images ? {
          create: images.map((img: any, index: number) => ({
            url: img.url,
            alt: img.alt || name,
            isPrimary: index === 0,
            sortOrder: index
          }))
        } : undefined,
        variants: variants ? {
          create: variants
        } : undefined,
        specifications: specifications ? {
          create: specifications
        } : undefined
      },
      include: {
        category: true,
        brand: true,
        vendor: true,
        images: true,
        variants: true,
        specifications: true
      }
    })

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: { product }
    })

  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to create product'
    })
  }
}

/**
 * UPDATE PRODUCT
 * PUT /api/products/:id
 * 
 * Requires: VENDOR (owner) or ADMIN role
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    // Check product ownership
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { vendor: true }
    })

    if (!existingProduct) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      })
    }

    // Check authorization
    if (req.user.role === 'VENDOR' && existingProduct.vendor.userId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You can only update your own products'
      })
    }

    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      stock,
      isActive,
      isOnSale,
      isFeatured,
      tags,
      metaTitle,
      metaDescription
    } = req.body

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        shortDescription,
        price,
        originalPrice,
        stock,
        isActive,
        isOnSale,
        isFeatured,
        tags,
        metaTitle,
        metaDescription
      },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: { product }
    })

  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to update product'
    })
  }
}

/**
 * DELETE PRODUCT
 * DELETE /api/products/:id
 * 
 * Requires: VENDOR (owner) or ADMIN role
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      })
    }

    // Check product ownership
    const product = await prisma.product.findUnique({
      where: { id },
      include: { vendor: true }
    })

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      })
    }

    // Check authorization
    if (req.user.role === 'VENDOR' && product.vendor.userId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You can only delete your own products'
      })
    }

    // Soft delete (set isActive to false)
    await prisma.product.update({
      where: { id },
      data: { isActive: false }
    })

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    })

  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete product'
    })
  }
}

/**
 * GET FEATURED PRODUCTS
 * GET /api/products/featured
 */
export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const { limit = '10' } = req.query

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        },
        brand: {
          select: { id: true, name: true, slug: true }
        },
        images: {
          where: { isPrimary: true },
          take: 1
        }
      }
    })

    res.status(200).json({
      status: 'success',
      data: { products }
    })

  } catch (error) {
    console.error('Get featured products error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch featured products'
    })
  }
}


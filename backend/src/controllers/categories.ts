/**
 * CATEGORIES CONTROLLER
 * 
 * Handles category management operations
 */

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GET ALL CATEGORIES
 * GET /api/categories
 */
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        parent: {
          select: { id: true, name: true, slug: true }
        },
        children: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            slug: true,
            image: true
          }
        },
        _count: {
          select: { products: true }
        }
      }
    })

    res.status(200).json({
      status: 'success',
      data: { categories }
    })

  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch categories'
    })
  }
}

/**
 * GET CATEGORY BY ID/SLUG
 * GET /api/categories/:identifier
 */
export const getCategoryByIdentifier = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params

    const category = await prisma.category.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ],
        isActive: true
      },
      include: {
        parent: true,
        children: {
          where: { isActive: true }
        },
        products: {
          where: { isActive: true },
          take: 20,
          include: {
            images: {
              where: { isPrimary: true },
              take: 1
            },
            brand: {
              select: { name: true }
            }
          }
        }
      }
    })

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: { category }
    })

  } catch (error) {
    console.error('Get category error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch category'
    })
  }
}

/**
 * CREATE CATEGORY
 * POST /api/categories
 * Requires: ADMIN role
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, image, parentId, sortOrder } = req.body

    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        parentId,
        sortOrder: sortOrder || 0
      }
    })

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: { category }
    })

  } catch (error) {
    console.error('Create category error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to create category'
    })
  }
}

/**
 * UPDATE CATEGORY
 * PUT /api/categories/:id
 * Requires: ADMIN role
 */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, image, isActive, sortOrder } = req.body

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        image,
        isActive,
        sortOrder
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'Category updated successfully',
      data: { category }
    })

  } catch (error) {
    console.error('Update category error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to update category'
    })
  }
}

/**
 * DELETE CATEGORY
 * DELETE /api/categories/:id
 * Requires: ADMIN role
 */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Soft delete
    await prisma.category.update({
      where: { id },
      data: { isActive: false }
    })

    res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully'
    })

  } catch (error) {
    console.error('Delete category error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete category'
    })
  }
}


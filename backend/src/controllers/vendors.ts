/**
 * VENDORS CONTROLLER
 *
 * Handles vendor management operations
 */

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET ALL VENDORS
 * GET /api/vendors
 */
export const getAllVendors = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "20", isVerified } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      isActive: true,
    };

    if (isVerified === "true") {
      where.isVerified = true;
    }

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { rating: "desc" },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          logo: true,
          banner: true,
          rating: true,
          reviewCount: true,
          totalOrders: true,
          isVerified: true,
          _count: {
            select: { products: true },
          },
        },
      }),
      prisma.vendor.count({ where }),
    ]);

    res.status(200).json({
      status: "success",
      data: {
        vendors,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("Get vendors error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch vendors",
    });
  }
};

/**
 * GET VENDOR BY ID/SLUG
 * GET /api/vendors/:identifier
 */
export const getVendorByIdentifier = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;

    const vendor = await prisma.vendor.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
        isActive: true,
      },
      include: {
        products: {
          where: { isActive: true },
          take: 20,
          include: {
            images: {
              where: { isPrimary: true },
              take: 1,
            },
            category: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { vendor },
    });
  } catch (error) {
    console.error("Get vendor error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch vendor",
    });
  }
};

/**
 * CREATE VENDOR (Register as vendor)
 * POST /api/vendors
 */
export const createVendor = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    // Check if user already has a vendor account
    const existingVendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (existingVendor) {
      return res.status(400).json({
        status: "error",
        message: "You already have a vendor account",
      });
    }

    const {
      name,
      description,
      logo,
      banner,
      website,
      phone,
      businessName,
      businessRegistration,
      taxNumber,
    } = req.body;

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Create vendor
    const vendor = await prisma.vendor.create({
      data: {
        userId: req.user.id,
        name,
        slug,
        description,
        logo,
        banner,
        website,
        phone,
        businessName,
        businessRegistration,
        taxNumber,
      },
    });

    // Update user role to VENDOR
    await prisma.user.update({
      where: { id: req.user.id },
      data: { role: "VENDOR" },
    });

    res.status(201).json({
      status: "success",
      message: "Vendor account created successfully. Awaiting verification.",
      data: { vendor },
    });
  } catch (error) {
    console.error("Create vendor error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create vendor account",
    });
  }
};

/**
 * UPDATE VENDOR
 * PUT /api/vendors/:id
 */
export const updateVendor = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params;

    // Verify ownership
    const existingVendor = await prisma.vendor.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingVendor && req.user.role !== "ADMIN") {
      return res.status(403).json({
        status: "error",
        message: "Access denied",
      });
    }

    const {
      name,
      description,
      logo,
      banner,
      website,
      phone,
      businessName,
      businessRegistration,
      taxNumber,
    } = req.body;

    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        name,
        description,
        logo,
        banner,
        website,
        phone,
        businessName,
        businessRegistration,
        taxNumber,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Vendor updated successfully",
      data: { vendor },
    });
  } catch (error) {
    console.error("Update vendor error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update vendor",
    });
  }
};

/**
 * VERIFY VENDOR (ADMIN only)
 * POST /api/vendors/:id/verify
 */
export const verifyVendor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
        isActive: true,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Vendor verified successfully",
      data: { vendor },
    });
  } catch (error) {
    console.error("Verify vendor error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to verify vendor",
    });
  }
};

/**
 * GET VENDOR DASHBOARD STATS
 * GET /api/vendors/dashboard/stats
 */
export const getVendorDashboard = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor account not found",
      });
    }

    // Get statistics
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.product.count({
        where: { vendorId: vendor.id },
      }),
      prisma.product.count({
        where: {
          vendorId: vendor.id,
          isActive: true,
        },
      }),
      prisma.orderItem.count({
        where: { vendorId: vendor.id },
      }),
      prisma.orderItem.count({
        where: {
          vendorId: vendor.id,
          order: {
            status: { in: ["PENDING", "CONFIRMED"] },
          },
        },
      }),
      prisma.orderItem.aggregate({
        where: {
          vendorId: vendor.id,
          order: {
            paymentStatus: "PAID",
          },
        },
        _sum: { total: true },
      }),
    ]);

    // Get recent orders
    const recentOrders = await prisma.orderItem.findMany({
      where: { vendorId: vendor.id },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            total: true,
            createdAt: true,
          },
        },
        product: {
          select: {
            name: true,
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        stats: {
          totalProducts,
          activeProducts,
          totalOrders,
          pendingOrders,
          totalRevenue: totalRevenue._sum.total || 0,
          rating: vendor.rating,
          reviewCount: vendor.reviewCount,
        },
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Get vendor dashboard error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch dashboard data",
    });
  }
};

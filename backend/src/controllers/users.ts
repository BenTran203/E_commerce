/**
 * USERS CONTROLLER
 *
 * Handles user profile and account management operations
 */

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * GET USER PROFILE
 * GET /api/users/profile
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

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
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user profile",
    });
  }
};

/**
 * UPDATE USER PROFILE
 * PUT /api/users/profile
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { firstName, lastName, phone, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        phone,
        avatar,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update profile",
    });
  }
};

/**
 * CHANGE PASSWORD
 * POST /api/users/change-password
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: "error",
        message: "Current password and new password are required",
      });
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        status: "error",
        message: "New password must be at least 8 characters long",
      });
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to change password",
    });
  }
};

/**
 * GET USER ADDRESSES
 * GET /api/users/addresses
 */
export const getUserAddresses = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: { isDefault: "desc" },
    });

    res.status(200).json({
      status: "success",
      data: { addresses },
    });
  } catch (error) {
    console.error("Get addresses error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch addresses",
    });
  }
};

/**
 * CREATE ADDRESS
 * POST /api/users/addresses
 */
export const createAddress = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const {
      firstName,
      lastName,
      company,
      address1,
      address2,
      city,
      state,
      country,
      postalCode,
      phone,
      isDefault,
    } = req.body;

    // If this is set as default, unset other default addresses
    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: req.user.id,
          isDefault: true,
        },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: req.user.id,
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        state,
        country,
        postalCode,
        phone,
        isDefault: isDefault || false,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Address created successfully",
      data: { address },
    });
  } catch (error) {
    console.error("Create address error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create address",
    });
  }
};

/**
 * UPDATE ADDRESS
 * PUT /api/users/addresses/:id
 */
export const updateAddress = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params;
    const {
      firstName,
      lastName,
      company,
      address1,
      address2,
      city,
      state,
      country,
      postalCode,
      phone,
      isDefault,
    } = req.body;

    // Verify ownership
    const existingAddress = await prisma.address.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingAddress) {
      return res.status(404).json({
        status: "error",
        message: "Address not found",
      });
    }

    // If this is set as default, unset other default addresses
    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: req.user.id,
          isDefault: true,
          id: { not: id },
        },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id },
      data: {
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        state,
        country,
        postalCode,
        phone,
        isDefault,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Address updated successfully",
      data: { address },
    });
  } catch (error) {
    console.error("Update address error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update address",
    });
  }
};

/**
 * DELETE ADDRESS
 * DELETE /api/users/addresses/:id
 */
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params;

    // Verify ownership
    const address = await prisma.address.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!address) {
      return res.status(404).json({
        status: "error",
        message: "Address not found",
      });
    }

    await prisma.address.delete({
      where: { id },
    });

    res.status(200).json({
      status: "success",
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete address",
    });
  }
};

/**
 * GET USER WISHLIST
 * GET /api/users/wishlist
 */
export const getUserWishlist = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            images: {
              where: { isPrimary: true },
              take: 1,
            },
            brand: {
              select: { name: true },
            },
            category: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "success",
      data: { wishlistItems },
    });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch wishlist",
    });
  }
};

/**
 * ADD TO WISHLIST
 * POST /api/users/wishlist
 */
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { productId } = req.body;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    // Check if already in wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId,
        },
      },
    });

    if (existingItem) {
      return res.status(400).json({
        status: "error",
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: req.user.id,
        productId,
      },
      include: {
        product: {
          include: {
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
    });

    res.status(201).json({
      status: "success",
      message: "Added to wishlist",
      data: { wishlistItem },
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add to wishlist",
    });
  }
};

/**
 * REMOVE FROM WISHLIST
 * DELETE /api/users/wishlist/:productId
 */
export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { productId } = req.params;

    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId,
        },
      },
    });

    if (!wishlistItem) {
      return res.status(404).json({
        status: "error",
        message: "Item not found in wishlist",
      });
    }

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId,
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to remove from wishlist",
    });
  }
};

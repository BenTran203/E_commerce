/**
 * ORDERS CONTROLLER
 *
 * Handles order management operations
 */

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Generate unique order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * CREATE ORDER
 * POST /api/orders
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const {
      items,
      shippingAddressId,
      billingAddressId,
      paymentMethod = "CARD",
      customerNotes,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Order must contain at least one item",
      });
    }

    // Validate addresses
    const [shippingAddress, billingAddress] = await Promise.all([
      prisma.address.findFirst({
        where: {
          id: shippingAddressId,
          userId: req.user.id,
        },
      }),
      prisma.address.findFirst({
        where: {
          id: billingAddressId,
          userId: req.user.id,
        },
      }),
    ]);

    if (!shippingAddress || !billingAddress) {
      return res.status(400).json({
        status: "error",
        message: "Invalid shipping or billing address",
      });
    }

    // Calculate totals and validate items
    let subtotal = 0;
    const orderItems: any[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          vendor: true,
        },
      });

      if (!product || !product.isActive) {
        return res.status(400).json({
          status: "error",
          message: `Product ${item.productId} not found or inactive`,
        });
      }

      // Check stock
      if (product.trackInventory && product.stock < item.quantity) {
        return res.status(400).json({
          status: "error",
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const price = product.price;
      const total = price * item.quantity;

      subtotal += total;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productImage: product.images[0]?.url,
        productSku: product.sku,
        quantity: item.quantity,
        price,
        total,
        variantId: item.variantId,
        vendorId: product.vendorId,
      });
    }

    // Calculate additional costs
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: req.user.id,
        customerEmail: req.user.email,
        shippingAddressId,
        billingAddressId,
        subtotal,
        tax,
        shipping,
        total,
        customerNotes,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
          salesCount: { increment: item.quantity },
        },
      });
    }

    // Clear cart items
    await prisma.cartItem.deleteMany({
      where: {
        userId: req.user.id,
        productId: { in: items.map((i: any) => i.productId) },
      },
    });

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: { order },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
    });
  }
};

/**
 * GET USER ORDERS
 * GET /api/orders
 */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { page = "1", limit = "10", status } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      userId: req.user.id,
    };

    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          shippingAddress: true,
        },
      }),
      prisma.order.count({ where }),
    ]);

    res.status(200).json({
      status: "success",
      data: {
        orders,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch orders",
    });
  }
};

/**
 * GET ORDER BY ID
 * GET /api/orders/:id
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
            variant: true,
            vendor: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        shippingAddress: true,
        billingAddress: true,
        payments: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch order",
    });
  }
};

/**
 * CANCEL ORDER
 * POST /api/orders/:id/cancel
 */
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    // Can only cancel pending or confirmed orders
    if (!["PENDING", "CONFIRMED"].includes(order.status)) {
      return res.status(400).json({
        status: "error",
        message: "Order cannot be cancelled at this stage",
      });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: "CANCELLED",
      },
    });

    // Restore product stock
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: { increment: item.quantity },
          salesCount: { decrement: item.quantity },
        },
      });
    }

    res.status(200).json({
      status: "success",
      message: "Order cancelled successfully",
      data: { order: updatedOrder },
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to cancel order",
    });
  }
};

/**
 * UPDATE ORDER STATUS (ADMIN/VENDOR)
 * PUT /api/orders/:id/status
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    const updateData: any = { status };

    if (status === "SHIPPED" && trackingNumber) {
      updateData.trackingNumber = trackingNumber;
      updateData.shippedAt = new Date();
    }

    if (status === "DELIVERED") {
      updateData.deliveredAt = new Date();
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      message: "Order status updated",
      data: { order },
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update order status",
    });
  }
};

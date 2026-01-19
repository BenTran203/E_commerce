/**
 * DASHBOARD CONTROLLER
 * 
 * Provides real-time statistics and analytics for the admin dashboard
 * Calculates metrics and comparisons with previous periods
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../utils/errorHandler';

const prisma = new PrismaClient();

/**
 * Get Dashboard Statistics
 * GET /api/admin/dashboard/stats
 * 
 * Returns:
 * - Total sales, orders, products, customers
 * - Percentage changes compared to previous 30 days
 * - Recent orders
 */
export const getDashboardStats = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      console.log(' Fetching dashboard statistics...');

      // Calculate date ranges
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

      // Fetch data in parallel for better performance
      const [
        currentPeriodOrders,
        previousPeriodOrders,
        totalProducts,
        previousProducts,
        totalCustomers,
        previousCustomers,
        recentOrders,
      ] = await Promise.all([
        // Current period (last 30 days) orders and sales
        prisma.order.aggregate({
          where: {
            createdAt: { gte: thirtyDaysAgo },
            status: { not: 'CANCELLED' },
          },
          _sum: { total: true },
          _count: { id: true },
        }),

        // Previous period (30-60 days ago) orders and sales
        prisma.order.aggregate({
          where: {
            createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
            status: { not: 'CANCELLED' },
          },
          _sum: { total: true },
          _count: { id: true },
        }),

        // Current active products
        prisma.product.count({
          where: { isActive: true },
        }),

        // Products count 30 days ago (approximation)
        prisma.product.count({
          where: {
            isActive: true,
            createdAt: { lt: thirtyDaysAgo },
          },
        }),

        // Current customers
        prisma.user.count({
          where: { role: 'CUSTOMER' },
        }),

        // Customers 30 days ago
        prisma.user.count({
          where: {
            role: 'CUSTOMER',
            createdAt: { lt: thirtyDaysAgo },
          },
        }),

        // Recent orders for the dashboard table
        prisma.order.findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        }),
      ]);

      // Calculate current period metrics
      const totalSales = currentPeriodOrders._sum.total || 0;
      const totalOrders = currentPeriodOrders._count.id;

      // Calculate previous period metrics
      const previousSales = previousPeriodOrders._sum.total || 0;
      const previousOrders = previousPeriodOrders._count.id;

      // Calculate percentage changes
      const salesChange = previousSales > 0
        ? ((totalSales - previousSales) / previousSales) * 100
        : totalSales > 0 ? 100 : 0;

      const ordersChange = previousOrders > 0
        ? ((totalOrders - previousOrders) / previousOrders) * 100
        : totalOrders > 0 ? 100 : 0;

      const productsChange = previousProducts > 0
        ? ((totalProducts - previousProducts) / previousProducts) * 100
        : totalProducts > previousProducts ? 100 : 0;

      const customersChange = previousCustomers > 0
        ? ((totalCustomers - previousCustomers) / previousCustomers) * 100
        : totalCustomers > previousCustomers ? 100 : 0;

      // Format recent orders
      const formattedRecentOrders = recentOrders.map((order) => ({
        id: order.id,
        orderNumber: `ORD-${order.id.slice(-6).toUpperCase()}`,
        customer: `${order.user.firstName} ${order.user.lastName}`,
        customerEmail: order.user.email,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
      }));

      console.log(' Dashboard statistics calculated successfully');

      res.status(200).json({
        status: 'success',
        data: {
          stats: {
            totalSales,
            salesChange: Number(salesChange.toFixed(1)),
            totalOrders,
            ordersChange: Number(ordersChange.toFixed(1)),
            totalProducts,
            productsChange: Number(productsChange.toFixed(1)),
            totalUsers: totalCustomers,
            usersChange: Number(customersChange.toFixed(1)),
          },
          recentOrders: formattedRecentOrders,
          period: {
            current: {
              start: thirtyDaysAgo.toISOString(),
              end: now.toISOString(),
            },
            previous: {
              start: sixtyDaysAgo.toISOString(),
              end: thirtyDaysAgo.toISOString(),
            },
          },
        },
      });
    } catch (error: any) {
      console.error('Dashboard stats error:', error);
      throw new AppError(
        'Failed to fetch dashboard statistics',
        500,
        'DASHBOARD_ERROR',
        { originalError: error.message }
      );
    }
  }
);

/**
 * Get Recent Activity
 * GET /api/admin/dashboard/activity
 * 
 * Returns recent activities like new orders, customers, products
 */
export const getRecentActivity = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const [newOrders, newCustomers] = await Promise.all([
        prisma.order.findMany({
          where: { createdAt: { gte: sevenDaysAgo } },
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            total: true,
            status: true,
            createdAt: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        }),

        prisma.user.findMany({
          where: {
            role: 'CUSTOMER',
            createdAt: { gte: sevenDaysAgo },
          },
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
          },
        }),
      ]);

      const activities = [
        ...newOrders.map((order) => ({
          type: 'order',
          id: order.id,
          description: `New order from ${order.user.firstName} ${order.user.lastName}`,
          amount: order.total,
          status: order.status,
          timestamp: order.createdAt,
        })),
        ...newCustomers.map((customer) => ({
          type: 'customer',
          id: customer.id,
          description: `New customer: ${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          timestamp: customer.createdAt,
        })),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);

      res.status(200).json({
        status: 'success',
        data: { activities },
      });
    } catch (error: any) {
      console.error('Recent activity error:', error);
      throw new AppError(
        'Failed to fetch recent activity',
        500,
        'ACTIVITY_ERROR',
        { originalError: error.message }
      );
    }
  }
);

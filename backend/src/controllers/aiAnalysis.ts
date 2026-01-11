/**
 * AI ANALYSIS CONTROLLER
 * 
 * Handles AI-powered dashboard analysis and graph generation
 * Uses OpenAI API with comprehensive error handling
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { openai, OPENAI_CONFIG, estimateCost } from '../config/openai';
import { asyncHandler, AppError } from '../utils/errorHandler';

const prisma = new PrismaClient();

/**
 * Generate Comprehensive Dashboard Analysis
 * POST /api/admin/ai-analysis/dashboard
 * 
 * Analyzes:
 * - Sales trends and anomalies
 * - Customer behavior patterns
 * - Product performance insights
 * - Inventory recommendations
 * - Seasonal patterns
 * - Risk alerts
 */
export const generateDashboardAnalysis = asyncHandler(
  async (req: Request, res: Response) => {
    const startTime = Date.now();

    // Validate user authentication (done by middleware, but double-check)
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    if (req.user.role !== 'ADMIN') {
      throw new AppError('Admin access required', 403, 'FORBIDDEN');
    }

    try {
      console.log(`🤖 Generating AI dashboard analysis for user: ${req.user.email}`);

      // Step 1: Fetch dashboard data with timeout protection
      const timeoutMs = 30000; // 30 seconds
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Data fetch timeout')), timeoutMs)
      );

      const dataPromise = fetchDashboardData();

      const dashboardData = await Promise.race([
        dataPromise,
        timeoutPromise,
      ]) as Awaited<ReturnType<typeof fetchDashboardData>>;

      console.log('✅ Dashboard data fetched successfully');

      // Step 2: Prepare data context for OpenAI
      const dataContext = prepareDashboardContext(dashboardData);

      // Step 3: Generate AI analysis
      const analysis = await generateAIAnalysis(dataContext);

      // Step 4: Calculate metrics
      const duration = Date.now() - startTime;
      const estimatedTokens = JSON.stringify(dataContext).length + JSON.stringify(analysis).length;
      const cost = estimateCost(estimatedTokens);

      console.log(`✅ AI analysis completed in ${duration}ms (Est. cost: $${cost.toFixed(4)})`);

      // Step 5: Return response
      res.status(200).json({
        status: 'success',
        data: {
          analysis,
          metadata: {
            dataRange: '30 days',
            generatedAt: new Date().toISOString(),
            model: OPENAI_CONFIG.model,
            duration: `${duration}ms`,
            estimatedCost: `$${cost.toFixed(4)}`,
          },
        },
      });

    } catch (error: any) {
      console.error('❌ Dashboard analysis error:', error);

      // Handle specific error types
      if (error.message === 'Data fetch timeout') {
        throw new AppError(
          'Database query timeout. Please try again.',
          504,
          'DATABASE_TIMEOUT'
        );
      }

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new AppError(
          'Failed to fetch dashboard data from database',
          500,
          'DATABASE_ERROR',
          { prismaError: error.code }
        );
      }

      // OpenAI errors are handled by global error handler
      if (error instanceof Error && error.message.includes('OpenAI')) {
        throw error;
      }

      // Re-throw if it's already an AppError
      if (error instanceof AppError) {
        throw error;
      }

      // Unknown error
      throw new AppError(
        'Failed to generate dashboard analysis',
        500,
        'ANALYSIS_ERROR',
        { originalError: error.message }
      );
    }
  }
);

/**
 * Generate Graph Data for Specific Metric
 * POST /api/admin/ai-analysis/graph/:metric
 * 
 * Metrics: 'sales' | 'orders' | 'products' | 'customers'
 */
export const generateGraphData = asyncHandler(
  async (req: Request, res: Response) => {
    const { metric } = req.params;
    const startTime = Date.now();

    try {
      console.log(`📊 Generating graph for metric: ${metric}`);

      // Fetch data based on metric
      let chartData;
      let aiInsight;

      switch (metric) {
        case 'sales':
          chartData = await generateSalesGraph();
          aiInsight = await generateGraphInsight('sales', chartData);
          break;

        case 'orders':
          chartData = await generateOrdersGraph();
          aiInsight = await generateGraphInsight('orders', chartData);
          break;

        case 'products':
          chartData = await generateProductsGraph();
          aiInsight = await generateGraphInsight('products', chartData);
          break;

        case 'customers':
          chartData = await generateCustomersGraph();
          aiInsight = await generateGraphInsight('customers', chartData);
          break;

        default:
          throw new AppError('Invalid metric', 400, 'INVALID_METRIC');
      }

      const duration = Date.now() - startTime;

      res.status(200).json({
        status: 'success',
        data: {
          metric,
          chartData,
          insight: aiInsight,
          metadata: {
            generatedAt: new Date().toISOString(),
            duration: `${duration}ms`,
          },
        },
      });

    } catch (error: any) {
      console.error(`❌ Graph generation error for ${metric}:`, error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        `Failed to generate graph for ${metric}`,
        500,
        'GRAPH_GENERATION_ERROR',
        { metric, error: error.message }
      );
    }
  }
);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Fetch all dashboard data from database
 */
async function fetchDashboardData() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  const [
    recentOrders,
    previousOrders,
    products,
    users,
    recentUsers,
    previousUsers,
  ] = await Promise.all([
    // Orders from last 30 days
    prisma.order.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      include: {
        items: { include: { product: true } },
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),

    // Orders from 30-60 days ago (for comparison)
    prisma.order.findMany({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),

    // All active products
    prisma.product.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { orderItems: true } },
        orderItems: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true },
        },
      },
    }),

    // All users
    prisma.user.findMany({
      select: {
        id: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
    }),

    // Recent user registrations
    prisma.user.count({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        role: 'CUSTOMER',
      },
    }),

    // Previous period user registrations
    prisma.user.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
        role: 'CUSTOMER',
      },
    }),
  ]);

  return {
    recentOrders,
    previousOrders,
    products,
    users,
    recentUsers,
    previousUsers,
  };
}

/**
 * Prepare dashboard context for AI
 */
function prepareDashboardContext(data: Awaited<ReturnType<typeof fetchDashboardData>>) {
  // Calculate sales metrics
  const recentSalesTotal = data.recentOrders.reduce((sum, order) => sum + order.total, 0);
  const previousSalesTotal = data.previousOrders.reduce((sum, order) => sum + order.total, 0);
  const salesChange = previousSalesTotal > 0 
    ? ((recentSalesTotal - previousSalesTotal) / previousSalesTotal) * 100 
    : 0;

  // Calculate order metrics
  const avgOrderValue = data.recentOrders.length > 0 
    ? recentSalesTotal / data.recentOrders.length 
    : 0;
  const ordersChange = data.previousOrders.length > 0
    ? ((data.recentOrders.length - data.previousOrders.length) / data.previousOrders.length) * 100
    : 0;

  // Product performance
  const topProducts = data.products
    .sort((a, b) => b._count.orderItems - a._count.orderItems)
    .slice(0, 10)
    .map(p => ({
      name: p.name,
      sales: p._count.orderItems,
      price: p.price,
      stock: p.stock,
    }));

  const lowStockProducts = data.products
    .filter(p => p.trackInventory && p.stock < 10)
    .map(p => ({
      name: p.name,
      stock: p.stock,
      sales: p._count.orderItems,
    }));

  // User metrics
  const userChange = data.previousUsers > 0
    ? ((data.recentUsers - data.previousUsers) / data.previousUsers) * 100
    : 0;

  const verifiedUsers = data.users.filter(u => u.isEmailVerified).length;
  const adminUsers = data.users.filter(u => u.role === 'ADMIN').length;

  // Order status distribution
  const ordersByStatus = data.recentOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    period: 'last 30 days',
    sales: {
      total: recentSalesTotal,
      previous: previousSalesTotal,
      change: salesChange.toFixed(2) + '%',
      averageOrderValue: avgOrderValue.toFixed(2),
    },
    orders: {
      total: data.recentOrders.length,
      previous: data.previousOrders.length,
      change: ordersChange.toFixed(2) + '%',
      byStatus: ordersByStatus,
    },
    products: {
      total: data.products.length,
      topSellers: topProducts,
      lowStock: lowStockProducts,
    },
    customers: {
      total: data.users.filter(u => u.role === 'CUSTOMER').length,
      newRegistrations: data.recentUsers,
      previousRegistrations: data.previousUsers,
      change: userChange.toFixed(2) + '%',
      verified: verifiedUsers,
      admins: adminUsers,
    },
  };
}

/**
 * Generate AI analysis using OpenAI
 */
async function generateAIAnalysis(context: any) {
  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: OPENAI_CONFIG.temperature,
      messages: [
        {
          role: 'system',
          content: `You are an expert e-commerce business analyst. Analyze the provided dashboard data and provide actionable insights in these 6 categories:
1. Sales Trends & Anomalies - Identify patterns, unusual spikes/drops
2. Customer Behavior Patterns - Purchase patterns, engagement insights
3. Product Performance Insights - Best/worst sellers, recommendations
4. Inventory Recommendations - Stock alerts, reorder suggestions
5. Seasonal Patterns - Time-based trends, seasonality detection
6. Risk Alerts - Declining metrics, potential issues

Format your response as a JSON object with these keys. Each category should have:
- summary: Brief 1-sentence overview
- insights: Array of 2-3 specific, actionable insights
- priority: "high", "medium", or "low"

Be specific, data-driven, and actionable in your recommendations.`,
        },
        {
          role: 'user',
          content: `Analyze this e-commerce dashboard data:\n\n${JSON.stringify(context, null, 2)}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new AppError('AI generated empty response', 500, 'AI_EMPTY_RESPONSE');
    }

    // Parse JSON response
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // If JSON parsing fails, return as plain text
      return {
        salesTrendsAndAnomalies: { summary: content, insights: [], priority: 'medium' },
      };
    }

  } catch (error: any) {
    if (error.code === 'insufficient_quota') {
      throw new AppError(
        'AI service quota exceeded. Please contact administrator.',
        503,
        'OPENAI_QUOTA_EXCEEDED'
      );
    }

    if (error.status === 429) {
      throw new AppError(
        'AI service rate limit reached. Please try again in a moment.',
        429,
        'OPENAI_RATE_LIMIT'
      );
    }

    throw new AppError(
      'Failed to generate AI analysis',
      500,
      'OPENAI_ERROR',
      { originalError: error.message }
    );
  }
}

/**
 * Generate sales graph data
 */
async function generateSalesGraph() {
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  const salesByDay = await prisma.order.groupBy({
    by: ['createdAt'],
    _sum: { total: true },
    _count: { id: true },
    where: { createdAt: { gte: sixtyDaysAgo } },
    orderBy: { createdAt: 'asc' },
  });

  // Format for line chart (trend over time)
  const lineData = salesByDay.map(day => ({
    date: day.createdAt.toISOString().split('T')[0],
    value: day._sum.total || 0,
    orders: day._count.id,
  }));

  // Format for column chart (week-by-week comparison)
  const columnData = groupByWeek(salesByDay);

  return { lineData, columnData };
}

/**
 * Generate orders graph data
 */
async function generateOrdersGraph() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const ordersByDay = await prisma.order.groupBy({
    by: ['createdAt'],
    _count: { id: true },
    where: { createdAt: { gte: thirtyDaysAgo } },
    orderBy: { createdAt: 'asc' },
  });

  const lineData = ordersByDay.map(day => ({
    date: day.createdAt.toISOString().split('T')[0],
    value: day._count.id,
  }));

  // Orders by status for column chart
  const ordersByStatus = await prisma.order.groupBy({
    by: ['status'],
    _count: { id: true },
    where: { createdAt: { gte: thirtyDaysAgo } },
  });

  const columnData = ordersByStatus.map(status => ({
    category: status.status,
    value: status._count.id,
  }));

  return { lineData, columnData };
}

/**
 * Generate products graph data
 */
async function generateProductsGraph() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      _count: { select: { orderItems: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Product additions over time (line chart)
  const productsByMonth = groupProductsByMonth(products);
  const lineData = productsByMonth;

  // Top 10 products by sales (column chart)
  const columnData = products
    .sort((a, b) => b._count.orderItems - a._count.orderItems)
    .slice(0, 10)
    .map(p => ({
      category: p.name.substring(0, 20), // Truncate long names
      value: p._count.orderItems,
    }));

  return { lineData, columnData };
}

/**
 * Generate customers graph data
 */
async function generateCustomersGraph() {
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  const usersByDay = await prisma.user.groupBy({
    by: ['createdAt'],
    _count: { id: true },
    where: {
      createdAt: { gte: ninetyDaysAgo },
      role: 'CUSTOMER',
    },
    orderBy: { createdAt: 'asc' },
  });

  const lineData = usersByDay.map(day => ({
    date: day.createdAt.toISOString().split('T')[0],
    value: day._count.id,
  }));

  // User distribution (column chart)
  const users = await prisma.user.findMany({
    select: { role: true, isEmailVerified: true },
  });

  const columnData = [
    { category: 'Verified', value: users.filter(u => u.isEmailVerified).length },
    { category: 'Unverified', value: users.filter(u => !u.isEmailVerified).length },
    { category: 'Admins', value: users.filter(u => u.role === 'ADMIN').length },
    { category: 'Customers', value: users.filter(u => u.role === 'CUSTOMER').length },
  ];

  return { lineData, columnData };
}

/**
 * Generate AI insight for specific graph
 */
async function generateGraphInsight(metric: string, chartData: any) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use cheaper model for quick insights
      max_tokens: 200,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: `You are a data analyst. Provide a brief, actionable insight (2-3 sentences) about the ${metric} data provided.`,
        },
        {
          role: 'user',
          content: `Analyze this ${metric} data: ${JSON.stringify(chartData)}`,
        },
      ],
    });

    return completion.choices[0]?.message?.content || 'No insights available.';
  } catch (error) {
    console.error('Graph insight generation error:', error);
    return 'Insights temporarily unavailable.';
  }
}

/**
 * Helper: Group data by week
 */
function groupByWeek(data: any[]) {
  // Implementation for grouping by week
  // Returns array of { week: string, value: number }
  return [];
}

/**
 * Helper: Group products by month
 */
function groupProductsByMonth(products: any[]) {
  // Implementation for grouping products by month
  // Returns array of { date: string, value: number }
  return [];
}

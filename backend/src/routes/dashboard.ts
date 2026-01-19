/**
 * DASHBOARD ROUTES
 * 
 * Admin dashboard statistics and analytics endpoints
 */

import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireAdmin, logAdminAction } from '../middleware/adminAuth';
import { getDashboardStats, getRecentActivity } from '../controllers/dashboard';

const router = Router();

/**
 * GET /api/admin/dashboard/stats
 * Get dashboard statistics and metrics
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 */
router.get(
  '/stats',
  authenticate,
  requireAdmin,
  logAdminAction('View Dashboard Stats'),
  getDashboardStats
);

/**
 * GET /api/admin/dashboard/activity
 * Get recent activity feed
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 */
router.get(
  '/activity',
  authenticate,
  requireAdmin,
  logAdminAction('View Recent Activity'),
  getRecentActivity
);

export default router;

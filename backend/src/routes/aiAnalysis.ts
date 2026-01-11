/**
 * AI ANALYSIS ROUTES
 * 
 * Routes for AI-powered dashboard analysis and chatbot
 * All routes protected with authentication, rate limiting, and caching
 */

import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireAdmin, logAdminAction } from '../middleware/adminAuth';
import {
  aiAnalysisLimiter,
  graphGenerationLimiter,
  chatbotLimiter,
  fileUploadLimiter,
} from '../middleware/rateLimiter';
import { cacheMiddleware } from '../middleware/cache';
import {
  validateMetric,
  sanitizeChatMessage,
  validateFileUpload,
  upload,
} from '../middleware/validation';
import {
  generateDashboardAnalysis,
  generateGraphData,
} from '../controllers/aiAnalysis';
import {
  sendChatbotMessage,
  analyzeUploadedFile,
  clearChatHistory,
  getChatHistory,
} from '../controllers/aiChatbot';

const router = Router();

// ============================================
// DASHBOARD ANALYSIS ROUTES
// ============================================

/**
 * POST /api/admin/ai-analysis/dashboard
 * Generate comprehensive AI analysis of dashboard data
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 * - Rate limit: 5 requests per 15 minutes
 * - Caching: 15 minutes
 */
router.post(
  '/dashboard',
  authenticate,
  requireAdmin,
  logAdminAction('Generate Dashboard Analysis'),
  aiAnalysisLimiter,
  cacheMiddleware(15 * 60), // Cache for 15 minutes
  generateDashboardAnalysis
);

/**
 * POST /api/admin/ai-analysis/graph/:metric
 * Generate graph data with AI insights for specific metric
 * 
 * Metrics: sales | orders | products | customers
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 * - Rate limit: 20 requests per 5 minutes
 * - Caching: 5 minutes
 */
router.post(
  '/graph/:metric',
  authenticate,
  requireAdmin,
  validateMetric,
  graphGenerationLimiter,
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  generateGraphData
);

// ============================================
// CHATBOT ROUTES
// ============================================

/**
 * POST /api/admin/ai-chatbot/message
 * Send message to AI chatbot
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 * - Rate limit: 50 messages per hour
 * - Message sanitization
 */
router.post(
  '/chatbot/message',
  authenticate,
  requireAdmin,
  sanitizeChatMessage,
  chatbotLimiter,
  sendChatbotMessage
);

/**
 * POST /api/admin/ai-chatbot/analyze-file
 * Upload and analyze file with AI
 * 
 * Accepted formats: CSV, TXT, PDF, Excel, JSON
 * Max size: 10MB
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 * - Rate limit: 10 files per hour
 * - File validation
 */
router.post(
  '/chatbot/analyze-file',
  authenticate,
  requireAdmin,
  fileUploadLimiter,
  upload.single('file'),
  validateFileUpload,
  analyzeUploadedFile
);

/**
 * GET /api/admin/ai-chatbot/history
 * Retrieve chat history for current user
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 */
router.get(
  '/chatbot/history',
  authenticate,
  requireAdmin,
  getChatHistory
);

/**
 * DELETE /api/admin/ai-chatbot/history
 * Clear chat history for current user
 * 
 * Protection:
 * - Authentication required
 * - Admin role required
 */
router.delete(
  '/chatbot/history',
  authenticate,
  requireAdmin,
  clearChatHistory
);

// ============================================
// HEALTH CHECK
// ============================================

/**
 * GET /api/admin/ai-analysis/health
 * Check if AI services are available
 */
router.get('/health', authenticate, requireAdmin, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'AI analysis service is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;

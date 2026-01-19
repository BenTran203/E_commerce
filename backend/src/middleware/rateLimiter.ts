/**
 * RATE LIMITING MIDDLEWARE
 * 
 * Protects AI endpoints from abuse and controls costs
 * Different limits for different endpoint types
 */

import rateLimit from 'express-rate-limit';

// Helper function to generate rate limit keys with IPv6 support
const generateKey = (req: any): string => {
  // Prefer user ID if authenticated
  if (req.user?.id) {
    return `user:${req.user.id}`;
  }
  
  // Fall back to IP (properly handling IPv6)
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  
  // Normalize IPv6 addresses
  // IPv6 addresses can have multiple representations, normalize them
  let normalizedIp = ip;
  if (ip.includes(':')) {
    // It's an IPv6 address
    // Remove IPv4-mapped IPv6 prefix (::ffff:)
    normalizedIp = ip.replace(/^::ffff:/i, '');
  }
  
  return `ip:${normalizedIp}`;
};

/**
 * In-memory store for rate limiting
 * For production with multiple servers, use Redis store:
 * 
 * import RedisStore from 'rate-limit-redis';
 * import Redis from 'ioredis';
 * 
 * const redis = new Redis({
 *   host: process.env.REDIS_HOST || 'localhost',
 *   port: parseInt(process.env.REDIS_PORT || '6379'),
 * });
 */

/**
 * Rate limiter for AI Analysis endpoint
 * Strictest limits - this is the most expensive operation
 */
export const aiAnalysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per 15 minutes per user
  message: {
    status: 'error',
    message: 'Too many AI analysis requests. Please try again in 15 minutes.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: 900, // seconds
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  keyGenerator: generateKey,
  validate: { keyGeneratorIpFallback: false }, // We handle IPv6 properly in generateKey
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many AI analysis requests. This is a resource-intensive operation. Please wait before trying again.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 900,
      limit: 5,
      window: '15 minutes',
    });
  },
});

/**
 * Rate limiter for Graph Generation endpoint
 * Moderate limits - less expensive than full analysis
 */
export const graphGenerationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // Max 20 requests per 5 minutes
  message: {
    status: 'error',
    message: 'Too many graph generation requests. Please wait a moment.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: 300,
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  validate: { keyGeneratorIpFallback: false }, // We handle IPv6 properly in generateKey
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'You are generating graphs too quickly. Please wait a moment before trying again.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 300,
      limit: 20,
      window: '5 minutes',
    });
  },
});

/**
 * Rate limiter for Chatbot endpoint
 * Moderate limits - users may send multiple messages
 */
export const chatbotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Max 50 messages per hour
  message: {
    status: 'error',
    message: 'Chat limit reached. Please try again in 1 hour.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: 3600,
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  validate: { keyGeneratorIpFallback: false }, // We handle IPv6 properly in generateKey
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'You have reached your hourly chat limit. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 3600,
      limit: 50,
      window: '1 hour',
    });
  },
  skip: (req) => {
    // Skip rate limiting for admin in development (optional)
    return process.env.NODE_ENV === 'development' && req.user?.role === 'ADMIN';
  },
});

/**
 * Rate limiter for File Upload endpoint
 * Strictest limits - file processing is expensive
 */
export const fileUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Max 10 file uploads per hour
  message: {
    status: 'error',
    message: 'File upload limit reached. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: 3600,
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  validate: { keyGeneratorIpFallback: false }, // We handle IPv6 properly in generateKey
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'You have uploaded too many files. Please try again in 1 hour.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 3600,
      limit: 10,
      window: '1 hour',
    });
  },
});

/**
 * General API rate limiter
 * Apply to all API routes as a baseline protection
 */
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: {
    status: 'error',
    message: 'Too many requests from this IP. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: 900,
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  validate: { keyGeneratorIpFallback: false }, // We handle IPv6 properly in generateKey
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests. Please slow down and try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 900,
    });
  },
});

/**
 * Export configuration for Redis (production use)
 * Uncomment and configure when deploying to production
 */
/*
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

export const createRedisStore = (prefix: string) => {
  return new RedisStore({
    client: redis,
    prefix: `rl:${prefix}:`,
  });
};
*/

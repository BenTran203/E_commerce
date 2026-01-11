/**
 * CACHING MIDDLEWARE
 * 
 * Reduces AI API calls by caching responses
 * Supports both in-memory and Redis caching
 */

import { Request, Response, NextFunction } from 'express';

/**
 * In-memory cache storage
 * Simple Map-based cache for development/single-server deployments
 */
class InMemoryCache {
  private cache: Map<string, { data: any; expiresAt: number }>;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    this.cache = new Map();
    
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  set(key: string, value: any, ttlSeconds: number): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { data: value, expiresAt });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}

// Create global in-memory cache instance
const memoryCache = new InMemoryCache();

/**
 * Cache middleware factory
 * Creates a caching middleware with specified TTL
 * 
 * @param ttlSeconds - Time to live in seconds (default: 900 = 15 minutes)
 * @param keyGenerator - Optional custom key generator function
 */
export const cacheMiddleware = (
  ttlSeconds: number = 900,
  keyGenerator?: (req: Request) => string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Generate cache key
    const cacheKey = keyGenerator 
      ? keyGenerator(req)
      : generateCacheKey(req);

    try {
      // Try to get cached response
      const cachedData = memoryCache.get(cacheKey);
      
      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        
        // Send cached response
        return res.status(200).json({
          ...cachedData,
          cached: true,
          cachedAt: new Date().toISOString(),
        });
      }

      console.log(`❌ Cache MISS: ${cacheKey}`);

      // Store the original res.json function
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response before sending
      res.json = (body: any) => {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          memoryCache.set(cacheKey, body, ttlSeconds);
          console.log(`💾 Cached response: ${cacheKey} (TTL: ${ttlSeconds}s)`);
        }
        
        // Send the response
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      // Continue without caching if cache fails
      next();
    }
  };
};

/**
 * Generate cache key from request
 */
function generateCacheKey(req: Request): string {
  const userId = req.user?.id || 'anonymous';
  const path = req.path;
  const query = JSON.stringify(req.query);
  const body = req.method === 'POST' ? JSON.stringify(req.body) : '';
  
  return `cache:${path}:${userId}:${query}:${body}`;
}

/**
 * Clear cache for specific pattern
 */
export const clearCache = (pattern?: string): number => {
  if (!pattern) {
    memoryCache.clear();
    console.log('🗑️  Cleared entire cache');
    return 0;
  }

  const stats = memoryCache.getStats();
  let cleared = 0;

  for (const key of stats.keys) {
    if (key.includes(pattern)) {
      memoryCache.delete(key);
      cleared++;
    }
  }

  console.log(`🗑️  Cleared ${cleared} cache entries matching: ${pattern}`);
  return cleared;
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  return memoryCache.getStats();
};

/**
 * Middleware to bypass cache (for debugging or admin actions)
 */
export const bypassCache = (req: Request, res: Response, next: NextFunction) => {
  // Skip caching if requested
  if (req.query.noCache === 'true' || req.headers['x-no-cache']) {
    console.log('⏭️  Bypassing cache');
    return next();
  }
  next();
};

/**
 * Export memory cache instance for direct access
 */
export { memoryCache };

/**
 * REDIS CACHE IMPLEMENTATION (for production)
 * Uncomment and configure when deploying to production with Redis
 */

/*
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

export const redisCacheMiddleware = (ttlSeconds: number = 900) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = generateCacheKey(req);

    try {
      const cachedData = await redis.get(cacheKey);
      
      if (cachedData) {
        console.log(`✅ Redis Cache HIT: ${cacheKey}`);
        return res.status(200).json({
          ...JSON.parse(cachedData),
          cached: true,
          cachedAt: new Date().toISOString(),
        });
      }

      console.log(`❌ Redis Cache MISS: ${cacheKey}`);

      const originalJson = res.json.bind(res);

      res.json = (body: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redis.setex(cacheKey, ttlSeconds, JSON.stringify(body))
            .catch(err => console.error('Redis set error:', err));
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error('Redis cache middleware error:', error);
      next();
    }
  };
};

export { redis };
*/

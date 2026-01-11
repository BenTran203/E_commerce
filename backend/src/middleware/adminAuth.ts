/**
 * ADMIN AUTHENTICATION MIDDLEWARE
 * 
 * Protects admin-only routes
 * Ensures user is authenticated and has admin role
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';

/**
 * Require Admin Role
 * Middleware that checks if user is authenticated AND has admin role
 * 
 * Usage:
 * router.get('/admin/dashboard', authenticate, requireAdmin, controller);
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is authenticated (should be done by authenticate middleware first)
    if (!req.user) {
      throw new AppError(
        'Authentication required. Please log in to continue.',
        401,
        'UNAUTHORIZED'
      );
    }

    // Check if user has admin role
    if (req.user.role !== 'ADMIN') {
      throw new AppError(
        'Admin access required. You do not have permission to access this resource.',
        403,
        'FORBIDDEN',
        {
          requiredRole: 'ADMIN',
          userRole: req.user.role,
          userId: req.user.id,
        }
      );
    }

    // User is admin, proceed
    console.log(`✅ Admin access granted: ${req.user.email} (${req.user.id})`);
    next();
  } catch (error) {
    // Pass error to error handler
    next(error);
  }
};

/**
 * Require Specific Role
 * More flexible middleware that accepts multiple roles
 * 
 * Usage:
 * router.get('/moderator/page', authenticate, requireRole(['ADMIN', 'MODERATOR']), controller);
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError(
          'Authentication required',
          401,
          'UNAUTHORIZED'
        );
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError(
          `Access denied. Required roles: ${allowedRoles.join(', ')}`,
          403,
          'FORBIDDEN',
          {
            requiredRoles: allowedRoles,
            userRole: req.user.role,
          }
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Optional Admin Access
 * Allows both admin and regular users, but adds isAdmin flag
 * Useful for endpoints that have different behavior for admins
 * 
 * Usage:
 * router.get('/products', authenticate, optionalAdmin, controller);
 * // In controller: if (req.isAdmin) { ... }
 */
export const optionalAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === 'ADMIN') {
    req.isAdmin = true;
  } else {
    req.isAdmin = false;
  }
  next();
};

/**
 * Log Admin Action
 * Logs all admin actions for auditing
 * Should be used after requireAdmin middleware
 */
export const logAdminAction = (action: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      console.log('🔐 Admin Action:', {
        action,
        adminId: req.user.id,
        adminEmail: req.user.email,
        timestamp: new Date().toISOString(),
        ip: req.ip,
        path: req.path,
        method: req.method,
      });

      // In production, save to database for audit trail
      // await prisma.adminAuditLog.create({ ... });
    }
    next();
  };
};

/**
 * Check Admin Permissions
 * More granular permission checking (future enhancement)
 * 
 * Example permissions: 'manage_users', 'manage_products', 'view_analytics'
 */
export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      }

      // For now, all admins have all permissions
      // In the future, implement granular permissions system
      if (req.user.role !== 'ADMIN') {
        throw new AppError(
          `Permission denied: ${permission}`,
          403,
          'INSUFFICIENT_PERMISSIONS'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Extend Express Request type to include isAdmin flag
declare global {
  namespace Express {
    interface Request {
      isAdmin?: boolean;
    }
  }
}

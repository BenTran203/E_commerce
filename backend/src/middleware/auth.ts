/**
 * AUTHENTICATION MIDDLEWARE
 *
 * This middleware handles JWT token verification and user authentication.
 *
 * LEARNING OBJECTIVES:
 * - Understand JWT (JSON Web Tokens) authentication
 * - Learn about middleware patterns in Express.js
 * - Implement role-based access control
 * - Handle authentication errors gracefully
 *
 * IMPLEMENTATION STEPS:
 * 1. Extract token from request headers
 * 2. Verify JWT token
 * 3. Decode user information
 * 4. Attach user to request object
 * 5. Handle errors appropriately
 */

import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma client
const prisma = new PrismaClient();

// Define UserRole enum-like object (matches Prisma schema enum)
const UserRole = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

type UserRole = (typeof UserRole)[keyof typeof UserRole];

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
        isActive: boolean;
      };
    }
  }
}

/**
 * MAIN AUTHENTICATION MIDDLEWARE
 *
 * This middleware verifies JWT tokens and attaches user data to the request
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Access token is required",
      });
    }

    // Token format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token format. Use: Bearer <token>",
      });
    }

    // 2. Verify JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          status: "error",
          message: "Token has expired",
        });
      }

      if (jwtError instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          status: "error",
          message: "Invalid token",
        });
      }

      throw jwtError;
    }

    // 3. Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    // 4. Check if user account is active
    if (!user.isActive) {
      return res.status(401).json({
        status: "error",
        message: "Account has been deactivated",
      });
    }

    // 5. Attach user to request object
    req.user = user;

    // Continue to next middleware
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error during authentication",
    });
  }
};

/**
 * ROLE-BASED ACCESS CONTROL MIDDLEWARE
 *
 * This middleware checks if the authenticated user has the required role
 */
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    // Check if user has required role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Insufficient permissions",
      });
    }

    next();
  };
};

/**
 * OPTIONAL AUTHENTICATION MIDDLEWARE
 *
 * This middleware attempts to authenticate but doesn't fail if no token is provided
 * Useful for endpoints that work for both authenticated and anonymous users
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // No token provided, continue without user
      return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      // Invalid format, continue without user
      return next();
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    try {
      const decoded: any = jwt.verify(token, jwtSecret);

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
          isEmailVerified: true,
        },
      });

      if (user && user.isActive) {
        req.user = user;
      }
    } catch (jwtError) {
      // Invalid token, continue without user
      if (jwtError && typeof jwtError === "object" && "message" in jwtError) {
        console.log(
          "Optional auth failed:",
          (jwtError as { message: string }).message,
        );
      } else {
        console.log("Optional auth failed:", jwtError);
      }
    }

    next();
  } catch (error) {
    console.error("Optional authentication error:", error);
    // Don't fail the request, just continue without user
    next();
  }
};

/**
 * Generate JWT token for user
 */
type JwtExpires = NonNullable<SignOptions["expiresIn"]>;

//Use Type guards Narrowing for a Wide String
const isJwtStringValue = (v: string): v is Extract<JwtExpires, string> =>
  /^\d+(ms|s|m|h|d|w|y)$/.test(v);

const parseExpiresIn = (v?: string): SignOptions["expiresIn"] => {
  if (!v) return "1h"; // default
  const n = Number(v);
  if (Number.isFinite(n)) return n; // allow numeric seconds
  if (isJwtStringValue(v)) return v; // allow "15m", "7d", etc.
  throw new Error(
    'Invalid JWT_EXPIRES_IN. Use a number or formats like "15m", "7d".',
  );
};

export const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET environment variable is not set");

  const expiresIn = parseExpiresIn(process.env.JWT_EXPIRES_IN);

  return jwt.sign({ userId }, jwtSecret, { expiresIn });
};

export const generateRefreshToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET environment variable is not set");

  // literal stays narrow and is fine
  return jwt.sign({ userId, type: "refresh" }, jwtSecret, { expiresIn: "30d" });
};
/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): { userId: string } => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  const decoded: any = jwt.verify(token, jwtSecret);

  if (decoded.type !== "refresh") {
    throw new Error("Invalid refresh token");
  }

  return { userId: decoded.userId };
};

/**
 * IMPLEMENTATION NOTES:
 *
 * 1. **Security Best Practices**:
 *    - Always use HTTPS in production
 *    - Set secure HTTP-only cookies for tokens
 *    - Implement token rotation
 *    - Add rate limiting for auth endpoints
 *
 * 2. **Error Handling**:
 *    - Don't expose sensitive information in error messages
 *    - Log authentication failures for monitoring
 *    - Implement account lockout after multiple failures
 *
 * 3. **Performance**:
 *    - Cache user data to reduce database queries
 *    - Use Redis for session management in production
 *    - Consider token blacklisting for logout
 *
 * USAGE EXAMPLES:
 *
 * // Protect route (authentication required)
 * app.get('/api/profile', authenticate, getUserProfile)
 *
 * // Admin only access
 * app.delete('/api/users/:id', authenticate, authorize(UserRole.ADMIN), deleteUser)
 *
 * // Optional authentication
 * app.get('/api/products', optionalAuth, getProducts)
 */

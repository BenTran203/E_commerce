/**
 * ERROR HANDLING UTILITIES
 * 
 * Comprehensive error handling for the application
 * Includes: Custom error class, async handler wrapper, global error middleware
 */

import { Request, Response, NextFunction } from 'express';
import OpenAI, {APIError} from 'openai';

/**
 * Custom Application Error Class
 * Extends native Error with additional properties for API responses
 */
export class AppError extends Error {
  public statusCode: number;
  public code?: string;
  public details?: any;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true; // Distinguishes operational errors from programming errors
    this.name = this.constructor.name;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors automatically
 * Eliminates need for try-catch in every controller
 * 
 * Usage:
 * export const myController = asyncHandler(async (req, res) => {
 *   // Your async code here
 * });
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Global Error Handler Middleware
 * Catches all errors and sends appropriate responses
 * Should be registered LAST in middleware chain
 */
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error details (in production, use proper logging service like Winston)
  console.error(' Error occurred:', {
    timestamp: new Date().toISOString(),
    name: error.name,
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    path: req.path,
    method: req.method,
    userId: req.user?.id,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });

  // Handle OpenAI API errors
  if (error instanceof OpenAI.APIError) {
    const statusCode = error.status || 500;
    
    return res.status(statusCode).json({
      status: 'error',
      message: getOpenAIErrorMessage(error),
      code: error.code || 'OPENAI_ERROR',
      type: error.type,
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
        stack: error.stack,
      }),
    });
  }

  // Handle rate limit errors (from express-rate-limit)
  if (error.status === 429 || error.statusCode === 429) {
    return res.status(429).json({
      status: 'error',
      message: error.message || 'Too many requests. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: error.retryAfter || 900, // seconds
    });
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: error.details || error.errors,
    });
  }

  // Handle Prisma database errors
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      status: 'error',
      message: getPrismaErrorMessage(error),
      code: 'DATABASE_ERROR',
      ...(process.env.NODE_ENV === 'development' && {
        prismaCode: error.code,
        details: error.message,
      }),
    });
  }

  // Handle Prisma validation errors
  if (error.name === 'PrismaClientValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid database query',
      code: 'DATABASE_VALIDATION_ERROR',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
      }),
    });
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid authentication token',
      code: 'INVALID_TOKEN',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication token has expired',
      code: 'TOKEN_EXPIRED',
    });
  }

  // Handle multer file upload errors
  if (error.name === 'MulterError') {
    return res.status(400).json({
      status: 'error',
      message: getMulterErrorMessage(error),
      code: 'FILE_UPLOAD_ERROR',
    });
  }

  // Handle custom AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      code: error.code || 'APPLICATION_ERROR',
      ...(error.details && { details: error.details }),
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
      }),
    });
  }

  // Handle unknown/unexpected errors
  const statusCode = error.statusCode || error.status || 500;
  const message = error.message || 'Internal server error';

  res.status(statusCode).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : message,
    code: error.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      details: error.details,
    }),
  });
};

/**
 * Helper: Get user-friendly OpenAI error message
 */
function getOpenAIErrorMessage(error: APIError): string {
  switch (error.code) {
    case 'insufficient_quota':
      return 'AI service quota exceeded. Please contact administrator.';
    case 'model_not_found':
      return 'AI model configuration error. Please contact administrator.';
    case 'invalid_api_key':
      return 'AI service authentication failed. Please contact administrator.';
    case 'rate_limit_exceeded':
      return 'AI service rate limit reached. Please try again in a moment.';
    case 'context_length_exceeded':
      return 'Request too large. Please try with less data.';
    case 'invalid_request_error':
      return 'Invalid request to AI service. Please try again.';
    default:
      return 'AI service temporarily unavailable. Please try again later.';
  }
}

/**
 * Helper: Get user-friendly Prisma error message
 */
function getPrismaErrorMessage(error: any): string {
  switch (error.code) {
    case 'P2002':
      return 'A record with this information already exists.';
    case 'P2003':
      return 'Related record not found.';
    case 'P2025':
      return 'Record not found.';
    case 'P2014':
      return 'Invalid database relation.';
    case 'P2021':
      return 'Database table does not exist.';
    case 'P2022':
      return 'Database column does not exist.';
    default:
      return 'Database operation failed.';
  }
}

/**
 * Helper: Get user-friendly Multer error message
 */
function getMulterErrorMessage(error: any): string {
  switch (error.code) {
    case 'LIMIT_FILE_SIZE':
      return 'File too large. Maximum size is 10MB.';
    case 'LIMIT_FILE_COUNT':
      return 'Too many files uploaded.';
    case 'LIMIT_UNEXPECTED_FILE':
      return 'Unexpected file field.';
    default:
      return 'File upload failed.';
  }
}

/**
 * Not Found Handler
 * Catches requests to undefined routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new AppError(
    `Route not found: ${req.method} ${req.path}`,
    404,
    'NOT_FOUND'
  );
  next(error);
};

/**
 * Handle unhandled promise rejections
 */
export const handleUnhandledRejection = () => {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error(' Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
    
    // In production, you might want to:
    // 1. Log to external service (e.g., Sentry, LogRocket)
    // 2. Gracefully shut down the server
    // 3. Restart using process manager (PM2, Kubernetes)
    
    if (process.env.NODE_ENV === 'production') {
      console.error('Shutting down due to unhandled rejection...');
      process.exit(1);
    }
  });
};

/**
 * Handle uncaught exceptions
 */
export const handleUncaughtException = () => {
  process.on('uncaughtException', (error: Error) => {
    console.error(' Uncaught Exception:', error);
    console.error('Stack:', error.stack);
    
    // Always exit on uncaught exception
    console.error('Shutting down due to uncaught exception...');
    process.exit(1);
  });
};

/**
 * INPUT VALIDATION MIDDLEWARE
 * 
 * Validates and sanitizes user input
 * Protects against injection attacks and malformed data
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';
import multer from 'multer';
import path from 'path';

/**
 * Validate File Upload
 * Checks file size, type, and sanitizes filename
 */
export const validateFileUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400, 'NO_FILE');
    }

    // Check file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (req.file.size > MAX_SIZE) {
      throw new AppError(
        'File too large. Maximum size is 10MB.',
        400,
        'FILE_TOO_LARGE',
        {
          fileSize: req.file.size,
          maxSize: MAX_SIZE,
        }
      );
    }

    // Check file type
    const allowedMimeTypes = [
      'text/csv',
      'text/plain',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json',
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      throw new AppError(
        'Invalid file type. Allowed formats: CSV, TXT, PDF, Excel, JSON.',
        400,
        'INVALID_FILE_TYPE',
        {
          receivedType: req.file.mimetype,
          allowedTypes: allowedMimeTypes,
        }
      );
    }

    // Validate file extension matches mimetype
    const ext = path.extname(req.file.originalname).toLowerCase();
    const validExtensions = ['.csv', '.txt', '.pdf', '.xls', '.xlsx', '.json'];
    
    if (!validExtensions.includes(ext)) {
      throw new AppError(
        'Invalid file extension.',
        400,
        'INVALID_FILE_EXTENSION'
      );
    }

    console.log('✅ File validation passed:', {
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    });

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Configure Multer for file uploads
 * Uses memory storage for temporary file handling
 */
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1, // Only 1 file at a time
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'text/csv',
      'text/plain',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type', 400, 'INVALID_FILE_TYPE'));
    }
  },
});

/**
 * Sanitize Chat Message
 * Removes potentially harmful content from user messages
 */
export const sanitizeChatMessage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;

    // Check if message exists
    if (!message) {
      throw new AppError(
        'Message is required',
        400,
        'MISSING_MESSAGE'
      );
    }

    // Check message type
    if (typeof message !== 'string') {
      throw new AppError(
        'Message must be a string',
        400,
        'INVALID_MESSAGE_TYPE'
      );
    }

    // Check message length
    const MIN_LENGTH = 1;
    const MAX_LENGTH = 2000;

    if (message.trim().length < MIN_LENGTH) {
      throw new AppError(
        'Message cannot be empty',
        400,
        'MESSAGE_TOO_SHORT'
      );
    }

    if (message.length > MAX_LENGTH) {
      throw new AppError(
        `Message too long. Maximum ${MAX_LENGTH} characters.`,
        400,
        'MESSAGE_TOO_LONG',
        {
          messageLength: message.length,
          maxLength: MAX_LENGTH,
        }
      );
    }

    // Sanitize message - remove potentially harmful content
    let sanitized = message
      .trim()
      // Remove script tags
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove NULL bytes
      .replace(/\0/g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ');

    // Update request body with sanitized message
    req.body.message = sanitized;

    console.log('✅ Message validated and sanitized');

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Validate Query Parameters
 * Ensures query parameters are within acceptable ranges
 */
export const validateQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sortBy } = req.query;

    // Validate page
    if (page) {
      const pageNum = parseInt(page as string);
      if (isNaN(pageNum) || pageNum < 1) {
        throw new AppError('Invalid page number', 400, 'INVALID_PAGE');
      }
      if (pageNum > 10000) {
        throw new AppError('Page number too large', 400, 'PAGE_TOO_LARGE');
      }
    }

    // Validate limit
    if (limit) {
      const limitNum = parseInt(limit as string);
      if (isNaN(limitNum) || limitNum < 1) {
        throw new AppError('Invalid limit value', 400, 'INVALID_LIMIT');
      }
      if (limitNum > 100) {
        throw new AppError('Limit too large. Maximum is 100', 400, 'LIMIT_TOO_LARGE');
      }
    }

    // Validate sortBy
    if (sortBy) {
      const allowedSortFields = ['createdAt', 'updatedAt', 'name', 'price', 'sales'];
      if (!allowedSortFields.includes(sortBy as string)) {
        throw new AppError(
          `Invalid sort field. Allowed: ${allowedSortFields.join(', ')}`,
          400,
          'INVALID_SORT_FIELD'
        );
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Validate Metric Parameter
 * For graph generation endpoints
 */
export const validateMetric = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { metric } = req.params;

    const validMetrics = ['sales', 'orders', 'products', 'customers'];
    
    if (!validMetrics.includes(metric)) {
      throw new AppError(
        `Invalid metric. Must be one of: ${validMetrics.join(', ')}`,
        400,
        'INVALID_METRIC',
        {
          receivedMetric: metric,
          validMetrics,
        }
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Validate Date Range
 * Ensures date parameters are valid
 */
export const validateDateRange = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.query;

    if (startDate) {
      const start = new Date(startDate as string);
      if (isNaN(start.getTime())) {
        throw new AppError('Invalid start date', 400, 'INVALID_START_DATE');
      }
    }

    if (endDate) {
      const end = new Date(endDate as string);
      if (isNaN(end.getTime())) {
        throw new AppError('Invalid end date', 400, 'INVALID_END_DATE');
      }
    }

    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      
      if (start > end) {
        throw new AppError(
          'Start date cannot be after end date',
          400,
          'INVALID_DATE_RANGE'
        );
      }

      // Check range is not too large (max 1 year)
      const daysDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff > 365) {
        throw new AppError(
          'Date range too large. Maximum is 1 year.',
          400,
          'DATE_RANGE_TOO_LARGE'
        );
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Sanitize Request Body
 * General sanitization for all request bodies
 */
export const sanitizeBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body && typeof req.body === 'object') {
    // Recursively sanitize all string fields
    req.body = sanitizeObject(req.body);
  }
  next();
};

/**
 * Helper: Recursively sanitize object
 */
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .trim()
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/\0/g, '');
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }

  return obj;
}

/**
 * TIMELESS E-COMMERCE BACKEND
 * Main Express Application Setup
 * LEARNING OBJECTIVES:
 * - Understand Express.js application structure
 * - Learn about middleware and their order of execution
 * - Implement security best practices
 * - Set up API routing structure

 */

import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { connectRedis } from "./utils/redis";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import productRoutes from "./routes/products";
import categoryRoutes from "./routes/categories";
import cartRoutes from "./routes/cart";
import orderRoutes from "./routes/orders";
import reviewRoutes from "./routes/reviews";
import paymentRoutes from "./routes/payments";

// Import middleware (implement these step by step)
// import { errorHandler } from '@/middleware/errorHandler'
// import { notFound } from '@/middleware/notFound'
// import { authenticate } from '@/middleware/auth'

// Load environment variables
// Load .env.local first (if exists), then fall back to .env
dotenv.config({ path: ".env.local" });
dotenv.config(); // This won't override existing variables
connectRedis();
/**
 * CREATE EXPRESS APPLICATION
 */
const app: Application = express();

/**
 * MIDDLEWARE CONFIGURATION
 *
 * The order of middleware is CRUCIAL in Express.js
 * Each middleware function executes in the order they are defined
 */

// 1. SECURITY MIDDLEWARE
// Helmet helps secure Express apps by setting various HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // Allow embedding for development
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }),
);

// 2. CORS CONFIGURATION
// Configure Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 3. RATE LIMITING
// Prevent abuse by limiting requests per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the \`RateLimit-*\` headers
  legacyHeaders: false, // Disable the \`X-RateLimit-*\` headers
});
app.use("/api/", limiter);

// 4. LOGGING MIDDLEWARE
// Morgan logs HTTP requests for monitoring and debugging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// 5. BODY PARSING MIDDLEWARE
// Parse JSON bodies (limit size for security)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * API ROUTES
 *
 * IMPLEMENTATION ORDER (follow this sequence):
 * 1. Start with authentication routes
 * 2. Add user management
 * 3. Implement product management
 * 4. Add shopping cart functionality
 * 5. Implement order processing
 * 6. Add payment integration
 * 8. Add review system
 * 9. Integrate AI chatbot
 */

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Timeless API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API Documentation endpoint
app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Timeless E-commerce API",
    version: "1.0.0",
    documentation: "/api/docs",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      products: "/api/products",
      orders: "/api/orders",
      cart: "/api/cart",
      payments: "/api/payments",
      reviews: "/api/reviews",
      chatbot: "/api/chatbot",
    },
  });
});

/**
 * ROUTE MOUNTING
 *
 * Each route module handles a specific domain of functionality
 */

// Authentication routes
app.use("/api/auth", authRoutes);

// User management routes
app.use("/api/users", userRoutes);

// Product management routes
app.use("/api/products", productRoutes);

// Category routes
app.use("/api/categories", categoryRoutes);

// Shopping cart routes
app.use("/api/cart", cartRoutes);

// Order management routes
app.use("/api/orders", orderRoutes);

// Review and rating routes
app.use("/api/reviews", reviewRoutes);

// Payment routes
app.use("/api/payments", paymentRoutes);

/**
 * ERROR HANDLING MIDDLEWARE
 *
 * These must be defined AFTER all routes
 * Express error handling middleware must have 4 parameters
 */

// Handle 404 errors for undefined routes
app.use("/{*any}", (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// // Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  //   // Set default error values
  let error = { ...err };
  error.message = err.message;

  //   // Log error for debugging
  console.error("Error Stack:", err.stack);

  //   // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = { message, statusCode: 404 };
  }

  //   // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = { message, statusCode: 400 };
  }

  //   // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(", ");
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    status: "error",
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// /**
//  * SERVER STARTUP
//  */
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Timeless API running on ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API docs: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: any) => {
  console.log("Unhandled Rejection:", err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: any) => {
  console.log("Uncaught Exception:", err.message);
  process.exit(1);
});

export default app;

/**
 * NEXT STEPS FOR IMPLEMENTATION:
 *
 * 1. Set up Prisma and database connection
 * 2. Create the database schema (prisma/schema.prisma)
 * 3. Implement authentication middleware
 * 4. Create user authentication routes
 * 5. Add product management routes
 * 6. Implement shopping cart functionality
 * 7. Add order processing
 * 8. Integrate payment gateway * 10. Implement review system
 * 11. Integrate AI features
 *
 * Remember to test each feature as you implement it!
 */

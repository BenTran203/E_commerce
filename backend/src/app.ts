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
import contactRoutes from "./routes/contact";



// Load .env.local first (if exists), then fall back to .env
dotenv.config({ path: ".env.local" });
dotenv.config();
connectRedis();

const app: Application = express();
app.set("trust proxy", 1);

// Configure Cross-Origin Resource Sharing
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

console.log("--- CORS Configuration ---");
console.log("Raw FRONTEND_URL env var:", process.env.FRONTEND_URL);
console.log("Allowed Origins set to:", allowedOrigins);
console.log("--------------------------");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const vercelProjectRegex = /^https:\/\/e-commerce-.*\.vercel\.app$/;

      if (allowedOrigins.includes(origin) || vercelProjectRegex ) {
        console.log("Allowed by CORS:", origin);
        return callback(null, true);
      } else {
        console.log("Blocked by myyyyyy CORS:", origin); // Log the blocked origin for debugging
        return callback(new Error("Not allowed by CORSSSSSS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options('*', cors()); // enable pre-flight

// 2. BODY PARSING MIDDLEWARE
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// 3. SECURITY MIDDLEWARE
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", ...allowedOrigins],
      },
    },
  }),
);

// 4. RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// 5. LOGGING MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

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

// Contact routes
app.use("/api/contact", contactRoutes);

/**
 * ERROR HANDLING MIDDLEWARE
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
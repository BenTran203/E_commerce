# 🔍 Debugging & Production Readiness Guide

Complete guide for debugging your application and ensuring it's production-ready.

---

## 📋 Table of Contents
1. [Development Debugging](#development-debugging)
2. [Remove Debug Code](#remove-debug-code)
3. [Error Handling](#error-handling)
4. [Logging Strategy](#logging-strategy)
5. [Production Checklist](#production-checklist)
6. [Monitoring & Observability](#monitoring--observability)
7. [Performance Optimization](#performance-optimization)

---

## 🛠️ Development Debugging

### Frontend Debugging (Next.js)

#### 1. Browser DevTools
```javascript
// Good: Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('User data:', userData);
}

// Good: Structured logging
console.group('Checkout Flow');
console.log('1. Cart items:', cartItems);
console.log('2. Total amount:', totalAmount);
console.log('3. Payment method:', paymentMethod);
console.groupEnd();
```

#### 2. React DevTools
- Install: [React DevTools Extension](https://react.dev/learn/react-developer-tools)
- Inspect component props and state
- Track component re-renders
- Profile performance

#### 3. Redux DevTools
```typescript
// src/store/index.ts - Already configured
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // ✅ Only in dev
});
```

#### 4. VS Code Debugger
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

### Backend Debugging (Node.js/Express)

#### 1. VS Code Debugger
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Backend: Debug",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "${workspaceFolder}/backend",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

#### 2. Enhanced Console Logging
```typescript
// backend/src/utils/logger.ts - CREATE THIS
import chalk from 'chalk'; // npm install chalk@4

export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.blue('[INFO]'), message, data || '');
    }
  },
  
  error: (message: string, error?: any) => {
    console.error(chalk.red('[ERROR]'), message, error || '');
  },
  
  warn: (message: string, data?: any) => {
    console.warn(chalk.yellow('[WARN]'), message, data || '');
  },
  
  success: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.green('[SUCCESS]'), message, data || '');
    }
  },
  
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.gray('[DEBUG]'), message, data || '');
    }
  }
};

// Usage
logger.info('User logged in', { userId: user.id });
logger.error('Payment failed', { orderId, error: err.message });
```

#### 3. Database Query Logging
```typescript
// backend/prisma/client.ts - CREATE THIS
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
});

export default prisma;
```

#### 4. Request Logging Middleware
```typescript
// backend/src/middleware/requestLogger.ts - CREATE THIS
import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusColor = res.statusCode < 400 ? '\x1b[32m' : '\x1b[31m';
      
      console.log(
        `${req.method} ${req.path}`,
        `${statusColor}${res.statusCode}\x1b[0m`,
        `${duration}ms`
      );
    });
  }
  
  next();
};

// In backend/src/app.ts
import { requestLogger } from './middleware/requestLogger';
app.use(requestLogger);
```

---

## 🧹 Remove Debug Code

### Automated Removal Script

Create `scripts/remove-console-logs.js`:
```javascript
const fs = require('fs');
const path = require('path');

const directories = ['src', 'backend/src'];
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

function removeConsoleLogs(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Remove console.log
  const newContent = content.replace(
    /console\.log\([^)]*\);?/g,
    ''
  );
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    modified = true;
  }
  
  return modified;
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      count += walkDirectory(filePath);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      if (removeConsoleLogs(filePath)) {
        console.log(`✓ Cleaned: ${filePath}`);
        count++;
      }
    }
  });
  
  return count;
}

console.log('🧹 Removing console.log statements...\n');
const totalCleaned = directories.reduce((acc, dir) => {
  return acc + walkDirectory(dir);
}, 0);

console.log(`\n✅ Cleaned ${totalCleaned} files`);
```

Add to `package.json`:
```json
{
  "scripts": {
    "clean-logs": "node scripts/remove-console-logs.js"
  }
}
```

### Manual Replacement Strategy

Replace debug console.logs with proper logging:

```typescript
// ❌ Before: Debug code
console.log('User data:', user);
console.log('Processing payment...');

// ✅ After: Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('User data:', user);
}

// ✅ Or use logger utility
logger.debug('Processing payment', { userId, amount });
```

### ESLint Rule
Add to `eslint.config.mjs`:
```javascript
export default {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  }
};
```

---

## 🎯 Error Handling

### Frontend Error Boundaries

Create `src/components/ErrorBoundary.tsx`:
```typescript
'use client';

import { Component, ReactNode } from 'react';
import Button from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to Sentry or similar
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Wrap routes in `src/app/layout.tsx`:
```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

### Backend Error Handler

Create `backend/src/middleware/errorHandler.ts`:
```typescript
import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log error
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });
  
  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    // TODO: Send to Sentry
  }
  
  // Send response
  res.status(statusCode).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An error occurred' 
      : message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Add to backend/src/app.ts
import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler); // Must be last middleware
```

### API Error Handling

Update `src/lib/api.ts`:
```typescript
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: "Network error" 
      }));
      
      // Log error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', {
          endpoint,
          status: response.status,
          error
        });
      }
      
      throw new Error(error.message || "API request failed");
    }

    return response.json();
  } catch (error) {
    // Log network errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Network Error:', error);
    }
    throw error;
  }
}
```

---

## 📝 Logging Strategy

### Production Logging Best Practices

#### 1. Structured Logging
```typescript
// backend/src/utils/logger.ts
interface LogData {
  userId?: string;
  action: string;
  details?: any;
  timestamp?: string;
}

export const productionLogger = {
  log: (level: 'info' | 'warn' | 'error', data: LogData) => {
    const logEntry = {
      level,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      ...data
    };
    
    // In production, send to logging service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to CloudWatch, Datadog, etc.
      console.log(JSON.stringify(logEntry));
    } else {
      console.log(logEntry);
    }
  }
};

// Usage
productionLogger.log('info', {
  action: 'USER_LOGIN',
  userId: user.id,
  details: { method: 'email' }
});
```

#### 2. Important Events to Log
```typescript
// User actions
- User registration
- User login/logout
- Password reset
- Profile updates

// Transactions
- Order creation
- Payment attempts (success/failure)
- Refunds

// Errors
- Payment failures
- API errors
- Database errors
- Authentication failures

// Security
- Failed login attempts
- Suspicious activities
- Rate limit hits
```

#### 3. What NOT to Log
```typescript
// ❌ Never log:
- Passwords (plain or hashed)
- Credit card numbers
- API keys/secrets
- Personal identification numbers
- Full user objects with sensitive data

// ✅ Log instead:
- User IDs (not full user data)
- Masked card numbers (last 4 digits only)
- Transaction IDs
- Error messages (without sensitive data)
```

---

## ✅ Production Checklist

### Pre-Deployment Checks

```bash
# Run this script before deploying
```

Create `scripts/pre-deployment-check.sh`:
```bash
#!/bin/bash

echo "🔍 Running pre-deployment checks..."
echo ""

# Check for console.logs
echo "1. Checking for console.log statements..."
if grep -r "console\.log" src/ --exclude-dir=node_modules; then
  echo "❌ Found console.log statements"
  exit 1
else
  echo "✅ No console.log found"
fi

# Check for TODO comments
echo ""
echo "2. Checking for TODO comments..."
TODO_COUNT=$(grep -r "TODO" src/ --exclude-dir=node_modules | wc -l)
echo "Found $TODO_COUNT TODOs"

# Check environment variables
echo ""
echo "3. Checking environment variables..."
if [ ! -f ".env.local" ]; then
  echo "❌ .env.local not found"
  exit 1
else
  echo "✅ .env.local exists"
fi

# Check TypeScript compilation
echo ""
echo "4. Checking TypeScript compilation..."
npm run build
if [ $? -eq 0 ]; then
  echo "✅ TypeScript compilation successful"
else
  echo "❌ TypeScript compilation failed"
  exit 1
fi

# Check for security vulnerabilities
echo ""
echo "5. Checking for security vulnerabilities..."
npm audit --audit-level=high
if [ $? -eq 0 ]; then
  echo "✅ No high security vulnerabilities"
else
  echo "⚠️  Security vulnerabilities found"
fi

echo ""
echo "✅ Pre-deployment checks complete!"
```

### Production Environment Variables

Create checklist in `.env.production.checklist`:
```bash
# Frontend (.env.local)
□ NEXT_PUBLIC_API_URL - Production URL
□ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY - Live key (starts with pk_live_)
□ NEXTAUTH_SECRET - Strong random secret (32+ chars)
□ NEXTAUTH_URL - Production domain

# Backend (backend/.env)
□ NODE_ENV=production
□ DATABASE_URL - Production database
□ REDIS_URL - Production Redis
□ JWT_SECRET - Strong random secret (different from dev)
□ JWT_REFRESH_SECRET - Strong random secret (different from JWT_SECRET)
□ STRIPE_SECRET_KEY - Live key (starts with sk_live_)
□ FRONTEND_URL - Production frontend URL
□ CORS origins restricted to production domain only
```

### Security Audit

```typescript
// Check these files:

// 1. backend/src/app.ts - CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, // ✅ Should be specific domain
  credentials: true
}));

// 2. Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// 3. Helmet for security headers
import helmet from 'helmet';
app.use(helmet());

// 4. Input validation
// Verify all API endpoints use validation middleware
```

---

## 📊 Monitoring & Observability

### 1. Frontend Monitoring

#### Vercel Analytics (if using Vercel)
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Google Analytics
```typescript
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs @sentry/node
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
  tracesSampleRate: 1.0,
});

// backend/src/app.ts
import * as Sentry from '@sentry/node';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: 'production',
  });
}
```

### 3. Health Check Endpoint

```typescript
// backend/src/routes/health.ts
import express from 'express';
import prisma from '../prisma/client';
import redis from '../utils/redis';

const router = express.Router();

router.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    checks: {
      database: 'unknown',
      redis: 'unknown',
    }
  };

  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    health.checks.database = 'OK';
  } catch (error) {
    health.checks.database = 'ERROR';
    health.status = 'ERROR';
  }

  try {
    // Check Redis
    await redis.ping();
    health.checks.redis = 'OK';
  } catch (error) {
    health.checks.redis = 'ERROR';
    health.status = 'ERROR';
  }

  const statusCode = health.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(health);
});

export default router;

// Add to backend/src/app.ts
import healthRouter from './routes/health';
app.use('/api', healthRouter);
```

---

## ⚡ Performance Optimization

### Frontend Optimization

```typescript
// 1. Image Optimization
import Image from 'next/image';

<Image
  src={product.imageUrl}
  alt={product.name}
  width={500}
  height={500}
  loading="lazy"
  placeholder="blur"
/>

// 2. Dynamic Imports
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

// 3. Memoization
import { memo, useMemo, useCallback } from 'react';

const ProductCard = memo(({ product }) => {
  return <div>...</div>;
});

// 4. Bundle Analysis
// Add to package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

### Backend Optimization

```typescript
// 1. Database Indexing
// Check backend/prisma/schema.prisma
model Product {
  id String @id @default(cuid())
  sku String @unique
  slug String @unique
  
  @@index([categoryId])
  @@index([isActive])
  @@index([createdAt])
}

// 2. Query Optimization
// Bad: N+1 query
const products = await prisma.product.findMany();
for (const product of products) {
  const category = await prisma.category.findUnique({
    where: { id: product.categoryId }
  });
}

// Good: Include relation
const products = await prisma.product.findMany({
  include: { category: true }
});

// 3. Redis Caching
async function getProducts() {
  const cacheKey = 'products:all';
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const products = await prisma.product.findMany();
  await redis.setex(cacheKey, 3600, JSON.stringify(products));
  
  return products;
}

// 4. Response Compression
import compression from 'compression';
app.use(compression());
```

---

## 🎯 Final Production Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] No ESLint warnings
- [ ] console.log statements removed/wrapped
- [ ] Error boundaries implemented
- [ ] Proper error handling everywhere
- [ ] Input validation on all forms
- [ ] API validation middleware

### Security
- [ ] Environment variables secured
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled
- [ ] Helmet security headers
- [ ] SQL injection protection (Prisma)
- [ ] XSS protection
- [ ] CSRF tokens (if needed)
- [ ] Strong JWT secrets
- [ ] Password requirements enforced

### Performance
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading for heavy components
- [ ] Database queries optimized
- [ ] Redis caching implemented
- [ ] Response compression enabled
- [ ] CDN configured (if applicable)

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured (GA4)
- [ ] Health check endpoint
- [ ] Logging configured
- [ ] Alerts setup for critical errors

### Database
- [ ] Migrations tested
- [ ] Indexes optimized
- [ ] Backup strategy in place
- [ ] Connection pooling configured
- [ ] Seed scripts ready

### Deployment
- [ ] Build process tested
- [ ] Environment variables set
- [ ] SSL certificates configured
- [ ] Domain DNS configured
- [ ] Docker images optimized
- [ ] CI/CD pipeline ready

---

## 🚀 Quick Commands

```bash
# Development
npm run dev                    # Start dev server
docker-compose logs -f backend # View backend logs
npx prisma studio             # Open database UI

# Testing
npm run build                 # Test production build
npm run lint                  # Check code quality
npm audit                     # Security check

# Production
npm run clean-logs            # Remove console.logs
npm run analyze               # Bundle analysis
node scripts/pre-deployment-check.sh  # Pre-deploy checks

# Monitoring
curl http://localhost:3001/api/health  # Health check
docker stats                          # Container stats
```

---

**Remember:** Production readiness is a journey, not a destination. Continuously monitor, test, and improve!

---

**Last Updated:** November 2025


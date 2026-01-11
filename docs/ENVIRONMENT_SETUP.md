# 🔧 Environment Variables Setup Guide

## Overview

This project uses **ONE `.env.example` file** as the master template for all environment configurations. This simplifies setup and reduces confusion.

## File Structure

```
E_commerce/
├── .env.example          ← Master template (ALL variables)
├── .env.local            ← Frontend config (you create)
├── .env                  ← Docker config (optional, you create)
└── backend/
    └── .env              ← Backend config (you create)
```

## Quick Setup

### Step 1: Copy the template

```bash
# Frontend
cp .env.example .env.local

# Backend
cp .env.example backend/.env

# Docker (optional - only if using docker-compose)
cp .env.example .env
```

### Step 2: Edit each file

Open each file and **keep only the relevant section**:

#### `.env.local` (Frontend - Next.js)
Keep only the **FRONTEND** section:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

#### `backend/.env` (Backend - Node.js)
Keep only the **BACKEND** section:
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### `.env` (Docker - Optional)
Keep only the **DOCKER** section:
```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ecommerce_db
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin
```

## Detailed Configuration

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001/api` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` |
| `NEXTAUTH_SECRET` | NextAuth secret (32+ chars) | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `http://localhost:3000` |

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` or `production` |
| `PORT` | Backend port | `3001` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `JWT_SECRET` | JWT signing secret | Generate with crypto |
| `JWT_REFRESH_SECRET` | Refresh token secret | Different from JWT_SECRET |
| `JWT_EXPIRES_IN` | Access token expiry | `1h`, `15m`, etc. |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d`, `30d`, etc. |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |

### Docker Variables (Optional)

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USER` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `DB_NAME` | Database name | `ecommerce_db` |
| `PGADMIN_EMAIL` | pgAdmin login email | `admin@example.com` |
| `PGADMIN_PASSWORD` | pgAdmin password | `admin` |

## Generating Secrets

### JWT Secrets (Recommended method)

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output example:
# 8f3d4e9a7b2c1d6e5f8a9b0c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e
```

### NextAuth Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Output example:
# Zx8kP2qR9vL3nM5wT7yH4bN6cV8dF0g==
```

## Environment-Specific Configurations

### Development

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_URL=http://localhost:3000

# Backend  
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce_db
REDIS_URL=redis://localhost:6379
```

### Docker Development

```env
# Backend (when running in Docker)
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ecommerce_db
REDIS_URL=redis://redis:6379
```

### Production

```env
# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<strong_random_secret>

# Backend
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@production-host:5432/db
REDIS_URL=redis://production-redis:6379
STRIPE_SECRET_KEY=sk_live_...
JWT_SECRET=<strong_random_secret>
JWT_REFRESH_SECRET=<different_strong_secret>
```

## Troubleshooting

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` matches backend URL
- Verify backend is running on correct port
- Check CORS settings in backend

### Stripe errors
- Verify you're using correct keys (test vs live)
- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_`
- Ensure `STRIPE_SECRET_KEY` starts with `sk_`

### Database connection failed
- Check `DATABASE_URL` format
- Verify database is running
- For Docker: use service name (`postgres`) not `localhost`
- For local: use `localhost`

### JWT errors
- Ensure `JWT_SECRET` is at least 32 characters
- Make sure `JWT_SECRET` and `JWT_REFRESH_SECRET` are different
- Generate new secrets if using defaults

## Security Best Practices

### ✅ Do's
- Use strong, random secrets (32+ characters)
- Use different secrets for JWT and JWT_REFRESH
- Never commit `.env`, `.env.local`, or `backend/.env` to git
- Use environment-specific values (don't use prod keys in dev)
- Rotate secrets regularly in production
- Use Stripe live keys only in production

### ❌ Don'ts
- Don't use default/example secrets in production
- Don't share .env files publicly
- Don't commit secrets to version control
- Don't reuse secrets across projects
- Don't use test Stripe keys in production

## Quick Reference

### Minimum Required Variables

**Frontend (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

**Backend (`backend/.env`):**
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce_db
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:3000
```

## Verification

### Check if environment variables are loaded

**Frontend:**
```javascript
// In browser console
console.log(process.env.NEXT_PUBLIC_API_URL)
// Should output: http://localhost:3001/api
```

**Backend:**
```javascript
// In backend code
console.log(process.env.DATABASE_URL)
// Should output your database URL
```

### Test setup

```bash
# 1. Start backend
cd backend && npm run dev

# 2. In another terminal, start frontend
npm run dev

# 3. Visit http://localhost:3000
# 4. Try to register/login
# 5. Check browser console for errors
```

---

## Summary

- **1 template file** (`.env.example`) - tracked in git ✅
- **2-3 active files** (`.env.local`, `backend/.env`, optional `.env`) - NOT in git ❌
- Copy template → Edit → Keep only relevant section
- Generate strong secrets
- Never commit actual .env files

---

**Last Updated:** November 2025


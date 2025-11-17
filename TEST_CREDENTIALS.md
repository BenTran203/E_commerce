# 🧪 Test User Credentials

This document contains all available test user credentials for the E-commerce platform.

---

## 🔐 Admin User (Pre-seeded)

### Credentials:

- **Email:** `admin@timeless.com`
- **Password:** `Admin@123456`
- **Role:** `ADMIN`
- **Status:** Active, Email Verified

### How to Create:

Run the seed script to create the admin user:

```bash
cd backend
npx ts-node prisma/seed-admin.ts
```

Or using Docker:

```bash
docker compose exec backend npx ts-node prisma/seed-admin.ts
```

### Features:

- ✅ Full admin dashboard access (`/admin`)
- ✅ Can manage products, orders, categories
- ✅ Can view all customer orders
- ✅ Can update order statuses

---

## 👤 Regular Customer User

### Credentials:

- **Email:** test@timeless.com
- **Password:** Test@111
- **Role:** User
- **Status:** Active, Email 

### Option 1: Create via Registration

1. Go to: `http://localhost:3000/auth?register=true`
2. Fill in registration form
3. Use any email/password you want

### Option 2: Create via API

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "password": "Test123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Option 3: Create via Prisma Studio

```bash
cd backend
npx prisma studio
```

- Open `users` table
- Click "Add record"
- Fill in user details
- Set `role` to `CUSTOMER`
- Hash password using bcrypt (or use API registration)

---

## 📝 Test Credentials from Documentation

### Demo User (mentioned in PRODUCTION_READINESS_TESTING.md):

- **Email:** `demo@example.com`
- **Password:** `Demo123!`
- **Note:** This user may not exist by default - you'll need to create it

---

## 🚀 Quick Setup Guide

### Step 1: Start Services

```bash
docker compose up -d
```

### Step 2: Create Admin User

```bash
cd backend
docker compose exec backend npx ts-node prisma/seed-admin.ts
```

### Step 3: Create Test Customer (Optional)

```bash
# Via registration page
# OR via API:
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@customer.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "Customer"
  }'
```

### Step 4: Login

1. Go to: `http://localhost:3000/auth`
2. Enter credentials
3. Access admin dashboard: `http://localhost:3000/admin`

---

## 🎯 Testing Scenarios

### Admin Testing:

1. Login with `admin@timeless.com` / `Admin@123456`
2. Access admin dashboard
3. Create products
4. View/manage orders
5. Manage categories

### Customer Testing:

1. Register new account OR login with customer credentials
2. Browse products
3. Add to cart
4. Place orders
5. View order history (`/account/orders`)

---

## 🔍 Verify Users Exist

### Check via Prisma Studio:

```bash
cd backend
npx prisma studio
```

- Open `users` table
- View all users and their roles

### Check via API:

```bash
# Login first to get token
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@timeless.com",
    "password": "Admin@123456"
  }'

# Use the token to check profile
curl http://localhost:3001/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ⚠️ Important Notes

1. **Password Hashing**: Passwords are hashed using bcrypt (15 rounds)
2. **Email Verification**: Admin user is pre-verified, new users need verification
3. **Role Assignment**: Default role is `CUSTOMER`, change to `ADMIN` for admin access
4. **Database Reset**: Running `prisma migrate reset` will delete all users

---

## 🛠️ Troubleshooting

### Admin user doesn't exist?

```bash
cd backend
docker compose exec backend npx ts-node prisma/seed-admin.ts
```

### Can't login?

- Check if user exists in database
- Verify password is correct
- Check if user is active (`isActive: true`)
- Verify email is correct (case-insensitive)

### Need to reset admin password?

```sql
-- Connect to database and update password hash
-- Or delete user and re-run seed script
```

---

## 📋 Summary

| User Type          | Email                   | Password         | Role     | Access               |
| ------------------ | ----------------------- | ---------------- | -------- | -------------------- |
| **Admin**    | `admin@timeless.com`  | `Admin@123456` | ADMIN    | Full admin dashboard |
| **Customer** | Create via registration | Your choice      | CUSTOMER | Shopping & orders    |
| **Demo**     | `demo@example.com`    | `Demo123!`     | CUSTOMER | (Create manually)    |

---

**Last Updated:** Based on current codebase structure

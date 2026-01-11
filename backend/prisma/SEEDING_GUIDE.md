# Database Seeding Guide

## Overview

This guide explains how to seed your Timeless e-commerce database with initial data including users (admin & customer) and products.

## What Gets Seeded

1. **Admin User** - Full access to the admin panel
   - Email: `admin@timeless.com`
   - Password: `Admin@123456`
   - Role: ADMIN

2. **Customer User** - Regular customer account for testing
   - Email: `customer@timeless.com`
   - Password: `Customer@123456`
   - Role: CUSTOMER

3. **Products** - Sample products with categories and brands
   - Reads from `prisma/products.json`
   - Creates categories, brands, and products with images

## Prerequisites

Before running seeds, ensure:

1. Database is running and accessible
2. `.env` file has correct `DATABASE_URL`
3. Prisma migrations are up to date
4. `products.json` file exists in `backend/prisma/` directory

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate
```

## Running Seeds

### Method 1: Using Prisma's built-in seed command (Recommended)

```bash
cd backend
npx prisma db seed
```

This automatically runs the seed script defined in `package.json`.

### Method 2: Using npm script

```bash
cd backend
npm run db:seed
```

### Method 3: Direct execution

```bash
cd backend
npx tsx prisma/seed.ts
```

## Seeding Individual Components

If you need to seed specific parts separately:

### Seed Admin Only
```bash
npx tsx -e "import {PrismaClient} from '@prisma/client'; import {seedAdmin} from './prisma/seed-admin'; const prisma = new PrismaClient(); seedAdmin(prisma).then(() => prisma.\$disconnect());"
```

### Seed Customer Only
```bash
npx tsx -e "import {PrismaClient} from '@prisma/client'; import {CustomerSeed} from './prisma/seed-customer'; const prisma = new PrismaClient(); CustomerSeed(prisma).then(() => prisma.\$disconnect());"
```

### Seed Products Only
```bash
npx tsx -e "import {PrismaClient} from '@prisma/client'; import {seedProducts} from './prisma/seed-products'; const prisma = new PrismaClient(); seedProducts(prisma).then(() => prisma.\$disconnect());"
```

## Resetting Database

To completely reset the database and re-seed:

```bash
cd backend
npm run db:reset
```

⚠️ **Warning**: This will delete ALL data and run migrations + seeds from scratch.

## Troubleshooting

### Error: "tsx: command not found"

Install tsx:
```bash
npm install -D tsx
```

Or use ts-node instead:
```bash
npx ts-node prisma/seed.ts
```

### Error: "products.json not found"

Make sure `products.json` exists at `backend/prisma/products.json`.

### Error: "User already exists"

The seed scripts check for existing users and skip creation if they exist. This is normal behavior and not an error.

### Database Connection Issues

1. Check your `.env` file has correct `DATABASE_URL`
2. Ensure PostgreSQL is running
3. Verify credentials and database name are correct

Example `DATABASE_URL`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/timeless_db?schema=public"
```

## File Structure

```
backend/prisma/
├── seed.ts              # Main seed orchestrator
├── seed-admin.ts        # Admin user seeding
├── seed-customer.ts     # Customer user seeding
├── seed-products.ts     # Products, categories, brands seeding
├── products.json        # Product data (required)
└── schema.prisma        # Database schema
```

## Modifying Seed Data

### Change User Credentials

Edit `seed-admin.ts` or `seed-customer.ts`:
```typescript
const email = 'your-email@example.com';
const password = 'YourPassword123';
```

### Add More Products

Edit `products.json` following the existing structure.

### Customize Seeding Order

Edit `seed.ts` to change the order or add/remove seed functions:
```typescript
async function main() {
  await seedAdmin(prisma);      // Admin first
  await CustomerSeed(prisma);   // Then customer
  await seedProducts(prisma);   // Finally products
}
```

## Best Practices

1. **Always backup** before running `db:reset`
2. **Use environment variables** for sensitive data
3. **Version control** your seed files but NOT `products.json` if it's large
4. **Test seeds locally** before deploying
5. **Document changes** to seed data structure

## Production Considerations

⚠️ **Never run seeds in production** unless you know exactly what you're doing!

For production:
- Use migrations only
- Manually create admin users with secure passwords
- Import real product data through admin interface
- Use secure password hashing (bcrypt rounds ≥ 12)

## Next Steps

After seeding:
1. Start the backend server: `npm run dev`
2. Login with seeded credentials
3. Verify data in Prisma Studio: `npm run db:studio`
4. Test API endpoints with seeded data

## Support

If you encounter issues:
1. Check the console output for specific errors
2. Review the troubleshooting section above
3. Verify all prerequisites are met
4. Check database logs


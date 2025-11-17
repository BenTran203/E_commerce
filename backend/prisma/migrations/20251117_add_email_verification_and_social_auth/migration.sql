-- AlterTable: Add social auth fields to users
ALTER TABLE "users" ADD COLUMN "provider" TEXT;
ALTER TABLE "users" ADD COLUMN "providerId" TEXT;

-- AlterTable: Make password nullable (for social auth users)
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable: Add email verification fields
ALTER TABLE "users" ADD COLUMN "verificationToken" TEXT;
ALTER TABLE "users" ADD COLUMN "verificationExpiry" TIMESTAMP(3);

-- CreateIndex: Add index for provider/providerId lookup
CREATE INDEX "users_provider_providerId_idx" ON "users"("provider", "providerId");

-- CreateIndex: Add unique constraint for verificationToken
CREATE UNIQUE INDEX "users_verificationToken_key" ON "users"("verificationToken");

-- AlterEnum: Remove VENDOR and SUPER_ADMIN from UserRole enum
-- First, update any existing users with these roles
UPDATE "users" SET "role" = 'CUSTOMER' WHERE "role" = 'VENDOR';
UPDATE "users" SET "role" = 'ADMIN' WHERE "role" = 'SUPER_ADMIN';

-- Drop the default constraint temporarily
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;

-- Create new enum without VENDOR and SUPER_ADMIN
CREATE TYPE "UserRole_new" AS ENUM ('CUSTOMER', 'ADMIN');

-- Alter the column to use new enum
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");

-- Restore the default
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER'::"UserRole_new";

-- Drop old enum
DROP TYPE "UserRole";

-- Rename new enum to old name
ALTER TYPE "UserRole_new" RENAME TO "UserRole";

-- CreateTable: RefreshToken table
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Add unique constraint for token
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex: Add indexes for userId and token lookups
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");
CREATE INDEX "refresh_tokens_token_idx" ON "refresh_tokens"("token");

-- AddForeignKey: Link refresh_tokens to users
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Remove vendor-related foreign keys and columns
-- Drop foreign key from order_items to vendors
ALTER TABLE "order_items" DROP CONSTRAINT IF EXISTS "order_items_vendorId_fkey";
ALTER TABLE "order_items" DROP COLUMN IF EXISTS "vendorId";

-- Drop foreign key from products to vendors
ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_vendorId_fkey";
ALTER TABLE "products" DROP COLUMN IF EXISTS "vendorId";

-- Drop vendors table (this will cascade delete any related data)
DROP TABLE IF EXISTS "vendors" CASCADE;


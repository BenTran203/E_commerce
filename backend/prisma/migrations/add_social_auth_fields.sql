-- Add social authentication fields to User table

-- Migration: Add provider and providerId fields for social authentication
-- Date: 2025-10-17
-- Purpose: Support Google, Facebook, and Twitter OAuth login

-- Add provider field (google, facebook, twitter, credentials)
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "provider" VARCHAR(50);

-- Add providerId field (unique ID from OAuth provider)
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "providerId" VARCHAR(255);

-- Make password nullable (social auth users won't have passwords)
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS "users_provider_providerId_idx" ON "users"("provider", "providerId");

-- Add comment to document these fields
COMMENT ON COLUMN "users"."provider" IS 'OAuth provider: google, facebook, twitter, or credentials';
COMMENT ON COLUMN "users"."providerId" IS 'Unique ID from OAuth provider';


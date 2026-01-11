# Resend Email Verification - Quick Start

## ⚡ 3-Minute Setup

### Step 1: Get API Key
Visit [resend.com](https://resend.com) → Sign up → Copy your API key

### Step 2: Add to Environment
Add to `backend/.env`:
```env
RESEND_API_KEY=re_YtoUS71Z_KLizFjcaFERg8qfuuVhvpSMN
EMAIL_FROM=onboarding@resend.dev
FRONTEND_URL=http://localhost:3000
```

### Step 3: Restart Backend
```bash
cd backend
npm run dev
```

### Step 4: Test It!
Register a new user → Check email → Click verify link → Done! ✅

---

## 🔄 Complete Email Verification Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER REGISTERS                                          │
│     POST /api/auth/register                                 │
│     { email, password, firstName, lastName }                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  2. BACKEND GENERATES TOKEN                                 │
│     - Create crypto token (32 bytes hex)                    │
│     - Set expiry (24 hours)                                 │
│     - Save to database                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  3. SEND EMAIL VIA RESEND                                   │
│     resend.emails.send({                                    │
│       from: 'onboarding@resend.dev',                        │
│       to: user.email,                                       │
│       subject: 'Verify Your Email',                         │
│       html: '<beautiful template>'                          │
│     })                                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  4. USER RECEIVES EMAIL                                     │
│     - Opens inbox                                           │
│     - Sees beautiful HTML email                             │
│     - Clicks "Verify Email Address" button                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  5. REDIRECTED TO FRONTEND                                  │
│     http://localhost:3000/verify-email?token=abc123...      │
│     - Frontend extracts token from URL                      │
│     - Shows loading spinner                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  6. FRONTEND CALLS API                                      │
│     POST /api/auth/verify-email                             │
│     { token: 'abc123...' }                                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  7. BACKEND VERIFIES                                        │
│     - Find user by token                                    │
│     - Check if expired (< 24 hours)                         │
│     - Check if already verified                             │
│     - Update: isEmailVerified = true                        │
│     - Clear token from database                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  8. SUCCESS! ✅                                              │
│     - Show success message                                  │
│     - User can now use all features                         │
│     - Badge shows "Verified" on account page                │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Key Files

| File | Purpose |
|------|---------|
| `backend/src/services/email.ts` | Resend integration |
| `backend/src/controllers/auth.ts` | Register, verify, resend functions |
| `backend/src/routes/auth.ts` | API endpoints |
| `src/app/verify-email/page.tsx` | Verification page |
| `src/app/account/page.tsx` | Shows verification status |
| `backend/prisma/schema.prisma` | Database schema |

## 🧪 Testing Commands

### 1. Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 2. Check Backend Logs
Look for:
```
✅ Email sent successfully to test@example.com via Resend
```

### 3. Get Token from Email
- Check your inbox (if using verified domain)
- Or check backend console logs (development mode)
- Copy the token from the URL

### 4. Verify Email (Manual)
```bash
curl -X POST http://localhost:3001/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_TOKEN_HERE"}'
```

### 5. Resend Verification (if expired)
First, login to get access token, then:
```bash
curl -X POST http://localhost:3001/api/auth/resend-verification \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🎯 Database Schema

```prisma
model User {
  id                  String    @id @default(cuid())
  email               String    @unique
  isEmailVerified     Boolean   @default(false)
  emailVerifiedAt     DateTime?
  verificationToken   String?   @unique
  verificationExpiry  DateTime?
  // ... other fields
}
```

## 🔐 Security Features

✅ **Secure tokens** - 32-byte random hex (crypto.randomBytes)  
✅ **Token expiration** - 24 hours  
✅ **One-time use** - Token deleted after verification  
✅ **Unique tokens** - Database constraint prevents duplicates  
✅ **Graceful fallback** - Console logging if API key missing  

## 🚨 Common Issues

### "Email not received"
1. Check spam folder
2. Verify `EMAIL_FROM` address
3. Check Resend dashboard > Logs
4. Ensure domain is verified (production)

### "Invalid token"
- Already verified (check `isEmailVerified` in database)
- Token expired (> 24 hours old)
- Token doesn't exist
- Use resend verification endpoint

### "API key error"
- Check `RESEND_API_KEY` in `.env`
- Ensure no spaces/quotes around key
- Try creating new API key

## 💰 Resend Pricing

| Plan | Emails/Month | Price |
|------|--------------|-------|
| Free | 3,000 | $0 |
| Pro | 50,000 | $20 |
| Business | 500,000 | $85 |

Perfect for development and small projects!

## 🎨 Customize Email

Edit `backend/src/services/email.ts`:

```typescript
// Change colors
style="background-color: #111;"  // Your brand color

// Change text
<h1>Welcome to MyApp!</h1>

// Add logo
<img src="https://yourdomain.com/logo.png" alt="Logo">
```

## 📚 Additional Guides

- [Full Setup Guide](./RESEND_EMAIL_SETUP.md)
- [Email Verification Setup](./EMAIL_VERIFICATION_SETUP.md)
- [API Documentation](./API.md)

---

**That's it! You're ready to send verification emails with Resend.com!** 🎉


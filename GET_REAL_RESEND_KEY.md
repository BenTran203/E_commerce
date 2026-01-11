# 🔑 Get Your Real Resend API Key

## The Problem

The current API key `re_YtoUS71Z_KLizFjcaFERg8qfuuVhvpSMN` is a **test/example key** that doesn't actually send emails to real inboxes. The backend says "Email sent successfully" because the API call completes, but no actual email is delivered.

## Solution: Get Your Own API Key

### Step 1: Sign Up for Resend (Free)

1. Go to [resend.com](https://resend.com)
2. Click **"Sign up"** or **"Get started"**
3. Create account with:
   - Email (can use haxsol0983@gmail.com)
   - Password
   - Or sign in with GitHub

### Step 2: Get Your API Key

1. Once logged in, go to **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Give it a name: `Development Key` or `E-commerce Project`
4. Select permissions: **"Full access"** or **"Sending access"**
5. Click **"Add"**
6. **COPY THE KEY IMMEDIATELY** (you won't see it again!)
   - It starts with `re_`
   - Example: `re_ABC123xyz...` (much longer than the test key)

### Step 3: Update Your Configuration

#### Update Root .env File:

```bash
# Open root .env file
notepad .env

# Replace this line:
RESEND_API_KEY=re_YtoUS71Z_KLizFjcaFERg8qfuuVhvpSMN

# With your new key:
RESEND_API_KEY=re_YOUR_ACTUAL_KEY_HERE
```

#### Update Backend .env File:

```bash
# Open backend/.env file
notepad backend\.env

# Add or update:
RESEND_API_KEY=re_YOUR_ACTUAL_KEY_HERE
EMAIL_FROM=onboarding@resend.dev
FRONTEND_URL=http://localhost:3000
```

### Step 4: Restart Backend

```powershell
# Restart Docker backend
docker-compose restart backend

# Or for local development
cd backend
npm run dev
```

### Step 5: Test Again

```powershell
# Login first to get access token
Invoke-WebRequest -Uri "http://localhost:3001/api/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"haxsol0983@gmail.com","password":"Test@123456"}'

# Copy the accessToken from response

# Then resend verification
Invoke-WebRequest -Uri "http://localhost:3001/api/auth/resend-verification" `
  -Method POST `
  -Headers @{
    "Content-Type"="application/json"
    "Authorization"="Bearer YOUR_ACCESS_TOKEN_HERE"
  }
```

## Important Notes

### Free Tier Limits:
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ Perfect for development & testing

### Why You Need Your Own Key:
1. **Test keys don't actually send emails** - they just simulate sending
2. **Real keys deliver to real inboxes** - you'll actually receive the email
3. **Free forever** - Resend's free tier is generous for development

### Domain Note:
- For development: Use `onboarding@resend.dev` (works immediately)
- For production: Verify your own domain later

## Visual Guide

```
┌─────────────────────────────────────────────────────┐
│  1. Go to resend.com                                │
│     Sign up (free, no credit card needed)           │
└──────────────────┬──────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────┐
│  2. Navigate to "API Keys"                          │
│     (Left sidebar in dashboard)                     │
└──────────────────┬──────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────┐
│  3. Click "Create API Key"                          │
│     Name: "Development"                             │
│     Permission: Full access                         │
└──────────────────┬──────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────┐
│  4. COPY THE KEY!                                   │
│     Example: re_ABC123xyz789...                     │
│     (It's long, ~40+ characters)                    │
└──────────────────┬──────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────┐
│  5. Update .env files                               │
│     - Root .env                                     │
│     - backend/.env                                  │
└──────────────────┬──────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────┐
│  6. Restart backend                                 │
│     docker-compose restart backend                  │
└──────────────────┬──────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────┐
│  7. Test & receive email!                           │
│     Check your Gmail inbox ✅                       │
└─────────────────────────────────────────────────────┘
```

## Quick Fix Commands

After getting your real API key, run these:

```powershell
# Stop backend
docker-compose down backend

# Update .env files (use your actual key)
# Edit manually or use these commands:

# For root .env:
(Get-Content .env) -replace 'RESEND_API_KEY=.*', 'RESEND_API_KEY=re_YOUR_KEY_HERE' | Set-Content .env

# Restart backend
docker-compose up -d backend

# Check logs
docker-compose logs -f backend
```

## Verification Checklist

After updating the API key:

- [ ] Signed up at resend.com
- [ ] Created API key in dashboard
- [ ] Copied the full key (starts with `re_`)
- [ ] Updated root `.env` file
- [ ] Updated `backend/.env` file
- [ ] Restarted Docker backend
- [ ] Tested email sending
- [ ] Checked Gmail inbox
- [ ] Email received! ✅

## Need Help?

If you still don't receive emails after using a real key:

1. **Check Spam/Junk folder** in Gmail
2. **Check Resend Dashboard** > Emails > Logs
3. **Verify API key** is correct (no spaces, no quotes)
4. **Check backend logs** for errors:
   ```powershell
   docker-compose logs --tail=50 backend
   ```

## Why The Test Key Doesn't Work

```
Test Key (re_YtoUS71Z...) → Resend API → Returns "Success" ✅
                                       → But NO actual email sent! ❌

Real Key (re_YOUR_KEY...) → Resend API → Returns "Success" ✅
                                       → ACTUAL email delivered! ✅📧
```

---

**Bottom line:** Get your free API key from [resend.com/api-keys](https://resend.com/api-keys) and you'll start receiving real emails! 🚀


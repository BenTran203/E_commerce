# Resend.com Email Verification Setup Guide

## Overview

Your e-commerce platform now uses **Resend.com** for sending email verifications. This guide explains how to configure and use it.

## 🚀 Quick Start

### 1. Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and sign up
2. Navigate to **API Keys** in your dashboard
3. Click **Create API Key**
4. Copy your API key (it starts with `re_`)

**Note:** For testing, you can use the default test key, but for production, you'll need to:
- Verify your domain
- Add DNS records
- Use a production API key

### 2. Configure Environment Variables

Add these to your `backend/.env` file:

```env
# Resend API Configuration
RESEND_API_KEY=re_YtoUS71Z_KLizFjcaFERg8qfuuVhvpSMN

# Email sender address (must be from your verified domain)
EMAIL_FROM=onboarding@resend.dev
# For production, use your domain: noreply@yourdomain.com

# Frontend URL for email verification links
FRONTEND_URL=http://localhost:3000
```

### 3. Verify Your Domain (Production Only)

For production emails, you need to verify your domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain registrar
5. Wait for verification (usually takes 24-48 hours)

Once verified, update `EMAIL_FROM`:
```env
EMAIL_FROM=noreply@yourdomain.com
```

## 📧 How Email Verification Works

### Complete Flow:

```
1. User Registration
   └─> POST /api/auth/register
       └─> Generate verification token
       └─> Save token to database
       └─> Send email via Resend
       └─> Return success response

2. Email Sent via Resend
   └─> Beautiful HTML email
   └─> Contains verification link
   └─> Link: /verify-email?token={token}

3. User Clicks Link
   └─> Opens /verify-email page
   └─> Frontend extracts token
   └─> Calls POST /api/auth/verify-email

4. Backend Verification
   └─> Find user by token
   └─> Check expiration (24 hours)
   └─> Mark email as verified
   └─> Clear token from DB
   └─> Return success

5. User Verified! ✅
```

## 🔧 Implementation Details

### Backend Files Modified

#### 1. `backend/src/services/email.ts`
- Uses Resend SDK
- Falls back to console logging if API key missing
- Beautiful HTML email template
- Handles errors gracefully

#### 2. `backend/src/controllers/auth.ts`
**Three key functions:**

**a) `register` (lines 40-156)**
```typescript
// Generates token and sends verification email
const verificationToken = crypto.randomBytes(32).toString("hex");
await sendEmail({
  to: user.email,
  subject: "Welcome to Timeless - Verify Your Email",
  template: "email-verification",
  data: { firstName, verificationUrl }
});
```

**b) `verifyEmail` (lines 673-741)**
```typescript
// Verifies token and updates user
const user = await prisma.user.findUnique({
  where: { verificationToken: token }
});
// Check expiration, mark as verified
```

**c) `resendVerificationEmail` (lines 746-822)**
```typescript
// Resends verification email
// Protected route - requires authentication
```

### Frontend Files

#### 1. `src/app/verify-email/page.tsx`
- Extracts token from URL
- Calls API to verify
- Shows success/error message
- Beautiful UI with animations

#### 2. `src/app/account/page.tsx`
- Shows verification status
- Button to resend verification email

## 🧪 Testing

### Local Testing (Console Fallback)

Without `RESEND_API_KEY`, emails log to console:

```bash
⚠️  RESEND_API_KEY not configured. Falling back to console logging.
📧 Email (console fallback): {
  to: 'user@example.com',
  subject: 'Welcome to Timeless - Verify Your Email',
  template: 'email-verification',
  ...
}
```

### Testing with Resend

1. **Start your backend:**
```bash
cd backend
npm run dev
```

2. **Register a new user:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456",
    "firstName": "Test",
    "lastName": "User"
  }'
```

3. **Check backend logs:**
```
✅ Email sent successfully to test@example.com via Resend
```

4. **Check your email inbox** (if using verified domain) or **Resend dashboard** > **Logs**

5. **Click verification link** or manually visit:
```
http://localhost:3000/verify-email?token={YOUR_TOKEN}
```

### Test Endpoints

```bash
# Verify email
curl -X POST http://localhost:3001/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "your-verification-token-here"}'

# Resend verification (requires auth token)
curl -X POST http://localhost:3001/api/auth/resend-verification \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📊 Resend Dashboard Features

### Email Logs
View all sent emails at: https://resend.com/emails
- Status (delivered, bounced, etc.)
- Opens and clicks
- Error messages

### API Usage
Monitor your API usage and limits

### Webhooks (Optional)
Set up webhooks to track:
- Email delivered
- Email opened
- Email clicked
- Bounce/complaint

## 🔒 Security Best Practices

1. **Never commit API keys** to Git
   - Use `.env` files
   - Add to `.gitignore`

2. **Use different keys for dev/prod**
   ```env
   # Development
   RESEND_API_KEY=re_dev_xxxx

   # Production
   RESEND_API_KEY=re_prod_xxxx
   ```

3. **Token expiration** is set to 24 hours
   - Change in `auth.ts` if needed:
   ```typescript
   const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
   ```

4. **Rate limiting** - Resend free tier:
   - 100 emails/day
   - 3,000 emails/month
   - Upgrade for more

## 🎨 Customizing Email Template

Edit the HTML in `backend/src/services/email.ts`:

```typescript
if (template === "email-verification") {
  finalHtml = `
    <!DOCTYPE html>
    <html>
      <!-- Your custom HTML here -->
      <body style="...">
        <!-- Change colors, fonts, layout -->
      </body>
    </html>
  `;
}
```

### Tips:
- Use inline CSS (email clients don't support `<style>` tags well)
- Test with different email clients
- Keep it simple and responsive
- Use tables for layout (yes, really!)

## 🐛 Troubleshooting

### "Email not sending"
1. Check API key is correct
2. Check `EMAIL_FROM` is valid
3. For production, ensure domain is verified
4. Check Resend dashboard > Logs for errors

### "Token expired"
- Tokens expire after 24 hours
- User can click "Resend verification email"
- Or call `POST /api/auth/resend-verification`

### "Invalid token"
- Token already used (user already verified)
- Token doesn't exist in database
- Check for typos in URL

### "403 Forbidden from Resend"
- Invalid API key
- API key doesn't have permission
- Create a new API key with full permissions

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend React Email](https://react.email) - Build emails with React
- [Email Testing Tools](https://www.mail-tester.com/) - Test spam score
- [Can I Email](https://www.caniemail.com/) - Check CSS support

## 🎯 Next Steps

1. ✅ Install Resend package
2. ✅ Update email service
3. ⚪ Add `RESEND_API_KEY` to `.env`
4. ⚪ Test registration flow
5. ⚪ Verify domain for production
6. ⚪ Customize email template (optional)
7. ⚪ Set up webhooks (optional)

## 💡 Pro Tips

### Use React Email Templates
For more complex emails, use [React Email](https://react.email):

```bash
npm install @react-email/components
```

Then create beautiful emails with React components!

### Monitor Email Performance
Track metrics in Resend dashboard:
- Delivery rate
- Open rate
- Click rate
- Bounce rate

### Set Up Webhooks
Get real-time notifications:
```typescript
// webhook handler
app.post('/webhooks/email', (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'email.delivered') {
    console.log('Email delivered:', data);
  }
});
```

---

**Need Help?** Check the [Resend Discord](https://discord.gg/resend) or open an issue in this repo.


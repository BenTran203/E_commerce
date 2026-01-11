# Environment Configuration for Resend

## Backend Configuration

Add these variables to `backend/.env`:

```env
# ==================================================
# RESEND EMAIL CONFIGURATION
# ==================================================

# Resend API Key (Get from https://resend.com/api-keys)
RESEND_API_KEY=re_YtoUS71Z_KLizFjcaFERg8qfuuVhvpSMN

# Email From Address
EMAIL_FROM=onboarding@resend.dev

# Frontend URL (for verification links)
FRONTEND_URL=http://localhost:3000
```

## Getting Your Resend API Key

1. **Sign up** at [resend.com](https://resend.com)
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Development Key")
5. Copy the key (starts with `re_`)
6. Paste into your `.env` file

## Development vs Production

### Development Setup (Quick Start)

```env
# Use Resend's test domain (no verification needed)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=onboarding@resend.dev
FRONTEND_URL=http://localhost:3000
```

**Pros:**
- ✅ No domain verification needed
- ✅ Works immediately
- ✅ Great for testing

**Cons:**
- ❌ Limited to 100 emails/day
- ❌ Emails may go to spam
- ❌ Not suitable for production

### Production Setup

```env
# Use your verified domain
RESEND_API_KEY=re_your_production_api_key
EMAIL_FROM=noreply@yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

**Requirements:**
1. Verify your domain in Resend
2. Add DNS records:
   - SPF record
   - DKIM record
   - (Optional) DMARC record
3. Wait 24-48 hours for DNS propagation
4. Test email delivery

## Domain Verification Steps

### 1. Add Domain in Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)

### 2. Add DNS Records

Resend will provide records like:

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all
```

**DKIM Record:**
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGS... (long string)
```

**DMARC Record (Recommended):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

### 3. Add to Your Domain Registrar

Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these DNS records.

### 4. Verify in Resend

- Go back to Resend dashboard
- Click **Verify** next to your domain
- Wait for green checkmark ✅

## Testing Your Configuration

### Test 1: Check Environment Variables

```bash
cd backend
node -e "require('dotenv').config(); console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY); console.log('EMAIL_FROM:', process.env.EMAIL_FROM);"
```

### Test 2: Register a Test User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-real-email@example.com",
    "password": "Test@123456",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Test 3: Check Backend Logs

You should see:
```
✅ Email sent successfully to your-real-email@example.com via Resend
```

### Test 4: Check Resend Dashboard

1. Go to [Resend Emails](https://resend.com/emails)
2. You should see your sent email
3. Click to view details (status, opens, clicks)

### Test 5: Check Your Inbox

1. Open your email
2. You should see a beautiful verification email
3. Click "Verify Email Address" button
4. Should redirect to verification page

## Troubleshooting

### "RESEND_API_KEY not configured"

**Problem:** API key not found in environment

**Solution:**
1. Check `backend/.env` file exists
2. Verify `RESEND_API_KEY` is set
3. No spaces around the `=` sign
4. No quotes around the key
5. Restart backend server

### "403 Forbidden" from Resend

**Problem:** Invalid or expired API key

**Solution:**
1. Go to Resend dashboard
2. Create a new API key
3. Update `.env` file
4. Restart backend

### "Email not delivered"

**Problem:** Email sent but not received

**Solution:**
1. Check spam folder
2. Verify `EMAIL_FROM` address
3. Check Resend dashboard > Logs
4. For production, ensure domain is verified
5. Check DNS records are correct

### "Domain not verified"

**Problem:** Using custom domain but not verified

**Solution:**
1. Use `onboarding@resend.dev` for testing
2. Or verify your domain properly
3. Wait 24-48 hours after adding DNS records
4. Use `dig` command to check DNS propagation:
   ```bash
   dig TXT resend._domainkey.yourdomain.com
   ```

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RESEND_API_KEY` | Yes | - | Your Resend API key |
| `EMAIL_FROM` | Yes | `onboarding@resend.dev` | Sender email address |
| `FRONTEND_URL` | Yes | `http://localhost:3000` | Frontend URL for links |

## Security Best Practices

### 1. Use Different Keys for Environments

```env
# Development
RESEND_API_KEY=re_dev_xxxxx

# Staging
RESEND_API_KEY=re_staging_xxxxx

# Production
RESEND_API_KEY=re_prod_xxxxx
```

### 2. Never Commit API Keys

Add to `.gitignore`:
```
.env
.env.local
.env.production
*.env
```

### 3. Use Environment Variable Management

For production, use:
- **Vercel:** Environment Variables section
- **Railway:** Variables tab
- **AWS:** Parameter Store or Secrets Manager
- **Docker:** Docker secrets or environment files

### 4. Rotate Keys Regularly

1. Create new API key
2. Update environment
3. Test thoroughly
4. Delete old key

## Rate Limits

### Free Tier
- 100 emails per day
- 3,000 emails per month
- Perfect for development and testing

### Pro Tier ($20/month)
- 50,000 emails per month
- Better deliverability
- Priority support

### Business Tier ($85/month)
- 500,000 emails per month
- Dedicated IP
- Advanced analytics

## Next Steps

1. ✅ Add `RESEND_API_KEY` to `backend/.env`
2. ✅ Set `EMAIL_FROM` address
3. ✅ Set `FRONTEND_URL`
4. ✅ Restart backend server
5. ✅ Test registration flow
6. ⚪ (Production) Verify domain
7. ⚪ (Production) Update `EMAIL_FROM`
8. ⚪ (Optional) Set up webhooks
9. ⚪ (Optional) Customize email template

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Domain Setup Guide](https://resend.com/docs/dashboard/domains/introduction)
- [DNS Verification Tool](https://mxtoolbox.com/)

---

**Need help?** Check the [Resend Discord](https://discord.gg/resend) or [Resend Support](https://resend.com/support)


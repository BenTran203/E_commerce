# 🚀 Deployment Guide - Timeless E-Commerce

Complete guide for deploying the Timeless E-Commerce platform to production.

## 📋 Pre-Deployment Checklist

### 1. Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console.logs in production code
- [ ] ESLint warnings fixed
- [ ] Tests passing (if applicable)
- [ ] Code reviewed and optimized

### 2. Environment Variables
- [ ] All `.env` files configured
- [ ] Production Stripe keys added
- [ ] Strong JWT secrets generated
- [ ] Database credentials secured
- [ ] CORS origins updated
- [ ] API URLs updated to production

### 3. Database
- [ ] Migrations tested
- [ ] Seed scripts ready
- [ ] Backup strategy in place
- [ ] Indexes optimized

### 4. Security
- [ ] All secrets changed from defaults
- [ ] HTTPS configured
- [ ] CORS properly restricted
- [ ] Rate limiting enabled
- [ ] SQL injection protection verified
- [ ] XSS protection enabled

### 5. Performance
- [ ] Images optimized
- [ ] Bundle size analyzed
- [ ] Caching strategy implemented
- [ ] CDN configured (optional)
- [ ] Database queries optimized

## 🎯 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### **Recommended for beginners - Free tier available**

#### Frontend on Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
     NEXTAUTH_SECRET=your_secret
     NEXTAUTH_URL=https://your-app.vercel.app
     ```
   - Deploy!

#### Backend on Railway

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)

2. **Create New Project**
   - New Project → Deploy from GitHub
   - Select your repository
   - Choose `backend` directory

3. **Add PostgreSQL Database**
   - New → Database → PostgreSQL
   - Note the `DATABASE_URL` provided

4. **Add Redis**
   - New → Database → Redis
   - Note the `REDIS_URL` provided

5. **Configure Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=postgresql://... (from Railway)
   REDIS_URL=redis://... (from Railway)
   JWT_SECRET=your_generated_secret
   JWT_REFRESH_SECRET=your_generated_secret
   STRIPE_SECRET_KEY=sk_live_...
   FRONTEND_URL=https://your-app.vercel.app
   ```

6. **Run Migrations**
   - Railway → Settings → Deploy
   - In terminal: `npx prisma migrate deploy`
   - Seed: `npx ts-node prisma/seed-admin.ts`
   - Seed products: `npx ts-node prisma/seed-products.ts`

7. **Deploy**
   - Railway will auto-deploy
   - Note your backend URL

#### Update Frontend Environment
- Go back to Vercel
- Update `NEXT_PUBLIC_API_URL` with Railway backend URL
- Redeploy

---

### Option 2: DigitalOcean App Platform

#### **All-in-one platform**

1. **Create DigitalOcean Account**

2. **Create App**
   - Apps → Create App
   - Connect GitHub repository

3. **Configure Services**
   
   **Web Service (Frontend)**
   - Name: `frontend`
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment Variables: Add all from `.env.local.example`

   **Web Service (Backend)**
   - Name: `backend`
   - Source Directory: `/backend`
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment Variables: Add all from `backend/.env.example`

4. **Add Databases**
   - Database → PostgreSQL
   - Database → Redis
   - Note connection strings

5. **Deploy**
   - Review and deploy
   - Run migrations via console

---

### Option 3: Docker on VPS (Advanced)

#### **For full control**

#### 1. Provision VPS
Choose provider: DigitalOcean, Linode, AWS EC2, etc.
- Minimum: 2GB RAM, 2 CPU cores, 50GB storage
- OS: Ubuntu 22.04 LTS

#### 2. Initial Server Setup

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose
apt install docker-compose -y

# Create app user
adduser appuser
usermod -aG docker appuser
su - appuser
```

#### 3. Clone Repository

```bash
git clone <your-repo-url>
cd E_commerce
```

#### 4. Configure Environment

```bash
# Copy and edit environment files
cp .env.example .env
cp .env.local.example .env.local
cp backend/.env.example backend/.env

# Edit with nano or vim
nano .env
nano .env.local
nano backend/.env
```

#### 5. Build and Deploy

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npx ts-node prisma/seed-admin.ts
docker-compose exec backend npx ts-node prisma/seed-products.ts
```

#### 6. Configure Nginx

```bash
sudo apt install nginx -y

sudo nano /etc/nginx/sites-available/ecommerce
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 7. Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

#### 8. Setup Auto-renewal

```bash
sudo crontab -e
# Add:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔒 Production Environment Variables

### Generate Secure Secrets

```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# NextAuth Secret
openssl rand -base64 32
```

### Required Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXTAUTH_SECRET=<generated_secret>
NEXTAUTH_URL=https://yourdomain.com
```

#### Backend (.env)
```env
NODE_ENV=production
DATABASE_URL=<production_database_url>
REDIS_URL=<production_redis_url>
JWT_SECRET=<generated_secret>
JWT_REFRESH_SECRET=<different_generated_secret>
STRIPE_SECRET_KEY=sk_live_...
FRONTEND_URL=https://yourdomain.com
```

---

## 🧪 Production Testing

### 1. Smoke Tests
- [ ] Homepage loads
- [ ] User can register
- [ ] User can login
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout process completes
- [ ] Admin dashboard accessible
- [ ] Orders appear in admin

### 2. Performance Tests
- [ ] Page load time < 3s
- [ ] API response time < 500ms
- [ ] Images load properly
- [ ] No console errors

### 3. Security Tests
- [ ] HTTPS working
- [ ] Auth tokens secure
- [ ] No exposed secrets
- [ ] CORS properly configured
- [ ] SQL injection protected
- [ ] XSS protected

---

## 📊 Monitoring & Maintenance

### Application Monitoring

Use services like:
- **Vercel Analytics** (built-in for Vercel)
- **Sentry** (error tracking)
- **LogRocket** (session replay)
- **Datadog** (full-stack monitoring)

### Database Backups

#### Railway/DigitalOcean
- Automated daily backups (usually included)
- Configure retention period
- Test restore process

#### Self-hosted
```bash
# Backup
docker-compose exec postgres pg_dump -U postgres ecommerce_db > backup.sql

# Restore
docker-compose exec -T postgres psql -U postgres ecommerce_db < backup.sql

# Automate with cron
0 2 * * * /path/to/backup.sh
```

### Log Management

```bash
# View logs
docker-compose logs -f backend

# Rotate logs (add to cron)
docker-compose logs --tail=1000 backend > logs/backend-$(date +%Y%m%d).log
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check DATABASE_URL format
# Verify database is running
docker-compose ps postgres

# Test connection
docker-compose exec postgres psql -U postgres -d ecommerce_db
```

#### 2. CORS Errors
```bash
# Update backend/.env
FRONTEND_URL=https://your-production-domain.com

# Update backend/src/app.ts
app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true 
}))
```

#### 3. Stripe Webhook Issues
- Update webhook URL in Stripe Dashboard
- Use live webhook secret for production
- Test with Stripe CLI locally first

#### 4. Build Failures
```bash
# Clear caches
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

## 📞 Post-Deployment

### 1. Domain Configuration
- Point DNS to your server/platform
- Wait for DNS propagation (up to 48hrs)
- Verify with `nslookup yourdomain.com`

### 2. Stripe Production Mode
- Switch to live keys
- Configure live webhooks
- Test with real card (small amount)
- Refund test transaction

### 3. Admin Setup
- Login with admin credentials
- Change admin password
- Create additional admin users if needed
- Upload real product images

### 4. SEO Setup
- Add Google Analytics
- Submit sitemap to Google
- Configure meta tags
- Add structured data

---

## ✅ Launch Checklist

- [ ] All production env vars configured
- [ ] Database migrated and seeded
- [ ] Stripe live keys working
- [ ] HTTPS enabled
- [ ] Domain pointing correctly
- [ ] Monitoring setup
- [ ] Backups configured
- [ ] Error tracking enabled
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Documentation updated
- [ ] Team trained
- [ ] Launch announcement ready

---

## 🎉 You're Live!

Congratulations on deploying your e-commerce platform!

### Next Steps
1. Monitor errors and performance
2. Gather user feedback
3. Iterate and improve
4. Scale as needed

### Need Help?
- Check logs: `docker-compose logs -f`
- Review Stripe dashboard
- Check monitoring tools
- Contact platform support

---

**Last Updated:** November 2025


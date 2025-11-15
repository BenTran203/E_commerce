# ⚡ Quick Testing Reference

## Fast Production Checks for Timeless E-commerce

---

## 🚀 5-Minute Quick Check

Run these commands in order:

```bash
# 1. Check code quality (30 seconds)
npm run check-all

# 2. Test production build (2 minutes)
npm run test:build

# 3. Start production server (30 seconds)
npm run test:prod
# Then visit http://localhost:3000 and click through main pages
```

**If all pass ✅ → Ready for basic deployment**

---

## 📋 Essential Pre-Deployment Checklist

### Must Do:

- [ ] `npm run check-all` passes
- [ ] `npm run build` succeeds
- [ ] No console errors on main pages
- [ ] Authentication works
- [ ] Cart functionality works
- [ ] Mobile responsive (test in DevTools)
- [ ] Environment variables set

### Should Do:

- [ ] Lighthouse score 80+
- [ ] Test on real mobile device
- [ ] All 4 main pages load
- [ ] Forms validate properly
- [ ] Images load correctly

### Nice to Have:

- [ ] Lighthouse score 90+
- [ ] Accessibility tested (keyboard nav)
- [ ] Multiple browsers tested
- [ ] Demo video created
- [ ] README updated

---

## 🎯 Critical Commands

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Security audit
npm audit

# Fix security issues
npm audit fix

# Production build
npm run build

# Start production server
npm run start

# Development server
npm run dev
```

---

## 🧪 Quick Lighthouse Test

1. Open Chrome
2. Visit `http://localhost:3000`
3. Press F12 → Lighthouse tab
4. Run audit

**Target Scores:**

- Performance: 80+ (90+ excellent)
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 📱 Quick Responsive Test

**Chrome DevTools:**

1. Press F12
2. Click device icon (Ctrl+Shift+M)
3. Test these sizes:
   - 375px (iPhone SE)
   - 768px (iPad)
   - 1440px (Desktop)

**Check:**

- No horizontal scroll
- Text readable
- Buttons tappable
- Images scale properly

---

## ♿ Quick Accessibility Check

**Keyboard Test (2 minutes):**

1. Close your mouse
2. Tab through the site
3. Check:
   - [ ] Can reach all interactive elements
   - [ ] Focus indicators visible
   - [ ] Enter activates buttons
   - [ ] Escape closes modals

**Lighthouse A11y Test:**

- Run Lighthouse
- Check Accessibility score
- Fix issues shown

---

## 🔒 Quick Security Check

```bash
# 1. Check for vulnerabilities
npm audit

# 2. Verify .env.local in .gitignore
cat .gitignore | grep .env

# 3. Check no console.logs in code
grep -r "console.log" src/

# 4. Verify no secrets in code
grep -r "password\|secret\|key" src/ | grep -v "props\|type\|interface"
```

---

## 🐛 Quick Functionality Test

Visit each page and check:

**Homepage** (`/`)

- [ ] Loads without errors
- [ ] Images display
- [ ] Navigation works

**Shop** (`/shop`)

- [ ] 20 products display
- [ ] Filters work
- [ ] Search works
- [ ] Add to cart works

**Collections** (`/collections`)

- [ ] 7 collections show
- [ ] Can click into collections

**About** (`/about`)

- [ ] Page loads
- [ ] Content displays

**Contact** (`/contact`)

- [ ] Form displays
- [ ] Validation works
- [ ] Can submit

**Auth** (`/auth/login`)

- [ ] Login form works
- [ ] OAuth buttons show
- [ ] Register link works

**Cart**

- [ ] Add items
- [ ] Update quantity
- [ ] Remove items
- [ ] Persists on refresh

---

## 🌐 Quick Browser Test

**Minimum Testing:**

1. Chrome (your main browser)
2. One other browser (Firefox or Safari)

**Quick Check in Each:**

- Visit homepage
- Add item to cart
- View product detail
- Test form

---

## 📊 Environment Variables Checklist

**Required for Production:**

```env
✅ AUTH_SECRET (32+ chars)
✅ NEXTAUTH_SECRET (same as AUTH_SECRET)
✅ NEXTAUTH_URL (production URL)
✅ NEXT_PUBLIC_API_URL (backend URL)
```

**Optional (if using OAuth):**

```env
○ GOOGLE_CLIENT_ID
○ GOOGLE_CLIENT_SECRET
○ FACEBOOK_CLIENT_ID
○ FACEBOOK_CLIENT_SECRET
○ TWITTER_CLIENT_ID
○ TWITTER_CLIENT_SECRET
```

---

## 🚀 Quick Deployment Steps (Vercel)

1. **Push to GitHub:**

```bash
git add .
git commit -m "Production ready"
git push origin main
```

2. **Deploy on Vercel:**

- Go to vercel.com
- Import GitHub repo
- Add environment variables
- Click Deploy

3. **Test Production:**

- Visit deployed URL
- Test main features
- Check for errors (F12)

4. **Update OAuth:**

- Add production callback URLs
- Test OAuth login

---

## ⚠️ Common Issues & Quick Fixes

### Issue: Build fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Hydration error

```bash
# Check for client-only code in server components
# Look for localStorage, window usage
```

### Issue: Missing secret error

```bash
# Add AUTH_SECRET to .env.local
# Generate with: openssl rand -base64 32
```

### Issue: Images not loading

```bash
# Check next.config.js image domains
# Verify image paths are correct
```

### Issue: OAuth redirect error

```bash
# Update redirect URI in OAuth provider console
# Must match: https://your-domain.com/api/auth/callback/[provider]
```

---

## 📝 Quick README Template

````markdown
# Project Name

🔗 [Live Demo](https://your-app.vercel.app)

## Tech Stack

- Next.js 16
- TypeScript
- Redux Toolkit
- NextAuth v5
- Tailwind CSS

## Features

- 🔐 Authentication
- 🛒 Shopping cart
- 🌍 Multi-language
- 📱 Responsive

## Test Credentials

Email: demo@example.com
Password: Demo123!

## Setup

```bash
git clone [repo]
npm install
npm run dev
```
````

## Performance

- Lighthouse: 95+
- Accessibility: WCAG AA

## Author

[Your Name] - [Portfolio](link) - [LinkedIn](link)

```

---

## ✅ Final Go/No-Go Checklist

**GO for Production if:**
- ✅ `npm run build` succeeds
- ✅ No critical console errors
- ✅ Main features work
- ✅ Mobile responsive
- ✅ Lighthouse > 80

**NO GO if:**
- ❌ Build fails
- ❌ Authentication broken
- ❌ Major console errors
- ❌ Critical security issues
- ❌ Site doesn't load

---

## 🎯 Portfolio Quality Bar

**Minimum (Acceptable):**
- ✅ Builds successfully
- ✅ Core features work
- ✅ Mobile responsive
- ✅ Clean code

**Good (Impressive):**
- ✅ All of minimum +
- ✅ Lighthouse 85+
- ✅ Accessible (keyboard nav)
- ✅ Demo video/screenshots

**Excellent (Stand Out):**
- ✅ All of good +
- ✅ Lighthouse 95+
- ✅ WCAG AA compliant
- ✅ Case study written
- ✅ Professional documentation

---

## 📞 Getting Help

**If stuck:**
1. Check error message carefully
2. Google the exact error
3. Check Next.js docs
4. Check GitHub issues
5. Stack Overflow

**Common Resources:**
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [NextAuth Docs](https://authjs.dev)

---

## 🎉 Ready to Deploy?

**If you can answer YES to these:**
1. Does `npm run build` succeed? ✅
2. Do main features work? ✅
3. Is it mobile responsive? ✅
4. Are there no critical errors? ✅
5. Would you show this to an employer? ✅

**Then deploy it! 🚀**

Don't wait for perfection. Deploy, get feedback, iterate!

---

**Time to Complete Full Testing:** 2-4 hours
**Time for Quick Check:** 5-10 minutes
**Minimum for Deploy:** 30 minutes

Good luck! 🌟

```

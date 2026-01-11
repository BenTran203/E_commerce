# AI Analysis Feature - Setup Guide

This guide will help you set up the AI-powered dashboard analysis and chatbot features.

## 📦 Required NPM Packages

### Backend Dependencies

```bash
cd backend
npm install openai express-rate-limit multer pdf-parse exceljs
npm install --save-dev @types/multer @types/pdf-parse
```

**Package Descriptions:**
- `openai` - Official OpenAI API client
- `express-rate-limit` - Rate limiting middleware to prevent abuse
- `multer` - File upload handling
- `pdf-parse` - Parse PDF files for AI analysis
- `exceljs` - Parse Excel files for AI analysis (secure alternative to xlsx)

### Frontend Dependencies

```bash
cd frontend
npm install recharts axios react-hot-toast
npm install --save-dev @types/react
```

**Package Descriptions:**
- `recharts` - Chart library for line and column graphs
- `axios` - HTTP client for API calls (already installed, verify version)
- `react-hot-toast` - Toast notifications (already installed, verify version)

---

## 🔑 Environment Variables Setup

### Backend (.env)

Create a `.env` file in the `backend` directory (copy from `.env.example`):

```env
# OpenAI Configuration
OPENAI_API_KEY="sk-proj-YOUR_ACTUAL_KEY_HERE"
OPENAI_MODEL="gpt-3.5-turbo"
OPENAI_MAX_TOKENS="1500"
OPENAI_TEMPERATURE="0.7"

# Cost Control
DAILY_AI_BUDGET_PER_USER="5.0"
MONTHLY_AI_BUDGET_TOTAL="500.0"

# Optional: Redis (for production)
# REDIS_HOST="localhost"
# REDIS_PORT="6379"
```

**Getting OpenAI API Key:**
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file
5. **IMPORTANT**: Keep this key secret! Never commit it to git.

### Frontend (.env.local)

The frontend only needs:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

## 🚀 Installation Steps

### 1. Install Backend Packages

```bash
cd backend
npm install openai express-rate-limit multer pdf-parse exceljs
npm install --save-dev @types/multer @types/pdf-parse
```

### 2. Install Frontend Packages

```bash
cd frontend
npm install recharts
```

### 3. Configure Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env and add your OPENAI_API_KEY

# Frontend
cp frontend/.env.example frontend/.env.local
```

### 4. Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Access Dashboard

Open [http://localhost:3000/admin](http://localhost:3000/admin) and you should see:
- ✅ Clickable stat cards
- ✅ AI-generated graphs section
- ✅ AI chatbot sidebar on the right
- ✅ AI analysis section at the bottom

---

## 🎯 Feature Overview

### 1. Interactive Stat Cards
- Click any stat card (Sales, Orders, Products, Customers)
- AI generates trend graphs automatically
- Shows both line chart (trends) and column chart (comparison)

### 2. AI Dashboard Analysis
- Click "Analyze" button at the bottom
- AI generates 6 categories of insights:
  - Sales Trends & Anomalies
  - Customer Behavior Patterns
  - Product Performance Insights
  - Inventory Recommendations
  - Seasonal Patterns
  - Risk Alerts

### 3. AI Chatbot
- Fixed sidebar on the right
- Ask questions about your dashboard data
- Upload files (CSV, PDF, Excel) for analysis
- Context-aware responses based on current data

---

## 🔒 Security Features Implemented

### Rate Limiting
- **Dashboard Analysis**: 5 requests per 15 minutes
- **Graph Generation**: 20 requests per 5 minutes
- **Chatbot Messages**: 50 messages per hour
- **File Uploads**: 10 files per hour

### Input Validation
- File size limit: 10MB
- Allowed formats: CSV, PDF, Excel, TXT, JSON
- Message length limit: 2000 characters
- Sanitization of all user inputs

### Error Handling
- Comprehensive try-catch blocks
- User-friendly error messages
- Automatic error logging
- Graceful degradation if AI service fails

### Cost Control
- Daily budget per user: $5 (configurable)
- Monthly total budget: $500 (configurable)
- Caching: 15 minutes for analysis, 5 minutes for graphs
- Token estimation and cost tracking

---

## 🧪 Testing the Features

### Test Dashboard Analysis
1. Go to Admin Dashboard
2. Scroll to bottom
3. Click "Analyze" button
4. Wait 20-30 seconds
5. Should see 6 categories of AI-generated insights

### Test Graph Generation
1. Click "Total Sales" stat card
2. Should see loading state
3. Should display line graph (sales trend) + column chart (comparison)
4. Try other cards: Orders, Products, Customers

### Test Chatbot
1. Look at right sidebar
2. Type: "Why did sales increase last week?"
3. AI should respond with context from your data
4. Try uploading a CSV file
5. AI should analyze and provide insights

---

## 🐛 Troubleshooting

### OpenAI API Key Invalid
```
Error: OPENAI_API_KEY is not set in environment variables
```
**Solution**: Check that your `.env` file has the correct API key.

### Rate Limit Exceeded
```
Error: Too many AI analysis requests. Please try again in 15 minutes.
```
**Solution**: Wait for the cooldown period or adjust rate limits in `rateLimiter.ts`.

### CORS Errors
```
Error: CORS policy blocked
```
**Solution**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.

### File Upload Fails
```
Error: File too large. Maximum size is 10MB.
```
**Solution**: Reduce file size or adjust `MAX_SIZE` in `validation.ts`.

---

## 💰 Cost Estimation

Using `gpt-3.5-turbo` (recommended for cost efficiency):

| Action | Estimated Tokens | Cost per Request | Daily Usage (Heavy) | Daily Cost |
|--------|------------------|------------------|---------------------|------------|
| Dashboard Analysis | ~2000 tokens | $0.004 | 5 requests | $0.02 |
| Graph Generation | ~500 tokens | $0.001 | 20 requests | $0.02 |
| Chatbot Message | ~300 tokens | $0.0006 | 50 messages | $0.03 |
| File Analysis | ~1500 tokens | $0.003 | 10 files | $0.03 |
| **TOTAL** | - | - | - | **~$0.10/day** |

**Monthly estimate**: ~$3/user/month (with moderate usage)

---

## 🎉 Success Checklist

- [ ] Backend packages installed
- [ ] Frontend packages installed
- [ ] OpenAI API key configured
- [ ] Environment variables set
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Admin dashboard loads
- [ ] Stat cards are clickable
- [ ] Graphs generate successfully
- [ ] Chatbot sidebar visible
- [ ] Chatbot responds to messages
- [ ] File upload works
- [ ] AI analysis generates insights

---

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Express Rate Limit](https://github.com/express-rate-limit/express-rate-limit)
- [Recharts Documentation](https://recharts.org/)
- [Multer Documentation](https://github.com/expressjs/multer)

---

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Check backend terminal for error logs
3. Verify all environment variables are set
4. Ensure OpenAI API key is valid and has credits
5. Check that all npm packages are installed

---

**Congratulations!** 🎉 You've successfully set up the AI-powered dashboard analysis feature!

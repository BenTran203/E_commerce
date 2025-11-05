# Timeless E-commerce Platform

> A modern, minimalist luxury e-commerce platform built with Next.js, TypeScript, and Express.js

## 🎯 **Project Overview**

Timeless is a sophisticated e-commerce platform designed for medium/high-end clothing brands, similar to Uniqlo and H&M. It features a clean, minimalist design with luxury aesthetics, multi-vendor support, AI-powered features, and comprehensive e-commerce functionality.

## ✨ **Features**

### Frontend

- 🎨 **Minimalist Luxury Design** - Clean, sophisticated UI inspired by premium brands
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🛒 **Shopping Cart & Checkout** - Smooth shopping experience with Stripe integration
- 🔍 **Advanced Search & Filtering** - AI-enhanced product discovery
- 👤 **User Authentication** - Secure login/registration with JWT
- ❤️ **Wishlist & Favorites** - Save products for later
- ⭐ **Reviews & Ratings** - Customer feedback system
- 🎯 **Multi-vendor Support** - Platform for multiple clothing brands
- 🤖 **AI Chatbot** - Customer support with OpenAI integration
- 🚀 **Smooth Animations** - Framer Motion powered transitions

### Backend

- 🔐 **Secure Authentication** - JWT with bcrypt password hashing
- 💳 **Payment Processing** - Stripe integration for secure payments
- 📊 **Database Management** - PostgreSQL with Prisma ORM
- 🏪 **Multi-vendor System** - Support for multiple vendors/brands
- 📧 **Email Notifications** - Automated email workflows
- 🤖 **AI Integration** - OpenAI-powered chatbot and search
- 📈 **Analytics & Tracking** - User behavior and sales analytics
- 🔒 **Role-based Access Control** - Admin, vendor, and customer roles

## 🛠️ **Technology Stack**

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **State Management**: Redux Toolkit with persistence
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with React Query

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Payment**: Stripe API integration
- **AI**: OpenAI APIs
- **File Storage**: AWS S3 integration
- **Email**: Nodemailer
- **Validation**: Joi

## 📋 **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **PostgreSQL** (v13 or higher) - [Download here](https://postgresql.org/)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 **Quick Start**

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd E_commerce
```

### 2. Frontend Setup

```bash
# Navigate to the project root (frontend)
cd E_commerce

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your configuration
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration (see Backend Configuration section)
```

### 4. Database Setup

```bash
# In the backend directory
cd backend

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Seed the database with sample data
npm run db:seed
```

### 5. Start Development Servers

**Terminal 1 - Frontend:**

```bash
# In the root directory
npm run dev
```

**Terminal 2 - Backend:**

```bash
# In the backend directory
cd backend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## ⚙️ **Environment Configuration**

### Frontend Environment Variables (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Backend Environment Variables (.env)

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/timeless_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# OpenAI (for AI features)
OPENAI_API_KEY="your-openai-api-key"

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="timeless-uploads"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Frontend URL
FRONTEND_URL="http://localhost:3000"
```

## 🗄️ **Database Setup**

### 1. Install PostgreSQL

**Windows:**

- Download from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/)
- Run the installer and follow the setup wizard

**macOS:**

```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE timeless_db;

# Create user (optional)
CREATE USER timeless_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE timeless_db TO timeless_user;

# Exit
\q
```

### 3. Update Database URL

Update the `DATABASE_URL` in your backend `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/timeless_db"
```

### 4. Run Migrations

```bash
cd backend
npm run db:migrate
```

## 🔧 **Available Scripts**

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Backend Scripts

```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server
npm run test         # Run tests
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## 📁 **Project Structure**

```
E_commerce/
├── src/                          # Frontend source code
│   ├── app/                      # Next.js App Router
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Basic UI components
│   │   ├── layout/               # Layout components
│   │   └── sections/             # Page sections
│   ├── hooks/                    # Custom React hooks
│   ├── store/                    # Redux store and slices
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── backend/                      # Backend source code
│   ├── src/                      # Backend source files
│   │   ├── controllers/          # Route handlers
│   │   ├── middleware/           # Custom middleware
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   ├── utils/                # Utility functions
│   │   └── types/                # TypeScript types
│   ├── prisma/                   # Database schema and migrations
│   └── tests/                    # Test files
├── public/                       # Static assets
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🧪 **Testing**

### Frontend Testing

```bash
# Run tests (when implemented)
npm run test
npm run test:watch
npm run test:coverage
```

### Backend Testing

```bash
cd backend
npm run test
npm run test:watch
npm run test:coverage
```

## 🚀 **Deployment**

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Backend Deployment (Railway/Heroku)

1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy using platform-specific methods

### Database Deployment

```bash
cd backend
npm run db:deploy  # Deploy migrations to production
```

## 🛒 **E-commerce Features Implementation**

### Current Features

- ✅ Project structure and design system
- ✅ User authentication (frontend UI)
- ✅ Product catalog display
- ✅ Shopping cart functionality
- ✅ Responsive design
- ✅ Backend API structure
- ✅ Database schema

### Next Implementation Steps

1. **Authentication System** - Complete JWT implementation
2. **Product Management** - Full CRUD operations
3. **Order Processing** - Checkout and order management
4. **Payment Integration** - Stripe payment processing
5. **Multi-vendor System** - Vendor dashboard and management
6. **AI Features** - Chatbot and enhanced search
7. **Email System** - Notifications and transactional emails
8. **Admin Dashboard** - Complete admin interface

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **API Documentation**

Once the backend is running, you can access:

- **API Overview**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health
- **Swagger Documentation**: http://localhost:3001/api/docs (when implemented)

## 🔗 **Useful Links**

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## ❓ **Troubleshooting**

### Common Issues

**Frontend won't start:**

- Ensure Node.js v18+ is installed
- Delete `node_modules` and run `npm install`
- Check for port conflicts (default: 3000)

**Backend won't start:**

- Ensure PostgreSQL is running
- Check database connection string
- Verify all environment variables are set

**Database connection issues:**

- Verify PostgreSQL service is running
- Check database credentials
- Ensure database exists

**Build errors:**

- Run `npm run type-check` to identify TypeScript issues
- Check for missing dependencies
- Verify all imports are correct

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- Design inspiration from Uniqlo and H&M
- Built with modern web technologies
- Community-driven development

---

**Happy coding! 🚀**

For questions or support, please open an issue in the repository.

# Timeless E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js, Node.js, PostgreSQL, and Stripe integration. Features a complete shopping experience with user authentication, admin dashboard, payment processing, and more.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

### Customer Features

- **User Authentication** - Secure registration, login, and session management
- **Shopping Cart** - Add, update, and manage cart items with persistent storage
- **Stripe Payment Integration** - Secure checkout with test and production modes
- **Order Management** - View order history and track order status
- **Product Search & Filtering** - Advanced search with category, brand, price filters
- **Wishlist** - Save favorite products for later
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Multi-language Support** - i18n ready (English & Vietnamese)

### Admin Features

- **Admin Dashboard** - Comprehensive analytics and overview
- **Product Management** - Create, update, and delete products
- **User Management** - View and manage customer accounts
- **Order Management** - View and update order statuses
- **Category Management** - Organize products into categories
- **Sales Analytics** - Track revenue and performance metrics

### Technical Features

- **Modern Tech Stack** - Next.js 16 with Turbopack, Node.js, TypeScript
- **Docker Support** - Containerized development and deployment
- **PostgreSQL Database** - Prisma ORM for type-safe database access
- **Redis Caching** - Fast data retrieval and session management
- **Security** - JWT authentication, bcrypt password hashing, CORS protection
- **Tailwind CSS** - Modern, responsive UI styling
- **State Management** - Redux Toolkit with persistence
- **Form Validation** - Client and server-side validation

## Tech Stack

### Frontend

- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Forms:** React Hook Form
- **HTTP Client:** Fetch API
- **UI Components:** Custom components with Lucide Icons
- **Animation:** Framer Motion
- **Payment:** Stripe React SDK

### Backend

- **Runtime:** Node.js with Express
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Cache:** Redis
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Express Validator
- **Payment Processing:** Stripe API

### DevOps

- **Containerization:** Docker & Docker Compose
- **Database UI:** pgAdmin
- **Redis UI:** Redis Commander
- **Development:** Nodemon, Hot Reload

## Prerequisites

- **Node.js** 18+
- **Docker** & Docker Compose
- **Git**
- **Stripe Account** (for payment processing)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd E_commerce
```

### 2. Environment Setup

We use **separate `.env.example` files** for frontend and backend configurations:

```bash
# Frontend environment
cp frontend/.env.example frontend/.env.local

# Backend environment
cp backend/.env.example backend/.env
```

Then edit each file and fill in your actual values:

- **`frontend/.env.local`** - Frontend environment variables
- **`backend/.env`** - Backend environment variables

### 3. Start Docker Services

```bash
docker-compose up -d
```

This will start:

- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend API (port 3001)
- pgAdmin (port 5050)
- Redis Commander (port 8081)

### 4. Seed the Database

```bash
# Seed admin user
docker-compose exec backend npx ts-node prisma/seed-admin.ts

# Seed products
docker-compose exec backend npx ts-node prisma/seed-products.ts
```

### 5. Start Frontend Development Server

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

## Default Credentials

### Admin Account

- **Email:** admin@timeless.com
- **Password:** Admin@123456

### Test Stripe Card

- **Card Number:** 4242 4242 4242 4242
- **Expiry:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits (e.g., 123)

## Project Structure

```
E_commerce/
├── backend/                      # Backend Express API
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   ├── seed-admin.ts        # Admin user seeding
│   │   ├── seed-products.ts     # Product data seeding
│   │   └── migrations/          # Database migrations
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   │   ├── auth.ts
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   ├── payments.ts
│   │   │   ├── products.ts
│   │   │   └── users.ts
│   │   ├── middleware/          # Auth, validation, rate limiting
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Business logic layer
│   │   ├── utils/               # Helper functions
│   │   └── app.ts               # Express server setup
│   ├── Dockerfile               # Docker configuration
│   ├── .env.example             # Backend environment template
│   ├── package.json
│   └── tsconfig.json
├── frontend/                     # Frontend Next.js 16 app
│   ├── src/
│   │   ├── app/                 # App router pages
│   │   │   ├── account/        # User account pages
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── auth/           # Login, register, verify-email
│   │   │   ├── pages/          # Static pages (about, contact)
│   │   │   ├── product/        # Product detail pages
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Homepage
│   │   ├── components/          # React components
│   │   │   ├── checkout/       # Checkout flow components
│   │   │   ├── sections/       # Homepage sections
│   │   │   └── ui/             # Reusable UI components
│   │   ├── data/
│   │   │   ├── products.json   # Product catalog data
│   │   │   └── assest.json     # Asset mappings
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCart.ts
│   │   │   └── useProducts.ts
│   │   ├── lib/
│   │   │   └── api.ts          # API client wrapper
│   │   ├── store/               # Redux Toolkit store
│   │   │   ├── slices/         # Redux slices (auth, cart, products, ui)
│   │   │   └── index.ts        # Store configuration with persistence
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript type definitions
│   │   └── utils/               # Utility functions
│   ├── .env.example             # Frontend environment template
│   ├── package.json             # Frontend dependencies
│   ├── next.config.js           # Next.js configuration
│   ├── tailwind.config.ts       # Tailwind CSS config
│   ├── tsconfig.json            # TypeScript config
│   └── eslint.config.mjs        # ESLint configuration
├── docs/                         # Documentation files
├── .github/
│   └── copilot-instructions.md  # AI agent guide
└── docker-compose.yml           # Docker services (postgres, redis, backend, pgadmin)
```

## Development

### Available Scripts

#### Frontend

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### Backend

```bash
cd backend
npm run dev          # Start with nodemon
npm run build        # Compile TypeScript
npm run start        # Start production server
npx prisma studio    # Open Prisma Studio
```

### Database Management

```bash
# Run migrations
docker-compose exec backend npx prisma migrate dev

# Open Prisma Studio
docker-compose exec backend npx prisma studio

# Reset database
docker-compose exec backend npx prisma migrate reset
```

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend

# Restart a service
docker-compose restart backend
```

## Testing

### Manual Testing Checklist

- User Registration & Login
- Browse Products & Collections
- Add/Remove items from Cart
- Checkout Flow with Stripe
- Order History
- Admin Dashboard Access
- Product Management (CRUD)
- Order Status Updates

## API Documentation

### Base URL

```
http://localhost:3001/api
```

### Key Endpoints

#### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token

#### Products

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)

#### Cart

- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove cart item

#### Orders

- `POST /orders` - Create new order
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details

#### Payments

- `POST /payments/create-intent` - Create Stripe payment intent
- `POST /payments/confirm` - Confirm payment

[Full API documentation](./docs/API.md)

## Deployment

### Production Checklist

1. Update environment variables
2. Change JWT secrets
3. Update database credentials
4. Configure Stripe production keys
5. Set up SSL certificates
6. Configure CORS for production domain
7. Set NODE_ENV=production
8. Build Next.js app (`npm run build`)
9. Run database migrations
10. Seed production database

### Deployment Options

- **Vercel** (Frontend) + **Railway/Render** (Backend)
- **DigitalOcean** App Platform
- **AWS** (EC2 + RDS + ElastiCache)
- **Docker** on VPS

[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)

## Security Features

- JWT-based authentication with refresh tokens
- Bcrypt password hashing (15 rounds)
- CORS protection
- Rate limiting on API endpoints
- SQL injection protection (Prisma ORM)
- XSS protection
- Secure HTTP headers
- Environment variable validation
- Input sanitization

## Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

- GitHub: Ben Tran

**Note:** This is a demonstration project for portfolio purposes. Not intended for actual commercial use without proper modifications and security audits.

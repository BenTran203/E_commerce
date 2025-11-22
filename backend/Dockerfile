# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy prisma schema for generation
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

EXPOSE 3001

# Start with nodemon for hot reload
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for tsx and ts-node)
RUN npm ci

# Install tsx globally for seeding
RUN npm install -g tsx prisma

# Copy prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Copy built files from development stage
COPY --from=development /app/dist ./dist

# Copy seed scripts (needed for seeding)
COPY prisma/seed-admin.ts ./prisma/
COPY prisma/seed-products.ts ./prisma/
COPY src/data/products.json ./src/data/

EXPOSE 3001

# Run migrations, seed database, then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/app.js"]
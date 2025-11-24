# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY backend/package*.json ./
RUN npm install

# Copy tsconfig.json 
COPY backend/tsconfig.json ./

# Copy prisma schema for generation
COPY backend/prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY backend/src ./src/

# Build the TypeScript project
RUN npm run build

EXPOSE 3001

# Start with nodemon for hot reload
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY backend/package*.json ./
RUN npm ci

# Install tsx globally for seeding
RUN npm install -g tsx prisma

# Copy prisma
COPY backend/prisma ./prisma/
COPY src/data/products.json ./prisma/products.json
# COPY backend/prisma/seed-admin.ts ./prisma/
COPY backend/prisma/seed-products.ts ./prisma/

RUN npx prisma generate

# Copy built files from development stage
COPY --from=development /app/dist ./dist

EXPOSE 3001

# Run migrations, seed database, then start the server
CMD sh -c "npx prisma migrate deploy && npx prisma db seed && npm start"
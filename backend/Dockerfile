# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy prisma schema for generation
COPY backend/prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY backend/. .

EXPOSE 3001

# Start with nodemon for hot reload
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy prisma
COPY backend/prisma ./prisma/
RUN npx prisma generate

# Copy built files
COPY --from=development /app/dist ./dist

EXPOSE 3001

CMD ["npm", "start"]
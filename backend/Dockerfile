# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Install dependencies
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
RUN npm ci --only=production

# Copy prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Copy built files
COPY --from=development /app/dist ./dist

EXPOSE 3001

# Run migrations and start the server
CMD sh -c "npx prisma migrate deploy && npm start"
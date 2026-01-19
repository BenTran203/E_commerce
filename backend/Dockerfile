########################### DEVELOPEMENT STAGE########################################################
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy tsconfig.json 
COPY tsconfig.json ./

# Copy prisma schema for generation
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY src ./src/

# Build the TypeScript project
RUN npm run dev

EXPOSE 3001

# Start with nodemon for hot reload
CMD ["npm", "run", "dev"]

########################### PRODUCTION STAGE########################################################
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Install tsx globally for seeding
RUN npx tsx prisma/seed.ts

# Copy prisma
COPY prisma ./prisma/

RUN npx prisma generate

# Copy built files from development stage
COPY --from=development /app/dist ./dist

EXPOSE 3001

# Run migrations, seed database, then start the server
CMD sh -c "npx prisma migrate deploy && npx prisma db seed && npm start"
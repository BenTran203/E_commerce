import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seed-admin';
import { CustomerSeed } from './seed-customer';
import { seedProducts } from './seed-products';

const prisma = new PrismaClient();

async function main() {
  console.log(' Starting database seeding process...\n');
  
  try {
    // Seed users first
    console.log(' Step 1/3: Seeding admin user...');
    await seedAdmin(prisma);
    
    console.log(' Step 2/3: Seeding customer user...');
    await CustomerSeed(prisma);
    
    console.log(' Step 3/3: Seeding products...');
    await seedProducts(prisma);
    
    console.log(' All seeding completed successfully!');
  } catch (error) {
    console.error('Seeding process failed!');
    console.error('Error details:', error);
    throw error; 
  }
}

main()
  .catch((e) => {
    console.error(' A critical error occurred during the seeding process:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seed-admin';
import { CustomerSeed } from './seed-customer';
import { seedProducts } from './seed-products';
import { seedRealisticData } from './seed-realistic-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database seeding process...\n');
  
  try {
    // Seed users first
    console.log('👨‍💼 Step 1/4: Seeding admin user...');
    await seedAdmin(prisma);
    
    console.log('👤 Step 2/4: Seeding test customer...');
    await CustomerSeed(prisma);
    
    console.log('📦 Step 3/4: Seeding products...');
    await seedProducts(prisma);
    
    console.log('🎯 Step 4/4: Seeding realistic customer, order & sales data...');
    await seedRealisticData();
    
    console.log('\n✅ All seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding process failed!');
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
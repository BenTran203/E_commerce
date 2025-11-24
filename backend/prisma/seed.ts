import { PrismaClient } from '@prisma/client';
import { main2 } from './seed-admin';
import { main as seedProducts } from './seed-products';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database seeding process...');
  await main2();
  await seedProducts();
  console.log('🏁 Seeding process completed.');
}

main()
  .catch((e) => {
    console.error('🔥 A critical error occurred during the seeding process:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
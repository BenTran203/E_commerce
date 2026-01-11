import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function CustomerSeed(prisma: PrismaClient) {
  console.log('🌱 Seeding customer user...\n');

  const email = 'customer@timeless.com';
  const password = 'Customer@123456';

  // Check if admin already exists
  const existingCustomer = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

    if (existingCustomer) {
    console.log('Customer user already exists. Skipping creation.');
    return; 
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 15);

  // Create customer user
  const customer = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      emailRaw: email,
      password: hashedPassword,
      firstName: 'Jack',
      lastName: 'Candy',
      role: 'CUSTOMER',
      isActive: true,
      isEmailVerified: true,
      emailVerifiedAt: new Date()
    }
  });

  console.log('✅ Customer user created successfully!\n');
}


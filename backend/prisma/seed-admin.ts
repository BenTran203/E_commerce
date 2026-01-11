import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function seedAdmin(prisma: PrismaClient) {
  console.log('🌱 Seeding admin user...\n');

  const email = 'admin@timeless.com';
  const password = 'Admin@123456';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

    if (existingAdmin) {
    console.log('✅ Admin user already exists. Skipping creation.');
    return; 
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 15);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      emailRaw: email,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
      isEmailVerified: true,
      emailVerifiedAt: new Date()
    }
  });

  console.log('✅ Admin user created successfully!\n');
}


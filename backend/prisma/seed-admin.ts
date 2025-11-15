import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding admin user...\n');

  const email = 'admin@timeless.com';
  const password = 'Admin@123456';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (existingAdmin) {
    console.log('❌ Admin user already exists!');
    console.log(`📧 Email: ${email}`);
    console.log(`🆔 ID: ${existingAdmin.id}`);
    console.log(`👤 Role: ${existingAdmin.role}`);
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
  console.log('📋 Admin Account Details:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log(`🆔 ID: ${admin.id}`);
  console.log(`👤 Role: ${admin.role}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🎉 You can now login to the admin panel!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


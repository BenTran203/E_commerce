import { PrismaClient, User, Product, OrderStatus, PaymentStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Realistic customer data
const CUSTOMERS = [
  { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@email.com', city: 'New York', state: 'NY', phone: '+1 (555) 123-4567' },
  { firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@email.com', city: 'San Francisco', state: 'CA', phone: '+1 (555) 234-5678' },
  { firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.rodriguez@email.com', city: 'Austin', state: 'TX', phone: '+1 (555) 345-6789' },
  { firstName: 'David', lastName: 'Williams', email: 'david.williams@email.com', city: 'Chicago', state: 'IL', phone: '+1 (555) 456-7890' },
  { firstName: 'Jessica', lastName: 'Martinez', email: 'jessica.martinez@email.com', city: 'Miami', state: 'FL', phone: '+1 (555) 567-8901' },
  { firstName: 'James', lastName: 'Taylor', email: 'james.taylor@email.com', city: 'Seattle', state: 'WA', phone: '+1 (555) 678-9012' },
  { firstName: 'Amanda', lastName: 'Anderson', email: 'amanda.anderson@email.com', city: 'Boston', state: 'MA', phone: '+1 (555) 789-0123' },
  { firstName: 'Robert', lastName: 'Thomas', email: 'robert.thomas@email.com', city: 'Denver', state: 'CO', phone: '+1 (555) 890-1234' },
  { firstName: 'Lisa', lastName: 'Garcia', email: 'lisa.garcia@email.com', city: 'Los Angeles', state: 'CA', phone: '+1 (555) 901-2345' },
  { firstName: 'Christopher', lastName: 'Lee', email: 'christopher.lee@email.com', city: 'Portland', state: 'OR', phone: '+1 (555) 012-3456' },
  { firstName: 'Nicole', lastName: 'White', email: 'nicole.white@email.com', city: 'Atlanta', state: 'GA', phone: '+1 (555) 123-4568' },
  { firstName: 'Daniel', lastName: 'Harris', email: 'daniel.harris@email.com', city: 'Phoenix', state: 'AZ', phone: '+1 (555) 234-5679' },
  { firstName: 'Rachel', lastName: 'Clark', email: 'rachel.clark@email.com', city: 'Philadelphia', state: 'PA', phone: '+1 (555) 345-6780' },
  { firstName: 'Kevin', lastName: 'Lewis', email: 'kevin.lewis@email.com', city: 'San Diego', state: 'CA', phone: '+1 (555) 456-7891' },
  { firstName: 'Michelle', lastName: 'Walker', email: 'michelle.walker@email.com', city: 'Dallas', state: 'TX', phone: '+1 (555) 567-8902' },
];

// Helper function to get random date in the past N days
function getRandomPastDate(daysAgo: number): Date {
  const date = new Date();
  const randomDays = Math.floor(Math.random() * daysAgo);
  date.setDate(date.getDate() - randomDays);
  // Random time within that day
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date;
}

// Helper function to get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random number between min and max
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seedRealisticData() {
  console.log('🌱 Starting realistic data seeding...\n');

  try {
    // Step 1: Create customers
    console.log('👥 Step 1/4: Creating customers...');
    const password = 'Customer@123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const createdCustomers: User[] = [];
    for (const customerData of CUSTOMERS) {
      const existingCustomer = await prisma.user.findUnique({
        where: { email: customerData.email.toLowerCase() }
      });

      if (existingCustomer) {
        createdCustomers.push(existingCustomer);
        console.log(`  ↪ Customer ${customerData.email} already exists`);
      } else {
        const customer = await prisma.user.create({
          data: {
            email: customerData.email.toLowerCase(),
            emailRaw: customerData.email,
            password: hashedPassword,
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            role: 'CUSTOMER',
            isActive: true,
            isEmailVerified: true,
            emailVerifiedAt: new Date(),
          }
        });

        // Create address for customer
        await prisma.address.create({
          data: {
            userId: customer.id,
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            address1: `${getRandomInt(100, 9999)} Main Street`,
            address2: Math.random() > 0.7 ? `Apt ${getRandomInt(1, 50)}` : null,
            city: customerData.city,
            state: customerData.state,
            postalCode: `${getRandomInt(10000, 99999)}`,
            country: 'United States',
            phone: customerData.phone,
            isDefault: true,
          }
        });

        createdCustomers.push(customer);
        console.log(`  ✓ Created customer: ${customerData.firstName} ${customerData.lastName}`);
      }
    }

    console.log(`✅ ${createdCustomers.length} customers ready\n`);

    // Step 2: Get products
    console.log('📦 Step 2/4: Fetching products...');
    const products = await prisma.product.findMany({
      where: { isActive: true, stock: { gt: 0 } },
      select: { id: true, name: true, price: true, stock: true }
    });

    if (products.length === 0) {
      console.log('⚠️  No products found! Please run product seeding first.');
      return;
    }

    console.log(`✅ Found ${products.length} products\n`);

    // Step 3: Create realistic orders with varied daily volumes (90 days of data)
    console.log('🛒 Step 3/4: Creating orders with realistic daily patterns...');
    const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    const PAYMENT_STATUSES = ['PENDING', 'PAID', 'FAILED', 'REFUNDED'];
    
    let ordersCreated = 0;

    // Create orders for each of the last 90 days with varied volumes
    for (let dayOffset = 0; dayOffset < 90; dayOffset++) {
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - dayOffset);
      
      // Determine number of orders for this day
      const dayOfWeek = orderDate.getDay(); // 0 = Sunday, 6 = Saturday
      let ordersForDay: number;
      
      // Create realistic patterns:
      // - Weekends (Sat/Sun): Busier (15-30 orders)
      // - Mid-week (Wed/Thu): Normal (8-15 orders)
      // - Mon/Tue: Moderate (5-12 orders)
      // - Friday: Busy (12-20 orders)
      // - Random slow days: 0-3 orders (10% chance)
      
      const isSlowDay = Math.random() < 0.1; // 10% chance of slow day
      
      if (isSlowDay) {
        ordersForDay = getRandomInt(0, 3);
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend - busiest days
        ordersForDay = getRandomInt(15, 30);
      } else if (dayOfWeek === 5) {
        // Friday - busy
        ordersForDay = getRandomInt(12, 20);
      } else if (dayOfWeek === 3 || dayOfWeek === 4) {
        // Wed/Thu - normal
        ordersForDay = getRandomInt(8, 15);
      } else {
        // Mon/Tue - moderate
        ordersForDay = getRandomInt(5, 12);
      }

      // Create orders for this day
      for (let i = 0; i < ordersForDay; i++) {
        const customer = getRandomElement(createdCustomers);
        
        // Set specific time for this order on the same day
        const orderDateTime = new Date(orderDate);
        orderDateTime.setHours(getRandomInt(0, 23));
        orderDateTime.setMinutes(getRandomInt(0, 59));
        orderDateTime.setSeconds(getRandomInt(0, 59));
        
        // Random number of items (1-5 items per order)
        const itemCount = getRandomInt(1, 5);
        const orderProducts: Array<{ product: Product; quantity: number; price: number }> = [];
        const usedProductIds = new Set<string>();

        for (let j = 0; j < itemCount; j++) {
          let product;
          do {
            product = getRandomElement(products);
          } while (usedProductIds.has(product.id));
          
          usedProductIds.add(product.id);
          const quantity = getRandomInt(1, 3);
          orderProducts.push({
            product,
            quantity,
            price: product.price
          });
        }

        // Calculate totals
        const subtotal = orderProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const total = subtotal + tax + shipping;

        // Determine order status based on age
        const daysOld = dayOffset;
        let status: OrderStatus;
        let paymentStatus: PaymentStatus;
        
        if (daysOld > 30) {
          status = Math.random() > 0.95 ? 'CANCELLED' as OrderStatus : 'DELIVERED' as OrderStatus;
          paymentStatus = status === 'CANCELLED' ? 'REFUNDED' as PaymentStatus : 'PAID' as PaymentStatus;
        } else if (daysOld > 14) {
          status = Math.random() > 0.9 ? 'CANCELLED' as OrderStatus : (Math.random() > 0.5 ? 'DELIVERED' as OrderStatus : 'SHIPPED' as OrderStatus);
          paymentStatus = status === 'CANCELLED' ? 'REFUNDED' as PaymentStatus : 'PAID' as PaymentStatus;
        } else if (daysOld > 7) {
          status = Math.random() > 0.8 ? getRandomElement(['SHIPPED', 'DELIVERED']) as OrderStatus : 'PROCESSING' as OrderStatus;
          paymentStatus = 'PAID' as PaymentStatus;
        } else {
          status = Math.random() > 0.7 ? 'PROCESSING' as OrderStatus : 'PENDING' as OrderStatus;
          paymentStatus = status === 'PENDING' ? 'PENDING' as PaymentStatus : 'PAID' as PaymentStatus;
        }

        // Get customer address
        const address = await prisma.address.findFirst({
          where: { userId: customer.id, isDefault: true }
        });

        if (!address) continue;

        // Generate unique order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        // Create order
        await prisma.order.create({
          data: {
            orderNumber,
            userId: customer.id,
            customerEmail: customer.email,
            status,
            subtotal,
            tax,
            shipping,
            total,
            paymentStatus,
            shippingAddressId: address.id,
            billingAddressId: address.id,
            createdAt: orderDateTime,
            updatedAt: orderDateTime,
            items: {
              create: orderProducts.map(item => ({
                productId: item.product.id,
                productName: item.product.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity,
              }))
            }
          }
        });

        ordersCreated++;
      }
      
      if (dayOffset % 10 === 0) {
        console.log(`  ✓ Processed ${dayOffset}/90 days (${ordersCreated} orders created)...`);
      }
    }

    console.log(`✅ Created ${ordersCreated} orders across 90 days\n`);

    // Step 4: Display statistics
    console.log('📊 Step 4/4: Generating statistics...\n');

    const stats = await prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      _count: { id: true },
    });

    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const recentOrders = await prisma.order.count({
      where: {
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }
    });

    console.log('='.repeat(60));
    console.log('📈 DATABASE STATISTICS');
    console.log('='.repeat(60));
    console.log(`👥 Total Customers: ${createdCustomers.length}`);
    console.log(`📦 Total Products: ${products.length}`);
    console.log(`🛒 Total Orders: ${stats._count.id}`);
    console.log(`💰 Total Revenue: $${stats._sum.total?.toFixed(2) || 0}`);
    console.log(`📊 Average Order Value: $${stats._avg.total?.toFixed(2) || 0}`);
    console.log(`📅 Orders (Last 30 days): ${recentOrders}`);
    console.log('\n📋 Orders by Status:');
    ordersByStatus.forEach(item => {
      console.log(`  ${item.status}: ${item._count.id} orders`);
    });
    console.log('='.repeat(60));
    console.log('\n✅ Realistic data seeding completed successfully!\n');
    console.log('🔑 Test Login Credentials:');
    console.log('   Email: sarah.johnson@email.com');
    console.log('   Password: Customer@123\n');

  } catch (error) {
    console.error('❌ Error during realistic data seeding:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedRealisticData()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

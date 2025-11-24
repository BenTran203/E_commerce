import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  category: {
    name: string;
    slug: string;
    isActive: boolean;
  };
  brand?: {
    name: string;
    slug: string;
    isActive: boolean;
  };
  care?: string[];
  features?: string[];
  stock: number;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  sku: string;
  tags: string[];
  isActive: boolean;
}

async function main() {
  console.log('🌱 Seeding products from JSON...\n');

  const jsonPath = path.join(__dirname, 'products.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ products.json not found at ${jsonPath}`);
    console.error('Available files in directory:', fs.readdirSync(__dirname));
    throw new Error('products.json not found');
  }
  
  console.log(`📄 Reading products from: ${jsonPath}`);
  const jsonData: { products: ProductData[] } = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const products = jsonData.products;

  // --- FIX START ---
  // Extract unique categories and brands from the products data
  const uniqueCategories = Array.from(new Map(products.map(p => [p.category.slug, p.category])).values());
  const uniqueBrands = Array.from(new Map(products.filter(p => p.brand).map(p => [p.brand!.slug, p.brand!])).values());
  // --- FIX END ---

  console.log('📁 Creating categories...');
  const categoryMap = new Map<string, string>();
  
  for (const cat of uniqueCategories) {
    try {
      const category = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {
          name: cat.name,
          isActive: cat.isActive,
        },
        create: {
          name: cat.name,
          slug: cat.slug,
          description: `${cat.name} category`,
          isActive: cat.isActive,
        },
      });
      categoryMap.set(cat.slug, category.id);
      console.log(`  ✅ ${cat.name}`);
    } catch (error) {
      console.log(`  ⚠️  Category ${cat.name} might already exist`);
    }
  }

  console.log('\n🏷️  Creating brands...');
  const brandMap = new Map<string, string>();
  
  for (const brand of uniqueBrands) {
    try {
      const createdBrand = await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: {
          name: brand.name,
          isActive: brand.isActive,
        },
        create: {
          name: brand.name,
          slug: brand.slug,
          description: `${brand.name} brand`,
          isActive: brand.isActive,
        },
      });
      brandMap.set(brand.slug, createdBrand.id);
      console.log(`  ✅ ${brand.name}`);
    } catch (error) {
      console.log(`  ⚠️  Brand ${brand.name} might already exist`);
    }
  }

  console.log('\n🛍️  Creating products...');
  let successCount = 0;
  let errorCount = 0;

  for (const productData of products) {
    try {
      const categoryId = categoryMap.get(productData.category.slug);
      if (!categoryId) {
        console.log(`  ❌ Category not found for ${productData.name}`);
        errorCount++;
        continue;
      }

      const brandId = productData.brand ? brandMap.get(productData.brand.slug) : null;

      const product = await prisma.product.upsert({
        where: { sku: productData.sku },
        update: {
          id: productData.id,
          name: productData.name,
          slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: productData.description,
          shortDescription: productData.description.substring(0, 100),
          price: productData.price,
          originalPrice: productData.originalPrice,
          stock: productData.stock,
          categoryId: categoryId,
          brandId: brandId,
          tags: productData.tags,
          isActive: productData.isActive,
          isOnSale: productData.isOnSale,
          isFeatured: productData.isOnSale,
          rating: productData.rating,
          reviewCount: productData.reviewCount,
        },
        create: {
          id: productData.id,
          name: productData.name,
          slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: productData.description,
          shortDescription: productData.description.substring(0, 100),
          price: productData.price,
          originalPrice: productData.originalPrice,
          stock: productData.stock,
          sku: productData.sku,
          categoryId: categoryId,
          brandId: brandId,
          tags: productData.tags,
          isActive: productData.isActive,
          isOnSale: productData.isOnSale,
          isFeatured: productData.isOnSale,
          rating: productData.rating,
          reviewCount: productData.reviewCount,
          images: {
            create: productData.images.map((img, index) => ({
              url: img.url,
              alt: img.alt,
              isPrimary: img.isPrimary,
              sortOrder: index,
            })),
          },
        },
      });

      const existingImages = await prisma.productImage.count({
        where: { productId: product.id },
      });

      if (existingImages === 0) {
        await prisma.productImage.createMany({
          data: productData.images.map((img, index) => ({
            productId: product.id,
            url: img.url,
            alt: img.alt,
            isPrimary: img.isPrimary,
            sortOrder: index,
          })),
        });
      }

      console.log(`  ✅ ${productData.name} (${productData.sku})`);
      successCount++;
    } catch (error: any) {
      console.log(`  ❌ Failed to create ${productData.name}: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`  ✅ Successfully created/updated: ${successCount} products`);
  console.log(`  ❌ Failed: ${errorCount} products`);
  
  const totalCategories = await prisma.category.count();
  const totalBrands = await prisma.brand.count();
  const totalProducts = await prisma.product.count();
  
  console.log('\n📈 Database Status:');
  console.log(`  Categories: ${totalCategories}`);
  console.log(`  Brands: ${totalBrands}`);
  console.log(`  Products: ${totalProducts}`);
  console.log('\n✨ Product seeding completed!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
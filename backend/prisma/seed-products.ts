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

export async function main() {
  console.log('🌱 Starting product seeding...');

  try {
    const jsonPath = path.join(__dirname, 'products.json');
    if (!fs.existsSync(jsonPath)) {
      console.error(`❌ ERROR: products.json not found at path: ${jsonPath}`);
      return;
    }

    console.log('✅ Found products.json. Reading file...');
    const fileContent = fs.readFileSync(jsonPath, 'utf-8');
    const jsonData: { products: ProductData[] } = JSON.parse(fileContent);
    const products = jsonData.products;
    console.log(`📄 Successfully parsed ${products.length} products from JSON.`);

    // Extract unique categories and brands from the products data
    const uniqueCategories = Array.from(new Map(products.map(p => [p.category.slug, p.category])).values());
    const uniqueBrands = Array.from(new Map(products.filter(p => p.brand).map(p => [p.brand!.slug, p.brand!])).values());

    console.log(`📁 Found ${uniqueCategories.length} unique categories. Creating...`);
    const categoryMap = new Map<string, string>();
    for (const cat of uniqueCategories) {
      const category = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: { name: cat.name, slug: cat.slug, isActive: cat.isActive },
      });
      categoryMap.set(cat.slug, category.id);
    }
    console.log('✅ Categories created.');

    console.log(`\n🏷️  Found ${uniqueBrands.length} unique brands. Creating...`);
    const brandMap = new Map<string, string>();
    for (const brand of uniqueBrands) {
      const createdBrand = await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: {},
        create: { name: brand.name, slug: brand.slug, isActive: brand.isActive },
      });
      brandMap.set(brand.slug, createdBrand.id);
    }
    console.log('✅ Brands created.');

    console.log(`\n🛍️  Creating ${products.length} products...`);
    let successCount = 0;
    let errorCount = 0;

    for (const productData of products) {
      const categoryId = categoryMap.get(productData.category.slug);
      if (!categoryId) {
        console.log(`  ❌ Category slug "${productData.category.slug}" not found for product "${productData.name}"`);
        errorCount++;
        continue;
      }

      const brandId = productData.brand ? brandMap.get(productData.brand.slug) : undefined;

      try {
        await prisma.product.upsert({
          where: { sku: productData.sku },
          update: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            stock: productData.stock,
            tags: productData.tags,
          },
          create: {
            id: productData.id,
            name: productData.name,
            slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50),
            description: productData.description,
            price: productData.price,
            originalPrice: productData.originalPrice,
            stock: productData.stock,
            sku: productData.sku,
            categoryId: categoryId,
            brandId: brandId,
            tags: productData.tags,
            isActive: productData.isActive,
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
        successCount++;
      } catch (error: any) {
        console.log(`  ❌ Failed to create ${productData.name}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`  ✅ Successfully created/updated: ${successCount} products`);
    console.log(`  ❌ Failed: ${errorCount} products`);
  } catch (e: any) {
    console.error('❌ An unexpected error occurred during product seeding:', e.message);
    process.exit(1);
  } finally {
    if (require.main === module) {
      main()
        .catch((e) => {
          console.error('❌ An unexpected error occurred during product seeding:', e);
          process.exit(1);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

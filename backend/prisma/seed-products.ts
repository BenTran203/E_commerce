import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

// The function now accepts a prisma client instance
export async function seedProducts(prisma: PrismaClient) {
  console.log("Starting product seeding...");

  try {
    console.log("Pinging the database...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database ping successful.");

    // Path to frontend products.json
    // Path to products.json (local in Docker, or fallback to frontend)
    const jsonPath = fs.existsSync(path.join(__dirname, "products.json"))
      ? path.join(__dirname, "products.json")
      : path.join(__dirname, "../../frontend/src/data/products.json");

    console.log(" Found products.json. Reading file...");
    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    const products: any[] = jsonData.products;
    console.log(`Successfully parsed ${products.length} products from JSON.`);

    const uniqueCategories = Array.from(
      new Map(products.map((p) => [p.category.slug, p.category])).values()
    );
    const uniqueBrands = Array.from(
      new Map(
        products.filter((p) => p.brand).map((p) => [p.brand!.slug, p.brand!])
      ).values()
    );

    console.log(` Creating ${uniqueCategories.length} unique categories...`);
    const categoryMap = new Map<string, string>();
    for (const cat of uniqueCategories) {
      // --- MANUAL UPSERT LOGIC ---
      let dbCategory = await prisma.category.findUnique({
        where: { slug: cat.slug },
      });
      if (!dbCategory) {
        console.log(`  - Creating category: ${cat.name}`);
        dbCategory = await prisma.category.create({
          data: { name: cat.name, slug: cat.slug, isActive: cat.isActive },
        });
      }
      categoryMap.set(cat.slug, dbCategory.id);
      // --- END MANUAL UPSERT ---
    }
    console.log(" Categories seeded.");

    console.log(`Creating ${uniqueBrands.length} unique brands...`);
    const brandMap = new Map<string, string>();
    for (const brand of uniqueBrands) {
      // --- MANUAL UPSERT LOGIC ---
      let dbBrand = await prisma.brand.findUnique({
        where: { slug: brand.slug },
      });
      if (!dbBrand) {
        console.log(`  - Creating brand: ${brand.name}`);
        dbBrand = await prisma.brand.create({
          data: {
            name: brand.name,
            slug: brand.slug,
            isActive: brand.isActive,
          },
        });
      }
      brandMap.set(brand.slug, dbBrand.id);
      // --- END MANUAL UPSERT ---
    }
    console.log("Brands seeded.");

    console.log(` Creating ${products.length} products...`);
    let successCount = 0;
    for (const productData of products) {
      const categoryId = categoryMap.get(productData.category.slug);
      const brandId = productData.brand
        ? brandMap.get(productData.brand.slug)
        : null;

      // --- MANUAL UPSERT LOGIC FOR PRODUCTS ---
      const existingProduct = await prisma.product.findUnique({
        where: { sku: productData.sku },
      });

      if (!existingProduct) {
        console.log(`  - Creating product: ${productData.name}`);
        await prisma.product.create({
          data: {
            id: productData.id,
            name: productData.name,
            slug: productData.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .slice(0, 50),
            description: productData.description,
            price: productData.price,
            originalPrice: productData.originalPrice,
            stock: productData.stock,
            sku: productData.sku,
            categoryId: categoryId!,
            brandId: brandId,
            tags: productData.tags,
            isActive: productData.isActive,
            images: {
              create: productData.images.map((img: any, index: number) => ({
                url: img.url,
                alt: img.alt,
                isPrimary: img.isPrimary,
                sortOrder: index,
              })),
            },
          },
        });
        successCount++;
      }
      // --- END MANUAL UPSERT ---
    }
    console.log(" Products seeded.");

    console.log("Seeding Summary:");
    console.log(`  Successfully created: ${successCount} products`);
  } catch (e: any) {
    console.error("A critical error occurred during product seeding:", e);
    throw e;
  }
}

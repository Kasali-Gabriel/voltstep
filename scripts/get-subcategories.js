import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function getSubcategories() {
  try {
    console.log('🔍 Fetching all subcategories from database...');

    const catalogs = await prisma.catalog.findMany({
      include: {
        categories: {
          include: {
            subcategories: true,
          },
        },
      },
    });

    console.log('\n📊 Database Structure:');
    console.log('='.repeat(50));

    catalogs.forEach((catalog) => {
      console.log(`\n📦 CATALOG: ${catalog.name}`);
      console.log(`   ID: ${catalog.id}`);
      console.log(`   Slug: ${catalog.slug}`);

      catalog.categories.forEach((category) => {
        console.log(`\n  📂 CATEGORY: ${category.name}`);
        console.log(`     ID: ${category.id}`);
        console.log(`     Slug: ${category.slug}`);

        if (category.subcategories.length > 0) {
          category.subcategories.forEach((subcategory) => {
            console.log(`     📁 SUBCATEGORY: ${subcategory.name}`);
            console.log(`        ID: ${subcategory.id}`);
            console.log(`        Slug: ${subcategory.slug}`);
          });
        } else {
          console.log(`     ⚠️  No subcategories found`);
        }
      });
    });

    // Create a clean summary
    console.log('\n\n📋 SUMMARY FOR MAPPING:');
    console.log('='.repeat(50));

    catalogs.forEach((catalog) => {
      console.log(`\n${catalog.name.toUpperCase()}:`);
      catalog.categories.forEach((category) => {
        console.log(`  ${category.name}:`);
        category.subcategories.forEach((subcategory) => {
          console.log(`    - ${subcategory.name}`);
        });
      });
    });
  } catch (error) {
    console.error('❌ Error fetching subcategories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getSubcategories();

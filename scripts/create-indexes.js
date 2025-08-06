// MongoDB index creation script for optimizing product filters
// Run this script to create optimized indexes for better query performance

import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
dotenv.config();

// Get MongoDB connection string from environment
const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function createIndexes() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    // Indexes for Product collection
    const productCollection = db.collection('Product');

    console.log('Creating indexes for Product collection...');

    // Index for price filtering
    await productCollection.createIndex({ price: 1 });
    console.log('✓ Price index created');

    // Index for popularity/sorting
    await productCollection.createIndex({ popularityScore: -1 });
    console.log('✓ Popularity index created');

    // Index for creation date/sorting
    await productCollection.createIndex({ createdAt: -1 });
    console.log('✓ Creation date index created');

    // Index for tags filtering
    await productCollection.createIndex({ tags: 1 });
    console.log('✓ Tags index created');

    // Index for quantity (in stock filtering)
    await productCollection.createIndex({ quantity: 1 });
    console.log('✓ Quantity index created');

    // Compound index for subcategory navigation
    await productCollection.createIndex({
      'subcategory.slug': 1,
      'subcategory.category.slug': 1,
      'subcategory.category.catalog.slug': 1,
    });
    console.log('✓ Subcategory navigation index created');

    // Indexes for ProductColor collection
    const productColorCollection = db.collection('ProductColor');

    console.log('Creating indexes for ProductColor collection...');

    // Index for color filtering
    await productColorCollection.createIndex({ color: 1 });
    console.log('✓ Color index created');

    // Index for product relationship
    await productColorCollection.createIndex({ productId: 1 });
    console.log('✓ ProductColor productId index created');

    // Indexes for ProductSizeVariant collection
    const productSizeVariantCollection = db.collection('ProductSizeVariant');

    console.log('Creating indexes for ProductSizeVariant collection...');

    // Compound index for size and quantity filtering
    await productSizeVariantCollection.createIndex({
      size: 1,
      quantity: 1,
    });
    console.log('✓ Size and quantity compound index created');

    // Index for productColor relationship
    await productSizeVariantCollection.createIndex({ productColorId: 1 });
    console.log('✓ ProductSizeVariant productColorId index created');

    // Index for just quantity (for stock checks)
    await productSizeVariantCollection.createIndex({ quantity: 1 });
    console.log('✓ Quantity index created');

    console.log('\n🎉 All indexes created successfully!');
    console.log(
      '\nThese indexes will significantly improve the performance of:',
    );
    console.log('- Product filtering by price, tags, and stock status');
    console.log('- Product sorting by popularity, price, and date');
    console.log('- Size and color filtering queries');
    console.log('- Subcategory navigation');
  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await client.close();
  }
}

// Run the script
createIndexes().catch(console.error);

export { createIndexes };

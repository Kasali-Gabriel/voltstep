import fs from 'fs';

// Read the products.json file
const data = JSON.parse(fs.readFileSync('./public/products.json', 'utf-8'));

// Extract all product names
const productNames = [];

function extractNames(categories) {
  categories.forEach((category) => {
    if (category.products) {
      category.products.forEach((product) => {
        // Check for valid product name before pushing
        if (product.name) {
          productNames.push(product.name);
        }
      });
    }
    if (category.subcategories) {
      extractNames(category.subcategories); // Recursively handle subcategories
    }
  });
}

// Process each entry in products_data
data.Products_data.forEach((entry) => {
  if (entry.categories) {
    extractNames(entry.categories);
  }
});

// Check for duplicates
const nameCounts = productNames.reduce((acc, name) => {
  acc[name] = (acc[name] || 0) + 1;
  return acc;
}, {});

const duplicates = Object.entries(nameCounts).filter(([, count]) => count > 1);

if (duplicates.length > 0) {
  console.log('🔁 Duplicate product names found:\n', duplicates);
} else {
  console.log('✅ No duplicate product names found.');
}

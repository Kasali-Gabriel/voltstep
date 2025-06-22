import { MeiliSearch } from 'meilisearch';

const meiliClient = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
});

async function printKidsProducts() {
  const index = meiliClient.index('products');
  // Query for products where catalog is 'kids' and subcategory is 'activewear sets'
  const filter = 'catalog = "kids" AND subcategory = "activewear sets"';
  console.log('Meili filter:', filter);
  const result = await index.search('', {
    filter,
    limit: 10,
  });
  console.log('Sample kids products:');
  for (const hit of result.hits) {
    console.log({
      id: hit.id,
      name: hit.name,
      catalog: hit.catalog,
      category: hit.category,
      subcategory: hit.subcategory,
    });
  }
}

printKidsProducts().catch(console.error);

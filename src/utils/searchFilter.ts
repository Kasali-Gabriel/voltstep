import { ProductFilters } from './productFilters';
import { synonymMap } from './synonyms';

/**
 * Converts ProductFilters (from URL params) to a Meilisearch filter string.
 * Supports arrays, numbers, booleans, and multiple price ranges.
 */
export function productFiltersToMeiliString(
  filters: ProductFilters,
): string | undefined {
  const clauses: string[] = [];

  // Price ranges (multiple)
  if (filters.priceRanges && filters.priceRanges.length > 0) {
    const priceClauses = filters.priceRanges.map(
      ([min, max]) => `price >= ${min} AND price <= ${max}`,
    );
    if (priceClauses.length > 1) {
      clauses.push(`(${priceClauses.join(' OR ')})`);
    } else {
      clauses.push(priceClauses[0]);
    }
  } else if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    clauses.push(`price >= ${min} AND price <= ${max}`);
  }

  // Sizes (array)
  if (filters.sizes && filters.sizes.length > 0) {
    const sizeClauses = filters.sizes.map((s) => `sizes = "${s}"`);
    if (sizeClauses.length > 1) {
      clauses.push(`(${sizeClauses.join(' OR ')})`);
    } else {
      clauses.push(sizeClauses[0]);
    }
  }

  // Colors (array)
  if (filters.colors && filters.colors.length > 0) {
    const colorClauses = filters.colors.map((c) => `colors = "${c}"`);
    if (colorClauses.length > 1) {
      clauses.push(`(${colorClauses.join(' OR ')})`);
    } else {
      clauses.push(colorClauses[0]);
    }
  }

  // Tags (array)
  if (filters.tags && filters.tags.length > 0) {
    const tagClauses = filters.tags.map((t) => `tags = "${t}"`);
    if (tagClauses.length > 1) {
      clauses.push(`(${tagClauses.join(' OR ')})`);
    } else {
      clauses.push(tagClauses[0]);
    }
  }

  // Rating (number)
  if (filters.rating && filters.rating > 0) {
    clauses.push(`avgRating >= ${filters.rating}`);
  }

  // In stock (boolean)
  if (filters.inStock) {
    clauses.push(`quantity > 0`);
  }

  // Catalog/category/subcategory (string)
  if (filters.catalog) {
    clauses.push(`catalog = "${filters.catalog}"`);
  }
  if (filters.category) {
    clauses.push(`category = "${filters.category}"`);
  }
  if (filters.subcategory) {
    clauses.push(`subcategory = "${filters.subcategory}"`);
  }

  if (clauses.length === 0) return undefined;
  return clauses.join(' AND ');
}

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/['’]/g, '') // remove apostrophes
    .replace(/[^a-z0-9]+/g, ' ') // replace non-alphanum with space
    .replace(/\s+/g, ' ') // collapse spaces
    .trim();
}

function getAllSynonyms(
  map: Record<string, string[]>,
): Array<{ key: string; synonym: string }> {
  const out: Array<{ key: string; synonym: string }> = [];
  for (const key in map) {
    for (const syn of map[key]) {
      out.push({ key, synonym: normalize(syn) });
    }
    // Also add the key itself
    out.push({ key, synonym: normalize(key) });
  }
  return out;
}

/**
 * Extracts filters from a query string using the synonym map.
 * Returns { filters, query } where filters is an object: { catalog, category, subcategory }
 * Always returns canonical keys as used in your indexed data.
 */
export function extractFilters(input: string) {
  const normalizedInput = normalize(input);
  const words = normalizedInput.split(' ');
  const usedIndexes = new Set<number>();
  let catalog: string | null = null;
  let category: string | null = null;
  let subcategory: string | null = null;

  // Helper to match multi-word synonyms
  function matchSynonym(synonyms: Array<{ key: string; synonym: string }>) {
    for (let window = Math.min(4, words.length); window > 0; window--) {
      for (let i = 0; i <= words.length - window; i++) {
        if ([...Array(window).keys()].some((j) => usedIndexes.has(i + j)))
          continue;
        const phrase = words.slice(i, i + window).join(' ');
        const found = synonyms.find((s) => s.synonym === phrase);
        if (found) {
          for (let j = 0; j < window; j++) usedIndexes.add(i + j);
          return found.key;
        }
      }
    }
    return null;
  }

  // Build synonym lists
  const catalogSyns = getAllSynonyms(synonymMap.catalog);
  catalog = matchSynonym(catalogSyns);

  // Subcategory: check both catalog-specific and global, use first match
  let subcategoryKey: string | null = null;
  if (
    catalog &&
    synonymMap.subcategoryByCatalog &&
    synonymMap.subcategoryByCatalog[catalog]
  ) {
    const catSubcatSyns = getAllSynonyms(
      synonymMap.subcategoryByCatalog[catalog],
    );
    subcategoryKey = matchSynonym(catSubcatSyns);
  }
  if (!subcategoryKey) {
    const globalSubcatSyns = getAllSynonyms(synonymMap.subcategory);
    subcategoryKey = matchSynonym(globalSubcatSyns);
  }
  subcategory = subcategoryKey;

  // Category: check both catalog-specific and global, use first match (if no subcategory)
  let categoryKey: string | null = null;
  if (
    !subcategory &&
    catalog &&
    synonymMap.categoryByCatalog &&
    synonymMap.categoryByCatalog[catalog]
  ) {
    const catCatSyns = getAllSynonyms(synonymMap.categoryByCatalog[catalog]);
    categoryKey = matchSynonym(catCatSyns);
  }
  if (!subcategory && !categoryKey) {
    const globalCatSyns = getAllSynonyms(synonymMap.category);
    categoryKey = matchSynonym(globalCatSyns);
  }
  if (!subcategory) category = categoryKey;

  // Remove used words from query
  const restWords = words.filter((_, i) => !usedIndexes.has(i));

  // Only add category if subcategory is not present
  const filters: Record<string, string> = {};
  if (catalog) filters.catalog = catalog.toLowerCase();
  if (subcategory) filters.subcategory = subcategory.toLowerCase();
  else if (category) filters.category = category.toLowerCase();

  // If all words were used as filters, set query to empty string
  const queryString = restWords.length === 0 ? '' : restWords.join(' ').trim();

  return {
    filters,
    query: queryString,
  };
}

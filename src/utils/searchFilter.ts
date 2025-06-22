import { synonymMap } from './synonyms';

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
  // Catalog
  catalog = matchSynonym(catalogSyns);

  // Subcategory: prefer catalog-specific if catalog is found
  let subcatSyns: Array<{ key: string; synonym: string }> = [];
  if (
    catalog &&
    synonymMap.subcategoryByCatalog &&
    synonymMap.subcategoryByCatalog[catalog]
  ) {
    subcatSyns = getAllSynonyms(synonymMap.subcategoryByCatalog[catalog]);
  }
  // Fallback to global subcategories if not found
  if (subcatSyns.length === 0) {
    subcatSyns = getAllSynonyms(synonymMap.subcategory);
  }
  subcategory = matchSynonym(subcatSyns);

  // Category: prefer catalog-specific if catalog is found and no subcategory
  let catSyns: Array<{ key: string; synonym: string }> = [];
  if (
    !subcategory &&
    catalog &&
    synonymMap.categoryByCatalog &&
    synonymMap.categoryByCatalog[catalog]
  ) {
    catSyns = getAllSynonyms(synonymMap.categoryByCatalog[catalog]);
  }
  // Fallback to global categories if not found
  if (!subcategory && catSyns.length === 0) {
    catSyns = getAllSynonyms(synonymMap.category);
  }
  if (!subcategory) category = matchSynonym(catSyns);

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

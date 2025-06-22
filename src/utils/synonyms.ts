import rawSynonymsJson from '../data/synonyms.json';

// Type assertion to fix type error
const rawSynonyms = rawSynonymsJson as SynonymGroup[];

type SynonymGroup = {
  type: 'catalog' | 'category' | 'subcategory';
  key: string;
  synonyms: string[];
  catalog?: string;
};

type SynonymMap = Record<string, string[]>;

type CatalogScopedMap = Record<string, SynonymMap>;

function makeSynonymsMap(data: SynonymGroup[]): {
  catalog: SynonymMap;
  category: SynonymMap;
  subcategory: SynonymMap;
  subcategoryByCatalog: CatalogScopedMap;
  categoryByCatalog: CatalogScopedMap;
  allTerms: Record<string, { type: string; value: string; catalog?: string }>;
} {
  const catalog: Record<string, Set<string>> = {};
  const category: Record<string, string[]> = {};
  const subcategory: Record<string, Set<string>> = {};
  const subcategoryByCatalog: CatalogScopedMap = {};
  const categoryByCatalog: CatalogScopedMap = {};
  const allTerms: Record<
    string,
    { type: string; value: string; catalog?: string }
  > = {};

  for (const entry of data) {
    const key = entry.key.toLowerCase();
    const syns = entry.synonyms.map((s) => s.toLowerCase());
    const catalogKey = entry.catalog?.toLowerCase();

    if (entry.type === 'catalog') {
      if (!catalog[key]) catalog[key] = new Set();
      syns.forEach((s) => {
        catalog[key].add(s);
        if (!catalog[s]) catalog[s] = new Set();
        catalog[s].add(key);
      });
    } else if (entry.type === 'subcategory') {
      if (!subcategory[key]) subcategory[key] = new Set();
      syns.forEach((s) => {
        subcategory[key].add(s);
        if (!subcategory[s]) subcategory[s] = new Set();
        subcategory[s].add(key);
      });
      // Catalog-specific subcategories
      if (catalogKey) {
        if (!subcategoryByCatalog[catalogKey])
          subcategoryByCatalog[catalogKey] = {};
        if (!subcategoryByCatalog[catalogKey][key])
          subcategoryByCatalog[catalogKey][key] = [];
        subcategoryByCatalog[catalogKey][key].push(...syns, key);
      }
    } else if (entry.type === 'category') {
      category[key] = syns;
      // Catalog-specific categories
      if (catalogKey) {
        if (!categoryByCatalog[catalogKey]) categoryByCatalog[catalogKey] = {};
        categoryByCatalog[catalogKey][key] = syns;
      }
    }
  }

  // Flatten and create lookup map
  for (const [key, set] of Object.entries(catalog)) {
    set.forEach((s) => {
      allTerms[s] = { type: 'catalog', value: capitalize(key) };
    });
    allTerms[key] = { type: 'catalog', value: capitalize(key) };
  }

  for (const [key, list] of Object.entries(category)) {
    allTerms[key] = { type: 'category', value: capitalize(key) };
    list.forEach((s) => {
      allTerms[s] = { type: 'category', value: capitalize(key) };
    });
  }

  for (const [key, set] of Object.entries(subcategory)) {
    set.forEach((s) => {
      allTerms[s] = { type: 'subcategory', value: capitalize(key) };
    });
    allTerms[key] = { type: 'subcategory', value: capitalize(key) };
  }

  // Add catalog-specific subcategories and categories to allTerms
  for (const [cat, subMap] of Object.entries(subcategoryByCatalog)) {
    for (const [key, arr] of Object.entries(subMap)) {
      arr.forEach((s) => {
        allTerms[s] = {
          type: 'subcategory',
          value: capitalize(key),
          catalog: cat,
        };
      });
      allTerms[key] = {
        type: 'subcategory',
        value: capitalize(key),
        catalog: cat,
      };
    }
  }

  return {
    catalog: toArrayMap(catalog),
    category,
    subcategory: toArrayMap(subcategory),
    subcategoryByCatalog,
    categoryByCatalog,
    allTerms,
  };
}

function toArrayMap(input: Record<string, Set<string>>): SynonymMap {
  const out: SynonymMap = {};
  for (const [key, set] of Object.entries(input)) {
    out[key] = [...set];
  }
  return out;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const {
  catalog,
  category,
  subcategory,
  subcategoryByCatalog,
  categoryByCatalog,
} = makeSynonymsMap(rawSynonyms);

export const synonymMap = {
  catalog,
  category,
  subcategory,
  subcategoryByCatalog,
  categoryByCatalog,
};

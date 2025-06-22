import synonym from '@/data/synonyms.json';
// utils/suggestionGenerator.js
import fs from 'fs';

interface SynonymMap {
    [canonical: string]: string[];
}

interface Product {
    catalog: string;
    category: string;
    subcategory: string;
    name: string;
}

function normalizeTerm(term: string): string {
    term = term.toLowerCase().trim();
    for (const [canonical, list] of Object.entries(synonym as SynonymMap)) {
        if (list.includes(term) || canonical === term) return canonical;
    }
    return term;
}

function generateSuggestions(products: Product[]) {
  const suggestions = new Set();

  products.forEach((p) => {
    const catalog = normalizeTerm(p.catalog);
    const category = normalizeTerm(p.category);
    const subcategory = normalizeTerm(p.subcategory);
    const name = p.name.toLowerCase();

    suggestions.add(`${catalog} ${category}`);
    suggestions.add(`${catalog} ${subcategory}`);
    suggestions.add(`${category} ${subcategory}`);
    suggestions.add(`${subcategory}`);
    suggestions.add(`${name}`);
  });

  return Array.from(suggestions);
}

export function writeSuggestionsToFile(
  products: Product[],
  filePath : string,
) {
  const suggestions = generateSuggestions(products);
  fs.writeFileSync(filePath, JSON.stringify(suggestions, null, 2));
}

import { synonymMap } from './synonyms';

export function parseQuery(input: string) {
  const words = input.toLowerCase().split(/\s+/);

  let catalog: string | null = null;
  let category: string | null = null;
  let subcategory: string | null = null;
  const restWords: string[] = [];

  for (const word of words) {
    let match: { type: string; value: string } | undefined = undefined;
    if (synonymMap.catalog[word]) {
      match = { type: 'catalog', value: synonymMap.catalog[word][0] };
    } else if (synonymMap.category[word]) {
      match = { type: 'category', value: synonymMap.category[word][0] };
    } else if (synonymMap.subcategory[word]) {
      match = { type: 'subcategory', value: synonymMap.subcategory[word][0] };
    }
    if (match) {
      if (match.type === 'catalog' && !catalog) {
        catalog = match.value;
      } else if (match.type === 'category' && !category) {
        category = match.value;
      } else if (match.type === 'subcategory' && !subcategory) {
        subcategory = match.value;
      }
    } else {
      restWords.push(word);
    }
  }

  const filters = [];
  if (catalog) filters.push(`catalog = "${catalog.toLowerCase()}"`);
  if (subcategory) {
    filters.push(`subcategory = "${subcategory.toLowerCase()}"`);
  } else if (category) {
    filters.push(`category = "${category.toLowerCase()}"`);
  }

  return {
    query: restWords.join(' ') || '',
    filter: filters.length ? filters.join(' AND ') : undefined,
  };
}

// Helper to build the subcategory string
export const getSubcat = (
  slug: string[],
  catalogName?: string,
  subcat?: string,
) => {
  if (!slug?.length && !catalogName) return '';

  // Determine base catalog name
  const base = catalogName || slug[0] || '';
  let catalog = base.charAt(0).toUpperCase() + base.slice(1);

  if (base.toLowerCase() === 'men') catalog = "Men's";
  if (base.toLowerCase() === 'women') catalog = "Women's";
  if (base.toLowerCase() === 'kids') catalog = "Kids'";

  // Helper to format subcategory label
  const formatSubcat = (label?: string) => {
    if (!label) return '';
    return label.toLowerCase() === 't-shirts'
      ? label
      : label.replace(/-/g, ' ');
  };

  if (catalogName && subcat) return `${catalog} ${formatSubcat(subcat)}`;
  if (subcat && slug.length < 3) return `${catalog} ${formatSubcat(subcat)}`;
  if (slug.length === 1) return `Shop ${catalog}`;
  if (slug.length === 2) return `${catalog} ${formatSubcat(slug[1])}`;
  if (slug.length === 3) return `${catalog} ${formatSubcat(slug[2])}`;

  // Default fallback for longer slugs or unhandled cases
  return catalog;
};

// singularize subcat by removing trailing "s"
export const singularize = (subcat: string) => {
  const subcatExceptions = [
    'shoes',
    'socks',
    'sports',
    'gloves',
    'Trainers',
    'ProCourt Kicks',
    'Sneakers',
    'Slides',
    "Women's",
    "Men's",
    "Kids'",
    'Sweatpants',
    'Leggings',
    'Shorts',
    'Joggers',
  ];

  if (!subcat) return '';

  // Check for multi-word exceptions first
  if (
    subcatExceptions.some((ex) => ex.toLowerCase() === subcat.toLowerCase())
  ) {
    return subcat;
  }

  // Split and singularize each word, but avoid singularizing words ending with 'ss' (e.g., 'dress')
  return subcat
    .split(' ')
    .map((word) => {
      const lowerWord = word.toLowerCase();
      if (
        subcatExceptions.some((ex) => ex.toLowerCase() === word.toLowerCase())
      ) {
        return word;
      }
      // Remove trailing 's' if not in exceptions, word length > 3, and not ending with 'ss'
      if (
        word.length > 3 &&
        word.endsWith('s') &&
        !word.endsWith('ss') &&
        !subcatExceptions.some((ex) => ex.toLowerCase() === lowerWord)
      ) {
        return word.slice(0, -1);
      }
      return word;
    })
    .join(' ');
};

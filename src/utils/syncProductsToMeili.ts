import rawSynonyms from '../data/synonyms.json';
import { meiliClient } from '../lib/meiliClient';
import prisma from '../lib/prismaDb';

export async function syncProducts() {
  const products = await prisma.product.findMany({
    include: {
      subcategory: {
        include: {
          category: {
            include: {
              catalog: true,
            },
          },
        },
      },
      reviews: true,
    },
  });

  function makeSynonymsBidirectional(
    oneWay: Record<string, string[]>,
  ): Record<string, string[]> {
    const twoWay: Record<string, Set<string>> = {};

    for (const [key, values] of Object.entries(oneWay)) {
      if (!twoWay[key]) twoWay[key] = new Set();

      for (const val of values) {
        twoWay[key].add(val);

        if (!twoWay[val]) twoWay[val] = new Set();
        twoWay[val].add(key);
      }
    }

    const final: Record<string, string[]> = {};
    for (const [key, set] of Object.entries(twoWay)) {
      final[key] = Array.from(set);
    }

    return final;
  }

  // Transform rawSynonyms (array) into Record<string, string[]>
  const synonymMap: Record<string, string[]> = {};
  for (const entry of rawSynonyms) {
    if (entry.key && Array.isArray(entry.synonyms)) {
      // Add the key itself to the synonyms for bidirectionality
      synonymMap[entry.key] = Array.from(
        new Set([entry.key, ...entry.synonyms]),
      );
    }
  }

  const synonyms = makeSynonymsBidirectional(synonymMap);

  const formatted = products.map((p) => {
    const avgRating =
      p.reviews?.length > 0
        ? Number(
            (
              p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length
            ).toFixed(1),
          )
        : null;

    const catalog = (
      p.subcategory?.category?.catalog?.name || ''
    ).toLowerCase();
    const category = (p.subcategory?.category?.name || '').toLowerCase();
    const subcategory = (p.subcategory?.name || '').toLowerCase();
    const catSubcat =
      `${catalog}${catalog === 'kids' ? "'" : "'s"} ${subcategory}`.trim();

    return {
      id: p.id,
      name: p.name,
      image: p.images?.[0] || '',
      slug: p.slug,
      price: p.price,
      description: p.description,
      subcategory,
      category,
      catalog,
      catSubcat,
      avgRating,
      availableColors:
        Array.isArray(p.colors) && p.colors.length === 1
          ? p.colors[0]
          : p.colors.length || 0,
      //TODO dateAdded: p.createdAt
      //   ? new Date(p.createdAt).toISOString().slice(0, 10)
      //   : null,
    };
  });

  const index = meiliClient.index('products');

  await index.updateSettings({
    searchableAttributes: ['name', 'subcategory', 'category', 'catalog'],
    filterableAttributes: ['catalog', 'category', 'subcategory'],
    sortableAttributes: ['price', 'avgRating'],
    synonyms,
    prefixSearch: 'indexingTime',
    typoTolerance: {
      enabled: true,
      minWordSizeForTypos: {
        oneTypo: 3,
        twoTypos: 6,
      },
    },
  });

  await index.addDocuments(formatted);

  // Write search suggestions to searchSuggestions.json
  // const suggestionsPath = path.join(
  //   __dirname,
  //   '../data/searchSuggestions.json',
  // );
  // writeSuggestionsToFile(
  //   products.map((p) => ({
  //     catalog: p.subcategory?.category?.catalog?.name || '',
  //     category: p.subcategory?.category?.name || '',
  //     subcategory: p.subcategory?.name || '',
  //     name: p.name,
  //   })),
  //   suggestionsPath,
  // );
}

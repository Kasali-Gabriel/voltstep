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
      price: typeof p.price === 'number' ? p.price : Number(p.price) || 0,
      description: p.description,
      subcategory,
      category,
      catalog,
      catSubcat,
      avgRating,
      quantity: p.quantity || 0,
      tags: p.tags || [],
      popularity:
        typeof p.popularityScore === 'number'
          ? p.popularityScore
          : Number(p.popularityScore) || 0,
      colors: p.colors || [],
      sizes: p.sizes || [],
      dateAdded: p.createdAt
        ? new Date(p.createdAt).toISOString()
        : new Date().toISOString(),
      availableColors:
        Array.isArray(p.colors) && p.colors.length === 1
          ? p.colors[0]
          : p.colors.length || 0,
    };
  });

  const index = meiliClient.index('products');

  await index.updateSettings({
    searchableAttributes: [
      'name',
      'subcategory',
      'category',
      'catalog',
      'colors',
    ],
    filterableAttributes: [
      'catalog',
      'category',
      'subcategory',
      'colors',
      'sizes',
      'price',
      'avgRating',
      'tags',
      'quantity',
    ],
    sortableAttributes: ['price', 'popularity', 'dateAdded'],
    synonyms,
    prefixSearch: 'indexingTime',
    typoTolerance: {
      enabled: true,
      minWordSizeForTypos: {
        oneTypo: 3,
        twoTypos: 6,
      },
    },
    rankingRules: [
      'sort',
      'exactness',
      'words',
      'proximity',
      'typo',
      'attribute',
    ],
  });

  await index.addDocuments(formatted);
}

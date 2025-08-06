export type ProductFilters = {
  catalogSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  priceRanges?: [number, number][];
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  rating?: number;
  inStock?: boolean;
};

export function parseCatalogFilters(
  searchParams: URLSearchParams,
): ProductFilters {
  const filters: ProductFilters = {};
  if (searchParams.get('catalog'))
    filters.catalogSlug = searchParams.get('catalog')!;
  if (searchParams.get('category'))
    filters.categorySlug = searchParams.get('category')!;
  if (searchParams.get('subcategory'))
    filters.subcategorySlug = searchParams.get('subcategory')!;
  if (searchParams.get('minPrice') && searchParams.get('maxPrice')) {
    filters.minPrice = Number(searchParams.get('minPrice'));
    filters.maxPrice = Number(searchParams.get('maxPrice'));
  }
  const priceRangesParam = searchParams.get('priceRanges');
  if (priceRangesParam) {
    filters.priceRanges = priceRangesParam.split(',').map((r: string) => {
      const [min, max] = r.split('-').map(Number);
      return [min, max];
    });
  }
  const sizesParam = searchParams.get('sizes');
  if (sizesParam) filters.sizes = sizesParam.split(',');
  const colorsParam = searchParams.get('colors');
  if (colorsParam) filters.colors = colorsParam.split(',');
  const tagsParam = searchParams.get('tags');
  if (tagsParam) filters.tags = tagsParam.split(',');
  if (searchParams.get('rating'))
    filters.rating = Number(searchParams.get('rating'));
  if (searchParams.get('inStock') === 'true') filters.inStock = true;
  return filters;
}

export function getOrderBy(sort?: string) {
  switch (sort) {
    case 'price-low-high':
      return { price: 'asc' as const };
    case 'price-high-low':
      return { price: 'desc' as const };
    case 'newest':
      return { createdAt: 'desc' as const };
    case 'popular':
      return { popularityScore: 'desc' as const };
    default:
      return undefined;
  }
}

// --- Helper functions for building Prisma where clause ---
export function buildCatalogWhere(filters: ProductFilters) {
  // Returns the most specific where clause for catalog/category/subcategory
  if (filters.subcategorySlug && filters.categorySlug && filters.catalogSlug) {
    return {
      subcategory: {
        slug: filters.subcategorySlug,
        category: {
          slug: filters.categorySlug,
          catalog: {
            slug: filters.catalogSlug,
          },
        },
      },
    };
  }
  if (filters.categorySlug && filters.catalogSlug) {
    return {
      subcategory: {
        category: {
          slug: filters.categorySlug,
          catalog: {
            slug: filters.catalogSlug,
          },
        },
      },
    };
  }
  if (filters.catalogSlug) {
    return {
      subcategory: {
        category: {
          catalog: {
            slug: filters.catalogSlug,
          },
        },
      },
    };
  }
  return {};
}

export function buildFiltersWhere(filters: ProductFilters) {
  const where: Record<string, unknown> = {};
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    where['price'] = { gte: filters.minPrice, lte: filters.maxPrice };
  }

  if (filters.priceRanges && filters.priceRanges.length > 0) {
    where['OR'] = filters.priceRanges.map(([min, max]) => ({
      price: { gte: min, lte: max },
    }));
  }

  // Ultra-fast filtering approach - minimize nested queries
  if (filters.sizes && filters.sizes.length > 0) {
    // Simple size filtering - just check if any variant has the size with stock
    where['colors'] = {
      some: {
        variants: {
          some: {
            size: { in: filters.sizes },
            quantity: { gt: 0 },
          },
        },
      },
    };
  }

  // If we also have color filters, add them as an additional constraint
  if (filters.colors && filters.colors.length > 0) {
    if (where['colors']) {
      // Both size and color - rebuild the entire condition properly
      where['colors'] = {
        some: {
          color: { in: filters.colors },
          variants: {
            some: {
              size: { in: filters.sizes || [] },
              quantity: { gt: 0 },
            },
          },
        },
      };
    } else {
      // Only color filter
      where['colors'] = {
        some: {
          color: { in: filters.colors },
          variants: {
            some: {
              quantity: { gt: 0 },
            },
          },
        },
      };
    }
  }

  if (filters.tags && filters.tags.length > 0) {
    where['tags'] = { hasSome: filters.tags };
  }

  if (filters.inStock) {
    where['quantity'] = { gt: 0 };
  }

  return where;
}

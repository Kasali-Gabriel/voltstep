import prisma from '@/lib/prismaDb';
import {
  buildCatalogWhere,
  buildFiltersWhere,
  getOrderBy,
  ProductFilters,
} from '@/utils/parseCatalogFilters';

// --- Shared Selects ---
const baseProductFields = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  quantity: true,
  images: true,
  sizes: true,
  colors: true,
  tags: true,
  createdAt: true,
  popularityScore: true,
  lastScoreUpdate: true,
};

const subcategorySelect = {
  id: true,
  name: true,
  slug: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
      catalog: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
};

const productPreviewSelect = {
  ...baseProductFields,
  reviews: { select: { id: true, rating: true } },
  subcategory: { select: subcategorySelect },
};

const productDetailSelect = {
  ...baseProductFields,
  reviews: {
    select: {
      id: true,
      rating: true,
      title: true,
      details: true,
      date: true,
      verified: true,
      reviewer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      },
    },
  },
  subcategory: { select: subcategorySelect },
};

// --- Catalog Tree ---
export const fetchCatalogData = () =>
  prisma.catalog.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
          catalogId: true,
          subcategories: {
            select: { id: true, name: true, slug: true, categoryId: true },
          },
        },
      },
    },
  });

// --- Product Fetchers ---

export const fetchProduct = (slug: string) =>
  prisma.product.findUnique({ where: { slug }, select: productDetailSelect });

export async function fetchProducts(
  filters: ProductFilters,
  limit?: number,
  offset?: number,
  sort?: string,
) {
  // Compose where clause using helpers
  const baseWhere = {
    ...buildCatalogWhere(filters),
    ...buildFiltersWhere(filters),
  };

  // Determine orderBy
  const orderBy = getOrderBy(sort);

  let ratedProductIds: string[] | null = null;

  // If rating filter is applied, fetch matching product IDs first
  if (filters.rating && filters.rating > 0) {
    const ratedProducts = await prisma.review.groupBy({
      by: ['productId'],
      _avg: {
        rating: true,
      },
      having: {
        rating: {
          _avg: {
            gte: filters.rating,
          },
        },
      },
    });

    ratedProductIds = ratedProducts.map((r) => r.productId);

    // No matches, early return
    if (ratedProductIds.length === 0) {
      return {
        products: [],
        unfilteredProducts: [],
        totalCount: 0,
        hasMore: false,
      };
    }
  }

  // Apply rating-based filtering to main where clause
  const finalWhere = {
    ...(ratedProductIds ? { id: { in: ratedProductIds } } : {}),
    ...baseWhere,
  };

  // Fetch filtered products
  const productsPromise = prisma.product.findMany({
    where: finalWhere,
    select: productPreviewSelect,
    take: limit,
    skip: offset,
    ...(orderBy ? { orderBy } : {}),
  });

  // Fetch all unfiltered products for UI filter options
  const unfilteredProductsPromise = prisma.product.findMany({
    where: buildCatalogWhere(filters), // No extra filters (e.g. sizes/colors)
    select: productPreviewSelect,
  });

  // Get total count of filtered products
  const totalCountPromise = prisma.product.count({
    where: finalWhere,
  });

  // Await all in parallel
  const [products, unfilteredProducts, totalCount] = await Promise.all([
    productsPromise,
    unfilteredProductsPromise,
    totalCountPromise,
  ]);

  // Compute hasMore
  const hasMore =
    typeof offset === 'number' && typeof limit === 'number'
      ? offset + products.length < totalCount
      : products.length === limit;

  return {
    products,
    unfilteredProducts,
    totalCount,
    hasMore,
  };
}

export const fetchAllProducts = (
  filters: ProductFilters = {},
  limit?: number,
  offset?: number,
  sort?: string,
) => fetchProducts(filters, limit, offset, sort);

export const fetchCatalogProducts = (
  filters: ProductFilters,
  limit?: number,
  offset?: number,
  sort?: string,
) => fetchProducts(filters, limit, offset, sort);

export const fetchCategoryProducts = (
  filters: ProductFilters,
  limit?: number,
  offset?: number,
  sort?: string,
) => fetchProducts(filters, limit, offset, sort);

export const fetchSubCategoryProducts = (
  filters: ProductFilters,
  limit?: number,
  offset?: number,
  sort?: string,
) => fetchProducts(filters, limit, offset, sort);

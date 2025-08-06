import prisma from '@/lib/prismaDb';
import {
  buildCatalogWhere,
  buildFiltersWhere,
  getOrderBy,
  ProductFilters,
} from '@/utils/Product/parseCatalogFilters';
import { Prisma } from '@prisma/client';

// --- Shared Selects ---
const baseProductFields = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  quantity: true,
  images: true,
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
  colors: {
    select: {
      id: true,
      color: true,
      variants: {
        select: {
          id: true,
          size: true,
          quantity: true,
        },
      },
    },
  },
  reviews: { select: { id: true, rating: true } },
  subcategory: { select: subcategorySelect },
};

const productDetailSelect = {
  ...baseProductFields,
  colors: {
    select: {
      id: true,
      color: true,
      variants: {
        select: {
          id: true,
          size: true,
          quantity: true,
        },
      },
    },
  },
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

// single product fetch for product detail page
export const fetchProduct = (slug: string) =>
  prisma.product.findUnique({ where: { slug }, select: productDetailSelect });

// product list fetch
export async function fetchProducts(
  filters: ProductFilters,
  limit?: number,
  offset?: number,
  sort?: string,
  unfiltered?: boolean,
) {
  // Compose where clause using helpers
  const baseWhere = {
    ...buildCatalogWhere(filters),
    ...buildFiltersWhere(filters),
  };

  // Determine orderBy
  const orderBy = getOrderBy(sort ?? 'popular');

  // Helper to fetch products and count
  async function getProducts(where: Prisma.ProductWhereInput) {
    if (unfiltered) {
      const products = await prisma.product.findMany({
        where: buildCatalogWhere(filters),
        select: productPreviewSelect,
        take: 1000, // Reasonable limit for unfiltered queries
      });

      return {
        products,
        totalCount: products.length,
        hasMore: false,
      };
    } else {
      const productsPromise = prisma.product.findMany({
        where,
        select: productPreviewSelect,
        take: limit,
        skip: offset,
        ...(orderBy ? { orderBy } : {}),
      });

      const totalCountPromise = prisma.product.count({ where });

      const [products, totalCount] = await Promise.all([
        productsPromise,
        totalCountPromise,
      ]);

      const hasMore =
        typeof offset === 'number' && typeof limit === 'number'
          ? offset + products.length < totalCount
          : products.length === limit;

      return { products, totalCount, hasMore };
    }
  }

  // If rating filter is applied, fetch matching product IDs first
  if (filters.rating && filters.rating > 0) {
    const ratedProducts = await prisma.review.groupBy({
      by: ['productId'],
      _avg: { rating: true },
      having: {
        rating: { _avg: { gte: filters.rating } },
      },
    });

    const ratedProductIds = ratedProducts.map((r) => r.productId);

    if (ratedProductIds.length === 0) {
      return { products: [], totalCount: 0, hasMore: false };
    }

    const finalWhere = { id: { in: ratedProductIds }, ...baseWhere };

    return getProducts(finalWhere);
  }

  // If no rating filter is applied, fetch products normally
  const finalWhere = { ...baseWhere };
  return getProducts(finalWhere);
}

import prisma from '@/lib/prismaDb';

export async function fetchCatalogData() {
  return prisma.catalog.findMany({
    include: {
      categories: {
        include: {
          subcategories: true,
        },
      },
    },
    cacheStrategy: {
      ttl: 600,
      swr: 3600,
    },
  });
}

export async function fetchAllProducts() {
  return prisma.product.findMany({
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
}

export async function fetchProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      reviews: {
        include: {
          reviewer: true,
        },
      },
    },
  });
}

export async function fetchCatalogProducts(catalogSlug: string) {
  return prisma.product.findMany({
    where: {
      subcategory: {
        category: {
          catalog: {
            slug: catalogSlug,
          },
        },
      },
    },
    include: {
      subcategory: {
        include: {
          category: true,
        },
      },
      reviews: true,
    },
  });
}

export async function fetchCategoryProducts(
  catalogSlug: string,
  categorySlug: string,
) {
  return prisma.product.findMany({
    where: {
      subcategory: {
        category: {
          slug: categorySlug,
          catalog: {
            slug: catalogSlug,
          },
        },
      },
    },
    include: {
      subcategory: {
        include: {
          category: true,
        },
      },
      reviews: true,
    },
  });
}

export async function fetchSubCategoryProducts(
  catalogSlug: string,
  categorySlug: string,
  subcategorySlug: string,
) {
  return prisma.product.findMany({
    where: {
      subcategory: {
        slug: subcategorySlug,
        category: {
          slug: categorySlug,
          catalog: {
            slug: catalogSlug,
          },
        },
      },
    },
    include: {
      subcategory: {
        include: {
          category: true,
        },
      },
      reviews: true,
    },
  });
}

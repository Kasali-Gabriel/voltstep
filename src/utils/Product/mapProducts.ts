import { Product } from '@/types/product';
import { SearchedProduct } from '@/types/search';

// Helper to map Product to SearchedProduct shape
export const mapProductToSearchedProduct = (
  product: Product,
): SearchedProduct => ({
  id: product.id,
  name: product.name,
  image: product.images[0] || '/placeholder.png',
  slug: product.slug,
  price: product.price,
  description: product.description,
  subcategory: product.subcategory?.name || '',
  category: product.subcategory?.category?.name || '',
  catalog: product.subcategory?.category?.catalog?.name || '',
  avgRating:
    product.reviews && product.reviews.length > 0
      ? Number(
          (
            product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
            product.reviews.length
          ).toFixed(1),
        )
      : null,
  availableColors:
    Array.isArray(product.colors) && product.colors.length === 1
      ? product.colors[0]
      : product.colors?.length || 0,
  colors: product.colors || [],
  sizes: product.sizes || [],
  dateAdded: product.createdAt || '',
  popularity: product.popularityScore ?? 0,
  tags: product.tags || [],
  quantity: product.quantity || 0,
});

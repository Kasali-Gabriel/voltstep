import { Product, ProductColor, ProductSizeVariant } from '@/types/product';
import { SearchedProduct } from '@/types/search';

// Helper to map Product to SearchedProduct shape (flatten colors/variants)
export const mapProductToSearchedProduct = (
  product: Product,
): SearchedProduct => {
  // Flatten all variants with color/size/quantity
  const variants: { color: string; size: string; quantity: number }[] = [];

  const colors: string[] = [];

  if (product.colors && Array.isArray(product.colors)) {
    for (const colorObj of product.colors as ProductColor[]) {
      if (!colors.includes(colorObj.color)) colors.push(colorObj.color);
      if (colorObj.variants && Array.isArray(colorObj.variants)) {
        for (const variant of colorObj.variants as ProductSizeVariant[]) {
          variants.push({
            color: colorObj.color,
            size: variant.size,
            quantity: variant.quantity,
          });
        }
      }
    }
  }

  const availableColors = colors.length === 1 ? colors[0] : colors.length;

  return {
    id: product.id,
    name: product.name,
    image: product.images[0] || '',
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
    availableColors,
    colors,
    variants,
    dateAdded: product.createdAt || '',
    popularity: product.popularityScore ?? 0,
    tags: product.tags || [],
    quantity: product.quantity || 0,
  };
};

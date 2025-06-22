'use client';

import ProductsList from '@/components/Product/ProductsList';
import axios from '@/lib/axios';
import { Product } from '@/types/product';
import { use, useEffect, useState } from 'react';

interface ProductsPageProps {
  params: Promise<{ slug?: string[] }>;
}

const fetchProductsBySlug = async (
  slug?: string[],
): Promise<Product[] | null> => {
  let url = '/api/products';

  if (Array.isArray(slug)) {
    if (slug.length === 1) {
      url = `/api/products/catalog?catalog=${slug[0]}`;
    } else if (slug.length === 2) {
      url = `/api/products/catalog/categories?catalog=${slug[0]}&category=${slug[1]}`;
    } else if (slug.length === 3) {
      url = `/api/products/catalog/categories/subcategories?catalog=${slug[0]}&category=${slug[1]}&subcategory=${slug[2]}`;
    } else {
      return null;
    }
  }

  try {
    const { data } = await axios.get(url);
    return Array.isArray(data)
      ? data.map((product: Product) => ({
          ...product,
          reviews: product.reviews ?? [],
        }))
      : [];
  } catch {
    return [];
  }
};

const Page = (props: ProductsPageProps) => {
  const { slug } = use(props.params);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchProductsBySlug(slug).then((result) => {
      setProducts(result);
      setLoading(false);
    });
  }, [slug]);

  return (
    <ProductsList products={products || []} slug={slug} loading={loading} />
  );
};

export default Page;

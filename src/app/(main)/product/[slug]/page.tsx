import ProductClient from '@/components/Product/ProductClient';
import ProductPageSkeleton from '@/components/Skeletons/ProductPageSkeleton';
import { fetchData } from '@/lib/fetch';
import { Product } from '@/types/product';
import { Review } from '@/types/review';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = await fetchData<Product>(`/api/product/${slug}`);

  if (!product) return notFound();

  const reviews =
    (await fetchData<Review[]>(`/api/review?productId=${product.id}`)) ?? [];

  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductClient product={product} reviews={reviews} />
    </Suspense>
  );
}

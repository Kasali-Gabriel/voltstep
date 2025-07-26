import ProductClient from '@/components/Product/ProductClient';
import ProductPageSkeleton from '@/components/Skeletons/ProductPageSkeleton';
import { fetchData } from '@/lib/fetch';
import { Product } from '@/types/product';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await fetchData<Product>(`/api/product/${slug}`, {
    revalidate: 3600,
  });


  if (!product) return notFound();

  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductClient product={product} />
    </Suspense>
  );
}

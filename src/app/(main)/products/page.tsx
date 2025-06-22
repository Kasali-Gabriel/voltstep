'use client';

import ProductsList from '@/components/Product/ProductsList';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('q');
  const query = queryParam || '';

  return <ProductsList query={query} />;
};

export default Page;

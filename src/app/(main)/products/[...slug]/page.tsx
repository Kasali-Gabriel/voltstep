'use client';

import ProductsList from '@/components/ProductList/ProductsList';
import { useCatalogPagination } from '@/hooks/useCatalogPagination';
import { useSortProducts } from '@/hooks/useSortProducts';
import { parseFiltersFromURL } from '@/utils/productFilters';
import { useSearchParams } from 'next/navigation';
import { use, useMemo } from 'react';

interface ProductsPageProps {
  params: Promise<{ slug?: string[] }>;
}

const Page = (props: ProductsPageProps) => {
  const searchParams = useSearchParams();

  const { slug } = use(props.params);

  const { currentSort } = useSortProducts();

  const filters = useMemo(
    () => parseFiltersFromURL(searchParams),
    [searchParams],
  );

  const {
    products,
    loading,
    hasMore,
    loadMore,
    totalCount,
    unfilteredProducts,
  } = useCatalogPagination({
    slug,
    sort: currentSort,
    filters,
  });

  return (
    <div>
      <ProductsList
        products={products}
        unfilteredProducts={unfilteredProducts}
        slug={slug}
        loading={loading}
        hasMore={hasMore}
        loadMore={loadMore}
        totalCount={totalCount}
      />
    </div>
  );
};

export default Page;

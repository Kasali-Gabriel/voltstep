'use client';

import ProductsList from '@/components/ProductList/ProductsList';
import { useSearch } from '@/hooks/search/useSearch';
import { useCatalogPagination } from '@/hooks/useCatalogPagination';
import { useSortProducts } from '@/hooks/useSortProducts';
import { parseFiltersFromURL } from '@/utils/productFilters';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const Page = () => {
  const searchParams = useSearchParams();

  const query = useMemo(() => searchParams.get('q') || '', [searchParams]);

  const filters = useMemo(
    () => parseFiltersFromURL(searchParams),
    [searchParams],
  );

  const slug = useMemo(() => [], []);

  const { currentSort: rawSort } = useSortProducts(!!query);
  const currentSort = useMemo(() => rawSort, [rawSort]);

  const {
    products,
    loading,
    hasMore,
    totalCount,
    loadMore,
    unfilteredProducts,
  } = useCatalogPagination({
    slug,
    sort: currentSort,
    filters,
  });

  const search = useSearch({ query, sort: currentSort, filters });

  const isSearch = !!query;

  return (
    <div>
      <ProductsList
        query={query}
        slug={slug}
        products={isSearch ? [] : products}
        unfilteredProducts={isSearch ? [] : unfilteredProducts}
        searchResults={isSearch ? search.results : []}
        unfilteredSearch={isSearch ? search.unfilteredResults : []}
        loading={isSearch ? search.loading : loading}
        hasMore={isSearch ? search.hasMore : hasMore}
        totalCount={isSearch ? search.totalCount : totalCount}
        loadMore={isSearch ? search.loadMoreResults : loadMore}
      />
    </div>
  );
};

export default Page;

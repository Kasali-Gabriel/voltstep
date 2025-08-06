import ProductsList from '@/components/ProductList/ProductsList';
import { fetchInitialProducts } from '@/utils/Product/fetchData';
import { parseFiltersFromURL } from '@/utils/Product/productFilters';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParamsObj = await searchParams;
  const query = Array.isArray(searchParamsObj.q)
    ? searchParamsObj.q[0] || ''
    : searchParamsObj.q || '';

  const filters = parseFiltersFromURL(
    new URLSearchParams(
      Object.entries(searchParamsObj).map(([k, v]) => [
        k,
        Array.isArray(v) ? v[0] : v || '',
      ]),
    ),
  ) as Record<string, string>;

  const slug: string[] = [];

  const { initialProducts, initialTotalCount, initialHasMore } =
    await fetchInitialProducts({ query, slug });

  return (
    <ProductsList
      query={query}
      filters={filters}
      slug={slug}
      initialProducts={initialProducts}
      initialTotalCount={initialTotalCount}
      initialHasMore={initialHasMore}
    />
  );
}

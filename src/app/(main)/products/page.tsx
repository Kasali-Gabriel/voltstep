import ProductsList from '@/components/ProductList/ProductsList';
import { fetchInitialProducts } from '@/utils/Product/fetchData';
import { parseFiltersFromURL } from '@/utils/Product/productFilters';

type ProductsPageProps = {
  searchParams:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
    return typeof (value as Promise<T>).then === 'function';
  }

  const resolvedParams = isPromise(searchParams)
    ? await searchParams
    : searchParams;

  const params = resolvedParams as Record<
    string,
    string | string[] | undefined
  >;
  const query = typeof params.q === 'string' ? params.q : '';

  const filters = parseFiltersFromURL(
    new URLSearchParams(
      Object.entries(resolvedParams).map(([key, value]) => [
        key,
        Array.isArray(value) ? value[0] : (value ?? ''),
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

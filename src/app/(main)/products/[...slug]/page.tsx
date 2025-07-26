import ProductsList from '@/components/ProductList/ProductsList';
import { fetchInitialProducts } from '@/utils/Product/fetchData';
import { parseFiltersFromURL } from '@/utils/Product/productFilters';

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ slug?: string[] }>;
}) {
  const [searchParams, params] = await Promise.all([
    props.searchParams,
    props.params,
  ]);

  const slug = params.slug || [];

  const filters = parseFiltersFromURL(
    new URLSearchParams(
      Object.entries(searchParams).map(([k, v]) => [
        k,
        Array.isArray(v) ? v[0] : v || '',
      ]),
    ),
  ) as Record<string, string>;

  const { initialProducts, initialTotalCount, initialHasMore } =
    await fetchInitialProducts({ slug });

  return (
    <div>
      <ProductsList
        filters={filters}
        slug={slug}
        initialProducts={initialProducts}
        initialTotalCount={initialTotalCount}
        initialHasMore={initialHasMore}
      />
    </div>
  );
}

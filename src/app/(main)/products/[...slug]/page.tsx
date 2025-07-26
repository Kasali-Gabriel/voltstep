import ProductsList from '@/components/ProductList/ProductsList';
import { fetchInitialProducts } from '@/utils/Product/fetchData';
import { parseFiltersFromURL } from '@/utils/Product/productFilters';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const searchParamsObj = await searchParams;

  const filters = parseFiltersFromURL(
    new URLSearchParams(
      Object.entries(searchParamsObj).map(([k, v]) => [
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

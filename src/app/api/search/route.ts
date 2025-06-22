import { meiliClient } from '@/lib/meiliClient';
import { extractFilters } from '@/utils/searchFilter';

function filtersToMeiliString(
  filters: Record<string, string>,
): string | undefined {
  const entries = Object.entries(filters);

  if (entries.length === 0) return undefined;
  const filterString = entries.map(([k, v]) => `${k} = \"${v}\"`).join(' AND ');
  console.log('Meili filter:', filterString);
  return filterString;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const param = searchParams.get('q') || '';

  const { query, filters } = extractFilters(param);
  const filterString = filtersToMeiliString(filters);

  const results = await meiliClient
    .index('products')
    .search(query, { filter: filterString, limit: 200 });

  return Response.json(results);
}

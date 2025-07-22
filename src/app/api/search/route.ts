import { meiliClient } from '@/lib/meiliClient';
import { parseFiltersFromURL } from '@/utils/productFilters';
import {
  extractFilters,
  productFiltersToMeiliString,
} from '@/utils/searchFilter';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const param = searchParams.get('q') || '';
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 18;
  const sort = searchParams.get('sort') || undefined;

  // Extract filters from query string (synonym-based)
  const { query, filters: queryFilters } = extractFilters(param);
  
  // Extract filters from URL params (UI filters)
  const urlFilters = parseFiltersFromURL(searchParams);

  // Merge filters: URL/UI filters take precedence, but also include query filters if not present
  const mergedFilters = {
    ...queryFilters,
    ...urlFilters,
  };

  // Build Meili filter string
  const filterString = productFiltersToMeiliString(mergedFilters);

  // Meili sort
  let meiliSort: string[] | undefined = undefined;
  switch (sort) {
    case 'price-low-high':
      meiliSort = ['price:asc'];
      break;
    case 'price-high-low':
      meiliSort = ['price:desc'];
      break;
    case 'newest':
      meiliSort = ['dateAdded:desc'];
      break;
    case 'popular':
      meiliSort = ['popularity:desc'];
      break;
    case 'relevance':
    default:
      meiliSort = undefined;
  }

  const results = await meiliClient
    .index('products')
    .search(query, { filter: filterString, limit, offset, sort: meiliSort });

  const totalCount = results.estimatedTotalHits ?? results.hits.length;
  const hasMore = offset + results.hits.length < totalCount;

  return Response.json({
    ...results,
    totalCount,
    hasMore,
  });
}

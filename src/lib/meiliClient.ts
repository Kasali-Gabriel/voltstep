import { MeiliSearch } from 'meilisearch';

export const meiliClient = new MeiliSearch({
  apiKey: process.env.MEILISEARCH_API_KEY,
  host: process.env.MEILISEARCH_HOST || 'http://127.0.0.1:7700',
});

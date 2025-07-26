const API_BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    : '';

type FetchOptions = {
  noStore?: boolean;
  revalidate?: number;
};

export const fetchData = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T | null> => {
  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`;

    const fetchOptions: RequestInit & {
      next?: { revalidate?: number };
    } = {};

    if (options.noStore) {
      fetchOptions.cache = 'no-store';
    } else if (options.revalidate !== undefined) {
      fetchOptions.next = { revalidate: options.revalidate };
    }

    const res = await fetch(fullUrl, fetchOptions);

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error('fetchData SSR/SSG error:', err);
    return null;
  }
};

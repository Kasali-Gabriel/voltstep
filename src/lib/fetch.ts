const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const fetchData = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`;

    const res = await fetch(fullUrl, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('fetchData SSR/SSG error:', err);
    return null;
  }
};

import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchCatalogData = async () => {
  try {
    const response = await axios.get('/api/categories');
    const catalogs = response.data;
    return catalogs;
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    return [];
  }
};

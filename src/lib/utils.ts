import { GuestDeliveryAddress } from '@/types/address';
import { Prisma } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}

export function formatDate(
  value: string | Date,
  format: 'short' | 'long' = 'short',
) {
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return '';

  if (format === 'long') {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  }

  // short format
  const dateStr = d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return dateStr.replace(/(\d{1,2} \w{3}) (\d{4})/, '$1, $2');
}

// Utility function to safely parse guest delivery address
export const parseGuestDeliveryAddress = (
  guestData: Prisma.InputJsonValue | null,
): GuestDeliveryAddress | null => {
  if (!guestData) return null;

  try {
    // If it's already an object, return it cast to GuestDeliveryAddress
    if (typeof guestData === 'object' && guestData !== null) {
      return guestData as GuestDeliveryAddress;
    }

    // If it's a string, try to parse it as JSON
    if (typeof guestData === 'string') {
      return JSON.parse(guestData) as GuestDeliveryAddress;
    }

    return null;
  } catch (error) {
    console.error('Error parsing guest delivery address:', error);
    return null;
  }
};

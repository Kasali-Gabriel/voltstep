import prisma from '@/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const productsCatalogs = await prisma.catalog.findMany({
      include: {
        categories: {
          include: {
            subcategories: true,
          },
        },
      },

      cacheStrategy: {
        ttl: 600,
        swr: 3600,
      },
    });

    if (!productsCatalogs || productsCatalogs.length === 0) {
      return NextResponse.json(
        { message: 'No product catalogs found' },
        { status: 404 },
      );
    }

    return NextResponse.json(productsCatalogs);
  } catch (error) {
    console.error('Error fetching product catalogs:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

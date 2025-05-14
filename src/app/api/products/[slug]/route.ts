import prisma from '@/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ slug: string }> },
) {
  try {
    const params = await paramsPromise; // Await params before using

    // Query the product from the database using Prisma
    const product = await prisma.product.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        reviews: {
          include: {
            reviewer: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect(); // Ensure to disconnect Prisma client
  }
}

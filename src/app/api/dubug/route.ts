// /app/api/debug/route.ts

import prisma from '@/lib/prismaDb';

export async function GET() {
  const products = await prisma.product.findMany({});
  return Response.json({ count: products.length });
}

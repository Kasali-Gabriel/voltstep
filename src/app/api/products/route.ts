import dbConnect from '@/lib/dbConnect';
import ProductsCatalog from '@/models/ProductCatalog';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const productsCatalogs = await ProductsCatalog.find({});

  if (!productsCatalogs || productsCatalogs.length === 0) {
    return NextResponse.json(
      { message: 'No product catalogs found' },
      { status: 404 },
    );
  }

  return NextResponse.json(productsCatalogs);
}

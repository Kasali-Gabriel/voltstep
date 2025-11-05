import {
  createCatalog,
  getCatalog,
} from '@/actions/admin/inventory/catalog/catalog';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const catalogs = await getCatalog();
    return NextResponse.json(catalogs);
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch catalogs' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, slug, img } = await req.json();

    const catalog = await createCatalog({ name, slug, img });

    return NextResponse.json(catalog);
  } catch (error) {
    console.error('Error creating catalog:', error);

    return NextResponse.json(
      { error: 'Failed to create catalog' },
      { status: 500 },
    );
  }
}

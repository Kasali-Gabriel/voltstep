import { createCategory } from '@/actions/admin/inventory/catalog/categories';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { catalogId, name, slug, img } = body;

    if (!name || !slug || !img || !catalogId) {
      return NextResponse.json(
        { error: 'Name, slug, catalogId and img are required' },
        { status: 400 },
      );
    }

    const category = await createCategory({ catalogId, name, slug, img });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);

    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 },
    );
  }
}

import { createSubcategory } from '@/actions/admin/inventory/catalog/subcategories';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryId, name, slug, img } = body;

    if (!name || !slug || !img || !categoryId) {
      return NextResponse.json(
        { error: 'Name, slug, categoryId and img are required' },
        { status: 400 },
      );
    }

    const subcategory = await createSubcategory({
      categoryId,
      name,
      slug,
      img,
    });

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error) {
    console.error('Error creating subcategory:', error);

    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 },
    );
  }
}

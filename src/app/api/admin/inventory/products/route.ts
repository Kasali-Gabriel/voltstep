import { getProducts } from '@/actions/admin/inventory/products/getProducts';
import { createProduct } from '@/actions/admin/inventory/products/product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as
      | 'asc'
      | 'desc';
    const subcategoryId = searchParams.get('subcategoryId') || undefined;

    const result = await getProducts({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      subcategoryId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, price, quantity, images, subcategoryId } =
      body;

    if (
      !name ||
      !slug ||
      !description ||
      price === undefined ||
      quantity === undefined ||
      !images ||
      !subcategoryId
    ) {
      return NextResponse.json(
        {
          error:
            'Required fields: name, slug, description, price, quantity, images, subcategoryId',
        },
        { status: 400 },
      );
    }

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 },
      );
    }

    if (typeof quantity !== 'number' || quantity < 0) {
      return NextResponse.json(
        { error: 'Quantity must be a non-negative number' },
        { status: 400 },
      );
    }

    if (!Array.isArray(images) || images.length !== 8) {
      return NextResponse.json(
        { error: 'Exactly 8 images are required' },
        { status: 400 },
      );
    }

    const product = await createProduct({
      name,
      slug,
      description,
      price,
      quantity,
      images,
      subcategoryId,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 },
    );
  }
}

import dbConnect from '@/lib/dbConnect';
import ProductsCatalog from '@/models/ProductCatalog';
import { Category, Product, ProductsData } from '@/types/product';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ slug: string }> },
) {
  try {
    await dbConnect();

    const params = await paramsPromise; // Await params before using

    // Query the database directly for the product with the matching slug
    const catalog = await ProductsCatalog.findOne({
      'products_data.categories.subcategories.products.slug': params.slug,
    });

    if (!catalog) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      );
    }

    // Extract the product from the catalog
    const product = catalog.products_data
      .flatMap((data: ProductsData) =>
        data.categories.flatMap((category: Category) => [
          ...(category.products || []),
          ...(category.subcategories ?? []).flatMap(
            (sub) => sub.products || [],
          ),
        ]),
      )
      .find((p: Product) => p.slug === params.slug);

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
  }
}

import {
  deleteProduct,
  updateProduct,
} from '@/actions/admin/inventory/products/product';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, price, quantity, images, subcategoryId, tags } =
      body;

    const updateData: {
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      images?: string[];
      subcategoryId?: string;
      tags?: string[];
    } = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (images !== undefined) updateData.images = images;
    if (subcategoryId !== undefined) updateData.subcategoryId = subcategoryId;
    if (tags !== undefined) updateData.tags = tags;

    const updatedProduct = await updateProduct(id, updateData);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await deleteProduct(id);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 },
    );
  }
}

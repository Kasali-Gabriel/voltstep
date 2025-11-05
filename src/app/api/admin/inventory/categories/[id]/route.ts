import {
  deleteCategory,
  updateCategory,
} from '@/actions/admin/inventory/catalog/categories';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, img } = body;

    const updateData: {
      name?: string;
      slug?: string;
      img?: string;
    } = {};

    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (img !== undefined) updateData.img = img;

    const updatedCategory = await updateCategory(id, updateData);

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);

    return NextResponse.json(
      { error: 'Failed to update category' },
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

    await deleteCategory(id);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);

    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 },
    );
  }
}

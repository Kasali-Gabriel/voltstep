import {
  deleteSubcategory,
  updateSubcategory,
} from '@/actions/admin/inventory/catalog/subcategories';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { name, slug, img } = await request.json();

    const updateData: {
      name?: string;
      slug?: string;
      img?: string;
    } = {};

    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (img !== undefined) updateData.img = img;

    const updatedSubcategory = await updateSubcategory(id, updateData);

    return NextResponse.json(updatedSubcategory);
  } catch (error) {
      console.error('Error updating subcategory:', error);

    return NextResponse.json(
      { error: 'Failed to update subcategory' },
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

    await deleteSubcategory(id);

    return NextResponse.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);

    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 },
    );
  }
}

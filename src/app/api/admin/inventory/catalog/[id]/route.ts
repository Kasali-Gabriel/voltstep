import { deleteCatalog, updateCatalog } from '@/actions/admin/inventory/catalog/catalog';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const { name, slug, img } = await req.json();

    const catalog = await updateCatalog(id, { name, slug, img });

    return NextResponse.json(catalog);
  } catch (error) {
    console.error('Error updating catalog:', error);
    return NextResponse.json(
      { error: 'Failed to update catalog' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await deleteCatalog(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting catalog:', error);
    return NextResponse.json(
      { error: 'Failed to delete catalog' },
      { status: 500 },
    );
  }
}

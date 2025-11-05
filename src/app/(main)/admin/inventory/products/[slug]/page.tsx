import { getProductBySlug } from '@/actions/admin/inventory/products/getProductBySlug';
import ProductDetail from '@/components/Admin/Inventory/Products/ProductDetail';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex w-full max-w-7xl flex-col">
      <ProductDetail product={product} />
    </div>
  );
}

import { getProducts } from '@/actions/admin/inventory/products/getProducts';
import ProductList from '@/components/Admin/Inventory/Products/ProductList';

interface ProductsPageProps {
  searchParams: Promise<{
    subcategoryId?: string;
    page?: string;
    pageSize?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const subcategoryId = params.subcategoryId;
  const page = parseInt(params.page || '1');
  const pageSize = parseInt(params.pageSize || '10');
  const search = params.search || '';
  const sortBy = params.sortBy || 'createdAt';
  const sortOrder = (params.sortOrder || 'desc') as 'asc' | 'desc';

  const result = await getProducts({
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
    subcategoryId,
  });

  const subcategory = subcategoryId
    ? result.products[0]?.subcategory
    : undefined;

  const title = subcategory
    ? `${subcategory.category.catalog.name}${['men', 'women'].includes(subcategory.category.catalog.name.toLowerCase()) ? "'s" : "'"} ${subcategory.name}`
    : 'All Products';

  return (
    <div className="flex w-full max-w-7xl flex-col">
      <ProductList
        title={title}
        products={result.products}
        pagination={{
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
        }}
        subcategory={subcategory}
      />
    </div>
  );
}

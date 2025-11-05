import { getCatalog } from '@/actions/admin/inventory/catalog/catalog';
import { CatalogCard } from '@/components/Admin/Inventory/Cards/CatalogCard';
import { AddButton } from '@/components/Buttons/AddButton';

export default async function CatalogPage() {
  const catalogs = await getCatalog();

  return (
    <div className="flex w-full max-w-7xl flex-col">
      <div className="mb-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Catalogs</h1>

          <AddButton />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {catalogs.map((catalog) => (
          <CatalogCard key={catalog.id} catalog={catalog} />
        ))}
      </div>
    </div>
  );
}

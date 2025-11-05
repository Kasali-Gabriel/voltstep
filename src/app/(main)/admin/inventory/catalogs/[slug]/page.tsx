import { getCategoriesByCatalogSlug } from '@/actions/admin/inventory/catalog/categories';
import { CategoryCard } from '@/components/Admin/Inventory/Cards/CategoryCard';
import { AddButton } from '@/components/Buttons/AddButton';
import { BackButton } from '@/components/Buttons/BackButton';

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategoriesByCatalogSlug(slug);
  const catalog = categories[0]?.catalog;

  const title = `${slug}${['men', 'women'].includes(slug) ? "'s" : "'"}`;

  return (
    <div className="flex w-full max-w-7xl flex-col">
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {title} categories
        </h1>

        <div className="flex items-center justify-between">
          <BackButton />

          <AddButton catalogId={catalog.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            catalogSlug={slug}
          />
        ))}
      </div>
    </div>
  );
}

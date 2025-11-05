import { getSubcategoriesByCategorySlug } from '@/actions/admin/inventory/catalog/subcategories';
import { SubcategoryCard } from '@/components/Admin/Inventory/Cards/SubcategoryCard';
import { AddButton } from '@/components/Buttons/AddButton';
import { BackButton } from '@/components/Buttons/BackButton';
import { Subcategory } from '@/types/product';

export default async function CategorySubcategoriesPage({
  params,
}: {
  params: Promise<{
    slug: string;
    categorySlug: string;
  }>;
}) {
  const { slug, categorySlug } = await params;

  const { category, subcategories } = await getSubcategoriesByCategorySlug(
    categorySlug,
    slug,
  );

  if (!category) {
    return <div>Category not found</div>;
  }

  const title = `${slug}${['men', 'women'].includes(slug) ? "'s" : "'"}`;

  return (
    <div className="flex w-full max-w-7xl flex-col">
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {title} {categorySlug}
        </h1>

        <div className="flex items-center justify-between">
          <BackButton />

          <AddButton categoryId={category.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {subcategories.map((subcategory: Subcategory) => (
          <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
        ))}
      </div>
    </div>
  );
}

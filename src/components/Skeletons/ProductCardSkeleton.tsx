import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = ({
  notSubcategory,
  query,
}: {
  notSubcategory?: boolean;
  query?: string;
}) => {
  return (
    <div className="flex w-full flex-col">
      {/* Image skeleton */}
      <Skeleton className="aspect-[1000/1024] h-auto w-full rounded-xl border object-cover" />

      {/* Title skeleton */}
      <div className="mt-2 flex w-full items-start justify-between">
        <div className="flex items-center">
          {/* Title skeleton */}
          <Skeleton className="h-4 w-32 rounded-xl sm:w-40" />
        </div>

        {/* rating */}
        <Skeleton className="ml-2 hidden h-4 w-8 rounded-xl sm:block" />
      </div>

      {/* Category/subcategory */}
      {(notSubcategory || query) && (
        <Skeleton className="mt-2 h-4 w-36 rounded-xl sm:w-44" />
      )}

      <div className="flex items-center justify-between sm:justify-start">
        {/* available colors  */}
        <Skeleton className="mt-1 h-4 w-20 rounded-xl" />

        {/* rating */}
        <Skeleton className="ml-2 h-4 w-8 rounded-xl sm:hidden" />
      </div>

      {/* Price skeleton */}
      <Skeleton className="mt-3 h-5 w-16 rounded-xl" />
    </div>
  );
};

export default ProductCardSkeleton;

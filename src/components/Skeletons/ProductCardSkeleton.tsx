import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = ({
  isPage,
}: {
  isPage?: boolean;
}) => {
  return (
    <div className="flex w-full flex-col">
      {/* Image skeleton */}
      <Skeleton className="aspect-[1000/1024] h-auto w-full border object-cover" />

      {/* Title and rating skeleton */}
      <div className="mt-2 flex w-full items-start justify-between">
        <div className="flex items-center">
          <Skeleton className="h-4 w-40" />
        </div>

        <Skeleton className="ml-2 h-4 w-10" />
      </div>

      {/* Category/subcategory or colors skeleton */}
      {!isPage ? (
        <Skeleton className="mt-2 h-4 w-32" /> // subcategory for searched product
      ) : (
        <Skeleton className="mt-1 h-4 w-20" /> // colors for full product
      )}

      {/* Price skeleton */}
      <Skeleton className="mt-3 h-5 w-16" />
    </div>
  );
};

export default ProductCardSkeleton;

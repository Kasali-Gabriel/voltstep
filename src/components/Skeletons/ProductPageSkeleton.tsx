import { Skeleton } from '@/components/ui/skeleton';

const ProductPageSkeleton = () => {
  return (
    <div className="relative flex min-h-[100vh] w-full flex-col px-5 sm:px-10 xl:px-12">
      <div className="flex w-full flex-col items-center justify-center pt-4 md:pt-10">
        <section className="relative flex flex-col gap-6 xl:pl-14 lg:portrait:grid lg:portrait:grid-cols-2 md:landscape:grid md:landscape:grid-cols-2">
          {/* Title, Price, Ratings (mobile) */}
          <div className="flex flex-col gap-2 lg:portrait:hidden md:landscape:hidden">
            {/* Title */}
            <Skeleton className="mt-2 mb-2 h-6 w-[85%] sm:w-[50%]" />
            <div className="flex w-full">
              <div className="flex w-full items-center justify-between">
                {/* price */}
                <Skeleton className="h-6 w-20" />
                {/* rating */}
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>

          {/* Image swipers (mobile) */}
          <div className="-mx-5 w-screen sm:-mx-10 lg:hidden xl:-mx-16 md:landscape:hidden">
            <Skeleton className="h-[75vh] w-full rounded-none md:h-[77.5vh]" />
          </div>

          {/* Image swipers (desktop) */}
          <div className="top-10 col-span-1 hidden h-[32rem] gap-4 will-change-transform lg:w-[28.5rem] xl:w-[35rem] xl:gap-5 lg:portrait:flex md:landscape:flex">
            {/* Thumbnails */}
            <div className="thumbs flex h-full w-[70px] flex-col items-center justify-center gap-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="mb-1 h-16 w-14 rounded object-cover"
                />
              ))}
            </div>

            {/* Main image */}
            <Skeleton className="h-full w-full rounded-xl" />
          </div>

          {/* desktop Details, selectors and buttons */}
          <div className="col-span-1 hidden w-full flex-col items-start justify-start lg:w-[85%] xl:w-[80%] xl:pl-5 lg:portrait:flex md:landscape:flex">
            {/* title   */}
            <Skeleton className="mb-2 h-7 w-2/3" />
            <div className="mb-2 flex w-full items-center justify-between">
              {/* price */}
              <Skeleton className="h-6 w-20" />
              {/* rating */}
              <Skeleton className="h-5 w-24" />
            </div>

            <div className="flex flex-col">
              {/* description */}
              <div className="mt-4 flex w-full flex-col">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-[90%]" />
                <Skeleton className="mb-2 h-4 w-[80%]" />
              </div>

              {/* Color selector skeleton */}
              <div className="mt-5 flex max-w-[90vw] flex-col items-start justify-start">
                <div className="flex w-full gap-4 overflow-x-auto px-3 py-2 pt-2 sm:flex-wrap">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex w-16 flex-col items-center">
                      <Skeleton className="size-12 rounded-full" />
                      <Skeleton className="mt-2 h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Size selector skeleton */}
              <div className="mt-7 flex w-full flex-col items-start justify-start">
                <h2 className="text-lg font-semibold">
                  <Skeleton className="h-6 w-32" />
                </h2>

                <div className="mt-2 flex w-fit max-w-full flex-wrap gap-2 rounded-md border border-transparent py-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Skeleton className="h-10 w-18 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* bag and wishlist button */}
            <div className="mt-10 flex w-full flex-col gap-4">
              <Skeleton className="h-14 w-full rounded-4xl" />
              <Skeleton className="h-14 w-full rounded-4xl" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;

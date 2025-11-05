'use client';

import { ColorSelector } from '@/components/Product/ColorSelector';
import { SizeSelector } from '@/components/Product/SizeSelectors';
import {
  DeliverySwiper,
  LargeScreenSwiper,
  SmallScreenSwiper,
} from '@/components/Product/swipers';
import AddReviewBtn from '@/components/Reviews/AddReviewBtn';
import { Ratings } from '@/components/Reviews/ratings';
import { RatingsPreview } from '@/components/Reviews/ratingsPreview';
import { Reviews } from '@/components/Reviews/reviews';
import { AddToWishList } from '@/components/Wishlist/AddToWishList';
import { useCartStore } from '@/hooks/use-cart';
import { useViewedProduct } from '@/hooks/useViewedProduct';
import { fetchData } from '@/lib/fetch';
import { useBagStore, useViewedProductStore } from '@/lib/state';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { Review } from '@/types/review';
import { SearchedProduct } from '@/types/search';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import RecentlyViewedProducts from '../ProductList/RecentlyViewedProducts';
import ProductCardSkeleton from '../Skeletons/ProductCardSkeleton';

const ProductClient = ({ product }: { product: Product }) => {
  const [reviews, setReviews] = useState<Review[]>(product.reviews ?? []);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined,
  );
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [LgScreeen, setLgScreen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [recentViewed, setRecentViewed] = useState<SearchedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const mainBtnRef = useRef<HTMLButtonElement>(null);
  const sizeSelectorRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCartStore();
  const { setIsBagOpen } = useBagStore();
  const { fetchRecentViewed } = useViewedProduct();

  const guestViewedProducts = useViewedProductStore((s) => s.viewedProducts);

  useEffect(() => {
    const fetchViewed = async () => {
      setLoading(true);
      const viewed = await fetchRecentViewed(guestViewedProducts);
      setRecentViewed(viewed);
      setLoading(false);
    };
    fetchViewed();
  }, [fetchRecentViewed, guestViewedProducts]);

  useEffect(() => {
    const handleResize = () => {
      setLgScreen(window.innerHeight >= 1024);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainBtnRef.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setShowSticky(!entry.isIntersecting);
          },
          {
            rootMargin: '0px 0px -95px 0px',
          },
        );
        observer.observe(mainBtnRef.current);
        clearInterval(interval);

        return () => observer.disconnect();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [LgScreeen]);

  useEffect(() => {
    if (product) {
      // Get all unique colors from product.colors
      const allColors = Array.from(
        new Set((product.colors || []).map((c) => c.color)),
      );
      const defaultColor = allColors.length > 0 ? allColors[0] : '';
      setSelectedColor(defaultColor);
      setSelectedSize(undefined); // No default size
      setCartItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        quantity: 1,
        image: product.images?.[0] || '',
        selectedSize: undefined,
        selectedColor: defaultColor,
        product: product,
      });
    }
  }, [product]);

  // When selectedColor changes, clear selectedSize if it's not available for that color
  useEffect(() => {
    if (!product || !selectedColor) return;
    // Find the color object
    const colorObj = (product.colors || []).find(
      (c) => c.color === selectedColor,
    );
    const validSizes = colorObj
      ? Array.from(new Set((colorObj.variants || []).map((v) => v.size)))
      : [];
    if (!validSizes.includes(selectedSize || '')) {
      setSelectedSize(undefined);
    }
  }, [selectedColor, selectedSize, product]);

  useEffect(() => {
    if (selectedColor !== '' || selectedSize !== undefined) {
      setCartItem((prev) =>
        prev
          ? {
              ...prev,
              selectedColor: selectedColor,
              selectedSize: selectedSize,
            }
          : prev,
      );
    }
  }, [selectedColor, selectedSize]);

  // function to refresh reviews after add/edit
  const refreshReviews = async () => {
    if (!product) return;

    const data = await fetchData<Review[]>(
      `/api/review?productId=${product.id}`,
      {
        revalidate: 60,
      },
    );

    setReviews(data ?? []);
  };

  const onAddToCart = () => {
    // Derive all available sizes from product.colors/variants
    const allSizes = Array.from(
      new Set(
        (product.colors || []).flatMap((colorObj) =>
          (colorObj.variants || []).map((v) => v.size),
        ),
      ),
    );
    if (allSizes.length > 0 && !selectedSize) {
      setSizeError(true);
      if (sizeSelectorRef.current) {
        const rect = sizeSelectorRef.current.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (!isInView) {
          sizeSelectorRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
      return;
    }
    setSizeError(false);
    if (!cartItem) return;
    addItem({ ...cartItem, selectedSize: selectedSize });
    setIsBagOpen(true);
  };

  // --- Place allColors and filteredSizes here, before return ---
  // These must be outside of JSX and before return
  // Get all unique colors from product.colors
  const allColors = Array.from(
    new Set((product.colors || []).map((c) => c.color)),
  );
  // When a color is selected, get all unique sizes for that color from variants
  const filteredSizes = selectedColor
    ? (() => {
        const colorObj = (product.colors || []).find(
          (c) => c.color === selectedColor,
        );
        return colorObj
          ? Array.from(new Set((colorObj.variants || []).map((v) => v.size)))
          : [];
      })()
    : [];
  // --- End of logic, return JSX below ---

  return (
    <div className="relative container mx-auto flex w-full max-w-[1440px] flex-col px-5 sm:px-10 xl:px-12">
      <div className="flex w-full flex-col items-center justify-center pt-4 md:pt-10">
        <section className="relative flex flex-col gap-6 xl:pl-14 lg:portrait:grid lg:portrait:grid-cols-2 md:landscape:grid md:landscape:grid-cols-2">
          <div className="flex flex-col gap-2 lg:portrait:hidden md:landscape:hidden">
            <h1 className="text-xl font-semibold sm:text-2xl">
              {product.name}
            </h1>

            <div className="flex w-full">
              <div className="flex w-full items-center justify-between">
                <p className="text-lg font-medium sm:text-xl">
                  ${product.price}
                </p>

                <Ratings reviews={product.reviews ?? []} />
              </div>
            </div>
          </div>

          {/* Image swipers */}
          <div className="-mx-5 w-screen sm:-mx-10 lg:hidden xl:-mx-16 md:landscape:hidden">
            <SmallScreenSwiper
              images={(product.images ?? []).map((img, idx) => ({
                src: img,
                alt: `${product.name} image ${idx + 1}`,
              }))}
            />
          </div>

          <div className="relative col-span-1 hidden lg:portrait:block md:landscape:block">
            <LargeScreenSwiper
              images={(product.images ?? []).map((img, idx) => ({
                src: img,
                alt: `${product.name} image ${idx + 1}`,
              }))}
            />
          </div>

          {/* Details, selectors and buttons */}
          <div className="col-span-1 flex w-full flex-col items-start justify-start lg:w-[85%] xl:w-[70%] xl:pl-5">
            <h1 className="hidden text-xl font-semibold lg:flex">
              {product.name}
            </h1>

            <div className="mb-2 flex w-full items-center justify-between">
              <p className="hidden text-lg font-medium lg:block">
                ${product.price}
              </p>

              <Ratings reviews={product.reviews ?? []} />
            </div>

            <div className="flex flex-col">
              <p className="text-gray-700">{product.description}</p>
              {/* Color and Size selectors */}
              {allColors.length > 0 && (
                <>
                  <ColorSelector
                    colors={allColors}
                    selectedColor={selectedColor || allColors[0]}
                    setSelectedColor={setSelectedColor}
                  />
                  {selectedColor && filteredSizes.length > 0 && (
                    <SizeSelector
                      ref={sizeSelectorRef}
                      sizes={filteredSizes}
                      selectedSize={selectedSize}
                      selectedColor={selectedColor}
                      productColors={product.colors}
                      setSelectedSize={(size: string) => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      sizeError={sizeError}
                      subcategoryName={product.subcategory?.name ?? ''}
                    />
                  )}
                </>
              )}
            </div>

            <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row lg:flex-col">
              <button
                ref={mainBtnRef}
                onClick={onAddToCart}
                className="w-full cursor-pointer rounded-4xl bg-black py-3 text-white hover:bg-stone-900 sm:rounded-xl md:py-4 lg:rounded-4xl"
              >
                ADD TO BAG
              </button>

              {cartItem && (
                <AddToWishList
                  productName={cartItem.name}
                  productImage={cartItem.image}
                  productPrice={cartItem.price}
                  productId={cartItem.id}
                  selectedSize={cartItem.selectedSize}
                  selectedColor={cartItem.selectedColor}
                />
              )}
            </div>

            <div className="w-full space-y-2 pt-10">
              <DeliverySwiper />

              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h4 className="font-medium text-gray-900">
                  Free 30-Day Returns
                </h4>

                <p className="text-sm text-gray-600">
                  Return items within 30 days for a full refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TODO You Might also like section */}

        {/* Reviews */}
        <section
          id="reviews"
          className="mt-10 flex w-full flex-col space-y-4 py-10 md:flex-row md:space-x-5 xl:space-x-10"
        >
          <div className="flex flex-col">
            <h2 className="pb-1 text-lg font-semibold md:pb-0 lg:text-2xl">
              Customer reviews
            </h2>

            <div className="py-4 md:hidden">
              <AddReviewBtn
                productId={product.id}
                reviews={reviews}
                onReviewChange={refreshReviews}
              />
            </div>

            <RatingsPreview reviews={reviews} />

            <div className="mt-10 hidden flex-col gap-3 border-y py-7 md:flex">
              <h2 className="-mt-2 text-xl font-semibold text-neutral-800">
                Review this product
              </h2>

              <p className="text-neutral-800">
                Share your thoughts with other customers
              </p>

              <AddReviewBtn
                productId={product.id}
                reviews={reviews}
                onReviewChange={refreshReviews}
              />
            </div>
          </div>
          <Reviews reviews={reviews} />
        </section>

        {/* Recently viewed products */}
        {recentViewed ? (
          <RecentlyViewedProducts
            recentViewed={recentViewed}
            loading={loading}
          />
        ) : (
          <div className="flex w-full flex-row gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} notSubcategory={true} />
            ))}
          </div>
        )}

        <div
          className={`fixed right-0 bottom-0 left-0 z-40 bg-black p-4 text-white transition-transform duration-300 lg:hidden ${
            showSticky ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mx-auto max-w-xl">
            <button
              onClick={onAddToCart}
              className="w-full rounded-lg bg-black py-3 text-lg text-white"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;

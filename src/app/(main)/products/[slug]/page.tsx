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
import { images } from '@/constants/images';
import { useCartStore } from '@/hooks/use-cart';
import { useBagStore } from '@/lib/state';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { Review } from '@/types/review';
import axios from 'axios';
import { use, useEffect, useRef, useState } from 'react';
import 'swiper/css';

const Page = ({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const params = use(paramsPromise) as { slug: string };

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const [LgScreeen, setLgScreen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const mainBtnRef = useRef<HTMLButtonElement>(null);
  const sizeSelectorRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCartStore();
  const { setIsBagOpen } = useBagStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${params.slug}`);

      const data = response.data;

      setProduct(data);

      setReviews(data.reviews ?? []);
    };

    fetchProduct();
  }, [params.slug]);

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
      const defaultColor = (product.colors && product.colors[0]) || null;

      setSelectedColor(defaultColor);

      setCartItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        quantity: 1,
        image: product.images?.[0] || '',
        selectedSize: undefined,
        selectedColor: defaultColor || undefined,
      });
    }
  }, [product]);

  useEffect(() => {
    if (selectedColor !== null || selectedSize !== null) {
      setCartItem((prev) =>
        prev
          ? {
              ...prev,
              selectedColor: selectedColor || undefined,
              selectedSize: selectedSize || undefined,
            }
          : prev,
      );
    }
  }, [selectedColor, selectedSize]);

  // function to refresh reviews after add/edit
  const refreshReviews = async () => {
    if (!product) return;

    const response = await axios.get(`/api/review?productId=${product.id}`);

    setReviews(response.data ?? []);
  };

  const onAddToCart = () => {
    // Only require size if sizes exist
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
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

    addItem({ ...cartItem, selectedSize: selectedSize ?? undefined });

    setIsBagOpen(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex min-h-[150vh] w-full flex-col">
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
            <SmallScreenSwiper images={images} />
          </div>

          {/*FIXME image scrolling with second column  */}
          <div className="relative col-span-1 hidden lg:portrait:block md:landscape:block">
            <LargeScreenSwiper images={images} />
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

              {(product.colors ?? []).length > 0 && (
                <ColorSelector
                  colors={product.colors ?? []}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              )}

              {(product.sizes ?? []).length > 0 && (
                <SizeSelector
                  ref={sizeSelectorRef}
                  sizes={product.sizes ?? []}
                  selectedSize={selectedSize}
                  setSelectedSize={(size: string) => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  sizeError={sizeError}
                />
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

        {/* TODO RECENTLY VIEWED section */}

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

export default Page;

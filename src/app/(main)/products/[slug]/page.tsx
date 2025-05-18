'use client';

import { ColorSelector, SizeSelector } from '@/components/Product/selectors';
import {
  DeliverySwiper,
  LargeScreenSwiper,
  SmallScreenSwiper,
} from '@/components/Product/swipers';
import { Ratings } from '@/components/Reviews/ratings';
import { RatingsPreview } from '@/components/Reviews/ratingsPreview';
import { Reviews } from '@/components/Reviews/reviews';
import { AddToWishList } from '@/components/Wishlist/addToWishListBtn';
import { images } from '@/constants/images';
import { useCartStore } from '@/hooks/use-cart';
import { useBagStore } from '@/lib/state';
import type { CartItem } from '@/types/index';
import { Product } from '@/types/product';
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
    };

    fetchProduct();
  }, [params.slug]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
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
      setSelectedSize(null); // Do not select size by default
      setCartItem({
        id: product.id,
        name: product.name,
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
    <div className="flex w-full flex-col items-center justify-center pt-4 md:pt-10 lg:px-10 xl:px-16">
      <section className="relative flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-2 px-5 sm:px-10 lg:hidden">
          <h1 className="text-xl font-bold sm:text-2xl">{product.name}</h1>

          <div className="flex w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg font-semibold sm:text-xl">
                ${product.price}
              </p>

              <Ratings reviews={product.reviews ?? []} />
            </div>
          </div>
        </div>

        {/* Image swipers */}
        <div className="lg:hidden">
          <SmallScreenSwiper images={images} />
        </div>

        <div className="relative col-span-1 hidden lg:block">
          <LargeScreenSwiper images={images} />
        </div>

        <div className="col-span-1 flex w-full flex-col items-start justify-start xl:w-[85%] xl:pl-5">
          <div className="hidden w-full items-start justify-between gap-5 lg:flex">
            <h1 className="text-xl font-bold">{product.name}</h1>

            <Ratings reviews={product.reviews ?? []} />
          </div>

          <p className="mb-2 hidden text-lg font-semibold lg:block">
            ${product.price}
          </p>

          <div className="flex flex-col px-5 sm:px-10 lg:px-0">
            <p className="text-gray-700">{product.description}</p>

            {(product.colors ?? []).length > 0 && (
              <ColorSelector
                colors={product.colors ?? []}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                isMobile={isMobile}
              />
            )}

            {(product.sizes ?? []).length > 0 && (
              <SizeSelector
                ref={sizeSelectorRef}
                sizes={product.sizes ?? []}
                selectedSize={selectedSize}
                setSelectedSize={(size) => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                sizeError={sizeError}
              />
            )}
          </div>

          <div className="mt-10 flex w-full flex-col gap-4 px-5 sm:flex-row sm:px-10 lg:px-0">
            {/* TODO  crete the add  to wishlist functions, as well as the wishlist , also create a compoent that is displayed when a user tries to add to wishlist, view wishlist or add review without being signed. clerk signedin component to be used  */}

            <button
              ref={mainBtnRef}
              onClick={onAddToCart}
              className="w-full cursor-pointer rounded-4xl bg-black py-3 text-white hover:bg-stone-900 sm:rounded-xl md:py-4 lg:w-full"
            >
              ADD TO BAG
            </button>

            <AddToWishList />
          </div>

          <div className="w-full space-y-2 px-5 pt-10 sm:px-10 lg:px-0">
            <DeliverySwiper />

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h4 className="font-medium text-gray-900">Free 30-Day Returns</h4>
              <p className="text-sm text-gray-600">
                Return items within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TODO You Might also like section */}

      <section
        id="reviews"
        className="mt-10 flex w-full flex-col space-y-4 px-5 py-10 sm:px-10 md:flex-row md:space-x-5 lg:px-0 xl:space-x-10"
      >
        <div className="flex flex-col">
          <h2 className="pb-1 text-lg font-semibold md:pb-0 lg:text-2xl">
            Customer reviews
          </h2>

          <RatingsPreview reviews={product.reviews ?? []} />

          <div className="mt-10 hidden flex-col gap-3 border-y py-7 md:flex">
            <h2 className="-mt-2 text-xl font-semibold text-neutral-800">
              Review this product
            </h2>

            <p className="text-neutral-800">
              Share your thoughts with other customers
            </p>

            {/* TODO   ui of search on md screens like that of nike, create a dialog component that renders a form for adding customer reviews, customer with a review on the product cant adda new review but can update thier reviews  */}
            <button className="w-full cursor-pointer rounded-4xl border border-black bg-white py-2 hover:bg-neutral-100">
              Write a customer review
            </button>
          </div>
        </div>

        <Reviews reviews={product.reviews ?? []} />
      </section>

      {/* TODO RECENTLY VIEWED section */}

      <div
        className={`fixed right-0 bottom-0 left-0 z-50 bg-black p-4 text-white transition-transform duration-300 lg:hidden ${
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
  );
};

export default Page;

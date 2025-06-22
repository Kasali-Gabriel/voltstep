import { useCartStore } from '@/hooks/use-cart';
import { useBagStore } from '@/lib/state';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import shoppingBag from '@/assets/shopping-bag-icon.svg';
import { MoveToWishList } from '../Wishlist/MovetowishList';
import ShippingProgress from './ShippingProgress';

export const BagContent = ({
  setActiveTab,
}: {
  setActiveTab?: (tab: 'wishlist' | 'bag') => void;
}) => {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getSubTotal,
    getShippingFee,
    getTotal,
  } = useCartStore();

  const subTotal = parseFloat(getSubTotal());
  const shipping = getShippingFee();
  const total = parseFloat(getTotal());

  const { setIsBagOpen } = useBagStore();

  return (
    <>
      {items.length > 0 ? (
        <div className="relative flex h-full w-full flex-1 flex-col py-2">
          {/* Free shipping progress bar and message */}
          <ShippingProgress />

          {/* Cart Items */}
          <div className="flex flex-1 flex-col">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 border-t py-4 first:border-t-0 md:py-6"
                >
                  <div className="relative h-44 w-32 flex-shrink-0 sm:h-52 sm:w-44">
                    <Link
                      href={`/product/${item.slug}` || '#'}
                      onClick={() => setIsBagOpen(false)}
                    >
                      <Image
                        src={item?.image?.[0] || '/placeholder-image.png'}
                        alt="item-image"
                        fill
                        className="h-full w-full cursor-pointer border object-cover"
                        sizes="256px"
                      />
                    </Link>
                  </div>

                  <div className="flex h-full w-full flex-col space-y-1">
                    <Link
                      href={`/product/${item.slug}` || '#'}
                      onClick={() => setIsBagOpen(false)}
                    >
                      <h3 className="cursor-pointer text-sm font-medium sm:text-base">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="flex space-x-2 font-medium text-neutral-500">
                      {item.selectedColor && <span>{item.selectedColor}</span>}
                      {item.selectedColor && item.selectedSize && (
                        <span>|</span>
                      )}
                      {item.selectedSize && <span>{item.selectedSize}</span>}
                    </p>

                    <p className="text-lg font-bold">${item.price}</p>

                    {/* edit item quantity or move to wishlist*/}
                    <div className="flex w-full flex-1 items-end space-x-7">
                      <div className="flex w-fit items-center space-x-2 rounded-full border bg-white">
                        {item.quantity === 1 ? (
                          // Remove item from cart
                          <button
                            onClick={() => removeItem(item)}
                            className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 transition hover:bg-neutral-200"
                          >
                            <Trash2 size={20} />
                          </button>
                        ) : (
                          // reduce item quantity
                          <button
                            onClick={() => decreaseQuantity(item)}
                            className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 transition hover:bg-neutral-200"
                          >
                            <Minus size={20} />
                          </button>
                        )}

                        <span className="w-5 text-center text-lg font-medium">
                          {item.quantity}
                        </span>

                        {/* increase item quantity */}
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 transition hover:bg-neutral-200 disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-transparent"
                          disabled={item.quantity >= 10}
                        >
                          <Plus size={20} />
                        </button>
                      </div>

                      <MoveToWishList
                        productName={item.name}
                        productId={item.id}
                        selectedSize={item.selectedSize}
                        selectedColor={item.selectedColor}
                        setActiveTab={setActiveTab}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart summary */}
          <div className="mt-5 flex flex-col space-y-4 rounded-lg bg-neutral-100 p-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Esimated Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image src={shoppingBag} alt="empty bag image" height={200} />

          <h2 className="mt-10 font-semibold">Your Bag is Empty</h2>

          <p className="mt-2 font-medium text-neutral-500">
            No items yet. Start shopping to fill it up!
          </p>

          <button className="mt-4 w-[55%] cursor-pointer rounded-3xl bg-black py-2.5 text-center leading-tight font-semibold text-white hover:bg-neutral-900">
            SHOP MENS
          </button>

          <button className="mt-2 w-[55%] cursor-pointer rounded-3xl bg-black py-2.5 text-center font-semibold text-white hover:bg-neutral-900">
            SHOP WOMENS
          </button>
        </div>
      )}
    </>
  );
};

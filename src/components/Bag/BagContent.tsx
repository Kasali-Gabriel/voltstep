import { useCartStore } from '@/hooks/use-cart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-bag-icon.svg';
import { MoveToWishList } from '../Wishlist/addToWishListBtn';
import ShippingProgress from './ShippingProgress';

export const BagContent = () => {
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

  return (
    <>
      {items.length > 0 ? (
        <div className="relative flex h-full w-full flex-1 flex-col py-2">
          {/* Free shipping progress bar and message */}
          <ShippingProgress />

          {/* Cart Items */}
          <div className="flex flex-col flex-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 border-t py-4 first:border-t-0 md:py-6 lg:py-10"
              >
                <Image
                  src={
                    item.image
                      ? item.image.startsWith('http') ||
                        item.image.startsWith('/')
                        ? item.image
                        : `/productImages/${item.image}`
                      : '/apple-logo.png'
                  }
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-[9.5rem] w-[7.35rem] border object-contain shadow-xs sm:h-[10rem] sm:w-[8rem]"
                />

                <div className="flex h-full w-full flex-col space-y-1">
                  <h3 className="text-sm font-medium sm:text-base">
                    {item.name}
                  </h3>

                  {item.selectedColor && (
                    <p className="text-sm text-neutral-500">
                      {item.selectedColor}
                    </p>
                  )}

                  {item.selectedSize && (
                    <p className="text-neutral-500">
                      Size{' '}
                      <span className="ml-1 text-lg underline underline-offset-2">
                        {item.selectedSize}
                      </span>
                    </p>
                  )}

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

                    <MoveToWishList />
                  </div>
                </div>
              </div>
            ))}
          </div>
         
          {/* Cart summary */}
          <div className="mt-5 space-y-4 rounded-lg bg-neutral-100 p-4 flex flex-col ">
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

import { useWishlistContext } from '@/context/WishlistContext';
import { useCartStore } from '@/hooks/use-cart';
import { useBagStore } from '@/lib/state';
import { WishListItemCardProps } from '@/types/wishlist';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import WishListSizeSelector from './WishListSizeSelector';
import { AddToBagButton, RemoveFromWishlistButton } from './WishlistCardBtn';

const WishListItemCard = ({ item, isPage = false }: WishListItemCardProps) => {
  const { removeFromWishlist, loading, addToWishlist } = useWishlistContext();
  const { setIsBagOpen } = useBagStore();
  const { addItem } = useCartStore();

  // State for size selection
  const [selectedSize, setSelectedSize] = useState(item.selectedSize || '');
  const [sizeError, setSizeError] = useState(false);
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const sizes = item.product?.sizes || [];

  const handleRemoveFromWishlist = async () => {
    setIsRemoving(true);
    // Save a reference to the item before removal
    const removedItem = { ...item };
    await removeFromWishlist(item.productId);

    toast('Wishlist updated', {
      description: (
        <p>
          <span className="font-semibold">{item.product?.name}</span> removed
          from Wishlist!
        </p>
      ),
      action: {
        label: 'Undo',
        onClick: async () => {
          await addToWishlist(removedItem);

          toast('Item restored', {
            description: (
              <p>
                <span className="font-semibold">
                  {removedItem.product?.name}
                </span>{' '}
                restored to wishlist.
              </p>
            ),
          });
        },
      },
    });
    setIsRemoving(false);
  };

  const handleAddToBag = () => {
    if (!item.product) return;

    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }

    addItem({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      quantity: 1,
      image: item.product.images?.[0] || '',
      selectedSize: selectedSize,
      selectedColor: item.selectedColor,
    });

    setIsBagOpen(true);

    toast('Added to bag', {
      description: (
        <p>
          <span className="font-semibold">{item.product.name}</span> added to
          your bag.
        </p>
      ),
    });
  };

  const renderVariant = () => (
    <p className="flex space-x-2 font-medium text-neutral-500">
      {item.selectedColor && <span>{item.selectedColor}</span>}
      {item.selectedColor && item.selectedSize && <span>|</span>}
      {item.selectedSize && <span>{item.selectedSize}</span>}
    </p>
  );

  // Handler to close the bag when navigating to a product
  const handleProductLinkClick = () => {
    setIsBagOpen(false);
  };

  return (
    <div
      className={`relative flex ${isPage ? 'flex-col' : 'flex-row space-x-3 sm:space-x-5'} ${isRemoving ? 'pointer-events-none opacity-50' : ''}`}
    >
      {/* Product image as a link */}
      {isPage ? (
        <Link
          href={item.product?.slug ? `/products/${item.product.slug}` : '#'}
          tabIndex={item.product?.slug ? 0 : -1}
          onClick={handleProductLinkClick}
        >
          <Image
            src={item.product?.images[0] ?? '/placeholder.png'}
            alt="item-image"
            width={1024}
            height={1024}
            className="h-auto w-full cursor-pointer border"
          />
        </Link>
      ) : (
        <div className="relative h-44 w-32 flex-shrink-0 sm:h-52 sm:w-44">
          <Link
            href={item.product?.slug ? `/products/${item.product.slug}` : '#'}
            tabIndex={item.product?.slug ? 0 : -1}
            onClick={handleProductLinkClick}
          >
            <Image
              src={item.product?.images[0] ?? '/placeholder.png'}
              alt="item-image"
              fill
              className="h-full w-full cursor-pointer border object-cover"
              sizes="256px"
            />
          </Link>
        </div>
      )}

      {/* Product details */}
      <div className="mt-2 flex w-full flex-col gap-1 md:flex-row md:justify-between">
        <div className="flex flex-col">
          <Link
            href={item.product?.slug ? `/products/${item.product.slug}` : '#'}
            tabIndex={item.product?.slug ? 0 : -1}
            onClick={handleProductLinkClick}
          >
            <h2
              className={`cursor-pointer text-sm font-medium sm:text-base md:text-lg ${isPage ? '' : 'lg:-mt-3'}`}
            >
              {item.product?.name}
            </h2>
          </Link>

          <div className="mt-1 flex justify-between text-sm sm:text-base">
            {renderVariant()}

            <p className={isPage ? 'font-medium md:hidden' : 'hidden'}>
              ${item.product?.price}
            </p>
          </div>

          <p className={isPage ? 'hidden' : 'mt-1 font-medium'}>
            ${item.product?.price}
          </p>

          {/* Size dropdown or dialog to select size before adding to bag */}
          <WishListSizeSelector
            isPage={isPage}
            showSizeDialog={showSizeDialog}
            setShowSizeDialog={setShowSizeDialog}
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            sizeError={sizeError}
            setSizeError={setSizeError}
            item={item}
            handleAddToBag={handleAddToBag}
            handleProductLinkClick={handleProductLinkClick}
          />

          {/* Actions for non-page (sheet/drawer) view */}
          <div
            className={
              isPage
                ? 'hidden'
                : 'flex w-full flex-1 items-end justify-between space-x-2'
            }
          >
            <AddToBagButton onClick={handleAddToBag} />

            <RemoveFromWishlistButton
              onClick={handleRemoveFromWishlist}
              disabled={loading}
            />
          </div>
        </div>

        <p className={isPage ? 'hidden pt-0.5 font-medium md:block' : 'hidden'}>
          ${item.product?.price}
        </p>
      </div>

      {/* Actions for page view */}
      <AddToBagButton
        onClick={() => {
          if (sizes.length > 0 && !selectedSize) {
            setShowSizeDialog(true);
          } else {
            handleAddToBag();
          }
        }}
        className={isPage ? 'md:px-14 md:py-3' : 'hidden'}
      />

      {isPage && (
        <RemoveFromWishlistButton
          onClick={handleRemoveFromWishlist}
          disabled={loading}
          className="absolute top-2 right-2 flex size-8 md:top-5 md:right-5 md:size-11"
        />
      )}
    </div>
  );
};

export default WishListItemCard;

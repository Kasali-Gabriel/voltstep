'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { CheckoutOrderSummaryProps } from '@/types/order';
import { ChevronDown, ChevronUp, Package, Truck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CheckoutOrderSummary = ({
  items,
  subtotal,
  shippingCost,
  taxAmount,
  total,
}: CheckoutOrderSummaryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const orderItemsContent = (
    <CardContent className="px-2 sm:px-6">
      <div className="space-y-4">
        {items.map((item) => {
          // Defensive checks for item data
          if (!item) return null;

          const productName =
            item.product?.name || item.name || 'Unknown Product';
          const productImage =
            item.product?.images?.[0] ||
            item.image ||
            '/productImages/captain-america-4k-artworks-dl.jpg';
          const productId = item.product?.id || item.id || 'unknown';

          return (
            <div
              key={`${productId}-${item.selectedColor}-${item.selectedSize}`}
              className="flex items-center justify-center gap-3"
            >
              <Image
                src={productImage}
                alt={productName}
                width={100}
                height={100}
                className="size-16 rounded-lg object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src =
                    '/productImages/captain-america-4k-artworks-dl.jpg';
                }}
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium">{productName}</h4>
                  <p className="hidden font-medium sm:flex">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>

                <p className="text-sm text-gray-500">{item.selectedColor}</p>

                <div className="flex justify-between">
                  <div className="flex space-x-1">
                    <p className="text-sm text-gray-500">
                      Size: {item.selectedSize && `${item.selectedSize}`} |
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {` ${item.quantity || 1}`}
                    </p>
                  </div>

                  <p className="font-medium sm:hidden">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  );

  return (
    <div className="w-full space-y-6 lg:sticky lg:top-10">
      {/* Order Items */}
      <Card className="border-none bg-white pb-0 shadow-none">
        {isMobile ? (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-end justify-between">
                <div className="flex w-full cursor-pointer items-center gap-2 px-2 text-xl font-medium sm:px-6">
                  <Package className="h-5 w-5" />
                  Order Summary
                </div>

                {isOpen ? (
                  <span className="flex items-center space-x-2">
                    Hide <ChevronUp className="ml-2 h-5 w-5" />
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    show <ChevronDown className="ml-2 h-5 w-5" />
                  </span>
                )}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-5">
              {orderItemsContent}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <>
            <CardHeader className="px-2 sm:px-6">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            {orderItemsContent}
          </>
        )}
      </Card>

      {/* Price Breakdown */}
      <Card className="border-none bg-white shadow-none">
        <CardContent className="px-2 sm:px-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>${subtotal}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Shipping
              </span>

              <span>${shippingCost}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>

              <span>${taxAmount}</span>
            </div>

            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>${total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckoutOrderSummary;

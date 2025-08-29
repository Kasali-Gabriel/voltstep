'use client';

import CheckoutDeliverySection from '@/components/Checkout/CheckoutDeliverySection';
import CheckoutOrderSummary from '@/components/Checkout/CheckoutOrderSummary';
import CheckoutForm from '@/components/Forms/CheckoutForm';
import Loader from '@/components/ui/loader';
import { useUserContext } from '@/context/UserContext';
import { useCartStore } from '@/hooks/use-cart';
import { useCheckout } from '@/hooks/useCheckout';
import { useOrderStore } from '@/hooks/useOrder';
import { useAddressStore } from '@/lib/state';
import { OrderItem } from '@/types/order';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useMemo } from 'react';

export default function CheckoutPage() {
  const { userId, loading } = useUserContext();
  const { items } = useCartStore();
  const {
    deliveryAddresses,
    selectedDeliveryAddress,
    setSelectedDeliveryAddress,
    isInitializing,
    isLoading,
    guestDeliveryData,
    setGuestDeliveryData,
    handleGuestDeliverySubmit,
    refreshAddresses,
  } = useCheckout();

  const { getSubTotal, getShippingFee, getTaxFee, getTotal } = useCartStore();
  const subtotal = getSubTotal();
  const shippingCost = getShippingFee();
  const taxAmount = getTaxFee();
  const total = getTotal();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  const { orderId, clientSecret, createOrFetchOrder } = useOrderStore();
  const { isFormValid } = useAddressStore();

  const orderItems: OrderItem[] = useMemo(
    () =>
      items
        .filter((item) => item && (item.product?.id || item.id))
        .map((item) => ({
          productId: item.product?.id,
          product: item.product,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
          price: item.price,
          orderId: '',
          id: '',
        })),
    [items],
  );

  useEffect(() => {
    if (orderItems.length > 0 && createOrFetchOrder) {
      createOrFetchOrder({
        items: orderItems,
        deliveryAddress: userId
          ? {
              deliveryAddressId: selectedDeliveryAddress,
              guestDeliveryAddress: undefined,
            }
          : {
              deliveryAddressId: null,
              guestDeliveryAddress: guestDeliveryData,
            },
        userId,
      });
    }
  }, [
    orderItems,
    userId,
    selectedDeliveryAddress,
    guestDeliveryData,
    createOrFetchOrder,
  ]);

  const options = clientSecret
    ? {
        clientSecret: clientSecret,
        loader: 'auto' as const,
      }
    : undefined;
  
  const guestName = guestDeliveryData.firstName

  if (isInitializing || isLoading || loading) {
    return (
      <div className="mt-28 h-full w-full justify-items-center">
        <Loader size={52} borderWidth="2px" color="black" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <CheckoutDeliverySection
            userId={userId!}
            deliveryAddresses={deliveryAddresses}
            selectedDeliveryAddress={selectedDeliveryAddress}
            setSelectedDeliveryAddress={setSelectedDeliveryAddress}
            guestDeliveryData={guestDeliveryData}
            setGuestDeliveryData={setGuestDeliveryData}
            handleGuestDeliverySubmit={handleGuestDeliverySubmit}
            refreshAddresses={refreshAddresses}
          />

          <div className="flex w-full lg:hidden">
            <CheckoutOrderSummary
              items={items}
              subtotal={subtotal}
              shippingCost={shippingCost}
              taxAmount={taxAmount}
              total={total}
            />
          </div>

          {orderId && clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                orderId={orderId}
                guestName={guestName}
                disabled={userId ? !selectedDeliveryAddress : !isFormValid}
              />
            </Elements>
          )}
        </div>

        <div className="hidden lg:top-10 lg:block">
          <CheckoutOrderSummary
            items={items}
            subtotal={subtotal}
            shippingCost={shippingCost}
            taxAmount={taxAmount}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

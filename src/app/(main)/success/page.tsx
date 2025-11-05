'use client';

import Loader from '@/components/ui/loader';
import { SuccessLottie } from '@/components/ui/lottie';
import { useUserContext } from '@/context/UserContext';
import { useCartStore } from '@/hooks/use-cart';
import { ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const SuccessPageContent = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const { firstName, userId, loading } = useUserContext();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');
  const guestName = searchParams?.get('guest-name');

  if (loading) {
    return (
      <div className="mt-28 h-full w-full justify-items-center">
        <Loader size={52} borderWidth="2px" color="black" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-2 py-20 text-center sm:px-6">
      {/* ✅ Lottie animation */}
      <SuccessLottie />

      <h1 className="mb-4 text-3xl font-medium">
        {`Thanks, ${firstName || guestName}! 🎉`}
      </h1>

      <p className="mb-8 text-gray-600">
        Your order has been confirmed. <br /> A receipt has been sent to your
        email.
      </p>

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <button
          onClick={() => router.push('/')}
          className="flex cursor-pointer items-center justify-center rounded-4xl bg-black px-10 py-3 font-medium text-white shadow-lg transition hover:bg-neutral-900"
        >
          Continue Shopping
          <ArrowRight size={22} className="mt-0.5 ml-2" />
        </button>

        {userId && orderId && (
          <button
            onClick={() => router.push(`/orders/${orderId}`)}
            className="cursor-pointer rounded-4xl border border-neutral-300 px-10 py-3 font-medium text-gray-700 transition hover:border-black hover:text-gray-900"
          >
            Track Order
          </button>
        )}
      </div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="mt-28 h-full w-full justify-items-center">
          <Loader size={52} borderWidth="2px" color="black" />
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;

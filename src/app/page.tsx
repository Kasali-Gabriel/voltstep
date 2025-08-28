'use client';

import { useCartStore } from '@/hooks/use-cart';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('redirect_status') === 'succeeded') {
      clearCart();
      toast.success('Payment successful! Thank you for your purchase.');
    }
  }, [clearCart]);
  return <div className="flex w-full flex-col px-5 sm:px-10 xl:px-12"></div>;
}

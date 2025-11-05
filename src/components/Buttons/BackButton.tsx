'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="flex h-9 w-28 cursor-pointer items-center justify-center rounded-4xl border bg-neutral-950 text-white hover:bg-neutral-800"
    >
      <ArrowLeft className="mr-2 -ml-1 size-5" />
      Back
    </button>
  );
};

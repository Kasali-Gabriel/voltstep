import { Heart } from 'lucide-react';

export const Wishlist = () => {
  return (
    <button className="hidden cursor-pointer md:block">
      <Heart size={20} strokeWidth={1.25} className="h-6 w-6" />
    </button>
  );
};

import axios from '@/lib/axios';
import { WishListItem } from '@/types/wishlist';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUser } from './UserContext';

interface WishlistContextType {
  wishlist: WishListItem[];
  loading: boolean;
  addToWishlist: (item: Omit<WishListItem, 'id'>) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  loading: true,
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  refreshWishlist: async () => {},
});

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useUser();
  const [wishlist, setWishlist] = useState<WishListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const { data } = await axios.get('/api/wishlist', { params: { userId } });
      setWishlist(Array.isArray(data) ? data : []);
    } catch {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (item: Omit<WishListItem, 'id'>) => {
    if (!userId) return;
    await axios.post('/api/wishlist', { ...item, userId });
    await fetchWishlist();
  };

  const removeFromWishlist = async (productId: string) => {
    if (!userId) return;
    await axios.delete('/api/wishlist', { data: { userId, productId } });
    await fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);

import { WishlistContextType, WishListItem } from '@/types/wishlist';
import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUserContext } from './UserContext';

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
  const [wishlist, setWishlist] = useState<WishListItem[]>([]);

  const { userId, loading: isLoading } = useUserContext();

  const [loading, setLoading] = useState(isLoading);

  const fetchWishlist = useCallback(async () => {
    if (!userId) {
      setWishlist([]);
      setLoading(false);
      return;
    }

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

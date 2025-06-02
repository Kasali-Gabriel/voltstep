import axios from '@/lib/axios';
import { useSession } from '@clerk/nextjs';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  userId: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useSession();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      if (!isSignedIn) {
        setUserId(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const { data } = await axios.get('/api/user');

        if (isMounted) setUserId(data?.user?.id ?? null);
      } catch {
        if (isMounted) setUserId(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [isSignedIn]);

  const value = React.useMemo(() => ({ userId, loading }), [userId, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

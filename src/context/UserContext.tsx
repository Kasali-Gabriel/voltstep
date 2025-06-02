import axios from '@/lib/axios';
import { useSession } from '@clerk/nextjs';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  userId: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const { isSignedIn } = useSession();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      if (!isSignedIn) {
        setUserId(null);
        return;
      }

      try {
        const { data } = await axios.get('/api/user');

        if (isMounted) setUserId(data?.user?.id ?? null);
      } catch {
        if (isMounted) setUserId(null);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [isSignedIn]);

  const value = React.useMemo(() => ({ userId }), [userId]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

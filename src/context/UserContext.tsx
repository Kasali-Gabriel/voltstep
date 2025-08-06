// src/context/UserContext.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext<string | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchDatabaseUserId = async () => {
      if (!isLoaded || !user) {
        setUserId(undefined);
        return;
      }

      try {
        const response = await axios.get('/api/user');
        setUserId(response.data.user?.id);
      } catch (error) {
        console.error('Failed to fetch database user ID:', error);
        setUserId(undefined);
      }
    };

    fetchDatabaseUserId();
  }, [user, isLoaded]);

  return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
}

export const useUserId = () => useContext(UserContext);

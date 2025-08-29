// src/context/UserContext.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
  userId?: string;
  stripeCustomerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  img?: string;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [state, setState] = useState<UserContextType>({
    loading: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoaded) {
        setState((prev) => ({ ...prev, loading: true }));
        return;
      }

      if (!user) {
        setState({ loading: false });
        return;
      }

      try {
        const response = await axios.get('/api/user');
        const dbUser = response.data.user;

        setState({
          userId: dbUser?.id,
          stripeCustomerId: dbUser?.stripeCustomerId,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          email: user.primaryEmailAddress?.emailAddress || undefined,
          img: user.imageUrl || undefined,
          loading: false,
        });
      } catch (error) {
        console.error('❌ Failed to fetch database user:', error);
        setState({ loading: false });
      }
    };

    fetchUser();
  }, [user, isLoaded]);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

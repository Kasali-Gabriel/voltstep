// src/context/UserContext.tsx
'use client';

import { createContext, useContext } from 'react';

export interface UserContextType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  user,
  children,
}: {
  user: UserContextType;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

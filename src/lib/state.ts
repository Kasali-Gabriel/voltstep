import { EmailState } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEmailStore = create<EmailState>()(
  persist(
    (set) => ({
      email: '',
      setEmail: (newEmail: string) => set({ email: newEmail }),
    }),
    {
      name: 'emailStorage',
    },
  ),
);

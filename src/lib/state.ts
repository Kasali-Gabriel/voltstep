import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmailState {
  email: string;
  setEmail: (value: string) => void;
}

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

interface BagState {
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
}

export const useBagStore = create<BagState>()((set) => ({
  isBagOpen: false,
  setIsBagOpen: (open: boolean) => set({ isBagOpen: open }),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmailState {
  email: string;
  setEmail: (value: string) => void;
}

interface BagState {
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
}

interface SuccessDialogState {
  showSuccessDialog: boolean;
  setShowSuccessDialog: (open: boolean) => void;
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

export const useBagStore = create<BagState>()((set) => ({
  isBagOpen: false,
  setIsBagOpen: (open: boolean) => set({ isBagOpen: open }),
}));

export const useWishlistSuccessDialogStore = create<SuccessDialogState>()(
  (set) => ({
    showSuccessDialog: false,
    setShowSuccessDialog: (open: boolean) => set({ showSuccessDialog: open }),
  }),
);

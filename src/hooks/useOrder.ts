import { Order } from '@/types/order';
import { OrderState } from '@/types/store';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orderId: null,
      clientSecret: null,
      creatingOrder: false,
      isGuest: true,

      setOrderId: (id) => set({ orderId: id }),
      setClientSecret: (secret) => set({ clientSecret: secret }),
      setCreatingOrder: (val) => set({ creatingOrder: val }),
      setIsGuest: (val) => set({ isGuest: val }),

      resetOrder: () =>
        set({
          orderId: null,
          clientSecret: null,
          isGuest: true,
          creatingOrder: false,
        }),

      createOrFetchOrder: async ({
        deliveryAddress,
        userId,
        stripeCustomerId,
        email,
        totalAmount,
        taxAmount,
        shippingCost,
        items,
      }) => {
        set({ creatingOrder: true });

        try {
          const { orderId: persistedOrderId, isGuest } = get();
          let orderId: string | null = null;

          const fetchOrderSafely = async (id: string) => {
            try {
              const res = await axios.get(`/api/orders/${id}`);
              return res.data?.order as Order | null;
            } catch (err: unknown) {
              if (
                typeof err === 'object' &&
                err !== null &&
                'response' in err &&
                (err as { response?: { status?: number } }).response?.status ===
                  404
              ) {
                // order not found in DB, reset state
                get().resetOrder();
                return null;
              }
              throw err; // network/server error → bubble up
            }
          };

          if (!isGuest && userId) {
            // 🔹 Logged-in user
            if (persistedOrderId) {
              const lastOrder = await fetchOrderSafely(persistedOrderId);

              if (lastOrder?.paymentStatus === 'PENDING') {
                // Reuse & update existing pending order
                await axios.put(`/api/orders/${persistedOrderId}`, {
                  deliveryAddressId: deliveryAddress?.deliveryAddressId,
                  guestDeliveryAddress: deliveryAddress?.guestDeliveryAddress,
                  items,
                  totalAmount,
                  taxAmount,
                  shippingCost,
                  userId,
                  paymentStatus: 'PENDING',
                });
                orderId = persistedOrderId;
              }
            }

            if (!orderId) {
              // Create a new order
              const orderRes = await axios.post('/api/orders', {
                items,
                totalAmount,
                taxAmount,
                shippingCost,
                userId,
                paymentStatus: 'PENDING',
              });
              orderId = orderRes.data?.order?.id ?? null;
            }

            set({ isGuest: false });
          } else {
            // 🔹 Guest user
            if (persistedOrderId) {
              const lastOrder = await fetchOrderSafely(persistedOrderId);

              if (lastOrder?.paymentStatus === 'PENDING') {
                await axios.put(`/api/orders/${persistedOrderId}`, {
                  deliveryAddressId: deliveryAddress?.deliveryAddressId,
                  guestDeliveryAddress: deliveryAddress?.guestDeliveryAddress,
                  items,
                  totalAmount,
                  taxAmount,
                  shippingCost,
                  paymentStatus: 'PENDING',
                });
                orderId = persistedOrderId;
              }
            }

            if (!orderId) {
              const orderRes = await axios.post('/api/orders', {
                items,
                totalAmount,
                taxAmount,
                shippingCost,
                paymentStatus: 'PENDING',
              });
              orderId = orderRes.data?.order?.id ?? null;
              set({ isGuest: true });
            }
          }

          if (!orderId) throw new Error('Failed to resolve orderId');

          const guestEmail = deliveryAddress?.guestDeliveryAddress?.email;

          const stripeRes = await axios.post('/api/stripe', {
            amount: Math.round((totalAmount ?? 0) * 100),
            currency: 'usd',
            orderId,
            customerid: stripeCustomerId,
            email: email || guestEmail,
          });

          const clientSecret = stripeRes.data?.clientSecret ?? null;
          if (!clientSecret) throw new Error('Failed to fetch clientSecret');

          set({ orderId, clientSecret });
        } finally {
          set({ creatingOrder: false });
        }
      },
    }),
    {
      name: 'order-storage',
      partialize: (state): Partial<OrderState> => ({
        orderId: state.orderId,
        clientSecret: state.clientSecret,
        isGuest: state.isGuest,
      }),
    },
  ),
);

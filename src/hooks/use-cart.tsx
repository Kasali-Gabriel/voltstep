import { CartItem, CartState } from '@/types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const isSameVariant = (a: CartItem, b: CartItem) =>
        a.id === b.id &&
        a.selectedSize === b.selectedSize &&
        a.selectedColor === b.selectedColor;

      const getSubTotal = () => {
        return get()
          .items.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0,
          )
          .toFixed(2);
      };

      const getShippingFee = () => {
        const subTotal = parseFloat(getSubTotal());
        const itemCount = get().items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0,
        );
        if (subTotal >= 100) return 0;
        if (itemCount === 1) return 7;
        if (itemCount === 2) return 10;
        return 12.5;
      };

      const getTotal = () => {
        const subTotal = parseFloat(getSubTotal());
        const shipping = getShippingFee();
        return (subTotal + shipping).toFixed(2);
      };

      return {
        items: [],

        // Add item to cart
        addItem: (item) =>
          set((state) => {
            const index = state.items.findIndex((i) => isSameVariant(i, item));

            if (index !== -1) {
              const updatedItems = [...state.items];
              const existing = updatedItems[index];
              const newQuantity = Math.min(
                (existing.quantity || 1) + (item.quantity || 1),
                10,
              );

              if ((existing.quantity || 1) < 10) {
                updatedItems[index] = {
                  ...existing,
                  quantity: newQuantity,
                };

                toast('Quantity updated', {
                  description: (
                    <p>
                      <span className="font-semibold">{item.name}</span>{' '}
                      quantity increased in your bag.
                    </p>
                  ),
                });

                return { items: updatedItems };
              } else {
                toast('Maximum quantity reached', {
                  description: (
                    <p>
                      <span className="font-semibold">{item.name}</span> already
                      at max (10) .
                    </p>
                  ),
                });
                return { items: state.items };
              }
            }

            toast('Added to bag', {
              description: (
                <p>
                  <span className="font-semibold">{item.name}</span> added to
                  your bag.
                </p>
              ),
            });

            return {
              items: [
                ...state.items,
                { ...item, quantity: item.quantity || 1 },
              ],
            };
          }),

        // Increase item quantity
        increaseQuantity: (itemToUpdate) =>
          set((state) => ({
            items: state.items.map((item) =>
              isSameVariant(item, itemToUpdate)
                ? {
                    ...item,
                    quantity: Math.min((item.quantity || 1) + 1, 10),
                  }
                : item,
            ),
          })),

        // Decrease item quantity
        decreaseQuantity: (itemToUpdate) =>
          set((state) => ({
            items: state.items.map((item) =>
              isSameVariant(item, itemToUpdate)
                ? {
                    ...item,
                    quantity: Math.max((item.quantity || 1) - 1, 1),
                  }
                : item,
            ),
          })),

        // Remove item with undo support
        removeItem: (itemToRemove) =>
          set((state) => {
            const itemIndex = state.items.findIndex((i) =>
              isSameVariant(i, itemToRemove),
            );
            if (itemIndex === -1) return state;

            const removedItem = state.items[itemIndex];
            const updatedItems = state.items.filter((_, i) => i !== itemIndex);

            toast('Removed from bag.', {
              description: (
                <p>
                  <span className="font-semibold">{removedItem.name}</span> was
                  removed.
                </p>
              ),
              action: {
                label: 'Undo',
                onClick: () => {
                  const currentItems = get().items;
                  const stillAbsent = !currentItems.some((i) =>
                    isSameVariant(i, removedItem),
                  );

                  if (stillAbsent) {
                    useCartStore.setState({
                      items: [...currentItems, removedItem],
                    });

                    toast(`${removedItem.name} restored to bag.`);
                  }
                },
              },
            });

            return { items: updatedItems };
          }),
        getSubTotal,
        getShippingFee,
        getTotal,
      };
    },
    {
      name: 'cartStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

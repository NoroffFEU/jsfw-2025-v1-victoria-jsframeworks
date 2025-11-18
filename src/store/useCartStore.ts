import { create } from "zustand";

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    clearCart: () => void;
    checkoutSuccess: boolean;
    setCheckoutSuccess: (value: boolean) => void;
    lastOrderItemCount: number;
    setLastOrderItemCount: (count: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],

    addToCart: (item) =>
        set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }

            return {
                items: [...state.items, { ...item, quantity: 1 }],
            };
        }),

    removeFromCart: (id) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),

    increaseQty: (id) =>
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
        })),

    decreaseQty: (id) =>
        set((state) => ({
            items: state.items
                .map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
                .filter((i) => i.quantity > 0),
        })),

    clearCart: () => set({ items: [] }),
        checkoutSuccess: false,
    setCheckoutSuccess: (value) => set({ checkoutSuccess: value }),
    lastOrderItemCount: 0,
    setLastOrderItemCount: (count) => set({ lastOrderItemCount: count }),
}));
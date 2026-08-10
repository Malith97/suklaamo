'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export const MAX_CART_QUANTITY = 10;
export const MAX_CART_QUANTITY_MESSAGE = 'Maximum order quantity is 10 items. Please contact us for larger orders.';

export type CartActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  itemCount: number;
  totalPrice: string;
  addItem: (product: Product, quantity?: number) => CartActionResult;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => CartActionResult;
  clearCart: () => void;
};

const STORAGE_KEY = 'suklaamo-cart-items';

const parsePrice = (price: string) => Number(price.replace(/\D/g, ''));
const formatPrice = (value: number) => `€${value}`;
const successResult = (): CartActionResult => ({ success: true });
const limitResult = (): CartActionResult => ({ success: false, message: MAX_CART_QUANTITY_MESSAGE });

const createCartState = (items: CartItem[]) => {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = formatPrice(items.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0));
  return { items, itemCount, totalPrice };
};

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...createCartState([]),
      addItem: (product, quantity = 1) => {
        const normalizedQuantity = Math.max(1, Math.floor(quantity));
        if (get().itemCount + normalizedQuantity > MAX_CART_QUANTITY) {
          return limitResult();
        }

        const items = get().items;
        const existing = items.find((item) => item.product.id === product.id);
        const nextItems = existing
          ? items.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + normalizedQuantity } : item,
            )
          : [...items, { product, quantity: normalizedQuantity }];

        set(createCartState(nextItems));
        return successResult();
      },
      removeItem: (id) => {
        const nextItems = get().items.filter((item) => item.product.id !== id);
        set(createCartState(nextItems));
      },
      updateQuantity: (id, quantity) => {
        const normalizedQuantity = Math.max(0, Math.floor(quantity));
        const currentItems = get().items;
        const currentItem = currentItems.find((item) => item.product.id === id);
        if (!currentItem) return successResult();

        const currentItemCount = currentItems.reduce((count, item) => count + item.quantity, 0);
        const nextItemCount = currentItemCount - currentItem.quantity + normalizedQuantity;

        if (normalizedQuantity > currentItem.quantity && nextItemCount > MAX_CART_QUANTITY) {
          return limitResult();
        }

        const nextItems = get()
          .items.map((item) => (item.product.id === id ? { ...item, quantity: normalizedQuantity } : item))
          .filter((item) => item.quantity > 0);
        set(createCartState(nextItems));
        return successResult();
      },
      clearCart: () => set(createCartState([])),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          if (typeof window === 'undefined') return null;
          return window.localStorage.getItem(name);
        },
        setItem: (name: string, value: string) => {
          if (typeof window === 'undefined') return value;
          window.localStorage.setItem(name, value);
          return value;
        },
        removeItem: (name: string) => {
          if (typeof window === 'undefined') return name;
          window.localStorage.removeItem(name);
          return name;
        },
      })),
    },
  ),
);

export function CartProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useCart() {
  return useCartStore();
}

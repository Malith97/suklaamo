'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  itemCount: number;
  totalPrice: string;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = 'suklaamo-cart-items';

const parsePrice = (price: string) => Number(price.replace(/\D/g, ''));
const formatPrice = (value: number) => `€${value}`;

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
        const items = get().items;
        const existing = items.find((item) => item.product.id === product.id);
        const nextItems = existing
          ? items.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
            )
          : [...items, { product, quantity }];

        set(createCartState(nextItems));
      },
      removeItem: (id) => {
        const nextItems = get().items.filter((item) => item.product.id !== id);
        set(createCartState(nextItems));
      },
      updateQuantity: (id, quantity) => {
        const nextItems = get()
          .items.map((item) => (item.product.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0);
        set(createCartState(nextItems));
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

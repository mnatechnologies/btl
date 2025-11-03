"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number; // in cents
  image?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number; // in cents
  count: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LS_KEY = "btl_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      const next = existing
        ? prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p))
        : [...prev, item];
      // Fire a lightweight client-side event so UI can show feedback (toast)
      if (typeof window !== 'undefined') {
        try {
          window.dispatchEvent(new CustomEvent('cart:add', { detail: { item } }));
        } catch {}
      }
      return next;
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id: string, qty: number) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)));
  const clear = () => setItems([]);

  const { total, count } = useMemo(() => {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    return { total, count };
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clear, total, count }),
    [items, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

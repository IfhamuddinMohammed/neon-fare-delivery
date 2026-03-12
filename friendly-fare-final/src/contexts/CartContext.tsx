import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '@/types';
import CartDrawer from '@/components/CartDrawer';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  grandTotal: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ff_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ff_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { product, quantity: qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty <= 0) { removeItem(productId); return; }
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => {
    const price = i.product.is_ramzan_offer && i.product.ramzan_price ? i.product.ramzan_price : i.product.price;
    return s + price * i.quantity;
  }, 0);
  const totalSavings = items.reduce((s, i) => {
    const price = i.product.is_ramzan_offer && i.product.ramzan_price ? i.product.ramzan_price : i.product.price;
    return s + (i.product.mrp - price) * i.quantity;
  }, 0);
  const grandTotal = subtotal;

  return (
    <CartContext.Provider value={{ items, totalItems, subtotal, totalSavings, grandTotal, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

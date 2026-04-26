import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface CartItem {
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (title: string) => void;
  updateQuantity: (title: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.title === item.title);
      if (existingItem) {
        toast.success(`Increased ${item.title} quantity`);
        return prev.map(i =>
          i.title === item.title
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      toast.success(`${item.title} added to cart`, { icon: '🛒' });
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (title: string) => {
    setItems(prev => prev.filter(item => item.title !== title));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (title: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(title);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.title === title ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const priceMatch = item.price.match(/[\d,]+/);
      const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

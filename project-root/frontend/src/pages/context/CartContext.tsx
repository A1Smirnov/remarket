// frontend/src/pages/context/CartContext.tsx

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

const CART_STORAGE_KEY = 'cart';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Загрузка корзины из localStorage при монтировании компонента
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Синхронизация добавления товара с сервером
  const syncCartWithBackend = async (productId: string, quantity: number) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn('User ID not found. Skipping server sync.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/cart/${userId}`, {
        productId,
        quantity,
      });
    } catch (error) {
      console.error('Error syncing cart with backend', error);
    }
  };

  // Функция для добавления товара в корзину
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((product) => product._id === item._id);
      if (existingItem) {
        const updatedCart = prevCart.map((product) =>
          product._id === item._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        syncCartWithBackend(item._id, existingItem.quantity + 1); // Синхронизация с сервером
        return updatedCart;
      }

      const newCart = [...prevCart, { ...item, quantity: 1 }];
      syncCartWithBackend(item._id, 1); // Синхронизация с сервером
      return newCart;
    });
  };

  // Функция для удаления товара из корзины
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Функция для обновления количества товара в корзине
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
    syncCartWithBackend(id, Math.max(quantity, 1)); // Синхронизация с сервером
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста корзины
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};




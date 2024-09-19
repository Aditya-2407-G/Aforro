import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const auth = useAuth();
  const userId = auth?.user?.id || 'guest';

  const getCartKey = () => `cart_${userId}`;

  useEffect(() => {
    loadCart();
  }, [userId]);

  useEffect(() => {
    saveCart();
  }, [cart, userId]);

  const loadCart = async () => {
    try {
      const cartKey = getCartKey();
      const storedCart = await SecureStore.getItemAsync(cartKey);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCart([]);
    }
  };

  const saveCart = async () => {
    try {
      const cartKey = getCartKey();
      await SecureStore.setItemAsync(cartKey, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  const addToCart = (item) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(currentCart =>
        currentCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

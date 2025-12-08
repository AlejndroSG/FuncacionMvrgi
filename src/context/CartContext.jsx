"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('mvrgi_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('mvrgi_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('mvrgi_cart');
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, añadir nuevo
        return [...currentCart, { ...product, quantity }];
      }
    });
    setIsOpen(true); // Abrir carrito al añadir
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('mvrgi_cart');
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

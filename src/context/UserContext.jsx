"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const UserContext = createContext();

// Lógica del sistema de puntos
const POINTS_CONFIG = {
  DONATION_MULTIPLIER: 10,      // 1€ = 10 puntos en donaciones
  PURCHASE_MULTIPLIER: 5,       // 1€ = 5 puntos en compras
  TITLE_BONUS: 50,              // 50 puntos extra por comprar título
  POINTS_TO_EURO: 100,          // 100 puntos = 1€ de descuento
};

export function UserProvider({ children }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);

  // Sincronizar usuario con sesión de NextAuth
  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        id: session.user.id
      });
    } else {
      // Si no hay sesión, cargar del localStorage (modo invitado)
      const savedUser = localStorage.getItem('mvrgi_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error('Error loading user:', e);
        }
      }
    }
  }, [session]);

  // Cargar puntos e historial del localStorage
  useEffect(() => {
    const userKey = session?.user?.email || 'guest';
    const savedPoints = localStorage.getItem(`mvrgi_points_${userKey}`);
    const savedHistory = localStorage.getItem(`mvrgi_points_history_${userKey}`);
    
    if (savedPoints) {
      setPoints(parseInt(savedPoints) || 0);
    }
    
    if (savedHistory) {
      try {
        setPointsHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, [session]);

  // Guardar puntos en localStorage (por usuario)
  useEffect(() => {
    const userKey = session?.user?.email || 'guest';
    localStorage.setItem(`mvrgi_points_${userKey}`, points.toString());
  }, [points, session]);

  // Guardar historial en localStorage (por usuario)
  useEffect(() => {
    if (pointsHistory.length > 0) {
      const userKey = session?.user?.email || 'guest';
      localStorage.setItem(`mvrgi_points_history_${userKey}`, JSON.stringify(pointsHistory));
    }
  }, [pointsHistory, session]);

  const addPoints = (amount, type, description) => {
    const newPoints = Math.floor(amount);
    setPoints(current => current + newPoints);
    
    const historyEntry = {
      id: Date.now(),
      points: newPoints,
      type,
      description,
      date: new Date().toISOString()
    };
    
    setPointsHistory(current => [historyEntry, ...current]);
  };

  const redeemPoints = (pointsToRedeem) => {
    if (pointsToRedeem > points) {
      throw new Error('No tienes suficientes puntos');
    }
    
    setPoints(current => current - pointsToRedeem);
    
    const historyEntry = {
      id: Date.now(),
      points: -pointsToRedeem,
      type: 'redeem',
      description: 'Canje de puntos por descuento',
      date: new Date().toISOString()
    };
    
    setPointsHistory(current => [historyEntry, ...current]);
    
    return pointsToRedeem / POINTS_CONFIG.POINTS_TO_EURO;
  };

  const calculatePointsFromDonation = (amount) => {
    return Math.floor(amount * POINTS_CONFIG.DONATION_MULTIPLIER);
  };

  const calculatePointsFromPurchase = (amount, isTitle = false) => {
    const basePoints = Math.floor(amount * POINTS_CONFIG.PURCHASE_MULTIPLIER);
    const bonus = isTitle ? POINTS_CONFIG.TITLE_BONUS : 0;
    return basePoints + bonus;
  };

  const getDiscountFromPoints = (pointsAmount) => {
    return pointsAmount / POINTS_CONFIG.POINTS_TO_EURO;
  };

  const getMaxRedeemablePoints = () => {
    return points;
  };

  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('mvrgi_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mvrgi_user');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        points,
        pointsHistory,
        setUserData,
        logout,
        addPoints,
        redeemPoints,
        calculatePointsFromDonation,
        calculatePointsFromPurchase,
        getDiscountFromPoints,
        getMaxRedeemablePoints,
        POINTS_CONFIG
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

const UserContext = createContext();

// Lógica del sistema de puntos
const POINTS_CONFIG = {
  DONATION_MULTIPLIER: 10, // 1€ = 10 puntos en donaciones
  PURCHASE_MULTIPLIER: 5, // 1€ = 5 puntos en compras
  TITLE_BONUS: 50, // 50 puntos extra por comprar título
  POINTS_TO_EURO: 100, // 100 puntos = 1€ de descuento
};

const normalizeHistory = (history = []) =>
  history.map((entry) => ({
    ...entry,
    date:
      entry.date ||
      entry.created_at ||
      entry.timestamp ||
      new Date().toISOString(),
  }));

const getGuestUser = () => {
  if (typeof window === "undefined") return null;
  const savedUser = localStorage.getItem("mvrgi_user");
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Error loading guest user:", error);
    return null;
  }
};

export function UserProvider({ children }) {
  const supabase = getSupabaseBrowserClient();
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);

  const syncUserFromSession = useCallback((currentSession) => {
    if (currentSession?.user) {
      const metadata = currentSession.user.user_metadata || {};

      setUser({
        name:
          metadata.full_name ||
          metadata.name ||
          currentSession.user.email?.split("@")[0] ||
          "Usuario",
        email: currentSession.user.email,
        image: metadata.avatar_url || null,
        id: currentSession.user.id,
      });
    } else {
      const guestUser = getGuestUser();
      setUser(guestUser);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!supabase) {
      setAuthLoading(false);
      syncUserFromSession(null);
      return () => {
        isMounted = false;
      };
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      syncUserFromSession(data.session);
      setAuthLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        syncUserFromSession(newSession);
      }
    );

    return () => {
      isMounted = false;
      subscription?.subscription?.unsubscribe();
    };
  }, [supabase, syncUserFromSession]);

  const fetchRemotePoints = useCallback(async () => {
    if (!session?.access_token) return;

    try {
      const response = await fetch("/api/points", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener los puntos del servidor");
      }

      const data = await response.json();
      setPoints(data.points ?? 0);
      setPointsHistory(normalizeHistory(data.history ?? []));
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      fetchRemotePoints();
      return;
    }

    const savedPoints = localStorage.getItem("mvrgi_points_guest");
    const savedHistory = localStorage.getItem("mvrgi_points_history_guest");

    setPoints(savedPoints ? parseInt(savedPoints, 10) || 0 : 0);

    if (savedHistory) {
      try {
        setPointsHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading history:", error);
        setPointsHistory([]);
      }
    } else {
      setPointsHistory([]);
    }
  }, [session, fetchRemotePoints]);

  useEffect(() => {
    if (session?.user) return;
    localStorage.setItem("mvrgi_points_guest", points.toString());
  }, [points, session]);

  useEffect(() => {
    if (session?.user) return;
    localStorage.setItem(
      "mvrgi_points_history_guest",
      JSON.stringify(pointsHistory)
    );
  }, [pointsHistory, session]);

  const persistPointsChange = useCallback(
    async (delta, type, description) => {
      if (!session?.access_token) {
        throw new Error(
          "Necesitas iniciar sesión para guardar tus puntos en Supabase."
        );
      }

      const response = await fetch("/api/points", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ delta, type, description }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
          errorBody?.error || "No se pudieron actualizar los puntos"
        );
      }

      const data = await response.json();
      setPoints(data.points ?? 0);
      setPointsHistory(normalizeHistory(data.history ?? []));
      return data;
    },
    [session]
  );

  const addPoints = async (amount, type, description) => {
    const newPoints = Math.floor(amount);
    if (!newPoints) {
      return { points, history: pointsHistory };
    }

    const historyEntry = {
      id: Date.now(),
      points: newPoints,
      type,
      description,
      date: new Date().toISOString(),
    };

    if (session?.user) {
      await persistPointsChange(newPoints, type, description);
      return historyEntry;
    }

    setPoints((current) => current + newPoints);
    setPointsHistory((current) => [historyEntry, ...current]);
    return historyEntry;
  };

  const redeemPoints = async (pointsToRedeem) => {
    if (!Number.isFinite(pointsToRedeem) || pointsToRedeem <= 0) {
      throw new Error("Cantidad de puntos inválida");
    }

    if (!session?.user && pointsToRedeem > points) {
      throw new Error("No tienes suficientes puntos");
    }

    const historyEntry = {
      id: Date.now(),
      points: -pointsToRedeem,
      type: "redeem",
      description: "Canje de puntos por descuento",
      date: new Date().toISOString(),
    };

    if (session?.user) {
      await persistPointsChange(
        -pointsToRedeem,
        "redeem",
        historyEntry.description
      );
    } else {
      setPoints((current) => current - pointsToRedeem);
      setPointsHistory((current) => [historyEntry, ...current]);
    }

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
    localStorage.setItem("mvrgi_user", JSON.stringify(userData));
  };

  const loginWithEmail = async (email, password) => {
    if (!supabase) {
      throw new Error("Supabase no está configurado en el cliente.");
    }

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    setSession(data.session);
    syncUserFromSession(data.session);
    return data;
  };

  const registerWithEmail = async (email, password, name) => {
    if (!supabase) {
      throw new Error("Supabase no está configurado en el cliente.");
    }

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/perfil`
            : undefined,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.session) {
      setSession(data.session);
      syncUserFromSession(data.session);
    }

    return data;
  };

  const loginWithGoogle = async () => {
    if (!supabase) {
      throw new Error("Supabase no está configurado en el cliente.");
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/perfil`
            : undefined,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }

    setSession(null);
    setUser(null);
    setPoints(0);
    setPointsHistory([]);
    localStorage.removeItem("mvrgi_user");
    localStorage.removeItem("mvrgi_points_guest");
    localStorage.removeItem("mvrgi_points_history_guest");
  };

  return (
    <UserContext.Provider
      value={{
        session,
        authLoading,
        user,
        points,
        pointsHistory,
        setUserData,
        logout,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        addPoints,
        redeemPoints,
        calculatePointsFromDonation,
        calculatePointsFromPurchase,
        getDiscountFromPoints,
        getMaxRedeemablePoints,
        POINTS_CONFIG,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

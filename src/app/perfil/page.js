"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { motion } from "motion/react";

export default function PerfilPage() {
  const router = useRouter();
  const { session, authLoading, user, points, pointsHistory, POINTS_CONFIG, getDiscountFromPoints } = useUser();

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [authLoading, session, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#224621]"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }


  const availableDiscount = getDiscountFromPoints(points);

  return (
    <div className="relative min-h-screen text-gray-900">
      <Header />
      
      <div className="mx-auto max-w-6xl px-6 py-32">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Mi Perfil</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* User Info */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="mb-6 h-20 w-20 rounded-full ring-4 ring-white shadow-lg"
                />
              ) : (
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#224621] to-[#1b3819] text-3xl font-bold text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
              )}

              <h2 className="mb-2 text-xl font-bold text-gray-900">
                {user?.name || 'Usuario'}
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                {user?.email || 'No configurado'}
              </p>
              
              <div className="rounded-xl bg-green-50 p-3 text-center">
                <p className="text-xs text-green-800">
                  ✓ Cuenta verificada con Google
                </p>
              </div>
            </div>
          </div>

          {/* Points Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Points Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#224621] to-[#1b3819] p-8 text-white shadow-2xl"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 translate-y-10 -translate-x-10"></div>
              
              <div className="relative z-10">
                <p className="mb-2 text-sm font-semibold text-white/80">Puntos Disponibles</p>
                <p className="mb-6 text-6xl font-bold">{points}</p>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="mb-1 text-xs text-white/80">Equivalente en descuento</p>
                    <p className="text-2xl font-bold">{availableDiscount.toFixed(2)}€</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="mb-1 text-xs text-white/80">Tasa de conversión</p>
                    <p className="text-lg font-bold">{POINTS_CONFIG.POINTS_TO_EURO} pts = 1€</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How to Earn Points */}
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">¿Cómo ganar puntos?</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    💰
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Donaciones</p>
                    <p className="text-sm text-gray-600">
                      {POINTS_CONFIG.DONATION_MULTIPLIER} puntos por cada euro donado
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    🛍️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Compras</p>
                    <p className="text-sm text-gray-600">
                      {POINTS_CONFIG.PURCHASE_MULTIPLIER} puntos por cada euro en souvenirs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    🎖️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Títulos Honoríficos</p>
                    <p className="text-sm text-gray-600">
                      +{POINTS_CONFIG.TITLE_BONUS} puntos bonus al comprar un título
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    🎁
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Canjear Puntos</p>
                    <p className="text-sm text-gray-600">
                      Usa tus puntos como descuento en compras
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Points History */}
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Historial de Puntos</h3>
              
              {pointsHistory.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="mb-2 text-gray-600">Aún no tienes movimientos</p>
                  <p className="text-sm text-gray-500">Haz una donación o compra para empezar a acumular puntos</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pointsHistory.slice(0, 10).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{entry.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className={`text-right ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <p className="text-xl font-bold">
                          {entry.points > 0 ? '+' : ''}{entry.points}
                        </p>
                        <p className="text-xs">puntos</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/donate"
                className="flex items-center justify-between rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg transition-all hover:shadow-xl"
              >
                <div>
                  <p className="mb-1 text-sm font-semibold">Hacer una Donación</p>
                  <p className="text-xs opacity-90">Gana x{POINTS_CONFIG.DONATION_MULTIPLIER} puntos</p>
                </div>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/tienda"
                className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg transition-all hover:shadow-xl"
              >
                <div>
                  <p className="mb-1 text-sm font-semibold">Comprar Souvenirs</p>
                  <p className="text-xs opacity-90">Gana x{POINTS_CONFIG.PURCHASE_MULTIPLIER} puntos</p>
                </div>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

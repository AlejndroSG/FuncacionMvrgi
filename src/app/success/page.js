"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { useUser } from '@/context/UserContext';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const { addPoints, calculatePointsFromDonation, calculatePointsFromPurchase } = useUser();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pointsEarned, setPointsEarned] = useState(0);
  const sessionId = searchParams?.get('session_id');
  const isDemo = searchParams?.get('demo');
  const demoAmount = searchParams?.get('amount');
  const transactionType = searchParams?.get('type'); // 'donation', 'title', 'order'

  useEffect(() => {
    const safeAddPoints = async (points, type, description) => {
      try {
        await addPoints(points, type, description);
      } catch (error) {
        console.error('Error guardando puntos:', error);
      }
    };

    if (isDemo) {
      const amount = parseFloat(demoAmount) || 0;
      setSessionData({ amount: amount * 100, currency: 'eur', demo: true });
      
      // Asignar puntos según el tipo de transacción
      let points = 0;
      let description = '';
      
      if (transactionType === 'title') {
        points = calculatePointsFromPurchase(amount, true);
        description = `Compra de título honorífico - ${amount}€`;
        safeAddPoints(points, 'title', description);
      } else if (transactionType === 'order') {
        points = calculatePointsFromPurchase(amount, false);
        description = `Compra en tienda - ${amount}€`;
        safeAddPoints(points, 'purchase', description);
      } else {
        points = calculatePointsFromDonation(amount);
        description = `Donación - ${amount}€`;
        safeAddPoints(points, 'donation', description);
      }
      
      setPointsEarned(points);
      setLoading(false);
      return;
    }

    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Fetch session details from Stripe
    fetch(`/api/checkout-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(async data => {
        setSessionData(data);
        
        // Asignar puntos automáticamente
        if (data.amount) {
          const amount = data.amount / 100;
          let points = 0;
          let description = '';
          
          if (transactionType === 'title') {
            points = calculatePointsFromPurchase(amount, true);
            description = `Compra de título honorífico - ${amount}€`;
            await safeAddPoints(points, 'title', description);
          } else if (transactionType === 'order') {
            points = calculatePointsFromPurchase(amount, false);
            description = `Compra en tienda - ${amount}€`;
            await safeAddPoints(points, 'purchase', description);
          } else {
            points = calculatePointsFromDonation(amount);
            description = `Donación - ${amount}€`;
            await safeAddPoints(points, 'donation', description);
          }
          
          setPointsEarned(points);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching session:', err);
        setLoading(false);
      });
  }, [sessionId, isDemo, demoAmount, transactionType, addPoints, calculatePointsFromDonation, calculatePointsFromPurchase]);

  return (
    <div className="relative min-h-screen text-gray-900">
      <Header />
      
      <div className="mx-auto max-w-3xl px-6 py-32">
        {loading ? (
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#224621]"></div>
            <p className="mt-4 text-gray-600">Verificando tu donación...</p>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 md:p-12">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
              ¡Gracias por tu generosidad!
            </h1>
            
            {sessionData && !sessionData.demo && (
              <div className="mb-6 text-center">
                <p className="text-lg text-gray-600">Tu donación de</p>
                <p className="text-5xl font-bold text-[#224621]">
                  {(sessionData.amount / 100).toFixed(2)}€
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {sessionData.frequency === 'monthly' ? 'Donación mensual' : 'Donación única'}
                </p>
              </div>
            )}

            {sessionData?.demo && (
              <div className="mb-6 rounded-xl bg-blue-50 p-4 text-center">
                <p className="text-sm text-blue-800">
                  🧪 Modo demo - Esta es una simulación. Configura Stripe para procesar pagos reales.
                </p>
              </div>
            )}

            {pointsEarned > 0 && (
              <div className="mb-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center border-2 border-amber-200">
                <div className="mb-2 text-4xl">🎉</div>
                <p className="mb-2 text-lg font-semibold text-gray-900">¡Has ganado puntos!</p>
                <p className="text-3xl font-bold text-amber-600">+{pointsEarned} puntos</p>
                <p className="mt-2 text-sm text-gray-600">
                  Usa tus puntos para obtener descuentos en futuras compras
                </p>
                <Link
                  href="/perfil"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700"
                >
                  Ver mi perfil
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}

            <div className="mb-8 space-y-4 rounded-2xl bg-gray-50 p-6">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Recibo enviado</p>
                  <p className="text-sm text-gray-600">Hemos enviado un recibo fiscal a tu email. Revisa tu bandeja de entrada.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Pago procesado de forma segura</p>
                  <p className="text-sm text-gray-600">Tu donación ha sido procesada de forma segura por Stripe.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Impacto real</p>
                  <p className="text-sm text-gray-600">Tu contribución ayudará directamente a las familias que más lo necesitan.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#224621] px-8 py-3 text-base font-bold text-white shadow-lg transition-all hover:bg-[#1b3819]"
              >
                Volver al inicio
              </Link>
              <Link
                href="/area-ecologica"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-3 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
              >
                Conoce nuestros proyectos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

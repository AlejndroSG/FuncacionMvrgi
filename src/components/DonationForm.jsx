"use client";

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : Promise.resolve(null);

export default function DonationForm() {
  const [amount, setAmount] = useState('');
  const [preset, setPreset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams?.get('amount');
    if (q) {
      const n = Math.floor(Number(q));
      if (n >= 1) {
        setAmount(String(n));
        setPreset([5, 10, 20, 50].includes(n) ? n : null);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const amountNumber = Math.floor(Number(amount));
    if (!amountNumber || amountNumber < 1) {
      setError('Introduce una cantidad válida (mínimo 1).');
      return;
    }
    setLoading(true);
    try {
      if (!PUBLISHABLE_KEY) {
        window.location.href = `/success?demo=1&amount=${amountNumber}`;
        return;
      }
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ amount: amountNumber, currency: 'eur' }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error creando el pago');
      }
      const data = await res.json();
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (stripeError) setError(stripeError.message || 'Error redirigiendo a Checkout');
    } catch (err) {
      setError(err.message || 'Error creando el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Haz tu donación</h2>
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 20, 50].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => { setPreset(v); setAmount(String(v)); }}
              className={`rounded-full px-4 py-2 text-sm font-medium ring-2 transition-all ${
                preset === v
                  ? 'bg-orange-600 text-white ring-orange-600 shadow-lg'
                  : 'bg-white text-gray-900 ring-orange-200 hover:ring-orange-300'
              }`}
            >
              {v}€
            </button>
          ))}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Cantidad (EUR)</label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">€</span>
            <input
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setPreset(null); }}
              className="w-full rounded-xl border border-gray-200 bg-white/90 py-2 pl-8 pr-3 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
              placeholder="20"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-600" aria-live="polite">{error}</p>}
      <button
        disabled={loading}
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-500/40 disabled:opacity-60"
      >
        {loading ? 'Procesando...' : 'Donar ahora'}
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
      </button>
      <p className="text-xs text-gray-600">{PUBLISHABLE_KEY ? '🔒 Pago procesado por Stripe • Recibo fiscal automático' : '🧪 Modo demo: sin Stripe, te llevamos a la página de éxito.'}</p>
    </form>
  );
}

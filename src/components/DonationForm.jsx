"use client";

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

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
              className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all ${
                preset === v
                  ? 'bg-gray-900 text-white ring-gray-900'
                  : 'bg-white/80 text-gray-900 ring-gray-200 hover:bg-white'
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
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl disabled:opacity-60"
      >
        <span className="relative z-10">{loading ? 'Procesando...' : 'Donar ahora'}</span>
        <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
      <p className="text-xs text-gray-500">🔒 Serás redirigido a Stripe Checkout de forma segura.</p>
    </form>
  );
}

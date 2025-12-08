"use client";

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : Promise.resolve(null);

export default function DonationForm() {
  const [amount, setAmount] = useState('');
  const [preset, setPreset] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [frequency, setFrequency] = useState('one-time');
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

    if (!name.trim()) {
      setError('Introduce tu nombre.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Introduce un email válido.');
      return;
    }

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
        body: JSON.stringify({
          amount: amountNumber,
          currency: 'eur',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          country: country.trim() || undefined,
          frequency,
        }),
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
                  ? 'bg-[#224621] text-white ring-[#224621] shadow-lg'
                  : 'bg-white text-gray-900 ring-[#b3cfb1] hover:ring-[#224621]'
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
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
              placeholder="Tu nombre"
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono (opcional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
              placeholder="+34 600 000 000"
              autoComplete="tel"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">País (opcional)</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
              placeholder="España"
              autoComplete="country-name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Frecuencia</p>
          <div className="grid grid-cols-2 gap-2">
            {[{ value: 'one-time', label: 'Única' }, { value: 'monthly', label: 'Mensual' }].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  frequency === option.value
                    ? 'border-[#224621] bg-[#224621] text-white shadow-lg'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-[#224621]'
                }`}
              >
                <span>{option.label}</span>
                <input
                  type="radio"
                  name="frequency"
                  value={option.value}
                  checked={frequency === option.value}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-600" aria-live="polite">{error}</p>}
      <button
        disabled={loading}
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#224621] px-5 py-3 text-base font-bold text-white shadow-lg shadow-[#224621]/30 transition-all hover:bg-[#1b3819] hover:shadow-xl hover:shadow-[#224621]/40 disabled:opacity-60"
      >
        {loading ? 'Procesando...' : 'Donar ahora'}
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
      </button>
      <p className="text-xs text-gray-600">{PUBLISHABLE_KEY ? '🔒 Pago procesado por Stripe • Recibo fiscal automático' : '🧪 Modo demo: sin Stripe, te llevamos a la página de éxito.'}</p>
    </form>
  );
}

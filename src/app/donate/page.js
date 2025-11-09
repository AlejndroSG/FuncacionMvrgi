import DonationForm from '@/components/DonationForm';
import { Suspense } from 'react';
import Header from '@/components/Header';
import ImpressiveBackground from '@/components/ImpressiveBackground';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Donar - Fundación Mvrgi',
  description: 'Apoya nuestra misión con una donación segura a través de Stripe.',
};

export default function DonatePage() {
  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-12 text-center">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80" 
            alt="Personas ayudando" 
            className="h-full w-full object-cover opacity-[0.06]"
          />
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-block">
            <span className="rounded-full border border-[#b3cfb1] bg-[#f0f5f0]/80 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1b3819] backdrop-blur-sm">
              100% Seguro y transparente
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">Cambia una vida hoy</h1>
          <p className="text-lg text-gray-700">Tu donación llega directamente a familias reales. Sin intermediarios, con total transparencia.</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative px-6 pb-24 mt-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-orange-100 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">¿Por qué donar con nosotros?</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">✓</span>
                  <span><strong>Pago 100% seguro</strong>: Procesado por Stripe, la plataforma de pagos más fiable del mundo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">✓</span>
                  <span><strong>Recibo fiscal automático</strong>: Te llega por email al instante para que puedas deducir tu donación.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">✓</span>
                  <span><strong>Transparencia total</strong>: Recibe actualizaciones reales de cómo tu ayuda cambió vidas.</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-3xl bg-white/80 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
              <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5">
                <Suspense fallback={<div className="h-28 animate-pulse rounded-xl bg-gray-100" /> }>
                  <DonationForm />
                </Suspense>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

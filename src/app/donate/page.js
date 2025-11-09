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
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-block">
            <span className="rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-xs font-medium uppercase tracking-wider text-blue-600 backdrop-blur-sm">
              Donación segura con Stripe
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">Tu ayuda cuenta</h1>
          <p className="text-lg text-gray-600">Cada aporte acelera proyectos reales de educación, vivienda y salud.</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-3xl bg-white/70 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-semibold">Transparencia y confianza</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3"><span>✅</span><span>Pago procesado por Stripe con el máximo nivel de seguridad.</span></li>
                <li className="flex items-start gap-3"><span>✅</span><span>Recibirás confirmación por email y puedes solicitar recibo.</span></li>
                <li className="flex items-start gap-3"><span>✅</span><span>Te informamos del impacto de tu donación periódicamente.</span></li>
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

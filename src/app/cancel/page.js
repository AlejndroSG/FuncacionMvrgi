"use client";

import Link from 'next/link';
import Header from '@/components/Header';

export default function CancelPage() {
  return (
    <div className="relative min-h-screen text-gray-900">
      <Header />
      
      <div className="mx-auto max-w-2xl px-6 py-32">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 md:p-12">
          {/* Cancel Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <svg className="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">
            Donación cancelada
          </h1>
          
          <p className="mb-8 text-center text-lg text-gray-600">
            Has cancelado el proceso de donación. No te preocupes, puedes intentarlo de nuevo cuando quieras.
          </p>

          <div className="mb-8 rounded-2xl bg-blue-50 p-6">
            <p className="text-sm text-blue-900">
              💡 <strong>Tip:</strong> Tu apoyo marca la diferencia. Cada donación, sin importar el monto, ayuda a cambiar vidas.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#224621] px-8 py-3 text-base font-bold text-white shadow-lg transition-all hover:bg-[#1b3819]"
            >
              Intentar de nuevo
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-3 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

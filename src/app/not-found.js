"use client";

import Link from "next/link";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden text-gray-900">
      <Header />
      <ImpressiveBackground />

      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#224621]">
          Error 404
        </p>
        <h1 className="text-4xl font-bold text-[#152b14] sm:text-6xl">
          Ups, esta ruta se perdi? en el camino.
        </h1>
        <p className="mt-6 text-base text-gray-600 sm:text-lg">
          La p?gina que buscas ya no existe o fue movida. Pero tenemos muchos proyectos esperando tu visita.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#224621] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Volver al inicio
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-full border border-[#224621]/20 bg-white px-8 py-3 text-sm font-semibold text-[#224621] shadow-lg transition hover:border-[#224621]/40"
          >
            Apoyar nuestros proyectos
          </Link>
        </div>
      </div>
    </div>
  );
}

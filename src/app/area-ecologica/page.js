"use client";

import Link from "next/link";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function AreaEcologica() {
  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero Section */}
      <section className="relative grid min-h-[70vh] items-center gap-12 overflow-hidden px-6 pt-32 pb-20 lg:grid-cols-2 md:px-25">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#f0f5f0] via-white to-[#eff5fb]" />
        
        <div className="relative z-10 mx-auto max-w-2xl lg:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#d9e7d8] px-4 py-2 text-sm font-semibold text-[#1b3819]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#224621] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#224621]"></span>
            </span>
            Naturaleza y Educación
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Area Ecológica <br/>
            <span className="text-[#224621]">El Taray</span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl">
            Un espacio dedicado a la educación ambiental y la conexión con la naturaleza. Descubre el Aula de la Naturaleza y El Duende de Balerma.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#aula-naturaleza"
              className="inline-flex items-center gap-2 rounded-full bg-[#224621] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#224621]/25 transition-all hover:bg-[#1b3819] hover:shadow-xl hover:shadow-[#224621]/40"
            >
              Aula de la Naturaleza
            </Link>
            <Link
              href="#duende-balerma"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              El Duende de Balerma
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative hidden lg:block">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" 
              alt="Bosque y naturaleza" 
              className="h-[500px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Aula de la Naturaleza Section */}
      <section id="aula-naturaleza" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" 
                    alt="Niños aprendiendo en la naturaleza" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="mb-6 text-4xl font-bold text-gray-900">Aula de la Naturaleza</h2>
                <p className="mb-6 text-lg text-gray-600">
                  Un espacio educativo donde niños y adultos pueden aprender sobre la flora y fauna local. Realizamos talleres, excursiones y actividades prácticas para fomentar el respeto por el medio ambiente.
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-[#224621]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Talleres de reciclaje y sostenibilidad
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-[#224621]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Avistamiento de aves
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-[#224621]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Rutas botánicas guiadas
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* El Duende de Balerma Section */}
      <section id="duende-balerma" className="relative scroll-mt-32 px-6 py-24 bg-[#f0f5f0]">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold text-gray-900">El Duende de Balerma</h2>
                <p className="mb-6 text-lg text-gray-600">
                  Descubre la magia de Balerma a través de nuestras actividades culturales y recreativas. &quot;El Duende&quot; es una iniciativa para recuperar tradiciones y conectar con la historia local en un entorno natural.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="mb-2 font-bold text-gray-900">Leyendas Locales</h3>
                    <p className="text-sm text-gray-600">Rutas nocturnas contando historias y leyendas de la zona.</p>
                  </div>
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="mb-2 font-bold text-gray-900">Gastronomía</h3>
                    <p className="text-sm text-gray-600">Degustación de productos locales y talleres de cocina tradicional.</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80" 
                  alt="Bosque encantado" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

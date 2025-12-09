"use client";

import { useState } from 'react';
import Link from "next/link";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function EstatuaInmaculadaPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const images = [
    {
      url: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1200&q=80",
      alt: "Vista frontal de la Estatua de la Inmaculada Concepción",
      caption: "Vista frontal"
    },
    {
      url: "https://images.unsplash.com/photo-1604608672516-f1b9b1a0d3c7?w=1200&q=80",
      alt: "Detalle del rostro de la estatua",
      caption: "Detalle del rostro"
    },
    {
      url: "https://images.unsplash.com/photo-1605106702842-01a887a31122?w=1200&q=80",
      alt: "Vista lateral de la estatua",
      caption: "Vista lateral"
    },
    {
      url: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=1200&q=80",
      alt: "Estatua iluminada de noche",
      caption: "Iluminación nocturna"
    }
  ];

  const timeline = [
    {
      year: "1950",
      title: "Construcción Original",
      description: "La estatua fue erigida por primera vez en el centro de la localidad, convirtiéndose en un símbolo de fe y comunidad."
    },
    {
      year: "1985",
      title: "Primera Restauración",
      description: "Tras años de exposición a los elementos, se realizó la primera gran restauración para preservar su belleza original."
    },
    {
      year: "2010",
      title: "Renovación Completa",
      description: "Se llevó a cabo una renovación integral, incluyendo la instalación de iluminación artística nocturna."
    },
    {
      year: "2024",
      title: "Proyecto de Conservación",
      description: "Inicio del proyecto de conservación permanente bajo la supervisión de la Fundación Mvrgi."
    }
  ];

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=80" 
            alt="Estatua de la Inmaculada Concepción" 
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e8eaf6] px-4 py-2 text-sm font-semibold text-[#3f51b5]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3f51b5] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3f51b5]"></span>
            </span>
            Proyecto de Restauración - 60% Financiado
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Estatua de la <br/>
            <span className="text-[#3f51b5]">Inmaculada Concepción</span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl mx-auto max-w-2xl">
            Un símbolo de fe, historia y comunidad que necesita restauración urgente. Ayúdanos a preservar este patrimonio para las futuras generaciones.
          </p>

          {/* Progress Bar */}
          <div className="mb-8 mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Progreso de financiación</span>
              <span className="text-2xl font-bold text-[#3f51b5]">60%</span>
            </div>
            <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all" style={{ width: '60%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>7.200€ recaudados</span>
              <span className="font-semibold">Objetivo: 12.000€</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#galeria"
              className="inline-flex items-center gap-2 rounded-full bg-[#3f51b5] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#3f51b5]/25 transition-all hover:bg-[#303f9f] hover:shadow-xl hover:shadow-[#3f51b5]/40"
            >
              Ver Galería
            </a>
            <a
              href="#donar"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Apoyar Conservación
            </a>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="galeria" className="relative scroll-mt-32 px-6 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Estado Actual</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Estas imágenes muestran el estado actual de la estatua y los daños que necesitan restauración urgente.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {/* Main Image */}
            <div className="mb-6 overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={images[selectedImage].url} 
                alt={images[selectedImage].alt}
                className="h-[500px] w-full object-cover"
              />
            </div>

            {/* Image Caption */}
            <div className="mb-8 text-center">
              <p className="text-lg font-semibold text-gray-900">{images[selectedImage].caption}</p>
              <p className="text-sm text-gray-600">{selectedImage + 1} de {images.length}</p>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-xl transition-all ${
                    selectedImage === index 
                      ? 'ring-4 ring-[#3f51b5] shadow-lg' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* History Section */}
      <section className="relative px-6 py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Historia y Necesidad de Restauración</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Un recorrido por la historia de este monumento y por qué necesita restauración urgente.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#3f51b5]/20 hidden lg:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <ScrollReveal key={index}>
                  <div className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className="flex-1">
                      <div className={`rounded-2xl bg-white p-8 shadow-lg ${
                        index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                      }`}>
                        <div className="mb-2 inline-block rounded-full bg-[#3f51b5] px-4 py-1 text-sm font-bold text-white">
                          {item.year}
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden lg:block relative z-10">
                      <div className="h-4 w-4 rounded-full bg-[#3f51b5] ring-4 ring-white shadow-lg"></div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Significance Section */}
      <section className="relative px-6 py-24 bg-white">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="rounded-3xl bg-gradient-to-br from-[#e8eaf6] to-white p-8 md:p-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Por Qué Necesita Restauración</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  La Estatua de la Inmaculada Concepción es un símbolo viviente de nuestra identidad cultural. Durante más de siete décadas, ha sido testigo de celebraciones, procesiones y momentos importantes en la vida de miles de personas.
                </p>
                <p>
                  Sin embargo, el paso del tiempo y la exposición a los elementos han causado daños significativos. La estructura presenta grietas, la pintura se ha deteriorado y algunos elementos decorativos necesitan reparación urgente.
                </p>
                <p>
                  <strong>Con tu ayuda, podremos:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reparar las grietas estructurales</li>
                  <li>Restaurar la pintura original</li>
                  <li>Reemplazar elementos dañados</li>
                  <li>Instalar protección contra la intemperie</li>
                  <li>Mejorar el sistema de iluminación</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donar" className="relative scroll-mt-32 px-6 py-24 bg-gradient-to-br from-[#3f51b5] to-[#303f9f] text-white">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <div className="mb-8">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="mb-4 text-4xl font-bold">Ayuda a Restaurar Este Patrimonio</h2>
              <p className="mx-auto max-w-2xl text-lg text-white/90">
                Necesitamos 12.000€ para completar la restauración. Ya hemos recaudado el 60%. ¡Tu apoyo puede hacer la diferencia!
              </p>
            </div>

            <div className="mb-8 grid gap-6 sm:grid-cols-3 text-left">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">🛠️</div>
                <h3 className="mb-2 font-bold">Mantenimiento</h3>
                <p className="text-sm text-white/80">Limpieza y cuidado regular de la estructura</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">🎨</div>
                <h3 className="mb-2 font-bold">Restauración</h3>
                <p className="text-sm text-white/80">Reparación de daños y desgaste natural</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">💡</div>
                <h3 className="mb-2 font-bold">Iluminación</h3>
                <p className="text-sm text-white/80">Sistema de iluminación artística nocturna</p>
              </div>
            </div>

            <Link
              href="/donate?project=estatua"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#3f51b5] shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Hacer una Donación
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <p className="mt-6 text-sm text-white/70">
              Todas las donaciones son deducibles de impuestos
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

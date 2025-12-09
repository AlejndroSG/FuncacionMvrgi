"use client";

import { useState } from 'react';
import Link from "next/link";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function CoHousingPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/co-housing-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSuccess(true);
      setFormData({ nombre: '', email: '', telefono: '', edad: '', mensaje: '' });
    } catch (err) {
      setError(err.message || 'Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: "🏡",
      title: "Vivienda Compartida",
      description: "Espacios privados y áreas comunes diseñadas para la convivencia y el bienestar."
    },
    {
      icon: "👥",
      title: "Comunidad Activa",
      description: "Actividades sociales, culturales y recreativas para mantener una vida activa."
    },
    {
      icon: "🏥",
      title: "Asistencia Disponible",
      description: "Personal de apoyo disponible para garantizar seguridad y tranquilidad."
    },
    {
      icon: "🌳",
      title: "Entorno Natural",
      description: "Ubicado en un entorno tranquilo con acceso a jardines y áreas verdes."
    },
    {
      icon: "🍽️",
      title: "Comedor Comunitario",
      description: "Comidas saludables preparadas con productos locales y de temporada."
    },
    {
      icon: "🎨",
      title: "Talleres y Actividades",
      description: "Talleres de arte, música, jardinería y más para mantener la mente activa."
    }
  ];

  const gallery = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      alt: "Sala común acogedora"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      alt: "Habitación privada"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      alt: "Jardín comunitario"
    },
    {
      url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      alt: "Comedor compartido"
    }
  ];

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero Section */}
      <section className="relative grid min-h-[70vh] items-center gap-12 overflow-hidden px-6 pt-32 pb-20 lg:grid-cols-2 md:px-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#eff5fb] via-white to-[#f0f5f0]" />
        
        <div className="relative z-10 mx-auto max-w-2xl lg:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e3f2fd] px-4 py-2 text-sm font-semibold text-[#1565c0]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1565c0] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1565c0]"></span>
            </span>
            Proyecto en Desarrollo - 20% Financiado
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Co-housing <br/>
            <span className="text-[#1565c0]">Residencia para Mayores</span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl">
            Queremos crear un nuevo modelo de vivienda colaborativa donde las personas mayores puedan vivir de forma independiente en comunidad. Ayúdanos a hacer realidad este proyecto.
          </p>

          {/* Progress Bar */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Progreso de financiación</span>
              <span className="text-2xl font-bold text-[#1565c0]">20%</span>
            </div>
            <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all" style={{ width: '20%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>9.000€ recaudados</span>
              <span className="font-semibold">Objetivo: 45.000€</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-[#1565c0] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#1565c0]/25 transition-all hover:bg-[#0d47a1] hover:shadow-xl hover:shadow-[#1565c0]/40"
            >
              Solicitar Información
            </a>
            <a
              href="#galeria"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Ver Instalaciones
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative hidden lg:block">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" 
              alt="Co-housing para mayores" 
              className="h-[500px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">¿Qué incluirá el proyecto?</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Un espacio diseñado para que las personas mayores vivan con autonomía, dignidad y en compañía de una comunidad solidaria.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={index}>
                <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg">
                  <div className="mb-4 text-5xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="relative scroll-mt-32 px-6 py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Instalaciones Proyectadas</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Así serán los espacios cómodos y acogedores que crearemos pensando en el bienestar de los futuros residentes.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((image, index) => (
              <ScrollReveal key={index}>
                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="relative scroll-mt-32 px-6 py-24 bg-white">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Muestra tu Interés</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                ¿Te gustaría ser parte de este proyecto cuando se haga realidad? Regístrate y te mantendremos informado del progreso.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl ring-1 ring-gray-100 md:p-12">
              {success ? (
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">¡Solicitud enviada!</h3>
                  <p className="mb-6 text-gray-600">
                    Gracias por tu interés. Nos pondremos en contacto contigo pronto.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1565c0] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#0d47a1]"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
                        placeholder="123 456 789"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Edad (opcional)
                      </label>
                      <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        min="0"
                        max="120"
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
                        placeholder="Edad"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows="5"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
                      placeholder="Cuéntanos más sobre tu interés en el proyecto..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#1565c0] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#1565c0]/25 transition-all hover:bg-[#0d47a1] hover:shadow-xl hover:shadow-[#1565c0]/40 disabled:opacity-60"
                  >
                    {loading ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    Al enviar este formulario, aceptas que nos pongamos en contacto contigo.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

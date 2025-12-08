"use client";

import { useState } from 'react';
import Link from "next/link";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "motion/react";

export default function TitulosPage() {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const titles = [
    {
      id: "benefactor",
      name: "Benefactor de la Fundación",
      price: 50,
      description: "Reconocimiento como benefactor oficial de la Fundación Mvrgi",
      benefits: [
        "Certificado digital personalizado",
        "Mención en nuestra web",
        "Newsletter exclusivo mensual",
        "Invitación a eventos especiales"
      ],
      color: "from-amber-500 to-orange-600",
      icon: "🌟",
      popular: false
    },
    {
      id: "embajador",
      name: "Embajador Cultural",
      price: 100,
      description: "Título de embajador cultural de nuestros proyectos internacionales",
      benefits: [
        "Todo lo del título Benefactor",
        "Certificado físico enviado a domicilio",
        "Placa digital para redes sociales",
        "Acceso prioritario a programas",
        "Descuento 10% en souvenirs"
      ],
      color: "from-blue-500 to-indigo-600",
      icon: "🎖️",
      popular: true
    },
    {
      id: "mecenas",
      name: "Mecenas de las Artes",
      price: 250,
      description: "Máximo reconocimiento como mecenas de nuestros proyectos culturales",
      benefits: [
        "Todo lo del título Embajador",
        "Certificado premium con marco",
        "Nombre en placa física en la fundación",
        "Reunión anual con el equipo directivo",
        "Participación en decisiones de proyectos",
        "Descuento 20% en souvenirs"
      ],
      color: "from-purple-500 to-pink-600",
      icon: "👑",
      popular: false
    }
  ];

  const handlePurchase = async (title) => {
    if (!buyerName || !buyerEmail) {
      alert('Por favor, introduce tu nombre y email');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/purchase-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleId: title.id,
          titleName: title.name,
          price: title.price,
          buyerName,
          buyerEmail
        })
      });

      if (!res.ok) throw new Error('Error al procesar la compra');

      const data = await res.json();
      
      // Redirigir a Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      alert(err.message || 'Error al procesar la compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-purple-50" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-600 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-600"></span>
            </span>
            Títulos Honoríficos Digitales
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Obtén tu <br/>
            <span className="bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">Título Honorífico</span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl mx-auto max-w-2xl">
            Apoya nuestros proyectos y recibe un reconocimiento oficial. Tu contribución ayuda a hacer realidad iniciativas que cambian vidas.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Ver Títulos Disponibles
            </a>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Donar sin Título
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative px-6 py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">¿Cómo funciona?</h2>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Elige tu título", desc: "Selecciona el título que más te guste" },
              { step: "2", title: "Completa el pago", desc: "Pago seguro con Stripe" },
              { step: "3", title: "Recibe tu certificado", desc: "Te lo enviamos por email al instante" }
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="relative scroll-mt-32 px-6 py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Catálogo de Títulos</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Cada título incluye beneficios exclusivos y tu apoyo va directamente a nuestros proyectos.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {titles.map((title, index) => (
              <ScrollReveal key={title.id}>
                <motion.div
                  className={`relative h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ${
                    title.popular ? 'ring-4 ring-amber-400' : ''
                  }`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {title.popular && (
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900">
                      MÁS POPULAR
                    </div>
                  )}

                  {/* Header with gradient */}
                  <div className={`relative h-32 bg-gradient-to-br ${title.color} p-6`}>
                    <div className="text-6xl">{title.icon}</div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">{title.name}</h3>
                    <p className="mb-4 text-sm text-gray-600">{title.description}</p>
                    
                    <div className="mb-6">
                      <div className="mb-2 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">{title.price}€</span>
                        <span className="text-sm text-gray-500">pago único</span>
                      </div>
                    </div>

                    <div className="mb-6 space-y-3">
                      <p className="text-sm font-semibold text-gray-900">Incluye:</p>
                      {title.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedTitle(title)}
                      className={`w-full rounded-full bg-gradient-to-r ${title.color} px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105`}
                    >
                      Obtener Título
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Modal */}
      {selectedTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedTitle(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTitle(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6 text-center">
              <div className="mb-4 text-5xl">{selectedTitle.icon}</div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">{selectedTitle.name}</h3>
              <p className="text-3xl font-bold text-gray-900">{selectedTitle.price}€</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nombre completo (aparecerá en el certificado) *
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email (para enviarte el certificado) *
                </label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <button
                onClick={() => handlePurchase(selectedTitle)}
                disabled={loading || !buyerName || !buyerEmail}
                className={`w-full rounded-full bg-gradient-to-r ${selectedTitle.color} px-6 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50`}
              >
                {loading ? 'Procesando...' : `Pagar ${selectedTitle.price}€`}
              </button>

              <p className="text-center text-xs text-gray-500">
                Pago seguro procesado por Stripe
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="relative px-6 py-24 bg-white">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Preguntas Frecuentes</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {[
              {
                q: "¿Cuándo recibiré mi certificado?",
                a: "Inmediatamente después del pago. Te lo enviamos por email en formato PDF de alta calidad."
              },
              {
                q: "¿El certificado es oficial?",
                a: "Sí, es un reconocimiento oficial de la Fundación Mvrgi con validez legal como título honorífico."
              },
              {
                q: "¿Puedo regalar un título?",
                a: "¡Por supuesto! Solo introduce el nombre de la persona que recibirá el título y tu email para el recibo."
              },
              {
                q: "¿A dónde va mi dinero?",
                a: "El 100% de tu aportación se destina a financiar nuestros proyectos: Área Ecológica, Co-housing, Estatua y Voluntariado."
              }
            ].map((faq, i) => (
              <ScrollReveal key={i}>
                <div className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-100 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <div className="mb-2 text-lg font-semibold">Mvrgi</div>
              <p className="text-sm text-gray-500">Gente normal haciendo cosas normales.</p>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-gray-900">Enlaces</div>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-900">Inicio</Link>
                <Link href="/donate" className="hover:text-gray-900">Donar</Link>
                <Link href="/titulos" className="hover:text-gray-900">Títulos</Link>
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-gray-900">Legal</div>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <Link href="#" className="hover:text-gray-900">Privacidad</Link>
                <Link href="#" className="hover:text-gray-900">Términos</Link>
                <Link href="#" className="hover:text-gray-900">Contacto</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-100 pt-6 text-xs text-gray-500">© {new Date().getFullYear()} Fundación Mvrgi</div>
        </div>
      </footer>
    </div>
  );
}

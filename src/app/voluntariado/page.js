"use client";

import { useState } from 'react';
import Link from "next/link";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";

export default function VoluntariadoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    experiencia: '',
    motivacion: ''
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
      const res = await fetch('/api/voluntariado-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSuccess(true);
      setFormData({ nombre: '', email: '', telefono: '', edad: '', experiencia: '', motivacion: '' });
    } catch (err) {
      setError(err.message || 'Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: "🌍",
      title: "Experiencia Internacional",
      description: "Vive y trabaja en Ecuador, conociendo una nueva cultura y forma de vida."
    },
    {
      icon: "📚",
      title: "Desarrollo Profesional",
      description: "Colabora con el Instituto Cervantes y mejora tus habilidades educativas."
    },
    {
      icon: "🤝",
      title: "Impacto Social",
      description: "Ayuda a comunidades locales mientras desarrollas tu perfil profesional."
    },
    {
      icon: "🏠",
      title: "Alojamiento Incluido",
      description: "Vivienda compartida con otros voluntarios en un entorno seguro."
    },
    {
      icon: "✈️",
      title: "Apoyo Logístico",
      description: "Asistencia con visados, seguros y orientación cultural."
    },
    {
      icon: "🎓",
      title: "Certificación",
      description: "Certificado oficial del Instituto Cervantes al completar el programa."
    }
  ];

  const requirements = [
    "Mayor de 18 años",
    "Nivel intermedio-alto de español",
    "Disponibilidad mínima de 3 meses",
    "Pasaporte vigente",
    "Seguro médico internacional",
    "Actitud positiva y ganas de aprender"
  ];

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero Section */}
      <section className="relative grid min-h-[70vh] items-center gap-12 overflow-hidden px-6 pt-32 pb-20 lg:grid-cols-2 md:px-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e3f2fd] via-white to-[#e8f5e9]" />
        
        <div className="relative z-10 mx-auto max-w-2xl lg:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e3f2fd] px-4 py-2 text-sm font-semibold text-[#1976d2]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1976d2] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1976d2]"></span>
            </span>
            Proyecto en Desarrollo - 30% Financiado
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Voluntariado <br/>
            <span className="text-[#1976d2]">Internacional</span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl">
            Queremos establecer un programa de voluntariado en Ecuador con el Instituto Cervantes. Ayúdanos a crear esta oportunidad de intercambio cultural y desarrollo profesional.
          </p>

          {/* Progress Bar */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Progreso de financiación</span>
              <span className="text-2xl font-bold text-[#1976d2]">30%</span>
            </div>
            <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 transition-all" style={{ width: '30%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>5.400€ recaudados</span>
              <span className="font-semibold">Objetivo: 18.000€</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#inscripcion"
              className="inline-flex items-center gap-2 rounded-full bg-[#1976d2] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#1976d2]/25 transition-all hover:bg-[#1565c0] hover:shadow-xl hover:shadow-[#1976d2]/40"
            >
              Mostrar Interés
            </a>
            <a
              href="#beneficios"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Ver Beneficios
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative hidden lg:block">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80" 
              alt="Voluntarios internacionales" 
              className="h-[500px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="relative scroll-mt-32 px-6 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">¿Qué incluirá el programa?</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Una experiencia completa de voluntariado internacional con todos los apoyos necesarios.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index}>
                <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg">
                  <div className="mb-4 text-5xl">{benefit.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="relative px-6 py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Sobre el Programa</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    El programa de Voluntariado Internacional en Ecuador será una colaboración con el Instituto Cervantes, ofreciendo una experiencia única de intercambio cultural y desarrollo profesional.
                  </p>
                  <p>
                    Los voluntarios trabajarán en proyectos educativos y culturales, apoyando la enseñanza del español y promoviendo el intercambio cultural entre España y Ecuador.
                  </p>
                  <p>
                    <strong>Duración:</strong> Programas de 3, 6 o 12 meses<br/>
                    <strong>Ubicación:</strong> Quito, Ecuador<br/>
                    <strong>Inicio previsto:</strong> Cuando se complete la financiación
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Requisitos</h2>
                <div className="space-y-3">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1976d2] text-white text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Nota:</strong> Los requisitos finales se confirmarán cuando el programa esté completamente financiado.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="inscripcion" className="relative scroll-mt-32 px-6 py-24 bg-white">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Muestra tu Interés</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                ¿Te gustaría ser voluntario cuando este programa se haga realidad? Regístrate y te contactaremos cuando esté disponible.
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
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">¡Registro recibido!</h3>
                  <p className="mb-6 text-gray-600">
                    Gracias por tu interés. Te mantendremos informado sobre el progreso del proyecto.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1976d2] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#1565c0]"
                  >
                    Registrar a otra persona
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
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20"
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
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20"
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
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20"
                        placeholder="123 456 789"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Edad *
                      </label>
                      <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        required
                        min="18"
                        max="99"
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20"
                        placeholder="Edad"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Experiencia previa (opcional)
                    </label>
                    <input
                      type="text"
                      name="experiencia"
                      value={formData.experiencia}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20"
                      placeholder="Ej: Voluntariado en ONG, experiencia docente..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ¿Por qué te interesa este programa? *
                    </label>
                    <textarea
                      name="motivacion"
                      value={formData.motivacion}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20"
                      placeholder="Cuéntanos tu motivación para ser voluntario internacional..."
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
                    className="w-full rounded-full bg-[#1976d2] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#1976d2]/25 transition-all hover:bg-[#1565c0] hover:shadow-xl hover:shadow-[#1976d2]/40 disabled:opacity-60"
                  >
                    {loading ? 'Enviando...' : 'Registrar Interés'}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    Al enviar este formulario, aceptas que te contactemos cuando el programa esté disponible.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
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
                <Link href="/area-ecologica" className="hover:text-gray-900">Área Ecológica</Link>
                <Link href="/co-housing" className="hover:text-gray-900">Co-housing</Link>
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

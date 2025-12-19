"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export default function CoHousingPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/co-housing-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setSuccess(true);
      setFormData({ nombre: "", email: "", telefono: "", edad: "", mensaje: "" });
    } catch (err) {
      setError(err.message || "Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  const generalFeatures = [
    {
      tag: "01",
      title: "Ubicación y entorno",
      description: "Felix, Almería, en un entorno natural mediterráneo y tranquilo.",
    },
    {
      tag: "02",
      title: "Superficie total",
      description: "Aproximadamente 15.000 m2 de complejo residencial.",
    },
    {
      tag: "03",
      title: "90 viviendas",
      description: "Unidades de 60 m2 pensadas para la tercera edad.",
    },
    {
      tag: "04",
      title: "Tipología",
      description:
        "Casas prefabricadas con dos habitaciones, baño adaptado, salón-comedor, cocina y porche.",
    },
    {
      tag: "05",
      title: "Servicios comunes",
      description:
        "Comedor, centro de ocio y estancia diurna, servicio sanitario, farmacia, oratorio, gimnasio y zonas verdes.",
    },
    {
      tag: "06",
      title: "Sostenibilidad y accesibilidad",
      description:
        "Paneles solares, reciclaje de aguas grises, materiales ecológicos y accesibilidad universal.",
    },
  ];

  const justification = [
    {
      tag: "01",
      title: "Clima mediterráneo",
      description:
        "Inviernos suaves y veranos cálidos, con menos riesgos por temperaturas extremas.",
    },
    {
      tag: "02",
      title: "Independencia con apoyo",
      description:
        "Autonomía sin aislamiento: convivencia activa, apoyo mutuo y acceso a servicios esenciales.",
    },
    {
      tag: "03",
      title: "Impacto local",
      description:
        "Generación de empleo en salud, cuidados y hostelería, posicionando a Felix como referente.",
    },
  ];

  const developmentPlan = [
    {
      phase: "Fase 1 (2026)",
      title: "Infraestructura común y primera ocupación",
      items: [
        "Instalación de las primeras 30 viviendas prefabricadas.",
        "Construcción de comedor, farmacia, centro de estancia diurna, centro médico, oratorio y gimnasio.",
        "Sistemas de energía renovable: paneles solares y captación de agua de lluvia.",
        "Accesos, redes de saneamiento y puesta en marcha del complejo.",
        "Primera ocupación de residentes.",
      ],
    },
    {
      phase: "Fase 2 (2027)",
      title: "Crecimiento residencial y espacios verdes",
      items: [
        "Instalación de las siguientes 30 viviendas prefabricadas.",
        "Adecuación de jardines, huertos y senderos.",
        "Segunda ocupación de residentes.",
      ],
    },
    {
      phase: "Fase 3 (2028)",
      title: "Consolidación comunitaria y nuevos programas",
      items: [
        "Instalación de las 30 viviendas restantes.",
        "Ampliación de zonas recreativas y comunitarias.",
        "Nuevos programas de bienestar y actividades.",
        "Tercera ocupación de residentes.",
      ],
    },
  ];

  const housingDesign = [
    "Dos habitaciones adaptadas a necesidades de movilidad reducida.",
    "Baño accesible con barras de apoyo y ducha a ras de suelo.",
    "Salón-comedor integrado con cocina funcional.",
    "Pequeño porche para promover convivencia y contacto con el exterior.",
    "Sistemas de eficiencia energética con paneles solares y almacenamiento.",
  ];

  const sustainability = [
    "Viviendas prefabricadas con materiales ecológicos y bajo impacto ambiental.",
    "Autosuficiencia energética gracias a paneles solares y almacenamiento.",
    "Reciclaje de aguas grises para riego y mantenimiento de zonas verdes.",
    "Sistemas de captación de agua de lluvia.",
    "Accesibilidad universal en todo el complejo residencial.",
  ];

  const services = [
    {
      tag: "01",
      title: "Comedor comunitario",
      description:
        "Alimentación saludable con opción de servicio a domicilio dentro del complejo.",
    },
    {
      tag: "02",
      title: "Centro de ocio y estancia diurna",
      description: "Talleres, actividades y espacios de socialización.",
    },
    {
      tag: "03",
      title: "Servicio sanitario y médico",
      description: "Consultorios, atención primaria y servicio de enfermería.",
    },
    {
      tag: "04",
      title: "Farmacia",
      description: "Acceso cercano a medicamentos y seguimiento farmacéutico.",
    },
    {
      tag: "05",
      title: "Oratorio",
      description: "Espacio de meditación y oración.",
    },
    {
      tag: "06",
      title: "Gimnasio",
      description: "Ejercicios de bajo impacto y programas de rehabilitación.",
    },
    {
      tag: "07",
      title: "Zonas verdes y recreativas",
      description: "Jardines, huertos urbanos y senderos para paseo.",
    },
  ];

  const managementModel = [
    {
      title: "Administración",
      description: "La Fundación MVRGI gestionará el proyecto y sus servicios.",
    },
    {
      title: "Modelo de acceso",
      description: "Régimen de alquiler asequible o cooperativa de vivienda.",
    },
    {
      title: "Participación comunitaria",
      description: "Programas de apoyo mutuo entre residentes.",
    },
    {
      title: "Sostenibilidad financiera",
      description: "Donaciones, subsidios, fondos europeos y aportaciones de residentes.",
    },
  ];

  const gallery = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      alt: "Sala común luminosa",
    },
    {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      alt: "Vivienda accesible",
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      alt: "Jardín comunitario",
    },
    {
      url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      alt: "Comedor y encuentro",
    },
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
            Felix, Almería · 2026-2028
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Co-housing para mayores <br />
            <span className="text-[#1565c0]">en Felix, Almería</span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl">
            Un conjunto residencial con viviendas independientes, espacios comunes
            y servicios esenciales. Diseñado para vivir con autonomía y compañía,
            en un entorno natural y sostenible.
          </p>

          {/* Progress Bar */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Progreso de financiación</span>
              <span className="text-2xl font-bold text-[#1565c0]">20%</span>
            </div>
            <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all"
                style={{ width: "20%" }}
              ></div>
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
              Quiero información
            </a>
            <a
              href="#galeria"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Ver espacios
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

      {/* Introduction Section */}
      <section
        id="introduccion"
        className="relative scroll-mt-32 bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              El proyecto
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                La Fundación MVRGI impulsa un co-housing para personas de la tercera
                edad en Felix, Almería. Un modelo que combina independencia con vida
                en comunidad, en un entorno tranquilo y cuidado.
              </p>
              <p>
                El complejo se desarrollará en tres fases entre 2026 y 2028.
                Contará con 90 viviendas prefabricadas de 60 m2 y un conjunto de
                servicios comunes pensados para la vida diaria.
              </p>
              <p>
                Todas las viviendas serán autosuficientes y ecosostenibles, con
                paneles solares, eficiencia energética y reciclaje de aguas grises
                para cuidar de las personas y del entorno.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Justification Section */}
      <section
        id="justificacion"
        className="relative scroll-mt-32 bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Por qué Felix
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Clima, entorno y una necesidad real de alternativas habitacionales
                para mayores.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {justification.map((item) => (
              <ScrollReveal key={item.title}>
                <div className="rounded-2xl bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#1565c0]/20 text-xs font-semibold tracking-[0.2em] text-[#1565c0]">
                    {item.tag}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* General Features Section */}
      <section
        id="caracteristicas"
        className="relative scroll-mt-32 bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Datos clave del proyecto
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Dimensión, tipología y servicios del complejo residencial.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {generalFeatures.map((feature) => (
              <ScrollReveal key={feature.title}>
                <div className="rounded-2xl bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#1565c0]/20 text-xs font-semibold tracking-[0.2em] text-[#1565c0]">
                    {feature.tag}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Development Plan Section */}
      <section id="plan" className="relative scroll-mt-32 bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Plan de desarrollo por fases
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Calendario 2026-2028 con ocupación progresiva y más servicios.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {developmentPlan.map((phase) => (
              <ScrollReveal key={phase.phase}>
                <div className="flex h-full flex-col rounded-2xl bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-[#1565c0]">
                    {phase.phase}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    {phase.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#1565c0]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Housing Design Section */}
      <section
        id="viviendas"
        className="relative scroll-mt-32 bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Las viviendas
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Espacios accesibles, cómodos y pensados para la vida diaria.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <ScrollReveal>
              <div className="rounded-2xl bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 backdrop-blur-sm">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Distribución y accesibilidad
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {housingDesign.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#1565c0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-2xl bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 backdrop-blur-sm">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Eficiencia y sostenibilidad
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {sustainability.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#1565c0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        className="relative scroll-mt-32 bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Servicios compartidos
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Infraestructuras para la salud, la convivencia y el bienestar diario.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ScrollReveal key={service.title}>
                <div className="rounded-2xl bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#1565c0]/20 text-xs font-semibold tracking-[0.2em] text-[#1565c0]">
                    {service.tag}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Management Model Section */}
      <section
        id="gestion"
        className="relative scroll-mt-32 bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Modelo de gestión y acceso
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Gestión sostenible con participación comunitaria y acceso asequible.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {managementModel.map((item) => (
              <ScrollReveal key={item.title}>
                <div className="rounded-2xl bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 backdrop-blur-sm">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="relative scroll-mt-32 bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Ambientes previstos
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Referencias visuales para la atmósfera y el estilo del proyecto.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((image) => (
              <ScrollReveal key={image.url}>
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
      <section
        id="contacto"
        className="relative scroll-mt-32 bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                ¿Quieres saber más?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Déjanos tus datos y te informaremos del avance y próximos pasos
                del proyecto.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl ring-1 ring-gray-100 md:p-12">
              {success ? (
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-12 w-12 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    ¡Gracias por tu interés!
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Te contactaremos en cuanto tengamos novedades del proyecto.
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
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
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
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
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
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
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
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
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
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/20"
                      placeholder="Cuéntanos qué te gustaría saber del proyecto..."
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
                    {loading ? "Enviando..." : "Enviar interés"}
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

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

export default function ProjectsShowcase() {
  const projects = [
    {
      id: "area-ecologica",
      title: "Área Ecológica El Taray",
      description: "Crear un espacio de educación ambiental con Aula de la Naturaleza y actividades culturales.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      color: "from-green-500 to-emerald-600",
      icon: "🌳",
      link: "/area-ecologica",
      stats: {
        label: "Objetivo",
        value: "25.000€"
      },
      progress: 45
    },
    {
      id: "voluntariado",
      title: "Voluntariado Internacional",
      description: "Establecer programa de voluntariado en Ecuador con el Instituto Cervantes para intercambio cultural.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      color: "from-blue-500 to-cyan-600",
      icon: "🌍",
      link: "/voluntariado",
      stats: {
        label: "Objetivo",
        value: "18.000€"
      },
      progress: 30
    },
    {
      id: "estatua",
      title: "Estatua Inmaculada Concepción",
      description: "Restaurar y preservar nuestro patrimonio cultural. Un proyecto de conservación histórica.",
      image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80",
      color: "from-purple-500 to-indigo-600",
      icon: "🗿",
      link: "/estatua-inmaculada",
      stats: {
        label: "Objetivo",
        value: "12.000€"
      },
      progress: 60
    },
    {
      id: "cohousing",
      title: "Co-housing para Mayores",
      description: "Construir vivienda colaborativa donde personas mayores vivan independientes en comunidad.",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      color: "from-orange-500 to-red-600",
      icon: "🏡",
      link: "/co-housing",
      stats: {
        label: "Objetivo",
        value: "45.000€"
      },
      progress: 20
    }
  ];

  return (
    <section className="relative px-6 py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-[#224621]/10 px-4 py-2 text-sm font-semibold text-[#224621]">
              Proyectos en Desarrollo
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              ¿Dónde va tu dinero?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Cada euro que donas ayuda a hacer realidad estos proyectos. Elige el que más te inspire o apoya a todos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id}>
              <Link href={project.link}>
                <motion.div
                  className="group relative h-full overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-2xl"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}></div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-2xl shadow-lg">
                      {project.icon}
                    </div>

                    {/* Progress Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="rounded-lg bg-white/95 backdrop-blur-sm px-3 py-2 shadow-lg">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-gray-600">{project.stats.label}</span>
                          <span className="font-bold text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                          <div 
                            className={`h-full bg-gradient-to-r ${project.color} transition-all`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-[#224621] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#224621] group-hover:gap-3 transition-all">
                      Ver proyecto
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-[#224621] to-[#1b3819] p-8 text-white shadow-xl sm:flex-row sm:gap-6">
              <div className="flex-1 text-left">
                <h3 className="mb-2 text-2xl font-bold">¿Quieres hacer realidad todos los proyectos?</h3>
                <p className="text-white/90">Tu donación se distribuye entre los proyectos que más lo necesitan para hacerse realidad.</p>
              </div>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#224621] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Donar Ahora
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

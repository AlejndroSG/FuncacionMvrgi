"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsShowcase() {
  const { dictionary } = useLanguage();
  const projectsCopy = dictionary?.projects ?? {};
  const projects = projectsCopy.items ?? [];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            {projectsCopy.badge && (
              <div className="mb-4 inline-block rounded-full bg-[#224621]/10 px-4 py-2 text-sm font-semibold text-[#224621]">
                {projectsCopy.badge}
              </div>
            )}
            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              {projectsCopy.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {projectsCopy.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ScrollReveal key={project.id}>
              <Link href={project.link}>
                <motion.div
                  className="group relative h-full overflow-hidden rounded-2xl bg-white/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg backdrop-blur-sm">
                      {project.icon}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="rounded-lg bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-gray-600">
                            {project.stats?.label}
                          </span>
                          <span className="font-bold text-gray-900">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full bg-gradient-to-r ${project.color} transition-all`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#224621]">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#224621] transition-all group-hover:gap-3">
                      {projectsCopy.viewProject || "Ver proyecto"}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 transition-opacity group-hover:opacity-10`}
                  />
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {projectsCopy.cta && (
          <ScrollReveal>
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-[#224621] to-[#1b3819] p-8 text-white shadow-xl sm:flex-row sm:gap-6">
                <div className="flex-1 text-left">
                  <h3 className="mb-2 text-2xl font-bold">
                    {projectsCopy.cta.title}
                  </h3>
                  <p className="text-white/90">{projectsCopy.cta.description}</p>
                </div>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#224621] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  {projectsCopy.cta.button}
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

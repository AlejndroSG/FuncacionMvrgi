"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { user, points, logout } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const projectsRef = useRef(null);
  const isClient = typeof window !== "undefined";

  const navigation = useMemo(
    () => [
      { href: "/#impacto", label: "Impacto" },
      { href: "/#como-funciona", label: "Metodologia" },
      { href: "/#donar-rapido", label: "Donar" },
      { href: "/#testimonios", label: "Historias" },
      { href: "/#nosotros", label: "Nosotros" }
    ],
    []
  );

  const featuredProjects = useMemo(
    () => [
      { value: "/area-ecologica", label: "Area Ecologica" },
      { value: "/voluntariado", label: "Voluntariado" },
      { value: "/estatua-inmaculada", label: "Estatua Inmaculada" },
      { value: "/co-housing", label: "Co-housing" }
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setProjectsOpen(false);
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const portal = (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-[radial-gradient(circle_at_top,_rgba(12,58,31,1)),radial-gradient(circle_at_80%_20%,_rgba(13,59,102,0.12),_transparent_50%),linear-gradient(180deg,_rgba(249,252,255,1),_rgba(233,243,238,1))] text-white md:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex h-full w-full flex-col px-8 pb-8 pt-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-white/50">Menú</p>
                <h2 className="mt-3 text-3xl font-semibold">Navega rápido</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/20 p-2 text-white/80 transition hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-evenly">
              <div className="w-full max-w-sm space-y-3 text-center">
                {navigation.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push(item.href);
                    }}
                    className="w-full rounded-3xl bg-white/10 px-5 py-4 text-lg font-semibold text-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition hover:bg-white/15"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="w-full max-w-sm space-y-2 text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Proyectos</p>
                <div className="grid grid-cols-2 gap-3">
                  {featuredProjects.map((project) => (
                    <button
                      key={project.value}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push(project.value);
                      }}
                      className="rounded-3xl border border-white/20 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                    >
                      {project.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm space-y-3 text-center">
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-[#224621] via-[#1e4e75] to-[#224621] px-5 py-4 text-sm font-semibold text-white shadow-xl"
              >
                Donar ahora
              </Link>
              {user ? (
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                  }}
                  className="w-full rounded-3xl border border-white/20 px-5 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Cerrar Sesion
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-3xl border border-white/20 px-5 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Iniciar Sesion
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-4 left-1/2 z-40 -translate-x-1/2 px-4 transition-all duration-300 ${
          scrolled ? "w-full max-w-5xl" : "w-full max-w-6xl"
        }`}
      >
        <nav
          className={`relative rounded-full border border-white/35 p-1 transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-[32px] shadow-[0_25px_80px_rgba(8,23,45,0.18)]"
              : "backdrop-blur-[24px] shadow-[0_12px_45px_rgba(8,23,45,0.12)]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-white/25" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/40 via-transparent to-white/40" />
          <div className="pointer-events-none absolute inset-[1px] rounded-full border border-white/45" />
          <div className="relative z-10 flex items-center justify-between gap-4 px-5 py-2">
            <motion.div
              onMouseEnter={() => setLogoExpanded(true)}
              onMouseLeave={() => setLogoExpanded(false)}
              className="relative"
              animate={{ width: logoExpanded ? 170 : 70 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link href="/" className="block text-xl font-semibold tracking-tight text-slate-900">
                <div className="relative h-7 overflow-hidden">
                  <motion.span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                    animate={{ opacity: logoExpanded ? 0 : 1, scale: logoExpanded ? 0.8 : 1 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Mvrgi
                  </motion.span>
                  <motion.span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                    animate={{ opacity: logoExpanded ? 1 : 0, scale: logoExpanded ? 1 : 0.8 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Fundacion Mvrgi
                  </motion.span>
                </div>
              </Link>
            </motion.div>

            <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
                  {item.label}
                </Link>
              ))}
              <motion.div
                className="relative"
                ref={projectsRef}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setProjectsOpen((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-full border border-white/50 px-5 py-2 text-sm font-semibold backdrop-blur transition ${
                    projectsOpen ? "bg-white/90 text-slate-900" : "bg-white/70 text-slate-700 hover:bg-white"
                  }`}
                >
                  Proyectos
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: projectsOpen ? 180 : 0, y: projectsOpen ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-slate-500"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {projectsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/60 bg-white/95 p-2 text-left text-sm text-slate-700 shadow-2xl backdrop-blur"
                    >
                      {featuredProjects.map((project) => (
                        <li key={project.value}>
                          <button
                            type="button"
                            onClick={() => {
                              setProjectsOpen(false);
                              router.push(project.value);
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium transition-colors hover:bg-slate-100"
                          >
                            {project.label}
                            <span className="text-xs text-slate-400">↗</span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/donate"
                className="rounded-full bg-gradient-to-r from-[#224621] via-[#1e4e75] to-[#224621] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(34,70,33,0.3)] ring-1 ring-white/40 transition-all hover:scale-105"
              >
                Donar
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur"
                  >
                    <img
                      src={user?.image || "/default-avatar.png"}
                      alt={user?.name || "Usuario"}
                      className="h-8 w-8 rounded-full ring-2 ring-white/70"
                    />
                    <span className="hidden sm:block">{points} pts</span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/50 bg-white/90 p-2 shadow-xl backdrop-blur"
                      >
                        <Link
                          href="/perfil"
                          onClick={() => setUserMenuOpen(false)}
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-white"
                        >
                          Mi Perfil
                        </Link>
                        <Link
                          href="/tienda"
                          onClick={() => setUserMenuOpen(false)}
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-white"
                        >
                          Tienda
                        </Link>
                        <button
                          type="button"
                          onClick={async () => {
                            setUserMenuOpen(false);
                            await logout();
                          }}
                          className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                        >
                          Cerrar Sesion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full border border-white/50 bg-white/70 px-6 py-2.5 text-sm font-semibold text-gray-900 backdrop-blur transition-all hover:bg-white"
                >
                  Iniciar Sesion
                </Link>
              )}

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-700 backdrop-blur transition hover:bg-white md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Abrir menú</span>
                <div className="space-y-1.5">
                  <span className="block h-0.5 w-6 bg-current"></span>
                  <span className="block h-0.5 w-6 bg-current"></span>
                  <span className="block h-0.5 w-6 bg-current"></span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {isClient && createPortal(portal, document.body)}
    </>
  );
}

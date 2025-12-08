"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { data: session } = useSession();
  const { points } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        scrolled ? "w-[90%] max-w-5xl" : "w-[95%] max-w-6xl"
      }`}
    >
      <nav
        className={`relative rounded-full border border-white/30 p-1 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-2xl bg-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "backdrop-blur-xl bg-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 rounded-full bg-white/15 ${
            scrolled ? "opacity-100" : "opacity-80"
          }`}
        />
        <div className="relative z-10 flex items-center justify-between px-5 py-2">
          <motion.div
            onMouseEnter={() => setLogoExpanded(true)}
            onMouseLeave={() => setLogoExpanded(false)}
            className="relative"
            animate={{
              width: logoExpanded ? 170 : 65
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link 
              href="/" 
              className="block text-xl font-semibold tracking-tight"
            >
              <div className="relative h-7 overflow-hidden">
                <motion.span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  animate={{ 
                    opacity: logoExpanded ? 0 : 1,
                    scale: logoExpanded ? 0.8 : 1
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  Mvrgi
                </motion.span>
                <motion.span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                  animate={{ 
                    opacity: logoExpanded ? 1 : 0,
                    scale: logoExpanded ? 1 : 0.8
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  Fundación Mvrgi
                </motion.span>
              </div>
            </Link>
          </motion.div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/area-ecologica" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Area Ecológica
            </Link>
            <Link href="/#como-funciona" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Cómo funciona
            </Link>
            <Link href="/#impacto" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Impacto
            </Link>
            <Link href="/#testimonios" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Testimonios
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/#nosotros" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Nosotros
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="rounded-full bg-[#224621] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#224621]/20 transition-all hover:scale-105 hover:bg-[#1b3819] hover:shadow-lg hover:shadow-[#224621]/30"
            >
              Donar
            </Link>

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/80"
                >
                  <img
                    src={session.user?.image || '/default-avatar.png'}
                    alt={session.user?.name || 'Usuario'}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-semibold text-gray-900">
                    {points} pts
                  </span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5"
                    >
                      <Link
                        href="/perfil"
                        onClick={() => setUserMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        href="/tienda"
                        onClick={() => setUserMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Tienda
                      </Link>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full border-2 border-gray-300 bg-white/50 px-6 py-2.5 text-sm font-semibold text-gray-900 backdrop-blur-sm transition-all hover:bg-white/80"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

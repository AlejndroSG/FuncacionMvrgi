"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
          className={`pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 ${
            scrolled ? "opacity-100" : "opacity-80"
          }`}
        />
        <div className="relative z-10 flex items-center justify-between px-5 py-2">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Mvrgi
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#como-funciona" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Cómo funciona
            </Link>
            <Link href="#impacto" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Impacto
            </Link>
            <Link href="#testimonios" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Testimonios
            </Link>
            <Link href="#faq" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              FAQ
            </Link>
            <Link href="#nosotros" className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
              Nosotros
            </Link>
          </div>

          <Link
            href="/donate"
            className="rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-md shadow-purple-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
          >
            Donar
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}

"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { dictionary } = useLanguage();
  const footerCopy = dictionary?.footer ?? {};
  const quickLinks = footerCopy.links ?? [];
  const contactInfo = footerCopy.contact ?? [];

  return (
    <footer className="relative overflow-hidden bg-[#08131c] text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-[#224621]/40 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#1b3f74]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs tracking-wide text-white/80">
              {footerCopy.tagline}
            </div>
            <h3 className="text-2xl font-bold">{footerCopy.title}</h3>
            <p className="mt-4 text-sm text-white/70">{footerCopy.description}</p>
            <div className="mt-6 flex gap-3">
              {["Twitter", "Instagram", "LinkedIn"].map((network) => (
                <button
                  key={network}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/60 transition hover:border-white/60 hover:text-white"
                >
                  {network}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/70">
              {footerCopy.navTitle}
            </p>
            <div className="mt-5 grid gap-3 text-sm text-white/80">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/70">
              {footerCopy.contactTitle}
            </p>
            <div className="mt-5 grid gap-4 text-sm text-white/80">
              {contactInfo.map((info) => (
                <div key={info.label}>
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    {info.label}
                  </p>
                  <p className="font-semibold">{info.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
              <p className="font-semibold text-white">{footerCopy.ctaTitle}</p>
              <p className="mt-2 text-white/70">{footerCopy.ctaDescription}</p>
              <Link
                href="/donate"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8ee89a]"
              >
                {footerCopy.ctaButton}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/60">
          © {currentYear} {footerCopy.tagline} · {footerCopy.legal}
        </div>
      </div>
    </footer>
  );
}

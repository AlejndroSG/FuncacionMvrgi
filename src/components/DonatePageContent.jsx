"use client";

import { Suspense } from "react";
import Link from "next/link";
import DonationForm from "@/components/DonationForm";
import Header from "@/components/Header";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function DonatePageContent() {
  const { dictionary } = useLanguage();
  const donateCopy = dictionary?.donation ?? {};

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      <section className="relative px-6 pt-32 pb-12 text-center">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80"
            alt="Solidarity"
            className="h-full w-full object-cover opacity-[0.06]"
          />
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-block">
            <span className="rounded-full border border-[#b3cfb1] bg-[#f0f5f0]/80 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1b3819] backdrop-blur-sm">
              {donateCopy.hero?.badge}
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
            {donateCopy.hero?.title}
          </h1>
          <p className="text-lg text-gray-700">{donateCopy.hero?.description}</p>
        </div>
      </section>

      <section className="relative mt-20 px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-orange-100 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {donateCopy.hero?.title}
              </h2>
              <ul className="space-y-4 text-gray-700">
                {donateCopy.reasons?.map((reason) => (
                  <li key={reason.title} className="flex items-start gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>
                      <strong>{reason.title}</strong>: {reason.description}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-sm text-gray-500">
                <Link href="/#transparencia" className="underline">
                  {dictionary?.home?.transparency?.cta}
                </Link>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-3xl bg-white/80 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
              <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5">
                <Suspense fallback={<div className="h-28 animate-pulse rounded-xl bg-gray-100" />}>
                  <DonationForm />
                </Suspense>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

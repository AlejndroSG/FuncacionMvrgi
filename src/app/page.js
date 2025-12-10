"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const statsRef = useRef(null);
  const [quickAmount, setQuickAmount] = useState(20);
  const { dictionary } = useLanguage();
  const homeCopy = dictionary?.home ?? {};
  const hero = homeCopy.hero ?? {};
  const metrics = homeCopy.metrics ?? {};
  const steps = homeCopy.steps ?? {};
  const quickDonate = homeCopy.quickDonate ?? {};
  const visuals = homeCopy.visuals ?? [];
  const partnersCopy = homeCopy.partners ?? {};
  const transparency = homeCopy.transparency ?? {};
  const testimonials = homeCopy.testimonials ?? {};
  const about = homeCopy.about ?? {};
  const faq = homeCopy.faq ?? {};
  const finalCta = homeCopy.finalCta ?? {};

  useEffect(() => {
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll(".counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
          },
        });
      });
    }
  }, []);

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      <section className="relative grid min-h-screen items-center gap-12 overflow-hidden px-6 pt-32 pb-20 md:px-25 lg:grid-cols-2">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#f0f5f0] via-white to-[#eff5fb]" />

        <div className="relative z-10 mx-auto max-w-2xl lg:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#d9e7d8] px-4 py-2 text-sm font-semibold text-[#1b3819]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#224621] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#224621]"></span>
            </span>
            {hero.badge}
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            {hero.eyebrow}
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            {hero.title?.line1}
            <br />
            <span className="text-[#224621]">{hero.title?.highlight}</span>{" "}
            {hero.title?.line2}
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl">{hero.description}</p>

          <div className="mb-8 flex flex-wrap gap-4">
            {hero.bullets?.map((bullet) => (
              <div key={bullet} className="flex items-center gap-2 text-sm text-gray-700">
                <svg
                  className="h-5 w-5 text-[#224621]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-[#224621] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#224621]/25 transition-all hover:bg-[#1b3819] hover:shadow-xl hover:shadow-[#224621]/40"
            >
              {hero.primaryCta}
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/#impacto"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                alt="Community support"
                className="h-[600px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
            {hero.card && (
              <div className="absolute -bottom-8 -left-8 rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-2 text-3xl font-bold text-[#224621]">
                  {hero.card.value}
                </div>
                <p className="text-sm font-semibold text-gray-900">{hero.card.label}</p>
                <p className="text-xs text-gray-500">{hero.card.detail}</p>
              </div>
            )}
            <div className="absolute -top-4 -right-4 rounded-full bg-[#215597] p-4 shadow-lg">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="impacto" ref={statsRef} className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{metrics.title}</h2>
            <p className="mt-2 text-gray-600">{metrics.subtitle}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {metrics.items?.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#d9e7d8] bg-white p-8"
              >
                <div
                  className={`mb-3 text-5xl font-bold text-[#224621] ${
                    item.suffix?.includes("%") ? "text-[#224621]" : ""
                  }`}
                >
                  <span className="counter" data-target={item.value}>
                    0
                  </span>
                  {item.suffix}
                </div>
                <p className="mb-1 font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              {steps.title}
            </h2>
            <p className="text-lg text-gray-600">{steps.subtitle}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.items?.map((item, index) => (
              <div key={item.title}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#224621] text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-20 grid gap-6 sm:grid-cols-2">
              {visuals.map((visual) => (
                <div
                  key={visual.image}
                  className="relative aspect-video overflow-hidden rounded-3xl shadow-xl"
                >
                  <img
                    src={visual.image}
                    alt={visual.caption}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm font-semibold text-white">{visual.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="donar-rapido" className="relative scroll-mt-32 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[#b3cfb1] bg-linear-to-br from-[#f0f5f0] to-white p-8 sm:p-12">
            <div className="mb-8">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                {quickDonate.title}
              </h3>
              <p className="text-gray-600">{quickDonate.description}</p>
            </div>
            <div className="mb-6 flex flex-wrap gap-3">
              {[5, 10, 20, 50].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setQuickAmount(value)}
                  className={`rounded-lg border-2 px-6 py-3 font-bold transition-all ${
                    quickAmount === value
                      ? "border-[#224621] bg-[#224621] text-white"
                      : "border-gray-300 bg-white text-gray-900 hover:border-[#224621]"
                  }`}
                >
                  €{value}
                </button>
              ))}
            </div>
            <Link
              href={`/donate?amount=${quickAmount}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#224621] px-6 py-4 font-bold text-white transition-all hover:bg-[#1b3819] sm:w-auto"
            >
              {quickDonate.button} €{quickAmount}
            </Link>
            <p className="mt-4 text-sm text-gray-600">{quickDonate.secondary}</p>
          </div>
        </div>
      </section>

      <ProjectsShowcase />

      <section
        id="partners"
        className="relative scroll-mt-32 overflow-hidden bg-transparent px-6 py-24"
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">
              {partnersCopy.title}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
            {["Acme", "Globex", "Pulse", "Atlas", "Nexus", "Vertex"].map((name) => (
              <ScrollReveal key={name}>
                <div className="flex h-14 items-center justify-center rounded-2xl bg-white/60 text-sm font-semibold text-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-white/30 backdrop-blur-xl filter grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100">
                  {name}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="transparencia" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-4xl font-bold tracking-tight sm:text-5xl">
              {transparency.title}
            </h2>
          </ScrollReveal>
          <div className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
            {transparency.items?.map((item) => (
              <div key={item.label} className="mb-6 last:mb-0">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{item.label}</span>
                  <span className="text-gray-600">{item.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gray-900"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="mt-6 text-sm text-gray-600">{transparency.note}</p>
          </div>
        </div>
      </section>

      <section id="testimonios" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              {testimonials.title}
            </h2>
            <p className="text-lg text-gray-600">{testimonials.subtitle}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.items?.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="mb-6 text-gray-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="nosotros"
        className="relative scroll-mt-32 overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-900 px-6 py-24 text-white"
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute left-[10%] top-[20%] h-20 w-20 rounded-full bg-[#224621]/5 blur-2xl" />
        <div className="absolute right-[15%] bottom-[25%] h-24 w-24 rounded-full bg-blue-500/5 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
              {about.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mb-4 text-xl text-slate-200 sm:text-2xl">{about.title}</p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg text-slate-300">{about.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-6 text-base text-slate-400">{about.body}</p>
          </ScrollReveal>
        </div>
      </section>

      <section id="faq" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-4xl font-bold tracking-tight sm:text-5xl">
              {faq.title}
            </h2>
          </ScrollReveal>
          <div className="divide-y divide-gray-200 overflow-hidden rounded-3xl bg-white/80 ring-1 ring-gray-100">
            {faq.items?.map((item, index) => (
              <details
                key={item.question}
                className={`group p-6 open:bg-white ${index === 0 ? "" : "border-t border-gray-100"}`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium">
                  <span>{item.question}</span>
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#b3cfb1] bg-linear-to-br from-[#f0f5f0] to-white p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mb-8 text-lg text-gray-600">{finalCta.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-lg bg-[#224621] px-8 py-4 font-bold text-white transition-all hover:bg-[#1b3819]"
            >
              {finalCta.primary}
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/#como-funciona"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              {finalCta.secondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

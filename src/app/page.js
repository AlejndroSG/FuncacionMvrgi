"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import ImpressiveBackground from "@/components/ImpressiveBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTextRef = useRef(null);
  const statsRef = useRef(null);
  const [quickAmount, setQuickAmount] = useState(20);
  const orbsRef = useRef(null);

  useEffect(() => {
    // Hero text animation
    const chars = heroTextRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.02,
        ease: "power4.out",
      }
    );

    // Stats counter animation
    const counters = statsRef.current.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
        },
      });
    });

    const orbs = orbsRef.current?.querySelectorAll('.orb');
    orbs?.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? 24 : -24,
        duration: 7 + i,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent" />
        <div ref={orbsRef} className="absolute inset-0 -z-10">
          <div className="orb absolute left-[8%] top-[15%] h-56 w-56 rounded-full bg-linear-to-br from-blue-400/35 via-purple-400/35 to-pink-400/35 blur-3xl" />
          <div className="orb absolute right-[12%] top-[20%] h-72 w-72 rounded-full bg-linear-to-br from-purple-400/30 via-pink-400/30 to-blue-400/30 blur-3xl" />
          <div className="orb absolute left-1/2 bottom-[12%] h-64 w-64 -translate-x-1/2 rounded-full bg-linear-to-br from-emerald-400/25 via-teal-400/25 to-cyan-400/25 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-block">
            <span className="rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-xs font-medium uppercase tracking-wider text-blue-600 backdrop-blur-sm">
              Fundación sin ánimo de lucro
            </span>
          </div>

          <h1 ref={heroTextRef} className="mb-8 text-6xl font-bold leading-tight tracking-tight text-gray-900 sm:text-7xl md:text-8xl lg:text-9xl">
            {splitText("Ayudar")}
            <br />
            {splitText("es simple")}
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-700 sm:text-xl">
            No necesitas gran cosa. Solo ganas de hacer algo que importe.
          </p>

          <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {["Pago 100% seguro con Stripe","Sin comisiones ocultas","Recibo de donación"].map((t) => (
              <span key={t} className="rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-gray-700 ring-1 ring-black/5 backdrop-blur-xl">
                {t}
              </span>
            ))}
          </div>

          <Link
            href="/donate"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 text-base font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
          >
            <span className="relative z-10">Empezar ahora</span>
            <svg className="relative z-10 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white/70 p-10 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
          <div className="grid gap-12 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
              <span className="counter" data-target="1247">0</span>+
            </div>
            <p className="text-sm font-medium text-gray-600">Personas ayudadas</p>
          </div>
          <div className="text-center">
            <div className="mb-2 bg-linear-to-br from-purple-600 to-pink-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
              <span className="counter" data-target="38">0</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Proyectos activos</p>
          </div>
          <div className="text-center">
            <div className="mb-2 bg-linear-to-br from-pink-600 to-blue-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
              <span className="counter" data-target="94">0</span>%
            </div>
            <p className="text-sm font-medium text-gray-600">Va directo a quien lo necesita</p>
          </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">¿Cómo funciona?</h2>
              <p className="text-lg text-gray-600">Tres pasos sencillos para crear impacto real.</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-3">
            <ScrollReveal>
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-purple-600 text-base font-semibold text-white">1</div>
                <h3 className="mb-2 text-xl font-semibold">Elige tu aporte</h3>
                <p className="text-gray-600">Selecciona cantidad y si quieres donar una vez o de forma recurrente.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-pink-600 text-base font-semibold text-white">2</div>
                <h3 className="mb-2 text-xl font-semibold">Pago seguro</h3>
                <p className="text-gray-600">Procesamos el pago con Stripe para garantizar seguridad y transparencia.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-pink-600 to-blue-600 text-base font-semibold text-white">3</div>
                <h3 className="mb-2 text-xl font-semibold">Recibe el impacto</h3>
                <p className="text-gray-600">Te mantenemos al día con historias y resultados de los proyectos.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="donar-rapido" className="relative scroll-mt-32 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="rounded-3xl bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl sm:p-10">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-semibold tracking-tight">Donación rápida</h3>
                <p className="mt-2 text-gray-600">Elige una cantidad o escribe la tuya. Puedes ajustarlo después.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[5,10,20,50].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setQuickAmount(v)}
                    className={`${quickAmount===v?"bg-gray-900 text-white ring-gray-900":"bg-white/90 text-gray-900 ring-gray-200 hover:bg-white"} rounded-full px-5 py-2 text-sm font-medium ring-1 transition-all`}
                  >
                    {v}€
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href={`/donate?amount=${quickAmount}`} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl">
                  <span className="relative z-10">Continuar con {quickAmount}€</span>
                  <svg className="relative z-10 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Impacto */}
      <section id="impacto" className="relative scroll-mt-32 px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="mb-20 text-center text-5xl font-bold tracking-tight sm:text-6xl">
              Lo que hacemos
            </h2>
          </ScrollReveal>

          <div className="space-y-32">
            <ScrollReveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-6 inline-block rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 p-4 shadow-lg shadow-blue-500/20">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold">Educación</h3>
                  <p className="mb-6 text-lg text-gray-600">
                    Material escolar, becas, talleres. Lo que haga falta para que nadie se quede fuera.
                  </p>
                  <Link href="#" className="group inline-flex items-center gap-2 text-base font-medium text-blue-600 transition-colors hover:text-blue-700">
                    Ver proyectos
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-blue-400 via-cyan-400 to-blue-500 shadow-xl shadow-blue-500/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-400 via-green-400 to-teal-500 shadow-xl shadow-green-500/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="mb-6 inline-block rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 p-4 shadow-lg shadow-emerald-500/20">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold">Vivienda</h3>
                  <p className="mb-6 text-lg text-gray-600">
                    Todos merecen un lugar donde sentirse seguros. Trabajamos para que sea posible.
                  </p>
                  <Link href="#" className="group inline-flex items-center gap-2 text-base font-medium text-emerald-600 transition-colors hover:text-emerald-700">
                    Ver proyectos
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-6 inline-block rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 p-4 shadow-lg shadow-purple-500/20">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold">Salud</h3>
                  <p className="mb-6 text-lg text-gray-600">
                    Medicamentos, tratamientos, apoyo psicológico. Cuidar de la gente es lo primero.
                  </p>
                  <Link href="#" className="group inline-flex items-center gap-2 text-base font-medium text-purple-600 transition-colors hover:text-purple-700">
                    Ver proyectos
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-purple-400 via-pink-400 to-purple-500 shadow-xl shadow-purple-500/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="partners" className="relative scroll-mt-32 bg-transparent px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">Con la ayuda de</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
            {[
              "Acme",
              "Globex",
              "Pulse",
              "Atlas",
              "Nexus",
              "Vertex",
            ].map((name) => (
              <ScrollReveal key={name}>
                <div className="flex h-14 items-center justify-center rounded-2xl bg-white/60 text-sm font-semibold text-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-white/30 backdrop-blur-xl filter grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100">
                  {name}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="valores" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">Nuestros valores</h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: 'Transparencia', desc: 'Cuentas claras y reportes periódicos.', colors: 'from-blue-500/30 via-purple-500/30 to-pink-500/30' },
              { title: 'Cercanía', desc: 'Ayuda directa, sin intermediarios innecesarios.', colors: 'from-emerald-500/30 via-teal-500/30 to-cyan-500/30' },
              { title: 'Impacto', desc: 'Medimos resultados y aprendemos en público.', colors: 'from-purple-500/30 via-pink-500/30 to-blue-500/30' },
            ].map((c, i) => (
              <ScrollReveal key={i}>
                <div className={`rounded-3xl p-[1.5px] bg-linear-to-r ${c.colors} shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}>
                  <div className="rounded-3xl bg-white/80 p-8 backdrop-blur-xl ring-1 ring-white/40">
                    <h3 className="mb-2 text-xl font-semibold">{c.title}</h3>
                    <p className="text-gray-600">{c.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="transparencia" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-4xl font-bold tracking-tight sm:text-5xl">Transparencia</h2>
          </ScrollReveal>
          <div className="rounded-3xl bg-white/70 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-gray-900">Programas</span><span className="text-gray-600">86%</span></div>
              <div className="h-2 w-full rounded-full bg-gray-200"><div className="h-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600" style={{width:'86%'}}/></div>
            </div>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-gray-900">Operación</span><span className="text-gray-600">8%</span></div>
              <div className="h-2 w-full rounded-full bg-gray-200"><div className="h-2 rounded-full bg-linear-to-r from-emerald-600 to-teal-600" style={{width:'8%'}}/></div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-gray-900">Reserva</span><span className="text-gray-600">6%</span></div>
              <div className="h-2 w-full rounded-full bg-gray-200"><div className="h-2 rounded-full bg-linear-to-r from-pink-600 to-blue-600" style={{width:'6%'}}/></div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonios" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">Lo que dice la gente</h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Pensé que mi donación no haría diferencia. Hoy sé el nombre de la persona a la que ayudó.",
                name: "Claudia",
                role: "Donante",
              },
              {
                quote:
                  "Procesos claros y comunicación constante. Da gusto apoyar algo así.",
                name: "Marcos",
                role: "Colaborador",
              },
              {
                quote:
                  "Gracias a la fundación tengo material para estudiar y seguir adelante.",
                name: "Nadia",
                role: "Beneficiaria",
              },
            ].map((t, i) => (
              <ScrollReveal key={i}>
                <div className="h-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
                  <p className="mb-6 text-lg text-gray-700">“{t.quote}”</p>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="relative scroll-mt-32 overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-blue-900 px-6 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl">Sin rollos</h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mb-6 text-xl text-purple-200 sm:text-2xl">Somos gente normal haciendo cosas normales.</p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg text-blue-200">No hay oficinas gigantes ni sueldos millonarios. Solo personas que creen que se puede hacer mejor y que trabajan para que pase. Tu donación va a donde tiene que ir.</p>
          </ScrollReveal>
        </div>
      </section>

      <section id="faq" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-4xl font-bold tracking-tight sm:text-5xl">Preguntas frecuentes</h2>
          </ScrollReveal>
          <div className="divide-y divide-gray-200 overflow-hidden rounded-3xl bg-white/80 ring-1 ring-gray-100">
            <details className="group p-6 open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium">
                <span>¿Cómo se usa mi donación?</span>
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <p className="mt-3 text-gray-600">Financiamos proyectos verificados y publicamos resultados periódicamente.</p>
            </details>
            <details className="group p-6 open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium">
                <span>¿Puedo obtener un recibo?</span>
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <p className="mt-3 text-gray-600">Sí, recibirás un comprobante por email con los detalles de la donación.</p>
            </details>
            <details className="group p-6 open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium">
                <span>¿Puedo cancelar una donación recurrente?</span>
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <p className="mt-3 text-gray-600">Claro, puedes gestionarlo en cualquier momento desde tu email de confirmación.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl">
              ¿Empezamos?
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mb-12 text-xl text-gray-600">
              Cualquier cantidad sirve. En serio.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <Link
              href="/donate"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 px-10 py-5 text-lg font-medium text-white shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Hacer una donación</span>
              <svg className="relative z-10 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
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
                <Link href="#como-funciona" className="hover:text-gray-900">Cómo funciona</Link>
                <Link href="#impacto" className="hover:text-gray-900">Impacto</Link>
                <Link href="#transparencia" className="hover:text-gray-900">Transparencia</Link>
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

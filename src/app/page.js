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
  const statsRef = useRef(null);
  const [quickAmount, setQuickAmount] = useState(20);

  useEffect(() => {
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll(".counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
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

      {/* Hero */}
      <section className="relative grid min-h-screen items-center gap-12 overflow-hidden md:px-25 px-6 pt-32 pb-20 lg:grid-cols-2">
        {/* Simple gradient background */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#f0f5f0] via-white to-[#eff5fb]" />
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-2xl lg:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#d9e7d8] px-4 py-2 text-sm font-semibold text-[#1b3819]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#224621] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#224621]"></span>
            </span>
            1.247 personas ayudadas este año
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Tu ayuda llega<br/>
            <span className="text-[#224621]">donde hace falta</span>
          </h1>

          <p className="mb-8 text-lg text-gray-600 lg:text-xl">
            Sin burocracia, sin comisiones ocultas, sin rollos. Solo personas ayudando a personas.
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="h-5 w-5 text-[#224621]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              <span className="font-medium">94% llega directo</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="h-5 w-5 text-[#224621]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              <span className="font-medium">Recibo fiscal automático</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="h-5 w-5 text-[#224621]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              <span className="font-medium">Cancela cuando quieras</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-[#224621] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#224621]/25 transition-all hover:bg-[#1b3819] hover:shadow-xl hover:shadow-[#224621]/40"
            >
              Donar ahora
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </Link>
            <Link
              href="#impacto"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Ver impacto
            </Link>
          </div>
        </div>
        
        {/* Image side */}
        <div className="relative hidden lg:block">
          <div className="relative">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" 
                alt="Personas ayudando en comunidad" 
                className="h-[600px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-2 text-3xl font-bold text-[#224621]">38</div>
              <p className="text-sm font-semibold text-gray-900">Proyectos activos</p>
              <p className="text-xs text-gray-500">en toda España</p>
            </div>
            
            {/* Small badge */}
            <div className="absolute -top-4 -right-4 rounded-full bg-[#215597] p-4 shadow-lg">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">El impacto hasta hoy</h2>
            <p className="mt-2 text-gray-600">Datos reales, actualizados cada mes</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#d9e7d8] bg-white p-8">
              <div className="mb-3 text-5xl font-bold text-[#224621]">
                <span className="counter" data-target="1247">0</span>+
              </div>
              <p className="mb-1 font-semibold text-gray-900">Personas ayudadas</p>
              <p className="text-sm text-gray-600">Solo en 2024. Más de 4.500 desde 2020</p>
            </div>
            <div className="rounded-2xl border border-[#d4e4f4] bg-white p-8">
              <div className="mb-3 text-5xl font-bold text-[#215597]">
                <span className="counter" data-target="38">0</span>
              </div>
              <p className="mb-1 font-semibold text-gray-900">Proyectos activos</p>
              <p className="text-sm text-gray-600">En Madrid, Barcelona y Valencia</p>
            </div>
            <div className="rounded-2xl border border-[#d9e7d8] bg-white p-8">
              <div className="mb-3 text-5xl font-bold text-[#224621]">
                <span className="counter" data-target="94">0</span>%
              </div>
              <p className="mb-1 font-semibold text-gray-900">Va directo</p>
              <p className="text-sm text-gray-600">Solo 6% en gestión. El resto, a los beneficiarios</p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Cómo funciona</h2>
            <p className="text-lg text-gray-600">Tres pasos. Cinco minutos. Impacto real.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#224621] text-lg font-bold text-white">1</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Elige cantidad</h3>
              <p className="text-gray-600">Desde 5€. Una vez o mensual. Lo que quieras.</p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#215597] text-lg font-bold text-white">2</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Paga con Stripe</h3>
              <p className="text-gray-600">Tarjeta, Google Pay, Apple Pay. Lo que uses normalmente.</p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#224621] text-lg font-bold text-white">3</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Recibe actualizaciones</h3>
              <p className="text-gray-600">Te contamos quién recibió tu ayuda y cómo le fue.</p>
            </div>
          </div>
          
          {/* Visual impact section */}
          <ScrollReveal>
            <div className="mt-20 grid gap-6 sm:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80" 
                  alt="Voluntarios ayudando" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-semibold text-white">Cada donación marca la diferencia</p>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80" 
                  alt="Comunidad feliz" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-semibold text-white">Juntos creamos cambio real</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="donar-rapido" className="relative scroll-mt-32 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[#b3cfb1] bg-linear-to-br from-[#f0f5f0] to-white p-8 sm:p-12">
            <div className="mb-8">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Dona en 30 segundos</h3>
              <p className="text-gray-600">Elige cantidad, paga, listo. Te mandamos el recibo por email.</p>
            </div>
            <div className="mb-6 flex flex-wrap gap-3">
              {[5,10,20,50].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setQuickAmount(v)}
                  className={`${quickAmount===v?"bg-[#224621] text-white border-[#224621]":"bg-white text-gray-900 border-gray-300 hover:border-[#224621]"} rounded-lg border-2 px-6 py-3 font-bold transition-all`}
                >
                  {v}€
                </button>
              ))}
            </div>
            <Link 
              href={`/donate?amount=${quickAmount}`} 
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#224621] px-6 py-4 font-bold text-white transition-all hover:bg-[#1b3819] sm:w-auto"
            >
              Donar {quickAmount}€
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </Link>
            <p className="mt-4 text-sm text-gray-600">Pago con Stripe. Recibo fiscal al instante.</p>
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section id="impacto" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Dónde va tu dinero
            </h2>
            <p className="text-lg text-gray-600">Tres áreas. Impacto directo. Resultados medibles.</p>
          </div>

          <div className="space-y-24">
            <ScrollReveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#224621]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">Educación</h3>
                  <p className="mb-4 text-sm font-semibold text-[#224621]">482 niños ayudados en 2024</p>
                  <p className="mb-6 text-gray-600">
                    Libros, material, matrículas. Lo que haga falta para que puedan estudiar sin preocupaciones.
                  </p>
                  <Link href="#" className="inline-flex items-center gap-1 font-semibold text-[#224621] hover:gap-2 transition-all">
                    Ver casos reales
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-[#224621]/10">
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" 
                    alt="Niños estudiando en clase" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-[#215597]/10">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
                      alt="Familia feliz en su hogar" 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#215597]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">Vivienda</h3>
                  <p className="mb-4 text-sm font-semibold text-[#215597]">127 familias con techo en 2024</p>
                  <p className="mb-6 text-gray-600">
                    Ayudas al alquiler, arreglos urgentes, depósitos. Porque nadie debería dormir en la calle.
                  </p>
                  <Link href="#" className="inline-flex items-center gap-1 font-semibold text-[#215597] hover:gap-2 transition-all">
                    Ver casos reales
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#224621]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">Salud</h3>
                  <p className="mb-4 text-sm font-semibold text-[#224621]">638 tratamientos pagados en 2024</p>
                  <p className="mb-6 text-gray-600">
                    Medicinas, terapias, dentista. La salud no es un lujo. Nadie tiene que elegir entre comer o curarse.
                  </p>
                  <Link href="#" className="inline-flex items-center gap-1 font-semibold text-[#224621] hover:gap-2 transition-all">
                    Ver casos reales
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-[#224621]/10">
                  <img 
                    src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80" 
                    alt="Médico atendiendo paciente" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="partners" className="relative scroll-mt-32 overflow-hidden bg-transparent px-6 py-24">
        <div className="relative z-10 mx-auto max-w-6xl">
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

      <section id="transparencia" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-4xl font-bold tracking-tight sm:text-5xl">Transparencia</h2>
          </ScrollReveal>
          <div className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-gray-900">Programas</span><span className="text-gray-600">86%</span></div>
              <div className="h-2 w-full rounded-full bg-gray-200"><div className="h-2 rounded-full bg-gray-900" style={{width:'86%'}}/></div>
            </div>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-gray-900">Operación</span><span className="text-gray-600">8%</span></div>
              <div className="h-2 w-full rounded-full bg-gray-200"><div className="h-2 rounded-full bg-gray-700" style={{width:'8%'}}/></div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-gray-900">Reserva</span><span className="text-gray-600">6%</span></div>
              <div className="h-2 w-full rounded-full bg-gray-200"><div className="h-2 rounded-full bg-gray-500" style={{width:'6%'}}/></div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonios" className="relative scroll-mt-32 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Historias reales</h2>
            <p className="text-lg text-gray-600">Personas que donaron y personas que recibieron ayuda.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Mi madre no podía pagar las medicinas. Gracias a vuestra ayuda hoy está bien y yo puedo seguir estudiando. Nunca olvidaré lo que hicisteis por nosotros.",
                name: "Sofía L.",
                role: "Beneficiaria directa",
                color: "orange",
                avatar: "https://i.pravatar.cc/150?img=47"
              },
              {
                quote:
                  "Llevamos años donando a otras ONGs pero esta es diferente. Sabes exactamente quién recibió tu ayuda, te envían fotos y actualizaciones. Es increíble.",
                name: "Miguel Á.",
                role: "Donante mensual",
                color: "blue",
                avatar: "https://i.pravatar.cc/150?img=12"
              },
              {
                quote:
                  "Mi hijo tiene dislexia y no podíamos pagar el material adaptado. La fundación nos ayudó en 48 horas. Ahora va al cole feliz.",
                name: "Carmen R.",
                role: "Madre de beneficiario",
                color: "orange",
                avatar: "https://i.pravatar.cc/150?img=32"
              },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="mb-6 text-gray-700">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="relative scroll-mt-32 overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-900 px-6 py-24 text-white">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px'}} />
        
        {/* Radial overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
        
        {/* Decorative elements */}
        <div className="absolute left-[10%] top-[20%] h-20 w-20 rounded-full bg-[#224621]/5 blur-2xl" />
        <div className="absolute right-[15%] bottom-[25%] h-24 w-24 rounded-full bg-blue-500/5 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl">Sin rollos</h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mb-6 text-xl text-slate-200 sm:text-2xl">Somos gente normal haciendo cosas normales.</p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg text-slate-300">No hay oficinas gigantes ni sueldos millonarios. Solo personas que creen que se puede hacer mejor y que trabajan para que pase. Tu donación va a donde tiene que ir.</p>
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
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#b3cfb1] bg-linear-to-br from-[#f0f5f0] to-white p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Lista para ayudar?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            1.247 personas ya lo han hecho este año. Tu aporte, por pequeño que sea, cuenta.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-lg bg-[#224621] px-8 py-4 font-bold text-white transition-all hover:bg-[#1b3819]"
            >
              Donar ahora
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 font-bold text-gray-900 transition-all hover:border-gray-400"
            >
              Ver cómo funciona
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-600">Desde 5€. Cancela cuando quieras. Recibo al instante.</p>
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

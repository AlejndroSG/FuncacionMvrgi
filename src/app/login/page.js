"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/perfil');
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#224621]"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-900">
      <Header />
      
      <div className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 md:p-12">
            {/* Logo/Icon */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#224621] to-[#1b3819] text-3xl font-bold text-white">
                M
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Bienvenido</h1>
              <p className="text-gray-600">Inicia sesión para acceder a tu cuenta</p>
            </div>

            {/* Benefits */}
            <div className="mb-8 space-y-3 rounded-2xl bg-gray-50 p-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">Con tu cuenta podrás:</p>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Acumular y canjear puntos</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Guardar tu carrito de compras</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Ver historial de donaciones</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Acceso rápido a tus títulos</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={() => signIn('google', { callbackUrl: '/perfil' })}
              className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-gray-300 bg-white px-6 py-4 font-bold text-gray-900 shadow-sm transition-all hover:border-gray-400 hover:shadow-md"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </button>

            <p className="mt-6 text-center text-xs text-gray-500">
              Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

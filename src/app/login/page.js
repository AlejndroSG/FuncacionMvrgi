"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const {
    session,
    authLoading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
  } = useUser();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialFormState);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!authLoading && session) {
      router.push("/perfil");
    }
  }, [session, authLoading, router]);

  const handleGoogleSignIn = async () => {
    setFeedback("");
    setPending(true);

    try {
      await loginWithGoogle();
    } catch (error) {
      setPending(false);
      setFeedback(error.message || "No se pudo iniciar sesión con Google.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setFeedback("");

    try {
      if (mode === "login") {
        await loginWithEmail(form.email, form.password);
        router.push("/perfil");
      } else {
        await registerWithEmail(form.email, form.password, form.name);
        setFeedback(
          "Registro completado. Revisa tu correo si Supabase requiere confirmación."
        );
        router.push("/perfil");
      }
    } catch (error) {
      setFeedback(error.message || "Ocurrió un error.");
    } finally {
      setPending(false);
    }
  };

  if (authLoading) {
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
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {mode === "login" ? "Bienvenido" : "Crea tu cuenta"}
              </h1>
              <p className="text-gray-600">
                {mode === "login"
                  ? "Inicia sesión para acceder a tu cuenta"
                  : "Regístrate para empezar a acumular puntos"}
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8 space-y-3 rounded-2xl bg-gray-50 p-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">
                Con tu cuenta podrás:
              </p>
              {[
                "Acumular y canjear puntos",
                "Guardar tu carrito de compras",
                "Ver historial de donaciones",
                "Acceso rápido a tus títulos",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={pending}
              className="mb-6 flex w-full items-center justify-center gap-3 rounded-full border-2 border-gray-300 bg-white px-6 py-4 font-bold text-gray-900 shadow-sm transition-all hover:border-gray-400 hover:shadow-md disabled:opacity-60"
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

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }))
                    }
                    required
                    placeholder="Tu nombre"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-[#224621] focus:outline-none focus:ring-2 focus:ring-[#224621]/20"
                  />
                </div>
              )}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                  required
                  placeholder="correo@ejemplo.com"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-[#224621] focus:outline-none focus:ring-2 focus:ring-[#224621]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      password: event.target.value,
                    }))
                  }
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-[#224621] focus:outline-none focus:ring-2 focus:ring-[#224621]/20"
                />
              </div>

              {feedback && (
                <p className="text-sm text-red-600">{feedback}</p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-full bg-[#224621] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#1b3819] disabled:opacity-70"
              >
                {pending
                  ? "Procesando..."
                  : mode === "login"
                  ? "Iniciar sesión"
                  : "Crear cuenta"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <button
                onClick={() => {
                  setFeedback("");
                  setForm(initialFormState);
                  setMode((current) =>
                    current === "login" ? "register" : "login"
                  );
                }}
                className="font-semibold text-[#224621] hover:underline"
              >
                {mode === "login" ? "Regístrate aquí" : "Inicia sesión"}
              </button>
            </p>

            <p className="mt-6 text-center text-xs text-gray-500">
              Al continuar, aceptas nuestros Términos de Servicio y Política de
              Privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

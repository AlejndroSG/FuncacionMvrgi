"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { session, authLoading } = useUser();
  const { cart, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España'
  });

  const SHIPPING_COST = 5;
  const FREE_SHIPPING_THRESHOLD = 50;
  const shippingCost = getTotal() >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const totalWithShipping = getTotal() + shippingCost;

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (!authLoading && !session) {
      router.replace('/login');
    }
  }, [authLoading, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          shippingData,
          total: totalWithShipping
        })
      });

      if (!res.ok) throw new Error('Error al procesar el pedido');

      const data = await res.json();
      
      if (data.checkoutUrl) {
        clearCart();
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      alert(err.message || 'Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
        <p className="text-sm text-gray-600">Redirigiendo al inicio de sesión...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="relative min-h-screen text-gray-900">
        <Header />
        <div className="flex min-h-[80vh] items-center justify-center px-6">
          <div className="text-center">
            <svg className="mx-auto mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Tu carrito está vacío</h1>
            <p className="mb-8 text-gray-600">Añade productos antes de proceder al pago</p>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-full bg-[#224621] px-8 py-4 font-bold text-white transition-all hover:bg-[#1b3819]"
            >
              Ir a la Tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-900">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-32">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Finalizar Compra</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Datos de Envío</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={shippingData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#224621] focus:ring-2 focus:ring-[#224621]/20"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#224621] focus:ring-2 focus:ring-[#224621]/20"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#224621] focus:ring-2 focus:ring-[#224621]/20"
                      placeholder="123 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingData.address}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#224621] focus:ring-2 focus:ring-[#224621]/20"
                    placeholder="Calle, número, piso..."
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#224621] focus:ring-2 focus:ring-[#224621]/20"
                      placeholder="Ciudad"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#224621] focus:ring-2 focus:ring-[#224621]/20"
                      placeholder="28001"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      País *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingData.country}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm outline-none transition focus:border-[#224621] focus:ring-2 focus:ring-[#224621]/20"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-full bg-[#224621] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#1b3819] hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Proceder al Pago'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Resumen del Pedido</h2>
              
              <div className="mb-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} x {item.price}€
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{getTotal().toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Envío</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-semibold">¡GRATIS!</span>
                    ) : (
                      `${shippingCost.toFixed(2)}€`
                    )}
                  </span>
                </div>
                {getTotal() < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-gray-500">
                    Añade {(FREE_SHIPPING_THRESHOLD - getTotal()).toFixed(2)}€ más para envío gratis
                  </p>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-3 text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>{totalWithShipping.toFixed(2)}€</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  ✓ Pago seguro con Stripe<br/>
                  ✓ Envío en 3-5 días laborables<br/>
                  ✓ Devoluciones en 30 días
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

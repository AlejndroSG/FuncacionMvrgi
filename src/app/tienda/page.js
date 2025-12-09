"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { motion } from "motion/react";

export default function TiendaPage() {
  const router = useRouter();
  const { session, authLoading } = useUser();
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && !session) {
      router.replace('/login');
    }
  }, [authLoading, session, router]);

  const products = [
    {
      id: "camiseta-mvrgi",
      name: "Camiseta Fundación Mvrgi",
      price: 20,
      category: "ropa",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      description: "Camiseta 100% algodón orgánico con logo bordado",
      stock: 25,
      popular: true
    },
    {
      id: "taza-ceramica",
      name: "Taza de Cerámica",
      price: 12,
      category: "hogar",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
      description: "Taza artesanal con diseño exclusivo de la fundación",
      stock: 40
    },
    {
      id: "bolsa-tela",
      name: "Bolsa de Tela Ecológica",
      price: 15,
      category: "accesorios",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
      description: "Bolsa reutilizable de algodón 100% sostenible",
      stock: 30,
      popular: true
    },
    {
      id: "gorra",
      name: "Gorra Bordada",
      price: 18,
      category: "accesorios",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80",
      description: "Gorra ajustable con logo bordado",
      stock: 20
    },
    {
      id: "sudadera",
      name: "Sudadera con Capucha",
      price: 35,
      category: "ropa",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
      description: "Sudadera premium con diseño exclusivo",
      stock: 15
    },
    {
      id: "libreta",
      name: "Libreta Reciclada",
      price: 10,
      category: "papeleria",
      image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
      description: "Libreta A5 de papel reciclado",
      stock: 50
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'ropa', name: 'Ropa' },
    { id: 'accesorios', name: 'Accesorios' },
    { id: 'hogar', name: 'Hogar' },
    { id: 'papeleria', name: 'Papelería' }
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (authLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
        <p className="text-sm text-gray-600">Redirigiendo al inicio de sesión...</p>
      </div>
    );
  }

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50 via-white to-blue-50" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl">
            Tienda de <span className="text-[#224621]">Souvenirs</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600 lg:text-xl mx-auto max-w-2xl">
            Cada compra apoya nuestros proyectos. Productos de calidad con propósito.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="relative px-6 py-8 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`rounded-full px-6 py-2 font-semibold transition-all ${
                  filter === cat.id
                    ? 'bg-[#224621] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative px-6 py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ScrollReveal key={product.id}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
                  whileHover={{ y: -8 }}
                >
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">
                      POPULAR
                    </div>
                  )}

                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{product.name}</h3>
                    <p className="mb-4 text-sm text-gray-600">{product.description}</p>
                    
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#224621]">{product.price}€</span>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full rounded-full bg-[#224621] px-6 py-3 font-bold text-white transition-all hover:bg-[#1b3819] disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

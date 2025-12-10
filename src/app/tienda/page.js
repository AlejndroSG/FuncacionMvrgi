"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImpressiveBackground from "@/components/ImpressiveBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

export default function TiendaPage() {
  const router = useRouter();
  const { session, authLoading } = useUser();
  const { addToCart } = useCart();
  const [filter, setFilter] = useState("all");
  const { dictionary } = useLanguage();
  const storeCopy = dictionary?.store ?? {};
  const products = storeCopy.products ?? [];
  const categories = storeCopy.filters ?? [];
  const status = storeCopy.status ?? {};

  useEffect(() => {
    if (!authLoading && !session) {
      router.replace("/login");
    }
  }, [authLoading, session, router]);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  if (authLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
        <p className="text-sm text-gray-600">{status.redirect}</p>
      </div>
    );
  }

  return (
    <div className="relative text-gray-900">
      <Header />
      <ImpressiveBackground />

      <section className="relative flex min-h-[50vh] items-center overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50 via-white to-blue-50" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl">
            {storeCopy.hero?.title}{" "}
            <span className="text-[#224621]">{storeCopy.hero?.highlight}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 lg:text-xl">
            {storeCopy.hero?.description}
          </p>
        </div>
      </section>

      <section className="relative border-b border-gray-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`rounded-full px-6 py-2 font-semibold transition-all ${
                  filter === category.id
                    ? "bg-[#224621] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white to-gray-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ScrollReveal key={product.id}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
                  whileHover={{ y: -8 }}
                >
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">
                      {status.popular}
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
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">{product.description}</p>

                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#224621]">
                        €{product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {status.stock}: {product.stock}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full rounded-full bg-[#224621] px-6 py-3 font-bold text-white transition-all hover:bg-[#1b3819] disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {product.stock === 0 ? status.soldOut : status.addToCart}
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

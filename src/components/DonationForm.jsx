"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = PUBLISHABLE_KEY
  ? loadStripe(PUBLISHABLE_KEY)
  : Promise.resolve(null);

export default function DonationForm() {
  const [amount, setAmount] = useState("");
  const [preset, setPreset] = useState(null);
  const [frequency, setFrequency] = useState("one_time");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const { dictionary } = useLanguage();
  const formCopy = dictionary?.donationForm ?? {};
  const frequencyCopy = formCopy.frequency ?? {};
  const errorsCopy = formCopy.errors ?? {};
  const submitCopy = formCopy.submit ?? {};
  const notesCopy = formCopy.notes ?? {};

  useEffect(() => {
    const q = searchParams?.get("amount");
    if (q) {
      const n = Math.floor(Number(q));
      if (n >= 1) {
        setAmount(String(n));
        setPreset([5, 10, 20, 50].includes(n) ? n : null);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const amountNumber = Math.floor(Number(amount));
    if (!amountNumber || amountNumber < 1) {
      setError(errorsCopy.amount || "Invalid amount.");
      return;
    }
    if (!donorEmail || !donorEmail.includes("@")) {
      setError(errorsCopy.email || "Invalid email.");
      return;
    }
    if (!donorName || donorName.trim().length < 2) {
      setError(errorsCopy.name || "Name required.");
      return;
    }
    setLoading(true);
    try {
      if (!PUBLISHABLE_KEY) {
        window.location.href = `/success?demo=1&amount=${amountNumber}`;
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          amount: amountNumber,
          currency: "eur",
          frequency,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim().toLowerCase(),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || errorsCopy.generic);
      }

      const data = await res.json();
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (stripeError) {
        setError(stripeError.message || errorsCopy.redirect);
      }
    } catch (err) {
      setError(err.message || errorsCopy.generic);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{formCopy.title}</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {formCopy.frequencyLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFrequency("one_time")}
            className={`rounded-xl px-4 py-3 text-sm font-medium ring-2 transition-all ${
              frequency === "one_time"
                ? "bg-[#224621] text-white ring-[#224621] shadow-lg"
                : "bg-white text-gray-900 ring-gray-200 hover:ring-[#224621]"
            }`}
          >
            {frequencyCopy.one_time}
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`rounded-xl px-4 py-3 text-sm font-medium ring-2 transition-all ${
              frequency === "monthly"
                ? "bg-[#224621] text-white ring-[#224621] shadow-lg"
                : "bg-white text-gray-900 ring-gray-200 hover:ring-[#224621]"
            }`}
          >
            {frequencyCopy.monthly}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 20, 50].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setPreset(value);
                setAmount(String(value));
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium ring-2 transition-all ${
                preset === value
                  ? "bg-[#224621] text-white ring-[#224621] shadow-lg"
                  : "bg-white text-gray-900 ring-[#b3cfb1] hover:ring-[#224621]"
              }`}
            >
              €{value}
            </button>
          ))}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {formCopy.amountLabel}
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
              €
            </span>
            <input
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                setPreset(null);
              }}
              className="w-full rounded-xl border border-gray-200 bg-white/90 py-2 pl-8 pr-3 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
              placeholder="20"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {formCopy.nameLabel}
          </label>
          <input
            type="text"
            value={donorName}
            onChange={(event) => setDonorName(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white/90 py-2 px-3 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
            placeholder={formCopy.namePlaceholder}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {formCopy.emailLabel}
          </label>
          <input
            type="email"
            value={donorEmail}
            onChange={(event) => setDonorEmail(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white/90 py-2 px-3 text-gray-900 shadow-sm outline-none ring-0 transition focus:border-gray-400"
            placeholder={formCopy.emailPlaceholder}
            required
          />
          <p className="mt-1 text-xs text-gray-500">{formCopy.emailHelper}</p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600" aria-live="polite">
          {error}
        </p>
      )}
      <button
        disabled={loading}
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#224621] px-5 py-3 text-base font-bold text-white shadow-lg shadow-[#224621]/30 transition-all hover:bg-[#1b3819] hover:shadow-xl hover:shadow-[#224621]/40 disabled:opacity-60"
      >
        {loading
          ? submitCopy.processing
          : frequency === "monthly"
          ? submitCopy.monthly
          : submitCopy.one_time}
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <p className="text-xs text-gray-600">
        {PUBLISHABLE_KEY ? notesCopy.live : notesCopy.demo}
      </p>
    </form>
  );
}

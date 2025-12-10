"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import es from "@/i18n/locales/es.json";
import en from "@/i18n/locales/en.json";
import fr from "@/i18n/locales/fr.json";

const dictionaries = { es, en, fr };
const STORAGE_KEY = "mvrgi_locale";

const LanguageContext = createContext(null);

const LOCALE_OPTIONS = [
  { value: "es", label: "ES" },
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

const getValueFromPath = (dictionary, path) => {
  if (!path) return dictionary;
  return path.split(".").reduce((acc, segment) => {
    if (acc && typeof acc === "object" && segment in acc) {
      return acc[segment];
    }
    return undefined;
  }, dictionary);
};

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("es");

  // Hydrate locale from storage on the client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && dictionaries[stored]) {
      setTimeout(() => setLocale(stored), 0);
    } else {
      document.documentElement.lang = "es";
    }
  }, []);

  // Persist locale + sync <html lang="">
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => {
    const dictionary = dictionaries[locale] || dictionaries.es;

    const t = (path, fallback) => {
      const resolved = getValueFromPath(dictionary, path);
      if (resolved === undefined || resolved === null) {
        return fallback ?? path;
      }
      return resolved;
    };

    return {
      locale,
      setLocale,
      dictionary,
      t,
      locales: LOCALE_OPTIONS,
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return ctx;
}

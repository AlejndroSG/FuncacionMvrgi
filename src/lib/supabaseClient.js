"use client";

import { createClient } from "@supabase/supabase-js";

let browserClient = null;

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn(
      "[supabaseClient] Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY. La autenticación no funcionará."
    );
    return null;
  }

  browserClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}

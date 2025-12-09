import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const CONFIG_ERROR = NextResponse.json(
  { error: "Supabase no está configurado. Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY." },
  { status: 503 }
);

async function requireSupabaseUser(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    return null;
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) {
    return null;
  }

  return data.user;
}

async function fetchState(userId) {
  const { data: pointsRow, error: pointsError } = await supabaseAdmin
    .from("user_points")
    .select("points")
    .eq("user_id", userId)
    .maybeSingle();

  if (pointsError && pointsError.code !== "PGRST116") {
    throw pointsError;
  }

  if (!pointsRow) {
    await supabaseAdmin
      .from("user_points")
      .upsert({ user_id: userId, points: 0 }, { onConflict: "user_id" });
  }

  const { data: historyData, error: historyError } = await supabaseAdmin
    .from("user_points_history")
    .select("id, points, type, description, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (historyError) {
    throw historyError;
  }

  return {
    points: pointsRow?.points ?? 0,
    history: historyData ?? [],
  };
}

export async function GET(request) {
  if (!supabaseAdmin) {
    return CONFIG_ERROR;
  }

  const user = await requireSupabaseUser(request);
  if (!user?.id) {
    return NextResponse.json({ points: 0, history: [] });
  }

  try {
    const state = await fetchState(user.id);
    return NextResponse.json(state);
  } catch (error) {
    console.error("Supabase GET /api/points error:", error);
    return NextResponse.json({ error: "No se pudo obtener la información de puntos." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!supabaseAdmin) {
    return CONFIG_ERROR;
  }

  const user = await requireSupabaseUser(request);
  if (!user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { delta, type, description } = payload || {};
  const normalizedDelta = Number.isFinite(delta) ? Math.floor(Number(delta)) : null;

  if (normalizedDelta === null || !type) {
    return NextResponse.json({ error: "delta y type son obligatorios" }, { status: 400 });
  }

  try {
    const { data: currentRow, error: currentError } = await supabaseAdmin
      .from("user_points")
      .select("points")
      .eq("user_id", user.id)
      .maybeSingle();

    if (currentError && currentError.code !== "PGRST116") {
      throw currentError;
    }

    const currentPoints = currentRow?.points ?? 0;
    const updatedPoints = currentPoints + normalizedDelta;

    if (updatedPoints < 0) {
      return NextResponse.json({ error: "No tienes suficientes puntos" }, { status: 400 });
    }

    const { error: upsertError } = await supabaseAdmin
      .from("user_points")
      .upsert(
        { user_id: user.id, points: updatedPoints },
        { onConflict: "user_id" }
      );

    if (upsertError) {
      throw upsertError;
    }

    if (normalizedDelta !== 0) {
      const { error: historyError } = await supabaseAdmin
        .from("user_points_history")
        .insert({
          user_id: user.id,
          points: normalizedDelta,
          type,
          description: description?.slice(0, 255) || null,
        });

      if (historyError) {
        throw historyError;
      }
    }

    const state = await fetchState(user.id);
    return NextResponse.json(state);
  } catch (error) {
    console.error("Supabase POST /api/points error:", error);
    return NextResponse.json({ error: "No se pudo actualizar los puntos" }, { status: 500 });
  }
}

# Supabase Backend

Guia rapida para dejar Supabase manejando usuarios, sesiones y el sistema de puntos.

## 1. Crear el proyecto

1. Entra a https://supabase.com/ y crea un proyecto nuevo.
2. Elige region y nombre (ej. `fundacion-mvrgi`) y guarda la clave de `postgres`.

## 2. Obtener llaves

En **Project Settings -> API** copia:

- `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_URL`.
- `anon public` -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `service_role` -> `SUPABASE_SERVICE_ROLE_KEY` (solo en el servidor).

Actualiza `.env.local` (usa `.env.example`) y reinicia `npm run dev`.

## 3. Configurar autenticacion

1. Ve a **Authentication -> Providers** y activa:
   - **Email** (habilita la opcion de contraseña).
   - **Google** (introduce tu Client ID/secret y autoriza `http://localhost:3000` como redirect durante desarrollo).
2. En **Authentication -> URL configuration** establece:
   - `Site URL`: `http://localhost:3000`
   - `Redirect URLs`: añade `http://localhost:3000/perfil`.

Con esto `supabase.auth.signInWithOAuth/signInWithPassword` funcionara desde el frontend.

## 4. Tablas para puntos

Ejecuta este script en el SQL editor:

```sql
create table if not exists public.user_points (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  points integer not null default 0,
  updated_at timestamptz default timezone('utc', now())
);

create unique index if not exists user_points_user_id_key on public.user_points(user_id);

create table if not exists public.user_points_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  points integer not null,
  type text not null,
  description text,
  created_at timestamptz default timezone('utc', now())
);

create index if not exists user_points_history_user_id_idx on public.user_points_history(user_id);
```

## 5. Politicas (RLS)

- Las tablas anteriores pueden dejar RLS activado.
- Como `/api/points` usa la `service_role`, no necesitas politicas adicionales para escribir. Si en el futuro lees desde el cliente con la anon key, crea politicas que obliguen `auth.uid() = user_id`.

## 6. Checklist

1. `.env.local` completado con llaves de Supabase, Stripe y lo que necesites.
2. Proveedores Email + Google activos y URLs configuradas.
3. Tablas `user_points` y `user_points_history` creadas.
4. Flujo: registrate o inicia sesion desde `/login`, haz una donacion/compra y verifica que Supabase se actualiza.

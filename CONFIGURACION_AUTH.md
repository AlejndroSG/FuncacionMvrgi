# Configuración de Autenticación con Supabase

Esta guía explica cómo dejar funcionando el inicio de sesión con Google y con email/contraseña usando Supabase Auth.

## Características

- Inicio de sesión con Google (OAuth 2.0 gestionado por Supabase).
- Registro e inicio de sesión con email/contraseña.
- Persistencia automática de la sesión (tokens almacenados por supabase-js).
- Estados sincronizados con el contexto `UserProvider` para mostrar avatar, menú de usuario y puntos.

## Paso 1: Crear el proyecto en Supabase

1. Entra a https://supabase.com/ y crea un proyecto nuevo.
2. Elige región y nombre (ej. `fundacion-mvrgi`).
3. Supabase te entregará una contraseña para `postgres`; guárdala por si necesitas usar el SQL editor.

## Paso 2: Configurar proveedores

1. Ve a **Authentication -> Providers**.
2. Activa **Email** y habilita el modo contraseña.
3. Activa **Google** y proporciona tu `Client ID` y `Client Secret`.
   - Puedes usar la [Google Cloud Console](https://console.cloud.google.com/) para generar las credenciales.
   - Autoriza `http://localhost:3000` como origen durante desarrollo.
4. En **Authentication -> URL configuration** define:
   - `Site URL`: `http://localhost:3000`
   - `Redirect URLs`: añade `http://localhost:3000/perfil`

## Paso 3: Variables de entorno

Duplica `.env.example` y rellena:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

`NEXT_PUBLIC_*` es para el cliente (supabase-js en el navegador). El `SERVICE_ROLE_KEY` **solo** debe usarse en el servidor (lo utiliza `/api/points` para leer/escribir puntos).

## Paso 4: Tablas para puntos

Ejecuta en el SQL editor:

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

## Paso 5: Probar el flujo

1. Ejecuta `npm run dev`.
2. Entra a `http://localhost:3000/login`.
3. Prueba el botón **Continuar con Google**. Supabase te redirigirá a `/perfil` tras iniciar sesión.
4. Cambia a la pestaña “Crear cuenta” y registra un email/contraseña. Si tu proyecto exige verificación por correo, revisa que Supabase envía el mensaje.
5. Haz una compra o donación de prueba (puedes usar el modo demo o Stripe/PayPal en sandbox) y confirma que los puntos aparecen en tu perfil.

## Resolución de problemas

- **Mensaje:** “Supabase no está configurado” -> revisa que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` existen.
- **Google no redirige correctamente** -> agrega la URL exacta en `Authentication -> URL configuration -> Redirect URLs`.
- **No se guardan los puntos** -> asegúrate de enviar el token de sesión en el header `Authorization` (el `UserProvider` lo hace automáticamente cuando hay sesión activa).

Con esto tendrás la autenticación lista tanto para Google como para email/contraseña usando Supabase.

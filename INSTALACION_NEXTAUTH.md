# Instalación de Supabase Auth

Este documento sustituye a la guía antigua de NextAuth. Aquí tienes los pasos mínimos para usar Supabase como backend de autenticación.

## 1. Preparar el entorno

```bash
cp .env.example .env.local
```

Rellena estas variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

Guarda el archivo y reinicia `npm run dev` para que Next.js cargue las variables nuevas.

## 2. Activar proveedores

En el panel de Supabase:

1. **Authentication → Providers**:
   - Activa **Email** y permite login por contraseña.
   - Activa **Google** e introduce tu Client ID/secret.
2. **Authentication → URL configuration**:
   - `Site URL`: `http://localhost:3000`
   - `Redirect URLs`: añade `http://localhost:3000/perfil`

## 3. Tablas necesarias

Supabase ya gestiona `auth.users`. Solo necesitas las tablas para el sistema de puntos (`user_points` y `user_points_history`). Ejecuta el script descrito en `SUPABASE_SETUP.md`.

## 4. Prueba rápida

1. Ejecuta `npm run dev`.
2. Visita `/login`:
   - Haz click en **Continuar con Google** para probar OAuth.
   - Cambia a "Crear cuenta" e introduce email/contraseña para validar el registro tradicional.
3. Tras iniciar sesión, visita `/perfil` y comprueba que aparece la información del usuario junto a los puntos acumulados.

## 5. Producción

1. En Supabase, añade tu dominio en `Site URL` y `Redirect URLs`.
2. Guarda las variables reales (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) en el proveedor donde despliegues (Vercel, etc.).
3. Repite las pruebas de login y verifica que los puntos se siguen sincronizando.

Con estos pasos tu proyecto queda listo para trabajar 100% con Supabase Auth.

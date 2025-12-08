# 🔐 Instalación de NextAuth

## Paso 1: Instalar NextAuth

Abre PowerShell como **Administrador** y ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Luego, en la terminal normal del proyecto:

```bash
npm install next-auth
```

## Paso 2: Configurar Variables de Entorno

Añade estas líneas a tu `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secret-aleatorio-muy-largo-aqui

# Google OAuth (obtener de Google Cloud Console)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Generar NEXTAUTH_SECRET:

En PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

Copia el resultado y pégalo en `NEXTAUTH_SECRET`.

## Paso 3: Configurar Google OAuth

Sigue las instrucciones detalladas en `CONFIGURACION_AUTH.md`.

## Paso 4: Reiniciar el Servidor

```bash
npm run dev
```

## ✅ Verificación

1. Ve a: http://localhost:3000/login
2. Deberías ver el botón "Continuar con Google"
3. Al hacer click, te redirige a Google para autenticarte
4. Después de autenticarte, vuelves a tu perfil

## 🎯 Funcionalidades Implementadas

- ✅ Login con Google OAuth
- ✅ Sesiones persistentes
- ✅ Perfil de usuario con foto de Google
- ✅ Puntos asociados a cada cuenta
- ✅ Carrito asociado a cada usuario
- ✅ Menú dropdown en Header
- ✅ Protección de rutas (perfil requiere login)
- ✅ Logout funcional

## 📝 Notas

- Los puntos se guardan por usuario (email)
- Modo invitado disponible (sin login)
- El carrito persiste en localStorage
- Al hacer login, se mantienen los puntos del usuario

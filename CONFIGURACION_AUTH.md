# 🔐 Configuración de Autenticación con Google

Este documento explica cómo configurar el sistema de autenticación con Google OAuth.

## 📋 Características Implementadas

✅ **Autenticación con Google**
- Inicio de sesión con cuenta de Google
- Gestión de sesiones con NextAuth
- Perfil de usuario con foto

✅ **Sistema de Cuentas**
- Perfil de usuario personalizado
- Historial de puntos y transacciones
- Asociación del carrito con la cuenta

✅ **Integración Completa**
- Header con menú de usuario
- Botón de login/logout
- Visualización de puntos en header
- Dropdown con opciones de cuenta

## 🚀 Configuración Paso a Paso

### Paso 1: Instalar NextAuth

```bash
npm install next-auth
```

### Paso 2: Configurar Google OAuth

1. **Ve a Google Cloud Console**:
   - https://console.cloud.google.com/

2. **Crea un nuevo proyecto** (o usa uno existente):
   - Click en el selector de proyectos
   - "Nuevo Proyecto"
   - Nombre: "Fundación Mvrgi Web"

3. **Habilita la API de Google+**:
   - Ve a "APIs y servicios" > "Biblioteca"
   - Busca "Google+ API"
   - Click en "Habilitar"

4. **Configura la pantalla de consentimiento**:
   - Ve a "APIs y servicios" > "Pantalla de consentimiento de OAuth"
   - Tipo de usuario: "Externo"
   - Nombre de la aplicación: "Fundación Mvrgi"
   - Email de asistencia: tu email
   - Dominio autorizado: tu dominio (o localhost para desarrollo)
   - Guarda y continúa

5. **Crea credenciales OAuth 2.0**:
   - Ve a "APIs y servicios" > "Credenciales"
   - Click en "Crear credenciales" > "ID de cliente de OAuth 2.0"
   - Tipo de aplicación: "Aplicación web"
   - Nombre: "Fundación Mvrgi Web Client"
   
   **URIs de redireccionamiento autorizados**:
   - Para desarrollo: `http://localhost:3000/api/auth/callback/google`
   - Para producción: `https://tu-dominio.com/api/auth/callback/google`
   
   - Click en "Crear"

6. **Copia las credenciales**:
   - Verás tu "ID de cliente" y "Secreto del cliente"
   - Guárdalos de forma segura

### Paso 3: Configurar Variables de Entorno

Añade estas variables a tu archivo `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-aleatorio-muy-largo-y-seguro

# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id-de-google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-secret-de-google
```

**Para generar NEXTAUTH_SECRET**, ejecuta en terminal:
```bash
# En PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# O usa este comando
openssl rand -base64 32
```

### Paso 4: Reiniciar el Servidor

```bash
# Ctrl+C para detener
npm run dev
```

### Paso 5: Probar el Sistema

1. Ve a: http://localhost:3000/login
2. Click en "Continuar con Google"
3. Selecciona tu cuenta de Google
4. Autoriza la aplicación
5. Serás redirigido a tu perfil

## 🎯 Funcionalidades del Sistema de Cuentas

### **Página de Login** (`/login`)
- Botón de inicio de sesión con Google
- Lista de beneficios de tener cuenta
- Redirección automática si ya estás logueado

### **Página de Perfil** (`/perfil`)
- Información del usuario (nombre, email, foto)
- **Saldo de puntos** con equivalente en euros
- **Historial de puntos** con todas las transacciones
- Tarjetas de "Cómo ganar puntos"
- Accesos rápidos a donar y comprar

### **Header Actualizado**
- **Sin sesión**: Botón "Iniciar Sesión"
- **Con sesión**: 
  - Avatar del usuario
  - Puntos disponibles
  - Menú dropdown con:
    - Mi Perfil
    - Tienda
    - Cerrar Sesión

### **Sistema de Puntos Integrado**
- Asignación automática al completar compra/donación
- Visualización en página de éxito
- Persistencia en localStorage
- Cálculo automático de descuentos

## 📊 Lógica del Sistema de Puntos

```javascript
// Configuración
DONATION_MULTIPLIER: 10      // 1€ donación = 10 puntos
PURCHASE_MULTIPLIER: 5       // 1€ compra = 5 puntos
TITLE_BONUS: 50              // +50 puntos por título
POINTS_TO_EURO: 100          // 100 puntos = 1€ descuento

// Ejemplos
Donación de 20€ → 200 puntos
Compra de 35€ → 175 puntos
Título de 100€ → 500 + 50 = 550 puntos
```

## 🔒 Seguridad

- ✅ OAuth 2.0 con Google (máxima seguridad)
- ✅ Tokens JWT gestionados por NextAuth
- ✅ Sesiones server-side
- ✅ HTTPS requerido en producción
- ✅ Secrets en variables de entorno

## 🚀 Despliegue a Producción

1. **Actualiza las URIs de redirección en Google Cloud**:
   - Añade: `https://tu-dominio.com/api/auth/callback/google`

2. **Actualiza variables de entorno en tu hosting**:
   ```env
   NEXTAUTH_URL=https://tu-dominio.com
   NEXTAUTH_SECRET=tu-secret-de-produccion
   GOOGLE_CLIENT_ID=tu-client-id
   GOOGLE_CLIENT_SECRET=tu-secret
   ```

3. **Verifica que HTTPS esté habilitado**

## 🆘 Solución de Problemas

### ❌ Error: "Cannot find module 'next-auth'"

**Solución**: Instala NextAuth
```bash
npm install next-auth
```

### ❌ Error: "Invalid client_id"

**Causa**: GOOGLE_CLIENT_ID incorrecto o no configurado.

**Solución**:
1. Verifica que copiaste correctamente el Client ID de Google Cloud
2. Verifica que está en `.env.local`
3. Reinicia el servidor

### ❌ Error: "Redirect URI mismatch"

**Causa**: La URI de redirección no está autorizada en Google Cloud.

**Solución**:
1. Ve a Google Cloud Console > Credenciales
2. Edita tu OAuth Client
3. Añade: `http://localhost:3000/api/auth/callback/google`
4. Guarda los cambios

### ❌ No aparece el botón de Google

**Causa**: Falta instalar NextAuth o hay error de importación.

**Solución**:
1. Verifica que NextAuth esté instalado
2. Revisa la consola del navegador para errores
3. Reinicia el servidor

## 📚 Recursos

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup](https://next-auth.js.org/providers/google)
- [Google Cloud Console](https://console.cloud.google.com/)

# 🎁 Configuración del Sistema de Donaciones

Este documento explica cómo configurar el sistema completo de donaciones con Stripe.

## 📋 Características Implementadas

✅ **Formulario de donación mejorado**
- Selección de frecuencia (única o mensual)
- Cantidades predefinidas (5€, 10€, 20€, 50€)
- Cantidad personalizada
- Campos de donante (nombre y email)
- Validaciones completas

✅ **Integración con Stripe**
- Pagos únicos
- Suscripciones mensuales
- Checkout seguro
- Metadata completa del donante

✅ **Páginas de resultado**
- Página de éxito con detalles de la donación
- Página de cancelación con opción de reintentar
- Recuperación de datos de la sesión de Stripe

✅ **Webhook de Stripe**
- Procesamiento de eventos de pago
- Estructura para envío de recibos por email
- Logging de eventos

## 🚀 Guía de Configuración Completa (Paso a Paso)

> **⚡ Inicio Rápido**: Si solo quieres probar el sistema sin configurar nada, salta al final de este documento para ver el "Modo Demo sin Stripe".

### 📌 Paso 1: Verificar que todo está instalado

1. **Verifica que las dependencias estén instaladas**:
   ```bash
   npm install
   ```
   
2. **Verifica que Stripe esté en package.json**:
   - Deberías ver `@stripe/stripe-js` y `stripe` en las dependencias
   - Si no están, instálalas:
     ```bash
     npm install @stripe/stripe-js stripe
     ```

### 📝 Paso 2: Crear archivo de variables de entorno

1. **Crea el archivo `.env.local`** en la raíz del proyecto (al mismo nivel que `package.json`):
   ```bash
   # En Windows PowerShell
   New-Item .env.local -ItemType File
   
   # O simplemente crea el archivo manualmente
   ```

2. **Añade estas líneas al archivo** (por ahora déjalas vacías, las llenaremos después):
   ```env
   # Stripe Keys
   STRIPE_SECRET_KEY=
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   
   # Webhook Secret (solo para producción o pruebas con Stripe CLI)
   STRIPE_WEBHOOK_SECRET=
   
   # URL del sitio
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### 👳 Paso 3: Crear cuenta de Stripe y obtener las keys

1. **Regístrate en Stripe**:
   - Ve a: https://dashboard.stripe.com/register
   - Completa el registro (puedes usar modo test sin verificar la cuenta)

2. **Activa el modo de prueba**:
   - En el dashboard de Stripe, asegúrate de que estás en **"Test mode"** (verás un toggle arriba a la derecha)
   - 🚨 **IMPORTANTE**: Usa siempre test mode para desarrollo

3. **Obtén tus API Keys de prueba**:
   - En el dashboard, ve a: **Developers** (menú izquierdo) > **API keys**
   - Verás dos keys:
     - **Publishable key** (comienza con `pk_test_...`)
     - **Secret key** (comienza con `sk_test_...`, haz click en "Reveal test key" para verla)

4. **Copia las keys a tu `.env.local`**:
   ```env
   STRIPE_SECRET_KEY=sk_test_TU_KEY_AQUI
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_KEY_AQUI
   
   STRIPE_WEBHOOK_SECRET=
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### ▶️ Paso 4: Probar el sistema (sin webhooks aún)

1. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Abre tu navegador** y ve a:
   ```
   http://localhost:3000/donate
   ```

3. **Prueba el formulario**:
   - Rellena el formulario con datos de prueba
   - Usa la tarjeta de prueba: `4242 4242 4242 4242`
   - Fecha: Cualquier fecha futura (ej: 12/25)
   - CVC: Cualquier 3 dígitos (ej: 123)
   - Código postal: Cualquiera (ej: 12345)

4. **Verifica que funciona**:
   - Deberías ser redirigido a Stripe Checkout
   - Completa el pago
   - Deberías volver a la página de éxito

5. **Verifica en Stripe Dashboard**:
   - Ve a: **Payments** en el dashboard de Stripe
   - Deberías ver tu pago de prueba

### 🤖 Paso 5: Configurar Webhooks (Opcional pero recomendado)

Los webhooks permiten que tu aplicación reciba notificaciones cuando ocurren eventos en Stripe (como pagos completados).

#### Opción A: Usar Stripe CLI (Recomendado para desarrollo local)

1. **Instala Stripe CLI**:
   
   **Windows (PowerShell como Administrador)**:
   ```powershell
   # Opción 1: Con Scoop (si lo tienes instalado)
   scoop install stripe
   
   # Opción 2: Descarga manual
   # Ve a: https://github.com/stripe/stripe-cli/releases/latest
   # Descarga stripe_X.X.X_windows_x86_64.zip
   # Extrae el archivo stripe.exe a una carpeta en tu PATH
   ```
   
   **Mac**:
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Inicia sesión en Stripe CLI**:
   ```bash
   stripe login
   ```
   - Se abrirá tu navegador para autorizar
   - Confirma el acceso

3. **Inicia el listener de webhooks** (en una terminal separada):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
4. **Copia el webhook secret**:
   - El comando anterior mostrará algo como:
     ```
     > Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
     ```
   - Copia ese secret y pégalo en tu `.env.local`:
     ```env
     STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
     ```

5. **Reinicia tu servidor de desarrollo**:
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

6. **Prueba de nuevo**:
   - Haz otra donación de prueba
   - En la terminal donde corre `stripe listen` verás los eventos
   - En la consola de tu servidor verás los logs del webhook

#### Opción B: Sin webhooks (más simple)

Si no quieres configurar webhooks ahora:
- Deja `STRIPE_WEBHOOK_SECRET` vacío en `.env.local`
- El sistema seguirá funcionando
- Los webhooks simplemente no procesarán eventos
- Podrás añadirlos después cuando lo necesites

### ✅ Paso 6: Verificación final

**Tu archivo `.env.local` debería verse así**:
```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_51abc123...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51abc123...

# Webhook Secret (opcional en desarrollo)
STRIPE_WEBHOOK_SECRET=whsec_abc123...

# URL del sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Checklist de verificación**:
- [ ] Archivo `.env.local` creado en la raíz del proyecto
- [ ] Variables de Stripe configuradas con keys de test
- [ ] Servidor corriendo con `npm run dev`
- [ ] Puedes acceder a http://localhost:3000/donate
- [ ] Puedes completar una donación de prueba
- [ ] El pago aparece en tu dashboard de Stripe
- [ ] (Opcional) Webhooks configurados y funcionando

---

## 🔧 Configuración Detallada

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Stripe Keys (obtén estas keys en https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Webhook Secret (obtén esto en https://dashboard.stripe.com/webhooks)
STRIPE_WEBHOOK_SECRET=whsec_...

# URL del sitio (para redirecciones)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Configurar Stripe

1. **Crear cuenta en Stripe**: https://dashboard.stripe.com/register
2. **Obtener API Keys**:
   - Ve a Developers > API keys
   - Copia la "Publishable key" y "Secret key"
   - Pégalas en tu `.env.local`

3. **Configurar Webhook** (para producción):
   - Ve a Developers > Webhooks
   - Click en "Add endpoint"
   - URL: `https://tu-dominio.com/api/webhooks/stripe`
   - Eventos a escuchar:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
   - Copia el "Signing secret" y pégalo en `STRIPE_WEBHOOK_SECRET`

### 3. Modo de Prueba

Para probar sin Stripe configurado:
- El sistema funcionará en "modo demo"
- Te redirigirá a la página de éxito sin procesar pagos reales
- Verás un mensaje indicando que es una simulación

### 4. Tarjetas de Prueba de Stripe

Cuando uses las keys de prueba (test mode), puedes usar estas tarjetas:

- **Pago exitoso**: `4242 4242 4242 4242`
- **Pago rechazado**: `4000 0000 0000 0002`
- **Requiere autenticación**: `4000 0025 0000 3155`

Usa cualquier fecha futura para expiración y cualquier CVC de 3 dígitos.

## 📧 Configuración de Emails (Pendiente)

El webhook está preparado para enviar emails, pero necesitas configurar un servicio:

### Opciones recomendadas:

1. **Resend** (Recomendado - Fácil y moderno)
   ```bash
   npm install resend
   ```
   - Sitio: https://resend.com
   - Muy fácil de usar
   - 100 emails gratis al día

2. **SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```
   - Sitio: https://sendgrid.com
   - 100 emails gratis al día

3. **Nodemailer** (Para SMTP)
   ```bash
   npm install nodemailer
   ```
   - Usa tu propio servidor SMTP

### Implementar envío de emails:

Edita el archivo `/src/app/api/webhooks/stripe/route.js` y completa la función `sendReceiptEmail()` con tu servicio elegido.

## 🧪 Probar el Sistema

### En desarrollo:

1. Inicia el servidor:
   ```bash
   npm run dev
   ```

2. Ve a: http://localhost:3000/donate

3. Prueba el formulario:
   - Sin Stripe configurado: modo demo
   - Con Stripe configurado: usa tarjetas de prueba

### Probar webhooks localmente:

1. Instala Stripe CLI:
   ```bash
   # Windows (con Scoop)
   scoop install stripe
   
   # Mac (con Homebrew)
   brew install stripe/stripe-cli/stripe
   ```

2. Inicia el listener:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. Copia el webhook secret que aparece y úsalo en `.env.local`

4. Realiza un pago de prueba y verás los eventos en la consola

## 📊 Estructura de Archivos

```
src/
├── app/
│   ├── donate/
│   │   └── page.js              # Página principal de donaciones
│   ├── success/
│   │   └── page.js              # Página de éxito
│   ├── cancel/
│   │   └── page.js              # Página de cancelación
│   └── api/
│       ├── checkout/
│       │   └── route.js         # API para crear sesión de Stripe
│       ├── checkout-session/
│       │   └── route.js         # API para recuperar detalles de sesión
│       └── webhooks/
│           └── stripe/
│               └── route.js     # Webhook de Stripe
├── components/
│   └── DonationForm.jsx         # Formulario de donación
└── lib/
    └── stripe.js                # Configuración de Stripe
```

## 🚀 Despliegue a Producción

1. **Cambiar a modo producción en Stripe**:
   - Obtén las keys de producción (sin `_test_`)
   - Actualiza las variables de entorno en tu hosting

2. **Configurar webhook de producción**:
   - Crea un nuevo webhook apuntando a tu dominio real
   - Actualiza `STRIPE_WEBHOOK_SECRET`

3. **Configurar dominio**:
   - Actualiza `NEXT_PUBLIC_SITE_URL` con tu dominio real

4. **Activar tu cuenta de Stripe**:
   - Completa la información de tu negocio
   - Verifica tu identidad
   - Configura los detalles bancarios

## 📝 Próximos Pasos (Según Plan Maestro)

- [ ] Implementar envío de recibos por email
- [ ] Crear base de datos para guardar donaciones
- [ ] Panel de administración para ver donaciones
- [ ] Sistema de puntos por donaciones
- [ ] Reportes y estadísticas

## 🆘 Solución de Problemas Comunes

### ❌ Error: "Stripe no configurado" o el formulario muestra "Modo demo"

**Causa**: Las variables de entorno no están configuradas correctamente.

**Solución**:
1. Verifica que el archivo `.env.local` existe en la raíz del proyecto
2. Verifica que las variables tienen valores (no están vacías)
3. Verifica que las keys comienzan con `pk_test_` y `sk_test_`
4. **IMPORTANTE**: Reinicia el servidor de desarrollo después de cambiar `.env.local`:
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

### ❌ Error: "Webhook signature verification failed"

**Causa**: El webhook secret no coincide o no está configurado.

**Solución**:
1. Si usas Stripe CLI, verifica que el secret en `.env.local` coincida con el que muestra `stripe listen`
2. Reinicia el servidor después de cambiar el secret
3. Si no necesitas webhooks ahora, deja `STRIPE_WEBHOOK_SECRET` vacío

### ❌ El formulario no se envía o no pasa nada al hacer click

**Causa**: Error de JavaScript o validación.

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que todos los campos requeridos estén llenos:
   - Nombre completo
   - Email válido
   - Cantidad mayor a 1€

### ❌ Error: "Cannot find module '@/lib/stripe'"

**Causa**: Ruta incorrecta o archivo faltante.

**Solución**:
1. Verifica que existe el archivo: `src/lib/stripe.js`
2. Si no existe, créalo con este contenido:
   ```javascript
   import Stripe from 'stripe';
   
   const key = process.env.STRIPE_SECRET_KEY;
   export const stripe = key ? new Stripe(key, { apiVersion: '2023-10-16' }) : null;
   export const hasStripe = !!key;
   ```

### ❌ Redirección a Stripe funciona pero no vuelve a la página de éxito

**Causa**: URL de retorno incorrecta.

**Solución**:
1. Verifica que `NEXT_PUBLIC_SITE_URL` en `.env.local` sea correcta
2. Para desarrollo local debe ser: `http://localhost:3000`
3. NO uses `https://` en localhost
4. Reinicia el servidor

### ❌ El pago se procesa pero no recibo emails

**Causa**: El envío de emails no está implementado aún.

**Solución**:
- Los emails son opcionales por ahora
- Revisa la sección "Configuración de Emails" para implementarlos
- El webhook registra los eventos en la consola

### ❌ Error: "Failed to fetch" al enviar el formulario

**Causa**: El servidor no está corriendo o hay un error en la API.

**Solución**:
1. Verifica que el servidor esté corriendo: `npm run dev`
2. Verifica que puedes acceder a: http://localhost:3000
3. Revisa la consola del servidor para ver errores
4. Verifica que existe el archivo: `src/app/api/checkout/route.js`

### 🔍 Cómo depurar problemas

1. **Revisa la consola del navegador** (F12 > Console):
   - Errores de JavaScript
   - Errores de red (pestaña Network)

2. **Revisa la consola del servidor** (terminal donde corre `npm run dev`):
   - Errores de API
   - Logs de Stripe
   - Errores de webhooks

3. **Revisa el dashboard de Stripe**:
   - Ve a "Logs" para ver todas las peticiones
   - Ve a "Payments" para ver los pagos procesados
   - Ve a "Developers > Events" para ver eventos de webhooks

### 📞 ¿Necesitas más ayuda?

Si sigues teniendo problemas:
1. Verifica que seguiste todos los pasos en orden
2. Revisa el checklist de verificación (Paso 6)
3. Compara tu código con los archivos de ejemplo
4. Busca en la documentación de Stripe: https://stripe.com/docs

## 🧪 Modo Demo (Sin Configurar Stripe)

Si quieres probar el sistema **sin configurar Stripe**, el sistema funcionará en modo demo:

### Cómo funciona el modo demo:

1. **NO necesitas crear cuenta en Stripe**
2. **NO necesitas configurar `.env.local`**
3. Simplemente inicia el servidor:
   ```bash
   npm run dev
   ```
4. Ve a: http://localhost:3000/donate
5. Rellena el formulario y haz click en "Donar ahora"
6. Serás redirigido directamente a la página de éxito (sin procesar pago real)
7. Verás un mensaje indicando que es una simulación

### Limitaciones del modo demo:
- ❌ No se procesan pagos reales
- ❌ No se crean sesiones de Stripe
- ❌ No se envían webhooks
- ✅ Puedes ver el flujo completo de la UI
- ✅ Puedes probar el formulario y validaciones
- ✅ Ideal para desarrollo de frontend

### Cuándo usar modo demo:
- Estás desarrollando la UI
- Quieres mostrar el proyecto sin configurar Stripe
- Estás haciendo pruebas rápidas de diseño
- No necesitas procesar pagos todavía

---

## 📚 Recursos

- [Documentación de Stripe](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Tarjetas de prueba de Stripe](https://stripe.com/docs/testing#cards)

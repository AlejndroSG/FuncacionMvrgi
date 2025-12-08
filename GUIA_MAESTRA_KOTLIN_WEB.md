# La Guía Definitiva de Arquitectura Web para Desarrolladores Kotlin (Proyecto Fundación Mvrgi)

> **Nota Preliminar:** Esta guía está diseñada específicamente para un experto en Kotlin y Android (Jetpack Compose). No explica programación básica, sino que traduce conceptos avanzados de tu dominio al ecosistema React/Next.js.

---

# ÍNDICE

1.  **LIBRO I: FUNDAMENTOS DEL LENGUAJE Y RUNTIME**
    *   1.1. El Mental Model: JVM vs V8
    *   1.2. Sintaxis Comparada: JavaScript Moderno vs Kotlin
2.  **LIBRO II: ARQUITECTURA DE UI (REACT VS COMPOSE)**
    *   2.1. El Ciclo de Renderizado (Recomposition)
    *   2.2. Gestión de Estado y Side Effects
    *   2.3. El Árbol de Componentes (Virtual DOM)
3.  **LIBRO III: EL FRAMEWORK (NEXT.JS VS ANDROID SDK)**
    *   3.1. Routing y Navegación
    *   3.2. Server vs Client Components
4.  **LIBRO IV: ANÁLISIS EXHAUSTIVO DEL CÓDIGO (LÍNEA A LÍNEA)**
    *   4.1. Configuración del Proyecto
    *   4.2. Componentes UI (`src/components`)
    *   4.3. Páginas y Rutas (`src/app`)
    *   4.4. Backend y APIs (`src/app/api`)
5.  **LIBRO V: ESTILOS Y ANIMACIONES**
    *   5.1. Tailwind CSS vs XML/Modifiers
    *   5.2. GSAP & Motion vs MotionLayout

---

# LIBRO I: FUNDAMENTOS DEL LENGUAJE Y RUNTIME

## 1.1. El Mental Model: JVM vs V8

En Android, corres sobre la JVM (o ART). Tienes Hilos (Threads), Corutinas y un Heap compartido.
En Web (Frontend), corres sobre el motor V8 (en Chrome) dentro de un **Single Thread** con un Event Loop.

### Diferencias Críticas:
1.  **No hay Multithreading real en JS de UI:**
    *   *Kotlin:* `Dispatchers.IO` para mover trabajo fuera del hilo principal.
    *   *JS:* Todo es asíncrono no bloqueante. `fetch`, `setTimeout`, promesas. No bloquean el UI thread, pero el código computacionalmente costoso sí lo hace.

2.  **Gestión de Memoria:**
    *   *Kotlin:* Garbage Collector generacional. Fuerte tipado estático (en tiempo de compilación).
    *   *JS:* Garbage Collector Mark-and-Sweep. Tipado dinámico (runtime), aunque Typescript añade tipado estático. Este proyecto usa JS puro, así que es como usar `Any?` en todo.

## 1.2. Sintaxis Comparada: JavaScript Moderno (ES6+) vs Kotlin

El código de este proyecto usa características modernas de JS.

### Declaración de Variables
| JavaScript | Kotlin | Notas |
| :--- | :--- | :--- |
| `const x = 1` | `val x = 1` | Referencia inmutable. Objeto mutable. |
| `let x = 1` | `var x = 1` | Variable mutable. |
| `var x = 1` | (No usar) | Scope de función (antiguo), causa bugs. |

### Funciones
*JS (Arrow Function):*
```javascript
const sumar = (a, b) => a + b;
```
*Kotlin (Lambda):*
```kotlin
val sumar = { a: Int, b: Int -> a + b }
```

### Destructuring (Muy usado en React Props)
*JS:*
```javascript
const { name, age } = persona;
```
*Kotlin:*
```kotlin
val (name, age) = persona
```
*Diferencia:* En JS se hace por **nombre** de propiedad. En Kotlin se hace por **posición** (component1, component2) en Data Classes.

### Null Safety
*JS:* `user?.name ?? 'Anonimo'` (Optional chaining + Nullish coalescing)
*Kotlin:* `user?.name ?: "Anonimo"` (Elvis operator)

---

# LIBRO II: ARQUITECTURA DE UI (REACT VS COMPOSE)

Este es el punto más importante. React 19 y Jetpack Compose son **primos hermanos**. Ambos son frameworks de UI **Declarativos**.

## 2.1. El Ciclo de Renderizado (Recomposition)

### En Android (Compose):
1.  **Composition:** Se ejecuta el bloque `@Composable`.
2.  **Recomposition:** Cuando un `State<T>` leído cambia, la función se vuelve a ejecutar.

### En React:
1.  **Render:** Se ejecuta la función del componente (`Home()`).
2.  **Re-render:** Cuando cambia el `state` (`useState`) o las `props`, la función **se ejecuta entera otra vez**.

> **¡OJO!** En React, la función entera se re-ejecuta. En Compose, el compilador puede saltar partes. React depende de `useMemo` y `useCallback` para optimizar esto, aunque React 19 (el que usas) lo hace automáticamente con su nuevo compilador (React Compiler), acercándose más a Compose.

## 2.2. Gestión de Estado y Side Effects

Aquí está la piedra rosetta definitiva:

| Concepto | React Hook | Jetpack Compose | Explicación |
| :--- | :--- | :--- | :--- |
| **Estado Local** | `useState(initial)` | `remember { mutableStateOf(initial) }` | Mantiene valor entre renderizados. |
| **Efectos (One-off)** | `useEffect(() => {}, [])` | `LaunchedEffect(Unit) {}` | Se ejecuta al montar (entrar en pantalla). |
| **Efectos (Reactive)** | `useEffect(() => {}, [val])` | `LaunchedEffect(val) {}` | Se ejecuta cuando `val` cambia. |
| **Referencias** | `useRef(initial)` | `remember { Ref(initial) }` | Valor mutable que NO dispara re-render. |
| **Contexto** | `useContext(Ctx)` | `CompositionLocalProvider` | Inyección de dependencias en el árbol. |

## 2.3. JSX vs Compose Compiler

*JSX:*
```javascript
<div className="p-4">
  <Header title="Hola" />
</div>
```
Esto *parece* HTML, pero transpile a:
`React.createElement("div", { className: "p-4" }, React.createElement(Header, { title: "Hola" }))`

Es un árbol de objetos. Igual que Compose crea un árbol de `Node`.

---

# LIBRO III: EL FRAMEWORK (NEXT.JS VS ANDROID SDK)

Next.js es tu "Android Framework". React es solo la librería de UI (como `androidx.compose.ui`).

## 3.1. Estructura de Carpetas = Navigation Graph
En Android tienes `nav_graph.xml` o clases de Navegación. En Next.js (App Router), **el sistema de archivos es la API**.

*   `src/app/page.js` -> Ruta `/` (MainActivity)
*   `src/app/donate/page.js` -> Ruta `/donate` (DonateActivity/Fragment)
*   `src/app/layout.js` -> Layout Base (activity_main.xml que contiene el NavHost)

## 3.2. Server Components (RSC) vs Client Components

**Esto es único de la web moderna.**

*   **Server Component (Por defecto):** Se renderiza en el servidor. Al navegador solo llega HTML puro. No tiene interactividad (`onClick` no funciona). Es como generar la UI en el backend y mandarla.
*   **Client Component (`"use client"`):** Se hidrata en el navegador. Tiene estado (`useState`), efectos (`useEffect`) y eventos. Es una aplicación React normal.

**En tu proyecto:**
Verás `"use client";` al principio de archivos como `page.js` o `DonationForm.jsx`. Esto les dice a Next.js: "Envía el código JS de este componente al navegador, necesito interactividad".

---

# LIBRO IV: ANÁLISIS EXHAUSTIVO DEL CÓDIGO (LÍNEA A LÍNEA)

Vamos a diseccionar el proyecto archivo por archivo.

## 4.1. Archivos de Configuración (La "build.gradle")

### `package.json`
Define dependencias y scripts.
*   `"dependencies"`: Librerías de producción (React, Next, Framer Motion, GSAP, Stripe).
*   `"devDependencies"`: Herramientas de compilación (Tailwind, ESLint).
*   `"scripts"`: Comandos de terminal (`npm run dev` = `gradlew installDebug`).

### `src/app/layout.js`
Este es el **Root**. Envuelve a TODAS las páginas.
```javascript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={...}>
        {children} {/* Aquí se inyecta la página actual */}
      </body>
    </html>
  );
}
```
Es equivalente a tu `Activity` principal que tiene un `Scaffold` y dentro el `NavHost`. Todo lo que pongas aquí (Navbar, Footer, Context Providers) persistirá entre navegaciones.

## 4.2. Componentes UI (`src/components`)

### `DonationForm.jsx` (Lógica de Negocio y UI)
Es un componente cliente (`"use client"`) complejo.

1.  **Imports:**
    *   `loadStripe`: Inicializa el SDK de pagos (Singleton).
    *   `useSearchParams`: Hook para leer `?amount=20` de la URL. (Como `savedStateHandle.get<Int>("amount")`).

2.  **Estado:**
    ```javascript
    const [amount, setAmount] = useState('');
    const [preset, setPreset] = useState(null); // Para saber qué botón está activo
    ```

3.  **Lógica `useEffect`:**
    ```javascript
    useEffect(() => {
        const q = searchParams?.get('amount');
        if (q) ... // Si la URL trae cantidad, pre-rellena el form
    }, [searchParams]);
    ```
    Esto es reactivo. Si la URL cambia (navegación), el formulario se actualiza solo.

4.  **Renderizado Condicional de Clases (Tailwind):**
    ```javascript
    className={`... ${preset === v ? 'bg-[#224621]' : 'bg-white'}`}
    ```
    Esto es típico. Concatenación de strings para estilos dinámicos. En Compose haríamos:
    `Modifier.background(if (selected) Green else White)`

### `Header.jsx` (Animaciones al Scroll)
Muestra una barra de navegación que cambia cuando haces scroll.

1.  **Scroll Listener:**
    ```javascript
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll); // Cleanup!
    }, []);
    ```
    **Importante:** El `return` en `useEffect` es el `onCleared` o `onDestroy`. Elimina el listener para evitar memory leaks.

2.  **Framer Motion (`<motion.header>`):**
    En lugar de `<header>`, usa `<motion.header>`.
    *   `initial={{ y: -100 }}`: Empieza fuera de pantalla (arriba).
    *   `animate={{ y: 0 }}`: Baja a su posición.
    *   Esto es animación declarativa, igual que `AnimatedVisibility` en Compose.

### `ImpressiveBackground.jsx` (Arte con CSS)
No tiene lógica. Solo divujado.
Usa múltiples `div` con `absolute inset-0` (llenar pantalla) y `radial-gradient`.
Es una técnica de "Capas" (Layering).
*   Capa 1: Gradiente base.
*   Capa 2: Patrón de puntos (SVG pattern en CSS).
*   Capa 3: Grid.
*   Capa 4: Formas flotantes con `blur-3xl`.

### `AnimatedText.jsx`
Componente wrapper para animar texto palabra por palabra.
1.  **Split de Strings:**
    `const words = children.split(" ");`
    Separa el texto en palabras.
2.  **Staggered Animation:**
    Usa `delay: delay + i * 0.1` en el `.map()`.
    Cada palabra aparece 0.1s después de la anterior.
    *Compose:* `AnimatedContent` o un loop de corutinas con `delay()`.

## 4.3. Páginas Principales (`src/app`)

### `src/app/page.js` (Home)
El orquestador principal.

1.  **Integración GSAP (GreenSock):**
    ```javascript
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);
    ```
    GSAP es la librería de animación más potente de la web (imperativa). Se usa aquí para animar los números (contadores) cuando entran en pantalla.

2.  **Refs para acceso al DOM:**
    ```javascript
    const statsRef = useRef(null);
    ```
    React es virtual. Si quieres tocar el elemento real (para GSAP), necesitas una `ref`. Es como guardar una referencia a la `View` en Android View System.

3.  **Efecto de Conteo:**
    ```javascript
    useEffect(() => {
        // Busca elementos con clase .counter dentro de statsRef
        const counters = statsRef.current.querySelectorAll(".counter");
        // Anima su propiedad innerText
        gsap.to(counter, { innerText: target, snap: { innerText: 1 } ... });
    }, []);
    ```
    Esto manipula el DOM directamente saltándose a React. Es peligroso pero potente para animaciones de alto rendimiento.

### `src/app/donate/page.js`
Página de donación dedicada.
*   Usa `<Suspense>` alrededor de `<DonationForm>`.
*   **Suspense:** Es un componente especial de React que muestra un "Fallback" (esqueleto de carga) mientras el componente hijo se carga (code splitting) o espera datos. Es nativo del framework.

## 4.4. Backend (`src/app/api/checkout/route.js`)

Este archivo corre en **Node.js**, no en el navegador.

1.  **Endpoint Definition:**
    `export async function POST(req)` define que este archivo responde a peticiones `POST /api/checkout`.

2.  **Stripe SDK:**
    Crea una sesión de Checkout.
    ```javascript
    const session = await stripe.checkout.sessions.create({ ... })
    ```
    Esto devuelve una URL a la que redirigiremos al usuario en el frontend.

---

# LIBRO V: ESTILOS Y ANIMACIONES

## 5.1. Tailwind CSS (`globals.css`)
Estás usando **Tailwind v4** (la versión más nueva).
En `globals.css` ves `@import "tailwindcss";`.
Luego define variables CSS (`--color-brand-primary: #224621;`).

**Filosofía:**
En lugar de crear una clase `.boton-verde` con 10 propiedades, aplicas 10 clases utilitarias al HTML:
`className="bg-green-800 text-white px-4 py-2 rounded shadow"`

**Traducción a Android:**
*   `px-4` -> `paddingHorizontal = 16dp` (1 unidad = 0.25rem = 4px)
*   `rounded-full` -> `shape = CircleShape`
*   `shadow-lg` -> `elevation = 8.dp`

## 5.2. Animaciones: Tres Estrategias en el Proyecto

1.  **CSS Transitions (Tailwind):**
    `transition-all hover:scale-105`
    Simple, barato, acelerado por GPU. Para hovers y estados simples.

2.  **Framer Motion (`motion/react`):**
    Usado en `FadeIn.jsx` y `Header.jsx`.
    Declarativo, basado en física. Ideal para UI (entradas, salidas, listas).
    Equivalente a `androidx.compose.animation`.

3.  **GSAP (GreenSock):**
    Usado en `page.js` (contadores) y `ScrollReveal.jsx`.
    Imperativo, timeline-based. El rey del "Scroll-driven animation".
    Equivalente a construir `AnimatorSet` complejos coordinados con el `ScrollView`.

---

# APÉNDICE: GLOSARIO RÁPIDO PARA EL KOTLIN DEV

*   `npm install` = Sincronizar Gradle
*   `npm run dev` = Run 'app' (Debug)
*   `npm run build` = Build APK/Bundle (Release)
*   `console.log()` = `Log.d()`
*   `window` = `Context` (más o menos, es el contexto global del navegador)
*   `document` = La Jerarquía de Vistas (View Hierarchy)
*   `localStorage` = `SharedPreferences`
*   `fetch` = `Retrofit` + `OkHttp` (pero nativo y más básico)
*   `Promise` = `Deferred` / `Job`
*   `async/await` = `suspend` functions
*   `export default` = Clase pública principal del archivo
*   `{ children }` prop = `content: @Composable () -> Unit` (Trailing lambda)

---

### Siguientes Pasos Recomendados

1.  Experimenta cambiando los colores en `globals.css`.
2.  Intenta añadir un nuevo campo al `DonationForm` (ej. "Nombre") y pásalo al backend.
3.  Modifica las animaciones de `AnimatedText` para que sean más rápidas.

¡Bienvenido al desarrollo web moderno! Tienes la base lógica más difícil (la asincronía y el estado de Compose), la sintaxis es solo cuestión de costumbre.

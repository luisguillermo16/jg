# 🎬 JG Producciones: Reglas de Animación, Scroll y Transiciones

> **Source of Truth** — Arquitectura de movimiento del sitio. Cambiar estas reglas sin entender el sistema completo romperá la experiencia cinematográfica.

---

## 1. Glosario Oficial

| Término | Significado en este proyecto |
|---|---|
| **Scroll Snapping Mandatorio** | El usuario no puede detenerse *entre* secciones. El browser decide la posición final. `scroll-snap-stop: always`. |
| **Ajuste de Viewport** | Cada sección encaja perfectamente en la pantalla (`100dvh`). Sin contenido cortado. |
| **Sticky Scroll con Snapping** | `position: sticky` (la sección se queda fija) + Snapping (imán que centra el slide). Base de Categorías y Servicios. |
| **Controlador de Scroll** | Contenedor externo de altura extendida (`400vh`, `700vh`) que actúa como "recorrido" virtual. El usuario baja por él pero visualmente ve el sticky. |
| **Capa Fantasma (Ghost Layer)** | Todos los fondos existen en el DOM con `opacity: 0`. La transición solo sube/baja opacidades, sin mover elementos. |
| **Crossfade Premium** | Dos capas se solapan al 50% durante la transición. Requiere `OVERLAP ≥ 10%` del recorrido del scroll. |
| **Spring Interpolation** | `useSpring` de Framer Motion suaviza el scroll de rueda de ratón (que se mueve a saltos) en una curva fluida. |
| **Composite Layer (GPU)** | `willChange: 'transform, opacity'` fuerza al browser a crear una capa en la GPU. Evita repintado de toda la pantalla en cada frame. |

---

## 2. Reglas Inamovibles del Contenedor de Scroll

> [!IMPORTANT]
> Sin estas reglas, el Scroll Snapping Mandatorio no funcionará en ninguna sección.

```css
/* src/pages/Home.css — .home-container */
height: 100dvh;
overflow-y: scroll;
scroll-snap-type: y mandatory;   /* ← OBLIGATORIO */
scroll-behavior: auto;           /* NO usar 'smooth' — conflicta con snap en mobile */
```

*   Un scroll = una página completa. El usuario no puede quedarse entre secciones.
*   Cada sección snap-point usa `scroll-snap-align: start` + `scroll-snap-stop: always`.
*   Altura de cada snap-point: `100vh` + `100dvh` (dvh respeta la barra URL de iOS/Android).

---

## 3. Motor de Animación — Cómo Funciona

```
Dedo / Rueda ──► .home-container (scroll)
                        │
              RAF (requestAnimationFrame)
                        │
            container.scrollTop → catsStart, catsMax, etc.
                        │
              progress (0 → 1) por sección
                        │
           ┌────────────┴──────────────────┐
           │                               │
    Ghost Layers                    Framer Motion
    (mapRange manual)         (useScroll + useSpring)
           │                               │
    Video opacity               Intro text opacity
    (sin RAF en React)          (DOM directo, sin jank)
```

### Por qué dos sistemas coexisten

| Técnica | Usado para | Ventaja |
|---|---|---|
| `mapRange()` + RAF | Opacidad de videos (Ghost Layers) | Simple, sin overhead de librería |
| `useScroll` + `useSpring` + `useTransform` | Efecto "tunnel" del texto intro | DOM directo, sin re-renders de React, Spring suaviza el ratón |

---

## 4. Efecto "Tunnel" de Salida — Intro de Categorías

El texto "Nuestras Categorías" sale con 3 efectos simultáneos al hacer el primer scroll:

```typescript
// CategoriesSection.tsx
const { scrollYProgress } = useScroll({
  target:    categoriesRef,  // la sección
  container: containerRef,   // el .home-container (scroll raíz)
  offset:    ['start start', 'end end'],
});

const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,  // rigidez del muelle
  damping:   30,   // amortiguación
  restDelta: 0.001,
});

// La transición ocurre entre progress 0.20 y 0.30
const introTextOpacity = useTransform(smoothProgress, [0.20, 0.30], [1, 0]);
const introTextScale   = useTransform(smoothProgress, [0.20, 0.30], [1, 0.65]);
const introBlur        = useTransform(smoothProgress, [0.20, 0.30], [0, 12]);
const introFilter      = useTransform(introBlur, (v) => `blur(${v}px)`);
```

> [!NOTE]
> `transition: 'none'` es crítico. Si se agrega un CSS transition, la animación corre en su propio timer y se desincroniza del dedo.

---

## 5. Técnica de Ghost Layers (Capas Fantasma)

Para cada sección con múltiples fondos (Categorías, Servicios), todos los fondos están renderizados simultáneamente. La opacidad es el único control:

```typescript
// Parámetros de Categorías
const SLOT    = 0.25;  // 4 slides → cada uno ocupa 25% del progreso
const OVERLAP = 0.025; // 10% del SLOT → ventana de crossfade

const getCatLayerOpacity = (progress: number, slotIndex: number): number => {
  const slotStart = slotIndex * SLOT;
  const slotEnd   = slotStart + SLOT;
  // fadeIn:  sube de 0 a 1 en la ventana de entrada
  const fadeIn  = mapRange(progress, slotStart - OVERLAP, slotStart + OVERLAP, 0, 1);
  // fadeOut: baja de 1 a 0 en la ventana de salida
  const fadeOut = mapRange(progress, slotEnd   - OVERLAP, slotEnd   + OVERLAP, 1, 0);
  // El mínimo asegura que en el pico ambas sumen 1 y en el overlap sumen ~1 también
  return Math.min(fadeIn, fadeOut);
};
```

**Regla de oro:** Durante el crossfade, ambas capas están a ~50%. Por eso se necesita la **capa base** (`cats-base-bg`, `svc-base-bg`) que evita el negro puro cuando la suma de opacidades baja de 1.

---

## 6. Regla Crítica: Timing de Crossfades y Snap Points

> [!CAUTION]
> Esta regla corrige el bug de "salida prematura" (Dwell Time). Violarla hace que el usuario llegue a un snap y vea el slide al 50% de opacidad en lugar del 100%.

**El crossfade SIEMPRE debe TERMINAR en el snap point, nunca empezar en él.**

```
❌ MAL — crossfade centrado en el snap:
   [snapPoint - OVERLAP, snapPoint + OVERLAP]
   → Al llegar al snap, el slide está al 50% (mitad del crossfade)

✅ BIEN — crossfade termina en el snap:
   [snapPoint - 2*OVERLAP, snapPoint]
   → Al llegar al snap, el slide está al 100% (crossfade ya terminó)
```

**Fórmula correcta para `getCatLayerOpacity`:**

```typescript
const fadeIn  = mapRange(progress, snapIn   - 2 * OVERLAP, snapIn,   0, 1);
const fadeOut = mapRange(progress, snapNext - 2 * OVERLAP, snapNext, 1, 0);
// NUNCA: mapRange(progress, snap - OVERLAP, snap + OVERLAP, ...)
```

**Tabla de ventanas de crossfade para Categorías (SLOT=0.25, OVERLAP=0.025):**

| Crossfade | Ventana | Punto 50% (mezcla visual) | Al snap… |
|---|---|---|---|
| Intro → Bodas | [0.20, 0.25] | 0.225 | Bodas = 100% ✓ |
| Bodas → Sociales | [0.45, 0.50] | 0.475 | Sociales = 100% ✓ |
| Sociales → Corp. | [0.70, 0.75] | 0.725 | Corp. = 100% ✓ |
| Corp. → (siguiente sección) | **Sin fade-out** | — | Corp. inmune ✓ |

**Regla adicional — "Dwell Time" del último slide:**
El último slide de una sección siempre debe tener `fadeOut = 1` (constante). Nunca se le aplica fade-out porque el siguiente snap ya pertenece a la siguiente sección.

```typescript
const fadeOut = slideIndex === LAST_SLIDE
  ? 1   // inmune — no hay siguiente slide dentro de esta sección
  : mapRange(progress, snapNext - 2 * OVERLAP, snapNext, 1, 0);
```

**Los `useTransform` de Framer Motion deben usar exactamente la misma ventana** que los Ghost Layers para coherencia:

```typescript
// ✅ Coherente con getCatLayerOpacity
const introTextOpacity = useTransform(smoothProgress, [0.20, 0.25], [1, 0]);
// ❌ Incoherente — termina en 0.30 cuando el snap ya pasó a 0.25
const introTextOpacity = useTransform(smoothProgress, [0.20, 0.30], [1, 0]);
```

---

## 6. Arquitectura de Secciones Especiales

### 6.1 Categorías — 400vh

| Slot | Sección | Progress |
|---|---|---|
| 0 | Intro (Cinematic BG + "Nuestras Categorías") | 0.00 → 0.25 |
| 1 | Bodas | 0.25 → 0.50 |
| 2 | Sociales | 0.50 → 0.75 |
| 3 | Corporativos | 0.75 → 1.00 |

> [!CAUTION]
> No crear un slot "exit" vacío al final. El siguiente snap va directo al intro de Servicios.

**Variables clave en `Home.tsx`:**
```typescript
const catsStart = windowHeight * 2;  // después del Hero (200vh)
const catsMax   = windowHeight * 4;  // 4 slots × 100vh
```

**Archivos:**
- `CategoriesSection.tsx` — Ghost Layers + Framer Motion para el intro
- `CategoriesSection.css` — `height: 400vh`, snap-stops `100dvh`
- `Home.tsx` → `catsStart`, `catsMax`, `containerRef` pasado a la sección

---

### 6.2 Servicios — 700vh

| Parámetro | Valor |
|---|---|
| `SVC_SLOTS` | 7 (intro + 6 servicios) |
| `SVC_SLOT` | `1/7 ≈ 0.143` |
| `SVC_OVR` | `SVC_SLOT * 0.1` |

**Variables clave en `Home.tsx`:**
```typescript
const svcStart = svcEl.offsetTop;   // leído del DOM en cada frame
const sMax     = windowHeight * 7;
```

**Archivos:**
- `ServicesSection.tsx` — Ghost Layers con imágenes estáticas
- `ServicesSection.css` — `height: 700vh`, snap-stops `100dvh`

---

### 6.3 Hero — 200vh (Dos Escenas)

| Escena | Rango de progress | Efecto |
|---|---|---|
| 1 — Intro (logo + video) | 0.0 → ~0.5 | Fade-out + zoom-out |
| 2 — Main (imagen + título) | ~0.8 → 1.0 | Fade-in desde abajo |

```typescript
// Home.tsx — CSS variable directo, sin React state
const hProg = Math.min(2, currentScroll / windowHeight);
container.style.setProperty('--hero-progress', hProg.toFixed(4));
```

---

### 6.4 Galería — 200vh (Dos Fases)

| Fase | Rango `galP` | Vista |
|---|---|---|
| 1 — Intro | 0.0 → 0.5 | Título centrado |
| 2 — Grid | 0.5 → 1.0 | Cuadrícula de fotos |

```typescript
const galP = galScroll / (windowHeight * 2);
setActiveGal(galP < 0.5 ? -1 : 0);
```

---

## 7. Reglas de Performance

*   `transition: 'none'` en todos los elementos controlados por scroll. Las CSS transitions y el scroll-driven animation no deben coexistir.
*   `willChange: 'opacity'` solo en las capas que cambian. Liberarlo con `'auto'` cuando no está activo.
*   Videos: `isVisible` controla `play()`/`pause()`. Un video pausa cuando su `opacity < 0.04`.
*   En mobile: `isMobileDevice` desactiva el Ken Burns (reduce carga GPU).

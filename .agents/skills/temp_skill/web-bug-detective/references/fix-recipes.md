# Fix Recipes — Soluciones por tipo de bug

## Fix: RENDER_CHUNK (carga por pedazos)

### Recipe 1: CSS crítico inline
```html
<!-- ANTES: CSS bloqueante -->
<link rel="stylesheet" href="/styles.css">

<!-- DESPUÉS: CSS crítico inline + async load del resto -->
<style>
  /* Solo CSS above-the-fold */
  body { margin: 0; font-family: system-ui; }
  .hero { ... }
</style>
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Recipe 2: Scripts no bloqueantes
```html
<!-- ANTES: bloquea render -->
<script src="/app.js"></script>

<!-- DESPUÉS: no bloqueante -->
<script src="/app.js" defer></script>
<!-- O para scripts independientes: -->
<script src="/analytics.js" async></script>
```

### Recipe 3: Skeleton screens para contenido dinámico
```jsx
// ANTES: nada mientras carga
function ProductList() {
  const { data, loading } = useProducts();
  if (loading) return null; // ← layout shift aquí
  return <div>{data.map(...)}</div>;
}

// DESPUÉS: skeleton que ocupa el mismo espacio
function ProductList() {
  const { data, loading } = useProducts();
  if (loading) return <ProductSkeleton count={6} />;
  return <div>{data.map(...)}</div>;
}
```

### Recipe 4: content-visibility para listas largas
```css
/* Para secciones largas que están below-fold */
.product-grid-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 800px; /* altura estimada */
}
```

---

## Fix: LAYOUT_SHIFT (CLS)

### Recipe 1: Imágenes con aspect ratio reservado
```css
/* ANTES: sin espacio reservado */
.product-image img { width: 100%; }

/* DESPUÉS: espacio reservado */
.product-image {
  aspect-ratio: 1 / 1; /* o 16/9, 4/3, etc. */
  overflow: hidden;
}
.product-image img { width: 100%; height: 100%; object-fit: cover; }
```

```html
<!-- O directamente en el HTML -->
<img src="product.jpg" width="400" height="400" alt="...">
```

### Recipe 2: Reservar espacio para contenido dinámico
```css
/* Para banners/ads que cargan después */
.ad-container {
  min-height: 90px; /* altura conocida del ad */
  width: 100%;
}
```

---

## Fix: SCROLL_JANK

### Recipe 1: Passive listeners + requestAnimationFrame
```javascript
// ANTES: bloquea scroll thread
window.addEventListener('scroll', () => {
  const rect = element.getBoundingClientRect(); // fuerza layout sync
  doSomethingWithRect(rect);
});

// DESPUÉS: no bloquea, usa rAF para batching
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      doSomethingWithRect(rect);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
```

### Recipe 2: GPU acceleration para elementos animados
```css
/* ANTES: CPU rendering */
.card:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  transform: translateY(-4px);
}

/* DESPUÉS: GPU compositing */
.card {
  will-change: transform; /* crea composite layer */
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
```

### Recipe 3: Intersection Observer para lazy loading suave
```javascript
// MEJOR que scroll listeners para lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
      observer.unobserve(entry.target); // dejar de observar una vez cargado
    }
  });
}, {
  rootMargin: '200px', // cargar 200px antes de que sea visible
  threshold: 0
});

document.querySelectorAll('[data-lazy]').forEach(el => observer.observe(el));
```

---

## Fix: PAINT_FLICKER / FOUC

### Recipe 1: Dark mode sin flash (Next.js)
```html
<!-- En _document.tsx, ANTES del body render -->
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      const theme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })()
  `
}} />
```

### Recipe 2: Evitar FOUC con font loading
```javascript
// Esperar a que las fuentes carguen antes de mostrar contenido
document.fonts.ready.then(() => {
  document.body.classList.add('fonts-loaded');
});
```
```css
body { visibility: hidden; }
body.fonts-loaded { visibility: visible; }
```

---

## Fix: HYDRATION (React/Next.js)

### Recipe 1: Componente client-only
```jsx
// Envuelve componentes que usan APIs del browser
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(() => import('./MyComponent'), {
  ssr: false,
  loading: () => <Skeleton />
});
```

### Recipe 2: useIsClient hook
```javascript
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}

// Uso:
function MyComponent() {
  const isClient = useIsClient();
  return <div>{isClient ? <ClientContent /> : <ServerContent />}</div>;
}
```

---

## Animaciones: Solo transform + opacity

```css
/* ❌ NUNCA animar estas propiedades (fuerzan reflow/repaint): */
/* width, height, padding, margin, top, left, right, bottom,
   border, font-size, background-color (en algunos casos) */

/* ✅ SIEMPRE preferir estas (solo compositing, sin reflow): */
.animate-me {
  transition: transform 300ms ease, opacity 300ms ease;
}
.animate-me.visible {
  transform: translateY(0) scale(1);
  opacity: 1;
}
.animate-me.hidden {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
```

# Bug Patterns Reference

## RENDER_CHUNK — Renderizado por pedazos

### Síntomas
- La página se ve cargar "en secciones" de arriba a abajo
- Al hacer scroll rápido, partes del contenido aparecen con delay
- Contenido visible "pops in" de repente
- En video/screenshot: mitad de pantalla blanca, luego aparece contenido

### Causas más comunes
1. **CSS no crítico bloqueando render** — stylesheets en `<head>` sin `media` attribute
2. **JavaScript render-blocking** — `<script>` sin `defer` o `async` antes del contenido
3. **Imágenes sin dimensiones** — El layout se recalcula cuando carga cada imagen
4. **Fonts bloqueando render** — `font-display: block` (default) congela texto hasta cargar font
5. **React/Vue hydration tardía** — SSR content visible pero no interactivo, luego flash
6. **`content-visibility: auto` mal implementado** — skip de rendering agresivo
7. **Intersection Observer threshold mal calibrado** — lazy load que activa muy tarde
8. **CSS animations que disparan en mount** — `animation-delay: 0` con `opacity: 0` inicial

### Diagnóstico rápido
```
DevTools → Performance → Record → Scroll → 
Buscar: "Recalculate Style" + "Layout" frecuentes = layout thrashing
Buscar: "Paint" grandes y frecuentes = repintura innecesaria
Buscar: "Composite Layers" ausente = sin GPU acceleration
```

---

## LAYOUT_SHIFT — Desplazamiento de layout (CLS)

### Síntomas
- Elementos se mueven solos mientras carga la página
- Botones/links se desplazan cuando el usuario va a hacer click
- Texto que salta cuando carga la fuente
- Ads, banners o iframes que aparecen y empujan contenido

### Causas
1. Imágenes sin `width`/`height` o `aspect-ratio`
2. Ads dinámicos insertados sin reservar espacio
3. Fonts sin `font-display: swap`/`optional`
4. Contenido dinámico insertado encima de contenido existente
5. Animaciones que cambian propiedades que afectan layout (`width`, `height`, `margin`)

### Threshold CLS
- ✅ Bueno: < 0.1
- ⚠️ Mejorable: 0.1 – 0.25  
- ❌ Malo: > 0.25

---

## SCROLL_JANK — Scroll no suave

### Síntomas
- FPS baja al hacer scroll (sensación pegajosa)
- Scroll que se "traba" brevemente
- En DevTools Performance: frames que toman >16ms

### Causas
1. Event listeners de scroll sin `{ passive: true }`
2. JavaScript ejecutándose en el scroll thread
3. `getBoundingClientRect()` en scroll handlers (fuerza sync layout)
4. Shadows o blur filters costosos en elementos que hacen scroll
5. `background-attachment: fixed` (deshabilita GPU compositing)
6. Demasiados elementos en el DOM (>1500 nodos activos)
7. Imágenes no optimizadas que el browser tiene que escalar en tiempo real

### Fix rápido
```javascript
// SIEMPRE usar passive en scroll listeners
window.addEventListener('scroll', handler, { passive: true });

// Debounce o requestAnimationFrame para lógica costosa
window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    // lógica aquí
  });
}, { passive: true });
```

---

## PAINT_FLICKER — FOUC / Flash blanco

### Síntomas
- Pantalla blanca momentánea al navegar
- Flash of Unstyled Content (texto sin estilos por milisegundos)
- Tema oscuro/claro que parpadea al cargar

### Causas
1. CSS cargando async cuando debería ser crítico/inline
2. Tema (dark mode) calculado en JS después del render inicial
3. Next.js: `_document.tsx` sin el script de tema en `<head>`
4. Fuentes web sin fallback apropiado

---

## HYDRATION — Error de hidratación (React/Next/Vue)

### Síntomas
- Contenido correcto en SSR pero luego "parpadea" al cargar JS
- Error en consola: "Hydration failed" / "Text content does not match"
- Componente que muestra versión server luego cambia a client

### Causas
1. `typeof window !== 'undefined'` checks que producen output diferente server/client
2. Fechas/tiempos que difieren entre server y client
3. `Math.random()` o IDs únicos generados en render
4. CSS-in-JS que no hace SSR correctamente

---

## IMG_LAZY — Imágenes que aparecen tarde

### Síntomas
- Imágenes "pop in" mientras haces scroll
- Layout que salta cuando una imagen termina de cargar
- Hero image que aparece después del texto

### Causas
1. `loading="lazy"` en imágenes above-the-fold (¡no usar lazy en lo visible!)
2. Imágenes sin `width`/`height` definidos
3. Sin `fetchpriority="high"` en imagen hero principal
4. `srcset` mal configurado → browser descarga imagen incorrecta

### Regla de oro
```html
<!-- Above fold: NUNCA lazy, SIEMPRE dimensiones -->
<img src="hero.jpg" width="1200" height="600" fetchpriority="high" alt="...">

<!-- Below fold: lazy está bien -->
<img src="product.jpg" width="400" height="400" loading="lazy" alt="...">
```

---

## FONT_SWAP — Cambio de fuente visible

### Síntomas
- Texto que "salta" o cambia de tamaño durante la carga
- Layout shift causado por diferencia entre fuente fallback y fuente web

### Fix
```css
@font-face {
  font-family: 'MiFuente';
  src: url('fuente.woff2') format('woff2');
  font-display: swap; /* o 'optional' para máx. rendimiento */
}
```

```html
<!-- Preload de fuentes críticas -->
<link rel="preload" href="/fonts/fuente.woff2" as="font" type="font/woff2" crossorigin>
```

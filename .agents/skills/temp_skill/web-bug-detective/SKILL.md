---
name: web-bug-detective
description: >
  Detecta, analiza y diagnostica bugs visuales y de rendimiento en páginas web con máxima precisión.
  Úsala SIEMPRE que el usuario reporte: scroll glitchy, carga por pedazos (chunked rendering),
  parpadeos, layout shifts, animaciones rotas, imágenes que cargan tarde, lag en interacciones,
  flickers, elementos que aparecen de golpe, CLS (Cumulative Layout Shift), FCP/LCP lentos,
  problemas de paint, compositing, z-index raro, reflows, jank, o cualquier bug visual/UX en
  una página web. También úsala cuando el usuario diga "la página se ve rara", "hay un bug al
  hacer scroll", "algo carga mal", o comparta screenshots/videos de bugs visuales. Esta skill
  recopila TODO el contexto relevante (HTML, CSS, JS, assets, métricas) para diagnosticar al
  100% cualquier bug de renderizado o rendimiento.
---

# 🔍 Web Bug Detective

Skill para recopilar contexto completo de bugs visuales/rendimiento en páginas web y generar
un diagnóstico accionable. El objetivo: **cero ambigüedad** — cualquier IA o desarrollador
que reciba el reporte debe poder reproducir y resolver el bug sin pedir más info.

---

## FASE 1 — Identificar el tipo de bug

Antes de recopilar archivos, clasifica el bug según lo que el usuario describe o muestra:

### Categorías principales

| Código | Tipo | Síntomas típicos |
|--------|------|-----------------|
| `RENDER_CHUNK` | Renderizado por pedazos | Página carga en secciones visibles, scroll muestra contenido apareciendo |
| `LAYOUT_SHIFT` | Desplazamiento de layout | Elementos se mueven solos, CLS alto, botones que saltan |
| `PAINT_FLICKER` | Parpadeo/flash | Pantalla blanca momentánea, flash of unstyled content (FOUC) |
| `SCROLL_JANK` | Scroll no suave | FPS baja al hacer scroll, sensación de "pegajoso" |
| `ANIM_BROKEN` | Animación rota | CSS/JS animation que se traba, salta frames, no termina |
| `IMG_LAZY` | Imágenes tardías | Imágenes aparecen después del contenido, layout jumps |
| `FONT_SWAP` | Cambio de fuente | Texto que cambia de tamaño/familia durante carga |
| `HYDRATION` | Error de hidratación | React/Vue/Next.js — contenido que parpadea al hidratarse |
| `Z_INDEX` | Problema de capas | Elementos encima/debajo incorrectamente, overlapping |
| `OVERFLOW` | Desbordamiento | Scrollbar horizontal inesperado, contenido cortado |

**→ Lee `references/bug-patterns.md` para síntomas detallados y causas comunes de cada tipo.**

---

## FASE 2 — Recopilar archivos del proyecto

Pide al usuario que comparta o ejecuta el script de recopilación automática.

### Opción A: Script automático (recomendado)

```bash
# El usuario ejecuta esto en la raíz de su proyecto:
python scripts/collect_context.py --url http://localhost:3000 --output bug-report/
```

Lee `scripts/collect_context.py` para ver qué recopila exactamente.

### Opción B: Recopilación manual

Si no hay script disponible, solicita exactamente estos archivos/información:

#### 🏗️ Estructura & HTML
- [ ] HTML del componente/página afectada (o URL para fetch)
- [ ] Template principal (`index.html`, `_document.tsx`, `layout.tsx`, etc.)
- [ ] Cualquier HTML generado dinámicamente relacionado

#### 🎨 Estilos (CSS/SCSS/Tailwind)
- [ ] Archivo CSS principal del componente afectado
- [ ] CSS global / reset styles
- [ ] Variables CSS / design tokens
- [ ] Media queries relevantes
- [ ] Animaciones y keyframes (`@keyframes`, `transition`, `transform`)
- [ ] Config de Tailwind si aplica (`tailwind.config.js`)

#### ⚙️ JavaScript / Lógica
- [ ] Componente principal donde ocurre el bug (`.jsx/.tsx/.vue/.svelte`)
- [ ] Hooks/composables de scroll, resize, intersection observer
- [ ] Código de lazy loading / dynamic imports
- [ ] Código de fetching de datos (SWR, React Query, fetch calls)
- [ ] Cualquier `useEffect` / `onMounted` que manipule el DOM

#### 🖼️ Assets e imágenes
- [ ] Lista de imágenes usadas en la sección afectada
- [ ] Formatos y tamaños (ej: `hero.jpg` — 2.4MB, 3840×2160)
- [ ] Si usan `next/image`, `<picture>`, o `<img>` estándar
- [ ] Config de optimización de imágenes

#### 📦 Build & Config
- [ ] `package.json` (dependencias relevantes y versiones)
- [ ] Config del bundler: `next.config.js`, `vite.config.ts`, `webpack.config.js`
- [ ] Config de fonts: `@font-face`, Google Fonts imports, `font-display`
- [ ] `.env` relevante (sin secrets) — variables que afecten rendering

#### 📊 Métricas de rendimiento
- [ ] Screenshot o video del bug (ya proporcionado si el usuario lo compartió)
- [ ] Lighthouse report si tienen uno
- [ ] Pestaña Performance de DevTools (screenshot o JSON export)
- [ ] Console errors/warnings al momento del bug
- [ ] Network waterfall de la carga inicial

---

## FASE 3 — Análisis del contexto recopilado

Con todos los archivos en mano, realiza este análisis sistemático:

### 3.1 Inspección de CSS crítica

Busca estos patrones problemáticos:

```css
/* ❌ PROBLEMA: Animaciones que fuerzan reflow */
.element { transition: width, height, margin, padding; }

/* ❌ PROBLEMA: Sin will-change para elementos animados */
.scroll-element { transform: translateY(0); }
/* Debería ser: */
.scroll-element { transform: translateY(0); will-change: transform; }

/* ❌ PROBLEMA: Font sin font-display */
@font-face { src: url('font.woff2'); }
/* Debería ser: */
@font-face { src: url('font.woff2'); font-display: swap; }

/* ❌ PROBLEMA: Imágenes sin dimensiones explícitas → CLS */
img { width: 100%; }
/* Debería ser: */
img { width: 100%; aspect-ratio: 16/9; }
```

### 3.2 Inspección de JS/Componentes

Busca:
- `setTimeout`/`setInterval` que manipulen el DOM
- `scroll` event listeners sin `passive: true`
- `getBoundingClientRect()` / `offsetHeight` en loops (fuerzan layout)
- Lazy loading sin `loading="lazy"` o Intersection Observer mal configurado
- `useState` que cause re-renders en cada scroll event
- `useEffect` sin cleanup que deje listeners activos

### 3.3 Checklist de renderizado

```
□ ¿Las imágenes tienen width/height explícitos?
□ ¿Los fonts usan font-display: swap o optional?
□ ¿Hay skeleton screens o placeholders para contenido dinámico?
□ ¿Las animaciones usan solo transform y opacity?
□ ¿Los scroll listeners tienen { passive: true }?
□ ¿Hay content-visibility: auto en secciones largas?
□ ¿El CSS crítico está inlined o en <head>?
□ ¿Hay render-blocking scripts sin defer/async?
□ ¿Las fuentes están preloaded?
□ ¿Hay layout thrashing (read → write → read → write)?
```

**→ Lee `references/fix-recipes.md` para soluciones específicas por tipo de bug.**

---

## FASE 4 — Generar el Bug Report

Produce un reporte estructurado con este formato exacto:

```markdown
# Bug Report: [TIPO_BUG] en [nombre-página/componente]

## Resumen ejecutivo
[1-2 oraciones describiendo el bug y su impacto en el usuario]

## Reproducción
- **URL/Componente**: 
- **Pasos**: 
- **Frecuencia**: siempre / intermitente / bajo condiciones X

## Causa raíz identificada
[Explicación técnica precisa de QUÉ está causando el bug]

## Archivos afectados
| Archivo | Línea(s) | Problema |
|---------|----------|---------|
| `ComponentX.tsx` | 45-67 | useEffect sin deps causa re-render en scroll |
| `styles.css` | 120 | transition: height fuerza reflow |

## Fix recomendado
[Código exacto del fix, listo para copiar-pegar]

## Métricas esperadas post-fix
- Before: LCP ~4.2s → After: LCP ~1.8s
- Before: CLS 0.25 → After: CLS < 0.1
- Before: scroll FPS ~20 → After: scroll FPS ~60

## Fixes secundarios (nice-to-have)
[Lista de mejoras adicionales no urgentes]

## Contexto para otra IA
[Párrafo compacto con todo el contexto técnico para pasarle a otro modelo]
```

---

## FASE 5 — Contexto comprimido para traspaso a otra IA

Al final del reporte, genera siempre este bloque comprimido:

```
[BUG_CONTEXT_TRANSFER]
Stack: [Next.js 14 / React 18 / Tailwind / etc]
Bug: [RENDER_CHUNK durante scroll rápido]
Causa: [useEffect en ScrollComponent.tsx:45 lee offsetHeight en cada scroll event causando layout thrashing + imágenes sin dimensiones causan CLS 0.3]
Archivos clave: [ScrollComponent.tsx, global.css:120-145, next.config.js]
Fix aplicar: [1. Agregar passive:true al listener, 2. Debounce con 16ms, 3. Añadir aspect-ratio a img tags]
Prioridad: ALTA — afecta LCP y UX en móvil
[/BUG_CONTEXT_TRANSFER]
```

Este bloque está diseñado para pegarse directamente en cualquier IA como contexto inicial.

---

## Referencia rápida de herramientas de diagnóstico

### DevTools
```javascript
// Detectar layout thrashing en consola
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (entry.duration > 50) console.warn('Long task:', entry);
  });
});
observer.observe({ entryTypes: ['longtask'] });
```

```javascript
// Medir CLS manualmente
let clsValue = 0;
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) clsValue += entry.value;
  }
  console.log('CLS actual:', clsValue);
}).observe({ type: 'layout-shift', buffered: true });
```

### CSS para debug visual
```css
/* Pegar temporalmente para ver qué hace reflow */
* { outline: 1px solid red !important; }
.suspect-element { background: rgba(255,0,0,0.1) !important; }
```

**→ Ver `references/devtools-guide.md` para guía completa de DevTools para bugs visuales.**

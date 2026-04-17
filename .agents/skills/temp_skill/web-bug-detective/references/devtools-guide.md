# DevTools Guide para bugs visuales

## Performance Tab — El más importante

### Cómo grabar un bug de scroll
1. Abre DevTools → Performance
2. Activa "Screenshots" y "Web Vitals" checkboxes
3. Click "Record" (círculo rojo)
4. Reproduce el bug (scroll rápido, etc.) durante ~3-5 segundos
5. Click "Stop"

### Qué buscar en el flamegraph

```
Main Thread Timeline:
┌─────────────────────────────────────────────────────┐
│ [Task >50ms = Long Task ⚠️] [Task] [Task] [Task]    │
│   └─ Script Evaluation                               │
│        └─ Event: scroll                              │
│             └─ Recalculate Style  ← buscar esto      │
│             └─ Layout             ← y esto           │
│             └─ Paint              ← y esto           │
└─────────────────────────────────────────────────────┘
```

**Red flags:**
- 🔴 Tasks > 50ms → bloquean el hilo principal
- 🔴 "Recalculate Style" + "Layout" frecuentes durante scroll → layout thrashing  
- 🔴 "Paint" grandes → repintado costoso
- 🔴 Ausencia de "Composite Layers" → sin GPU acceleration

### Core Web Vitals en Performance
- **LCP** (Largest Contentful Paint): < 2.5s ✅ | 2.5-4s ⚠️ | >4s ❌
- **CLS** (Cumulative Layout Shift): < 0.1 ✅ | 0.1-0.25 ⚠️ | >0.25 ❌
- **INP** (Interaction to Next Paint): < 200ms ✅ | 200-500ms ⚠️ | >500ms ❌

---

## Rendering Tab — Para bugs visuales

Activa desde: DevTools → ⋮ → More tools → Rendering

| Opción | Para qué sirve |
|--------|---------------|
| **Paint flashing** | Resalta en verde todo lo que se repinta. Mucho verde = problema |
| **Layout Shift Regions** | Resalta en azul los elementos que hacen CLS |
| **Scrolling performance issues** | Resalta en cyan elementos que afectan scroll |
| **FPS meter** | Muestra FPS en tiempo real mientras scrolleas |
| **Composited layer borders** | Muestra en naranja los composite layers (GPU layers) |

---

## Layers Panel — Para z-index y compositing

DevTools → ⋮ → More tools → Layers

Muestra un modelo 3D de todos los composite layers. 
- Demasiados layers → consumo excesivo de memoria GPU
- Muy pocos layers → todo en CPU, scroll lento

---

## Network Tab — Para carga de assets

### Waterfall de carga — qué buscar
```
Ideal:
HTML ──────────────────────────────────────────── [FCP]
CSS (crítico)  ───────
JS (defer)             ─────────────────
Fonts (preload) ──────────
Images (LCP)    ────────────────────── [LCP]

Problemático:
HTML ──────────────────────────────────────────── 
CSS ──────────────────── (bloqueando render)
JS ────────────────────────── (bloqueando render)
Fonts ──────────────────────────── [FCP tardío]
Images ────────────────────────────── [LCP muy tardío]
```

### Simular condiciones reales
- Network → Throttling → "Fast 3G" para simular móvil
- Performance → CPU → "4x slowdown" para simular móvil lento

---

## Console — Snippets útiles

### Detectar Layout Thrashing
```javascript
// Pegar en consola antes de reproducir el bug
const origGetBCR = Element.prototype.getBoundingClientRect;
let readCount = 0;
Element.prototype.getBoundingClientRect = function() {
  readCount++;
  if (readCount > 10) {
    console.trace('Posible layout thrashing — muchas lecturas de layout');
    readCount = 0;
  }
  return origGetBCR.apply(this, arguments);
};
```

### Medir FPS manualmente
```javascript
let lastTime = performance.now();
let frameCount = 0;
function measureFPS() {
  const now = performance.now();
  frameCount++;
  if (now - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
}
requestAnimationFrame(measureFPS);
```

### Detectar elementos que causan CLS
```javascript
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (!entry.hadRecentInput) {
      console.log('CLS entry:', entry.value, entry.sources);
      entry.sources?.forEach(source => {
        console.log('Elemento causante:', source.node);
        source.node?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
}).observe({ type: 'layout-shift', buffered: true });
```

### Listar todos los scroll listeners
```javascript
// Requiere extensión "getEventListeners" o chrome internals
// Alternativa: buscar en Sources con Ctrl+Shift+F "addEventListener('scroll'"
```

---

## Lighthouse — Auditoría completa

```bash
# Desde CLI para evitar extensiones que distorsionen resultados
npx lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-report.json \
  --throttling-method=simulate \
  --emulated-form-factor=mobile
```

**Métricas clave a exportar:**
- `audits.first-contentful-paint.numericValue`
- `audits.largest-contentful-paint.numericValue`  
- `audits.cumulative-layout-shift.numericValue`
- `audits.total-blocking-time.numericValue`
- `audits.render-blocking-resources.details.items`
- `audits.uses-optimized-images.details.items`

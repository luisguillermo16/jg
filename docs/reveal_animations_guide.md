# Guía de Implementación: Animaciones de Aparición (Reveal)

Esta guía detalla el sistema de animaciones utilizado en JG Producciones para lograr ese efecto "cinemático" donde el contenido aparece suavemente a medida que el usuario hace scroll, optimizando el rendimiento en todo momento.

---

## 1. El Motor: Intersection Observer (`useRevealOnScroll`)

Para animaciones que solo necesitan activarse una vez al entrar en pantalla, utilizamos el hook personalizado `useRevealOnScroll`.

### ¿Cómo funciona?
1. **Detección**: Utiliza la API nativa de `IntersectionObserver` para monitorizar elementos.
2. **Activación**: Cuando un elemento con la clase `.reveal-on-scroll` entra en el viewport (con un umbral del 15% por defecto), se le añade la clase `.active`.
3. **Optimización**: Una vez que el elemento es "activado", el observer deja de vigilarlo (`unobserve`) para ahorrar recursos de memoria.

**Código del Hook:** `src/hooks/useRevealOnScroll.ts`

---

## 2. La Estética y Optimización GPU

El "look" y el rendimiento se definen en el CSS. Hemos implementado una gestión inteligente de la memoria GPU.

```css
/* 1. Definición base */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 2. Optimización GPU Selectiva */
/* Solo activamos will-change mientras el elemento está pendiente de aparecer.
   Esto evita saturar la memoria GPU con elementos que no se están animando. */
.reveal-on-scroll:not(.active) {
  will-change: opacity, transform;
}

/* 3. Estado Activo */
.reveal-on-scroll.active {
  opacity: 1 !important;
  transform: translateY(0) !important;
  will-change: auto; /* Liberamos memoria GPU una vez terminada la animación */
}
```

### El Cubic-Bezier
El valor `cubic-bezier(0.16, 1, 0.3, 1)` es una curva tipo "Quart" que proporciona una aceleración agresiva al inicio y una desaceleración muy suave al final, clave para la estética premium.

---

## 3. Accesibilidad y Ahorro de Energía

Respetamos la configuración del sistema operativo del usuario. Si el usuario tiene habilitado "Reducir movimiento", las animaciones se desactivan instantáneamente.

```css
@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    will-change: auto !important;
  }
}
```

---

## 4. Animaciones Avanzadas con Framer Motion

Para componentes complejos (como el Hero o Grids), usamos **Framer Motion** con parámetros similares:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10% 0px" }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
>
  {/* Contenido */}
</motion.div>
```

### Parámetros Críticos:
- `viewport={{ once: true }}`: Evita re-animar si el usuario sube y baja.
- `margin: "-10%"`: Retrasa la activación para que ocurra cuando el elemento ya sea claramente visible.

---

## 5. Optimización para Móviles y Scroll Rápido

En dispositivos móviles, los usuarios tienden a hacer scroll muy rápido. Para evitar que el contenido se quede "atascado" en transparente, aplicamos estas reglas:

### A. Estrategia Híbrida (Hybrid Sync)
El problema real de los sitios modernos es el scroll rápido. Si el usuario baja a toda velocidad, el `IntersectionObserver` (que es asíncrono) puede tardar un frame de más y el elemento se queda invisible.

Para solucionar esto, usamos un sistema de doble seguridad:
1. **IntersectionObserver**: Para eficiencia estándar.
2. **Scroll Listener Síncrono**: Un detector de respaldo que revisa si hay elementos "perdidos" en cada movimiento de scroll.

### B. Optimización con requestAnimationFrame
Para que el scroll listener no afecte el rendimiento (evitando el *Layout Thrashing*), envolvemos la lógica de detección en un `requestAnimationFrame`. Esto asegura que los cálculos de posición solo ocurran cuando el navegador está listo para pintar, manteniendo 60fps sólidos.

```tsx
const activateVisible = () => {
  if (ticking) return;
  requestAnimationFrame(() => {
    // Lógica de detección aquí
    ticking = false;
  });
  ticking = true;
};
```

### C. Timings Snappier en CSS
... (resto del contenido) ...
En móviles, reducimos la duración de la transición para que el sitio se sienta más ágil:

```css
@media (max-width: 768px) {
  .reveal-on-scroll {
    transition: opacity 0.5s ease-out, transform 0.5s ease-out !important;
  }
}
```

### D. Framer Motion (Fast Trigger)
Para componentes de Framer Motion en móvil, usamos `amount: 0` en el viewport:

```tsx
<motion.div
  viewport={{ 
    once: true, 
    margin: "-5% 0px", 
    amount: 0 // Se activa con el primer píxel visible
  }}
/>
```

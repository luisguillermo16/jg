# 🎨 JG Producciones: Reglas de Diseño Visual

> **Source of Truth** — Estándares visuales inamovibles del proyecto. Cualquier cambio aquí impacta todo el sitio.

---

## 1. Identidad de Marca

| Token | Valor |
|---|---|
| **Color de Marca** | Neon Green `#A3FF00` |
| **Fondo Principal** | Deep Blue Black `#030712` |
| **Fondo Secciones** | `#050607` |

---

## 2. Tipografía

| Fuente | Uso | Peso |
|---|---|---|
| **Paloseco** | Logos, títulos de sección, botones CTA | 900 (Black) |
| **Inter** | Texto técnico, descripciones, UI | 400 – 700 |
| **Remixa** | Textos auxiliares premium | Variable |

> [!IMPORTANT]
> El idioma oficial es **Español (Castellano)**. Ningún texto, botón, placeholder ni label debe estar en inglés.

---

## 3. Estándares de Esquinas (Border Radius)

> [!CAUTION]
> Estos valores están fijos por decisión de diseño. No uniformizar con `rounded-full` ni cambiar sin revisión.

| Elemento | Valor | Variable CSS |
|---|---|---|
| **Botones del Home** (Hero, Categorías, Servicios, CTA) | `20px` | `var(--btn-radius)` — definida en `index.css` |
| **Botón del Navbar** | `12px` | Hardcoded en `Navbar.tsx` |
| **Cápsula del Navbar** | `12px` | Hardcoded en `Navbar.tsx` |

```css
/* src/index.css — Fuente de verdad para botones del Home */
--btn-radius: 20px;
```

---

## 4. Paleta de Colores por Componente

| Componente | Color de fondo | Acento |
|---|---|---|
| Navbar | `transparent` / blur glassmorphism | `#A3FF00` |
| Hero | `#000000` | `#A3FF00` |
| Categorías | `#050607` | `#A3FF00` |
| Servicios | `#050607` | `#A3FF00` |
| Stats / CTA | `#030712` | `#A3FF00` |
| Galería | `#000000` | Blanco |

---

## 5. Localización

*   **Idioma Oficial:** Español (Castellano) en todos los textos, botones y placeholders.
*   Ningún texto de UI debe estar en inglés, aunque el código fuente pueda estar en inglés.

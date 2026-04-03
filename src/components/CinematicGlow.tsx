/**
 * CinematicGlow — Fondo verde cinematográfico tipo Web3
 * Múltiples capas de gradiente con blur real y profundidad volumétrica.
 * Usado en: CategoriesSection, ServicesSection, GallerySection, Nosotros
 */

const CinematicGlow = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">

    {/* ── Base negra ── Contraste y profundidad, evita lavado */}
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to top, #000000 0%, #020500 60%, transparent 100%)`
      }}
    />

    {/* ── Capa 1: Glow principal — Luz base desde abajo ── */}
    <div
      className="absolute inset-0 blur-2xl opacity-80"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 100%,
            rgba(163, 255, 0, 0.4)  0%,
            rgba(163, 255, 0, 0.25) 30%,
            rgba(163, 255, 0, 0.1)  55%,
            transparent             75%)
        `
      }}
    />

    {/* ── Capa 2: Expansión lateral — Volumen y profundidad ── */}
    <div
      className="absolute inset-0 blur-3xl opacity-60"
      style={{
        background: `
          radial-gradient(ellipse 60% 40% at 80% 100%, rgba(163, 255, 0, 0.15), transparent 70%),
          radial-gradient(ellipse 60% 40% at 20% 100%, rgba(163, 255, 0, 0.15), transparent 70%)
        `
      }}
    />

    {/* ── Capa 3: Halo central (bonus premium) — Suaviza el corte ── */}
    <div
      className="absolute inset-0 blur-xl opacity-40 mix-blend-screen"
      style={{
        background: `
          radial-gradient(ellipse 40% 30% at 50% 95%,
            rgba(163, 255, 0, 0.35) 0%,
            transparent 65%)
        `
      }}
    />

  </div>
);

export default CinematicGlow;

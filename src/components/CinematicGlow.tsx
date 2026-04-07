/**
 * CinematicGlow — Fondo verde cinematográfico tipo Web3
 * Desktop: 3 capas con blur real y mix-blend para profundidad volumétrica.
 * Mobile:  gradiente puro sin blur (zero GPU compositing layers).
 */
import { isMobileDevice } from '../utils/deviceUtils';

const CinematicGlow = () => {
  // ── Mobile: gradient-only approximation (no blur = no GPU compositing) ──
  if (isMobileDevice) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base negra */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #000000 0%, #020500 60%, transparent 100%)' }}
        />
        {/* Glow simulado — gradiente grande y suave, sin blur */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 60% at 50% 105%,
                rgba(163, 255, 0, 0.28) 0%,
                rgba(163, 255, 0, 0.12) 45%,
                transparent 70%)
            `,
          }}
        />
      </div>
    );
  }

  // ── Desktop: full premium 3-layer blurred effect ──
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ── Base negra ── */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, #000000 0%, #020500 60%, transparent 100%)` }}
      />

      {/* ── Capa 1: Glow principal — blur-2xl ── */}
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

      {/* ── Capa 2: Expansión lateral — blur-3xl ── */}
      <div
        className="absolute inset-0 blur-3xl opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(163, 255, 0, 0.15), transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 100%, rgba(163, 255, 0, 0.15), transparent 70%)
          `
        }}
      />

      {/* ── Capa 3: Halo central — blur-xl mix-blend-screen ── */}
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
};

export default CinematicGlow;

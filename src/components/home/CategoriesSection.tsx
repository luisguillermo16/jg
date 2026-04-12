import { type FC, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import VolumeVideo from '../VolumeVideo';
import './CategoriesSection.css';
import { openContactModal } from '../../utils/modal';
import CinematicGlow from '../CinematicGlow';
import CinematicBackground from '../CinematicBackground';
import { isMobileDevice } from '../../utils/deviceUtils';

interface Category {
  id: string;
  title: string;
  description: string;
  video: string;
  tag: string;
}

interface CategoriesSectionProps {
  categoriesRef: React.RefObject<HTMLDivElement | null>;
  containerRef:  React.RefObject<HTMLDivElement | null>; // el .home-container scroll raíz
  categories:    Category[];
  progress:      number; // para las Capas Fantasma de video (hard-snap)
  isMuted:       boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ghost Layer — Opacidad de cada capa de video.
//
//  REGLA CLAVE: El crossfade TERMINA en el snap point, nunca empieza en él.
//  Así, cuando el usuario llega a un snap, el slide de llegada ya está al 100%.
//
//  Ventanas de transición (SLOT = 0.25, OVERLAP = 0.025):
//    Snap 0 (Intro)       : full desde inicio → fade-out [0.20, 0.25]
//    Snap 1 (Bodas)       : fade-in [0.20, 0.25] → full → fade-out [0.45, 0.50]
//    Snap 2 (Sociales)    : fade-in [0.45, 0.50] → full → fade-out [0.70, 0.75]
//    Snap 3 (Corporativos): fade-in [0.70, 0.75] → full → SIN fade-out (inmune)
//
//  En cada snap point, la capa que llega = opacity 1, la que sale = opacity 0.
// ─────────────────────────────────────────────────────────────────────────────
const mapRange = (val: number, in0: number, in1: number, out0: number, out1: number): number => {
  const t = Math.max(0, Math.min(1, (val - in0) / (in1 - in0)));
  return out0 + t * (out1 - out0);
};

const SLOT    = 0.25;
const OVERLAP = 0.025; // 10% del SLOT → 5% de ventana a cada lado del snap

const getCatLayerOpacity = (progress: number, slideIndex: number): number => {
  const snapIn   = slideIndex * SLOT;         // progress donde ESTA capa llega al 100%
  const snapNext = (slideIndex + 1) * SLOT;  // progress donde la SIGUIENTE llega al 100%

  // Fade-in: TERMINA exactamente en el snap point de esta capa (completa al 100% al llegar)
  const fadeIn = mapRange(progress, snapIn - 2 * OVERLAP, snapIn, 0, 1);

  // Fade-out: TERMINA exactamente en el snap point del siguiente slide
  // Corporativos (slideIndex=3): SIN fade-out — "Dwell Time" hasta salir de sección
  const fadeOut = slideIndex === 3
    ? 1
    : mapRange(progress, snapNext - 2 * OVERLAP, snapNext, 1, 0);

  return Math.min(fadeIn, fadeOut);
};

const CategoriesSection: FC<CategoriesSectionProps> = ({
  categoriesRef,
  containerRef,
  categories,
  progress,
  isMuted,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [loadedCount, setLoadedCount] = useState(0);
  /** En móvil un solo vídeo: no bloquear la UI esperando los 3 MP4 del desktop */
  const isAllLoaded = isMobileDevice || loadedCount >= categories.length;

  // ── 1. Capturamos el progreso real del scroll en el contenedor custom ──────
  //    offset: ["start start", "end end"] → progress 0 cuando el top de la
  //    sección llega al top del viewport, 1 cuando el bottom llega al bottom.
  const { scrollYProgress } = useScroll({
    target:    categoriesRef    as React.RefObject<HTMLElement>,
    container: containerRef    as React.RefObject<HTMLElement>,
    offset:    ['start start', 'end end'],
  });

  // ── 2. Spring suavizado — elimina el jank del scroll de ratón (Windows) ───
  //    stiffness/damping ajustados para sentirse "como mantequilla" en desktop
  //    mientras que en móvil (touch) la respuesta es casi directa.
  const smoothProgress = useSpring(scrollYProgress, isMobileDevice
    ? { stiffness: 420, damping: 45, restDelta: 0.008 }
    : { stiffness: 100, damping: 30, restDelta: 0.001 },
  );

  // ── 3. Mapeo cinemático del efecto de salida de la Intro ──────────────────
  //    Ventana: [SLOT - 2*OVERLAP, SLOT] = [0.20, 0.25]
  //    Termina EXACTAMENTE en el snap point de Bodas → cuando el usuario llega,
  //    la intro ya desapareció y Bodas está al 100% (sin solapamiento visible).

  // Capa fantasma de la intro (el div que contiene todo el slide)
  const introLayerOpacity = useTransform(
    smoothProgress,
    [SLOT - 2 * OVERLAP, SLOT], // [0.20, 0.25] — completa al llegar a snap 1
    [1, 0],
  );

  // Texto: triple efecto "tunnel" — TERMINA en el snap de Bodas (0.25)
  const introTextOpacity = useTransform(smoothProgress, [0.20, 0.25], [1,    0]);
  const introTextScale   = useTransform(smoothProgress, [0.20, 0.25], [1, 0.65]);
  const introBlurValue   = useTransform(smoothProgress, [0.20, 0.25], [0,   12]);
  const introTextFilter  = useTransform(introBlurValue, (v) => `blur(${v}px)`);

  // Fondo: zoom-in sutil y fade — también termina en 0.25
  const bgScale   = useTransform(smoothProgress, [0.20, 0.25], [1,   1.10]);
  const bgOpacity = useTransform(smoothProgress, [0.20, 0.25], [1,   0.40]);

  // ── Hard-snap para animaciones de texto de los slides de video ───────────
  const activeIndex    = Math.min(3, Math.floor(progress * 4)); // 0-intro 1-3 cats
  const activeCatIndex = activeIndex - 1;
  const isIntroActive  = activeIndex === 0;

  return (
    <section
      id="categories"
      ref={categoriesRef}
      className="cats-section"
    >
      {/* Overlay de carga: solo desktop (tres vídeos en paralelo) */}
      {!isMobileDevice && (
        <motion.div
          className="absolute inset-0 z-[500] bg-black pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAllLoaded ? 0 : 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
      {/* ── Invisible snap markers — 4 × 100dvh ── */}
      <div className="cats-snap-markers" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="cats-snap-stop" />
        ))}
      </div>

      {/* ── Sticky viewport ── */}
      <div className="cats-sticky">

        {/* Capa base permanente */}
        <div className="cats-base-bg" aria-hidden="true" />

        {/* ══════════════════════════════════════════════════════════
            CAPA 0 — Intro "Nuestras Categorías"

            Usamos motion.div en lugar de div normal para que Framer
            Motion actualice la opacidad directamente en el DOM sin
            pasar por el ciclo de re-render de React (0 jank).
            ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="cats-slide"
          style={{
            opacity:       introLayerOpacity, // MotionValue → DOM directo
            zIndex:        10,
            pointerEvents: isIntroActive ? 'auto' : 'none',
          }}
        >
          {/* Fondo: Composite Layer en GPU con zoom-in y fade */}
          <motion.div
            style={{
              width:    '100%',
              height:   '100%',
              scale:    bgScale,    // GPU composite — sin repaint
              opacity:  bgOpacity,
            }}
          >
            <CinematicBackground />
            <CinematicGlow />
          </motion.div>

          {/* Texto: efecto "tunnel" completo — scale + blur + fade
              x="-50%" y="-50%": Framer Motion compila esto en el mismo
              transform que scale, evitando conflicto con el CSS.
              willChange le avisa al browser ANTES de que empiece. */}
          <motion.div
            className="cat-intro-content"
            style={{
              x:          '-50%',
              y:          '-50%',
              opacity:    introTextOpacity,
              scale:      introTextScale,
              filter:     introTextFilter,
              willChange: 'transform, opacity, filter', // GPU composite layer
            }}
          >
            <h2 className={`cat-intro-title cat-intro-animate${isIntroActive ? ' is-visible' : ''}`}>
              Nuestras <br />
              Categorías
            </h2>
            <p className={`cat-intro-desc cat-intro-animate-desc${isIntroActive ? ' is-visible' : ''}`}>
              Especialistas en transformar la visión de cada cliente en una producción técnica sin precedentes.
            </p>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            CAPAS 1–3 — Bodas / Sociales / Corporativos
            Siguen usando Ghost Layers manuales (mapRange) porque el
            video corta en el canvas, no en el DOM — useTransform
            aquí no añade ventaja sobre mapRange con RAF.
            ══════════════════════════════════════════════════════════ */}
        {isMobileDevice
          ? activeCatIndex >= 0 &&
            (() => {
              const cat = categories[activeCatIndex];
              return (
                <div
                  key={cat.id}
                  className="cats-slide"
                  style={{
                    opacity: 1,
                    zIndex: 15,
                    pointerEvents: 'auto',
                    transition: 'none',
                  }}
                >
                  <div className="cats-bg-wrapper">
                    <VolumeVideo
                      src={cat.video}
                      isVisible
                      isMuted={isMuted}
                      loop
                      playsInline
                      autoPlay
                      preload="auto"
                      className="cats-bg-video"
                      onCanPlayThrough={() => setLoadedCount((p) => p + 1)}
                      style={{
                        transform: 'scale(1)',
                        transition: 'none',
                        willChange: 'auto',
                      }}
                    />
                    <div className="cats-bg-overlay" />
                  </div>

                  <div className="cats-content">
                    <h3 className="cat-title cats-reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
                      {cat.title}
                    </h3>
                    <p className="cat-desc cats-reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
                      {cat.description}
                    </p>
                    <div className="cat-cta cats-reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
                      <button type="button" onClick={openContactModal} className="cat-btn">
                        <span>Contactar</span>
                        <div className="cat-btn-shine" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()
          : categories.map((cat, i) => {
              const layerOpacity = getCatLayerOpacity(progress, i + 1);
              const isActive = activeCatIndex === i;

              return (
                <div
                  key={cat.id}
                  className="cats-slide"
                  style={{
                    opacity: layerOpacity,
                    zIndex: i + 1,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: 'none',
                    willChange: 'opacity',
                  }}
                >
                  <div className="cats-bg-wrapper">
                    <VolumeVideo
                      src={cat.video}
                      isVisible={layerOpacity > 0.05}
                      isMuted={isMuted}
                      loop
                      playsInline
                      autoPlay
                      className="cats-bg-video"
                      onCanPlayThrough={() => setLoadedCount((p) => p + 1)}
                      style={{
                        transform: isActive && !shouldReduceMotion ? 'scale(1.06)' : 'scale(1)',
                        transition: isActive && !shouldReduceMotion
                          ? 'transform 12s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                          : 'none',
                        willChange: isActive ? 'transform' : 'auto',
                      }}
                    />
                    <div className="cats-bg-overlay" />
                  </div>

                  <div className="cats-content">
                    <h3
                      className="cat-title cats-reveal"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(22px)',
                        transitionDelay: isActive ? '0.35s' : '0s',
                        willChange: isActive ? 'opacity, transform' : 'auto',
                      }}
                    >
                      {cat.title}
                    </h3>

                    <p
                      className="cat-desc cats-reveal"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                        transitionDelay: isActive ? '0.55s' : '0s',
                        willChange: isActive ? 'opacity, transform' : 'auto',
                      }}
                    >
                      {cat.description}
                    </p>

                    <div
                      className="cat-cta cats-reveal"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                        transitionDelay: isActive ? '0.75s' : '0s',
                        willChange: isActive ? 'opacity, transform' : 'auto',
                      }}
                    >
                      <button type="button" onClick={openContactModal} className="cat-btn">
                        <span>Contactar</span>
                        <div className="cat-btn-shine" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default CategoriesSection;

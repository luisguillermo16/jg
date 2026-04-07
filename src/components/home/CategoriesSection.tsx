import { type FC, useEffect, useState } from 'react';
import VolumeVideo from '../VolumeVideo';
import './CategoriesSection.css';
import { openContactModal } from '../../utils/modal';
import CinematicGlow from '../CinematicGlow';
import { isMobileDevice } from '../../utils/deviceUtils';
import seccionesImg from '../../assets/home/img/secciones.webp';

interface Category {
  id: string;
  title: string;
  description: string;
  video: string;
  tag: string;
}

interface CategoriesSectionProps {
  categoriesRef: React.RefObject<HTMLDivElement | null>;
  categories: Category[];
  progress: number;
  isMuted: boolean;
}

const CategoriesSection: FC<CategoriesSectionProps> = ({
  categoriesRef,
  categories,
  progress,
  isMuted,
}) => {
  // 4 screens (Intro + 3 cats) over a 500vh scroll range.
  // 5 snap stops over 500vh → each at cProg 0, 0.2, 0.4, 0.6, 0.8
  const activeIndex = Math.min(3, Math.floor(progress * 5));
  const activeCatIndex = activeIndex - 1; // -1 = intro, 0-2 = categories

  // Dispara la animación CSS del intro en el primer frame de pintura
  // (no depende de IntersectionObserver ni de Framer Motion)
  const [introReady, setIntroReady] = useState(false);
  useEffect(() => {
    // requestAnimationFrame garantiza que el DOM ya pintó antes de añadir la clase
    const raf = requestAnimationFrame(() => {
      setIntroReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);


  return (
    <section
      id="categories"
      ref={categoriesRef}
      className="cats-section"
    >
      {/* ── Invisible snap markers — 4 × 100vh ── */}
      <div className="cats-snap-markers" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="cats-snap-stop" />
        ))}
      </div>

      {/* ── Sticky viewport — stays fixed while user scrolls 400vh ── */}
      {/* cats-sticky: GPU compositor layer (will-change + backface en CSS) */}
      <div className="cats-sticky">

        {/* Layer base permanente — nunca muestra negro puro durante crossfade */}
        <div className="cats-base-bg" aria-hidden="true" />

        {/* ── SLIDE 0: Intro ── */}
        <div
          className="cats-slide"
          style={{
            opacity: activeIndex === 0 ? 1 : 0,
            zIndex: activeIndex === 0 ? 2 : 1,
            // Incoming: sin transición (aparece al instante, nunca hay negro)
            // Outgoing: fade suave
            transition: activeIndex === 0 ? 'none' : 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <CinematicGlow />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={seccionesImg}
              alt=""
              className="w-full h-full object-cover brightness-100"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>

          <div className="cat-intro-content relative z-10">
            {/* Animación CSS pura — clase .is-visible disparada en el primer frame */}
            <h2 className={`cat-intro-title cat-intro-animate${introReady ? ' is-visible' : ''}`}>
              Nuestras <br />
              Categorías
            </h2>

            <p className={`cat-intro-desc cat-intro-animate-desc${introReady ? ' is-visible' : ''}`}>
              Especialistas en transformar la visión de cada cliente en una producción técnica sin precedentes.
            </p>
          </div>
        </div>

        {/* ════ SLIDES 1–3: Category videos ════ */}
        {categories.map((cat, i) => {
          const isActive = activeCatIndex === i;
          return (
            <div
              key={cat.id}
              className="cats-slide"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                // Incoming: sin transición (aparece al instante)
                // Outgoing: fade suave — nunca hay frame de negro puro
                transition: isActive ? 'none' : 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Ken Burns background wrapper */}
              <div className="cats-bg-wrapper">
                <VolumeVideo
                  src={cat.video}
                  autoPlay
                  loop
                  preload="metadata"
                  isMuted={isMuted}
                  isVisible={isActive}
                  playsInline
                  className="cats-bg-video"
                  style={{
                    // Mobile: no Ken Burns (CPU/GPU savings)
                    transform: (isActive && !isMobileDevice) ? 'scale(1.15)' : 'scale(1)',
                    transition: (isActive && !isMobileDevice)
                      ? 'transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      : 'none',
                    // will-change solo en el slide activo
                    willChange: isActive ? 'transform' : 'auto',
                  }}
                />
                {/* Overlay 50% */}
                <div className="cats-bg-overlay" />
              </div>

              {/* Text content — bottom left, staggered reveal */}
              <div className="cats-content">
                {/* Title */}
                <h3
                  className="cat-title cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.4s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                    // will-change solo en elementos que están animando
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className="cat-desc cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.65s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(22px)',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {cat.description}
                </p>

                {/* CTA */}
                <div
                  className="cat-cta cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.9s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(18px)',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  <button onClick={openContactModal} className="cat-btn">
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

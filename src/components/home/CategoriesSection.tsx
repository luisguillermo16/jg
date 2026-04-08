import { type FC } from 'react';
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
  const activeIndex = Math.min(3, Math.floor(progress * 5));
  const activeCatIndex = activeIndex - 1; // -1 = intro, 0-2 = categories
  const isIntroActive = activeIndex === 0;

  // ── Lógica de Fluidez con Overlap ──
  // Con LERP en Home.tsx, ahora podemos usar una ventana razonable para apreciar el zoom
  const introExitStart = 0.02;
  const introExitEnd = 0.16;
  const rawExitNorm = Math.min(1, Math.max(0, (progress - introExitStart) / (introExitEnd - introExitStart)));
  
  // Curva de Fluidez Sedosa
  const introExitNorm = Math.pow(rawExitNorm, 1.2); 

  // Revelado del primer video (Overlap Fluido)
  const slide1RevealStart = 0.06;
  const slide1RevealEnd = 0.18;
  const rawSvc1Norm = Math.min(1, Math.max(0, (progress - slide1RevealStart) / (slide1RevealEnd - slide1RevealStart)));
  const slide1RevealNorm = Math.pow(rawSvc1Norm, 1.0);

  // Estilos dinámicos de salida para el contenido de la intro
  const introContentStyles = {
    opacity: 1 - Math.pow(introExitNorm, 1.8),
    transform: `translate(-50%, -50%) scale(${1 - introExitNorm * 0.35})`,
    filter: `blur(${introExitNorm * 12}px)`,
    transition: 'none', // Sincronizado con el scroll
    willChange: 'transform, opacity, filter',
  };

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
      <div className="cats-sticky">

        {/* Layer base permanente — nunca muestra negro puro durante crossfade */}
        <div className="cats-base-bg" aria-hidden="true" />

        {/* ── SLIDE 0: Intro ── */}
        <div
          className="cats-slide"
          style={{
            // La intro permanece visible hasta que el zoom de salida termina
            opacity: progress < introExitEnd ? 1 : 0,
            zIndex: progress < introExitEnd ? 10 : 1,
            pointerEvents: isIntroActive ? 'auto' : 'none',
            // Solo animamos la opacidad total si no estamos en el rango de scroll controlado
            transition: (progress > 0 && progress < introExitEnd) ? 'none' : 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              opacity: 1 - introExitNorm,
              transform: `scale(${1 + introExitNorm * 0.1})`,
              transition: 'none'
            }}
          >
            <CinematicBackground />
            <CinematicGlow />
          </div>

          <div
            className="cat-intro-content relative z-10"
            style={introContentStyles}
          >
            <h2 className={`cat-intro-title cat-intro-animate${isIntroActive ? ' is-visible' : ''}`}>
              Nuestras <br />
              Categorías
            </h2>

            <p className={`cat-intro-desc cat-intro-animate-desc${isIntroActive ? ' is-visible' : ''}`}>
              Especialistas en transformar la visión de cada cliente en una producción técnica sin precedentes.
            </p>
          </div>
        </div>

        {/* ════ SLIDES 1–3: Category videos ════ */}
        {categories.map((cat, i) => {
          const isActive = activeCatIndex === i;
          const isSlide1 = i === 0;
          const isVisible = isActive || (isSlide1 && progress > slide1RevealStart && progress < 0.4);

          return (
            <div
              key={cat.id}
              className="cats-slide"
              style={{
                opacity: isSlide1
                  ? (progress < 0.2 ? slide1RevealNorm : (isActive ? 1 : 0))
                  : (isActive ? 1 : 0),
                zIndex: isActive ? 5 : (isSlide1 && progress < 0.25 ? 2 : 1),
                pointerEvents: isActive ? 'auto' : 'none',
                transition: isActive ? 'none' : (progress < 0.25 && isSlide1 ? 'none' : 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'),
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
                  isVisible={isVisible}
                  playsInline
                  className="cats-bg-video"
                  style={{
                    // Ken Burns sutil y constante
                    transform: (isActive && !isMobileDevice) ? 'scale(1.1)' : 'scale(1)',
                    transition: (isActive && !isMobileDevice)
                      ? 'transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      : 'none',
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
                    transform: isActive ? 'translateY(0)' : 'translateY(22px)',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className="cat-desc cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.6s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {cat.description}
                </p>

                {/* CTA */}
                <div
                  className="cat-cta cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.8s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(10px)',
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

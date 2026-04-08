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
  // 4 screens (Intro + 3 cats) over a 500vh scroll range.
  // 5 snap stops over 500vh → each at cProg 0, 0.2, 0.4, 0.6, 0.8
  // 4 screens (Intro + 3 cats) over a 500vh scroll range.
  // each at cProg: Intro (0-0.2), Cat1 (0.2-0.4), Cat2 (0.4-0.6), Cat3 (0.6-0.8)
  const activeIndex = Math.min(3, Math.floor(progress * 5));
  const activeCatIndex = activeIndex - 1; // -1 = intro, 0-2 = categories
  const isIntroActive = activeIndex === 0;

  // --- Parallax Logic ---
  // Intro Parallax (0 to 0.2)
  const introFactor = Math.min(1, progress / 0.2);
  const introTitleY = -introFactor * 100; // Moves up 100px
  const introDescY = -introFactor * 60;   // Moves up 60px (staggered speed)

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
            opacity: isIntroActive ? 1 : 0,
            zIndex: isIntroActive ? 2 : 1,
            pointerEvents: isIntroActive ? 'auto' : 'none',
            transition: isIntroActive ? 'none' : 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            // @ts-ignore
            '--intro-parallax-title': `${introTitleY}px`,
            // @ts-ignore
            '--intro-parallax-desc': `${introDescY}px`,
          } as React.CSSProperties}
        >
          <CinematicBackground />
          <CinematicGlow />

          <div className="cat-intro-content relative z-10">
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
          
          const start = (i + 1) * 0.2;
          const end = (i + 2) * 0.2;
          const catProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)));
          const catContentY = (1 - catProgress) * 40;

          return (
            <div
              key={cat.id}
              className="cats-slide"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                pointerEvents: isActive ? 'auto' : 'none',
                transition: isActive ? 'none' : 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                // @ts-ignore
                '--cat-parallax-y': `${catContentY}px`
              } as React.CSSProperties}
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
                    // Combine Ken Burns with a slight scroll-linked scale
                    transform: (isActive && !isMobileDevice) 
                      ? `scale(${1.1 + (catProgress * 0.05)})` 
                      : 'scale(1)',
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
                    transitionDelay: isActive ? '0.3s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(25px)',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className="cat-desc cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.5s' : '0s',
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
                    transitionDelay: isActive ? '0.7s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(12px)',
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

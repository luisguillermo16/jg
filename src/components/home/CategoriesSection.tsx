import { type FC } from 'react';
import VolumeVideo from '../VolumeVideo';

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
  // 4 screens (Intro + 3 cats) over a 400vh scroll range.
  // progress 0→1 maps to screens 0→3 via round(progress * 3)
  const activeIndex = Math.min(3, Math.round(progress * 3));
  const activeCatIndex = activeIndex - 1; // -1 = intro, 0-2 = categories



  return (
    <section
      id="categories"
      ref={categoriesRef}
      className="cats-section"
    >
      {/* ── Invisible snap markers — 4 × 100vh ── */}
      <div className="cats-snap-markers" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="cats-snap-stop" />
        ))}
      </div>

      {/* ── Sticky viewport — stays fixed while user scrolls 400vh ── */}
      <div className="cats-sticky">

        <div
          className="cats-slide"
          style={{ opacity: activeIndex === 0 ? 1 : 0, zIndex: activeIndex === 0 ? 2 : 1 }}
        >
          <div className="cats-slide-bg" style={{ background: '#000' }} />
          <div
            className="cats-slide-bg cats-intro-glow"
            style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 100%, #1a3d00 0%, #050e00 60%, transparent 100%)', opacity: 0.7 }}
          />
          <div className="cat-intro-content">
            <h2 className="cat-intro-title">
              Nuestras <br />
              <span className="cat-intro-outline">Categorías</span>
            </h2>

            <p className="cat-intro-desc">
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
              style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 2 : 1 }}
            >
              {/* Ken Burns background wrapper */}
              <div className="cats-bg-wrapper">
                <VolumeVideo
                  src={cat.video}
                  autoPlay
                  loop
                  isMuted={isMuted}
                  isVisible={isActive}
                  playsInline
                  className="cats-bg-video"
                  style={{
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    transition: isActive
                      ? 'transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      : 'transform 1s ease',
                  }}
                />
                {/* Overlay 50% */}
                <div className="cats-bg-overlay" />
                {/* Bottom gradient for text legibility */}
                <div className="cats-bg-gradient" />
              </div>

              {/* Text content — bottom left, staggered reveal */}
              <div className="cats-content">
                {/* Tag */}
                <div
                  className="cat-tag-row cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.2s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(28px)',
                  }}
                >
                  <span className="cat-tag-line" />
                  <span className="cat-tag-text">{cat.tag}</span>
                </div>

                {/* Title */}
                <h3
                  className="cat-title cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.5s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(36px)',
                  }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className="cat-desc cats-reveal"
                  style={{
                    transitionDelay: isActive ? '0.8s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(24px)',
                  }}
                >
                  {cat.description}
                </p>

                {/* CTA */}
                <div
                  className="cat-cta cats-reveal"
                  style={{
                    transitionDelay: isActive ? '1.1s' : '0s',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  <button className="cat-btn">
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

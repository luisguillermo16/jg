import { type FC } from 'react';
import VolumeVideo from '../VolumeVideo';
import './CategoriesSection.css';
import { openContactModal } from '../../utils/modal';
import CinematicGlow from '../CinematicGlow';
import { isMobileDevice } from '../../utils/deviceUtils';
import seccionesImg from '../../assets/home/img/secciones.png';
import { motion } from 'framer-motion';

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
  // Math.floor(p * 5): 0→0, 0.2→1, 0.4→2, 0.6→3, 0.8→4 (capped to 3)
  const activeIndex = Math.min(3, Math.floor(progress * 5));
  const activeCatIndex = activeIndex - 1; // -1 = intro, 0-2 = categories


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

        <div
          className="cats-slide"
          style={{ opacity: activeIndex === 0 ? 1 : 0, zIndex: activeIndex === 0 ? 2 : 1 }}
        >
          <CinematicGlow />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src={seccionesImg} 
              alt="" 
              className="w-full h-full object-cover brightness-100"
            />
          </div>
          
          <div className="cat-intro-content relative z-10">
            {/* Cinematic reveal - triggers when section is in view and it's the intro slide */}
            <motion.h2
              className="cat-intro-title"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={activeIndex === 0 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -40, scale: 0.95 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Nuestras <br />
              Categorías
            </motion.h2>

            <motion.p 
              className="cat-intro-desc"
              initial={{ opacity: 0, y: 30 }}
              whileInView={activeIndex === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              Especialistas en transformar la visión de cada cliente en una producción técnica sin precedentes.
            </motion.p>
          </div>
          
          {/* Quick-access chips removed to match ServicesSection */}
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
                  preload="metadata"
                  isMuted={isMuted}
                  isVisible={isActive}
                  playsInline
                  className="cats-bg-video"
                  style={{
                    // Mobile: no Ken Burns (CPU/GPU savings), will-change only on active
                    transform: (isActive && !isMobileDevice) ? 'scale(1.15)' : 'scale(1)',
                    transition: (isActive && !isMobileDevice)
                      ? 'transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      : 'none',
                    willChange: isActive ? 'transform' : 'auto',
                  }}
                />
                {/* Overlay 50% */}
                <div className="cats-bg-overlay" />
                {/* Bottom gradient for text legibility */}
                <div className="cats-bg-gradient" />
              </div>

              {/* Text content — bottom left, staggered reveal */}
              <div className="cats-content">
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

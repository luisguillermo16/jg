import { type FC, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../../data/homeData';
import './CategoriesSection.css';

const CategoriesSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.5, // Se activa cuando el 50% del disparador es visible
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    triggerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="categorias" className="cats-section">
      {/* ── Disparadores de Scroll (Invisibles) ── */}
      <div className="cats-triggers">
        {CATEGORIES.map((_, i) => (
          <div 
            key={i} 
            ref={(el) => (triggerRefs.current[i] = el)} 
            className="cats-trigger" 
            data-index={i}
          />
        ))}
      </div>

      <div className="cats-sticky">

        {/* ── Video Layers ── */}
        {CATEGORIES.map((cat, idx) => (
          <div 
            key={cat.id} 
            className={`cats-slide ${idx === activeIndex ? 'active' : ''}`}
            style={{ 
              zIndex: idx === activeIndex ? 10 : 1,
              pointerEvents: idx === activeIndex ? 'auto' : 'none'
            }}
          >
            <div className="cats-video-wrapper">
              <video
                src={isMobile && cat.videoMobile ? cat.videoMobile : cat.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="cats-video"
              />
            </div>

            {/* ── Content ── */}
            <div className="cats-content">
              <AnimatePresence mode="wait">
                {idx === activeIndex && (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="cats-tag">{cat.tag}</span>
                    <h2 className="cats-title">{cat.title}</h2>
                    <p className="cats-desc">{cat.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}

        {/* ── Progress Indicators (Dots) ── */}
        <div className="cats-indicators">
          {CATEGORIES.map((_, i) => (
            <div 
              key={i} 
              className={`cats-dot ${i === activeIndex ? 'active' : ''}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

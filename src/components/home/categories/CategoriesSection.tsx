import { type FC, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { CATEGORIES } from '../../../data/homeData';
import './CategoriesSection.css';

const CategoriesSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
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

        {/* ── Control de Sonido ── */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-24 right-6 md:bottom-12 md:right-32 z-[100] p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-[#63D72A] hover:text-black transition-all duration-300"
          title={isMuted ? "Activar sonido" : "Desactivar sonido"}
        >
          {isMuted ? (
            <SpeakerXMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <SpeakerWaveIcon className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </button>

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
              {/* ✅ OPTIMIZACIÓN: Solo renderizamos el video si es el activo. 
                  Esto evita tener múltiples decodificadores de video saturando la GPU. */}
              {idx === activeIndex && (
                <video
                  src={isMobile && cat.videoMobile ? cat.videoMobile : cat.video}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className="cats-video"
                />
              )}
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

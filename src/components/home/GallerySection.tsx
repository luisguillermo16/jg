import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './GallerySection.css';
import CinematicGlow from '../CinematicGlow';




interface GallerySectionProps {
  activeGal: number;
  galleryImages: string[];
}

const GallerySection: FC<GallerySectionProps> = ({ activeGal, galleryImages }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImg) {
      document.body.classList.add('lightbox-active');
    } else {
      document.body.classList.remove('lightbox-active');
    }
    return () => document.body.classList.remove('lightbox-active');
  }, [selectedImg]);

  return (


    <section id="galeria" className="relative h-[400vh] bg-black">
      {/* Snap Points to manage the two stages (Intro vs Grid) */}
      <div className="absolute inset-0 pointer-events-none z-[50]">
        <div className="h-[200vh] w-full" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
        <div className="h-[200vh] w-full" style={{ scrollSnapAlign: 'start' }} />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Stage 1: Intro Screen (Full Page Title) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${activeGal === -1 ? 'opacity-100 scale-100 z-50' : 'opacity-0 scale-95 z-0 pointer-events-none'}`}>
          <CinematicGlow />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
            <motion.h2
              key="gallery-title"
              initial={{ opacity: 0, y: 40 }}
              animate={activeGal === -1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.25rem,12vw,9rem)] font-black text-white uppercase tracking-tighter leading-[0.9] md:leading-[0.8] mb-6 md:mb-12 px-2"
            >
              Nuestra <br />
              Galeria
            </motion.h2>

            <p className="text-white/60 text-base md:text-3xl max-w-3xl mx-auto font-playfair px-4 leading-snug">
              Capturamos la esencia de cada evento con el estilo y la precisión que nos caracteriza. Una curaduría visual de nuestras producciones más icónicas.
            </p>
          </div>
        </div>

        {/* Stage 2: Gallery Grid Feed (Revealed after scrolling) */}
        <div className={`absolute inset-0 z-10 flex items-start justify-center pt-[15vh] transition-all duration-1000 ease-out active-stage-2 ${activeGal === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-105 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black" />

          <div className="relative w-full max-w-[975px] h-[85vh] overflow-y-auto no-scrollbar px-0">

            {/* 3-Column Premium Grid (Instagram Style) */}
            <div className="instagram-gallery">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="gallery-item"
                  onClick={() => setSelectedImg(src)}
                >
                  <img
                    src={src}
                    alt={`Producción HG ${i + 1}`}
                    loading="lazy"
                  />
                  {/* Overlay icon for "Multiple Posts" */}
                  <div className="overlay-icon"></div>
                </div>
              ))}
            </div>
            {/* Scroll bottom spacer */}
          </div>
        </div>
      </div>

      {/* Instagram-style Modal/Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 transition-all duration-300 backdrop-blur-md"
          onClick={() => setSelectedImg(null)}
        >

          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:scale-110 transition-transform"
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
          >
            &times;
          </button>

          <div
            className="relative max-w-5xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg}
              alt="Enlarged visual"
              className="max-h-[85vh] max-w-full object-contain shadow-[0_0_100px_rgba(255,255,255,0.1)] rounded-sm"
            />
          </div>
        </div>
      )}
    </section>

  );
};


export default GallerySection;

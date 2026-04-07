import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './GallerySection.css';
import CinematicGlow from '../CinematicGlow';
const seccionesImg = 'https://luispineda.b-cdn.net/secciones.webp';




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
        <div className="h-[200vh] w-full" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Stage 1: Intro Screen (Full Page Title) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${activeGal === -1 ? 'opacity-100 scale-100 z-50' : 'opacity-0 scale-95 z-0 pointer-events-none'}`}>
          <CinematicGlow />

          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src={seccionesImg} 
              alt="" 
              className="w-full h-full object-cover brightness-100"
            />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
            {/* Cinematic reveal - triggers when section is in view and it's the intro stage */}
            <motion.h2
              className="text-white text-[10vw] leading-[1] font-black uppercase font-paloseco tracking-tighter"
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              whileInView={activeGal === -1 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: -40 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Nuestra <br />
              Galería
            </motion.h2>

            <motion.p 
              className="text-white/60 text-base md:text-3xl max-w-3xl mx-auto font-playfair px-4 leading-snug mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={activeGal === -1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              Una curaduría visual de nuestras producciones más icónicas, donde la tecnología y el arte convergen.
            </motion.p>
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

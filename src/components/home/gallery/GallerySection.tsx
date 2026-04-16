import { type FC, useState } from 'react';
import { motion } from 'framer-motion';
import './GallerySection.css';

interface GallerySectionProps {
  galleryImages: string[];
}

const GallerySection: FC<GallerySectionProps> = ({ galleryImages }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="galeria" className="bg-[#F9F8F6] py-32 px-6">
      <div className="w-full">
        {/* Header - Animado */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#21201E] uppercase font-paloseco mb-4">
            Galería
          </h2>
          <p className="text-[#21201E]/60 max-w-xl mx-auto text-sm md:text-base">
            Producciones recientes y momentos JG en nuestro feed.
          </p>
        </motion.div>

        {/* IG Grid - Animación progresiva por imagen */}
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-1 sm:gap-1">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ 
                delay: (i % 3) * 0.1, // Stagger por columna para efecto de carga fluida
                duration: 0.6, 
                ease: "easeOut" 
              }}
              className="relative aspect-square bg-transparent overflow-hidden cursor-zoom-in group"
              onClick={() => setSelectedImg(src)}
            >
              <img
                src={src}
                alt={`Galería ${i}`}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal - Animado también */}
      {selectedImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[2000] bg-[#21201E]/95 flex items-center justify-center p-4 backdrop-blur-xl"
          onClick={() => setSelectedImg(null)}
        >
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImg} 
            alt="Enlarged" 
            className="max-h-full max-w-full object-contain shadow-2xl rounded-sm" 
          />
          <button className="absolute top-10 right-10 text-white text-4xl">&times;</button>
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;

import { type FC, useState } from 'react';
import { motion } from 'framer-motion';

interface GallerySectionProps {
  galleryImages: string[];
}

const GallerySection: FC<GallerySectionProps> = ({ galleryImages }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="galeria" className="bg-[#F9F8F6] py-24 md:py-32 overflow-hidden border-t border-black/5">
      <div className="w-full">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center mb-16 px-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#21201E] uppercase font-paloseco mb-4">
            Galería
          </h2>
          <p className="text-[#21201E]/60 max-w-xl mx-auto text-sm md:text-base">
            Producciones recientes y momentos destacados de nuestro feed oficial.
          </p>
        </motion.div>

        {/* ── Grid Estilo Instagram (Gap 0 Forzado) ── */}
        <div 
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 leading-none"
          style={{ gap: '0', padding: '0' }}
        >
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden bg-black cursor-pointer group m-0 p-0"
              onClick={() => setSelectedImg(src)}
            >
              <img
                src={src}
                alt={`Galería ${i}`}
                className="w-full h-full object-cover block m-0 p-0 transition-all duration-700 group-hover:scale-110"
                loading={i < 4 ? "eager" : "lazy"}
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Modal de Visualización ── */}
      {selectedImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setSelectedImg(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImg}
            alt="Preview"
            className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-sm"
          />
          <button 
            className="absolute top-6 right-6 text-white text-4xl font-light hover:text-[#63D72A] transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            &times;
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;

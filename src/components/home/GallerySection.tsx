import { type FC, useState } from 'react';
import './GallerySection.css';

interface GallerySectionProps {
  galleryImages: string[];
}

const GallerySection: FC<GallerySectionProps> = ({ galleryImages }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="galeria" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase font-paloseco mb-6">
            Galería
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            Una curaduría visual de nuestras producciones más icónicas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <div 
              key={i} 
              className="aspect-square bg-[#0a0c0e] overflow-hidden cursor-zoom-in group"
              onClick={() => setSelectedImg(src)}
            >
              <img 
                src={src} 
                alt={`Galería ${i}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 hover:opacity-100"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
          onClick={() => setSelectedImg(null)}
        >
          <img src={selectedImg} alt="Enlarged" className="max-h-full max-w-full object-contain" />
          <button className="absolute top-10 right-10 text-white text-4xl">&times;</button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;

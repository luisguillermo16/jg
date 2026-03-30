import { FC } from 'react';

interface GallerySectionProps {
  activeGal: number;
  galleryImages: string[];
}

const GallerySection: FC<GallerySectionProps> = ({ activeGal, galleryImages }) => {
  return (
    <section id="galeria" className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Intro Screen Pinned */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${activeGal === -1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
           <div className="absolute inset-0 bg-[#07090b]" />
           <div className="absolute inset-0 opacity-30 mix-blend-screen" style={{ background: 'radial-gradient(circle at 10% 90%, #1a3d00, transparent 40%), radial-gradient(circle at 90% 10%, #0a1f00, transparent 40%)' }} />
           <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
              <span className="text-accent uppercase tracking-[0.5em] text-sm font-bold block mb-10">Portafolio</span>
              <h2 className="text-7xl md:text-[12rem] font-black text-white uppercase tracking-tighter leading-[0.8] mb-12">
                Nuestro <br />
                <span className="text-outline-white">Trabajo</span>
              </h2>
              <div className="w-24 h-1.5 bg-accent/40 mx-auto mb-10" />
              <p className="text-white/50 text-xl md:text-3xl max-w-4xl mx-auto font-playfair italic">
                Cada imagen cuenta una historia. Momentos únicos capturados con precisión técnica y sensibilidad artística.
              </p>
           </div>
        </div>

        {/* Gallery Content Reveal */}
        <div className={`absolute inset-0 z-10 flex items-center justify-center p-6 md:p-20 transition-all duration-1000 ${activeGal === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
           <div className="absolute inset-0 bg-black" />
           <div className="w-full max-w-7xl h-[80vh] overflow-y-scroll no-scrollbar grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl">
              {galleryImages.map((src, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-white/5">
                  <img src={src} alt={`Trabajo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

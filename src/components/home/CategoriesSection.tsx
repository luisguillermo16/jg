import { FC } from 'react';
import VolumeVideo from '../VolumeVideo';

interface Category {
  id: string;
  title: string;
  description: string;
  video: string;
  tag: string;
}

interface CategoriesSectionProps {
  categoriesRef: React.RefObject<HTMLDivElement>;
  categories: Category[];
  activeIndex: number;
  isMuted: boolean;
}

const CategoriesSection: FC<CategoriesSectionProps> = ({ categoriesRef, categories, activeIndex, isMuted }) => {
  return (
    <section id="categories" ref={categoriesRef} className="relative h-[450vh] bg-[#050607]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Categories Intro Screen (Static initial view) - Alien Gradient Background */}
        <div
          style={{ transitionDuration: '800ms', willChange: 'opacity, transform, filter' }}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 transition-all cubic-bezier(0.16, 1, 0.3, 1) overflow-hidden ${activeIndex === -1 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md translate-y-8 pointer-events-none'}`}
        >
          {/* Alien Gradient Background (Same as before) */}
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-x-0 bottom-0 top-1/2 opacity-70" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 100%, #1a3d00 0%, #050e00 60%, transparent 100%)' }} />
          
          <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-6 md:px-24">
            <h2 className="text-6xl md:text-[11rem] font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 reveal-on-scroll">
              Nuestras <br />
              <span className="text-outline-white">Categorías</span>
            </h2>
            <div className="w-24 h-1.5 bg-accent/60 mx-auto mb-10 reveal-on-scroll" />
            <p className="text-white/60 text-xl md:text-4xl max-w-4xl mx-auto font-medium tracking-wide font-playfair italic leading-relaxed reveal-on-scroll">
              Especialistas en transformar la visión de cada cliente en una producción técnica sin precedentes.
            </p>
          </div>
        </div>

        {/* Dynamic Background Videos */}
        {categories.map((cat, i) => {
          const isVisible = activeIndex === i;
          return (
            <div
              key={cat.id}
              style={{ willChange: 'opacity' }}
              className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <VolumeVideo
                src={cat.video}
                autoPlay
                loop
                isMuted={isMuted}
                isVisible={isVisible}
                playsInline
                className="w-full h-full object-cover brightness-[0.4] saturate-[1.2]"
              />

              {/* Category Info - Bottom Left Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className={`absolute bottom-10 md:bottom-20 left-6 md:left-24 max-w-[90%] md:max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <span className="h-[2px] w-8 md:w-12 bg-accent" />
                  <span className="text-accent uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-xs md:text-base">{cat.tag}</span>
                </div>
                <h3 className="text-4xl md:text-8xl font-semibold text-white uppercase mb-4 md:mb-6 leading-tight">
                  {cat.title}
                </h3>
                <p className="text-white/70 text-base md:text-2xl leading-relaxed font-medium font-sans italic">
                  {cat.description}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default CategoriesSection;

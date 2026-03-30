import type { FC } from 'react';
import VolumeVideo from '../VolumeVideo';

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

const CategoriesSection: FC<CategoriesSectionProps> = ({ categoriesRef, categories, progress, isMuted }) => {

  // Mapping progress to 4 clear states (for 400vh):
  // 0.0: Intro
  // 0.33: Cat 1 (Bodas)
  // 0.66: Cat 2 (Sociales)
  // 1.0: Cat 3 (Corporativos)

  const getStepStyles = (target: number, range: number = 0.18, hold: number = 0.15) => {
    const distance = Math.abs(progress - target);

    // Afilado de transición para evitar el "difuminado" (blur)
    let opacity = 0;
    if (distance <= (hold / 2)) {
      opacity = 1;
    } else {
      opacity = Math.max(0, 1 - ((distance - (hold / 2)) / range));
    }

    const scale = 0.9 + (opacity * 0.1);
    const translateY = (target - progress) * 120;
    const blur = (1 - opacity) * 10;

    return {
      opacity,
      transform: `scale(${scale}) translateY(${translateY}px)`,
      filter: `blur(${blur}px)`,
      pointerEvents: (opacity > 0.5 ? 'auto' : 'none') as any,
    };
  };

  return (
    <section id="categories" ref={categoriesRef} className="relative h-[400vh] bg-[#050607]">
      {/* Marcadores de Snap (Magnetos) - 4 Puntos para Intro + 3 Categorías */}
      <div className="absolute inset-0 pointer-events-none z-[50]">
        <div className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Categories Intro Screen (Target: 0.0) */}
        <div
          style={{ ...getStepStyles(0.0), transition: 'none' }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-x-0 bottom-0 top-1/2 opacity-70" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 100%, #1a3d00 0%, #050e00 60%, transparent 100%)' }} />

          <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-6 md:px-24">
            <h2 className={`text-6xl md:text-[11rem] font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 reveal-on-scroll ${progress < 0.15 ? 'active' : ''}`}>
              Nuestras <br />
              <span className="text-outline-white">Categorías</span>
            </h2>
            <div className={`w-24 h-1.5 bg-accent/60 mx-auto mb-10 reveal-on-scroll delay-100 ${progress < 0.15 ? 'active' : ''}`} />
            <p className={`text-white/60 text-xl md:text-3xl max-w-4xl mx-auto font-medium tracking-wide font-playfair italic leading-relaxed reveal-on-scroll delay-200 ${progress < 0.15 ? 'active' : ''}`}>
              Especialistas en transformar la visión de cada cliente en una producción técnica sin precedentes.
            </p>
          </div>
        </div>

        {/* Dynamic Background Videos & Info Overlay */}
        {categories.map((cat, i) => {
          // Map index to progress targets: 0.33, 0.66, 1.0
          const target = (i + 1) / 3;
          const styles = getStepStyles(target, 0.2, 0.1);
          const isVisible = styles.opacity > 0.1; // Solo play si es claramente visible

          return (
            <div
              key={cat.id}
              style={styles}
              className="absolute inset-0 z-10"
            >
              <VolumeVideo
                src={cat.video}
                autoPlay
                loop
                isMuted={isMuted}
                isVisible={isVisible}
                playsInline
                className="w-full h-full object-cover brightness-[0.4] saturate-[1.1]"
                style={{
                  animation: isVisible ? 'kenBurnsAnimation 20s ease-in-out infinite alternate' : 'none'
                }}
              />

              {/* Category Info - Bottom Left Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-10 md:bottom-20 left-6 md:left-24 max-w-[90%] md:max-w-2xl px-2">
                <div className={`flex items-center gap-4 mb-3 md:mb-4 reveal-on-scroll ${isVisible ? 'active' : ''}`}>
                  <span className="h-[2px] w-8 md:w-12 bg-accent" />
                  <span className="text-accent uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-xs md:text-base">{cat.tag}</span>
                </div>
                <h3 className={`text-5xl md:text-8xl font-black text-white uppercase mb-4 md:mb-6 leading-tight font-paloseco tracking-tighter reveal-on-scroll ${isVisible ? 'active' : ''}`}>
                  {cat.title}
                </h3>
                <p className={`text-white/70 text-base md:text-2xl leading-relaxed font-medium font-sans italic max-w-xl reveal-on-scroll delay-200 ${isVisible ? 'active' : ''}`}>
                  {cat.description}
                </p>

                {/* 500ms Delay CTA Button as requested */}
                <div className={`mt-8 md:mt-12 reveal-on-scroll delay-500 ${isVisible ? 'active' : ''}`}>
                  <button className="group relative px-8 md:px-12 py-3 md:py-4 bg-accent text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-500 shadow-[0_10px_30px_rgba(163,255,0,0.3)] font-paloseco text-sm md:text-base overflow-hidden">
                    <span className="relative z-10">Contactar</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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

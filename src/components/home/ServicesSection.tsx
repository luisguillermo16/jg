import { type FC } from 'react';
import { motion } from 'framer-motion';
import CinematicGlow from '../CinematicGlow';

interface Service {
  title: string;
  desc: string;
  image: string;
}

interface ServicesSectionProps {
  services: Service[];
  activeSvc: number;
}

const ServicesSection: FC<ServicesSectionProps> = ({ services, activeSvc }) => {
  return (
    <section id="servicios" className="relative h-[600vh] bg-black">
      {/* Snap Points for the 4 service states, precisely timed with scroll logic */}
      <div className="absolute inset-0 pointer-events-none z-[50]">
        <div className="h-[150vh] w-full" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
        <div className="h-[126vh] w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-[132vh] w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-[192vh] w-full" style={{ scrollSnapAlign: 'start' }} />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Intro Screen - Servicios Pinned */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${activeSvc === -1 ? 'opacity-100 scale-100 z-50' : 'opacity-0 scale-105 z-0 pointer-events-none'}`}>
          <CinematicGlow />
          <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
            <motion.h2 
              key="services-title"
              initial={{ opacity: 0, y: 40 }}
              animate={activeSvc === -1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.25rem,12vw,9rem)] font-black text-white uppercase tracking-tight md:tracking-tighter leading-[0.9] md:leading-[0.8] mb-6 md:mb-12 px-2"
            >
              Nuestros <br />
              Servicios
            </motion.h2>

            <p className="text-white/60 text-base md:text-3xl max-w-2xl mx-auto font-playfair px-4 leading-snug">
              Infraestructura técnica de nivel internacional adaptada a la escala de tu visión.
            </p>
          </div>
        </div>

        {/* Dynamic Services Content - 3 Steps of 2 services each */}
        {[0, 1, 2].map((step) => {
          const isVisible = activeSvc === step;
          const items = services.slice(step * 2, step * 2 + 2);

          return (
            <div
              key={step}
              className={`absolute inset-0 z-10 p-4 sm:p-24 transition-[opacity,transform] duration-700 flex flex-col items-center justify-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}
            >
              <div className="absolute inset-0 bg-[#07090b]" />
              <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at ${step * 40}% 50%, #1a3d00, transparent 70%)` }} />

              <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                {items.map((svc, idx) => (
                  <div
                    key={`${step}-${idx}`}
                    className="group relative aspect-[3.8/4] rounded-[0.5rem] bg-[#111111] overflow-hidden transform-gpu will-change-transform isolation-isolate perspective-1000 backface-hidden transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 pt-10 md:pt-16 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                        <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight font-paloseco">{svc.title}</h3>
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-3.5 md:h-3.5 text-white fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                        </div>
                      </div>
                      <p className="text-white/60 text-[xs] sm:text-sm md:text-base leading-relaxed font-sans group-hover:text-white/90 transition-colors">{svc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;

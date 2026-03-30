import type { FC } from 'react';

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
    <section id="servicios" className="relative h-[450vh] bg-black">
      {/* Snap Points para los 4 estados de servicios */}
      <div className="absolute inset-0 pointer-events-none z-[50]">
        <div className="h-[112.5vh] w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-[112.5vh] w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-[112.5vh] w-full" style={{ scrollSnapAlign: 'start' }} />
        <div className="h-[112.5vh] w-full" style={{ scrollSnapAlign: 'start' }} />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Intro Screen - Servicios Pinned */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${activeSvc === -1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-[#050607]" />
          <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ background: 'radial-gradient(circle at 80% 80%, #1a3d00, transparent 50%), radial-gradient(circle at 20% 20%, #0d2200, transparent 50%)' }} />
          <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
            <h2 className="text-6xl md:text-[9rem] font-black text-white uppercase tracking-tighter leading-[0.8] mb-12 reveal-on-scroll">
              Nuestros <br />
              Servicios
            </h2>

            <p className="text-white/60 text-xl md:text-3xl max-w-3xl mx-auto font-playfair italic reveal-on-scroll delay-200">
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
              className={`absolute inset-0 z-10 p-6 md:p-24 transition-[opacity,transform] duration-1000 flex flex-col items-center justify-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}
            >
              <div className="absolute inset-0 bg-[#07090b]" />
              <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at ${step * 40}% 50%, #1a3d00, transparent 70%)` }} />

              <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {items.map((svc, idx) => (
                  <div
                    key={`${step}-${idx}`}
                    className="group relative aspect-[3.8/4] rounded-[2rem] bg-[#111111] overflow-hidden transform-gpu will-change-transform isolation-isolate perspective-1000 backface-hidden transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-8 pt-16 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <div className="flex items-center gap-3 mb-4 reveal-on-scroll">
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-paloseco">{svc.title}</h3>
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-3.5 md:h-3.5 text-white fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed font-sans group-hover:text-white/90 transition-colors reveal-on-scroll delay-100">{svc.desc}</p>
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

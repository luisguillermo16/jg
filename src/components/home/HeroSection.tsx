import { type FC } from 'react';
import './HeroSection.css';

const heroVideo = 'https://luispineda.b-cdn.net/hero.mp4';

const HeroSection: FC = () => {
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative w-full h-full bg-[#030d05]">
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030d05]/60 via-[#030d05]/30 to-[#030d05]/90" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto">
        <h1 className="hero-animate-1 text-4xl md:text-[5.5rem] font-black text-white leading-[0.95] font-paloseco uppercase tracking-tighter mb-6">
          Producción <br className="hidden md:block" /> Técnica para <br className="hidden md:block" /> Eventos
        </h1>

        <p className="hero-animate-2 text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-medium leading-relaxed px-4">
          Diseñamos y ejecutamos bodas, conciertos y eventos corporativos con estándares técnicos de alto nivel.
        </p>

        <div className="hero-animate-3 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="w-full sm:w-auto px-8 py-4 bg-[#A3FF00] text-black font-black uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_12px_40px_rgba(163,255,0,0.3)] text-sm md:text-base"
          >
            Hablar con un experto
          </button>
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 py-4 border-2 border-white/20 bg-white/5 backdrop-blur-2xl text-white font-black uppercase tracking-wider rounded-xl hover:bg-white/10 active:scale-95 transition-all text-sm md:text-base"
          >
            Ver servicios
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

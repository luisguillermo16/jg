import { type FC } from 'react';
import { isMobileDevice } from '../../../utils/deviceUtils';
import './HeroSection.css';
import heroImg from '../../../assets/home/img/hero.4.jpg';
import heroMobileImg from '../../../assets/home/img/heroTelefonos.jpeg';

// const heroVideo = 'https://luispineda.b-cdn.net/hero.mp4';
// const heroMobileVideo = 'https://luispineda.b-cdn.net/heroTelefono.mp4';

const HeroSection: FC = () => {
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative w-full h-full bg-[#030d05]">
      <div className="absolute inset-0 z-0">
        <img
          src={isMobileDevice ? heroMobileImg : heroImg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Filtro oscuro responsivo: desde abajo en móvil, desde la izquierda en desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d05] via-[#030d05]/60 to-transparent md:inset-y-0 md:left-0 md:w-3/4 md:bg-gradient-to-r md:from-[#030d05] md:via-[#030d05]/40 md:to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center md:items-start justify-end pb-20 md:pb-0 md:justify-center text-center md:text-left px-6 md:px-24 max-w-7xl">
        <h1 className="hero-animate-1 text-4xl md:text-[5.5rem] font-black text-white leading-[0.95] font-paloseco uppercase tracking-tighter mb-6">
          Producción <br className="hidden md:block" /> Técnica para <br className="hidden md:block" /> Eventos
        </h1>

        <p className="hero-animate-2 text-base md:text-xl text-white/90 max-w-2xl mb-10 font-medium leading-relaxed">
          Diseñamos y ejecutamos bodas, conciertos y eventos corporativos con estándares técnicos de alto nivel.
        </p>

        <div className="hero-animate-3 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="w-full sm:w-auto px-8 py-4 bg-[#A3FF00] text-black font-bold tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
          >
            Hablar con un experto
          </button>
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 py-4 bg-[#262626] text-white/90 font-medium tracking-wide rounded-2xl hover:bg-[#333] active:scale-95 transition-all text-sm md:text-base"
          >
            Nuestros servicios
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

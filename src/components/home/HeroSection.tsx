import { type FC } from 'react';
import './HeroSection.css';
import logo from '../../assets/brand/logo.webp';

const heroVideo = 'https://luispineda.b-cdn.net/hero.mp4';

const HeroSection: FC = () => {
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <img
          src={logo}
          alt="JG Logo"
          className="h-32 md:h-56 w-auto mb-12 brightness-200 drop-shadow-[0_0_50px_rgba(163,255,0,0.3)]"
        />
        <h1 className="text-4xl md:text-[6rem] font-black text-white leading-tight font-paloseco uppercase tracking-tight mb-8">
          Producción <br /> Técnica para <br /> Eventos
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12">
          Diseñamos y ejecutamos bodas, conciertos y eventos corporativos con estándares técnicos de alto nivel.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="px-10 py-5 bg-[#A3FF00] text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-[0_15px_40px_rgba(163,255,0,0.3)]"
          >
            Hablar con un experto
          </button>
          <button
            onClick={scrollToServices}
            className="px-8 py-5 border border-white/20 bg-white/5 backdrop-blur-xl text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
          >
            Ver servicios
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

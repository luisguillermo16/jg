import { type FC } from 'react';
import './HeroSection.css';
import heroImg from '../../../assets/home/img/hero-desktop.webp';

const HeroSection: FC = () => {
  return (
    <section id="hero-section" className="relative w-full h-screen min-h-screen bg-[#1a1a1a] overflow-hidden">
      {/* Background — CSS Nativo para máxima estabilidad */}
      <div className="absolute inset-0 z-0 opacity-100 transition-opacity duration-1000">
        <img
          src={heroImg}
          alt="JG Producciones Hero"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover"
        />
        {/* Overlay — Simplificado para GPU */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#21201E]/40 pointer-events-none z-[1]" />
      </div>

      {/* Contenido — Sin Framer Motion para asegurar aparición instantánea */}
      <div className="relative z-10 h-full flex flex-col items-center md:items-start justify-end pb-20 md:pb-0 md:justify-center text-center md:text-left px-6 md:px-24 max-w-7xl mx-auto">
        <div className="hero-content">
          <h1 className="text-4xl md:text-[5.5rem] font-black text-white leading-[0.95] font-paloseco uppercase tracking-tighter mb-6">
            Creamos <br className="hidden md:block" /> Experiencias <br className="hidden md:block" /> que se recuerdan
          </h1>

          <p className="text-base md:text-xl text-white/90 max-w-2xl mb-10 font-medium leading-relaxed">
            Bodas, conciertos, presentaciones de marca y eventos corporativos. Cada detalle, perfectamente producido.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('servicios');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#63D72A] text-black font-black uppercase tracking-widest rounded-[var(--btn-radius)] hover:scale-105 transition-transform w-full sm:w-auto"
            >
              Nuestros Servicios
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-widest rounded-[var(--btn-radius)] hover:bg-white/20 transition-all w-full sm:w-auto"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

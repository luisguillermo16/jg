import { FC } from 'react';
import VolumeVideo from '../VolumeVideo';
import logo from '../../assets/logo.png';
import heroVideo from '../../assets/hero.mp4';

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
  heroIndex: number;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  isVisible: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({ heroRef, heroIndex, isMuted, setIsMuted, isVisible }) => {
  return (
    <section id="hero-section" ref={heroRef} className="relative w-full h-[400vh]">
      {/* ── Background Video Layer (Sticky) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <VolumeVideo
          src={heroVideo}
          autoPlay
          loop
          isMuted={isMuted}
          isVisible={isVisible}
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 brightness-[0.5] saturate-[1.2] animate-zoom-bg animate-fade-scale"
        />

        {/* Grain & Effects Overlay */}
        <div className="absolute inset-0 z-10 opacity-60 pointer-events-none select-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* Screen Content Layers */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 max-w-5xl mx-auto">

          {/* 1. Main Title Screen */}
          <div
            style={{ transitionDuration: '800ms', willChange: 'opacity, transform, filter' }}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all cubic-bezier(0.16, 1, 0.3, 1) ${heroIndex === 0 ? 'opacity-100 scale-100 blur-0 translate-y-0' : 'opacity-0 scale-95 blur-md -translate-y-8 pointer-events-none'}`}
          >
            <h1 className="hero-title text-center animate-reveal opacity-0">
              Producción técnica que transforma eventos <br className="hidden md:block" />
              <span className="text-white animate-reveal animate-delay-1 opacity-0">en experiencias inolvidables</span>
            </h1>
          </div>

          {/* 2. Detailed Description Screen */}
          <div
            style={{ transitionDuration: '800ms', willChange: 'opacity, transform, filter' }}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all cubic-bezier(0.16, 1, 0.3, 1) ${heroIndex === 1 ? 'opacity-100 scale-100 blur-0 translate-y-0' : 'opacity-0 scale-105 blur-md translate-y-8 pointer-events-none'}`}
          >
            <div className="w-16 h-[2px] bg-accent/60 mb-8" />
            <p className="hero-description text-center px-4 drop-shadow-xl animate-fade-in">
              En JG Producciones llevamos tu evento al siguiente nivel con sonido profesional, iluminación impactante, tarimas seguras y pantallas LED de alta definición. Especialistas en bodas, eventos sociales y corporativos en Cartagena.
            </p>
          </div>

          {/* 3. Logo & CTAs Screen */}
          <div
            style={{ transitionDuration: '800ms', willChange: 'opacity, transform, filter' }}
            className={`absolute inset-0 flex flex-col items-center justify-center gap-8 transition-all cubic-bezier(0.16, 1, 0.3, 1) ${heroIndex === 2 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md pointer-events-none'}`}
          >
            <div className="flex flex-col items-center gap-0">
              <img src={logo} alt="JG Producciones" className="h-40 md:h-64 w-auto brightness-200 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]" />
              <h2 className="text-4xl md:text-8xl font-black text-white tracking-[0.02em] font-paloseco uppercase text-center -mt-6 md:-mt-12">
                PRODUCCIONES
              </h2>
            </div>
            <div className="flex flex-col items-center gap-12 mt-8">
              <button
                onClick={() => setIsMuted(false)}
                className="px-16 py-5 bg-accent text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(163,255,0,0.3)] font-remixa"
              >
                Contactar
              </button>
              <div className="flex flex-col items-center gap-3 opacity-60">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/80 font-remixa">hacia abajo para descubrir</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white to-white/0 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

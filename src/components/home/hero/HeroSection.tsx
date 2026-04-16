import { type FC } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
import heroImg from '../../../assets/home/img/hero-desktop.webp';
import heroMobileImg from '../../../assets/home/img/hero-mobile.webp';

const HeroSection: FC = () => {
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative w-full h-full bg-[#21201E] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={heroImg}
          srcSet={`${heroMobileImg} 960w, ${heroImg} 1920w`}
          sizes="(max-width: 768px) 100vw, 100vw"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        {/* Overlay en dos capas para sostener contraste en zonas claras */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/20 pointer-events-none" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center md:items-start justify-end pb-20 md:pb-0 md:justify-center text-center md:text-left px-6 md:px-24 max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-[5.5rem] font-black text-white leading-[0.95] font-paloseco uppercase tracking-tighter mb-6"
        >
          Creamos <br className="hidden md:block" /> Experiencias <br className="hidden md:block" /> que se recuerdan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-white/90 max-w-2xl mb-10 font-medium leading-relaxed"
        >
          Bodas, conciertos, presentaciones de marca y eventos corporativos. Cada detalle, perfectamente producido.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="w-full sm:w-auto px-8 py-4 bg-[#63D72A] text-[#21201E] font-bold tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all text-sm md:text-base border border-[#63D72A] hover:bg-transparent hover:text-[#63D72A]"
          >
            Cotiza tu evento
          </button>
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 py-4 bg-[#1f1f1f]/80 backdrop-blur-md text-white font-semibold tracking-wide rounded-2xl hover:bg-[#2a2a2a] active:scale-95 transition-all text-[13px] md:text-[15px] border border-white/40 shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
          >
            Ver nuestro trabajo
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

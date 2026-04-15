import { type FC } from 'react';
import { motion } from 'framer-motion';
import { isMobileDevice } from '../../../utils/deviceUtils';
import './HeroSection.css';
import heroImg from '../../../assets/home/img/hero.4.jpg';
import heroMobileImg from '../../../assets/home/img/heroTelefonos.jpeg';

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
          src={isMobileDevice ? heroMobileImg : heroImg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Filtro oscuro responsivo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#21201E] via-[#21201E]/60 to-transparent md:inset-y-0 md:left-0 md:w-3/4 md:bg-gradient-to-r md:from-[#21201E] md:via-[#21201E]/40 md:to-transparent pointer-events-none" />
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
            className="w-full sm:w-auto px-8 py-4 bg-[#262626]/50 backdrop-blur-md text-white/90 font-medium tracking-wide rounded-2xl hover:bg-[#333] active:scale-95 transition-all text-[13px] md:text-[15px] border border-white/10"
          >
            Ver nuestro trabajo
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

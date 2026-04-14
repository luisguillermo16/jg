import { type FC, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  BoltIcon,
  SparklesIcon,
  StarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import CinematicGlow from '../components/CinematicGlow';
import { openContactModal } from '../utils/modal';

// Assets
import galleryImg from '../assets/gallery/MRW01846.jpg';

const BENEFITS = [
  {
    Icon: BoltIcon,
    title: 'Excelencia Técnica',
    desc: 'Audio y video de última generación para una fidelidad absoluta en cada montaje.',
  },
  {
    Icon: SparklesIcon,
    title: 'Soluciones Inmersivas',
    desc: 'Iluminación robótica y efectos visuales diseñados para cautivar a tu audiencia.',
  },
  {
    Icon: StarIcon,
    title: 'Compromiso Premium',
    desc: 'Atención personalizada y meticulosa desde la conceptualización hasta el cierre.',
  },
  {
    Icon: RocketLaunchIcon,
    title: 'Innovación Constante',
    desc: 'Evolucionamos con las tendencias globales para ofrecer experiencias irrepetibles.',
  },
];

const Nosotros: FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.08], [1, 0.97]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#21201E] text-[#F9F8F6] selection:bg-[#63D72A] selection:text-[#21201E] min-h-screen font-sans">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#63D72A] font-black tracking-[0.5em] text-xs md:text-sm uppercase mb-6 block"
          >
            JG Producciones
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-[0.02em] uppercase font-paloseco text-white"
          >
            Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="text-[#F9F8F6]/40 text-base md:text-lg mt-6 max-w-md mx-auto leading-relaxed"
          >
            Especialistas en transformar visiones en producciones técnicas de vanguardia.
          </motion.p>
        </motion.div>

        {/* Background */}
        <div className="absolute inset-0 z-0 text-center">
          <CinematicGlow />
          <img
            src={galleryImg}
            alt="Fondo cinemático JG Producciones"
            className="w-full h-full object-cover opacity-25 grayscale scale-105"
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25"
        >
          <div className="w-px h-12 bg-white" />
          <span className="text-[9px] uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ── NUESTRA ESENCIA ── */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#1a1b1c] overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[35%] h-[55%] bg-[#63D72A]/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#63D72A] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
              Nuestra Esencia
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter font-paloseco leading-[0.85] mb-8 text-[#F9F8F6]">
              No<br />
              Organizamos<br />
              Eventos.<br />
              <span className="text-[#63D72A]">Creamos</span><br />
              Hitos.
            </h2>
            <p className="text-[#F9F8F6]/45 text-base md:text-lg leading-relaxed max-w-md">
              Fusionamos precisión técnica y creatividad audiovisual para entregar
              producciones que superan expectativas. Cada evento es una obra maestra
              ejecutada hasta el último detalle en Cartagena y toda Colombia.
            </p>
            <div className="h-px w-20 bg-[#63D72A]/40 mt-10" />
          </motion.div>

          {/* Right: Benefit cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-[#63D72A]/20 transition-all duration-500 group"
              >
                <Icon className="w-7 h-7 text-[#63D72A] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-[#F9F8F6] text-sm font-black uppercase tracking-tight mb-2">{title}</h3>
                <p className="text-[#F9F8F6]/40 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-40 px-6 text-center bg-[#21201E] relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 font-paloseco text-[#F9F8F6] leading-[0.85]">
            ¿Listo para el<br />
            <span className="text-[#63D72A]">siguiente nivel?</span>
          </h2>
          <p className="text-[#F9F8F6]/40 text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Cuéntanos tu visión y la convertimos en una producción que tus invitados recordarán para siempre.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 215, 42, 0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={openContactModal}
            className="px-12 py-5 bg-[#63D72A] text-[#21201E] font-black uppercase tracking-widest rounded-[40px] hover:bg-white transition-colors duration-300 text-sm"
          >
            Hablemos de tu proyecto
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Nosotros;

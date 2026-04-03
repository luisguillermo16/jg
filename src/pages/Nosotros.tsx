import { type FC, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import CinematicGlow from '../components/CinematicGlow';
import CharacterProfile from '../components/nosotros/CharacterProfile';

// Assets
import galleryImg from '../assets/gallery/MRW01846.jpg';
import ceoImg from '../assets/nosotros/ceo.png';
import secretaryImg from '../assets/nosotros/secretraria.png';

const Nosotros: FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      title: "Excelencia Técnica",
      desc: "Audio y video de última generación para una fidelidad absoluta en cada montaje.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 3 7 7-5 2 6 9-7-7 5-2-6-9Z"/>
        </svg>
      )
    },
    {
      title: "Soluciones Inmersivas",
      desc: "Iluminación robótica y efectos visuales diseñados para cautivar a la audiencia.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      )
    },
    {
      title: "Compromiso Premium",
      desc: "Atención personalizada y meticulosa desde la conceptualización hasta el cierre.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/>
        </svg>
      )
    },
    {
      title: "Innovación Constante",
      desc: "Evolucionamos con las tendencias globales para ofrecer experiencias irrepetibles.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.5-1 1-4c2 0 3 0 4 4z"/><path d="m15 15-4 4v5l4-1z"/>
        </svg>
      )
    }
  ];

  const team = [
    {
      name: "GUILLERMO J. GOMEZ",
      role: "FOUNDER & CEO",
      image: ceoImg,
      desc: "Visionario del espectáculo con más de 15 años liderando la industria técnica. Especialista en arquitectura de sonido e ingeniería de iluminación de gran formato."
    },
    {
      name: "MARIATERESA GÓMEZ",
      role: "ADMINISTRATIVE MANAGER",
      image: secretaryImg,
      desc: "Pilar estratégico en la gestión operativa y coordinación de proyectos. Garantiza la excelencia administrativa que sostiene nuestra calidad de servicio premium."
    }
  ];

  return (
    <div className="relative bg-black text-white selection:bg-accent selection:text-black min-h-screen overflow-x-hidden font-sans">
      <Navbar />

      {/* ── SECTION 1: HERO REVEAL ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#A3FF00] font-black tracking-[0.5em] text-xs md:text-sm uppercase mb-6 block"
          >

          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.8] tracking-[0.02em] uppercase font-paloseco"
          >
            Nosotros
          </motion.h1>
        </motion.div>

        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 z-0">
          <CinematicGlow />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
          <img
            src={galleryImg}
            alt="Fondo cinemático"
            className="w-full h-full object-cover opacity-30 grayscale scale-110"
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-px h-12 bg-white" />
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ── SECTION 2: OUR ESSENCE ── */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-paloseco mb-8">
                NUESTRA ESENCIA
              </h2>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light max-w-xl">
                No organizamos eventos, creamos hitos. Fusionamos la precisión técnica alemana con la creatividad latina para entregar resultados que desafían lo convencional.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500">{b.icon}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{b.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE TEAM ── */}
      <section className="relative py-20">
        <div className="text-center mb-20 px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-paloseco opacity-10"
          >
            THE LEADERSHIP
          </motion.h2>
          <div className="h-1 w-24 bg-[#A3FF00] mx-auto -mt-6 md:-mt-10 relative z-10" />
        </div>

        <div className="flex flex-col">
          {team.map((member, i) => (
            <CharacterProfile
              key={i}
              index={i}
              name={member.name}
              role={member.role}
              imageSrc={member.image}
              description={member.desc}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: CALL TO ACTION ── */}
      <section className="py-40 px-6 text-center bg-gradient-to-t from-[#A3FF00]/10 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-8 font-paloseco">
            ¿LISTO PARA EL <br /> <span className="text-[#A3FF00]">SIGUIENTE NIVEL?</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#A3FF00] transition-colors duration-500"
          >
            Hablemos de tu proyecto
          </motion.button>
        </motion.div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          text-stroke: 1px rgba(255,255,255,0.2);
        }
        .italic-custom {
          font-style: italic;
        }
      `}} />
    </div>
  );
};

export default Nosotros;

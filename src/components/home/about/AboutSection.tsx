import { type FC } from 'react';
import { motion } from 'framer-motion';
import {
  BoltIcon,
  SparklesIcon,
  StarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import nosotrosImg from '../../../assets/home/img/nosotros.jpg';

const BENEFITS = [
  {
    Icon: BoltIcon,
    title: 'Excelencia Técnica',
    desc: 'Audio e iluminación de última generación para una fidelidad absoluta.',
  },
  {
    Icon: SparklesIcon,
    title: 'Soluciones Inmersivas',
    desc: 'Efectos visuales y lumínicos que cautivan cada sentido de tu audiencia.',
  },
  {
    Icon: StarIcon,
    title: 'Compromiso Premium',
    desc: 'Atención personalizada desde el primer contacto hasta el cierre.',
  },
  {
    Icon: RocketLaunchIcon,
    title: 'Innovación Constante',
    desc: 'Siempre a la vanguardia de las tendencias de producción global.',
  },
];

const AboutSection: FC = () => (
  <section
    id="nosotros"
    className="relative bg-[#F9F8F6] min-h-screen pt-8 md:pt-12 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center z-0"
    style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
  >
    {/* Radial glow sutil para fondo claro verdoso */}
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#63D72A]/5 rounded-full blur-[150px] pointer-events-none z-0" />

    <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 md:gap-12">

      {/* BLOQUE SUPERIOR: Título (Izquierda) + Imagen/Párrafo (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
        {/* ── Left: Headline ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter font-paloseco leading-[0.85] mb-8 text-[#21201E]">
            En JG PRODUCCIONES<br />
            No<br />
            Organizamos<br />
            Eventos.<br />
            <span className="text-[#63D72A] [text-shadow:0_0_2px_rgba(0,0,0,0.05)]">Creamos</span><br />
            Hitos.
          </h2>
        </motion.div>

        {/* ── Right: Image + Paragraph ── */}
        <div className="flex flex-col gap-8 items-center lg:items-start lg:-mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg aspect-video rounded-[32px] overflow-hidden shadow-xl border border-white/20"
          >
            <img
              src={nosotrosImg}
              alt="Nosotros JG Producciones"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <p className="text-[#21201E]/70 text-base md:text-lg leading-relaxed max-w-md">
            Fusionamos precisión técnica y creativa audiovisual para entregar
            producciones que superan expectativas. Cada evento es una obra maestra
            ejecutada hasta el último detalle en Cartagena y toda Colombia.
          </p>
        </div>
      </div>

      {/* BLOQUE INFERIOR: Fila de Tarjetas (4 columnas en Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:-mt-16">
        {BENEFITS.map(({ title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-3xl bg-white border border-[#21201E]/[0.05] shadow-sm transition-all duration-500 cursor-default hover:shadow-md hover:border-[#63D72A]/30 text-center flex flex-col items-center"
          >
            <h3 className="text-[#21201E] text-xs font-black uppercase tracking-tight mb-2">
              {title}
            </h3>
            <p className="text-[#21201E]/60 text-[11px] leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#21201E]/5 to-transparent" />
  </section>
);

export default AboutSection;

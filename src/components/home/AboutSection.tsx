import { type FC } from 'react';
import { motion } from 'framer-motion';
import {
  BoltIcon,
  SparklesIcon,
  StarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

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
    className="relative bg-[#030500] h-screen px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col justify-center z-0"
    style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
  >
    {/* Top accent line */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A3FF00]/25 to-transparent" />

    {/* Background glow cinemático */}
    <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-[600px] h-[600px] bg-[#A3FF00]/10 rounded-full blur-[150px] pointer-events-none z-0" />

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

      {/* ── Left: Headline + copy ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[#A3FF00] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
          Nuestra Esencia
        </span>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter font-paloseco leading-[0.85] mb-8 text-white">
          No<br />
          Organizamos<br />
          Eventos.<br />
          <span className="text-[#A3FF00]">Creamos</span><br />
          Hitos.
        </h2>

        <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-md">
          Fusionamos precisión técnica y creatividad audiovisual para entregar
          producciones que superan expectativas. Cada evento es una obra maestra
          ejecutada hasta el último detalle en Cartagena y toda Colombia.
        </p>

        {/* Divider */}
        <div className="h-px w-20 bg-[#A3FF00]/40 mt-10" />
      </motion.div>

      {/* ── Right: 4 benefit cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BENEFITS.map(({ Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-[#A3FF00]/20 transition-all duration-500 group cursor-default"
          >
            <Icon className="w-7 h-7 text-[#A3FF00] mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-white text-sm font-black uppercase tracking-tight mb-2">
              {title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
  </section>
);

export default AboutSection;

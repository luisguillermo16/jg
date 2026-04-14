import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { openContactModal } from '../../utils/modal';

const CTASection: FC = () => (
  <section className="relative h-screen px-6 overflow-hidden bg-[#030500] flex flex-col justify-center" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
    {/* Radial green spotlight */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(163,255,0,0.08),transparent)] pointer-events-none" />

    {/* Top border glow */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A3FF00]/30 to-transparent" />

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto text-center"
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-[#A3FF00] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block"
      >
        Siguiente paso
      </motion.span>

      <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight font-paloseco leading-[1.1] mb-8 text-white">
        ¿Listo para<br />
        el <span className="text-[#A3FF00]">siguiente</span><br />
        nivel?
      </h2>

      <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-14">
        Cuéntanos tu visión. En JG Producciones convertimos cada evento en
        una experiencia cinematográfica que tus invitados recordarán para siempre.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Primary CTA */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(163,255,0,0.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={openContactModal}
          className="group flex items-center gap-3 px-10 py-4 bg-[#A3FF00] text-black font-black uppercase tracking-widest rounded-[var(--btn-radius)] text-sm hover:bg-white transition-colors duration-300"
        >
          Hablemos de tu evento
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>

        {/* Secondary CTA */}
        <motion.a
          whileHover={{ scale: 1.03 }}
          href="#galeria"
          className="px-10 py-4 border border-white/15 text-white/70 font-bold uppercase tracking-widest rounded-[var(--btn-radius)] text-sm hover:border-[#A3FF00]/40 hover:text-[#A3FF00] transition-all duration-300"
        >
          Ver Galería
        </motion.a>
      </div>
    </motion.div>
  </section>
);

export default CTASection;

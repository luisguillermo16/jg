import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { openContactModal } from '../../../utils/modal';

const CTASection: FC = () => (
  <section id="contact" className="relative min-h-screen py-24 md:h-screen md:py-0 px-6 bg-[#21201E] flex flex-col justify-center overflow-hidden" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
    {/* Radial green spotlight */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(99,215,42,0.08),transparent)] pointer-events-none" />

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="text-[#63D72A] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block leading-none"
      >
        Siguiente paso
      </motion.span>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-paloseco leading-[1.1] mb-8 text-white"
      >
        ¿Listo para<br />
        el <span className="text-[#63D72A]">siguiente</span><br />
        nivel?
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-[#F9F8F6]/45 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-14"
      >
        Cuéntanos tu visión. En JG Producciones convertimos cada evento en
        una experiencia cinematográfica que tus invitados recordarán para siempre.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        {/* Primary CTA */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 215, 42, 0.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={openContactModal}
          className="group flex items-center gap-3 px-10 py-5 bg-[#63D72A] text-[#21201E] font-black uppercase tracking-widest rounded-[var(--btn-radius)] text-sm hover:bg-white transition-all duration-300"
        >
          Hablemos de tu evento
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>

        {/* Secondary CTA */}
        <motion.a
          whileHover={{ scale: 1.03 }}
          href="#galeria"
          className="px-10 py-5 border border-white/15 text-[#F9F8F6]/70 font-bold uppercase tracking-widest rounded-[var(--btn-radius)] text-sm hover:border-[#63D72A]/40 hover:text-[#63D72A] transition-all duration-300"
        >
          Ver Galería
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;

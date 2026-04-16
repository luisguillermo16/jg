import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline';

const TESTIMONIALS = [
  {
    quote:
      'Una producción impecable. Cada detalle de iluminación y sonido fue perfectamente ejecutado. Nuestros invitados quedaron maravillados desde el primer momento.',
    author: 'Carolina Mendoza',
    event: 'Boda Privada · Cartagena',
    stars: 5,
  },
  {
    quote:
      'JG Producciones transformó nuestro evento corporativo en una experiencia de otro nivel. Profesionalismo absoluto de principio a fin. Sin duda los mejores.',
    author: 'Ricardo Vargas',
    event: 'Lanzamiento de Marca · Barranquilla',
    stars: 5,
  },
  {
    quote:
      'La pantalla LED y el sistema de sonido fueron espectaculares. Todo el mundo preguntó quién hizo la producción. Los recomendaría sin dudarlo un segundo.',
    author: 'Daniela Torres',
    event: 'Quinceañero · Cartagena',
    stars: 5,
  },
];

const TestimonialsSection: FC = () => (
  <section id="testimonios" className="relative bg-[#F9F8F6] min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center">
    {/* Radial glow sutil para secciones claras */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(99,215,42,0.03),transparent)] pointer-events-none" />

    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20"
      >
        <span className="text-[#63D72A] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
          Testimonios
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter font-paloseco text-[#21201E] leading-[0.9]">
          Lo que dicen<br />
          <span className="text-[#21201E]">nuestros clientes</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ quote, author, event: eventName, stars }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col p-8 rounded-3xl bg-white border border-[#21201E]/[0.05] shadow-sm transition-all duration-500 overflow-hidden"
          >
            {/* Quote icon */}
            <ChatBubbleLeftRightIcon className="w-7 h-7 text-[#63D72A]/50 mb-6 flex-shrink-0" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: stars }).map((_, s) => (
                <StarIcon
                  key={s}
                  className="w-4 h-4 text-[#63D72A] fill-[#63D72A]"
                  style={{ fill: '#63D72A' }}
                />
              ))}
            </div>

            {/* Quote text */}
            <p className="text-[#21201E]/70 text-base leading-relaxed flex-1 italic">
              "{quote}"
            </p>

            {/* Author */}
            <div className="mt-8 pt-6 border-t border-[#21201E]/[0.08]">
              <p className="text-[#21201E] font-bold text-sm tracking-wide">{author}</p>
              <p className="text-[#21201E]/40 text-[11px] uppercase tracking-widest mt-1">{eventName}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

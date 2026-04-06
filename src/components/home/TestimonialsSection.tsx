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
  <section className="relative bg-[#050607] py-32 px-6 md:px-12 overflow-hidden">
    {/* Radial glow center */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(163,255,0,0.04),transparent)] pointer-events-none" />

    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20"
      >
        <span className="text-[#A3FF00] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
          Testimonios
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-paloseco text-white leading-[0.9]">
          Lo que dicen<br />
          <span className="text-white">nuestros clientes</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ quote, author, event: eventName, stars }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col p-8 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-[#A3FF00]/20 hover:bg-white/[0.07] transition-all duration-500 group overflow-hidden"
          >
            {/* Subtle corner glow on hover */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#A3FF00]/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Quote icon */}
            <ChatBubbleLeftRightIcon className="w-7 h-7 text-[#A3FF00]/50 mb-6 flex-shrink-0" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: stars }).map((_, s) => (
                <StarIcon
                  key={s}
                  className="w-4 h-4 text-[#A3FF00] fill-[#A3FF00]"
                  style={{ fill: '#A3FF00' }}
                />
              ))}
            </div>

            {/* Quote text */}
            <p className="text-white/65 text-base leading-relaxed flex-1 italic">
              "{quote}"
            </p>

            {/* Author */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <p className="text-white font-bold text-sm tracking-wide">{author}</p>
              <p className="text-white/30 text-[11px] uppercase tracking-widest mt-1">{eventName}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

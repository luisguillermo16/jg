import { type FC } from 'react';
import { motion } from 'framer-motion';
import './ServicesSection.css';

interface Service {
  title: string;
  desc: string;
  tag: string;
  image?: string;
  features?: string[];
}

interface ServicesSectionProps {
  services: Service[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ServicesSection: FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="servicios" className="bg-[#F9F8F6] pt-20 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header con animación */}
        {/* Header con animación ultra-segura para evitar huecos negros en móvil */}
        <div className="mb-12 text-center reveal-on-scroll">
          <span className="text-[#63D72A] text-[16px] uppercase font-bold tracking-widest mb-3 block">
            Lo que hacemos
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-[#21201E] uppercase font-paloseco mb-4">
            Nuestros Servicios
          </h2>

        </div>

        {/* Grid de servicios con Stagger Effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5% 0px", amount: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`group relative h-[420px] rounded-[24px] overflow-hidden shadow-xl ${svc.image ? 'bg-black' : 'bg-white border border-[#21201E]/[0.05]'
                }`}
            >
              {svc.image && (
                <>
                  {/* Background Image */}
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay (solo hasta la mitad) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-50% to-transparent z-10" />
                </>
              )}

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-end p-8">
                {svc.tag && (
                  <span className={`${svc.image ? 'text-[#63D72A]' : 'text-[#4DA820]'} text-[10px] uppercase font-bold tracking-widest mb-4 block`}>
                    {svc.tag}
                  </span>
                )}
                <h3 className={`text-2xl font-bold mb-3 font-paloseco tracking-tight ${svc.image ? 'text-white' : 'text-[#21201E]'}`}>
                  {svc.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${svc.image ? 'text-white/70' : 'text-[#21201E]/60'}`}>
                  {svc.desc}
                </p>
                {svc.features && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {svc.features.map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${svc.image
                          ? 'bg-white/10 backdrop-blur-md text-white/80 border-white/10'
                          : 'bg-[#F9F8F6] text-[#21201E]/60 border-[#21201E]/[0.03]'
                          }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

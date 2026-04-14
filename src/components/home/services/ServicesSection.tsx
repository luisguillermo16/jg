import { type FC } from 'react';
import { motion } from 'framer-motion';
import { openContactModal } from '../../../utils/modal';
import './ServicesSection.css';

interface Service {
  title: string;
  desc: string;
  image: string;
  tag: string;
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
    <section id="servicios" className="bg-[#F9F8F6] pt-32 pb-0 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con animación */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#21201E] uppercase font-paloseco mb-6">
            Nuestros <br /> Servicios
          </h2>
          <p className="text-xl text-[#21201E]/60 max-w-2xl">
            Soluciones integrales de producción AV con los más altos estándares de la industria cinematográfica.
          </p>
        </motion.div>

        {/* Grid de servicios con Stagger Effect */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((svc, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group relative bg-white border border-[#21201E]/[0.05] rounded-[32px] overflow-hidden shadow-sm transition-all duration-500 p-4 hover:shadow-xl hover:border-[#63D72A]/20"
            >
              <div className="aspect-video overflow-hidden rounded-[24px]">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-6">
                {svc.tag && (
                  <span className="text-[#4DA820] text-[10px] uppercase font-bold tracking-widest mb-4 block">
                    {svc.tag}
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#21201E] mb-3 font-paloseco tracking-tight">
                   {svc.title}
                </h3>
                <p className="text-[#21201E]/60 text-sm leading-relaxed mb-6">
                  {svc.desc}
                </p>
                <button
                  onClick={openContactModal}
                  className="text-[#21201E] text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-[#63D72A] transition-colors pb-1"
                >
                  Saber más
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

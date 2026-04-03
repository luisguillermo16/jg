import { type FC } from 'react';
import { motion } from 'framer-motion';

interface Service {
  title: string;
  desc: string;
  image: string;
}

interface ServicesSectionProps {
  services: Service[];
  activeSvc: number;
}

const ServicesSection: FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="servicios" className="relative min-h-screen bg-[#050607] py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full">

        {/* Semantic Header - Centered & Refined (White) */}
        <header className="mb-16 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-white leading-tight tracking-tight font-paloseco uppercase">
            Nuestros Servicios
          </h2>
        </header>

        {/* Balanced 3-Column Grid (LG:3, MD:2, SM:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="card-full-bleed group min-h-[400px] lg:min-h-[460px] rounded-lg overflow-hidden"
            >
              {/* Image without hover effects */}
              <img
                src={svc.image}
                alt={`Servicio de ${svc.title} - JG Producciones`}
                loading="lazy"
                className="card-bg-image opacity-90"
              />

              {/* Minimalist Visual Overlay */}
              <div className="card-overlay" style={{ background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)' }} />

              {/* Informative Content - Static & Clean (White) */}
              <div className="card-content p-8">
                <h3 className="text-xl lg:text-2xl text-white font-black uppercase mb-3 font-paloseco tracking-tight">
                  {svc.title}
                </h3>

                <p className="text-white/70 text-sm lg:text-base leading-relaxed font-inter line-clamp-4">
                  {svc.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Decorative Flare - Blanco Sutil */}
      <div className="absolute top-[30%] right-[-15%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[160px] pointer-events-none" />
    </section>
  );
};

export default ServicesSection;

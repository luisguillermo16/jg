import { type FC } from 'react';
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

const ServicesSection: FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="servicios" className="bg-[#030d05] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase font-paloseco mb-6">
            Nuestros <br /> Servicios
          </h2>
          <p className="text-xl text-white/50 max-w-2xl">
            Soluciones integrales de producción AV con los más altos estándares de la industria cinematográfica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <div key={idx} className="group relative bg-[#0a180c] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={svc.image} 
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-700 opacity-70"
                />
              </div>
              <div className="p-8">
                <span className="text-[#A3FF00] text-[10px] uppercase font-bold tracking-widest mb-4 block">
                  {svc.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4 font-paloseco">
                  {svc.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {svc.desc}
                </p>
                <button 
                  onClick={openContactModal}
                  className="text-white text-xs font-bold uppercase tracking-widest border-b border-[#A3FF00] pb-1 hover:text-[#A3FF00] transition-colors"
                >
                  Saber más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

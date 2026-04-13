import { type FC } from 'react';
import { isMobileDevice } from '../../utils/deviceUtils';
import { openContactModal } from '../../utils/modal';
import './CategoriesSection.css';

interface Category {
  id: string;
  title: string;
  description: string;
  video: string;
  videoMobile?: string;
  poster?: string;
  tag: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: FC<CategoriesSectionProps> = ({ categories }) => {
  return (
    <section id="categories" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-5xl md:text-8xl font-black text-white uppercase font-paloseco mb-4">
          Nuestras <br /> Categorías
        </h2>
        <p className="text-xl text-white/60 max-w-2xl">
          Especialistas en transformar la visión de cada cliente en una producción técnica sin precedentes.
        </p>
      </div>

      <div className="flex flex-col gap-20">
        {categories.map((cat) => (
          <div key={cat.id} className="relative w-full min-h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <video
                src={isMobileDevice && cat.videoMobile ? cat.videoMobile : cat.video}
                poster={cat.poster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl">
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-[#A3FF00] text-xs font-bold uppercase tracking-widest mb-6">
                {cat.tag}
              </span>
              <h3 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase font-paloseco translate-z-10">
                {cat.title}
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-8 font-remixa max-w-2xl mx-auto">
                {cat.description}
              </p>
              <button 
                onClick={openContactModal}
                className="px-10 py-5 bg-[#A3FF00] text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(163,255,0,0.3)]"
              >
                Hablar con un experto
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;

import { type FC } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { openContactModal } from '../../../utils/modal';

const CTASection: FC = () => (
  <section id="contact" className="relative min-h-screen py-24 px-6 bg-[#21201E] flex flex-col justify-center overflow-hidden">
    {/* Radial green spotlight */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(99,215,42,0.08),transparent)] pointer-events-none" />

    <div className="max-w-4xl mx-auto text-center relative z-10">
      {/* Usamos reveal-on-scroll para máxima compatibilidad y rendimiento */}
      <span className="text-[#63D72A] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block leading-none reveal-on-scroll">
        Siguiente paso
      </span>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-paloseco leading-[1.1] mb-8 text-white reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
        ¿Listo para<br />
        el <span className="text-[#63D72A]">siguiente</span><br />
        nivel?
      </h2>

      <p className="text-[#F9F8F6]/45 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-14 reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
        Cuéntanos tu visión. En JG Producciones convertimos cada evento en 
        una experiencia cinematográfica que tus invitados recordarán para siempre.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
        {/* Botón Principal */}
        <button
          onClick={openContactModal}
          className="group flex items-center gap-3 px-10 py-5 bg-[#63D72A] text-[#21201E] font-black uppercase tracking-widest rounded-[var(--btn-radius)] text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(99,215,42,0.15)] hover:shadow-[0_0_40px_rgba(99,215,42,0.35)]"
        >
          Hablemos de tu evento
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* Botón Secundario */}
        <a
          href="/portafolio"
          className="px-10 py-5 border border-white/15 text-[#F9F8F6]/70 font-bold uppercase tracking-widest rounded-[var(--btn-radius)] text-sm hover:border-[#63D72A]/40 hover:text-[#63D72A] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Ver Portafolio
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;

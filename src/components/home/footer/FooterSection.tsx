import type { FC } from 'react';
import logo from '../../../assets/brand/logo.webp';
import { openContactModal } from '../../../utils/modal';

const FooterSection: FC = () => {
  return (
    <footer className="relative z-10 w-full bg-[#21201E] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="JG Producciones" className="h-20 w-auto mb-8 brightness-200" />
            <p className="text-white/40 text-center md:text-left font-sans leading-relaxed">
              Transformamos eventos ordinarios en experiencias cinematográficas extraordinarias. Producción técnica de vanguardia en el corazón de Cartagena.
            </p>
          </div>

          {/* Contact Column */}
          <div id="contact" className="flex flex-col items-center md:items-end">
            <h4 className="text-[#63D72A] font-bold uppercase tracking-widest mb-8 text-sm">Contacto</h4>
            <button
              onClick={openContactModal}
              className="group flex items-center gap-4 text-[#F9F8F6] hover:text-[#63D72A] transition-all duration-300"
            >
              <span className="text-lg font-remixa font-bold text-right">WhatsApp Live</span>
              <div className="w-10 h-10 rounded-full bg-[#63D72A]/20 flex items-center justify-center group-hover:bg-[#63D72A] group-hover:text-[#21201E] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
              </div>
            </button>
            <p className="mt-4 text-[#F9F8F6]/30 text-sm font-sans">Cartagena de Indias, Colombia</p>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default FooterSection;

import { type FC } from 'react';
import logo from '../assets/brand/logo.webp';
import SpotlightsNav from './SpotlightsNav';
import { openContactModal } from '../utils/modal';

const SpotlightHeader: FC = () => {
    return (
        <SpotlightsNav theme="warm" navBg="#0a0a0a" beamAlpha={0.88} count={3}>
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10">
                    <img 
                        src={logo} 
                        alt="JG Producciones" 
                        className="relative z-10 h-6 w-auto object-contain brightness-200 transition-all duration-500 hover:scale-110" 
                    />
                </div>
                <span className="text-white font-remixa font-black tracking-widest text-lg uppercase hidden sm:block">
                    JG Producciones
                </span>
            </div>

            {/* Links Section */}
            <div className="hidden md:flex items-center gap-4">
                <a 
                    href="#categories" 
                    className="px-6 py-2 text-sm font-semibold text-white/70 hover:text-accent transition-all duration-300 font-remixa uppercase tracking-wider"
                >
                    Categorías
                </a>
                <a 
                    href="#" 
                    className="px-6 py-2 text-sm font-semibold text-white/70 hover:text-accent transition-all duration-300 font-remixa uppercase tracking-wider"
                >
                    Servicios
                </a>
                <button 
                    onClick={openContactModal}
                    className="ml-4 px-8 py-2.5 bg-accent text-black font-black uppercase text-xs tracking-widest rounded-[var(--btn-radius)] hover:scale-105 transition-all duration-300 shadow-[0_5px_20px_rgba(163,255,0,0.3)] font-remixa"
                >
                    Contactar
                </button>
            </div>
            
            {/* Mobile Contact Button */}
            <div className="md:hidden">
                <button 
                    onClick={openContactModal}
                    className="px-5 py-2 bg-accent text-black font-black uppercase text-[10px] tracking-widest rounded-[var(--btn-radius)] font-remixa"
                >
                    WhatsApp
                </button>
            </div>
        </SpotlightsNav>
    );
};

export default SpotlightHeader;

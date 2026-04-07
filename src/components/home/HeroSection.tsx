import { type FC } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
import logo from '../../assets/brand/logo.png';
import heroImage from '../../assets/home/img/hero.png';


interface HeroSectionProps {
    heroRef: React.RefObject<HTMLDivElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    heroIndex: number;
}

const HeroSection: FC<HeroSectionProps> = ({ heroRef, heroIndex }) => {

    const scrollToServices = () => {
        const container = document.querySelector('.home-container');
        const el = document.getElementById('servicios');
        if (container && el) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = el.getBoundingClientRect();
            const targetScroll = elementRect.top - containerRect.top + container.scrollTop;
            container.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    };

    return (
        <section id="hero-section" ref={heroRef} className="relative w-full h-screen bg-black">
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <div id="hero" className="h-screen w-full" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
            </div>

            {/* Scroll-down prompt (Centered & Visible) */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-500 ${heroIndex === 0 ? 'opacity-90' : 'opacity-0'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">Explorar experiencias</span>
            </div>

            {/* ── Background Image Layer (Sticky) ── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={heroImage}
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-100"
                        loading="eager"
                        fetchPriority="high"
                    />
                </motion.div>


                {/* Screen Content Layers */}
                <div
                    data-active-index={heroIndex}
                    className="relative z-20 w-full h-full"
                >

                    {/* 1. Logo & CTAs Screen (User provided snippet) */}
                    <motion.div
                        className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:pl-[80px] md:pr-[120px] gap-8 md:gap-16 pt-[20px] md:pt-0 will-change-transform"
                    >

                        {/* LEFT — Título + descripción + CTAs */}
                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 max-w-full md:max-w-[60%]">
                            <motion.h1
                                className="text-[32px] md:text-[4.8rem] font-black text-white leading-[1.1] font-paloseco uppercase text-shadow-strong tracking-tight"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            >
                                Producción<br />
                                Técnica para<br />
                                Eventos
                            </motion.h1>
                            <motion.p
                                className="text-[0.95rem] md:text-[1.35rem] text-white/90 leading-snug font-remixa max-w-[95%] md:max-w-3xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            >
                                Diseñamos y ejecutamos bodas, conciertos y eventos corporativos integrando pantallas LED, sonido e iluminación con estándares técnicos de alto nivel.<br />
                            </motion.p>
                            <motion.div
                                className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 md:mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            >
                                <motion.button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                                    whileHover={{ y: -2, filter: 'brightness(1.15)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3.5 bg-accent text-black text-[12px] md:text-[14px] font-black uppercase tracking-widest rounded-full transition-all duration-300"
                                >
                                    Hablar con un experto
                                </motion.button>
                                <motion.button
                                    onClick={scrollToServices}
                                    whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3.5 border border-white/40 bg-white/10 backdrop-blur-xl text-white font-black text-[12px] md:text-[14px] uppercase tracking-widest rounded-full transition-all duration-300"
                                >
                                    Nuestros Servicios
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* RIGHT — Logo + wordmark (Hidden on mobile) */}
                        <div className="hidden md:flex flex-col items-center gap-2 md:gap-4 flex-shrink-0 md:mt-[-60px]">
                            <motion.img
                                src={logo}
                                alt="JG Producciones"
                                className="h-28 md:h-52 w-auto brightness-200 drop-shadow-[0_0_100px_rgba(163,255,0,0.5)]"
                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                            />
                            <motion.h2
                                className="text-3xl md:text-[3.8rem] font-black text-white tracking-[0.02em] font-paloseco uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                            >
                                JG Producciones
                            </motion.h2>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;

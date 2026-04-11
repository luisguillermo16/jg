import { type FC } from 'react';
import './HeroSection.css';
import VolumeVideo from '../VolumeVideo';
import logo from '../../assets/brand/logo.webp';
import heroImage from '../../assets/home/img/hero4.jpeg';
import heroVideo from '../../assets/home/vids/hero.mp4';


interface HeroSectionProps {
    heroRef: React.RefObject<HTMLDivElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const HeroSection: FC<HeroSectionProps> = ({ heroRef }) => {

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
        <section id="hero-section" ref={heroRef} className="relative w-full h-[200vh] bg-black">
            {/* Scroll Anchors for the two stages */}
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <div id="hero" className="h-screen w-full" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
                <div id="hero-main-anchor" className="h-screen w-full" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
            </div>

            {/* Scroll-down prompt (Only visible at start) */}
            <div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-500"
                style={{
                    opacity: `calc(1 - var(--hero-progress, 0) * 5)`
                } as any}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">Explorar experiencias</span>
            </div>

            {/* ── STICKY VIEWPORT ── */}
            <div className="hero-sticky sticky top-0 w-full overflow-hidden bg-black flex items-center justify-center">
                
                {/* ════ SCENE 1: CINEMATIC INTRO ════ */}
                <div 
                    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                    style={{
                        opacity: `calc(min(1, max(0, 1 - var(--hero-progress, 0) * 2)))`,
                        transform: `scale(calc(1 - var(--hero-progress, 0) * 0.05))`,
                        visibility: `calc(var(--hero-progress, 0) > 0.6 ? 'hidden' : 'visible')`
                    } as any}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <VolumeVideo
                        src={heroVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        isVisible={true}
                        isMuted={true}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Centered Logo & Text */}
                    <div className="relative z-20 flex flex-col items-center justify-center gap-6 md:gap-12">
                        <img
                            src={logo}
                            alt="JG Logo"
                            className="hero-intro-logo h-32 md:h-56 w-auto brightness-200 drop-shadow-[0_0_100px_rgba(163,255,0,0.5)]"
                        />
                        <div className="flex flex-col items-center text-center">
                            <h2 className="hero-intro-text text-4xl md:text-[5.5rem] font-black text-white tracking-[0.05em] font-paloseco uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
                                JG Producciones
                            </h2>
                        </div>
                    </div>
                </div>

                {/* ════ SCENE 2: MAIN HERO CONTENT ════ */}
                <div className="absolute inset-0 z-20 overflow-hidden">
                    {/* Background Reveal (Scale down from outer space) */}
                    <div 
                        className="absolute inset-0 w-full h-full"
                        style={{
                            opacity: `calc(min(1, max(0, var(--hero-progress, 0) * 2 - 0.8)))`,
                            transform: `scale(calc(1.1 - (var(--hero-progress, 0) - 1) * 0.1))`,
                            filter: `blur(calc(max(0, 1 - var(--hero-progress, 0)) * 20px))`
                        } as any}
                    >
                        <img
                            src={heroImage}
                            alt="Hero Background"
                            className="w-full h-full object-cover"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                        />
                        {/* Stronger overlay for contrast */}
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
                    </div>

                    {/* Content (Producción Técnica...) */}
                    <div
                        className="relative z-30 w-full h-full"
                        style={{
                            opacity: `calc(min(1, max(0, var(--hero-progress, 0) * 2 - 1)))`,
                            transform: `translateY(calc( (1 - min(1.5, max(1, var(--hero-progress, 0)))) * 40px ))`,
                            pointerEvents: `calc(var(--hero-progress, 0) > 1.2 ? 'auto' : 'none')`
                        } as any}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 gap-8 md:gap-12">
                            {/* Centered Content */}
                            <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8 max-w-full md:max-w-[80%]">
                                <h1 className="text-[32px] md:text-[5.5rem] font-black text-white leading-[1.05] font-paloseco uppercase tracking-tight text-shadow-strong">
                                    Producción<br />
                                    Técnica para<br />
                                    Eventos
                                </h1>
                                <p className="text-[0.95rem] md:text-[1.5rem] text-white/90 leading-snug font-remixa max-w-[95%] md:max-w-4xl">
                                    Diseñamos y ejecutamos bodas, conciertos y eventos corporativos integrando pantallas LED, sonido e iluminación con estándares técnicos de alto nivel.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 md:mt-8">
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                                        className="group flex items-center gap-3 px-10 py-5 bg-[#A3FF00] text-black font-black uppercase tracking-widest rounded-[var(--btn-radius)] text-[11px] md:text-xs transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(163,255,0,0.3)]"
                                    >
                                        Hablar con un experto
                                    </button>
                                    <button
                                        onClick={scrollToServices}
                                        className="px-8 py-3.5 border border-white/40 bg-white/10 backdrop-blur-xl text-white font-black text-[12px] md:text-[14px] uppercase tracking-widest rounded-[var(--btn-radius)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 active:scale-[0.98]"
                                    >
                                        Nuestros Servicios
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;


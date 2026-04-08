import { type FC } from 'react';
import './HeroSection.css';
import logo from '../../assets/brand/logo.webp';
import heroImage from '../../assets/home/img/hero_new.webp';


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

            {/* Scroll-down prompt */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-500 ${heroIndex === 0 ? 'opacity-90' : 'opacity-0'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">Explorar experiencias</span>
            </div>

            {/* ── Background Image Layer (Sticky) ── */}
            {/* hero-sticky: promueve el layer a la GPU (will-change + backface), evita flash negro en scroll-snap móvil */}
            <div className="hero-sticky sticky top-0 w-full overflow-hidden bg-black flex items-center justify-center">
                {/* Imagen cargada con máxima prioridad, desvanece suavemente al final del scroll */}
                <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: `calc(1 - var(--hero-progress, 0))`
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
                </div>


                {/* Screen Content Layers — Animados por el scroll vía variables CSS (--hero-progress) */}
                <div
                    data-active-index={heroIndex}
                    className="relative z-20 w-full h-full"
                    style={{
                        opacity: `calc(1 - var(--hero-progress, 0) * 1.8)`,
                        transform: `scale(calc(1 + var(--hero-progress, 0) * 0.08))`
                    } as any}
                >
                    {/* Logo & CTAs — animaciones CSS puras, sin Framer Motion */}
                    <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:pl-[80px] md:pr-[120px] gap-8 md:gap-16 pt-[20px] md:pt-0">


                        {/* LEFT — Título + descripción + CTAs */}
                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 max-w-full md:max-w-[60%]">
                            <h1
                                className="hero-animate-1 text-[32px] md:text-[4.8rem] font-black text-white leading-[1.1] font-paloseco uppercase text-shadow-strong tracking-tight"
                            >
                                Producción<br />
                                Técnica para<br />
                                Eventos
                            </h1>
                            <p
                                className="hero-animate-2 text-[0.95rem] md:text-[1.35rem] text-white/90 leading-snug font-remixa max-w-[95%] md:max-w-3xl"
                            >
                                Diseñamos y ejecutamos bodas, conciertos y eventos corporativos integrando pantallas LED, sonido e iluminación con estándares técnicos de alto nivel.
                            </p>
                            <div
                                className="hero-animate-3 flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 md:mt-8"
                            >
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                                    className="px-8 py-3.5 bg-accent text-black text-[12px] md:text-[14px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                                >
                                    Hablar con un experto
                                </button>
                                <button
                                    onClick={scrollToServices}
                                    className="px-8 py-3.5 border border-white/40 bg-white/10 backdrop-blur-xl text-white font-black text-[12px] md:text-[14px] uppercase tracking-widest rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 active:scale-[0.98]"
                                >
                                    Nuestros Servicios
                                </button>
                            </div>
                        </div>

                        {/* RIGHT — Logo + wordmark (oculto en móvil) */}
                        <div className="hidden md:flex flex-col items-center gap-2 md:gap-4 flex-shrink-0 md:mt-[-60px]">
                            <img
                                src={logo}
                                alt="JG Producciones"
                                className="hero-animate-logo h-28 md:h-52 w-auto brightness-200 drop-shadow-[0_0_100px_rgba(163,255,0,0.5)]"
                            />
                            <h2
                                className="hero-animate-logo-text text-3xl md:text-[3.8rem] font-black text-white tracking-[0.02em] font-paloseco uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                JG Producciones
                            </h2>
                        </div>
                    </div>

                    {/* ── Transition Title Bridge — Creates 'Tracción' with next section ── */}
                    <div 
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 px-6"
                        style={{
                            // Empieza a aparecer al 75% del scroll del hero y llega a opacidad 1 al 100%
                            opacity: `calc(clamp(0, (var(--hero-progress, 0) - 0.75) * 4, 1))`,
                            // Sube desde 60px abajo hacia el centro
                            transform: `translateY(calc(60px - clamp(0, (var(--hero-progress, 0) - 0.75) * 240, 60) * 1px))`,
                            filter: 'blur(calc(8px - clamp(0, (var(--hero-progress, 0) - 0.75) * 32, 8) * 1px))'
                        } as any}
                    >
                        <h2 className="text-[3.5rem] md:text-[9rem] font-black text-white text-center font-paloseco uppercase leading-[0.85] tracking-[-0.02em]">
                            Nuestras <br />
                            Categorías
                        </h2>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;

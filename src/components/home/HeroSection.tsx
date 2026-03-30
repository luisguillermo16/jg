import type { FC } from 'react';
import VolumeVideo from '../VolumeVideo';
import logo from '../../assets/logo.png';
import heroVideo from '../../assets/hero.mp4';

interface HeroSectionProps {
    heroRef: React.RefObject<HTMLDivElement | null>;
    progress: number;
    heroIndex: number;
    isMuted: boolean;
    setIsMuted: (val: boolean) => void;
    isVisible: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({ heroRef, progress, heroIndex, isMuted, setIsMuted, isVisible }) => {

    // Helper to calculate opacity and transform based on progress and target point
    const getProgressStyles = (target: number, range: number = 0.3, hold: number = 0.3) => {
        // This logic creates a "plateau" where opacity is 1
        const distance = Math.abs(progress - target);
        const halfHold = hold / 2;

        let opacity = 0;
        if (distance <= halfHold) {
            opacity = 1;
        } else {
            opacity = Math.max(0, 1 - ((distance - halfHold) / range));
        }

        const scale = 0.9 + (opacity * 0.1);
        const blur = (1 - opacity) * 15;
        const translateY = (target - progress) * 180; // Adjusted for 300vh parallax

        return {
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px)`,
            filter: `blur(${blur}px)`,
            pointerEvents: (opacity > 0.5 ? 'auto' : 'none') as any,
        };
    };

    // Video Zoom logic: Starts at 1.05 and goes to 1.15
    const videoScale = 1 + (progress * 0.12);
    const videoBlur = progress * 4;

    return (
        <section id="hero-section" ref={heroRef} className="relative w-full h-[300vh] bg-black">
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <div id="hero" className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
                <div id="hero-2" className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
                <div id="hero-3" className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
            </div>

            {/* Scroll-down prompt */}
            <div className={`scroll-prompt flex flex-col items-center gap-2 transition-opacity duration-500 ${heroIndex === 0 ? 'opacity-50' : 'opacity-0'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Explorar experiencias</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
            </div>

            {/* ── Background Video Layer (Sticky - FIJO) ── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                <VolumeVideo
                    src={heroVideo}
                    autoPlay
                    loop
                    isMuted={isMuted}
                    isVisible={isVisible}
                    playsInline
                    style={{ transform: `scale(${videoScale})`, filter: `brightness(0.55) saturate(1.2) blur(${videoBlur}px)` }}
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                />

                {/* Grain Overlay */}
                <div className="absolute inset-0 z-10 opacity-30 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.9)_100%)]" />
                </div>

                {/* Screen Content Layers */}
                <div
                    data-active-index={heroIndex}
                    className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 max-w-5xl mx-auto pt-20"
                >

                    {/* 1. Logo & CTAs Screen (Scene 1: Progress 0.0) */}
                    <div
                        key="hg-scene-1"
                        style={{ ...getProgressStyles(0.0, 0.3, 0.2), transition: 'none' }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
                    >
                        <div className="flex flex-col items-center gap-2 md:gap-4">
                            <img src={logo} alt="JG Producciones" className="h-40 md:h-[18rem] w-auto brightness-200 drop-shadow-[0_0_100px_rgba(163,255,0,0.5)]" />
                            <h2 className="text-4xl md:text-[8rem] font-black text-white tracking-[0.02em] font-paloseco uppercase text-center">
                                PRODUCCIONES
                            </h2>
                        </div>

                        <div className="flex flex-col items-center gap-12 mt-8">
                            <button
                                onClick={() => setIsMuted(false)}
                                className="group relative px-12 py-4 bg-accent text-black font-black uppercase tracking-widest rounded-full hover:scale-110 transition-all duration-500 shadow-[0_15px_45px_rgba(163,255,0,0.5)] font-remixa overflow-hidden text-sm"
                            >
                                <span className="relative z-10">Explorar</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>

                    {/* 2. Main Title Screen (Scene 2: Progress 0.5) */}
                    <div
                        key="hg-scene-2"
                        style={{ ...getProgressStyles(0.5, 0.3, 0.2), transition: 'none' }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-4"
                    >
                        <h1 className="hero-title text-center drop-shadow-[0_0_50px_rgba(0,0,0,0.9)] leading-tight">
                            Producción profesional premium para eventos sociales y corporativos <br className="hidden md:block" />
                        </h1>
                    </div>

                    {/* 3. Detailed Description Screen (Scene 3: Progress 1.0) */}
                    <div
                        key="hg-scene-3"
                        style={{ ...getProgressStyles(1.0, 0.3, 0.2), transition: 'none' }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-4"
                    >
                        <div className="max-w-4xl flex flex-col items-center">
                            <span className="text-accent uppercase tracking-[0.6em] text-xs font-bold mb-8">Nuestra Esencia</span>
                            <p className="text-center drop-shadow-2xl leading-relaxed text-2xl md:text-3xl font-remixa text-white/90">
                                Fusionamos tecnología de vanguardia con pasión creativa. <br className="hidden md:block" />
                                Sonido de alta fidelidad e iluminación inmersiva que transforman escenarios
                                de Cartagena para el mundo.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;

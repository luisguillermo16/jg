import React, { type FC } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import VolumeVideo from '../VolumeVideo';
import './HeroSection.css';
import logo from '../../assets/brand/logo.png';
const heroVideo = 'https://luispineda.b-cdn.net/hero.mp4';

interface HeroSectionProps {
    heroRef: React.RefObject<HTMLDivElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    heroIndex: number;
    isMuted: boolean;
    isVisible: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({ heroRef, containerRef, heroIndex, isMuted, isVisible }) => {
    // Custom hook to get framer-motion scroll progress
    const { scrollYProgress } = useScroll({
        target: heroRef,
        container: containerRef,
        offset: ["start start", "end end"]
    });

    // Use spring for much smoother, fluid motion (avoids jerky scroll updates)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 25,
        restDelta: 0.001
    });

    // Scene 1: Logo & CTA (Visible around 0 to 0.2)
    const scene1Opacity = useTransform(smoothProgress, [0, 0.1, 0.25], [1, 1, 0]);
    const scene1Scale = useTransform(smoothProgress, [0, 0.25], [1, 0.95]);
    const scene1Y = useTransform(smoothProgress, [0, 0.25], [0, -50]);

    // Scene 2: Main Title (Visible around 0.35 to 0.65)
    const scene2Opacity = useTransform(smoothProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
    const scene2Scale = useTransform(smoothProgress, [0.25, 0.5, 0.75], [0.95, 1, 0.95]);
    const scene2Y = useTransform(smoothProgress, [0.25, 0.5, 0.75], [50, 0, -50]);

    // Scene 3: Description (Visible around 0.75 to 1.0)
    const scene3Opacity = useTransform(smoothProgress, [0.75, 0.9, 1.0], [0, 1, 1]);
    const scene3Scale = useTransform(smoothProgress, [0.75, 0.9, 1.0], [0.95, 1, 1]);
    const scene3Y = useTransform(smoothProgress, [0.75, 1.0], [50, 0]);

    // Video Effects
    const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
    const videoBlurValue = useTransform(smoothProgress, [0, 1], [0, 8]);
    const videoBrightnessValue = useTransform(smoothProgress, [0, 0.5, 1], [0.55, 0.45, 0.35]);

    // Transform video effects into CSS strings
    const videoFilter = useTransform(
        [videoBlurValue, videoBrightnessValue],
        ([blur, brightness]) => `brightness(${brightness}) saturate(1.2) blur(${blur}px)`
    );

    // Helper to control pointer events based on opacity
    const scene1PointerEvents = useTransform(scene1Opacity, (v) => v > 0.1 ? 'auto' : 'none');
    const scene2PointerEvents = useTransform(scene2Opacity, (v) => v > 0.1 ? 'auto' : 'none');
    const scene3PointerEvents = useTransform(scene3Opacity, (v) => v > 0.1 ? 'auto' : 'none');

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
                <motion.div
                    style={{ scale: videoScale, filter: videoFilter }}
                    className="absolute inset-0 w-full h-full"
                >
                    <VolumeVideo
                        src={heroVideo}
                        autoPlay
                        loop
                        isMuted={isMuted}
                        isVisible={isVisible}
                        playsInline
                        className="w-full h-full object-cover opacity-100"
                    />
                </motion.div>

                {/* Grain Overlay */}
                <div className="absolute inset-0 z-10 opacity-30 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.9)_100%)]" />
                </div>

                {/* Screen Content Layers */}
                <div
                    data-active-index={heroIndex}
                    className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 max-w-5xl mx-auto pt-20"
                >

                    {/* 1. Logo & CTAs Screen (Scene 1) */}
                    <motion.div
                        style={{
                            opacity: scene1Opacity,
                            y: scene1Y,
                            scale: scene1Scale,
                            pointerEvents: scene1PointerEvents as any
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-8 will-change-transform"
                    >
                        <div className="flex flex-col items-center gap-2 md:gap-4">
                            <motion.img
                                src={logo}
                                alt="JG Producciones"
                                className="h-40 md:h-[18rem] w-auto brightness-200 drop-shadow-[0_0_100px_rgba(163,255,0,0.5)]"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <motion.h2
                                className="text-4xl md:text-[8rem] font-black text-white tracking-[0.02em] font-paloseco uppercase text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                PRODUCCIONES
                            </motion.h2>
                        </div>

                        <div className="flex flex-col items-center gap-12 mt-8">

                        </div>
                    </motion.div>

                    {/* 2. Main Title Screen (Scene 2) */}
                    <motion.div
                        style={{
                            opacity: scene2Opacity,
                            y: scene2Y,
                            scale: scene2Scale,
                            pointerEvents: scene2PointerEvents as any
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-4 will-change-transform"
                    >
                        <h1 className="hero-title text-center drop-shadow-[0_0_50px_rgba(0,0,0,0.9)] leading-tight">
                            Producción profesional premium para eventos sociales y corporativos <br className="hidden md:block" />
                        </h1>

                        {/* Bypass button — for returning users who want to skip the narrative */}
                        <motion.button
                            style={{ opacity: scene2Opacity }}
                            onClick={scrollToServices}
                            className="mt-8 flex items-center gap-1.5 text-white/35 hover:text-white/80 transition-all duration-300 text-[10px] uppercase tracking-[0.35em] font-bold group"
                        >
                            Explorar Servicios
                            <ChevronDownIcon className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* 3. Detailed Description Screen (Scene 3) */}
                    <motion.div
                        style={{
                            opacity: scene3Opacity,
                            y: scene3Y,
                            scale: scene3Scale,
                            pointerEvents: scene3PointerEvents as any
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-4 will-change-transform"
                    >
                        <div className="max-w-4xl flex flex-col items-center">
                            <motion.span
                                style={{ opacity: scene3Opacity }}
                                className="text-accent uppercase tracking-[0.6em] text-xs font-bold mb-8"
                            >
                                Nuestra Esencia
                            </motion.span>
                            <p className="text-center drop-shadow-2xl leading-relaxed text-2xl md:text-3xl font-remixa text-white/90">
                                Fusionamos tecnología de vanguardia con pasión creativa. <br className="hidden md:block" />
                                Sonido de alta fidelidad e iluminación inmersiva que transforman escenarios
                                de Cartagena para el mundo.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;

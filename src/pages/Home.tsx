import { type FC, useState, useEffect, useRef, memo } from 'react';
import { isMobileDevice } from '../utils/deviceUtils';
import Navbar from '../components/Navbar';
import { CATEGORIES, SERVICES, GALLERY_IMAGES } from '../data/homeData';

// Modularized Components
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';

import TestimonialsSection from '../components/home/TestimonialsSection';
import GallerySection from '../components/home/GallerySection';
import CTASection from '../components/home/CTASection';

import SoundToggle from '../components/home/SoundToggle';
import FooterSection from '../components/home/FooterSection';

import './Home.css';

// Memoize sections to prevent unnecessary re-renders
const MemoHero = memo(HeroSection);
const MemoCategories = memo(CategoriesSection);
const MemoServices = memo(ServicesSection);
const MemoGallery = memo(GallerySection);
// Force manual scroll restoration at the module level to prevent browser jumps
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const Home: FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [catsProgress, setCatsProgress] = useState(0);
  const [svcsProgress, setSvcsProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeGal, setActiveGal] = useState(-1);
  const [isMuted, setIsMuted] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // LERP Tracking Refs
  const smoothCatsProgress = useRef(0);
  const smoothSvcsProgress = useRef(0);
  const rafId = useRef<number>(0);
  const rafFrame = useRef(0);
  const [winHeight, setWinHeight] = useState(0);

  // 1. Hydration & Resize Guard: Manejo de dimensiones en el cliente
  useEffect(() => {
    const handleResize = () => setWinHeight(window.innerHeight);
    handleResize(); // Initial measurement

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Advanced Scroll Reset logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Force the container to the top immediately
    container.scrollTo(0, 0);

    // 2. Temporarily disable scroll-snap to prevent the browser from snapping back to a previous section
    const originalSnap = getComputedStyle(container).scrollSnapType;
    container.style.scrollSnapType = 'none';

    const hash = window.location.hash;

    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Wait for styles/layout to settle before scrolling to a hash
        setTimeout(() => {
          if (container) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const targetScroll = elementRect.top - containerRect.top + container.scrollTop;
            container.scrollTo({ top: targetScroll, behavior: 'smooth' });
          }
        }, 500);
      }
    }

    // 3. Re-enable scroll-snap after a short delay
    const timer = setTimeout(() => {
      if (container) container.style.scrollSnapType = originalSnap || 'y mandatory';
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const LERP_FACTOR = 0.35; // Aumentado para que la animación siga el snap muy de cerca
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const windowHeight = window.innerHeight;
    const container = containerRef.current;
    if (!container) return;

    const tick = () => {
      rafFrame.current++;
      // Reducido throttle en móvil para mantener fluidez del LERP
      if (isMobileDevice && rafFrame.current % 1.5 !== 0) {
        // rafId.current = requestAnimationFrame(tick);
        // return;
      }
      const currentScroll = container.scrollTop;
      const hHeight = winHeight || window.innerHeight;

      // Measure section positions dynamically
      const svcEl = document.getElementById('servicios');
      const galEl = document.getElementById('galeria');
      const svcStart = svcEl ? svcEl.offsetTop : hHeight * 8;
      const galStart = galEl ? galEl.offsetTop : hHeight * 15;

      // ── Hero Progress (200vh) ──────────────────────────────────────────────
      const hProg = Math.min(2, currentScroll / hHeight);
      container.style.setProperty('--hero-progress', hProg.toFixed(4));

      // ── Categories Progress (400vh) ────────────────────────────────────────
      const catsStart = hHeight * 2;
      const catsMax   = hHeight * 4;
      const cProg = Math.max(0, Math.min(1, (currentScroll - catsStart) / catsMax));
      container.style.setProperty('--cats-progress', cProg.toFixed(4));

      // ── Services Progress (700vh, posición leída del DOM) ────────────────
      const sMax  = windowHeight * 7;   // 7 slides × 100vh
      const sProg = Math.max(0, Math.min(1, (currentScroll - svcStart) / sMax));
      container.style.setProperty('--svcs-progress', sProg.toFixed(4));

      // 1. Hero Index Calculation (Static Hero)
      const currentHeroIndex = 0;
      if (currentHeroIndex !== heroIndex) setHeroIndex(currentHeroIndex);

      // 2. Categories progress — LERP interpolation for smooth tracking
      const cProgSmooth = lerp(smoothCatsProgress.current, cProg, LERP_FACTOR);
      const cProgThreshold = isMobileDevice ? 0.0005 : 0.0001;
      if (Math.abs(smoothCatsProgress.current - cProgSmooth) > cProgThreshold) {
        smoothCatsProgress.current = cProgSmooth;
        setCatsProgress(cProgSmooth);
      }

      // 3. Services smooth progress
      const sProgSmooth = lerp(smoothSvcsProgress.current, sProg, LERP_FACTOR);
      const sProgThreshold = isMobileDevice ? 0.0005 : 0.0001;
      if (Math.abs(smoothSvcsProgress.current - sProgSmooth) > sProgThreshold) {
        smoothSvcsProgress.current = sProgSmooth;
        setSvcsProgress(sProgSmooth);
      }

      // 4. Section detection
      if (currentScroll < catsStart - windowHeight / 2) {
        setActiveSection('hero');
      } else if (currentScroll < svcStart - windowHeight / 2) {
        // Cada slide de categorías ocupa exactamente 1 página (100vh)
        const p = (currentScroll - catsStart) / windowHeight;
        if (p < 1.0)       setActiveSection('categories-intro');
        else if (p < 2.0)  setActiveSection('categories-1');    // Bodas
        else if (p < 3.0)  setActiveSection('categories-2');    // Sociales
        else               setActiveSection('categories-3');    // Corporativos
      } else if (currentScroll < galStart - windowHeight / 2) {
        const nosotrosEl = document.getElementById('nosotros');
        const nosotrosTop = nosotrosEl ? nosotrosEl.offsetTop : Infinity;
        if (currentScroll >= nosotrosTop - windowHeight / 2) {
          setActiveSection('nosotros');
        } else {
          setActiveSection('servicios');
        }
      } else if (currentScroll < galStart + windowHeight * 2) {
        // Gallery: 200vh total (2 snap points × 100vh)
        setActiveSection('galeria');
        const galScroll = currentScroll - galStart;
        const galP = galScroll / (windowHeight * 2);
        if (galP < 0.5) {
          setActiveGal(-1); // intro
        } else {
          setActiveGal(0);  // grid
        }
      } else {
        setActiveSection('contact');
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  // Auto-mute logic and SoundToggle visibility condition
  const isVideoSection = activeSection.startsWith('categories');

  useEffect(() => {
    if (!isVideoSection && !isMuted) {
      setIsMuted(true);
    }
  }, [isVideoSection, isMuted]);

  return (
    <div ref={containerRef} className="home-container bg-black text-white selection:bg-accent selection:text-black">
      <Navbar activeSection={activeSection} />

      <main>
        <MemoHero
          heroRef={heroRef}
          containerRef={containerRef}
        />
        <MemoCategories
          categoriesRef={categoriesRef}
          containerRef={containerRef}
          categories={CATEGORIES}
          progress={catsProgress}
          isMuted={isMuted}
        />
        <MemoServices
          services={SERVICES}
          progress={svcsProgress}
        />
        <AboutSection key="about" />
        <TestimonialsSection key="testimonials" />
        <MemoGallery
          activeGal={activeGal}
          galleryImages={GALLERY_IMAGES}
        />
        <CTASection key="cta" />
      </main>
      <FooterSection />
      <SoundToggle isMuted={isMuted} setIsMuted={setIsMuted} isVisible={isVideoSection} />
    </div>
  );
};

export default Home;
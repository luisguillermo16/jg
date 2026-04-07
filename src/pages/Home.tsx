import { type FC, useState, useEffect, useRef, memo } from 'react';
import Navbar from '../components/Navbar';
import { CATEGORIES, SERVICES, GALLERY_IMAGES } from '../data/homeData';

// Modularized Components
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import StatsBannerSection from '../components/home/StatsBannerSection';
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
    const LERP_FACTOR = 0.12;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const windowHeight = window.innerHeight;
    const container = containerRef.current;
    if (!container) return;

    const tick = () => {
      const currentScroll = container.scrollTop;

      // Measure section positions dynamically from the DOM
      const svcEl = document.getElementById('servicios');
      const galEl = document.getElementById('galeria');
      const svcStart = svcEl ? svcEl.offsetTop : windowHeight * 8;
      const galStart = galEl ? galEl.offsetTop : windowHeight * 15;

      // Update CSS Variables for smooth, non-React animations
      const hProg = Math.max(0, Math.min(1, currentScroll / (windowHeight * 2)));
      container.style.setProperty('--hero-progress', hProg.toFixed(4));

      const catsStart = windowHeight * 3;
      const catsMax = windowHeight * 5;
      const cProg = Math.max(0, Math.min(1, (currentScroll - catsStart) / catsMax));
      container.style.setProperty('--cats-progress', cProg.toFixed(4));

      // Services Progress Calculation (700vh)
      const sMax = windowHeight * 7;
      const sProg = Math.max(0, Math.min(1, (currentScroll - svcStart) / sMax));
      container.style.setProperty('--svcs-progress', sProg.toFixed(4));

      // 1. Hero Index Calculation
      const currentHeroIndex = Math.min(2, Math.floor(hProg * 3.1));
      if (currentHeroIndex !== heroIndex) setHeroIndex(currentHeroIndex);

      // 2. Categories smooth progress
      const cProgSmooth = lerp(smoothCatsProgress.current, cProg, LERP_FACTOR);
      if (Math.abs(smoothCatsProgress.current - cProgSmooth) > 0.001) {
        smoothCatsProgress.current = cProgSmooth;
        setCatsProgress(smoothCatsProgress.current);
      }

      // 3. Services smooth progress
      const sProgSmooth = lerp(smoothSvcsProgress.current, sProg, LERP_FACTOR);
      if (Math.abs(smoothSvcsProgress.current - sProgSmooth) > 0.001) {
        smoothSvcsProgress.current = sProgSmooth;
        // Optimization: Use a separate state for React if needed, but here we can just update a state
        // To avoid too many re-renders, consider if we need a state at all or just use the CSS variable
        // But the component needs to know the active index for opacity transitions.
        setSvcsProgress(sProgSmooth);
      }

      // 4. Section detection
      if (currentScroll < catsStart - windowHeight / 2) {
        if (currentScroll < windowHeight * 0.8) setActiveSection('hero');
        else if (currentScroll < windowHeight * 1.8) setActiveSection('hero-2');
        else setActiveSection('hero-3');
      } else if (currentScroll < svcStart - windowHeight / 2) {
        const p = (currentScroll - catsStart) / windowHeight;
        if (p < 1.0) setActiveSection('categories-intro');
        else if (p < 2.25) setActiveSection('categories-1');
        else if (p < 3.5) setActiveSection('categories-2');
        else setActiveSection('categories-3');
      } else if (currentScroll < galStart - windowHeight / 2) {
        const nosotrosEl = document.getElementById('nosotros');
        const nosotrosTop = nosotrosEl ? nosotrosEl.offsetTop : Infinity;
        if (currentScroll >= nosotrosTop - windowHeight / 2) {
          setActiveSection('nosotros');
        } else {
          setActiveSection('servicios');
        }
      } else if (currentScroll < galStart + windowHeight * 4) {
        setActiveSection('galeria');
        const galScroll = currentScroll - galStart;
        const galP = galScroll / (windowHeight * 4);
        if (galP < 0.55) {
          setActiveGal(-1);
        } else {
          setActiveGal(0);
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
  const isVideoSection = activeSection.startsWith('hero') || activeSection.startsWith('categories');

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
          heroRef={heroRef as any}
          containerRef={containerRef}
          heroIndex={heroIndex}
          isMuted={isMuted}
          isVisible={activeSection.startsWith('hero')}
        />
        <MemoCategories
          categoriesRef={categoriesRef as any}
          categories={CATEGORIES}
          progress={catsProgress}
          isMuted={isMuted}
        />
        <StatsBannerSection />
        <MemoServices
          services={SERVICES}
          progress={svcsProgress}
        />
        <AboutSection />
        <TestimonialsSection />
        <MemoGallery
          activeGal={activeGal}
          galleryImages={GALLERY_IMAGES}
        />
        <CTASection />
      </main>
      <FooterSection />
      <SoundToggle isMuted={isMuted} setIsMuted={setIsMuted} isVisible={isVideoSection} />
    </div>
  );
};

export default Home;
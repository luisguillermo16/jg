import { type FC, useState, useEffect, useRef, memo } from 'react';
import Navbar from '../components/Navbar';
import { CATEGORIES, SERVICES, GALLERY_IMAGES } from '../data/homeData';

// Modularized Components
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import ServicesSection from '../components/home/ServicesSection';
import GallerySection from '../components/home/GallerySection';

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
  const [activeSection, setActiveSection] = useState('hero');
  const [activeSvc, setActiveSvc] = useState(-1);
  const [activeGal, setActiveGal] = useState(-1);
  const [isMuted, setIsMuted] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // LERP Tracking Refs
  const smoothCatsProgress = useRef(0);
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
    
    const SECTION_OFFSETS = {
      hero: 0,
      categories: windowHeight * 3,
      servicios: windowHeight * 7,
      galeria: windowHeight * 13,
    };

    const tick = () => {
      const currentScroll = container.scrollTop;
      
      // Update CSS Variables for smooth, non-React animations
      const hProg = Math.max(0, Math.min(1, currentScroll / (windowHeight * 2)));
      container.style.setProperty('--hero-progress', hProg.toFixed(4));
      
      const catsStart = windowHeight * 3;
      const catsMax = windowHeight * 3;
      const cProg = Math.max(0, Math.min(1, (currentScroll - catsStart) / catsMax));
      container.style.setProperty('--cats-progress', cProg.toFixed(4));

      // 1. Hero Index Calculation
      const currentHeroIndex = Math.min(2, Math.floor(hProg * 3.1));
      if (currentHeroIndex !== heroIndex) setHeroIndex(currentHeroIndex);

      // 2. Categories Progress (Still use state for discrete check if needed)
      const cProgSmooth = lerp(smoothCatsProgress.current, cProg, LERP_FACTOR);
      if (Math.abs(smoothCatsProgress.current - cProgSmooth) > 0.001) {
        smoothCatsProgress.current = cProgSmooth;
        setCatsProgress(smoothCatsProgress.current);
      }

      // 3. Section Updates (Throttled/Threshold based)
      if (currentScroll < SECTION_OFFSETS.categories - windowHeight / 2) {
        if (currentScroll < windowHeight * 0.8) setActiveSection('hero');
        else if (currentScroll < windowHeight * 1.8) setActiveSection('hero-2');
        else setActiveSection('hero-3');
      } else if (currentScroll < SECTION_OFFSETS.servicios - windowHeight / 2) {
        const p = (currentScroll - SECTION_OFFSETS.categories) / windowHeight;
        if (p < 0.5) setActiveSection('categories-intro');
        else if (p < 1.5) setActiveSection('categories-1');
        else if (p < 2.5) setActiveSection('categories-2');
        else setActiveSection('categories-3');
      } else if (currentScroll < SECTION_OFFSETS.galeria - windowHeight / 2) {
        setActiveSection('servicios');
        const svcScroll = currentScroll - SECTION_OFFSETS.servicios;
        const svcP = svcScroll / (windowHeight * 6); // Total height: 600vh
        
        // Balanced thresholds with a slight 'buffer' for intro screens
        if (svcP < 0.25) {
          setActiveSvc(-1);
        } else if (svcP < 0.45) {
          setActiveSvc(0);
        } else if (svcP < 0.65) {
          setActiveSvc(1);
        } else {
          setActiveSvc(2);
        }
        
      } else if (currentScroll < SECTION_OFFSETS.galeria + windowHeight * 4) {
        setActiveSection('galeria');
        const galScroll = currentScroll - SECTION_OFFSETS.galeria;
        const galP = galScroll / (windowHeight * 4); // Total height: 400vh
        
        // Balanced intro transition
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
          setIsMuted={setIsMuted}
          isVisible={activeSection.startsWith('hero')}
        />
        <MemoCategories
          categoriesRef={categoriesRef as any}
          categories={CATEGORIES}
          progress={catsProgress}
          isMuted={isMuted}
        />
        <MemoServices
          services={SERVICES}
          activeSvc={activeSvc}
        />
        <MemoGallery
          activeGal={activeGal}
          galleryImages={GALLERY_IMAGES}
        />
      </main>
      <FooterSection />
      <SoundToggle isMuted={isMuted} setIsMuted={setIsMuted} isVisible={isVideoSection} />
    </div>
  );
};

export default Home;
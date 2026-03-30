import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
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

const Home: FC = () => {
  const [heroProgress, setHeroProgress] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [catsProgress, setCatsProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero-section');
  const [activeSvc, setActiveSvc] = useState(-1);
  const [activeGal, setActiveGal] = useState(-1);
  const [isMuted, setIsMuted] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // LERP Tracking Refs - Hero
  const rawHeroProgress = useRef(0);
  const smoothHeroProgress = useRef(0);

  // LERP Tracking Refs - Categories
  const rawCatsProgress = useRef(0);
  const smoothCatsProgress = useRef(0);

  const rafId = useRef<number>(0);

  useEffect(() => {
    const LERP_FACTOR = 0.12; // Más rápido para mayor respuesta
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // 1. Hero Calculations
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const height = rect.height - window.innerHeight;
        rawHeroProgress.current = Math.max(0, Math.min(1, -rect.top / height));
      }
      smoothHeroProgress.current = lerp(smoothHeroProgress.current, rawHeroProgress.current, LERP_FACTOR);
      setHeroProgress(smoothHeroProgress.current);
      setHeroIndex(Math.min(2, Math.floor(smoothHeroProgress.current * 3)));

      // 2. Categories Calculations (AÑADIDO LERP PARA PRECISIÓN)
      if (categoriesRef.current) {
        const rect = categoriesRef.current.getBoundingClientRect();
        const height = rect.height - window.innerHeight;
        rawCatsProgress.current = Math.max(0, Math.min(1, -rect.top / height));
      }
      smoothCatsProgress.current = lerp(smoothCatsProgress.current, rawCatsProgress.current, LERP_FACTOR);
      setCatsProgress(smoothCatsProgress.current);

      const catsEl = document.getElementById('categories');
      const servsEl = document.getElementById('servicios');
      const galEl = document.getElementById('galeria');

      const windowHeight = window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll < (catsEl?.offsetTop || 9999) - windowHeight / 2) {
        // Hero has 3 states
        if (currentScroll < windowHeight * 0.8) setActiveSection('hero');
        else if (currentScroll < windowHeight * 1.8) setActiveSection('hero-2');
        else setActiveSection('hero-3');
      } else if (currentScroll < (servsEl?.offsetTop || 9999) - windowHeight / 2) {
        // Categories has 4 states (Intro + 3 Cats)
        const catsStart = catsEl?.offsetTop || 0;
        const p = (currentScroll - catsStart) / windowHeight;
        if (p < 0.5) setActiveSection('categories-intro');
        else if (p < 1.5) setActiveSection('categories-1');
        else if (p < 2.5) setActiveSection('categories-2');
        else setActiveSection('categories-3');
      } else if (currentScroll < (galEl?.offsetTop || 9999) - windowHeight / 2) {
        setActiveSection('servicios');
      } else {
        setActiveSection('galeria');
      }

      if (servsEl) {
        const rect = servsEl.getBoundingClientRect();
        const p = -rect.top / (rect.height - window.innerHeight);
        if (rect.top > window.innerHeight || p < 0.05) setActiveSvc(-1);
        else if (p < 0.35) setActiveSvc(0);
        else if (p < 0.65) setActiveSvc(1);
        else setActiveSvc(2);
      }

      if (galEl) {
        const rect = galEl.getBoundingClientRect();
        const p = -rect.top / (rect.height - window.innerHeight);
        if (rect.top > window.innerHeight || p < 0.1) setActiveGal(-1);
        else setActiveGal(0);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Optional: remove if you want animations to re-trigger
          // entry.target.classList.remove('active');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-container bg-black text-white selection:bg-accent selection:text-black">
      <Navbar />
      <main>
        <HeroSection
          heroRef={heroRef as any}
          progress={heroProgress}
          heroIndex={heroIndex}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isVisible={activeSection === 'hero-section'}
        />
        <CategoriesSection
          categoriesRef={categoriesRef as any}
          categories={CATEGORIES}
          progress={catsProgress}
          isMuted={isMuted}
        />
        <ServicesSection
          services={SERVICES}
          activeSvc={activeSvc}
        />
        <GallerySection
          activeGal={activeGal}
          galleryImages={GALLERY_IMAGES}
        />
      </main>
      <FooterSection />
      <SoundToggle isMuted={isMuted} setIsMuted={setIsMuted} />
    </div>
  );
};

export default Home;
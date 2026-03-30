import { FC, useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { CATEGORIES, SERVICES, GALLERY_IMAGES, SECTIONS } from '../data/homeData';

// Modularized Components
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import ServicesSection from '../components/home/ServicesSection';
import GallerySection from '../components/home/GallerySection';
import SideNavigator from '../components/home/SideNavigator';
import SoundToggle from '../components/home/SoundToggle';
import FooterSection from '../components/home/FooterSection';

import './Home.css';

const Home: FC = () => {
  const [heroIndex, setHeroIndex] = useState(2);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeSvc, setActiveSvc] = useState(-1);
  const [activeGal, setActiveGal] = useState(-1);
  const [isMuted, setIsMuted] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      const hero = document.getElementById('hero-section');
      const cats = document.getElementById('categories');
      const servs = document.getElementById('servicios');
      const gal = document.getElementById('galeria');

      if (hero && scrollPos < cats!.offsetTop) setActiveSection('hero');
      else if (cats && scrollPos < servs!.offsetTop) setActiveSection('categories');
      else if (servs && scrollPos < gal!.offsetTop) setActiveSection('servicios');
      else if (gal) setActiveSection('galeria');

      // Hero Sticky Progression Logic
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const heroProgress = -heroRect.top / (heroRect.height - window.innerHeight);
        if (heroProgress < 0.3) setHeroIndex(2);
        else if (heroProgress < 0.65) setHeroIndex(0);
        else setHeroIndex(1);
      }

      // Categories Scrollytelling logic
      if (categoriesRef.current) {
        const rect = categoriesRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        if (rect.top > window.innerHeight || scrollProgress < 0.05) setActiveIndex(-1);
        else if (scrollProgress < 0.35) setActiveIndex(0);
        else if (scrollProgress < 0.65) setActiveIndex(1);
        else setActiveIndex(2);
      }

      // Services Scrollytelling logic
      const servsEl = document.getElementById('servicios');
      if (servsEl) {
        const rect = servsEl.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        if (rect.top > window.innerHeight || scrollProgress < 0.05) setActiveSvc(-1);
        else if (scrollProgress < 0.35) setActiveSvc(0);
        else if (scrollProgress < 0.65) setActiveSvc(1);
        else setActiveSvc(2);
      }

      // Gallery Scrollytelling logic
      const galEl = document.getElementById('galeria');
      if (galEl) {
        const rect = galEl.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        if (rect.top > window.innerHeight || scrollProgress < 0.1) setActiveGal(-1);
        else setActiveGal(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Reveal Observer for scroll entrance animations (optional if using Scrollytelling only)
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-black text-white selection:bg-accent selection:text-black overflow-x-hidden">
      <Navbar />

      {/* Full Scrollytelling Core Flow */}
      <main>
        <HeroSection 
          heroRef={heroRef} 
          heroIndex={heroIndex} 
          isMuted={isMuted} 
          setIsMuted={setIsMuted} 
          isVisible={activeSection === 'hero'}
        />

        <CategoriesSection 
          categoriesRef={categoriesRef} 
          categories={CATEGORIES} 
          activeIndex={activeIndex} 
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

      {/* Floating UI elements */}
      <SoundToggle isMuted={isMuted} setIsMuted={setIsMuted} />
      <SideNavigator sections={SECTIONS} activeSection={activeSection} />
    </div>
  );
};

export default Home;
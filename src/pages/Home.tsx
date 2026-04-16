import { type FC, useEffect, memo } from 'react';
import Navbar from '../components/Navbar';
import { SERVICES, GALLERY_IMAGES } from '../data/homeData';

import HeroSection from '../components/home/hero/HeroSection';
import ServicesSection from '../components/home/services/ServicesSection';
import AboutSection from '../components/home/about/AboutSection';
import TestimonialsSection from '../components/home/testimonials/TestimonialsSection';
import CTASection from '../components/home/cta/CTASection';
import FooterSection from '../components/home/footer/FooterSection';

import { useScrollSpy } from '../hooks/useScrollSpy';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';


const Home: FC = () => {
  // 1. Detección de sección activa (ScrollSpy) optimizada con IntersectionObserver
  const activeSection = useScrollSpy([
    'hero-section',
    'servicios',
    'categorias',
    'nosotros',
    'galeria',
    'contact'
  ]);

  // 2. Animaciones de aparición (Reveal logic)
  useRevealOnScroll();

  // 3. Scroll to top + Hash support al montar
  useEffect(() => {
    // Evitar parpadeo de scroll en navegación
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  return (
    <div className="bg-[#F9F8F6] selection:bg-[#63D72A] selection:text-black min-h-screen font-sans">
      <Navbar activeSection={activeSection} />

      <main>
        <HeroSection />
        <ServicesSection services={SERVICES} />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <FooterSection />
    </div>
  );
};

export default Home;
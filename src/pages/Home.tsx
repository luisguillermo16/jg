import { type FC, useEffect, memo } from 'react';
import Navbar from '../components/Navbar';
import { SERVICES, GALLERY_IMAGES } from '../data/homeData';

import HeroSection from '../components/home/hero/HeroSection';
import CategoriesSection from '../components/home/categories/CategoriesSection';
import ServicesSection from '../components/home/services/ServicesSection';
import AboutSection from '../components/home/about/AboutSection';
import TestimonialsSection from '../components/home/testimonials/TestimonialsSection';
import GallerySection from '../components/home/gallery/GallerySection';
import CTASection from '../components/home/cta/CTASection';
import FooterSection from '../components/home/footer/FooterSection';

import { useScrollSpy } from '../hooks/useScrollSpy';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const MemoHero = memo(HeroSection);

const Home: FC = () => {
  // 1. Detección de sección activa (ScrollSpy) optimizada con IntersectionObserver
  const activeSection = useScrollSpy([
    'hero-section',
    'categorias',
    'nosotros',
    'servicios',
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
    <div className="bg-[#030d05] text-white selection:bg-accent selection:text-black">
      <Navbar activeSection={activeSection} />

      <main>
        <MemoHero />
        <CategoriesSection />
        <AboutSection />
        <div id="servicios">
          <ServicesSection services={SERVICES} />
        </div>
        <TestimonialsSection />
        <GallerySection galleryImages={GALLERY_IMAGES} />
        <CTASection />
      </main>

      <FooterSection />
    </div>
  );
};

export default Home;
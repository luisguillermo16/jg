import { type FC, useState, useEffect, useRef, memo } from 'react';
import Navbar from '../components/Navbar';
import { SERVICES, GALLERY_IMAGES } from '../data/homeData';

import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import GallerySection from '../components/home/GallerySection';
import CTASection from '../components/home/CTASection';
import FooterSection from '../components/home/FooterSection';

const MemoHero = memo(HeroSection);

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const Home: FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const rafId = useRef<number>(0);
  const rafFrame = useRef(0);
  const lastSectionRef = useRef('hero');

  const sectionOffsets = useRef({
    catsStart: 0,
    svcStart: 0,
    galStart: 0,
    nosotrosTop: Number.POSITIVE_INFINITY,
  });

  // Scroll to top + hash support
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const refreshOffsets = () => {
      const h = window.innerHeight;
      const catsEl = document.getElementById('categorias');
      const svcEl = document.getElementById('servicios');
      const galEl = document.getElementById('galeria');
      const nosEl = document.getElementById('nosotros');
      sectionOffsets.current = {
        catsStart:   catsEl ? catsEl.offsetTop : h,
        svcStart:    svcEl ? svcEl.offsetTop : h * 5,
        galStart:    galEl ? galEl.offsetTop : h * 12,
        nosotrosTop: nosEl ? nosEl.offsetTop : Number.POSITIVE_INFINITY,
      };
    };

    window.addEventListener('resize', refreshOffsets);
    refreshOffsets();

    const tick = () => {
      rafFrame.current++;
      if (rafFrame.current % 12 === 0) refreshOffsets();

      if (document.visibilityState !== 'hidden') {
        const scroll = window.scrollY;
        const vh = window.innerHeight;
        const { catsStart, svcStart, galStart, nosotrosTop } = sectionOffsets.current;
        const margin = vh / 2;

        let next = lastSectionRef.current;
        if (scroll < catsStart - margin) {
          next = 'hero';
        } else if (scroll < nosotrosTop - margin) {
          next = 'categorias';
        } else if (scroll < svcStart - margin) {
          next = 'nosotros';
        } else if (scroll < galStart - margin) {
          next = 'servicios';
        } else if (scroll < galStart + vh * 2) {
          next = 'galeria';
        } else {
          next = 'contact';
        }

        if (next !== lastSectionRef.current) {
          lastSectionRef.current = next;
          setActiveSection(next);
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    // Reveal-on-scroll observer
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
      window.removeEventListener('resize', refreshOffsets);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
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
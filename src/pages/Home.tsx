import { type FC, useState, useEffect, useRef, memo } from 'react';
import Navbar from '../components/Navbar';
import { SERVICES, GALLERY_IMAGES } from '../data/homeData';

// Direct Imports (Removing Lazy loading for stability)
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import GallerySection from '../components/home/GallerySection';
import CTASection from '../components/home/CTASection';
import FooterSection from '../components/home/FooterSection';

// Memoize critical section
const MemoHero = memo(HeroSection);

// Force manual scroll restoration at the module level to prevent browser jumps
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const Home: FC = () => {
  const [svcsProgress, setSvcsProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeGal, setActiveGal] = useState(-1);

  // LERP Tracking Refs
  const smoothSvcsProgress = useRef(0);
  const rafId = useRef<number>(0);
  const rafFrame = useRef(0);
  const lastSectionRef = useRef('hero');
  const lastGalRef = useRef(-1);

  /** offsetTop cache — evita getElementById cada frame */
  const sectionOffsets = useRef({
    svcStart: 0,
    galStart: 0,
    nosotrosTop: Number.POSITIVE_INFINITY,
  });

  // Simplified Scroll Reset logic (Global)
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const LERP_FACTOR = 0.35;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const refreshSectionOffsets = () => {
      const h = window.innerHeight;
      const svcEl = document.getElementById('servicios');
      const galEl = document.getElementById('galeria');
      const nosEl = document.getElementById('nosotros');
      sectionOffsets.current = {
        svcStart: svcEl ? svcEl.offsetTop : h * 4,
        galStart: galEl ? galEl.offsetTop : h * 11,
        nosotrosTop: nosEl ? nosEl.offsetTop : Number.POSITIVE_INFINITY,
      };
    };

    const onResize = () => refreshSectionOffsets();
    window.addEventListener('resize', onResize);
    refreshSectionOffsets();

    const tick = () => {
      rafFrame.current++;
      if (document.visibilityState === 'hidden') {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const windowHeight = window.innerHeight;
      if (rafFrame.current % 12 === 0) {
        refreshSectionOffsets();
      }

      const currentScroll = window.scrollY;
      const { svcStart, galStart, nosotrosTop } = sectionOffsets.current;

      // ── Hero Progress (100vh) ──────────────────────────────────────────────
      const hProg = Math.min(1, currentScroll / (windowHeight || 1));
      document.documentElement.style.setProperty('--hero-progress', hProg.toFixed(4));

      // ── Services Progress (700vh) ─────────────────────────────────────────
      const sMax = windowHeight * 7;
      const sProg = Math.max(0, Math.min(1, (currentScroll - svcStart) / sMax));
      document.documentElement.style.setProperty('--svcs-progress', sProg.toFixed(4));

      const sProgSmooth = lerp(smoothSvcsProgress.current, sProg, LERP_FACTOR);
      if (Math.abs(smoothSvcsProgress.current - sProgSmooth) > 0.0001) {
        smoothSvcsProgress.current = sProgSmooth;
        setSvcsProgress(sProgSmooth);
      }

      // ── Section detection ─────────────────────────────────────────────────
      let nextSection = lastSectionRef.current;
      const detectionMargin = windowHeight / 2;

      if (currentScroll < svcStart - detectionMargin) {
        nextSection = 'hero';
      } else if (currentScroll < galStart - detectionMargin) {
        if (currentScroll >= nosotrosTop - detectionMargin) {
          nextSection = 'nosotros';
        } else {
          nextSection = 'servicios';
        }
      } else if (currentScroll < galStart + windowHeight * 2) {
        nextSection = 'galeria';
        const galScroll = currentScroll - galStart;
        const galP = galScroll / (windowHeight * 2);
        const nextGal = galP < 0.5 ? -1 : 0;
        if (nextGal !== lastGalRef.current) {
          lastGalRef.current = nextGal;
          setActiveGal(nextGal);
        }
      } else {
        nextSection = 'contact';
      }

      if (nextSection !== lastSectionRef.current) {
        lastSectionRef.current = nextSection;
        setActiveSection(nextSection);
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
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-container bg-[#030500] text-white selection:bg-accent selection:text-black">
      <Navbar activeSection={activeSection} />

      <main>
        <MemoHero />

        <AboutSection key="about" />

        <div id="servicios">
          <ServicesSection
            services={SERVICES}
          />
        </div>

        <TestimonialsSection key="testimonials" />

        <GallerySection
          galleryImages={GALLERY_IMAGES}
        />

        <CTASection key="cta" />
      </main>

      <FooterSection />
    </div>
  );
};

export default Home;
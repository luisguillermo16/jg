import { type FC, useState, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/brand/logo.png';
import ContactModal from './ContactModal';

interface NavbarProps {
  activeSection?: string;
}

// Only the section links — no CTA button here
const NavLinks: FC<{
  isHome: boolean;
  activeSection: string;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  setIsMenuOpen: (open: boolean) => void;
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}> = memo(({ isHome, activeSection, scrollToSection, setIsMenuOpen, onContactClick }) => {
  const isActive = (id: string) => {
    if (!isHome) return false;
    if (id === 'hero' && activeSection.startsWith('hero')) return true;
    return activeSection === id;
  };

  const linkClass = (id: string) =>
    `px-4 py-2 text-sm font-semibold transition-all duration-300 font-remixa ${
      isActive(id) ? 'text-[#A3FF00]' : 'text-white/60 hover:text-white'
    }`;

  return (
    <>
      {/* 1. Home */}
      <li>
        <a href="/" onClick={(e) => scrollToSection(e, 'hero')} className={linkClass('hero')}>
          Home
        </a>
      </li>

      {/* 2. Servicios */}
      <li>
        <a href="#servicios" onClick={(e) => scrollToSection(e, '#servicios')} className={linkClass('servicios')}>
          Servicios
        </a>
      </li>

      {/* 3. Nosotros */}
      <li>
        <a href="#nosotros" onClick={(e) => scrollToSection(e, '#nosotros')} className={linkClass('nosotros')}>
          Nosotros
        </a>
      </li>

      {/* 4. Galería */}
      <li>
        <a href="#galeria" onClick={(e) => scrollToSection(e, '#galeria')} className={linkClass('galeria')}>
          Galería
        </a>
      </li>

      {/* 5. Contáctanos — visually distinct CTA */}
      <li>
        <a
          href="#contact"
          onClick={onContactClick}
          className="ml-2 px-5 py-2 rounded-full text-sm font-bold border border-[#A3FF00]/40 bg-[#A3FF00]/10 text-[#A3FF00] hover:bg-[#A3FF00] hover:text-black hover:border-[#A3FF00] transition-all duration-300 font-remixa inline-flex items-center"
        >
          Contáctanos
        </a>
      </li>
    </>
  );
});

NavLinks.displayName = 'NavLinks';

const Navbar: FC<NavbarProps> = ({ activeSection = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const container = document.querySelector('.home-container');
    const scrollTarget = container || window;

    const updateScrollProgress = () => {
      let progress = 0;
      if (container) {
        const scrollY = container.scrollTop;
        const totalHeight = container.scrollHeight - container.clientHeight;
        progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      } else {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      }
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();
    return () => scrollTarget.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Stroke Progress Math
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - scrollProgress * circumference;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const sectionId = id.startsWith('#') ? id.slice(1) : id;

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const container = document.querySelector('.home-container');
    if (!container) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (id === '#' || id === 'hero') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const targetScroll = elementRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleOpenModal = () => setIsContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpenModal);
    return () => window.removeEventListener('open-contact-modal', handleOpenModal);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsContactModalOpen(true);
    setIsMenuOpen(false);
  };

  const isHome = location.pathname === '/';
  const scrolled = scrollProgress > 0.02;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-10 py-5 md:py-6 transition-all duration-500">

        {/* ── LEFT: Logo + progress ring ── */}
        <Link
          to="/"
          className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
          onClick={(e) => scrollToSection(e, 'hero')}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={radius} className="fill-none stroke-white/10 stroke-[2.5]" />
            <circle
              cx="32" cy="32" r={radius}
              className="fill-none stroke-[#a3ff00] stroke-[3] ease-out transition-[stroke-dashoffset] duration-300"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ strokeLinecap: 'round', filter: 'drop-shadow(0 0 10px rgba(163,255,0,0.7))' }}
            />
          </svg>
          <img
            src={logo}
            alt="JG Producciones"
            className="relative z-10 h-6 md:h-9 w-auto object-contain brightness-200 transition-all duration-500 hover:scale-110"
          />
        </Link>

        {/* ── CENTER: Navigation pill (desktop) ── */}
        <div
          className={`hidden md:flex items-center transition-all duration-700 px-2 py-1.5 ${
            scrolled
              ? 'bg-black/55 backdrop-blur-2xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'bg-transparent'
          }`}
        >
          <ul className="flex gap-0.5 m-0 p-0 list-none items-center">
            <NavLinks
              isHome={isHome}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              setIsMenuOpen={setIsMenuOpen}
              onContactClick={handleContactClick}
            />
          </ul>
        </div>

        {/* ── RIGHT: CTA button (desktop) + mobile hamburger ── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop CTA inside pill is handled by NavLinks */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="flex md:hidden w-11 h-11 flex-col items-center justify-center gap-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full z-[1100]"
          >
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-[900] md:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setIsMenuOpen(false)} />
        <div
          className={`absolute inset-x-0 top-0 pt-28 pb-12 px-8 bg-gradient-to-b from-[#091800]/50 to-black border-b border-white/10 transition-all duration-500 transform ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <ul className="flex flex-col gap-6 m-0 p-0 list-none items-center">
            <NavLinks
              isHome={isHome}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              setIsMenuOpen={setIsMenuOpen}
              onContactClick={handleContactClick}
            />
          </ul>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default Navbar;

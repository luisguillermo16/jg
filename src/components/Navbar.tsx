import { type FC, useState, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/brand/logo.webp';
import ContactModal from './ContactModal';

interface NavbarProps {
  activeSection?: string;
}

// Subcomponente para los links de navegación con animación stagger
const NavLinks: FC<{
  isHome: boolean;
  activeSection: string;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}> = memo(({ isHome, activeSection, scrollToSection }) => {
  const isActive = (id: string) => {
    if (!isHome) return false;
    if (id === 'hero' && activeSection.startsWith('hero')) return true;
    return activeSection === id;
  };

  const navItems = [
    { id: 'hero', label: 'Home', href: '/' },
    { id: 'servicios', label: 'Servicios', href: '#servicios' },
    { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
    { id: 'galeria', label: 'Galería', href: '#galeria' },
  ];

  return (
    <>
      {navItems.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
        >
          <a
            href={item.href}
            onClick={(e) => scrollToSection(e, item.id === 'hero' ? 'hero' : `#${item.id}`)}
            className={`px-4 py-2 text-sm font-semibold transition-all duration-300 font-remixa ${
              isActive(item.id) ? 'text-[#63D72A]' : 'text-[#F9F8F6]'
            }`}
          >
            {item.label}
          </a>
        </motion.li>
      ))}
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
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScrollable > 0 ? Math.min(1, scrollY / totalScrollable) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [location.pathname]);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = Math.max(0, circumference - (scrollProgress * circumference));

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const sectionId = id.startsWith('#') ? id.slice(1) : id;

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    if (id === '#' || id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleOpenModal = () => setIsContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpenModal);
    return () => window.removeEventListener('open-contact-modal', handleOpenModal);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-10 py-5 md:py-6 transition-all duration-500"
      >
        {/* LEFT: Logo + progress ring */}
        <Link
          to="/"
          className="group flex items-center gap-3 w-auto flex-shrink-0 bg-[#21201E]/50 backdrop-blur-2xl rounded-[12px] px-3 py-1.5 border border-white/5 transition-all duration-300 hover:bg-[#21201E]/70"
          onClick={(e) => scrollToSection(e, 'hero')}
        >
          <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r={radius} fill="none" stroke="#63D72A" strokeWidth="2.5" />
              <circle
                cx="32" cy="32" r={radius}
                fill="none"
                stroke="#63D72A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ filter: 'drop-shadow(0 0 15px rgba(99, 215, 42, 0.7))' }}
              />
            </svg>
            <img src={logo} alt="Logo" className="relative z-10 h-[12px] md:h-[13px] w-auto brightness-200" />
          </div>
          <span className={`block font-remixa font-semibold text-[13px] md:text-[14px] uppercase tracking-[0.05em] group-hover:scale-105 transition-all duration-500 ${
            isHome && (activeSection === 'hero' || activeSection === '') ? 'text-[#63D72A]' : 'text-[#F9F8F6]'
          }`}>
            Producciones
          </span>
        </Link>

        {/* CENTER: Navigation (desktop) */}
        <div className="hidden md:flex items-center">
          <ul className="flex gap-0.5 m-0 p-0 list-none items-center bg-[#21201E]/50 backdrop-blur-2xl rounded-[12px] px-2 py-1.5">
            <NavLinks isHome={isHome} activeSection={activeSection} scrollToSection={scrollToSection} />
          </ul>
        </div>

        {/* RIGHT: CTA + Burger */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="hidden md:flex px-7 py-2.5 rounded-[12px] text-[13px] font-black bg-[#63D72A] text-[#21201E] transition-all duration-300 font-remixa hover:-translate-y-0.5"
          >
            Contáctanos
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden w-12 h-12 flex-col items-center justify-center gap-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full z-[1100]"
          >
            <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[900] md:hidden"
          >
            <div className="absolute inset-0 bg-[#21201E]/95 backdrop-blur-2xl" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="absolute inset-x-0 top-0 pt-28 pb-12 px-8 bg-gradient-to-b from-[#21201E] to-black border-b border-white/10"
            >
              <ul className="flex flex-col gap-8 list-none items-center">
                <NavLinks isHome={isHome} activeSection={activeSection} scrollToSection={scrollToSection} />
                <li className="w-full max-w-[200px] mt-4">
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full py-4 rounded-[12px] text-sm font-black bg-[#63D72A] text-[#21201E] font-remixa"
                  >
                    Contáctanos
                  </button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default Navbar;

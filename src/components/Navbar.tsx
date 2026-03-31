import { type FC, useState, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/brand/logo.png';
import ContactModal from './ContactModal';

interface NavbarProps {
  activeSection?: string;
}

const NavLinks: FC<{ 
  isHome: boolean; 
  isNosotros: boolean; 
  activeSection: string; 
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  setIsMenuOpen: (open: boolean) => void;
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}> = memo(({ isHome, isNosotros, activeSection, scrollToSection, setIsMenuOpen, onContactClick }) => {
  const isActive = (id: string) => {
    if (!isHome) return false;
    if (id === 'hero' && activeSection.startsWith('hero')) return true;
    if (id === 'nosotros' && isNosotros) return true;
    return activeSection === id;
  };

  return (
    <>
      <li key="home">
        <a 
          href="/" 
          onClick={(e) => scrollToSection(e, 'hero')} 
          className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive('hero') ? 'text-accent' : 'text-text hover:text-accent'} font-remixa`}
        >
          Home
        </a>
      </li>
      <li key="servicios">
        <a 
          href="#servicios" 
          onClick={(e) => scrollToSection(e, '#servicios')} 
          className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive('servicios') ? 'text-accent' : 'text-text hover:text-accent'} font-remixa`}
        >
          Servicios
        </a>
      </li>
      <li key="contact">
        <a 
          href="#contact" 
          onClick={onContactClick} 
          className={`mx-2 px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-xl ${isActive('contact') ? 'bg-accent/80 scale-105' : 'bg-accent'} text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(163,255,0,0.5)] font-remixa`}
        >
          Contactanos
        </a>
      </li>
      <li key="galeria">
        <a 
          href="#galeria" 
          onClick={(e) => scrollToSection(e, '#galeria')} 
          className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive('galeria') ? 'text-accent' : 'text-text hover:text-accent'} font-remixa`}
        >
          Galeria
        </a>
      </li>
      <li key="nosotros">
        <Link 
          to="/nosotros" 
          onClick={() => setIsMenuOpen(false)} 
          className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ${isNosotros ? 'text-accent' : 'text-text hover:text-accent'} font-remixa`}
        >
          Nosotros
        </Link>
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
    // Initial check
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
    
    // Normalize ID
    const sectionId = id.startsWith('#') ? id.slice(1) : id;

    if (location.pathname !== '/') {
       // Navigate to home with hash
       navigate(`/#${sectionId}`);
       return;
    }

    const container = document.querySelector('.home-container');
    if (!container) {
      // Fallback if home-container is missing but we are on /
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

      container.scrollTo({ 
        top: targetScroll, 
        behavior: 'smooth' 
      });
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
  const isNosotros = location.pathname === '/nosotros';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-6 md:px-20 py-6 md:py-8 bg-transparent transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <Link to="/" className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16" onClick={(e) => scrollToSection(e, 'hero')}>
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r={radius} className="fill-none stroke-white/10 stroke-[2.5]" />
              <circle cx="32" cy="32" r={radius} className="fill-none stroke-[#a3ff00] stroke-[3] ease-out transition-[stroke-dashoffset] duration-300"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ strokeLinecap: 'round', filter: 'drop-shadow(0 0 12px rgba(163, 255, 0, 0.7))' }}
              />
            </svg>
            <img src={logo} alt="JG Producciones" className="relative z-10 h-7 md:h-10 w-auto object-contain brightness-200 transition-all duration-500 hover:scale-110" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex p-1.5 items-center">
          <ul className="flex gap-1 m-0 p-0 list-none items-center">
            <NavLinks 
              isHome={isHome} 
              isNosotros={isNosotros} 
              activeSection={activeSection} 
              scrollToSection={scrollToSection} 
              setIsMenuOpen={setIsMenuOpen} 
              onContactClick={handleContactClick}
            />
          </ul>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden flex-1 justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full z-[1100]"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <div className="hidden md:flex flex-1" />
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[900] md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute inset-x-0 top-0 pt-32 pb-12 px-8 bg-gradient-to-b from-[#0a1f00]/40 to-black border-b border-white/10 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <ul className="flex flex-col gap-6 m-0 p-0 list-none items-center">
            <NavLinks 
              isHome={isHome} 
              isNosotros={isNosotros} 
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


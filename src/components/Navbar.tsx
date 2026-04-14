import { type FC, useState, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/brand/logo.webp';
import ContactModal from './ContactModal';

interface NavbarProps {
  activeSection?: string;
}

// Only the section links — no CTA button here
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

  const linkClass = (id: string) =>
    `px-4 py-2 text-sm font-semibold transition-all duration-300 font-remixa ${isActive(id) ? 'text-[#A3FF00]' : 'text-white'
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

    const updateScrollProgress = () => {
      // Cálculo ultra-robusto del scroll actual
      const scrollY = window.pageYOffset || 
                     window.scrollY || 
                     document.documentElement.scrollTop || 
                     document.body.scrollTop || 0;

      // Cálculo ultra-robusto de la altura total del documento
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      const windowHeight = window.innerHeight || 
                          document.documentElement.clientHeight || 
                          document.body.clientHeight;
      const totalHeight = scrollHeight - windowHeight;
      
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    
    // Forzamos actualizaciones después de que el contenido se cargue
    const timer = setInterval(updateScrollProgress, 1000); 
    updateScrollProgress();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
      clearInterval(timer);
    };
  }, [location.pathname]);

  // Stroke Progress Math (Aseguramos que sean números exactos)
  const radius = 28; // Reducimos un poco para dar margen al resplandor (glow)
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
  const scrolled = scrollProgress > 0.02;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-10 py-5 md:py-6 transition-all duration-500">

        {/* ── LEFT: Logo + progress ring + name ── */}
        <Link
          to="/"
          className="group flex items-center gap-3 w-auto flex-shrink-0"
          onClick={(e) => scrollToSection(e, 'hero')}
        >
          <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 64 64">
              {/* Círculo de fondo tenue */}
              <circle cx="32" cy="32" r={radius} className="fill-none stroke-white/5 stroke-[2.5]" />
              {/* Círculo de progreso con brillo verde neón intenso */}
              <circle
                cx="32" cy="32" r={radius}
                className="fill-none stroke-[#a3ff00] stroke-[3.5]"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ 
                  strokeLinecap: 'round',
                  filter: 'drop-shadow(0 0 5px rgba(163, 255, 0, 0.8))',
                  transition: 'none' // Respuesta instantánea al scroll
                }}
              />
            </svg>
            <img
              src={logo}
              alt="JG Producciones"
              className="relative z-10 h-[14px] w-auto object-contain brightness-200 transition-all duration-500"
            />
          </div>
          <span className="block text-white font-paloseco font-black text-[14px] uppercase tracking-[0.02em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-all duration-500 whitespace-nowrap translate-y-[1px]">
            Producciones
          </span>
        </Link>

        {/* ── CENTER: Navigation pill (desktop) ── */}
        <div
          className={`hidden md:flex items-center transition-all duration-700 px-6 py-3 ${scrolled
            ? 'bg-[#030d05]/55 backdrop-blur-2xl rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
            }`}
        >
          <ul className="flex gap-0.5 m-0 p-0 list-none items-center">
            <NavLinks
              isHome={isHome}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
            />
          </ul>
        </div>

        {/* ── RIGHT: CTA button (desktop) + mobile hamburger ── */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="hidden md:flex px-7 py-2.5 rounded-[12px] text-[13px] font-black bg-[#A3FF00] text-black transition-all duration-300 font-remixa items-center hover:-translate-y-0.5 hover:brightness-110 shadow-[0_8px_20px_rgba(163,255,0,0.2)]"
          >
            Contáctanos
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="flex md:hidden w-12 h-12 flex-col items-center justify-center gap-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full z-[1100]"
          >
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-[900] md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="absolute inset-0 bg-[#030d05]/90 backdrop-blur-2xl" onClick={() => setIsMenuOpen(false)} />
        <div
          className={`absolute inset-x-0 top-0 pt-28 pb-12 px-8 bg-gradient-to-b from-[#091800]/50 to-black border-b border-white/10 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <ul className="flex flex-col gap-8 m-0 p-0 list-none items-center">
            <NavLinks
              isHome={isHome}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
            />
            <li className="md:hidden w-full max-w-[200px] mt-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full py-3.5 rounded-[12px] text-sm font-black bg-[#A3FF00] text-black transition-all duration-300 font-remixa flex items-center justify-center shadow-[0_10px_30px_rgba(163,255,0,0.3)]"
              >
                Contáctanos
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default Navbar;

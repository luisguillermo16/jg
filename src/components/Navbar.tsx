import { type FC, useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Navbar: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stroke Progress Math
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - scrollProgress * circumference;

  const NavLinks = () => (
    <>
      <li><a href="#" onClick={() => setIsMenuOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-semibold text-text hover:text-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(184,227,81,0.6)] font-remixa">Home</a></li>
      <li><a href="#servicios" onClick={() => setIsMenuOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-semibold text-text hover:text-accent transition-all duration-300 font-remixa">Servicios</a></li>
      <li>
        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mx-2 px-8 py-2.5 rounded-full text-sm font-bold bg-accent text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(163,255,0,0.4)] font-remixa">
          Contactanos
        </a>
      </li>
      <li><a href="#galeria" onClick={() => setIsMenuOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-semibold text-text hover:text-accent transition-all duration-300 font-remixa">Galeria</a></li>
      <li><a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-semibold text-text hover:text-accent transition-all duration-300 font-remixa">Nosotros</a></li>
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-6 md:px-20 py-6 md:py-8 bg-transparent transition-all duration-300">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r={radius} className="fill-none stroke-white/10 stroke-[3]" />
              <circle cx="32" cy="32" r={radius} className="fill-none stroke-accent stroke-[3] transition-all duration-200 ease-out"
                style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset, strokeLinecap: 'round', filter: 'drop-shadow(0 0 8px rgba(163, 255, 0, 0.4))' }}
              />
            </svg>
            <img src={logo} alt="JG Producciones" className="relative z-10 h-7 md:h-10 w-auto object-contain brightness-200 transition-all duration-500 hover:scale-110" />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex bg-white/5 backdrop-blur-xl p-1.5 rounded-full border border-white/5 shadow-[0_0_15px_rgba(184,227,81,0.05)]">
          <ul className="flex gap-1 m-0 p-0 list-none items-center">
            <NavLinks />
          </ul>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden flex-1 justify-end">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <NavLinks />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

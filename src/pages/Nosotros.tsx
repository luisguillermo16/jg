import { type FC, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/home/FooterSection';
import './Home.css';

const Nosotros: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-black text-white selection:bg-accent selection:text-black min-h-screen">
      <Navbar />

      <main className="bg-black min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-32 md:pt-40">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#A3FF00]/5 blur-[150px] rounded-full pointer-events-none scale-150 opacity-40"></div>
        </div>

        <div className="relative z-10 text-center px-6 reveal-on-scroll active">
          <span className="text-[#A3FF00] font-black uppercase tracking-[1em] text-[10px] md:text-xs mb-12 block">
            Experiencia en Evolución
          </span>
          
          <h1 className="text-white text-4xl md:text-[6rem] font-black uppercase tracking-tighter leading-[0.8] mb-12 font-paloseco">
            NOSOTROS <br /> <span className="text-outline-blue">PRÓXIMAMENTE</span>
          </h1>
          
          <div className="h-0.5 w-24 bg-[#A3FF00] mx-auto mb-12 opacity-80"></div>
          
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto font-light tracking-tight font-sans italic">
            Estamos redefiniendo nuestro legado visual. <br className="hidden md:block" />
            Vuelve pronto para conocer al equipo detrás de la magia técnica.
          </p>

          <div className="mt-16 flex justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#A3FF00] animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-[#A3FF00] animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-[#A3FF00] animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Decorative Background Text */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/[0.02] text-[20vw] font-black font-paloseco select-none pointer-events-none whitespace-nowrap">
          JG PRODUCCIONES
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Nosotros;

import { type FC, useEffect } from 'react';
import Navbar from '../components/Navbar';
import galleryImg from '../assets/gallery/MRW01846.jpg';

const Nosotros: FC = () => {
  useEffect(() => {
    // Force view on top and prevent scroll for single-screen experience
    window.scrollTo(0, 0);
  }, []);


  const benefits = [
    {
      title: "Excelencia Técnica",
      desc: "Audio y video de última generación para una fidelidad absoluta.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "Soluciones Inmersivas",
      desc: "Iluminación robótica y efectos visuales de alto impacto.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      )
    },
    {
      title: "Compromiso Premium",
      desc: "Atención personalizada desde la pre-producción hasta el éxito total.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      title: "Innovación Constante",
      desc: "Adaptamos tendencias globales para ofrecer experiencias únicas.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative text-white selection:bg-accent selection:text-black h-screen overflow-hidden font-sans">
      <Navbar />

      {/* ── Background: Matching Categories (Predeterminado) ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div 
          className="absolute inset-0 opacity-70"
          style={{ 
            background: 'radial-gradient(ellipse 100% 100% at 50% 100%, #1a3d00 0%, #050e00 60%, transparent 100%)' 
          }}
        />
      </div>

      <main className="relative z-10 h-full flex items-center justify-center px-6 md:px-12 lg:px-20 pt-8 lg:pt-12">
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Columna Izquierda: Título y descripción */}
          <div className="lg:col-span-4 flex flex-col gap-3 md:gap-6">
            <div className="space-y-3">
              <span className="text-accent text-[9px] md:text-xs font-black tracking-[0.4em] uppercase block">
                — Filosofía —
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-none tracking-tighter text-white uppercase">
                Dominando <br /> <span>la Escena</span>
              </h1>
            </div>
            
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light max-w-[300px]">
              En JG Producciones, fusionamos tecnología y arte para crear hitos inolvidables en cada escenario.
            </p>
          </div>

          {/* Columna Central: Imagen (SIN EFECTOS) */}
          <div className="lg:col-span-4 flex items-start justify-center py-2">
            <div className="relative w-full aspect-[4/5] max-h-[55vh] md:max-h-[60vh] overflow-hidden">
              <img 
                src={galleryImg} 
                alt="Event JG Producciones" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Columna Derecha: Beneficios en Cards Transparentes (Glassmorphism) */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-5">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="relative p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
              >
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent shadow-inner">
                    <div className="scale-90">{benefit.icon}</div>
                  </div>
                  <div className="flex flex-col justify-center gap-0.5">
                    <h3 className="text-sm md:text-base font-bold text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-white/40 text-[10px] md:text-xs leading-tight max-w-[240px]">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>




        </div>
      </main>
    </div>
  );
};

export default Nosotros;

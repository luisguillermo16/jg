import { useEffect } from 'react';

/**
 * useRevealOnScroll - Versión Ultra-Segura
 * Combina IntersectionObserver con un listener síncrono y rAF.
 * Incluye lógica para activar automáticamente elementos que el usuario ya pasó ("Above the fold").
 */
export const useRevealOnScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (elements.length === 0) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let ticking = false;

    const activateVisible = () => {
      if (ticking) return;
      
      requestAnimationFrame(() => {
        // En lugar de leer rect en cada loop, usamos IntersectionObserver para la mayoría de casos.
        // Solo mantenemos esto como fallback manual ultra-optimizado.
        elements.forEach(el => {
          if (el.classList.contains('active')) return;
          
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.95) {
            el.classList.add('active');
          }
        });
        ticking = false;
      });
      
      ticking = true;
    };

    // 1. Ejecución inmediata al montar
    activateVisible();

    // 2. Observer (Eficiencia para triggers estándar)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px 50px 0px' } // Cargamos un poco antes
    );

    elements.forEach((el) => {
      if (!el.classList.contains('active')) {
        observer.observe(el);
      }
    });

    // 3. Ya no necesitamos el listener de scroll constante en PC si el observer es sólido
    window.addEventListener('resize', activateVisible, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', activateVisible);
    };
  }, []);
};

export default useRevealOnScroll;

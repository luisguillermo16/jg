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

    let ticking = false;

    const activateVisible = () => {
      if (ticking) return;
      
      requestAnimationFrame(() => {
        elements.forEach(el => {
          if (el.classList.contains('active')) return;
          
          const rect = el.getBoundingClientRect();
          
          // ✅ Lógica agresiva: activar si ya pasó el viewport O si está al 90% de entrar
          const isPassedOrVisible = rect.bottom < window.innerHeight || rect.top < window.innerHeight * 0.95;
          
          if (isPassedOrVisible) {
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
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('active')) {
        observer.observe(el);
      }
    });

    // 3. Listener síncrono para scroll rápido y resize
    window.addEventListener('scroll', activateVisible, { passive: true });
    window.addEventListener('resize', activateVisible, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', activateVisible);
      window.removeEventListener('resize', activateVisible);
    };
  }, []);
};

export default useRevealOnScroll;

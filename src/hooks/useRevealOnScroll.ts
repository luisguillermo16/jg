import { useEffect } from 'react';

/**
 * useRevealOnScroll
 * Observa elementos con la clase .reveal-on-scroll y les añade la clase .active
 * cuando entran en el viewport. Optimizado para carga inicial y móvil.
 */
export const useRevealOnScroll = (defaultThreshold: number = 0.15) => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const elements = document.querySelectorAll('.reveal-on-scroll');
    
    // Solo usamos IntersectionObserver si hay elementos que observar
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isMobile ? 0 : defaultThreshold,
        rootMargin: isMobile ? '0px' : '0px 0px -50px 0px',
      }
    );

    elements.forEach((el) => {
      // ✅ CLAVE: Si el elemento ya está visible al montar, actívalo inmediatamente
      // Esto evita que el contenido se quede invisible si el usuario scrolleó rápido o ya estaba ahí.
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (alreadyVisible) {
        el.classList.add('active');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [defaultThreshold]);
};

export default useRevealOnScroll;

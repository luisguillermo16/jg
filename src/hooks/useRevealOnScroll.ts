import { useEffect } from 'react';

/**
 * useRevealOnScroll - Versión Ultra-Optimizada
 * Combina IntersectionObserver (asíncrono/perf) con un scroll listener (síncrono/seguridad)
 * y requestAnimationFrame para asegurar que NADA se quede sin aparecer durante un scroll rápido.
 */
export const useRevealOnScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (elements.length === 0) return;

    let ticking = false;

    // Función principal de activación sincronizada con el refresco de pantalla
    const activateVisible = () => {
      if (ticking) return;
      
      requestAnimationFrame(() => {
        elements.forEach(el => {
          // Si ya está activo, no gastar CPU en calcular rect
          if (el.classList.contains('active')) return;
          
          const rect = el.getBoundingClientRect();
          // Condición de visibilidad: está entre el tope y el fondo del viewport
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            el.classList.add('active');
          }
        });
        ticking = false;
      });
      
      ticking = true;
    };

    // 1. Activar los que ya están visibles al montar (sin espera)
    activateVisible();

    // 2. Observer para el comportamiento estándar (más eficiente para triggers lejanos)
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

    // 3. Scroll Listener de seguridad para "atrapas los fallos" del observer en scroll rápido
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

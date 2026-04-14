import { useEffect } from 'react';

/**
 * useRevealOnScroll
 * Observa elementos con la clase .reveal-on-scroll y les añade la clase .active
 * cuando entran en el viewport.
 */
export const useRevealOnScroll = (threshold: number = 0.15) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Dejar de observar una vez activado (animación de un solo sentido)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Un pequeño margen para que se active justo antes de entrar
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [threshold]);
};

export default useRevealOnScroll;

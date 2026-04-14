import { useState, useEffect } from 'react';

/**
 * useScrollSpy
 * @param sectionIds - Lista de IDs de secciones a observar.
 * @param offset - Margen superior para activar la sección (porcentaje o px).
 * @returns El ID de la sección activa.
 */
export const useScrollSpy = (sectionIds: string[], offset: string = '-25% 0px -70% 0px') => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: offset,
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeSection;
};

export default useScrollSpy;

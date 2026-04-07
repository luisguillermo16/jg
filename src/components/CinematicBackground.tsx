import { type FC } from 'react';

/**
 * CinematicBackground Component
 * Gradiente radial puro en CSS para replicar la profundidad de 'secciones.webp'.
 */
const CinematicBackground: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div 
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        /* 
           Gradiente radial: 
           - Centro: Un gris azulado profundo (#1a1e24) para el "glow"
           - Intermedio: Transición al negro (#0a0c0e)
           - Exterior: Negro total (#050607)
        */
        background: `radial-gradient(circle at 50% 50%, #1a1e24 0%, #0a0c0e 45%, #050607 100%)`
      }}
    >
      {/* Capa de textura sutil para romper la uniformidad del color (opcional) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-dark.png')` 
        }} 
      />
    </div>
  );
};

export default CinematicBackground;

import { type FC } from 'react';
import './ServicesSection.css';
import { openContactModal } from '../../utils/modal';
import CinematicGlow from '../CinematicGlow';
import CinematicBackground from '../CinematicBackground';

interface Service {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

interface ServicesSectionProps {
  services: Service[];
  progress: number;
}

const ServicesSection: FC<ServicesSectionProps> = ({ services, progress }) => {
  const activeIndex = Math.min(6, Math.floor(progress * 6.99));
  const isIntroActive = activeIndex === 0;

  // ── Lógica de Fluidez con Overlap ──
  // LERP en Home.tsx maneja la inercia, aquí definimos la estética
  const introExitStart = 0.02;
  const introExitEnd = 0.16; 
  const rawExitNorm = Math.min(1, Math.max(0, (progress - introExitStart) / (introExitEnd - introExitStart)));
  
  // Curva de Fluidez Sedosa
  const introExitNorm = Math.pow(rawExitNorm, 1.2);

  // Revelado del primer servicio (Overlap Fluido)
  const svc1RevealStart = 0.05;
  const svc1RevealEnd = 0.18;
  const rawSvc1Norm = Math.min(1, Math.max(0, (progress - svc1RevealStart) / (svc1RevealEnd - svc1RevealStart)));
  const svc1RevealNorm = Math.pow(rawSvc1Norm, 1.0);

  // Estilos de salida para la intro de servicios
  const introContentStyles = {
    opacity: 1 - Math.pow(introExitNorm, 1.8),
    transform: `translate(-50%, -50%) scale(${1 - introExitNorm * 0.35})`,
    filter: `blur(${introExitNorm * 12}px)`,
    transition: 'none',
    willChange: 'transform, opacity, filter',
  };

  return (
    <section id="servicios" className="svc-section">
      {/* Snap Markers for 7 pages */}
      <div className="svc-snap-markers">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="svc-snap-stop" />
        ))}
      </div>

      <div className="svc-sticky">
        {/* Layer base permanente — nunca negro durante crossfade */}
        <div className="svc-base-bg" aria-hidden="true" />

        {/* ════ INTRO SLIDE (Index 0) ════ */}
        <div
          className="svc-slide"
          style={{
            opacity: progress < introExitEnd ? 1 : 0,
            zIndex: progress < introExitEnd ? 10 : 1,
            pointerEvents: isIntroActive ? 'auto' : 'none',
            transition: (progress > 0 && progress < introExitEnd) ? 'none' : 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              opacity: 1 - introExitNorm * 0.5,
              transform: `scale(${1 + introExitNorm * 0.15})`,
              transition: 'none',
            }}
          >
            <CinematicBackground />
            <CinematicGlow />
          </div>

          <div
            className="svc-intro-content relative z-10"
            style={introContentStyles}
          >
            <h2 className={`svc-intro-title svc-intro-animate${isIntroActive ? ' is-visible' : ''}`}>
              Nuestros <br />
              Servicios
            </h2>

            <p className={`svc-intro-desc svc-intro-animate-desc${isIntroActive ? ' is-visible' : ''}`}>
              Soluciones integrales de producción AV con los más altos estándares de la industria cinematográfica.
            </p>
          </div>
        </div>

        {/* ════ SERVICE SLIDES (Index 1 to 6) ════ */}
        {services.map((svc, idx) => {
          const slideIdx = idx + 1;
          const isSlide1 = idx === 0;
          const isActive = activeIndex === slideIdx;

          return (
            <div
              key={idx}
              className="svc-slide"
              style={{
                opacity: isSlide1
                  ? (progress < 0.15 ? svc1RevealNorm : (isActive ? 1 : 0))
                  : (isActive ? 1 : 0),
                zIndex: isActive ? 10 : (isSlide1 && progress < 0.2 ? 5 : 1),
                pointerEvents: isActive ? 'auto' : 'none',
                transition: isActive ? 'none' : (isSlide1 && progress < 0.2 ? 'none' : 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'),
              }}
            >
              <div className="svc-bg-wrapper">
                <img
                  src={svc.image}
                  alt=""
                  className="svc-bg-image"
                  loading="eager"
                  decoding="async"
                />
                <div className="svc-bg-overlay" />
                <div className="svc-bg-gradient" />
              </div>

              <div className="svc-content">
                {/* Title */}
                <h3
                  className="svc-title font-paloseco svc-reveal"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: isActive ? '0.4s' : '0s',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {svc.title}
                </h3>

                {/* Description */}
                <p
                  className="svc-desc svc-reveal"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(22px)',
                    transitionDelay: isActive ? '0.65s' : '0s',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {svc.desc}
                </p>

                {/* CTA */}
                <div
                  className="svc-cta svc-reveal"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(18px)',
                    transitionDelay: isActive ? '0.9s' : '0s',
                    willChange: isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  <button onClick={openContactModal} className="svc-btn font-paloseco">
                    <span>Cotizar Ahora</span>
                    <div className="svc-btn-shine" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Vertical Progress Dots (Visible only on desktop) */}
        <div className="svc-progress-bar">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`svc-pip ${activeIndex === i ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

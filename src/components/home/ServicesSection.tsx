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
  // 7 screens (Intro + 6 services) over 700vh.
  const activeIndex = Math.min(6, Math.floor(progress * 6.99));

  // La animación ahora depende de activeIndex para sincronizarse con el scroll
  // Se activa cuando el usuario llega al slide de introducción (index 0)
  const isIntroActive = activeIndex === 0;

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
            opacity: isIntroActive ? 1 : 0,
            zIndex: isIntroActive ? 10 : 1,
            pointerEvents: isIntroActive ? 'auto' : 'none',
            // Incoming: sin transición (aparece al instante, nunca hay negro)
            // Outgoing: fade suave
            transition: isIntroActive ? 'none' : 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <CinematicBackground />
          <CinematicGlow />


          <div className="svc-intro-content relative z-10">
            {/* Animación de scroll: .is-visible se activa cuando el slide 0 es el activo */}
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
          const isActive = activeIndex === slideIdx;

          return (
            <div
              key={idx}
              className="svc-slide"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 10 : 1,
                // Incoming: sin transición (aparece al instante)
                // Outgoing: fade suave — nunca hay frame de negro puro
                transition: isActive ? 'none' : 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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

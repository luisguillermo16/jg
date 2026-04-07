import { type FC } from 'react';
import './ServicesSection.css';
import { openContactModal } from '../../utils/modal';
import CinematicGlow from '../CinematicGlow';

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

  return (
    <section id="servicios" className="svc-section">
      {/* Snap Markers for 7 pages */}
      <div className="svc-snap-markers">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="svc-snap-stop" />
        ))}
      </div>

      <div className="svc-sticky">
        {/* ════ INTRO SLIDE (Index 0) ════ */}
        <div
          className="svc-slide"
          style={{
            opacity: activeIndex === 0 ? 1 : 0,
            zIndex: activeIndex === 0 ? 10 : 1,
            pointerEvents: activeIndex === 0 ? 'auto' : 'none'
          }}
        >
          <CinematicGlow />

          <div className="svc-intro-content">
            {/* Pure CSS transition — runs on GPU compositor, not JS thread */}
            <h2
              className="svc-intro-title font-paloseco"
              style={{
                opacity: activeIndex === 0 ? 1 : 0,
                transform: activeIndex === 0 ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'opacity, transform',
              }}
            >
              NUESTROS SERVICIOS
            </h2>

            <p
              className="svc-intro-desc text-white/60 mb-12"
              style={{
                opacity: activeIndex === 0 ? 1 : 0,
                transform: activeIndex === 0 ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                willChange: 'opacity, transform',
              }}
            >
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
                zIndex: isActive ? 10 : 1
              }}
            >
              <div className="svc-bg-wrapper">
                <img src={svc.image} alt="" className="svc-bg-image" />
                <div className="svc-bg-overlay" />
                <div className="svc-bg-gradient" />
              </div>

             

              <div className="svc-content">
                {/* Title */}
                <h3
                  className="svc-title font-paloseco svc-reveal"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(36px)',
                    transitionDelay: isActive ? '0.5s' : '0s'
                  }}
                >
                  {svc.title}
                </h3>

                {/* Description */}
                <p
                  className="svc-desc svc-reveal"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(24px)',
                    transitionDelay: isActive ? '0.8s' : '0s'
                  }}
                >
                  {svc.desc}
                </p>

                {/* CTA */}
                <div
                  className="svc-cta svc-reveal"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: isActive ? '1.1s' : '0s'
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


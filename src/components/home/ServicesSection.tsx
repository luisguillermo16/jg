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

// ─────────────────────────────────────────────────────────────────────────────
// Mapea un valor de un rango a otro, clampeado. Equivalente a useTransform.
// ─────────────────────────────────────────────────────────────────────────────
const mapRange = (val: number, in0: number, in1: number, out0: number, out1: number): number => {
  const t = Math.max(0, Math.min(1, (val - in0) / (in1 - in0)));
  return out0 + t * (out1 - out0);
};

// ─────────────────────────────────────────────────────────────────────────────
// Ghost Layer Opacity — Técnica de Capas Fantasma para ServicesSection
//
//  7 slides (progress 0→1, cada slot = 1/7 ≈ 0.1429):
//    Slot 0 (Intro): [0.000 → 0.143]
//    Slot 1–6 (Servicios): [0.143 → 1.00]
//
//  OVERLAP = 0.014 (10% del slot de 0.143)
// ─────────────────────────────────────────────────────────────────────────────
const SVC_SLOTS = 7;
const SVC_SLOT  = 1 / SVC_SLOTS;           // ≈ 0.1429
const SVC_OVR   = SVC_SLOT * 0.1;          // 10% de overlap

const getSvcLayerOpacity = (progress: number, slotIndex: number): number => {
  const slotStart = slotIndex * SVC_SLOT;
  const slotEnd   = slotStart + SVC_SLOT;

  const fadeIn  = mapRange(progress, slotStart - SVC_OVR, slotStart + SVC_OVR, 0, 1);
  const fadeOut = mapRange(progress, slotEnd   - SVC_OVR, slotEnd   + SVC_OVR, 1, 0);

  return Math.min(fadeIn, fadeOut);
};

// Intro: fade-out puro al inicio del primer scroll
const getSvcIntroOpacity = (progress: number): number =>
  mapRange(progress, SVC_SLOT - SVC_OVR, SVC_SLOT + SVC_OVR, 1, 0);

const ServicesSection: FC<ServicesSectionProps> = ({ services, progress }) => {
  // ── Slide activo para animaciones de TEXTO (hard-snap) ──
  const activeIndex   = Math.min(6, Math.floor(progress * 6.99)); // 0=intro, 1-6=servicios
  const isIntroActive = activeIndex === 0;

  // ── Zoom-out cinemático de la intro ──
  const introZoomNorm  = mapRange(progress, SVC_SLOT - SVC_OVR, SVC_SLOT + SVC_OVR, 0, 1);
  const introOpacity   = getSvcIntroOpacity(progress);
  const introContentStyles = {
    opacity:    Math.max(0, 1 - Math.pow(introZoomNorm, 1.8)),
    transform:  `translate(-50%, -50%) scale(${1 - introZoomNorm * 0.35})`,
    filter:     `blur(${introZoomNorm * 12}px)`,
    transition: 'none',
    willChange: 'transform, opacity, filter',
  };

  return (
    <section id="servicios" className="svc-section">
      {/* ── Snap Markers — 7 × 100dvh ── */}
      <div className="svc-snap-markers">
        {[...Array(SVC_SLOTS)].map((_, i) => (
          <div key={i} className="svc-snap-stop" />
        ))}
      </div>

      <div className="svc-sticky">
        {/* Capa base permanente — evita negro puro durante crossfades */}
        <div className="svc-base-bg" aria-hidden="true" />

        {/* ══════════════════════════════════════════════════════════
            CAPA 0 — Intro: CinematicBackground + bienvenida
            ══════════════════════════════════════════════════════════ */}
        <div
          className="svc-slide"
          style={{
            opacity:       introOpacity,
            zIndex:        10,
            pointerEvents: isIntroActive ? 'auto' : 'none',
            transition:    'none',
          }}
        >
          <div
            style={{
              width: '100%', height: '100%',
              opacity:    Math.max(0, 1 - introZoomNorm * 0.6),
              transform:  `scale(${1 + introZoomNorm * 0.15})`,
              transition: 'none',
            }}
          >
            <CinematicBackground />
            <CinematicGlow />
          </div>

          <div className="svc-intro-content relative z-10" style={introContentStyles}>
            <h2 className={`svc-intro-title svc-intro-animate${isIntroActive ? ' is-visible' : ''}`}>
              Nuestros <br />
              Servicios
            </h2>
            <p className={`svc-intro-desc svc-intro-animate-desc${isIntroActive ? ' is-visible' : ''}`}>
              Soluciones integrales de producción AV con los más altos estándares de la industria cinematográfica.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            CAPAS 1–6 — Servicios: Ghost Layer crossfade premium
            Cadea imagen tiene opacity interpolada con 10% de overlap.
            ══════════════════════════════════════════════════════════ */}
        {services.map((svc, idx) => {
          const slotIdx      = idx + 1;                          // slots 1-6
          const layerOpacity = getSvcLayerOpacity(progress, slotIdx);
          const isActive     = activeIndex === slotIdx;          // para texto

          return (
            <div
              key={idx}
              className="svc-slide"
              style={{
                opacity:       layerOpacity,
                zIndex:        slotIdx,     // capas apiladas 1-6
                pointerEvents: isActive ? 'auto' : 'none',
                transition:    'none',      // 100% scroll-driven
                willChange:    'opacity',
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
                <h3
                  className="svc-title font-paloseco svc-reveal"
                  style={{
                    opacity:         isActive ? 1 : 0,
                    transform:       isActive ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: isActive ? '0.4s' : '0s',
                    willChange:      isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {svc.title}
                </h3>

                <p
                  className="svc-desc svc-reveal"
                  style={{
                    opacity:         isActive ? 1 : 0,
                    transform:       isActive ? 'translateY(0)' : 'translateY(22px)',
                    transitionDelay: isActive ? '0.65s' : '0s',
                    willChange:      isActive ? 'opacity, transform' : 'auto',
                  }}
                >
                  {svc.desc}
                </p>

                <div
                  className="svc-cta svc-reveal"
                  style={{
                    opacity:         isActive ? 1 : 0,
                    transform:       isActive ? 'translateY(0)' : 'translateY(18px)',
                    transitionDelay: isActive ? '0.9s' : '0s',
                    willChange:      isActive ? 'opacity, transform' : 'auto',
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

        {/* Dots de progreso vertical */}
        <div className="svc-progress-bar">
          {[...Array(SVC_SLOTS)].map((_, i) => (
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

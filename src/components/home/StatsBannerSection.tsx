import { type FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  value: string;
  label: string;
}

/** Animated counter that triggers when the element enters the scroll container's viewport */
const StatItem: FC<StatItemProps> = ({ value, label }) => {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Extract numeric and suffix parts  →  "500+" → numeric=500, suffix="+"
    const numericStr = value.replace(/[^0-9]/g, '');
    const numeric = parseInt(numericStr, 10);
    const suffix = value.replace(/[0-9]/g, ''); // "+", "%", empty, …

    const animate = () => {
      if (started.current) return;
      started.current = true;

      const duration = 1800;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        setDisplayed(`${Math.floor(eased * numeric)}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplayed(value); // ensure exact final value
      };

      requestAnimationFrame(tick);
    };

    // Use the custom scroll container as the IntersectionObserver root
    const scrollContainer = document.querySelector('.home-container') as Element | null;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) animate(); },
      { root: scrollContainer, threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="text-5xl md:text-6xl lg:text-7xl font-black text-[#A3FF00] leading-none tracking-tight tabular-nums" style={{ fontFamily: "'Inter', sans-serif" }}>
        {displayed}
      </span>
      <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-semibold mt-3 leading-snug max-w-[110px]">
        {label}
      </span>
    </div>
  );
};

const STATS = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '500+', label: 'Eventos realizados' },
  { value: '3', label: 'Ciudades activas' },
  { value: '100%', label: 'Satisfacción garantizada' },
];

const StatsBannerSection: FC = () => (
  <section className="relative bg-black min-h-screen md:min-h-[auto] py-12 md:py-24 px-6 overflow-hidden flex flex-col justify-center snap-start" style={{ scrollSnapStop: 'always' }}>
    {/* Top + bottom accent lines */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A3FF00]/40 to-transparent" />
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A3FF00]/40 to-transparent" />

    {/* Subtle radial wash */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(163,255,0,0.04),transparent)] pointer-events-none" />

    <motion.div 
      className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {STATS.map(({ value, label }) => (
        <StatItem key={label} value={value} label={label} />
      ))}
    </motion.div>
  </section>
);

export default StatsBannerSection;

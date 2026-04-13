import React, { useRef, useEffect, useState } from 'react';

interface VolumeVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  isVisible: boolean;
  isMuted: boolean;
  fadeDuration?: number;
}

const VolumeVideo: React.FC<VolumeVideoProps> = ({
  isVisible,
  isMuted,
  fadeDuration = 800,
  preload: preloadProp,
  poster,
  ...props
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── 1. Intersection Observer para carga bajo demanda ─────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // Cargamos con un margen generoso
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ── 2. Lógica de reproducción y volumen ──────────────────────────
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    if (!isVisible) {
      video.volume = 0;
      video.muted = true;
      video.pause();
      return;
    }

    const playVideo = async () => {
      try {
        if (isMuted) {
          video.muted = true;
          video.volume = 0;
        } else {
          video.muted = false;
          video.volume = 0;
        }

        if (video.paused) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
             await playPromise;
          }
        }
        
        if (!isMuted) {
          let start: number | null = null;
          const targetVolume = 1;
          const initialVolume = video.volume;
          
          const animate = (time: number) => {
            if (!start) start = time;
            const elapsed = time - start;
            const progress = Math.min(1, elapsed / fadeDuration);
            
            video.volume = initialVolume + (targetVolume - initialVolume) * progress;
            
            if (progress < 1 && !video.muted && isVisible) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      } catch (err) {
        // Ignoramos errores de autoplay bloqueados por el browser
      }
    };

    playVideo();
  }, [isVisible, isMuted, fadeDuration, shouldLoad]);

  return (
    <div ref={containerRef} className="video-lazy-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!shouldLoad && poster && (
        <img 
          src={poster} 
          alt="Preview" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {shouldLoad && (
        <video
          ref={videoRef}
          {...props}
          poster={poster}
          muted={isMuted}
          preload={preloadProp || 'auto'}
          className={`${props.className || ''} ${!isVisible ? 'pointer-events-none' : ''}`}
        />
      )}
    </div>
  );
};

export default VolumeVideo;

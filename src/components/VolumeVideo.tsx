import React, { useRef, useEffect } from 'react';

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
  ...props
}) => {
  const preload = preloadProp ?? (isVisible ? 'auto' : 'none');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isVisible) {
      // Silenciamos INSTANTÁNEAMENTE para evitar mezcla de audio
      video.volume = 0;
      video.muted = true;
      video.pause();
      return;
    }

    const playVideo = async () => {
      try {
        // Configuramos volumen inicial al entrar
        if (isMuted) {
          video.muted = true;
          video.volume = 0;
        } else {
          video.muted = false;
          // Subida rápida de volumen para mayor nitidez sonora
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
        console.warn("Video playback issue:", err);
      }
    };

    playVideo();
  }, [isVisible, isMuted, fadeDuration]);

  return (
    <video
      ref={videoRef}
      {...props}
      muted={isMuted}
      preload={preload}
      onCanPlayThrough={props.onCanPlayThrough}
    />
  );
};

export default VolumeVideo;

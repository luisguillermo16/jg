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
  ...props 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted || !isVisible) {
      video.muted = true;
      // Fade volume out before fully muting for smoothness
      video.volume = 0;
      return;
    }

    // Attempt to play if not already playing (browsers may pause hidden videos)
    const playVideo = async () => {
      try {
        if (video.paused) await video.play();
        video.muted = false;
        
        // Smooth volume transition
        let start: number | null = null;
        const initialVolume = video.volume;
        const targetVolume = 1;
        
        if (initialVolume === targetVolume) return;

        let animationFrameId: number;
        const animate = (time: number) => {
          if (!start) start = time;
          const progress = (time - start) / fadeDuration;
          
          if (progress < 1) {
            video.volume = initialVolume + (targetVolume - initialVolume) * progress;
            animationFrameId = requestAnimationFrame(animate);
          } else {
            video.volume = targetVolume;
          }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
      } catch (err) {
        console.warn("Video play interrupted or blocked:", err);
        video.muted = true; // Fallback to muted if play fails
      }
    };

    playVideo();
  }, [isVisible, isMuted, fadeDuration]);

  return <video ref={videoRef} {...props} />;
};

export default VolumeVideo;

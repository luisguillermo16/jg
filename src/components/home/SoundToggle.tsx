import { type FC } from 'react';

interface SoundToggleProps {
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  isVisible: boolean;
}

const SoundToggle: FC<SoundToggleProps> = ({ isMuted, setIsMuted, isVisible }) => {
  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      title={isMuted ? "Activar sonido" : "Silenciar"}
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-700 group shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${!isMuted ? 'shadow-accent/20' : ''} ${isVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}`}
    >
      {!isMuted && (
        <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping opacity-60" />
      )}

      <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className={`relative z-10 text-white transition-all duration-500 ${isMuted ? 'scale-90' : 'scale-105'}`}>
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100">
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent drop-shadow-[0_0_8px_rgba(163,255,0,0.4)]">
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        )}
      </div>
    </button>
  );
};

export default SoundToggle;

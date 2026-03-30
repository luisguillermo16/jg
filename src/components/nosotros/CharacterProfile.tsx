import React from 'react';
import './CharacterProfile.css';

interface ProfileProps {
  name?: string;
  role?: string;
  imageSrc?: string;
  intelligence?: string;
  unpredictability?: string;
  powerDescription?: string;
  navActive?: number;
  eyeX?: string; // Percent positions for the glow
  eyeY?: string;
  eyeGap?: string; // Distance between eyes
}

const CharacterProfile: React.FC<ProfileProps> = ({
  name = "MANAGER",
  role = "JG Producciones",
  imageSrc = "/src/assets/nosotros/ceo.png",
  powerDescription = "Liderazgo técnico y dirección creativa en la ejecución de eventos de alto impacto. Especialista en arquitectura de sonido e iluminación inmersiva.",
  navActive = 1,
}) => {
  return (
    <div className="profile-container w-full h-screen flex items-center justify-center relative overflow-hidden bg-black font-paloseco">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 right-0 h-full bg-[#A3FF00]/5 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 ${imageSrc ? 'w-[50%]' : 'w-full scale-150 opacity-20'}`}></div>
      </div>

      <div className={`relative z-10 w-full max-w-[1400px] h-full flex flex-col md:flex-row items-center px-10 md:px-20 ${imageSrc ? 'justify-between' : 'justify-center text-center'}`}>
        
        {/* Left Side: Typography & Info */}
        <div className={`flex flex-col justify-center py-20 order-2 md:order-1 ${imageSrc ? 'w-full md:w-1/2' : 'w-full max-w-4xl text-center items-center'}`}>
          <div className="reveal-on-scroll active">
            <span className="text-[#A3FF00] font-bold uppercase tracking-[0.6em] text-xs mb-6 block">
              {role}
            </span>
            <h1 className={`text-white font-black uppercase tracking-tighter leading-[0.85] m-0 mb-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${imageSrc ? 'text-7xl md:text-[8rem]' : 'text-7xl md:text-[12rem]'}`}>
              {name}
            </h1>
            <div className={`h-0.5 w-20 bg-[#A3FF00] mb-10 opacity-60 ${imageSrc ? '' : 'mx-auto'}`}></div>
            <p className={`text-white/50 text-xl md:text-2xl leading-relaxed font-light tracking-tight font-sans ${imageSrc ? 'max-w-lg' : 'max-w-3xl'}`}>
              {powerDescription}
            </p>
          </div>
        </div>

        {/* Right Side: Image with subtle neon rim */}
        {imageSrc && (
          <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-full h-[90%] md:h-[80%] rounded-[40px] overflow-hidden group">
              {/* Subtle Neon Boundary */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-[#A3FF00]/20 transition-colors duration-700 z-20 pointer-events-none rounded-[40px]"></div>
              
              <img
                src={imageSrc}
                alt={name}
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              
              {/* Bottom Gradient overlay for blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Dot Indicator - Clean version */}
      <div className="absolute right-[4%] bottom-[10%] md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col gap-6 z-30">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${navActive === num ? 'bg-[#A3FF00] scale-150 shadow-[0_0_10px_#A3FF00]' : 'bg-white/20'}`}></div>
          </div>
        ))}
      </div>

      {/* Scroll Text */}
      <div className="absolute bottom-[5%] left-10 md:left-20 flex items-center gap-4 opacity-30">
        <div className="w-8 h-px bg-white"></div>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll Down</span>
      </div>
    </div>
  );
};

export default CharacterProfile;

import { type FC } from 'react';
import { motion } from 'framer-motion';
import './CharacterProfile.css';

interface ProfileProps {
  name: string;
  role: string;
  imageSrc: string;
  description: string;
  index: number;
}

const CharacterProfile: FC<ProfileProps> = ({
  name,
  role,
  imageSrc,
  description,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6 md:px-12 lg:px-24 bg-black/40 backdrop-blur-sm`}>
      {/* Dynamic Background Aura */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className={`absolute ${isEven ? 'top-[-20%] right-[-10%]' : 'bottom-[-20%] left-[-10%]'} w-[60%] h-[60%] bg-[#A3FF00]/10 rounded-full blur-[140px] opacity-40`}
        />
      </div>

      <div className={`relative z-10 w-full max-w-[1400px] flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        
        {/* Profile Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 aspect-[4/5] relative rounded-[2rem] overflow-hidden group"
        >
          {/* Subtle Rim Light */}
          <div className="absolute inset-0 group-hover:border-[#A3FF00]/30 transition-colors duration-1000 z-20 pointer-events-none rounded-[2rem]" />
          
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-105 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          
          {/* Blend Gradients */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
        </motion.div>

        {/* Content Container */}
        <div className="w-full md:w-7/12 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="text-[#A3FF00] font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-4 block opacity-80">
              {role}
            </span>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8 font-paloseco text-white">
              {name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>

            <div className="h-0.5 w-16 bg-[#A3FF00] mb-8 opacity-60" />

            <p className="text-white/50 text-base md:text-xl lg:text-2xl leading-relaxed font-light tracking-tight font-sans max-w-xl">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative Index Number */}
      <div className={`absolute ${isEven ? 'left-6 bottom-6' : 'right-6 bottom-6'} hidden lg:block opacity-5 font-black text-white text-9xl pointer-events-none`}>
        0{index + 1}
      </div>
    </section>
  );
};

export default CharacterProfile;

import React from 'react';

const SectionSkeleton: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[#050607] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Shimmer background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        
        <div className="flex flex-col items-center gap-8 px-6">
          {/* Title skeleton */}
          <div className="h-16 w-64 md:h-24 md:w-[400px] bg-white/5 rounded-2xl" />
          
          {/* Subtitle skeleton */}
          <div className="h-4 w-48 md:w-80 bg-white/5 rounded-lg" />
          
          {/* CTA skeleton */}
          <div className="h-12 w-40 bg-white/10 rounded-full mt-4" />
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default SectionSkeleton;

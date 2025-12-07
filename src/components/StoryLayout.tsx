'use client';

import React, { ReactNode } from 'react';
import { Audience } from '@/lib/types';

interface StoryLayoutProps {
  children: ReactNode;
  gradient: string;
  progress: number; // 0 to 100
  onNext: () => void;
  onPrev: () => void;
  backgroundImage?: string;
  audience?: Audience;
}

export const StoryLayout: React.FC<StoryLayoutProps> = ({
  children,
  gradient,
  progress,
  onNext,
  onPrev,
  backgroundImage,
  audience
}) => {
  return (
    // App.tsx handles the centering and layout. This is the "Phone" container.
    <div className={`relative w-[100vw] h-[100vh] md:h-[850px] md:w-[480px] md:rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col transition-colors duration-1000 ease-in-out ${gradient}`}>

        {/* Background Image Layer (Ken Burns Effect) */}
        {backgroundImage && (
            <>
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center animate-ken-burns opacity-40"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            </>
        )}

        {/* Film Grain Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.07] pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
        </div>

        {/* Progress Bar Container */}
        <div className="absolute top-0 left-0 right-0 z-30 p-3 pt-4 flex gap-1">
          <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden backdrop-blur-sm">
             <div
               className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100 ease-linear"
               style={{ width: `${progress}%` }}
             />
          </div>
        </div>

        {/* Brand Header - Hidden for HostAI */}
        {audience !== 'HOSTAI' && (
            <div className="absolute top-8 left-0 right-0 z-30 flex justify-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-xl">
                    <h1 className="text-white font-serif font-bold text-lg tracking-tight">sojourn</h1>
                </div>
            </div>
        )}

        {/* Navigation Touch Zones */}
        <div className="absolute inset-0 z-20 flex">
            <div className="w-1/3 h-full cursor-w-resize" onClick={onPrev}></div>
            <div className="w-2/3 h-full cursor-e-resize" onClick={onNext}></div>
        </div>

        {/* Content */}
        <div className="relative z-0 h-full w-full flex flex-col pointer-events-none">
          {children}
        </div>

        {/* Footer Brand - Glassy & Elevated */}
        <div className="absolute bottom-10 w-full z-20 flex justify-center pointer-events-none">
            <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                <span className="text-[9px] font-sans uppercase tracking-[0.15em] text-white/50 font-medium translate-y-[0.5px]">
                   Powered by
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://gethostai.com/images/hostai-logo-light.svg" alt="HostAI" className="h-3 w-auto opacity-90" />
            </div>
        </div>
      </div>
  );
};

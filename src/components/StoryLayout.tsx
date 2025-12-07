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
  hostName?: string;
  accentColor?: string; // CSS color for extending lines (e.g., 'rgba(147, 51, 234, 0.3)')
  isPaused?: boolean;
  onTogglePause?: () => void;
}

export const StoryLayout: React.FC<StoryLayoutProps> = ({
  children,
  gradient,
  progress,
  onNext,
  onPrev,
  backgroundImage,
  audience,
  hostName = 'horizon',
  accentColor = 'rgba(255, 255, 255, 0.2)',
  isPaused = false,
  onTogglePause
}) => {
  return (
    // App.tsx handles the centering and layout. This is the "Phone" container.
    <div className="relative">
      {/* Extending lines to viewport edges (color-coordinated with slide) */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[480px] pointer-events-none">
        {/* Top line extending left */}
        <div className="absolute top-0 right-full w-[50vw] h-px" style={{ background: `linear-gradient(to left, ${accentColor}, transparent)` }} />
        {/* Top line extending right */}
        <div className="absolute top-0 left-full w-[50vw] h-px" style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }} />
        {/* Bottom line extending left */}
        <div className="absolute top-[850px] right-full w-[50vw] h-px" style={{ background: `linear-gradient(to left, ${accentColor}, transparent)` }} />
        {/* Bottom line extending right */}
        <div className="absolute top-[850px] left-full w-[50vw] h-px" style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }} />
        {/* Left line extending up */}
        <div className="absolute left-0 bottom-full h-[50vh] w-px" style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }} />
        {/* Left line extending down */}
        <div className="absolute left-0 top-[850px] h-[50vh] w-px" style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }} />
        {/* Right line extending up */}
        <div className="absolute right-0 bottom-full h-[50vh] w-px" style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }} />
        {/* Right line extending down */}
        <div className="absolute right-0 top-[850px] h-[50vh] w-px" style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }} />
      </div>

      {/* Main container with solid border */}
      <div className={`relative w-[100vw] h-[100vh] md:h-[850px] md:w-[480px] overflow-hidden border border-white/20 flex flex-col transition-colors duration-1000 ease-in-out ${gradient}`}>

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

        {/* Header: Progress Bar + Host Name + Pause */}
        <div className="absolute top-0 left-0 right-0 z-30 p-3 pt-4">
          {/* Progress Bar Row */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
               <div
                 className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100 ease-linear"
                 style={{ width: `${progress}%` }}
               />
            </div>
            {/* Pause Button */}
            {onTogglePause && (
              <button
                onClick={onTogglePause}
                className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                )}
              </button>
            )}
          </div>

          {/* Host Name - IG-style with avatar */}
          {audience !== 'HOSTAI' && (
            <div className="mt-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{hostName.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-white font-semibold text-sm">{hostName}</span>
            </div>
          )}
        </div>

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
        <div className="absolute bottom-10 w-full z-30 flex justify-center">
            <a
              href="https://gethostai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
                <span className="text-[9px] font-sans uppercase tracking-[0.15em] text-white/50 font-medium translate-y-[0.5px]">
                   Powered by
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://gethostai.com/images/hostai-logo-light.svg" alt="HostAI" className="h-3 w-auto opacity-90" />
            </a>
        </div>
      </div>
    </div>
  );
};

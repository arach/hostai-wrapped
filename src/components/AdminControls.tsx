'use client';

import React from 'react';
import { Audience, SlideType } from '@/lib/types';

interface AdminControlsProps {
  audience: Audience;
  setAudience: (a: Audience) => void;
  currentSlideIndex: number;
  slides: SlideType[];
  setCurrentSlideIndex: (index: number) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  // Map Specifics
  mapViewMode: 'GLOBE' | 'MAP';
  setMapViewMode: (mode: 'GLOBE' | 'MAP') => void;
  isMapPlaying: boolean;
  setIsMapPlaying: (playing: boolean) => void;
  currentSlideType: SlideType;
}

export const AdminControls: React.FC<AdminControlsProps> = ({
  audience,
  setAudience,
  currentSlideIndex,
  slides,
  setCurrentSlideIndex,
  isPaused,
  setIsPaused,
  mapViewMode,
  setMapViewMode,
  isMapPlaying,
  setIsMapPlaying,
  currentSlideType
}) => {
  return (
    <div className="w-full max-w-[550px] bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-2xl flex flex-col gap-4">

      {/* Top Row: Global Context (Audience & Playback) */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">View As</span>
            <div className="flex bg-zinc-800 rounded-lg p-1">
                {(['OWNER', 'GUEST', 'STAFF', 'HOSTAI'] as Audience[]).map((aud) => (
                    <button
                        key={aud}
                        onClick={() => setAudience(aud)}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                            audience === aud
                            ? 'bg-zinc-700 text-white shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        {aud}
                    </button>
                ))}
            </div>
        </div>

        <button
            onClick={() => setIsPaused(!isPaused)}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                isPaused
                ? 'border-red-500/30 text-red-400 bg-red-500/10'
                : 'border-green-500/30 text-green-400 bg-green-500/10'
            }`}
            title={isPaused ? "Resume Story" : "Pause Story"}
        >
            {isPaused ? (
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            ) : (
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            )}
        </button>
      </div>

      {/* Middle Row: Slide Navigation */}
      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-end">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                Slide {currentSlideIndex + 1}/{slides.length}: <span className="text-zinc-300">{currentSlideType}</span>
            </span>
         </div>
         <div className="flex gap-1 h-1.5 w-full">
            {slides.map((_, idx) => (
                <div
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-full flex-1 rounded-full cursor-pointer transition-all ${
                        idx === currentSlideIndex
                        ? 'bg-blue-500'
                        : idx < currentSlideIndex
                            ? 'bg-zinc-700'
                            : 'bg-zinc-800'
                    }`}
                />
            ))}
         </div>
      </div>

      {/* Bottom Row: Context Specific Controls */}
      {currentSlideType === SlideType.MAP && (
        <div className="animate-slide-up pt-4 border-t border-zinc-800 flex items-center gap-4">
             <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono">Map Controls</span>

             <div className="flex items-center gap-2">
                <div className="flex bg-zinc-800 rounded-lg p-1">
                    <button
                        onClick={() => setMapViewMode('GLOBE')}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${mapViewMode === 'GLOBE' ? 'bg-zinc-600 text-white' : 'text-zinc-400'}`}
                    >
                        3D Globe
                    </button>
                    <button
                        onClick={() => setMapViewMode('MAP')}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${mapViewMode === 'MAP' ? 'bg-zinc-600 text-white' : 'text-zinc-400'}`}
                    >
                        2D Map
                    </button>
                </div>

                {mapViewMode === 'GLOBE' && (
                    <button
                        onClick={() => setIsMapPlaying(!isMapPlaying)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${
                            isMapPlaying
                            ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                            : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                        }`}
                    >
                       {isMapPlaying ? 'Spinning' : 'Paused'}
                    </button>
                )}
             </div>
        </div>
      )}
    </div>
  );
};

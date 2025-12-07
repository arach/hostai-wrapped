'use client';

import React, { useState, useEffect } from 'react';
import { Audience, SlideType } from '@/lib/types';
import { typography } from '@/lib/design-system';

// Short hash generation for host IDs
// Takes a UUID and creates a short, URL-safe hash (6 chars)
// With ~200 hosts, 6 chars in base36 gives us 2.1 billion possibilities - no collisions
export const hashHostId = (uuid: string): string => {
  // Simple hash: take first 8 chars of UUID, parse as hex, convert to base36
  const hex = uuid.replace(/-/g, '').slice(0, 8);
  const num = parseInt(hex, 16);
  return num.toString(36).padStart(6, '0').slice(0, 6);
};

// Demo host UUID - in production this would come from context/props
export const DEMO_HOST_UUID = '550e8400-e29b-41d4-a716-446655440000';
export const DEMO_HOST_HASH = hashHostId(DEMO_HOST_UUID);

// Audience path mapping
const AUDIENCE_PATHS: Record<Audience, string> = {
  'OWNER': 'owner',
  'GUEST': 'guest',
  'STAFF': 'staff',
  'HOSTAI': 'hostai'
};

// Generate dev/preview URL with full UUID
export const generateDevUrl = (hostUUID: string, audience: Audience): string => {
  if (audience === 'HOSTAI') {
    return `/s/hostai`;
  }
  return `/s/${hostUUID}/${AUDIENCE_PATHS[audience]}`;
};

// Generate short/production URL with hash
export const generateShortUrl = (hostUUID: string, audience: Audience): string => {
  if (audience === 'HOSTAI') {
    return `/s/hostai`;
  }
  const hash = hashHostId(hostUUID);
  return `/s/${hash}/${AUDIENCE_PATHS[audience]}`;
};

interface AdminControlsProps {
  audience: Audience;
  setAudience: (a: Audience) => void;
  currentSlideIndex: number;
  slides: SlideType[];
  setCurrentSlideIndex: (index: number) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  // Map Specifics
  mapViewMode: 'GLOBE' | 'MAP' | 'LOCAL';
  setMapViewMode: (mode: 'GLOBE' | 'MAP' | 'LOCAL') => void;
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
  const [copied, setCopied] = useState(false);
  const [shortCopied, setShortCopied] = useState(false);
  const [devUrl, setDevUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  // Generate URLs when audience changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const devPath = generateDevUrl(DEMO_HOST_UUID, audience);
      const shortPath = generateShortUrl(DEMO_HOST_UUID, audience);
      setDevUrl(`${window.location.origin}${devPath}`);
      setShortUrl(`${window.location.origin}${shortPath}`);
    }
  }, [audience]);

  const handleCopyDev = async () => {
    try {
      await navigator.clipboard.writeText(devUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt('Copy this URL:', devUrl);
    }
  };

  const handleCopyShort = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setShortCopied(true);
      setTimeout(() => setShortCopied(false), 2000);
    } catch {
      prompt('Copy this URL:', shortUrl);
    }
  };

  return (
    <div className="w-full max-w-[550px] bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-2xl flex flex-col gap-4">

      {/* Top Row: Audience Selector & Playback */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
            <span className={`${typography.mono} text-zinc-500 uppercase tracking-widest`}>View As</span>
            <div className="flex bg-zinc-800 rounded-lg p-1">
                {(['OWNER', 'GUEST', 'STAFF', 'HOSTAI'] as Audience[]).map((aud) => (
                    <button
                        key={aud}
                        onClick={() => setAudience(aud)}
                        className={`px-3 py-1.5 rounded-md ${typography.button} transition-all ${
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

        {/* Play/Pause Button */}
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

      {/* Share URL Section */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-4">
        <span className={`${typography.mono} text-zinc-500 uppercase tracking-widest`}>Share Links</span>

        {/* Dev URL - Full UUID */}
        <div className="flex items-center gap-2">
          <span className={`${typography.mono} text-zinc-600 uppercase w-10 shrink-0`}>Dev</span>
          <div className="flex-1 bg-zinc-800 rounded-lg px-3 py-2 overflow-hidden">
            <span className={`${typography.mono} text-zinc-400 truncate block`}>{devUrl}</span>
          </div>
          <button
              onClick={handleCopyDev}
              className={`px-3 py-2 rounded-lg ${typography.button} transition-all shrink-0 ${
                  copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-zinc-700 text-zinc-300 border border-zinc-600 hover:bg-zinc-600'
              }`}
          >
              {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Short URL - Hash */}
        <div className="flex items-center gap-2">
          <span className={`${typography.mono} text-purple-400 uppercase w-10 shrink-0`}>Short</span>
          <div className="flex-1 bg-zinc-800 rounded-lg px-3 py-2 overflow-hidden border border-purple-500/20">
            <span className={`${typography.mono} text-purple-300 truncate block`}>{shortUrl}</span>
          </div>
          <button
              onClick={handleCopyShort}
              className={`px-3 py-2 rounded-lg ${typography.button} transition-all shrink-0 ${
                  shortCopied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30'
              }`}
          >
              {shortCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Middle Row: Slide Navigation */}
      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-end">
            <span className={`${typography.mono} text-zinc-500 uppercase tracking-widest`}>
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
             <span className={`${typography.mono} text-blue-400 uppercase tracking-widest`}>Map Controls</span>

             <div className="flex items-center gap-2">
                <div className="flex bg-zinc-800 rounded-lg p-1">
                    <button
                        onClick={() => setMapViewMode('GLOBE')}
                        className={`px-3 py-1 rounded-md ${typography.button} transition-all ${mapViewMode === 'GLOBE' ? 'bg-zinc-600 text-white' : 'text-zinc-400'}`}
                    >
                        Globe
                    </button>
                    <button
                        onClick={() => setMapViewMode('MAP')}
                        className={`px-3 py-1 rounded-md ${typography.button} transition-all ${mapViewMode === 'MAP' ? 'bg-zinc-600 text-white' : 'text-zinc-400'}`}
                    >
                        Map
                    </button>
                    <button
                        onClick={() => setMapViewMode('LOCAL')}
                        className={`px-3 py-1 rounded-md ${typography.button} transition-all ${mapViewMode === 'LOCAL' ? 'bg-zinc-600 text-white' : 'text-zinc-400'}`}
                    >
                        Local
                    </button>
                </div>

                {mapViewMode === 'GLOBE' && (
                    <button
                        onClick={() => setIsMapPlaying(!isMapPlaying)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${typography.button} ${
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

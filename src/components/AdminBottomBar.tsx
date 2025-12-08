'use client';

import React from 'react';
import { SlideType, Audience } from '@/lib/types';
import { generateShortUrl, SAMPLE_HOST_UUIDS } from '@/lib/hash';

type HostConfig = typeof SAMPLE_HOST_UUIDS[number];

interface AdminBottomBarProps {
  // Slides
  enabledSlides: Record<SlideType, boolean>;
  setEnabledSlides: (slides: Record<SlideType, boolean>) => void;
  baseSlides: SlideType[]; // Slides available for current audience
  // Current slide
  currentSlideIndex: number;
  setCurrentSlideIndex: (idx: number) => void;
  slides: SlideType[]; // Active/filtered slides
  // For URL generation
  hostUuid: string;
  // Audience
  audience: Audience;
  setAudience: (a: Audience) => void;
  // Active properties
  activeHosts: HostConfig[];
  selectedHostIndex: number;
  setSelectedHostIndex: (idx: number) => void;
}

// Slide display names
const slideNames: Record<SlideType, string> = {
  [SlideType.INTRO]: 'Intro',
  [SlideType.MAP]: 'Map',
  [SlideType.DISCOVERY]: 'Discovery',
  [SlideType.STATS]: 'Stats',
  [SlideType.SEASONS]: 'Seasons',
  [SlideType.REVIEW]: 'Review',
  [SlideType.OUTRO]: 'Outro',
};

export const AdminBottomBar: React.FC<AdminBottomBarProps> = ({
  enabledSlides,
  setEnabledSlides,
  baseSlides,
  currentSlideIndex,
  setCurrentSlideIndex,
  slides,
  hostUuid,
  audience,
  setAudience,
  activeHosts,
  selectedHostIndex,
  setSelectedHostIndex,
}) => {
  const [devCopied, setDevCopied] = React.useState(false);
  const [shortCopied, setShortCopied] = React.useState(false);
  const [showCustomShare, setShowCustomShare] = React.useState(false);
  const [baseUrl, setBaseUrl] = React.useState('');
  const [copiedHostIndex, setCopiedHostIndex] = React.useState<number | null>(null);

  // Set baseUrl after mount to avoid hydration mismatch
  React.useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Generate URLs
  const shortPath = generateShortUrl(hostUuid, audience);
  const devUrl = `${baseUrl}/s/${hostUuid}/${audience.toLowerCase()}`;
  const shortUrl = `${baseUrl}${shortPath}`;

  const handleCopyDev = async () => {
    try {
      await navigator.clipboard.writeText(devUrl);
      setDevCopied(true);
      setTimeout(() => setDevCopied(false), 2000);
    } catch {
      prompt('Copy URL:', devUrl);
    }
  };

  const handleCopyShort = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setShortCopied(true);
      setTimeout(() => setShortCopied(false), 2000);
    } catch {
      prompt('Copy URL:', shortUrl);
    }
  };

  // Audience share links
  const audiences: Audience[] = ['OWNER', 'GUEST', 'STAFF', 'HOSTAI'];
  const [copiedAudience, setCopiedAudience] = React.useState<Audience | null>(null);

  const handleCopyForAudience = async (aud: Audience) => {
    const url = `${baseUrl}${generateShortUrl(hostUuid, aud)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedAudience(aud);
      setTimeout(() => setCopiedAudience(null), 2000);
    } catch {
      prompt('Copy URL:', url);
    }
  };

  return (
    <>
      <div className="relative z-40 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-xl mx-auto px-6 py-3">
          {/* Header */}
          <div className="mb-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
              Share Links
            </span>
          </div>

          {/* Share links table */}
          <div className="bg-zinc-900/30 rounded-lg border border-zinc-800/50 overflow-hidden">
            {audiences.map((aud, idx) => {
              const url = `${baseUrl}${generateShortUrl(hostUuid, aud)}`;
              const isCopied = copiedAudience === aud;
              const isCurrentAudience = audience === aud;
              const isLast = idx === audiences.length - 1;

              return (
                <div
                  key={aud}
                  className={`flex items-center gap-3 px-3 py-2 transition-all ${
                    !isLast ? 'border-b border-zinc-800/50' : ''
                  } ${
                    isCurrentAudience
                      ? 'bg-blue-500/[0.08]'
                      : 'hover:bg-zinc-800/30'
                  }`}
                >
                  {/* Audience Label */}
                  <div className="w-14 shrink-0">
                    <span className={`text-[11px] font-medium uppercase tracking-wide ${
                      isCurrentAudience ? 'text-blue-400' : 'text-zinc-500'
                    }`}>
                      {aud}
                    </span>
                  </div>

                  {/* URL */}
                  <div className="flex-1 overflow-hidden">
                    <code className={`text-[11px] font-mono truncate block ${
                      isCurrentAudience ? 'text-blue-300/80' : 'text-zinc-500'
                    }`}>
                      {url}
                    </code>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyForAudience(aud)}
                    className={`p-1.5 rounded transition-all shrink-0 ${
                      isCopied
                        ? 'text-green-400'
                        : isCurrentAudience
                          ? 'text-blue-400 hover:bg-blue-500/20'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                    }`}
                    title={isCopied ? 'Copied!' : 'Copy URL'}
                  >
                    {isCopied ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Share Modal */}
      {showCustomShare && (
        <CustomShareModal
          hostUuid={hostUuid}
          audience={audience}
          baseSlides={baseSlides}
          enabledSlides={enabledSlides}
          setEnabledSlides={setEnabledSlides}
          onClose={() => setShowCustomShare(false)}
        />
      )}
    </>
  );
};

// Custom Share Modal Component
interface CustomShareModalProps {
  hostUuid: string;
  audience: Audience;
  baseSlides: SlideType[];
  enabledSlides: Record<SlideType, boolean>;
  setEnabledSlides: (slides: Record<SlideType, boolean>) => void;
  onClose: () => void;
}

const CustomShareModal: React.FC<CustomShareModalProps> = ({
  hostUuid,
  audience,
  baseSlides,
  enabledSlides,
  setEnabledSlides,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [customEnabled, setCustomEnabled] = React.useState<Record<SlideType, boolean>>(() => {
    // Start with all base slides enabled
    const initial: Record<SlideType, boolean> = {} as Record<SlideType, boolean>;
    Object.values(SlideType).forEach(s => {
      initial[s] = baseSlides.includes(s);
    });
    return initial;
  });

  const toggleSlide = (slideType: SlideType) => {
    setCustomEnabled({
      ...customEnabled,
      [slideType]: !customEnabled[slideType]
    });
  };

  // Generate custom URL
  const shortPath = generateShortUrl(hostUuid, audience);
  const enabledSlideKeys = Object.entries(customEnabled)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key.toLowerCase())
    .join(',');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const customUrl = `${baseUrl}${shortPath}?slides=${enabledSlideKeys}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt('Copy URL:', customUrl);
    }
  };

  const enabledCount = Object.values(customEnabled).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Custom Share</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Audience indicator */}
        <div className="mb-4">
          <span className="text-xs text-zinc-500 uppercase">Sharing for</span>
          <span className="ml-2 text-sm font-semibold text-blue-400">{audience}</span>
        </div>

        {/* Slide selection */}
        <div className="mb-6">
          <div className="text-xs text-zinc-500 uppercase mb-3">Select slides ({enabledCount} selected)</div>
          <div className="grid grid-cols-2 gap-2">
            {baseSlides.map((slideType) => {
              const isEnabled = customEnabled[slideType];
              return (
                <button
                  key={slideType}
                  onClick={() => toggleSlide(slideType)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    isEnabled
                      ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                      : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                  }`}
                >
                  <span className="text-sm font-medium">{slideNames[slideType]}</span>
                  {isEnabled && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* URL Preview */}
        <div className="bg-zinc-800 rounded-lg px-4 py-3 mb-4">
          <div className="text-[10px] text-zinc-500 uppercase mb-1">Share URL</div>
          <code className="text-xs text-zinc-300 font-mono break-all">
            {customUrl}
          </code>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-400 hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCopy}
            disabled={enabledCount === 0}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              copied
                ? 'bg-green-500 text-white'
                : enabledCount === 0
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-400'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              'Copy Custom Link'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

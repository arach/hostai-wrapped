'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { StoryLayout } from '@/components/StoryLayout';
import { IntroSlide } from '@/components/slides/IntroSlide';
import { StatsSlide } from '@/components/slides/RevenueSlide';
import { GuestMapSlide } from '@/components/slides/GuestMapSlide';
import { SeasonSlide } from '@/components/slides/SeasonSlide';
import { ReviewSlide } from '@/components/slides/ReviewSlide';
import { OutroSlide } from '@/components/slides/OutroSlide';
import { mockHostData } from '@/lib/data';
import { SlideType } from '@/lib/types';
import { generateYearSummary } from '@/services/geminiService';
import {
  parseRouteParams,
  getSlideNavigation,
} from '@/lib/routes';

// Gradients per slide type
const gradients: Record<SlideType, string> = {
  [SlideType.INTRO]: 'bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#be185d]',
  [SlideType.MAP]: 'bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]',
  [SlideType.STATS]: 'bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46]',
  [SlideType.SEASONS]: 'bg-gradient-to-br from-[#451a03] via-[#7c2d12] to-[#c2410c]',
  [SlideType.REVIEW]: 'bg-gradient-to-br from-[#4a044e] via-[#701a75] to-[#be185d]',
  [SlideType.OUTRO]: 'bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#2563eb]',
};

const AUTO_ADVANCE_DURATION = 8000;

export default function SlidePage() {
  const params = useParams();
  const router = useRouter();

  const audienceParam = params.audience as string;
  const slideParam = params.slide as string;

  const { audience, slide, isValid } = parseRouteParams(audienceParam, slideParam);

  // State
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mapViewMode, setMapViewMode] = useState<'GLOBE' | 'MAP' | 'LOCAL'>('GLOBE');
  const [isMapPlaying, setIsMapPlaying] = useState(true);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  // Redirect to owner/intro if invalid
  useEffect(() => {
    if (!isValid) {
      router.replace('/owner/intro');
    }
  }, [isValid, router]);

  // Fetch AI summary when on outro slide
  useEffect(() => {
    if (slide === SlideType.OUTRO && audience) {
      const fetchSummary = async () => {
        setIsSummaryLoading(true);
        const summary = await generateYearSummary(mockHostData, audience);
        setAiSummary(summary);
        setIsSummaryLoading(false);
      };
      fetchSummary();
    }
  }, [slide, audience]);

  // Navigation
  const nav = audience && slide ? getSlideNavigation(audience, slide) : null;

  const nextSlide = useCallback(() => {
    if (nav?.next) {
      setProgress(0);
      router.push(nav.next);
    } else {
      setIsPaused(true);
      setProgress(100);
    }
  }, [nav, router]);

  const prevSlide = useCallback(() => {
    if (nav?.prev) {
      setProgress(0);
      router.push(nav.prev);
    }
  }, [nav, router]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused || !isValid) return;

    const intervalTime = 50;
    const step = 100 / (AUTO_ADVANCE_DURATION / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, isValid, nextSlide]);

  // Reset progress on slide change
  useEffect(() => {
    setProgress(0);
  }, [slideParam]);

  if (!isValid || !audience || !slide) {
    return null;
  }

  // Background images
  const getBackgroundImage = () => {
    if (slide === SlideType.INTRO) {
      if (audience === 'GUEST') return 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop';
      if (audience === 'HOSTAI') return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';
      return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop';
    }
    if (slide === SlideType.SEASONS) return 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop';
    if (slide === SlideType.REVIEW) return 'https://images.unsplash.com/photo-1560185009-dddeb820c7b7?q=80&w=2549&auto=format&fit=crop';
    if (slide === SlideType.OUTRO) return 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2680&auto=format&fit=crop';
    return undefined;
  };

  const renderContent = () => {
    switch (slide) {
      case SlideType.INTRO:
        return <IntroSlide audience={audience} data={mockHostData} />;
      case SlideType.MAP:
        return <GuestMapSlide data={mockHostData} viewMode={mapViewMode} isPlaying={isMapPlaying} audience={audience} />;
      case SlideType.STATS:
        return <StatsSlide data={mockHostData} audience={audience} />;
      case SlideType.SEASONS:
        return <SeasonSlide data={mockHostData} />;
      case SlideType.REVIEW:
        return <ReviewSlide data={mockHostData} />;
      case SlideType.OUTRO:
        return <OutroSlide summary={aiSummary} isLoading={isSummaryLoading} audience={audience} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white overflow-hidden">
      {/* Device View Area */}
      <div className="flex-1 w-full flex items-center justify-center p-8 min-h-[600px] md:min-h-0">
        <div
          className="relative z-10 scale-[0.85] md:scale-100 origin-center transition-transform"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <StoryLayout
            gradient={gradients[slide]}
            progress={progress}
            onNext={nextSlide}
            onPrev={prevSlide}
            backgroundImage={getBackgroundImage()}
            backgroundClassName=""
            audience={audience}
          >
            {renderContent()}
          </StoryLayout>
        </div>
      </div>

      {/* Minimal Navigation Info */}
      <div className="w-full bg-zinc-950 border-t border-zinc-900 p-4 flex justify-center items-center gap-6 z-20">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
          {audienceParam} / {slideParam}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
          {nav ? `${nav.currentIndex + 1}/${nav.total}` : ''}
        </span>

        {/* Map controls when on map slide */}
        {slide === SlideType.MAP && (
          <div className="flex items-center gap-2">
            <div className="flex bg-zinc-800 rounded-lg p-1">
              {(['GLOBE', 'MAP', 'LOCAL'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setMapViewMode(mode)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                    mapViewMode === mode ? 'bg-zinc-600 text-white' : 'text-zinc-400'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            {mapViewMode === 'GLOBE' && (
              <button
                onClick={() => setIsMapPlaying(!isMapPlaying)}
                className={`px-3 py-1 rounded-lg border text-[10px] font-bold ${
                  isMapPlaying
                    ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                    : 'border-zinc-700 text-zinc-400'
                }`}
              >
                {isMapPlaying ? 'Spinning' : 'Paused'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

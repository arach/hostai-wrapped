'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StoryLayout } from '@/components/StoryLayout';
import { IntroSlide } from '@/components/slides/IntroSlide';
import { StatsSlide } from '@/components/slides/RevenueSlide';
import { GuestMapSlide } from '@/components/slides/GuestMapSlide';
import { DiscoverySlide } from '@/components/slides/DiscoverySlide';
import { SeasonSlide } from '@/components/slides/SeasonSlide';
import { ReviewSlide } from '@/components/slides/ReviewSlide';
import { OutroSlide } from '@/components/slides/OutroSlide';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminBottomBar } from '@/components/AdminBottomBar';
import { getHostDataByHash } from '@/lib/data';
import { SlideType, Audience } from '@/lib/types';
import { SAMPLE_HOST_UUIDS, hashHostId } from '@/lib/hash';

// Sophisticated Gradients
const gradients: Record<SlideType, string> = {
  [SlideType.INTRO]: 'bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#be185d]', // Deep Purple -> Magenta
  [SlideType.MAP]: 'bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]', // Deep Space Blue
  [SlideType.DISCOVERY]: 'bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#0d9488]', // Ocean Teal
  [SlideType.STATS]: 'bg-black',
  [SlideType.SEASONS]: 'bg-gradient-to-br from-[#451a03] via-[#7c2d12] to-[#c2410c]', // Burnt Orange/Amber
  [SlideType.REVIEW]: 'bg-gradient-to-br from-[#4a044e] via-[#701a75] to-[#be185d]', // Deep Velvet
  [SlideType.OUTRO]: 'bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#2563eb]', // Royal Blue
};

// Accent colors for extending lines (lighter versions of gradient colors)
const accentColors: Record<SlideType, string> = {
  [SlideType.INTRO]: 'rgba(147, 51, 234, 0.4)', // Purple
  [SlideType.MAP]: 'rgba(30, 58, 138, 0.4)', // Deep Blue
  [SlideType.DISCOVERY]: 'rgba(13, 148, 136, 0.4)', // Teal
  [SlideType.STATS]: 'rgba(255, 255, 255, 0.15)', // White (neutral for black bg)
  [SlideType.SEASONS]: 'rgba(194, 65, 12, 0.4)', // Orange
  [SlideType.REVIEW]: 'rgba(190, 24, 93, 0.4)', // Magenta/Pink
  [SlideType.OUTRO]: 'rgba(37, 99, 235, 0.4)', // Royal Blue
};

const AUTO_ADVANCE_DURATION = 8000;

// Wrapper component to handle suspense for useSearchParams
export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();

  // Global State
  const [audience, setAudience] = useState<Audience>('OWNER');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Map Controls State - initialized from host preference
  const [mapViewMode, setMapViewMode] = useState<'GLOBE' | 'MAP' | 'LOCAL'>('GLOBE');
  const [isMapPlaying, setIsMapPlaying] = useState(true);

  // Host selection state - active working set + selection
  const [activeHosts, setActiveHosts] = useState<typeof SAMPLE_HOST_UUIDS[number][]>([SAMPLE_HOST_UUIDS[0]]);
  const [selectedHostIndex, setSelectedHostIndex] = useState(0);
  const selectedHost = activeHosts[selectedHostIndex] || SAMPLE_HOST_UUIDS[0];
  const selectedHostHash = hashHostId(selectedHost.uuid);
  const hostData = getHostDataByHash(selectedHostHash);

  // Update map view when host changes based on their preference
  useEffect(() => {
    if (hostData.preferredMapView) {
      setMapViewMode(hostData.preferredMapView);
    }
  }, [hostData.preferredMapView]);

  // Slide toggles - all enabled by default
  const [enabledSlides, setEnabledSlides] = useState<Record<SlideType, boolean>>({
    [SlideType.INTRO]: true,
    [SlideType.MAP]: true,
    [SlideType.DISCOVERY]: true,
    [SlideType.STATS]: true,
    [SlideType.SEASONS]: true,
    [SlideType.REVIEW]: true,
    [SlideType.OUTRO]: true,
  });

  // Handle legacy URL params: ?view=guest, ?view=owner (route params preferred now)
  // Also handle ?slides= param for custom slide selection
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam) {
      const viewMap: Record<string, Audience> = {
        'owner': 'OWNER',
        'guest': 'GUEST',
        'staff': 'STAFF',
        'hostai': 'HOSTAI',
      };
      const newAudience = viewMap[viewParam.toLowerCase()];
      if (newAudience) {
        setAudience(newAudience);
        setShowControls(false);
      }
    }

    // Parse slides parameter to set enabled slides
    const slidesParam = searchParams.get('slides');
    if (slidesParam) {
      const slideKeys = slidesParam.toLowerCase().split(',');
      const slideTypeMap: Record<string, SlideType> = {
        'intro': SlideType.INTRO,
        'map': SlideType.MAP,
        'discovery': SlideType.DISCOVERY,
        'stats': SlideType.STATS,
        'seasons': SlideType.SEASONS,
        'review': SlideType.REVIEW,
        'outro': SlideType.OUTRO,
      };

      // Create new enabled slides state - all disabled first, then enable selected
      const newEnabledSlides: Record<SlideType, boolean> = {
        [SlideType.INTRO]: false,
        [SlideType.MAP]: false,
        [SlideType.DISCOVERY]: false,
        [SlideType.STATS]: false,
        [SlideType.SEASONS]: false,
        [SlideType.REVIEW]: false,
        [SlideType.OUTRO]: false,
      };

      slideKeys.forEach(key => {
        const slideType = slideTypeMap[key.trim()];
        if (slideType) {
          newEnabledSlides[slideType] = true;
        }
      });

      setEnabledSlides(newEnabledSlides);
    }
  }, [searchParams]);

  // Define Slide Paths based on Audience
  const getBaseSlides = (aud: Audience): SlideType[] => {
    switch (aud) {
        case 'GUEST':
            return [SlideType.INTRO, SlideType.MAP, SlideType.STATS, SlideType.REVIEW, SlideType.OUTRO];
        case 'STAFF':
            // intro -> reviews -> behind reviews (stats) -> community impact (map) -> wrapup
            return [SlideType.INTRO, SlideType.REVIEW, SlideType.STATS, SlideType.MAP, SlideType.OUTRO];
        case 'HOSTAI':
            // Brand View: Intro, Scale (Stats), Network (Map), Review (Testimonial), Vision (Outro)
            return [SlideType.INTRO, SlideType.STATS, SlideType.MAP, SlideType.REVIEW, SlideType.OUTRO];
        case 'OWNER':
        default:
            return [SlideType.INTRO, SlideType.MAP, SlideType.DISCOVERY, SlideType.STATS, SlideType.SEASONS, SlideType.REVIEW, SlideType.OUTRO];
    }
  };

  // Filter slides based on enabledSlides toggles
  const baseSlides = getBaseSlides(audience);
  const slides = baseSlides.filter(slide => enabledSlides[slide]);

  // Safe index check when switching audiences
  useEffect(() => {
    if (currentSlideIndex >= slides.length) {
        setCurrentSlideIndex(0);
        setProgress(0);
    }
  }, [audience, slides.length, currentSlideIndex]);

  // Conditional Background Image logic - Full bleed property images
  const getBackgroundImage = () => {
     // Intro slide background - welcoming property shots
     if (currentSlide === SlideType.INTRO) {
         if (audience === 'GUEST') return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop"; // Beautiful home exterior
         if (audience === 'HOSTAI') return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"; // Tech/Global Network
         if (audience === 'STAFF') return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"; // Warm property interior
         return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"; // Luxury living room
     }
     // Seasons slide - cozy seasonal property vibes
     if (currentSlide === SlideType.SEASONS) {
         return "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop"; // Warm interior with natural light
     }
     // Review slide - detail shots that feel personal
     if (currentSlide === SlideType.REVIEW) {
         return "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop"; // Bedroom/cozy detail
     }
     // Outro slide - aspirational property shot
     if (currentSlide === SlideType.OUTRO) {
         return "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2687&auto=format&fit=crop"; // Beautiful home with pool/outdoor
     }
     return undefined;
  };

  const currentSlide = slides[currentSlideIndex] || SlideType.INTRO;

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // End of story
      setIsPaused(true);
      setProgress(100);
    }
  }, [currentSlideIndex, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setProgress(0);
    }
  }, [currentSlideIndex]);

  // Timer logic
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = 100 / (AUTO_ADVANCE_DURATION / intervalTime);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentSlideIndex, isPaused, nextSlide]);

  const renderContent = () => {
    switch (currentSlide) {
      case SlideType.INTRO: return <IntroSlide audience={audience} data={hostData} />;
      case SlideType.MAP: return <GuestMapSlide data={hostData} viewMode={mapViewMode} isPlaying={isMapPlaying} audience={audience} />;
      case SlideType.DISCOVERY: return <DiscoverySlide data={hostData} />;
      case SlideType.STATS: return <StatsSlide data={hostData} audience={audience} />;
      case SlideType.SEASONS: return <SeasonSlide key={`season-${currentSlideIndex}`} data={hostData} />;
      case SlideType.REVIEW: return <ReviewSlide data={hostData} />;
      case SlideType.OUTRO: return <OutroSlide audience={audience} data={hostData} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar - Search + Active Properties */}
      {showControls && (
        <AdminSidebar
          allHosts={SAMPLE_HOST_UUIDS}
          activeHosts={activeHosts}
          setActiveHosts={setActiveHosts}
          selectedHostIndex={selectedHostIndex}
          setSelectedHostIndex={(idx) => {
            setSelectedHostIndex(idx);
            setCurrentSlideIndex(0);
            setProgress(0);
          }}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Preview Area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900 relative">
          {/* Inspector Bar - Property + Audience */}
          {showControls && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1.5 bg-white/[0.02] backdrop-blur-md rounded-full border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {/* Property Name */}
              <div className="flex items-center gap-2 px-4 py-1.5">
                <span className="text-sm font-medium text-white/90">{hostData.hostName}</span>
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-white/20" />

              {/* Audience Tabs */}
              <div className="flex items-center gap-0.5 px-1">
                {(['OWNER', 'GUEST', 'STAFF', 'HOSTAI'] as const).map((aud) => (
                  <button
                    key={aud}
                    onClick={() => {
                      setAudience(aud);
                      setCurrentSlideIndex(0);
                      setProgress(0);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      audience === aud
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/60 font-medium hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Device Preview + Slide Navigation Container */}
          <div className="flex flex-col items-center">
            {/* Device Preview */}
            <div
              className="relative z-10 scale-[0.65] md:scale-75 lg:scale-85 origin-top transition-transform"
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <StoryLayout
                gradient={gradients[currentSlide]}
                progress={progress}
                onNext={nextSlide}
                onPrev={prevSlide}
                backgroundImage={getBackgroundImage()}
                audience={audience}
                accentColor={accentColors[currentSlide]}
                isPaused={isPaused}
                onTogglePause={() => setIsPaused(!isPaused)}
              >
                {renderContent()}
              </StoryLayout>
            </div>

            {/* Slide Navigation - Just below the phone with small margin */}
            {/* Negative margin compensates for scale transform phantom space: 850px * (1-scale) */}
            {showControls && (
              <div className="w-[312px] md:w-[360px] lg:w-[408px] -mt-[290px] md:-mt-[200px] lg:-mt-[120px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Slide {currentSlideIndex + 1}/{slides.length}
                  </span>
                  <span className="text-[10px] text-zinc-600">•</span>
                  <span className="text-[10px] text-zinc-400 uppercase">
                    {slides[currentSlideIndex]}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="flex gap-1 h-1.5 mb-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentSlideIndex(idx);
                        setProgress(0);
                      }}
                      className={`flex-1 rounded-full transition-all ${
                        idx === currentSlideIndex
                          ? 'bg-blue-500'
                          : idx < currentSlideIndex
                            ? 'bg-zinc-600 hover:bg-zinc-500'
                            : 'bg-zinc-800 hover:bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                {/* Slide labels */}
                <div className="flex gap-1">
                  {slides.map((slideType, idx) => (
                    <button
                      key={slideType}
                      onClick={() => {
                        setCurrentSlideIndex(idx);
                        setProgress(0);
                      }}
                      className={`flex-1 py-1 rounded text-[9px] font-medium transition-all ${
                        idx === currentSlideIndex
                          ? 'text-blue-400'
                          : 'text-zinc-600 hover:text-zinc-500'
                      }`}
                    >
                      {slideType.charAt(0) + slideType.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Admin Bar - Audience + Share */}
        {showControls && (
          <AdminBottomBar
            enabledSlides={enabledSlides}
            setEnabledSlides={setEnabledSlides}
            baseSlides={baseSlides}
            currentSlideIndex={currentSlideIndex}
            setCurrentSlideIndex={(idx) => {
              setCurrentSlideIndex(idx);
              setProgress(0);
            }}
            slides={slides}
            hostUuid={selectedHost.uuid}
            audience={audience}
            setAudience={(a) => {
              setAudience(a);
              setCurrentSlideIndex(0);
              setProgress(0);
            }}
            activeHosts={activeHosts}
            selectedHostIndex={selectedHostIndex}
            setSelectedHostIndex={(idx) => {
              setSelectedHostIndex(idx);
              setCurrentSlideIndex(0);
              setProgress(0);
            }}
          />
        )}
      </div>
    </div>
  );
}

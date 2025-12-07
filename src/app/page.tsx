'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { StoryLayout } from '@/components/StoryLayout';
import { IntroSlide } from '@/components/slides/IntroSlide';
import { StatsSlide } from '@/components/slides/RevenueSlide';
import { GuestMapSlide } from '@/components/slides/GuestMapSlide';
import { SeasonSlide } from '@/components/slides/SeasonSlide';
import { ReviewSlide } from '@/components/slides/ReviewSlide';
import { OutroSlide } from '@/components/slides/OutroSlide';
import { AdminControls } from '@/components/AdminControls';
import { mockHostData } from '@/lib/data';
import { SlideType, Audience } from '@/lib/types';
import { generateYearSummary } from '@/services/geminiService';

// Sophisticated Gradients
const gradients: Record<SlideType, string> = {
  [SlideType.INTRO]: 'bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#be185d]', // Deep Purple -> Magenta
  [SlideType.MAP]: 'bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]', // Deep Space Blue
  [SlideType.STATS]: 'bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46]', // Rich Emerald
  [SlideType.SEASONS]: 'bg-gradient-to-br from-[#451a03] via-[#7c2d12] to-[#c2410c]', // Burnt Orange/Amber
  [SlideType.REVIEW]: 'bg-gradient-to-br from-[#4a044e] via-[#701a75] to-[#be185d]', // Deep Velvet
  [SlideType.OUTRO]: 'bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#2563eb]', // Royal Blue
};

const AUTO_ADVANCE_DURATION = 8000;

export default function Home() {
  // Global State
  const [audience, setAudience] = useState<Audience>('OWNER');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Map Controls State
  const [mapViewMode, setMapViewMode] = useState<'GLOBE' | 'MAP' | 'LOCAL'>('GLOBE');
  const [isMapPlaying, setIsMapPlaying] = useState(true);

  // AI Summary State (Pre-fetching)
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  // Define Slide Paths based on Audience
  const getSlides = (aud: Audience): SlideType[] => {
    switch (aud) {
        case 'GUEST':
            return [SlideType.INTRO, SlideType.MAP, SlideType.STATS, SlideType.REVIEW, SlideType.OUTRO];
        case 'STAFF':
            return [SlideType.INTRO, SlideType.STATS, SlideType.REVIEW, SlideType.MAP, SlideType.OUTRO];
        case 'HOSTAI':
            // Brand View: Intro, Scale (Stats), Network (Map), Review (Testimonial), Vision (Outro)
            return [SlideType.INTRO, SlideType.STATS, SlideType.MAP, SlideType.REVIEW, SlideType.OUTRO];
        case 'OWNER':
        default:
            return [SlideType.INTRO, SlideType.MAP, SlideType.STATS, SlideType.SEASONS, SlideType.REVIEW, SlideType.OUTRO];
    }
  };

  const slides = getSlides(audience);

  // Safe index check when switching audiences
  useEffect(() => {
    if (currentSlideIndex >= slides.length) {
        setCurrentSlideIndex(0);
        setProgress(0);
    }
  }, [audience, slides.length, currentSlideIndex]);

  // Pre-fetch AI Summary when audience changes
  useEffect(() => {
    const fetchSummary = async () => {
        setIsSummaryLoading(true);
        // Reset summary while loading new context
        setAiSummary("");
        const summary = await generateYearSummary(mockHostData, audience);
        setAiSummary(summary);
        setIsSummaryLoading(false);
    };
    fetchSummary();
  }, [audience]);

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
      case SlideType.INTRO: return <IntroSlide audience={audience} data={mockHostData} />;
      case SlideType.MAP: return <GuestMapSlide data={mockHostData} viewMode={mapViewMode} isPlaying={isMapPlaying} audience={audience} />;
      case SlideType.STATS: return <StatsSlide data={mockHostData} audience={audience} />;
      case SlideType.SEASONS: return <SeasonSlide data={mockHostData} />;
      case SlideType.REVIEW: return <ReviewSlide data={mockHostData} />;
      case SlideType.OUTRO: return <OutroSlide summary={aiSummary} isLoading={isSummaryLoading} audience={audience} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white overflow-hidden">

      {/* 1. Device View Area */}
      <div className="flex-1 w-full flex items-center justify-center p-8 min-h-[600px] md:min-h-0">
         {/* We wrap StoryLayout to constrain it visually like a phone on desktop */}
         <div
            className="relative z-10 scale-[0.85] md:scale-100 origin-center transition-transform"
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
            >
                {renderContent()}
            </StoryLayout>
         </div>
      </div>

      {/* 2. Admin Control Panel Area */}
      <div className="w-full bg-zinc-950 border-t border-zinc-900 p-6 flex justify-center items-start z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
         <AdminControls
            audience={audience}
            setAudience={(a) => {
                setAudience(a);
                setCurrentSlideIndex(0); // Reset to start when changing audience
                setProgress(0);
            }}
            currentSlideIndex={currentSlideIndex}
            slides={slides}
            setCurrentSlideIndex={(idx) => {
                setCurrentSlideIndex(idx);
                setProgress(0);
            }}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            mapViewMode={mapViewMode}
            setMapViewMode={setMapViewMode}
            isMapPlaying={isMapPlaying}
            setIsMapPlaying={setIsMapPlaying}
            currentSlideType={currentSlide}
         />
      </div>
    </div>
  );
}

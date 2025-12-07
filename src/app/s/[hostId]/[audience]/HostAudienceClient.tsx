'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { StoryLayout } from '@/components/StoryLayout';
import { IntroSlide } from '@/components/slides/IntroSlide';
import { StatsSlide } from '@/components/slides/RevenueSlide';
import { GuestMapSlide } from '@/components/slides/GuestMapSlide';
import { SeasonSlide } from '@/components/slides/SeasonSlide';
import { ReviewSlide } from '@/components/slides/ReviewSlide';
import { OutroSlide } from '@/components/slides/OutroSlide';
import { mockHostData } from '@/lib/data';
import { SlideType, Audience } from '@/lib/types';

const gradients: Record<SlideType, string> = {
  [SlideType.INTRO]: 'bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#be185d]',
  [SlideType.MAP]: 'bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]',
  [SlideType.STATS]: 'bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46]',
  [SlideType.SEASONS]: 'bg-gradient-to-br from-[#451a03] via-[#7c2d12] to-[#c2410c]',
  [SlideType.REVIEW]: 'bg-gradient-to-br from-[#4a044e] via-[#701a75] to-[#be185d]',
  [SlideType.OUTRO]: 'bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#2563eb]',
};

const AUTO_ADVANCE_DURATION = 8000;

interface HostAudienceClientProps {
  hostId: string;
  audienceParam: string;
}

export default function HostAudienceClient({ hostId, audienceParam }: HostAudienceClientProps) {
  // Map audience param to Audience type
  const getAudience = (a: string): Audience => {
    const lower = a.toLowerCase();
    if (lower === 'owner') return 'OWNER';
    if (lower === 'guest') return 'GUEST';
    if (lower === 'staff') return 'STAFF';
    return 'OWNER';
  };

  const audience: Audience = getAudience(audienceParam);

  // TODO: In production, use hostId to fetch actual host data
  // For now, using mock data
  const hostData = mockHostData;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mapViewMode] = useState<'GLOBE' | 'MAP' | 'LOCAL'>('GLOBE');
  const [isMapPlaying] = useState(true);

  const getSlides = (aud: Audience): SlideType[] => {
    switch (aud) {
      case 'GUEST':
        return [SlideType.INTRO, SlideType.MAP, SlideType.STATS, SlideType.REVIEW, SlideType.OUTRO];
      case 'STAFF':
        return [SlideType.INTRO, SlideType.STATS, SlideType.REVIEW, SlideType.MAP, SlideType.OUTRO];
      case 'OWNER':
      default:
        return [SlideType.INTRO, SlideType.MAP, SlideType.STATS, SlideType.SEASONS, SlideType.REVIEW, SlideType.OUTRO];
    }
  };

  const slides = getSlides(audience);
  const currentSlide = slides[currentSlideIndex] || SlideType.INTRO;

  const getBackgroundImage = () => {
    if (currentSlide === SlideType.INTRO) {
      if (audience === 'GUEST') return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop";
      if (audience === 'STAFF') return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop";
      return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop";
    }
    if (currentSlide === SlideType.SEASONS) return "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop";
    if (currentSlide === SlideType.REVIEW) return "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop";
    if (currentSlide === SlideType.OUTRO) return "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2687&auto=format&fit=crop";
    return undefined;
  };

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setProgress(0);
    } else {
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
      case SlideType.STATS: return <StatsSlide data={hostData} audience={audience} />;
      case SlideType.SEASONS: return <SeasonSlide key={`season-${currentSlideIndex}`} data={hostData} />;
      case SlideType.REVIEW: return <ReviewSlide data={hostData} />;
      case SlideType.OUTRO: return <OutroSlide audience={audience} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
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
  );
}

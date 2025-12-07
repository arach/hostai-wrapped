'use client';

import React from 'react';
import { Audience, HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface IntroSlideProps {
  audience: Audience;
  data?: HostData;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ audience, data }) => {

  const getContent = () => {
    switch(audience) {
        case 'GUEST':
            return {
                title: "Local Heart,\nGlobal Soul.",
                subtitle: `By staying here, you supported a real neighborhood.`
            };
        case 'STAFF':
            return {
                title: "You made\nit happen.",
                subtitle: "Every clean sheet, every fixed lightbulb, every smile."
            };
        case 'HOSTAI':
            return {
                title: "The Future\nis here.",
                subtitle: "Redefining the standard of modern hospitality."
            };
        default: // OWNER
            return {
                title: "What a\nyear.",
                subtitle: "365 days of hellos, goodbyes, and everything in between."
            };
    }
  }

  const content = getContent();

  return (
    <div className="flex flex-col h-full px-8 pt-24 pb-28">
      {/* Header - same position as other slides */}
      <div className="animate-fade-in mb-4">
        <h2 className={`${typography.hero} text-white mb-2 whitespace-pre-line`}>
          {content.title}
        </h2>
        <p className={`${typography.body} text-white/70`}>
          {content.subtitle}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Subtle tap hint */}
      <div className="animate-fade-in flex items-center justify-center gap-2 text-white/40" style={{ animationDelay: '1s' }}>
        <span className="text-xs tracking-wide">Tap to continue</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

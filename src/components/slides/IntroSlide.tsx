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
                subtitle: `By staying here, you supported a real neighborhood. Together, our guests infused $${data ? (data.economicImpact / 1000000).toFixed(1) : '1.2'}M into local shops, cafes, and restaurants.`,
                tag: "See The Impact"
            };
        case 'STAFF':
            return {
                title: "You made\nit happen.",
                subtitle: "Every clean sheet, every fixed lightbulb, every smile. It added up.",
                tag: "View Highlights"
            };
        case 'HOSTAI':
            return {
                title: "The Future\nis here.",
                subtitle: "This year, HostAI powered over 12,000 properties worldwide, redefining the standard of modern hospitality.",
                tag: "View Platform Report"
            };
        default: // OWNER
            return {
                title: "What a\nyear.",
                subtitle: "Here's to the guests you welcomed, the reviews you earned, and the memories you made.",
                tag: "View Highlights"
            };
    }
  }

  const content = getContent();

  return (
    <div className="flex flex-col justify-center h-full px-8 pb-20">
      <div className="animate-slide-up">
        <h2 className={`${typography.hero} mb-8 whitespace-pre-line bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 drop-shadow-sm`}>
          {content.title}
        </h2>
        <div className="w-16 h-1 bg-white/30 mb-10 rounded-full"></div>
        <p className={`${typography.body} text-white/90 mb-16 max-w-[90%] drop-shadow-md`}>
          {content.subtitle}
        </p>
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-5 pr-2 py-2 cursor-pointer hover:bg-white/20 transition-colors shadow-lg">
          <span className={`${typography.button} text-white`}>{content.tag}</span>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

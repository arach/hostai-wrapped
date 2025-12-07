'use client';

import React from 'react';
import { Audience } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface OutroSlideProps {
  audience: Audience;
}

const getSummary = (audience: Audience): string => {
  switch (audience) {
    case 'GUEST':
      return "You were one of <strong>842 guests</strong> who made this year unforgettable. We can't wait to welcome you back for another <strong>5-star stay</strong>.";
    case 'STAFF':
      return "Your hard work delivered <strong>5-star hospitality</strong> to over <strong>800 guests</strong>. Thank you for making every stay magical.";
    case 'HOSTAI':
      return "We powered over <strong>12,000 properties</strong> this year, processing <strong>$450M in value</strong>. Together, we are building the <strong>future of hospitality</strong>.";
    default:
      return "You welcomed <strong>842 guests</strong> during a record-breaking <strong>Spring season</strong>. Your commitment to <strong>5-star hospitality</strong> set a new standard.";
  }
};

export const OutroSlide: React.FC<OutroSlideProps> = ({ audience }) => {
  const summary = getSummary(audience);

  return (
    <div className="flex flex-col h-full justify-center px-8 pb-20 text-center">
      <div className="animate-slide-up">
        <div className="mb-8 flex justify-center">
           <div className="bg-white/10 p-4 rounded-full border border-white/20 backdrop-blur-md shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
           </div>
        </div>

        <h2 className={`${typography.hero} mb-12 drop-shadow-md`}>2025 Wrapped</h2>

        <div className="bg-black/20 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 relative min-h-[200px] flex items-center justify-center shadow-2xl">
            <div
              className={`${typography.body} text-white/90
              [&>strong]:text-white
              [&>strong]:font-serif
              [&>strong]:italic
              [&>strong]:font-bold
              [&>strong]:mx-1`}
              dangerouslySetInnerHTML={{ __html: summary }}
            />
        </div>

        <div className="mt-12 space-y-4">
            <button className={`w-full bg-white text-black ${typography.button} py-4 rounded-2xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>
                Share This Story
            </button>
            {audience === 'OWNER' && (
              <button className={`w-full bg-transparent border border-white/20 text-white ${typography.button} py-4 rounded-2xl hover:bg-white/5 transition-colors`}>
                  Full Analytics Report
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

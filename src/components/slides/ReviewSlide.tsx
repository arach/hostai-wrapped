'use client';

import React from 'react';
import { HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface ReviewSlideProps {
  data: HostData;
}

export const ReviewSlide: React.FC<ReviewSlideProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full justify-center px-8 pb-20">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl relative animate-slide-up">
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-pink-500 px-4 py-2 rounded-full shadow-lg ${typography.label}`}>
            Star Property
        </div>

        <div className="flex gap-1 mb-6 justify-center">
            {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>

        <h3 className={`${typography.title} text-center leading-tight mb-6`}>
          &quot;{data.spotlightReview.text}&quot;
        </h3>

        <div className="text-center border-t border-white/10 pt-4">
            <p className={`${typography.body} font-bold`}>{data.spotlightReview.guest}</p>
            <p className={`${typography.bodySmall} text-white/60`}>stayed at {data.spotlightReview.property}</p>
        </div>
      </div>

      <div className="mt-12 text-center animate-fade-in">
        <h2 className={`${typography.stat} mb-2`}>The people&apos;s choice</h2>
        <p className={`${typography.bodySmall} text-white/70`}>Viewed by 459 guests this year</p>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface ReviewSlideProps {
  data: HostData;
}

export const ReviewSlide: React.FC<ReviewSlideProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full px-8 pt-24 pb-28">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="animate-fade-in mb-4">
        <h2 className={`${typography.hero} text-white mb-2`}>
          Guest<br/>favorite.
        </h2>
        <p className={`${typography.body} text-white/70`}>Exceptional hospitality, measured.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 animate-slide-up mb-8">
        <div>
          <div className="text-3xl font-bold tracking-tight text-white">
            {data.guestConversationsHandled.toLocaleString()}
          </div>
          <div className={typography.sublabel}>Guest chats handled</div>
        </div>
        <div>
          <div className="text-3xl font-bold tracking-tight text-white">
            {data.fiveStarReviewsEarned}
          </div>
          <div className={typography.sublabel}>5-star reviews</div>
        </div>
      </div>

      {/* Spacer to push review card lower */}
      <div className="flex-1" />

      {/* Bottom Content Area - Review Card */}
      <div className="relative animate-slide-up" style={{ animationDelay: '0.15s' }}>
        <h3 className={`${typography.sublabel} mb-3 uppercase tracking-wider`}>Featured Review</h3>
        {/* Review card wrapper with star badge */}
        <div className="relative">
          {/* Floating stars decoration - fully opaque, in front of box (z-10) */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex gap-1 bg-amber-500 px-3 py-1.5 rounded-full shadow-lg">
          {[1,2,3,4,5].map(i => {
            const rating = data.spotlightReview.rating;
            const isFilled = i <= Math.floor(rating);
            const isHalf = !isFilled && i === Math.ceil(rating) && rating % 1 !== 0;
            return (
              <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
                {isHalf ? (
                  <>
                    <defs>
                      <linearGradient id={`half-star-${i}`}>
                        <stop offset="50%" stopColor="#FEF3C7" />
                        <stop offset="50%" stopColor="#78350F" />
                      </linearGradient>
                    </defs>
                    <path fill={`url(#half-star-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </>
                ) : (
                  <path
                    className={isFilled ? 'fill-amber-100' : 'fill-amber-700'}
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                )}
              </svg>
            );
          })}
        </div>

          {/* Review card - more opaque glassmorphism */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 pt-8 rounded-2xl">
            <p className={`${typography.bodySmall} text-center leading-relaxed mb-3`}>
              &quot;{data.spotlightReview.text}&quot;
            </p>

            <div className="border-t border-white/20 pt-3 text-center">
              <p className={`${typography.bodySmall} font-semibold`}>{data.spotlightReview.guest}</p>
              <p className={`${typography.sublabel}`}>{data.spotlightReview.property}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

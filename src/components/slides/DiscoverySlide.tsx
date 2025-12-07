'use client';

import React from 'react';
import { HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface DiscoverySlideProps {
  data: HostData;
}

export const DiscoverySlide: React.FC<DiscoverySlideProps> = ({ data }) => {
  const topOrigins = data.topGuestOrigins.slice(0, 3);

  return (
    <div className="flex flex-col h-full px-8 pt-24 pb-28">
      {/* Header */}
      <div className="animate-fade-in mb-4">
        <h2 className={`${typography.hero} text-white mb-2`}>
          Your reputation<br/>precedes you.
        </h2>
        <p className={`${typography.body} text-white/70`}>
          How guests discovered you this year.
        </p>
      </div>

      {/* Top Search Term - Hero stat */}
      <div className="animate-slide-up mb-8">
        <div className={typography.sublabel}>Top Search</div>
        <div className="text-2xl font-serif italic text-white mt-1">
          &quot;{data.topSearchTerm}&quot;
        </div>
        <p className="text-white/50 text-sm mt-1">SEO doing its thing 🔍</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Content Area - Top Origins */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 className={`${typography.sublabel} mb-3 uppercase tracking-wider`}>Top Guest Origins</h3>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="space-y-3">
            {topOrigins.map((origin, i) => (
              <div key={origin.city} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <span className="text-white font-medium">{origin.city}</span>
                  <span className="text-white/40 text-sm ml-2">{origin.country}</span>
                </div>
                <span className="text-white/50 text-sm">{origin.count} guests</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-xs mt-3 text-center">
          Guests from {data.topGuestOrigins.length}+ cities found their way to you 🌍
        </p>
      </div>
    </div>
  );
};

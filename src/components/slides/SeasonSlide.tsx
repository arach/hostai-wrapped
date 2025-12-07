'use client';

import React from 'react';
import { HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface SeasonSlideProps {
  data: HostData;
}

export const SeasonSlide: React.FC<SeasonSlideProps> = ({ data }) => {
  const maxOccupancy = Math.max(...data.monthlyOccupancy.map(d => d.occupancy));

  return (
    <div className="flex flex-col h-full pt-20 px-6 pb-20">

      <div className="text-center mb-8 animate-fade-in">
        <div className={`bg-white/10 inline-block px-4 py-1.5 rounded-full border border-white/20 mb-6 ${typography.label}`}>
            Hottest Check-in Date
        </div>
        <h2 className={`${typography.hero} mb-4`}>{data.busiestDate}</h2>
        <p className={`${typography.body} text-white/80`}>Your busiest check-in day of the year.</p>
      </div>

      <div className="flex-1 w-full min-h-[200px] flex flex-col justify-end pb-8 animate-slide-up">
        <h3 className={`${typography.sublabel} mb-4 pl-2`}>Occupancy Rhythm</h3>
        <div className="w-full bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
          {/* Simple CSS bar chart */}
          <div className="flex items-end gap-1 h-32 mb-2">
            {data.monthlyOccupancy.map((m, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all ${m.occupancy === maxOccupancy ? 'bg-white' : 'bg-white/40'}`}
                style={{ height: `${m.occupancy}%` }}
              />
            ))}
          </div>
          {/* Month labels */}
          <div className="flex gap-1">
            {data.monthlyOccupancy.map((m, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-white/50">
                {m.month}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-4 animate-fade-in ${typography.bodySmall} text-white/90 flex items-center justify-center gap-2`}>
        <span>Full house</span>
      </div>
    </div>
  );
};

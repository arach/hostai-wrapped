'use client';

import React from 'react';
import { HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface SeasonSlideProps {
  data: HostData;
}

export const SeasonSlide: React.FC<SeasonSlideProps> = ({ data }) => {
  const maxOccupancy = Math.max(...data.monthlyOccupancy.map(d => d.occupancy));
  const peakMonth = data.monthlyOccupancy.reduce((max, m) => m.occupancy > max.occupancy ? m : max);

  return (
    <div className="flex flex-col h-full px-8 pt-24 pb-28">
      {/* Header */}
      <div className="animate-fade-in mb-6">
        <h2 className={`${typography.hero} text-white mb-2`}>
          Packed<br/>house.
        </h2>
        <p className={`${typography.body} text-white/70`}>
          {peakMonth.month} was your busiest month.
        </p>
      </div>

      {/* Peak Day Callout */}
      <div className="animate-slide-up mb-8">
        <div className={`text-4xl font-bold tracking-tight text-white`}>
          {data.busiestDate}
        </div>
        <div className={typography.sublabel}>Busiest check-in day</div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Content Area - Occupancy Chart */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 className={`${typography.sublabel} mb-3 uppercase tracking-wider`}>Occupancy by Month</h3>
        <div className="w-full bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
          {/* Simple CSS bar chart */}
          <div className="flex items-end gap-1 h-28 mb-2">
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

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-2 gap-3 mt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <div className="text-xl font-bold text-white">{data.totalGuests}</div>
          <div className={typography.sublabel}>Happy guests</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <div className="text-xl font-bold text-white">{data.occupancyRate}%</div>
          <div className={typography.sublabel}>Occupancy rate</div>
        </div>
      </div>
    </div>
  );
};

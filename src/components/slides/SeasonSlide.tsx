'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SeasonSlideProps {
  data: HostData;
}

export const SeasonSlide: React.FC<SeasonSlideProps> = ({ data }) => {
  const maxOccupancy = Math.max(...data.monthlyOccupancy.map(d => d.occupancy));
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use ResizeObserver to detect when container has actual dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setIsReady(true);
        }
      }
    });

    observer.observe(container);

    // Also set ready after a small delay as fallback
    const timer = setTimeout(() => setIsReady(true), 150);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

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
        <div ref={containerRef} className="h-64 w-full bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            {isReady && (
              <ResponsiveContainer width="100%" height={200} minWidth={200}>
                <BarChart data={data.monthlyOccupancy}>
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                        interval={0}
                    />
                    <Tooltip
                        cursor={{fill: 'rgba(255,255,255,0.1)'}}
                        contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', color: '#fff' }}
                    />
                    <Bar dataKey="occupancy" radius={[4, 4, 0, 0]}>
                    {data.monthlyOccupancy.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.occupancy === maxOccupancy ? '#ffffff' : 'rgba(255,255,255,0.4)'}
                        />
                    ))}
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
        </div>
      </div>

      <div className={`mt-4 animate-fade-in ${typography.bodySmall} text-white/90 flex items-center justify-center gap-2`}>
        <span>Full house</span>
      </div>
    </div>
  );
};

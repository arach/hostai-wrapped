'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';
import { BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

interface SeasonSlideProps {
  data: HostData;
}

export const SeasonSlide: React.FC<SeasonSlideProps> = ({ data }) => {
  const maxOccupancy = Math.max(...data.monthlyOccupancy.map(d => d.occupancy));
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Measure container dimensions directly
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setDimensions({ width: width - 32, height: height - 32 }); // Account for padding
        }
      }
    };

    // Initial measurement with RAF to ensure layout is complete
    const rafId = requestAnimationFrame(() => {
      updateDimensions();
    });

    // Also measure after a short delay as backup
    const timer = setTimeout(updateDimensions, 100);

    // Listen for resize
    window.addEventListener('resize', updateDimensions);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
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
            {dimensions.width > 0 && (
              <BarChart
                width={dimensions.width}
                height={Math.min(dimensions.height, 200)}
                data={data.monthlyOccupancy}
              >
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
            )}
        </div>
      </div>

      <div className={`mt-4 animate-fade-in ${typography.bodySmall} text-white/90 flex items-center justify-center gap-2`}>
        <span>Full house</span>
      </div>
    </div>
  );
};

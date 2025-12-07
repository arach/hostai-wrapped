'use client';

import React, { useState, useEffect } from 'react';
import { HostData } from '@/lib/types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SeasonSlideProps {
  data: HostData;
}

export const SeasonSlide: React.FC<SeasonSlideProps> = ({ data }) => {
  const maxOccupancy = Math.max(...data.monthlyOccupancy.map(d => d.occupancy));
  const [isReady, setIsReady] = useState(false);

  // Delay chart render to ensure container has dimensions
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full pt-20 px-6 pb-20">

      <div className="text-center mb-8 animate-fade-in">
        <div className="bg-white/10 inline-block px-4 py-1 rounded-full border border-white/20 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase">Hottest Check-in Date</span>
        </div>
        <h2 className="text-6xl font-bold mb-4">{data.busiestDate}</h2>
        <p className="text-xl text-white/80">Your busiest check-in day of the year.</p>
      </div>

      <div className="flex-1 w-full min-h-[200px] flex flex-col justify-end pb-8 animate-slide-up">
        <h3 className="text-sm font-mono uppercase text-white/60 mb-4 pl-2">Occupancy Rhythm</h3>
        <div className="h-64 w-full bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            {isReady && (
              <ResponsiveContainer width="100%" height="100%" debounce={50}>
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

      <div className="mt-4 animate-fade-in text-white/90 font-medium flex items-center justify-center gap-2">
        <span>Full house</span>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Audience } from '@/lib/types';

interface OutroSlideProps {
  summary: string;
  isLoading: boolean;
  audience: Audience;
}

export const OutroSlide: React.FC<OutroSlideProps> = ({ summary, isLoading, audience }) => {

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

        <h2 className="text-5xl font-serif font-bold mb-12 drop-shadow-md">2025 Wrapped</h2>

        <div className="bg-black/20 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 relative min-h-[200px] flex items-center justify-center shadow-2xl">
            {isLoading || !summary ? (
                <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '75ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                </div>
            ) : (
                <div
                  className="text-xl md:text-2xl font-light leading-relaxed text-white/90
                  [&>strong]:text-white
                  [&>strong]:font-serif
                  [&>strong]:italic
                  [&>strong]:font-bold
                  [&>strong]:text-[1.2em]
                  [&>strong]:mx-1"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
            )}
        </div>

        <div className="mt-12 space-y-4">
            <button className="w-full bg-white text-black font-bold py-4 rounded-2xl text-md hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] tracking-wide uppercase">
                Share This Story
            </button>
            {audience === 'OWNER' && (
              <button className="w-full bg-transparent border border-white/20 text-white font-bold py-4 rounded-2xl text-md hover:bg-white/5 transition-colors tracking-wide uppercase">
                  Full Analytics Report
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

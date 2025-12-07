'use client';

import React from 'react';
import { Audience, HostData } from '@/lib/types';
import { typography } from '@/lib/design-system';

interface OutroSlideProps {
  audience: Audience;
  data: HostData;
}

const getContent = (audience: Audience, data: HostData): { title: string; subtitle: string; summary: string } => {
  const formatMoney = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
    return `$${n}`;
  };

  switch (audience) {
    case 'GUEST':
      return {
        title: "Until\nnext time.",
        subtitle: "Thanks for being part of our story.",
        summary: `You were one of <strong>${data.totalGuests.toLocaleString()} guests</strong> who made this year unforgettable. Together, we contributed <strong>${formatMoney(data.economicImpact)}</strong> to local businesses. We can't wait to welcome you back.`
      };
    case 'STAFF':
      return {
        title: "Thank\nyou.",
        subtitle: "You're the reason it all works.",
        summary: `Your <strong>${data.cleaningHours.toLocaleString()} hours</strong> of hard work delivered <strong>${data.fiveStarReviewsEarned} 5-star reviews</strong> and served <strong>${data.totalGuests.toLocaleString()} guests</strong>. You cleaned <strong>${data.sheetsCleaned.toLocaleString()} sheets</strong> and made every stay feel like home.`
      };
    case 'HOSTAI':
      return {
        title: "Onward.",
        subtitle: "The future of hospitality is here.",
        summary: `We powered over <strong>${(data.totalPropertiesManaged / 1000).toFixed(0)}k properties</strong> this year, processing <strong>${formatMoney(data.platformGlobalRevenue)}</strong> in value and handling <strong>${(data.aiConversationsHandled / 1000000).toFixed(1)}M conversations</strong>.`
      };
    default:
      return {
        title: "That's\na wrap.",
        subtitle: "Here's to another great year ahead.",
        summary: `You welcomed <strong>${data.totalGuests.toLocaleString()} guests</strong>, maintained <strong>${data.occupancyRate}% occupancy</strong>, increased direct bookings by <strong>${data.directBookingIncrease}%</strong>, earned <strong>${data.fiveStarReviewsEarned} 5-star reviews</strong>, and contributed an estimated <strong>${formatMoney(data.economicImpact)}</strong> to the local economy. Well done!`
      };
  }
};

export const OutroSlide: React.FC<OutroSlideProps> = ({ audience, data }) => {
  const content = getContent(audience, data);

  return (
    <div className="flex flex-col h-full px-8 pt-24 pb-28">
      {/* Header */}
      <div className="animate-fade-in mb-4">
        <h2 className={`${typography.hero} text-white mb-2 whitespace-pre-line`}>
          {content.title}
        </h2>
        <p className={`${typography.body} text-white/70`}>{content.subtitle}</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Content Area - Summary */}
      <div className="animate-slide-up">
        <h3 className={`${typography.sublabel} mb-3 uppercase tracking-wider`}>Year in Review</h3>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div
              className={`${typography.body} text-white/80 leading-relaxed
              [&>strong]:text-white
              [&>strong]:font-bold
              [&>strong]:italic
              [&>strong]:text-lg
              [&>strong]:font-serif
              [&>strong]:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
              dangerouslySetInnerHTML={{ __html: content.summary }}
            />
        </div>
      </div>

      {/* CTA Button - Same style as Intro */}
      <div className="animate-slide-up flex justify-center mt-6" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-5 pr-2 py-2 cursor-pointer hover:bg-white/20 transition-colors shadow-lg">
            <span className={`${typography.button} text-white`}>Share This Story</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </div>
      </div>
    </div>
  );
};

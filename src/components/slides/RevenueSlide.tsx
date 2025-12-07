'use client';

import React from 'react';
import { HostData, Audience } from '@/lib/types';
import { typography } from '@/lib/design-system';
import { GuestMapSlide } from './GuestMapSlide';

interface StatsSlideProps {
  data: HostData;
  audience: Audience;
}

export const StatsSlide: React.FC<StatsSlideProps> = ({ data, audience }) => {

  const renderOwnerView = () => (
    <>
      <div className="animate-slide-up">
        <div className={`inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full ${typography.label} mb-6 backdrop-blur-sm`}>
          Annual Performance
        </div>
        <h2 className={`${typography.hero} mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60`}>
          ${(data.totalRevenue / 1000).toFixed(0)}k
        </h2>
        <p className={`${typography.body} text-white/60 mb-8`}>
          Total Revenue Generated
        </p>
      </div>

      <div className="animate-slide-up grid grid-cols-2 gap-4" style={{ animationDelay: '0.2s' }}>
           {/* Direct Bookings YoY */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                 <div className={typography.stat}>+{data.directBookingIncrease}%</div>
                 <div className="text-emerald-400 bg-emerald-500/20 rounded-full p-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                 </div>
              </div>
              <div className={typography.sublabel}>Direct Bookings YoY</div>
           </div>

           {/* Occupancy Rate */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className={`${typography.stat} mb-1`}>{data.occupancyRate}%</div>
              <div className={typography.sublabel}>Occupancy Rate</div>
           </div>

           {/* Economic Impact */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm col-span-2 flex items-center justify-between">
              <div>
                <div className={`${typography.stat} mb-1`}>${(data.economicImpact / 1000000).toFixed(1)}M</div>
                <div className={typography.sublabel}>Local Economic Contribution</div>
              </div>
              <div className="text-3xl opacity-20">🏙️</div>
           </div>

           {/* Nights Booked */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="text-xl">🌙</div>
              <div>
                <div className={typography.stat}>{data.totalNights.toLocaleString()}</div>
                <div className={typography.sublabel}>Nights Booked</div>
              </div>
           </div>

           {/* Website Visits */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="text-xl">🌐</div>
              <div>
                <div className={typography.stat}>{(data.websiteVisits / 1000).toFixed(1)}k</div>
                <div className={typography.sublabel}>Site Visits</div>
              </div>
           </div>
      </div>
    </>
  );

  const renderGuestView = () => (
    <>
      {/* Background Map Visualization - Full opacity, visible map */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <GuestMapSlide
            data={data}
            viewMode="LOCAL"
            isPlaying={false}
            audience={audience}
            backgroundOnly={true}
            className=""
          />
      </div>
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative animate-slide-up" style={{ zIndex: 2 }}>
        <div className="flex items-center justify-between mb-6">
            <div className={`inline-block bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full ${typography.label} backdrop-blur-sm`}>
            Community Impact
            </div>
        </div>

        <h2 className={`${typography.hero} mb-6 drop-shadow-xl`}>
          More than <br/>a stay.
        </h2>
        <p className={`${typography.body} text-white/90 mb-8 drop-shadow-lg`}>
           Guests like you contributed over <span className="text-blue-400 font-bold font-serif italic">${(data.economicImpact / 1000000).toFixed(1)}M</span> to our local economy.
        </p>
        <p className={`${typography.bodySmall} text-white/60 drop-shadow-md`}>
           Thank you for supporting local.
        </p>
      </div>
    </>
  );

  const renderStaffView = () => (
    <>
      <div className="animate-slide-up">
        <div className={`inline-block bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-1.5 rounded-full ${typography.label} mb-6 backdrop-blur-sm`}>
          Impact Report
        </div>
        <h2 className={`${typography.hero} mb-6`}>
          The Magic <br/>Makers.
        </h2>

        <div className="grid grid-cols-2 gap-4">
            {/* Hours */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">🧹</div>
                <div>
                    <div className={typography.stat}>{data.cleaningHours.toLocaleString()}</div>
                    <div className={typography.sublabel}>Hours of Service</div>
                </div>
            </div>

            {/* Reviews */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">⭐</div>
                <div>
                    <div className={typography.stat}>{data.fiveStarReviewsEarned}</div>
                    <div className={typography.sublabel}>5-Star Reviews</div>
                </div>
            </div>

             {/* Sheets */}
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">🧺</div>
                <div>
                    <div className={typography.stat}>{data.sheetsCleaned.toLocaleString()}</div>
                    <div className={typography.sublabel}>Sheets Cleaned</div>
                </div>
            </div>

             {/* Batteries */}
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">🔋</div>
                <div>
                    <div className={typography.stat}>{data.batteriesReplaced}</div>
                    <div className={typography.sublabel}>Batteries Replaced</div>
                </div>
            </div>
        </div>
      </div>
    </>
  );

  const renderHostAIView = () => (
    <>
      <div className="animate-slide-up">
        <div className={`inline-block bg-white/20 text-white border border-white/30 px-4 py-1.5 rounded-full ${typography.label} mb-6 backdrop-blur-sm`}>
          Network Scale
        </div>
        <h2 className={`${typography.hero} mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60`}>
          ${(data.platformGlobalRevenue / 1000000).toFixed(0)}M
        </h2>
        <p className={`${typography.body} text-white/60 mb-8`}>
          Total Booking Value Processed
        </p>
      </div>

      <div className="animate-slide-up grid grid-cols-2 gap-4" style={{ animationDelay: '0.2s' }}>
           {/* AI Conversations */}
           <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm col-span-2">
              <div className={`${typography.title} mb-1 text-blue-400`}>
                {(data.aiConversationsHandled / 1000000).toFixed(1)}M
              </div>
              <div className={typography.sublabel}>AI Conversations Handled</div>
              <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[80%]"></div>
              </div>
           </div>

           {/* Properties */}
           <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className={`${typography.stat} mb-1`}>{(data.totalPropertiesManaged / 1000).toFixed(1)}k</div>
              <div className={typography.sublabel}>Properties Managed</div>
           </div>

            {/* Countries */}
           <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className={`${typography.stat} mb-1`}>85+</div>
              <div className={typography.sublabel}>Countries Active</div>
           </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-full justify-center px-8 pb-20 relative">
      <div className="space-y-12">
        {audience === 'OWNER' && renderOwnerView()}
        {audience === 'GUEST' && renderGuestView()}
        {audience === 'STAFF' && renderStaffView()}
        {audience === 'HOSTAI' && renderHostAIView()}
      </div>
    </div>
  );
};

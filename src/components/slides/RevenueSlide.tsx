'use client';

import React from 'react';
import { HostData, Audience } from '@/lib/types';
import { GuestMapSlide } from './GuestMapSlide';

interface StatsSlideProps {
  data: HostData;
  audience: Audience;
}

export const StatsSlide: React.FC<StatsSlideProps> = ({ data, audience }) => {

  const renderOwnerView = () => (
    <>
      <div className="animate-slide-up">
        <div className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm font-sans">
          Annual Performance
        </div>
        <h2 className="text-6xl md:text-7xl font-serif font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          ${(data.totalRevenue / 1000).toFixed(0)}k
        </h2>
        <p className="text-lg text-white/60 leading-relaxed mb-8 font-sans">
          Total Revenue Generated
        </p>
      </div>

      <div className="animate-slide-up grid grid-cols-2 gap-4 font-sans" style={{ animationDelay: '0.2s' }}>
           {/* Direct Bookings YoY */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                 <div className="text-2xl font-bold tracking-tight">+{data.directBookingIncrease}%</div>
                 <div className="text-emerald-400 bg-emerald-500/20 rounded-full p-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                 </div>
              </div>
              <div className="text-[9px] uppercase tracking-wider text-white/50">Direct Bookings YoY</div>
           </div>

           {/* Occupancy Rate */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-bold mb-1 tracking-tight">{data.occupancyRate}%</div>
              <div className="text-[9px] uppercase tracking-wider text-white/50">Occupancy Rate</div>
           </div>

           {/* Economic Impact */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm col-span-2 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold mb-1 tracking-tight">${(data.economicImpact / 1000000).toFixed(1)}M</div>
                <div className="text-[9px] uppercase tracking-wider text-white/50">Local Economic Contribution</div>
              </div>
              <div className="text-3xl opacity-20">🏙️</div>
           </div>

           {/* Nights Booked */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="text-xl">🌙</div>
              <div>
                <div className="text-xl font-bold tracking-tight">{data.totalNights.toLocaleString()}</div>
                <div className="text-[9px] uppercase tracking-wider text-white/50">Nights Booked</div>
              </div>
           </div>

           {/* Website Visits */}
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="text-xl">🌐</div>
              <div>
                <div className="text-xl font-bold tracking-tight">{(data.websiteVisits / 1000).toFixed(1)}k</div>
                <div className="text-[9px] uppercase tracking-wider text-white/50">Site Visits</div>
              </div>
           </div>
      </div>
    </>
  );

  const renderGuestView = () => (
    <>
      {/* Background Map Visualization - Embedded directly for Guest Impact */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <GuestMapSlide
            data={data}
            viewMode="LOCAL"
            isPlaying={true}
            audience={audience}
            hideHeader={true}
            className="w-full h-full opacity-40"
          />
      </div>
      {/* Gradient overlay - separate layer above map */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative animate-slide-up" style={{ zIndex: 2 }}>
        <div className="flex items-center justify-between mb-6">
            <div className="inline-block bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm font-sans">
            Community Impact
            </div>
        </div>

        <h2 className="text-6xl md:text-7xl font-serif font-bold tracking-tighter mb-6 leading-[0.9] drop-shadow-xl">
          More than <br/>a stay.
        </h2>
        <p className="text-xl font-sans font-light text-white/90 leading-relaxed mb-8 drop-shadow-lg">
           Guests like you contributed over <span className="text-blue-400 font-bold font-serif italic text-2xl">${(data.economicImpact / 1000000).toFixed(1)}M</span> to our local economy.
        </p>
        <p className="text-lg font-sans font-light text-white/60 leading-relaxed mb-8 drop-shadow-md">
           We&apos;re incredibly thankful for you choosing to support local.
        </p>
      </div>

      <div className="relative animate-slide-up grid grid-cols-2 gap-4 font-sans" style={{ animationDelay: '0.2s', zIndex: 2 }}>
          {/* Local Shops */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
              <div className="text-2xl font-bold mb-1 tracking-tight">{data.localBusinessesSupported}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Small Businesses Supported</div>
          </div>
          {/* Coffees */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
              <div className="text-2xl font-bold mb-1 tracking-tight">{data.communityCoffeeCount.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Local Coffees Poured</div>
          </div>
      </div>
    </>
  );

  const renderStaffView = () => (
    <>
      <div className="animate-slide-up">
        <div className="inline-block bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm font-sans">
          Impact Report
        </div>
        <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter mb-6">
          The Magic <br/>Makers.
        </h2>

        <div className="grid grid-cols-2 gap-4 font-sans">
            {/* Hours */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm">🧹</div>
                <div>
                    <div className="text-2xl font-bold tracking-tight">{data.cleaningHours.toLocaleString()}</div>
                    <div className="text-[9px] uppercase tracking-wider text-white/50">Hours of Service</div>
                </div>
            </div>

            {/* Reviews */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-sm">⭐</div>
                <div>
                    <div className="text-2xl font-bold tracking-tight">{data.fiveStarReviewsEarned}</div>
                    <div className="text-[9px] uppercase tracking-wider text-white/50">5-Star Reviews</div>
                </div>
            </div>

             {/* Sheets */}
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-sm">🧺</div>
                <div>
                    <div className="text-2xl font-bold tracking-tight">{data.sheetsCleaned.toLocaleString()}</div>
                    <div className="text-[9px] uppercase tracking-wider text-white/50">Sheets Cleaned</div>
                </div>
            </div>

             {/* Batteries */}
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between h-28">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-sm">🔋</div>
                <div>
                    <div className="text-2xl font-bold tracking-tight">{data.batteriesReplaced}</div>
                    <div className="text-[9px] uppercase tracking-wider text-white/50">Batteries Replaced</div>
                </div>
            </div>
        </div>
      </div>
    </>
  );

  const renderHostAIView = () => (
    <>
      <div className="animate-slide-up">
        <div className="inline-block bg-white/20 text-white border border-white/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm font-sans">
          Network Scale
        </div>
        <h2 className="text-6xl md:text-7xl font-serif font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          ${(data.platformGlobalRevenue / 1000000).toFixed(0)}M
        </h2>
        <p className="text-lg text-white/60 leading-relaxed mb-8 font-sans">
          Total Booking Value Processed
        </p>
      </div>

      <div className="animate-slide-up grid grid-cols-2 gap-4 font-sans" style={{ animationDelay: '0.2s' }}>
           {/* AI Conversations */}
           <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm col-span-2">
              <div className="text-3xl font-bold mb-1 tracking-tight text-blue-400">
                {(data.aiConversationsHandled / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">AI Conversations Handled</div>
              <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[80%]"></div>
              </div>
           </div>

           {/* Properties */}
           <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-bold mb-1 tracking-tight">{(data.totalPropertiesManaged / 1000).toFixed(1)}k</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Properties Managed</div>
           </div>

            {/* Countries */}
           <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-bold mb-1 tracking-tight">85+</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Countries Active</div>
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

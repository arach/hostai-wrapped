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
      {/* Dark background with subtle grid */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-6 animate-fade-in">
        <h2 className={`${typography.hero} text-white mb-2`}>
          Your year<br/>in numbers.
        </h2>
        <p className={`${typography.body} text-white/70`}>It pays to be direct 💸</p>
      </div>

      {/* Big Revenue Number */}
      <div className="relative z-10 animate-slide-up">
        <div className={`text-5xl font-bold tracking-tight text-white`}>
          ${(data.totalRevenue / 1000).toFixed(0)}k
        </div>
        <div className={typography.sublabel}>Total Revenue</div>
        <div className="mt-2 text-emerald-400 text-sm font-medium">
          You saved ${(data.otaSavings / 1000).toFixed(0)}k in OTA fees
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Content Area - Stats Grid */}
      <div className="animate-slide-up relative z-10" style={{ animationDelay: '0.2s' }}>
        <h3 className={`${typography.sublabel} mb-3 uppercase tracking-wider`}>Key Metrics</h3>
        {/* Grid container */}
        <div className="grid grid-cols-2 relative">
          {/* Extending lines (light gray) */}
          <div className="absolute left-[-2rem] right-[-2rem] top-0 h-px bg-white/5" />
          <div className="absolute left-[-2rem] right-[-2rem] bottom-0 h-px bg-white/5" />
          <div className="absolute left-1/2 top-[-1rem] bottom-[-1rem] w-px bg-white/5" />

          {/* Row 1 */}
          <div className="p-4 border-b border-r border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <div className={typography.stat}>+{data.directBookingIncrease}%</div>
              <div className="text-emerald-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
            <div className={typography.sublabel}>Direct Bookings YoY</div>
          </div>

          <div className="p-4 border-b border-white/20">
            <div className={`${typography.stat} mb-1`}>{data.occupancyRate}%</div>
            <div className={typography.sublabel}>Occupancy Rate</div>
          </div>

          {/* Row 2 - Biggest Booking */}
          <div className="p-4 border-b border-white/20 col-span-2">
            <div className={`${typography.stat} mb-1`}>${data.biggestBooking.amount.toLocaleString()}</div>
            <div className={typography.sublabel}>Biggest booking · {data.biggestBooking.nights} nights 🐋</div>
          </div>

          {/* Row 3 */}
          <div className="p-4 border-r border-white/20">
            <div className={typography.stat}>{data.totalNights.toLocaleString()}</div>
            <div className={typography.sublabel}>Nights Booked</div>
          </div>

          <div className="p-4">
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
      {/* Dark background with subtle grid - matching Owner stats */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-6 animate-fade-in">
        <h2 className={`${typography.hero} text-white mb-2`}>
          The year<br/>in service.
        </h2>
        <p className={`${typography.body} text-white/70`}>Behind every 5-star review.</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Content Area - Stats Grid */}
      <div className="animate-slide-up relative z-10" style={{ animationDelay: '0.2s' }}>
        <h3 className={`${typography.sublabel} mb-3 uppercase tracking-wider`}>Your Impact</h3>
        {/* Grid container */}
        <div className="grid grid-cols-2 relative">
          {/* Extending lines */}
          <div className="absolute left-[-2rem] right-[-2rem] top-0 h-px bg-white/5" />
          <div className="absolute left-[-2rem] right-[-2rem] bottom-0 h-px bg-white/5" />
          <div className="absolute left-1/2 top-[-1rem] bottom-[-1rem] w-px bg-white/5" />

          {/* Row 1 */}
          <div className="p-4 border-b border-r border-white/20">
            <div className={`${typography.stat} mb-1`}>{data.cleaningHours.toLocaleString()}</div>
            <div className={typography.sublabel}>Hours of Service 🧹</div>
          </div>

          <div className="p-4 border-b border-white/20">
            <div className={`${typography.stat} mb-1`}>{data.fiveStarReviewsEarned}</div>
            <div className={typography.sublabel}>5-Star Reviews ⭐</div>
          </div>

          {/* Row 2 */}
          <div className="p-4 border-r border-white/20">
            <div className={typography.stat}>{data.sheetsCleaned.toLocaleString()}</div>
            <div className={typography.sublabel}>Sheets Cleaned 🧺</div>
          </div>

          <div className="p-4">
            <div className={typography.stat}>{data.batteriesReplaced}</div>
            <div className={typography.sublabel}>Batteries Replaced 🔋</div>
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
        <h2 className={`${typography.hero} mb-4 text-white pt-1`}>
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
    <div className="flex flex-col h-full px-8 pt-24 pb-28 relative">
      {audience === 'OWNER' && renderOwnerView()}
      {audience === 'GUEST' && renderGuestView()}
      {audience === 'STAFF' && renderStaffView()}
      {audience === 'HOSTAI' && renderHostAIView()}
    </div>
  );
};

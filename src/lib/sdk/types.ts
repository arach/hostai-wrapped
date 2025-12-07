// ============================================================================
// HostAI Wrapped SDK - Data Types
// ============================================================================

// Scope types - determines what data is included
export type WrappedScope = 'owner' | 'guest' | 'staff' | 'hostai';

// Base shared fields
interface BaseWrappedData {
  id: string;           // UUID for this wrapped instance
  scope: WrappedScope;
  year: number;
  generatedAt: string;  // ISO timestamp
  propertyName: string;
  propertyLocation: {
    coordinates: [number, number]; // [lon, lat]
    city: string;
    region: string;
  };
}

// ============================================================================
// OWNER SCOPE - Full business metrics for property owners
// ============================================================================
export interface OwnerWrappedData extends BaseWrappedData {
  scope: 'owner';

  // Revenue & Business
  totalRevenue: number;
  otaSavings: number;
  directBookingIncrease: number; // percentage YoY
  occupancyRate: number;         // percentage

  // Volume
  totalGuests: number;
  totalNights: number;
  websiteVisits: number;

  // Operations
  sheetsCleaned: number;
  toiletriesRestocked: number;
  batteriesReplaced: number;

  // Impact
  economicImpact: number;
  localBusinessesSupported: number;

  // Highlights
  busiestDate: string;
  biggestBooking: {
    amount: number;
    nights: number;
    propertyName: string;
  };
  topSearchTerm: string;

  // Monthly breakdown
  monthlyData: Array<{
    month: string;
    occupancy: number;
    revenue: number;
  }>;

  // Guest origins for map
  guestOrigins: Array<{
    city: string;
    country: string;
    count: number;
    coordinates: [number, number];
  }>;

  // Spotlight review
  spotlightReview: {
    guestName: string;
    text: string;
    rating: number;
    propertyName: string;
  };
}

// ============================================================================
// GUEST SCOPE - Personalized guest journey data
// ============================================================================
export interface GuestWrappedData extends BaseWrappedData {
  scope: 'guest';

  // Guest identity
  guestName: string;

  // Their journey
  origin: {
    city: string;
    coordinates: [number, number];
  };
  stayDates: {
    checkIn: string;  // ISO date
    checkOut: string;
  };
  nightsStayed: number;

  // Their impact
  localSpend: number;           // Estimated local economic contribution
  savedVsHotel: number;         // What they saved vs traditional hotel
  coffeesPoured: number;        // Fun stat

  // Community context (anonymized aggregate)
  communityImpact: {
    totalEconomicImpact: number;
    localBusinessesSupported: number;
    totalGuestsThisYear: number;
  };

  // Their review (if they left one)
  theirReview?: {
    text: string;
    rating: number;
  };
}

// ============================================================================
// STAFF SCOPE - Operations team appreciation data
// ============================================================================
export interface StaffWrappedData extends BaseWrappedData {
  scope: 'staff';

  // Staff identity
  staffName: string;
  role: string;

  // Their contributions
  cleaningHours: number;
  turnoversCompleted: number;
  fiveStarReviewsEarned: number;
  maintenanceResolved: number;

  // Fun stats
  sheetsChanged: number;
  towelsFolded: number;
  batteriesReplaced: number;

  // Recognition
  guestCompliments: Array<{
    text: string;
    date: string;
  }>;

  // Team context
  teamStats: {
    totalCleaningHours: number;
    totalFiveStarReviews: number;
    propertiesManaged: number;
  };
}

// ============================================================================
// HOSTAI SCOPE - Platform-wide metrics (for HostAI brand)
// ============================================================================
export interface HostAIWrappedData extends BaseWrappedData {
  scope: 'hostai';

  // Platform scale
  totalPropertiesManaged: number;
  totalBookingValue: number;
  countriesActive: number;

  // AI metrics
  aiConversationsHandled: number;
  averageResponseTime: number;    // seconds
  guestSatisfactionScore: number; // percentage

  // Impact
  hostRevenueEnabled: number;
  guestNightsBooked: number;

  // Growth
  yoyGrowth: {
    properties: number;    // percentage
    bookings: number;
    aiConversations: number;
  };

  // Top markets
  topMarkets: Array<{
    city: string;
    country: string;
    properties: number;
    coordinates: [number, number];
  }>;
}

// Union type for all wrapped data
export type WrappedData =
  | OwnerWrappedData
  | GuestWrappedData
  | StaffWrappedData
  | HostAIWrappedData;

// Type guard helpers
export function isOwnerData(data: WrappedData): data is OwnerWrappedData {
  return data.scope === 'owner';
}

export function isGuestData(data: WrappedData): data is GuestWrappedData {
  return data.scope === 'guest';
}

export function isStaffData(data: WrappedData): data is StaffWrappedData {
  return data.scope === 'staff';
}

export function isHostAIData(data: WrappedData): data is HostAIWrappedData {
  return data.scope === 'hostai';
}

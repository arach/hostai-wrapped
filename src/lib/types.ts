export type Audience = 'OWNER' | 'GUEST' | 'STAFF' | 'HOSTAI';

export interface HostData {
  hostName: string;
  year: number;

  // Owner Stats
  totalGuests: number;
  totalNights: number;
  totalRevenue: number;
  otaSavings: number;
  websiteVisits: number;
  sheetsCleaned: number;
  toiletriesRestocked: number;
  batteriesReplaced: number;
  economicImpact: number;

  // New Owner Business Metrics
  directBookingIncrease: number; // Percentage
  occupancyRate: number; // Percentage

  // Guest Stats (Synthetic)
  guestSavings: number;
  totalDistanceTraveled: number;
  localBusinessesSupported: number;
  communityCoffeeCount: number;

  // Staff Stats (Synthetic)
  cleaningHours: number;
  fiveStarReviewsEarned: number;
  maintenanceResolved: number;

  // Platform Stats (Synthetic)
  platformGlobalRevenue: number;
  aiConversationsHandled: number;
  totalPropertiesManaged: number;

  topGuestOrigins: Array<{ city: string; country: string; count: number; coordinates: [number, number] }>;
  userOrigin?: { city: string; coordinates: [number, number] }; // The specific guest's location

  homeCoordinates: [number, number]; // [long, lat]
  topSearchTerm: string;
  busiestDate: string;
  biggestBooking: {
    amount: number;
    nights: number;
    property: string;
  };
  monthlyOccupancy: Array<{ month: string; occupancy: number; revenue: number }>;
  spotlightReview: {
    guest: string;
    text: string;
    rating: number;
    property: string;
  };
}

export enum SlideType {
  INTRO = 'INTRO',
  MAP = 'MAP',
  STATS = 'STATS',
  SEASONS = 'SEASONS',
  REVIEW = 'REVIEW',
  OUTRO = 'OUTRO'
}

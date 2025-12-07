export type Audience = 'OWNER' | 'GUEST' | 'STAFF' | 'HOSTAI';

// =============================================================================
// CONSOLIDATED DATA SCHEMA (Privacy-First)
// =============================================================================
// One JSON file per property manager, containing all audience data.
// No PII stored - guests and staff identified by one-way email hashes.
// =============================================================================

/** Location coordinates [longitude, latitude] */
export type Coordinates = [number, number];

/** Geographic location with optional coordinates */
export interface GeoLocation {
  city: string;
  region?: string;
  country?: string;
  coordinates: Coordinates;
}

/** Monthly performance data point */
export interface MonthlyDataPoint {
  month: string;
  occupancy: number;
  revenue: number;
}

/** Guest origin aggregation for map visualization */
export interface GuestOrigin {
  city: string;
  country: string;
  count: number;
  coordinates: Coordinates;
}

/** A guest review */
export interface Review {
  text: string;
  rating: number;
  date?: string;
}

/** Spotlight review with property context */
export interface SpotlightReview extends Review {
  guestHash?: string;  // Optional link to guest (hashed)
  propertyName?: string;
}

// -----------------------------------------------------------------------------
// GUEST DATA (No PII - identified by hash only)
// -----------------------------------------------------------------------------
export interface GuestRecord {
  // Origin (city-level only, no address)
  origin: GeoLocation;

  // Stay information
  stayDates: {
    checkIn: string;  // ISO date
    checkOut: string; // ISO date
  };
  nightsStayed: number;
  propertyName?: string;

  // Impact metrics
  localSpend?: number;
  savedVsHotel?: number;
  coffeesPoured?: number;

  // Their review (if any)
  theirReview?: Review;
}

/** Hashmap of guest records keyed by hash(email) */
export type GuestRecords = Record<string, GuestRecord>;

// -----------------------------------------------------------------------------
// STAFF DATA (No PII - identified by hash only)
// -----------------------------------------------------------------------------
export interface StaffRecord {
  role: string;

  // Performance metrics
  cleaningHours?: number;
  turnoversCompleted?: number;
  fiveStarReviewsEarned?: number;
  maintenanceResolved?: number;

  // Fun stats
  sheetsChanged?: number;
  towelsFolded?: number;
  batteriesReplaced?: number;

  // Guest compliments (dates only, no guest names)
  guestCompliments?: Array<{ text: string; date: string }>;
}

/** Hashmap of staff records keyed by hash(email) */
export type StaffRecords = Record<string, StaffRecord>;

// -----------------------------------------------------------------------------
// OWNER/PROPERTY MANAGER DATA
// -----------------------------------------------------------------------------
export interface OwnerData {
  propertyName: string;
  propertyLocation: GeoLocation;

  // Revenue metrics
  totalRevenue: number;
  otaSavings?: number;
  directBookingIncrease: number;  // Percentage YoY

  // Occupancy metrics
  occupancyRate: number;          // Percentage
  totalGuests: number;
  totalNights: number;

  // Digital presence
  websiteVisits?: number;
  topSearchTerm?: string;

  // Operations
  sheetsCleaned?: number;
  toiletriesRestocked?: number;
  batteriesReplaced?: number;

  // Community impact
  economicImpact: number;
  localBusinessesSupported: number;

  // Highlights
  busiestDate: string;
  biggestBooking?: {
    amount: number;
    nights: number;
    propertyName: string;
  };

  // Time series data
  monthlyData: MonthlyDataPoint[];

  // Guest demographics (aggregated, no PII)
  guestOrigins: GuestOrigin[];

  // Featured review
  spotlightReview?: SpotlightReview;
}

// -----------------------------------------------------------------------------
// CONSOLIDATED PROPERTY MANAGER FILE
// -----------------------------------------------------------------------------
/**
 * Single consolidated file per property manager.
 * Filename: {pmHash}.json (e.g., "a7f3c2.json")
 */
export interface PropertyManagerData {
  /** Hashed property manager ID (hash of PM's email or UUID) */
  pmId: string;

  /** Report year */
  year: number;

  /** When this data was generated */
  generatedAt: string;  // ISO timestamp

  /** Owner/PM aggregate statistics */
  owner: OwnerData;

  /** Staff records keyed by hash(staff_email) */
  staff: StaffRecords;

  /** Guest records keyed by hash(guest_email) */
  guests: GuestRecords;

  /** Aggregate stats across all staff */
  staffAggregates?: {
    totalCleaningHours: number;
    totalFiveStarReviews: number;
    totalStaffCount: number;
  };

  /** Aggregate stats across all guests */
  guestAggregates?: {
    totalCoffeesPoured: number;
    totalLocalSpend: number;
    averageStayLength: number;
  };
}

// -----------------------------------------------------------------------------
// PLATFORM-WIDE DATA (HostAI Global Stats)
// -----------------------------------------------------------------------------
/**
 * Single file for HostAI platform-wide statistics.
 * Filename: platform.json
 */
export interface PlatformData {
  year: number;
  generatedAt: string;

  // Scale metrics
  totalPropertiesManaged: number;
  totalPropertyManagers: number;
  countriesActive: number;

  // Financial
  platformGlobalRevenue: number;
  totalBookingValue: number;

  // AI metrics
  aiConversationsHandled: number;
  averageResponseTime?: number;  // seconds

  // Impact
  globalEconomicImpact: number;
  totalGuestsServed: number;

  // Growth
  yoyGrowth?: number;  // Percentage

  // Featured testimonials (from PMs, anonymized)
  testimonials?: Array<{
    text: string;
    pmRegion?: string;  // e.g., "North America", not specific location
  }>;
}

// =============================================================================
// LEGACY COMPATIBILITY - HostData interface for current components
// =============================================================================
// This interface is used by current slide components.
// It can be derived from PropertyManagerData + audience context at runtime.
// =============================================================================

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

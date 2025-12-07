// ============================================================================
// Example Data Blobs - UUID-prefixed JSON for each scope
// ============================================================================

import { WrappedSDK } from './index';

// Example Owner Data
export const exampleOwnerData = WrappedSDK.generateOwnerData({
  year: 2025,
  propertyName: 'Sojourn Luxury',
  propertyLocation: {
    coordinates: [-77.0369, 38.9072],
    city: 'Washington',
    region: 'DC',
  },

  // Revenue & Business
  totalRevenue: 900000,
  otaSavings: 158000,
  directBookingIncrease: 24,
  occupancyRate: 88,

  // Volume
  totalGuests: 842,
  totalNights: 80234,
  websiteVisits: 12405,

  // Operations
  sheetsCleaned: 3450,
  toiletriesRestocked: 1240,
  batteriesReplaced: 85,

  // Impact
  economicImpact: 1250000,
  localBusinessesSupported: 28,

  // Highlights
  busiestDate: 'May 22',
  biggestBooking: {
    amount: 36709,
    nights: 170,
    propertyName: 'Luxury Apartment steps to The Dupont Circle Metro',
  },
  topSearchTerm: 'capitol hill apartments',

  // Monthly breakdown
  monthlyData: [
    { month: 'Jan', occupancy: 65, revenue: 45000 },
    { month: 'Feb', occupancy: 70, revenue: 52000 },
    { month: 'Mar', occupancy: 85, revenue: 78000 },
    { month: 'Apr', occupancy: 92, revenue: 89000 },
    { month: 'May', occupancy: 98, revenue: 95000 },
    { month: 'Jun', occupancy: 95, revenue: 92000 },
    { month: 'Jul', occupancy: 88, revenue: 85000 },
    { month: 'Aug', occupancy: 80, revenue: 75000 },
    { month: 'Sep', occupancy: 90, revenue: 88000 },
    { month: 'Oct', occupancy: 94, revenue: 91000 },
    { month: 'Nov', occupancy: 82, revenue: 70000 },
    { month: 'Dec', occupancy: 75, revenue: 60000 },
  ],

  // Guest origins
  guestOrigins: [
    { city: 'London', country: 'UK', count: 124, coordinates: [-0.1276, 51.5074] },
    { city: 'New York', country: 'USA', count: 98, coordinates: [-74.006, 40.7128] },
    { city: 'Los Angeles', country: 'USA', count: 85, coordinates: [-118.2437, 34.0522] },
    { city: 'Paris', country: 'France', count: 65, coordinates: [2.3522, 48.8566] },
    { city: 'Tokyo', country: 'Japan', count: 42, coordinates: [139.6917, 35.6895] },
  ],

  // Spotlight review
  spotlightReview: {
    guestName: 'Sarah Jenkins',
    text: "The absolute best stay we've had in DC. The attention to detail was unmatched.",
    rating: 5,
    propertyName: 'Sojourn Classic DC Rowhouse',
  },
});

// Example Guest Data
export const exampleGuestData = WrappedSDK.generateGuestData({
  year: 2025,
  propertyName: 'Sojourn Luxury',
  propertyLocation: {
    coordinates: [-77.0369, 38.9072],
    city: 'Washington',
    region: 'DC',
  },

  guestName: 'Alex Chen',
  origin: {
    city: 'San Francisco',
    coordinates: [-122.4194, 37.7749],
  },
  stayDates: {
    checkIn: '2025-03-15',
    checkOut: '2025-03-22',
  },
  nightsStayed: 7,

  localSpend: 1840,
  savedVsHotel: 420,
  coffeesPoured: 14,

  communityImpact: {
    totalEconomicImpact: 1250000,
    localBusinessesSupported: 28,
    totalGuestsThisYear: 842,
  },

  theirReview: {
    text: 'Amazing location and beautiful space. Will definitely be back!',
    rating: 5,
  },
});

// Example Staff Data
export const exampleStaffData = WrappedSDK.generateStaffData({
  year: 2025,
  propertyName: 'Sojourn Luxury',
  propertyLocation: {
    coordinates: [-77.0369, 38.9072],
    city: 'Washington',
    region: 'DC',
  },

  staffName: 'Maria Garcia',
  role: 'Lead Housekeeper',

  cleaningHours: 1240,
  turnoversCompleted: 312,
  fiveStarReviewsEarned: 89,
  maintenanceResolved: 45,

  sheetsChanged: 1872,
  towelsFolded: 3744,
  batteriesReplaced: 28,

  guestCompliments: [
    { text: 'Room was spotless!', date: '2025-04-12' },
    { text: 'Best turnover service ever', date: '2025-06-23' },
    { text: 'The attention to detail is incredible', date: '2025-09-05' },
  ],

  teamStats: {
    totalCleaningHours: 2150,
    totalFiveStarReviews: 148,
    propertiesManaged: 12,
  },
});

// Example HostAI Data
export const exampleHostAIData = WrappedSDK.generateHostAIData({
  year: 2025,
  propertyName: 'HostAI Platform',
  propertyLocation: {
    coordinates: [-122.4194, 37.7749],
    city: 'San Francisco',
    region: 'CA',
  },

  totalPropertiesManaged: 12500,
  totalBookingValue: 450000000,
  countriesActive: 85,

  aiConversationsHandled: 2500000,
  averageResponseTime: 1.2,
  guestSatisfactionScore: 94,

  hostRevenueEnabled: 380000000,
  guestNightsBooked: 8500000,

  yoyGrowth: {
    properties: 45,
    bookings: 62,
    aiConversations: 180,
  },

  topMarkets: [
    { city: 'Miami', country: 'USA', properties: 1250, coordinates: [-80.1918, 25.7617] },
    { city: 'Los Angeles', country: 'USA', properties: 980, coordinates: [-118.2437, 34.0522] },
    { city: 'London', country: 'UK', properties: 720, coordinates: [-0.1276, 51.5074] },
    { city: 'Dubai', country: 'UAE', properties: 650, coordinates: [55.2708, 25.2048] },
    { city: 'Paris', country: 'France', properties: 580, coordinates: [2.3522, 48.8566] },
  ],
});

// ============================================================================
// Export as JSON strings (ready to save to files)
// ============================================================================

export const exampleJSONs = {
  owner: WrappedSDK.export(exampleOwnerData),
  guest: WrappedSDK.export(exampleGuestData),
  staff: WrappedSDK.export(exampleStaffData),
  hostai: WrappedSDK.export(exampleHostAIData),
};

// Log examples (for development)
if (typeof window !== 'undefined') {
  console.log('HostAI Wrapped SDK - Example Data:');
  console.log('Owner ID:', exampleOwnerData.id);
  console.log('Guest ID:', exampleGuestData.id);
  console.log('Staff ID:', exampleStaffData.id);
  console.log('HostAI ID:', exampleHostAIData.id);
}

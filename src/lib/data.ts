import { HostData } from './types';
import { hashHostId } from './hash';

// Sample host data keyed by hash
export const sampleHostsData: Record<string, HostData> = {};

export const mockHostData: HostData = {
  hostName: "Horizon Stays",
  year: 2025,
  totalGuests: 756,
  totalNights: 68420,
  totalRevenue: 824000,
  otaSavings: 142000,

  // New Owner Business Metrics
  directBookingIncrease: 28,
  occupancyRate: 84,

  // New Stats
  websiteVisits: 10892,
  sheetsCleaned: 2980,
  toiletriesRestocked: 1085,
  batteriesReplaced: 72,
  economicImpact: 1180000,

  // Synthetic Data for different audiences
  guestSavings: 215, // Average saving per guest
  totalDistanceTraveled: 1089450, // km
  cleaningHours: 1920,
  fiveStarReviewsEarned: 134,
  maintenanceResolved: 298,
  localBusinessesSupported: 24,
  communityCoffeeCount: 2890,
  guestConversationsHandled: 4280, // AI-handled guest chats for this host

  // Platform Stats
  platformGlobalRevenue: 520000000,
  aiConversationsHandled: 3200000,
  totalPropertiesManaged: 14800,

  homeCoordinates: [-77.0369, 38.9072], // Washington DC

  // Specific Guest User (for map highlight)
  userOrigin: { city: "Austin", coordinates: [-97.7431, 30.2672] },

  topGuestOrigins: [
    { city: "London", country: "UK", count: 124, coordinates: [-0.1276, 51.5074] },
    { city: "New York", country: "USA", count: 98, coordinates: [-74.0060, 40.7128] },
    { city: "Los Angeles", country: "USA", count: 85, coordinates: [-118.2437, 34.0522] },
    { city: "Paris", country: "France", count: 65, coordinates: [2.3522, 48.8566] },
    { city: "Tokyo", country: "Japan", count: 42, coordinates: [139.6917, 35.6895] },
    { city: "Sydney", country: "Australia", count: 12, coordinates: [151.2093, -33.8688] },
    { city: "Dubai", country: "UAE", count: 22, coordinates: [55.2708, 25.2048] },
    { city: "Berlin", country: "Germany", count: 34, coordinates: [13.4050, 52.5200] },
    { city: "Toronto", country: "Canada", count: 56, coordinates: [-79.3832, 43.6532] },
    { city: "Singapore", country: "Singapore", count: 18, coordinates: [103.8198, 1.3521] },
    { city: "Mumbai", country: "India", count: 15, coordinates: [72.8777, 19.0760] },
    { city: "Rio de Janeiro", country: "Brazil", count: 10, coordinates: [-43.1729, -22.9068] },
    { city: "Cape Town", country: "South Africa", count: 8, coordinates: [18.4232, -33.9249] },
    { city: "Rome", country: "Italy", count: 28, coordinates: [12.4964, 41.9028] },
    { city: "Madrid", country: "Spain", count: 24, coordinates: [-3.7038, 40.4168] },
    { city: "Chicago", country: "USA", count: 45, coordinates: [-87.6298, 41.8781] },
    { city: "San Francisco", country: "USA", count: 62, coordinates: [-122.4194, 37.7749] },
    { city: "Miami", country: "USA", count: 38, coordinates: [-80.1918, 25.7617] },
    { city: "Seattle", country: "USA", count: 29, coordinates: [-122.3321, 47.6062] },
    { city: "Boston", country: "USA", count: 51, coordinates: [-71.0589, 42.3601] },
    { city: "Austin", country: "USA", count: 22, coordinates: [-97.7431, 30.2672] },
    { city: "Denver", country: "USA", count: 19, coordinates: [-104.9903, 39.7392] },
    { city: "Vancouver", country: "Canada", count: 25, coordinates: [-123.1207, 49.2827] },
    { city: "Mexico City", country: "Mexico", count: 14, coordinates: [-99.1332, 19.4326] },
    { city: "Dublin", country: "Ireland", count: 16, coordinates: [-6.2603, 53.3498] },
    { city: "Amsterdam", country: "Netherlands", count: 31, coordinates: [4.9041, 52.3676] },
    { city: "Stockholm", country: "Sweden", count: 12, coordinates: [18.0686, 59.3293] },
    { city: "Seoul", country: "South Korea", count: 20, coordinates: [126.9780, 37.5665] },
    { city: "Bangkok", country: "Thailand", count: 14, coordinates: [100.5018, 13.7563] },
    { city: "Istanbul", country: "Turkey", count: 11, coordinates: [28.9784, 41.0082] },
    { city: "Zurich", country: "Switzerland", count: 18, coordinates: [8.5417, 47.3769] },
    { city: "Copenhagen", country: "Denmark", count: 9, coordinates: [12.5683, 55.6761] },
    { city: "Vienna", country: "Austria", count: 11, coordinates: [16.3738, 48.2082] },
    { city: "Lisbon", country: "Portugal", count: 13, coordinates: [-9.1393, 38.7223] },
    { city: "Hong Kong", country: "China", count: 24, coordinates: [114.1694, 22.3193] },
    { city: "Buenos Aires", country: "Argentina", count: 7, coordinates: [-58.3816, -34.6037] },
    { city: "Montreal", country: "Canada", count: 22, coordinates: [-73.5673, 45.5017] },
    { city: "Brussels", country: "Belgium", count: 14, coordinates: [4.3517, 50.8503] },
    { city: "Munich", country: "Germany", count: 19, coordinates: [11.5820, 48.1351] },
    { city: "Barcelona", country: "Spain", count: 23, coordinates: [2.1734, 41.3851] },
    { city: "Prague", country: "Czechia", count: 15, coordinates: [14.4378, 50.0755] },
    { city: "Budapest", country: "Hungary", count: 12, coordinates: [19.0402, 47.4979] },
    { city: "Warsaw", country: "Poland", count: 10, coordinates: [21.0122, 52.2297] },
    { city: "Oslo", country: "Norway", count: 8, coordinates: [10.7522, 59.9139] },
    { city: "Helsinki", country: "Finland", count: 7, coordinates: [24.9384, 60.1699] },
    { city: "Athens", country: "Greece", count: 16, coordinates: [23.7275, 37.9838] },
    { city: "Tel Aviv", country: "Israel", count: 20, coordinates: [34.7818, 32.0853] },
    { city: "Cairo", country: "Egypt", count: 9, coordinates: [31.2357, 30.0444] },
    { city: "Shanghai", country: "China", count: 15, coordinates: [121.4737, 31.2304] },
    { city: "Beijing", country: "China", count: 12, coordinates: [116.4074, 39.9042] },
    { city: "Manila", country: "Philippines", count: 8, coordinates: [120.9842, 14.5995] },
    { city: "Jakarta", country: "Indonesia", count: 6, coordinates: [106.8456, -6.2088] },
    { city: "Kuala Lumpur", country: "Malaysia", count: 7, coordinates: [101.6869, 3.1390] },
    { city: "Melbourne", country: "Australia", count: 9, coordinates: [144.9631, -37.8136] },
    { city: "Auckland", country: "New Zealand", count: 5, coordinates: [174.7633, -36.8485] },
    { city: "Santiago", country: "Chile", count: 6, coordinates: [-70.6693, -33.4489] },
    { city: "Bogota", country: "Colombia", count: 8, coordinates: [-74.0721, 4.7110] },
    { city: "Lima", country: "Peru", count: 5, coordinates: [-77.0428, -12.0464] }
  ],
  topSearchTerm: "downtown luxury rentals",
  busiestDate: "June 14",
  biggestBooking: {
    amount: 32450,
    nights: 156,
    property: "Urban Loft with Skyline Views"
  },
  monthlyOccupancy: [
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
  spotlightReview: {
    guest: "Michael Torres",
    text: "Incredible experience from start to finish. The space was immaculate and the host communication was top-notch.",
    rating: 5,
    property: "Horizon Premier Suite"
  },

  // Local neighborhood highlights (DC area)
  localPoints: [
    { coordinates: [-77.0428, 38.9096], type: 'coffee', name: 'Compass Coffee' },
    { coordinates: [-77.0312, 38.9048], type: 'coffee', name: 'Peregrine Espresso' },
    { coordinates: [-77.0455, 38.9134], type: 'coffee', name: 'Filter Coffeehouse' },
    { coordinates: [-77.0267, 38.9002], type: 'coffee', name: 'Swings Coffee' },
    { coordinates: [-77.0398, 38.9167], type: 'coffee', name: 'The Coffee Bar' },
    { coordinates: [-77.0489, 38.9045], type: 'coffee', name: 'Emissary' },
    { coordinates: [-77.0341, 38.9078], type: 'business', name: 'Eastern Market' },
    { coordinates: [-77.0423, 38.9112], type: 'restaurant', name: 'Le Diplomate' },
    { coordinates: [-77.0356, 38.9021], type: 'restaurant', name: "Rose's Luxury" },
    { coordinates: [-77.0478, 38.9089], type: 'restaurant', name: 'Founding Farmers' },
    { coordinates: [-77.0289, 38.9056], type: 'restaurant', name: "Ted's Bulletin" },
    { coordinates: [-77.0512, 38.9023], type: 'restaurant', name: 'Commissary DC' },
    { coordinates: [-77.0334, 38.9134], type: 'business', name: 'Union Market' },
    { coordinates: [-77.0456, 38.8987], type: 'restaurant', name: 'The Smith' },
  ],
  preferredMapView: 'GLOBE', // International travelers
};

// Additional sample hosts with unique data
const coastalRetreatsData: HostData = {
  hostName: "Coastal Retreats",
  year: 2025,
  totalGuests: 1234,
  totalNights: 45000,
  totalRevenue: 1250000,
  otaSavings: 195000,
  directBookingIncrease: 35,
  occupancyRate: 91,
  websiteVisits: 25000,
  sheetsCleaned: 4500,
  toiletriesRestocked: 2100,
  batteriesReplaced: 95,
  economicImpact: 2100000,
  guestSavings: 280,
  totalDistanceTraveled: 2500000,
  cleaningHours: 3200,
  fiveStarReviewsEarned: 245,
  maintenanceResolved: 412,
  localBusinessesSupported: 38,
  communityCoffeeCount: 5200,
  guestConversationsHandled: 8500,
  platformGlobalRevenue: 520000000,
  aiConversationsHandled: 3200000,
  totalPropertiesManaged: 14800,
  homeCoordinates: [-80.1300, 25.7907], // Miami Beach
  userOrigin: { city: "Chicago", coordinates: [-87.6298, 41.8781] },
  topGuestOrigins: [
    { city: "New York", country: "USA", count: 180, coordinates: [-74.0060, 40.7128] },
    { city: "Chicago", country: "USA", count: 145, coordinates: [-87.6298, 41.8781] },
    { city: "Toronto", country: "Canada", count: 98, coordinates: [-79.3832, 43.6532] },
    { city: "London", country: "UK", count: 76, coordinates: [-0.1276, 51.5074] },
    { city: "São Paulo", country: "Brazil", count: 65, coordinates: [-46.6333, -23.5505] },
    { city: "Mexico City", country: "Mexico", count: 52, coordinates: [-99.1332, 19.4326] },
    { city: "Buenos Aires", country: "Argentina", count: 41, coordinates: [-58.3816, -34.6037] },
    { city: "Atlanta", country: "USA", count: 89, coordinates: [-84.3880, 33.7490] },
  ],
  topSearchTerm: "beachfront luxury condos",
  busiestDate: "March 15",
  biggestBooking: {
    amount: 48000,
    nights: 28,
    property: "Oceanfront Penthouse"
  },
  monthlyOccupancy: [
    { month: 'Jan', occupancy: 95, revenue: 125000 },
    { month: 'Feb', occupancy: 98, revenue: 135000 },
    { month: 'Mar', occupancy: 99, revenue: 145000 },
    { month: 'Apr', occupancy: 92, revenue: 115000 },
    { month: 'May', occupancy: 85, revenue: 95000 },
    { month: 'Jun', occupancy: 78, revenue: 85000 },
    { month: 'Jul', occupancy: 82, revenue: 90000 },
    { month: 'Aug', occupancy: 75, revenue: 80000 },
    { month: 'Sep', occupancy: 70, revenue: 75000 },
    { month: 'Oct', occupancy: 80, revenue: 88000 },
    { month: 'Nov', occupancy: 88, revenue: 100000 },
    { month: 'Dec', occupancy: 96, revenue: 130000 },
  ],
  spotlightReview: {
    guest: "Sarah Chen",
    text: "Woke up to dolphins swimming past my balcony. This place is pure magic!",
    rating: 5,
    property: "Sunrise Bay Villa"
  },
  localPoints: [
    { coordinates: [-80.1285, 25.7917], type: 'coffee', name: 'Panther Coffee' },
    { coordinates: [-80.1320, 25.7895], type: 'restaurant', name: 'Joe\'s Stone Crab' },
    { coordinates: [-80.1298, 25.7932], type: 'restaurant', name: 'Juvia' },
    { coordinates: [-80.1265, 25.7880], type: 'business', name: 'Lincoln Road Mall' },
  ],
  preferredMapView: 'GLOBE', // International beach destination
};

const mountainViewData: HostData = {
  hostName: "Mountain View Rentals",
  year: 2025,
  totalGuests: 542,
  totalNights: 32000,
  totalRevenue: 2100000,
  otaSavings: 320000,
  directBookingIncrease: 42,
  occupancyRate: 78,
  websiteVisits: 18500,
  sheetsCleaned: 2800,
  toiletriesRestocked: 1650,
  batteriesReplaced: 145,
  economicImpact: 3500000,
  guestSavings: 450,
  totalDistanceTraveled: 1850000,
  cleaningHours: 2400,
  fiveStarReviewsEarned: 178,
  maintenanceResolved: 285,
  localBusinessesSupported: 28,
  communityCoffeeCount: 3800,
  guestConversationsHandled: 5200,
  platformGlobalRevenue: 520000000,
  aiConversationsHandled: 3200000,
  totalPropertiesManaged: 14800,
  homeCoordinates: [-106.8175, 39.1911], // Aspen
  userOrigin: { city: "Denver", coordinates: [-104.9903, 39.7392] },
  topGuestOrigins: [
    { city: "Denver", country: "USA", count: 120, coordinates: [-104.9903, 39.7392] },
    { city: "Los Angeles", country: "USA", count: 95, coordinates: [-118.2437, 34.0522] },
    { city: "Dallas", country: "USA", count: 78, coordinates: [-96.7970, 32.7767] },
    { city: "Houston", country: "USA", count: 65, coordinates: [-95.3698, 29.7604] },
    { city: "San Francisco", country: "USA", count: 58, coordinates: [-122.4194, 37.7749] },
    { city: "Phoenix", country: "USA", count: 42, coordinates: [-112.0740, 33.4484] },
    { city: "Seattle", country: "USA", count: 35, coordinates: [-122.3321, 47.6062] },
    { city: "New York", country: "USA", count: 52, coordinates: [-74.0060, 40.7128] },
    { city: "Chicago", country: "USA", count: 45, coordinates: [-87.6298, 41.8781] },
    { city: "Austin", country: "USA", count: 32, coordinates: [-97.7431, 30.2672] },
    { city: "Miami", country: "USA", count: 28, coordinates: [-80.1918, 25.7617] },
    { city: "Atlanta", country: "USA", count: 25, coordinates: [-84.3880, 33.7490] },
    { city: "Boston", country: "USA", count: 22, coordinates: [-71.0589, 42.3601] },
    { city: "Portland", country: "USA", count: 18, coordinates: [-122.6765, 45.5231] },
    { city: "Salt Lake City", country: "USA", count: 38, coordinates: [-111.8910, 40.7608] },
  ],
  preferredMapView: 'MAP', // Domestic-heavy ski resort
  topSearchTerm: "ski-in ski-out chalets",
  busiestDate: "December 26",
  biggestBooking: {
    amount: 85000,
    nights: 14,
    property: "Grand Summit Lodge"
  },
  monthlyOccupancy: [
    { month: 'Jan', occupancy: 95, revenue: 280000 },
    { month: 'Feb', occupancy: 92, revenue: 265000 },
    { month: 'Mar', occupancy: 85, revenue: 220000 },
    { month: 'Apr', occupancy: 45, revenue: 80000 },
    { month: 'May', occupancy: 35, revenue: 65000 },
    { month: 'Jun', occupancy: 68, revenue: 120000 },
    { month: 'Jul', occupancy: 82, revenue: 145000 },
    { month: 'Aug', occupancy: 78, revenue: 135000 },
    { month: 'Sep', occupancy: 55, revenue: 95000 },
    { month: 'Oct', occupancy: 42, revenue: 75000 },
    { month: 'Nov', occupancy: 65, revenue: 140000 },
    { month: 'Dec', occupancy: 98, revenue: 320000 },
  ],
  spotlightReview: {
    guest: "James Morrison",
    text: "Best ski vacation ever. The hot tub overlooking the slopes was absolutely unreal.",
    rating: 5,
    property: "Powder Ridge Chalet"
  },
  localPoints: [
    { coordinates: [-106.8200, 39.1875], type: 'coffee', name: 'Victoria Espresso' },
    { coordinates: [-106.8155, 39.1925], type: 'restaurant', name: 'Matsuhisa' },
    { coordinates: [-106.8190, 39.1895], type: 'restaurant', name: 'Ajax Tavern' },
    { coordinates: [-106.8165, 39.1880], type: 'business', name: 'Aspen Mountain' },
  ]
};

const urbanNestData: HostData = {
  hostName: "Urban Nest Collective",
  year: 2025,
  totalGuests: 2100,
  totalNights: 52000,
  totalRevenue: 980000,
  otaSavings: 165000,
  directBookingIncrease: 31,
  occupancyRate: 88,
  websiteVisits: 32000,
  sheetsCleaned: 5200,
  toiletriesRestocked: 2800,
  batteriesReplaced: 110,
  economicImpact: 1650000,
  guestSavings: 195,
  totalDistanceTraveled: 3200000,
  cleaningHours: 4100,
  fiveStarReviewsEarned: 312,
  maintenanceResolved: 520,
  localBusinessesSupported: 52,
  communityCoffeeCount: 8500,
  guestConversationsHandled: 12400,
  platformGlobalRevenue: 520000000,
  aiConversationsHandled: 3200000,
  totalPropertiesManaged: 14800,
  homeCoordinates: [-73.9442, 40.6782], // Brooklyn
  userOrigin: { city: "Boston", coordinates: [-71.0589, 42.3601] },
  topGuestOrigins: [
    { city: "Boston", country: "USA", count: 245, coordinates: [-71.0589, 42.3601] },
    { city: "Philadelphia", country: "USA", count: 198, coordinates: [-75.1652, 39.9526] },
    { city: "Washington DC", country: "USA", count: 165, coordinates: [-77.0369, 38.9072] },
    { city: "London", country: "UK", count: 142, coordinates: [-0.1276, 51.5074] },
    { city: "Paris", country: "France", count: 98, coordinates: [2.3522, 48.8566] },
    { city: "Toronto", country: "Canada", count: 85, coordinates: [-79.3832, 43.6532] },
    { city: "Los Angeles", country: "USA", count: 72, coordinates: [-118.2437, 34.0522] },
    { city: "Berlin", country: "Germany", count: 58, coordinates: [13.4050, 52.5200] },
  ],
  topSearchTerm: "brooklyn lofts with rooftop",
  busiestDate: "October 31",
  biggestBooking: {
    amount: 28500,
    nights: 45,
    property: "Williamsburg Artist Loft"
  },
  monthlyOccupancy: [
    { month: 'Jan', occupancy: 72, revenue: 65000 },
    { month: 'Feb', occupancy: 75, revenue: 68000 },
    { month: 'Mar', occupancy: 82, revenue: 75000 },
    { month: 'Apr', occupancy: 88, revenue: 82000 },
    { month: 'May', occupancy: 92, revenue: 88000 },
    { month: 'Jun', occupancy: 95, revenue: 92000 },
    { month: 'Jul', occupancy: 90, revenue: 86000 },
    { month: 'Aug', occupancy: 88, revenue: 84000 },
    { month: 'Sep', occupancy: 94, revenue: 90000 },
    { month: 'Oct', occupancy: 98, revenue: 95000 },
    { month: 'Nov', occupancy: 85, revenue: 78000 },
    { month: 'Dec', occupancy: 78, revenue: 72000 },
  ],
  spotlightReview: {
    guest: "Emma Rodriguez",
    text: "The neighborhood recommendations were perfect. Found my new favorite coffee shop!",
    rating: 5,
    property: "DUMBO Waterfront Studio"
  },
  localPoints: [
    { coordinates: [-73.9560, 40.7214], type: 'coffee', name: 'Devoción' },
    { coordinates: [-73.9612, 40.7156], type: 'coffee', name: 'Blue Bottle' },
    { coordinates: [-73.9485, 40.6892], type: 'restaurant', name: 'Juliana\'s Pizza' },
    { coordinates: [-73.9535, 40.7198], type: 'restaurant', name: 'Peter Luger' },
    { coordinates: [-73.9590, 40.7175], type: 'business', name: 'Brooklyn Flea' },
    { coordinates: [-73.9625, 40.7142], type: 'business', name: 'Smorgasburg' },
  ],
  preferredMapView: 'GLOBE', // Major international city
};

// Build the hosts data map keyed by hash
const hostConfigs = [
  { uuid: '550e8400-e29b-41d4-a716-446655440000', data: mockHostData },
  { uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', data: coastalRetreatsData },
  { uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', data: mountainViewData },
  { uuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012', data: urbanNestData },
];

hostConfigs.forEach(({ uuid, data }) => {
  const hash = hashHostId(uuid);
  sampleHostsData[hash] = data;
});

// Helper function to get host data by hash
export const getHostDataByHash = (hash: string): HostData => {
  return sampleHostsData[hash] || mockHostData;
};

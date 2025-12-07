import { HostData } from './types';

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
  ]
};

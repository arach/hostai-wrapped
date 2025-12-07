# Data Schema Reference

## Overview

- **One JSON file per property manager** - contains owner, staff, and guest data
- **One platform file** - HostAI global statistics
- **No PII** - all identifiers are one-way hashes

## Privacy & Identification

This system stores **zero personally identifiable information**. No names, emails, or addresses appear in any data file.

**How it works:** When generating data, emails are converted to 6-character hashes using a one-way function. The hash `j4w8v2` might represent `jordan@email.com`, but you cannot reverse the hash to get the email back. The mapping only works in one direction.

**Guest matching flow:**
1. Guest receives a link like `wrapped.host.ai/s/a7f3c2/guest?g=j4w8v2`
2. Alternatively, guest enters their email on a lookup page
3. System computes `hash(email)` → `j4w8v2`
4. System looks up `guests["j4w8v2"]` in the PM's data file
5. Guest sees their personalized Wrapped - without their email ever being stored

**Why this matters:** Even if the data files leak, there's no way to identify who the guests are. The hashes are meaningless without the original emails, and those are never stored in this system.

## Property Manager File (`{pmHash}.json`)

```typescript
interface PropertyManagerData {
  pmId: string;                    // 6-char hash
  year: number;
  generatedAt: string;             // ISO timestamp

  owner: OwnerData;
  staff: Record<string, StaffRecord>;   // key = hash(email)
  guests: Record<string, GuestRecord>;  // key = hash(email)

  staffAggregates?: {
    totalCleaningHours: number;
    totalFiveStarReviews: number;
    totalStaffCount: number;
  };

  guestAggregates?: {
    totalCoffeesPoured: number;
    totalLocalSpend: number;
    averageStayLength: number;
  };
}
```

## Owner Data

```typescript
interface OwnerData {
  propertyName: string;
  propertyLocation: {
    city: string;
    region?: string;
    country?: string;
    coordinates: [number, number];  // [lng, lat]
  };

  totalRevenue: number;
  otaSavings?: number;
  directBookingIncrease: number;    // % YoY
  occupancyRate: number;            // %
  totalGuests: number;
  totalNights: number;

  websiteVisits?: number;
  topSearchTerm?: string;

  sheetsCleaned?: number;
  toiletriesRestocked?: number;
  batteriesReplaced?: number;

  economicImpact: number;
  localBusinessesSupported: number;

  busiestDate: string;              // e.g., "June 14"
  biggestBooking?: { amount: number; nights: number; propertyName: string };

  monthlyData: Array<{ month: string; occupancy: number; revenue: number }>;
  guestOrigins: Array<{ city: string; country: string; count: number; coordinates: [number, number] }>;
  spotlightReview?: { text: string; rating: number; guestHash?: string; propertyName?: string };
  localPoints?: Array<{ coordinates: [number, number]; type: 'coffee' | 'business' | 'restaurant' | 'attraction'; name: string }>;
}
```

## Guest Record

```typescript
interface GuestRecord {
  origin: { city: string; country?: string; coordinates: [number, number] };
  stayDates: { checkIn: string; checkOut: string };  // ISO dates
  nightsStayed: number;
  propertyName?: string;

  localSpend?: number;
  savedVsHotel?: number;
  coffeesPoured?: number;

  theirReview?: { text: string; rating: number; date?: string };
}
```

## Staff Record

```typescript
interface StaffRecord {
  role: string;

  cleaningHours?: number;
  turnoversCompleted?: number;
  fiveStarReviewsEarned?: number;
  maintenanceResolved?: number;

  sheetsChanged?: number;
  towelsFolded?: number;
  batteriesReplaced?: number;

  guestCompliments?: Array<{ text: string; date: string }>;
}
```

## Platform Data (`platform.json`)

```typescript
interface PlatformData {
  year: number;
  generatedAt: string;

  totalPropertiesManaged: number;
  totalPropertyManagers: number;
  countriesActive: number;

  platformGlobalRevenue: number;
  totalBookingValue: number;

  aiConversationsHandled: number;
  averageResponseTime?: number;

  globalEconomicImpact: number;
  totalGuestsServed: number;

  yoyGrowth?: number;

  testimonials?: Array<{ text: string; pmRegion?: string }>;
}
```

## Hash Functions

```typescript
// Guest lookup key
const hashGuestEmail = (email: string): string => {
  return simpleHash(`guest:${email.toLowerCase().trim()}`, 6);
};

// Staff lookup key
const hashStaffEmail = (email: string): string => {
  return simpleHash(`staff:${email.toLowerCase().trim()}`, 6);
};

// PM identifier (from UUID)
const hashHostId = (uuid: string): string => {
  const hex = uuid.replace(/-/g, '').slice(0, 8);
  return parseInt(hex, 16).toString(36).padStart(6, '0').slice(0, 6);
};
```

Full implementation: `src/lib/hash.ts`

## URLs

```
/s/{pmHash}/owner              → Owner view
/s/{pmHash}/guest?g={guestHash} → Guest view
/s/{pmHash}/staff?s={staffHash} → Staff view
/s/hostai                       → Platform view
```

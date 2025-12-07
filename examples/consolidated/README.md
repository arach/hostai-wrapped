# Data Schema Reference

Complete schema documentation for HostAI Wrapped data files.

## Overview

The system uses a **privacy-first, consolidated data architecture**:

- **One JSON file per property manager** containing all audience data
- **One platform file** for HostAI global statistics
- **No PII** - all identifiers are one-way hashes

```
data/
├── platform.json           # HostAI global stats
└── {pmHash}.json           # One file per property manager
```

---

## Property Manager File (`{pmHash}.json`)

The main data file. Contains owner stats, staff records, and guest records.

### Root Structure

```typescript
interface PropertyManagerData {
  /** Hashed property manager ID (6 chars) */
  pmId: string;

  /** Report year */
  year: number;

  /** ISO timestamp when generated */
  generatedAt: string;

  /** Owner/PM aggregate statistics */
  owner: OwnerData;

  /** Staff records keyed by hash(staff_email) */
  staff: Record<string, StaffRecord>;

  /** Guest records keyed by hash(guest_email) */
  guests: Record<string, GuestRecord>;

  /** Optional: Aggregate stats across all staff */
  staffAggregates?: {
    totalCleaningHours: number;
    totalFiveStarReviews: number;
    totalStaffCount: number;
  };

  /** Optional: Aggregate stats across all guests */
  guestAggregates?: {
    totalCoffeesPoured: number;
    totalLocalSpend: number;
    averageStayLength: number;
  };
}
```

---

## Owner Data

Aggregate statistics for the property manager's portfolio.

```typescript
interface OwnerData {
  /** Display name for the property/brand */
  propertyName: string;

  /** Primary location */
  propertyLocation: {
    city: string;
    region?: string;
    country?: string;
    coordinates: [number, number];  // [longitude, latitude]
  };

  // ─────────────────────────────────────────────────────────────
  // REVENUE METRICS
  // ─────────────────────────────────────────────────────────────

  /** Total revenue in dollars */
  totalRevenue: number;

  /** Savings from avoiding OTA fees (optional) */
  otaSavings?: number;

  /** Year-over-year direct booking increase (percentage) */
  directBookingIncrease: number;

  // ─────────────────────────────────────────────────────────────
  // OCCUPANCY METRICS
  // ─────────────────────────────────────────────────────────────

  /** Average occupancy rate (percentage, 0-100) */
  occupancyRate: number;

  /** Total unique guests hosted */
  totalGuests: number;

  /** Total nights booked */
  totalNights: number;

  // ─────────────────────────────────────────────────────────────
  // DIGITAL PRESENCE
  // ─────────────────────────────────────────────────────────────

  /** Website visits (optional) */
  websiteVisits?: number;

  /** Top search term driving traffic (optional) */
  topSearchTerm?: string;

  // ─────────────────────────────────────────────────────────────
  // OPERATIONS
  // ─────────────────────────────────────────────────────────────

  /** Total sheets cleaned (optional) */
  sheetsCleaned?: number;

  /** Toiletries restocked (optional) */
  toiletriesRestocked?: number;

  /** Batteries replaced (optional) */
  batteriesReplaced?: number;

  // ─────────────────────────────────────────────────────────────
  // COMMUNITY IMPACT
  // ─────────────────────────────────────────────────────────────

  /** Total economic impact in dollars */
  economicImpact: number;

  /** Number of local businesses supported */
  localBusinessesSupported: number;

  // ─────────────────────────────────────────────────────────────
  // HIGHLIGHTS
  // ─────────────────────────────────────────────────────────────

  /** Busiest check-in date (e.g., "June 14") */
  busiestDate: string;

  /** Largest single booking (optional) */
  biggestBooking?: {
    amount: number;
    nights: number;
    propertyName: string;
  };

  // ─────────────────────────────────────────────────────────────
  // TIME SERIES
  // ─────────────────────────────────────────────────────────────

  /** Monthly performance data (12 entries) */
  monthlyData: Array<{
    month: string;      // "Jan", "Feb", etc.
    occupancy: number;  // Percentage
    revenue: number;    // Dollars
  }>;

  // ─────────────────────────────────────────────────────────────
  // GUEST DEMOGRAPHICS (Aggregated)
  // ─────────────────────────────────────────────────────────────

  /** Where guests came from (for map visualization) */
  guestOrigins: Array<{
    city: string;
    country: string;
    count: number;
    coordinates: [number, number];  // [longitude, latitude]
  }>;

  // ─────────────────────────────────────────────────────────────
  // FEATURED CONTENT
  // ─────────────────────────────────────────────────────────────

  /** Spotlight review to feature (optional) */
  spotlightReview?: {
    text: string;
    rating: number;
    guestHash?: string;      // Link to guest record (optional)
    propertyName?: string;
  };
}
```

---

## Guest Record

Individual guest data. **No PII** - identified only by email hash.

```typescript
// Key: hash(guest_email) e.g., "j4w8v2"
interface GuestRecord {
  /** Guest's origin location (city-level only) */
  origin: {
    city: string;
    country?: string;
    coordinates: [number, number];  // [longitude, latitude]
  };

  /** Stay dates */
  stayDates: {
    checkIn: string;   // ISO date "2025-03-15"
    checkOut: string;  // ISO date "2025-03-22"
  };

  /** Number of nights stayed */
  nightsStayed: number;

  /** Property name (optional) */
  propertyName?: string;

  // ─────────────────────────────────────────────────────────────
  // IMPACT METRICS (all optional)
  // ─────────────────────────────────────────────────────────────

  /** Estimated local spend in dollars */
  localSpend?: number;

  /** Savings vs hotel alternative */
  savedVsHotel?: number;

  /** Fun stat: coffees consumed */
  coffeesPoured?: number;

  // ─────────────────────────────────────────────────────────────
  // THEIR REVIEW (optional)
  // ─────────────────────────────────────────────────────────────

  theirReview?: {
    text: string;
    rating: number;      // 1-5
    date?: string;       // ISO date
  };
}
```

---

## Staff Record

Individual staff member data. **No PII** - identified only by email hash.

```typescript
// Key: hash(staff_email) e.g., "x9k2m1"
interface StaffRecord {
  /** Job title/role */
  role: string;

  // ─────────────────────────────────────────────────────────────
  // PERFORMANCE METRICS (all optional)
  // ─────────────────────────────────────────────────────────────

  /** Hours spent cleaning */
  cleaningHours?: number;

  /** Number of turnovers completed */
  turnoversCompleted?: number;

  /** 5-star reviews attributed to their work */
  fiveStarReviewsEarned?: number;

  /** Maintenance tickets resolved */
  maintenanceResolved?: number;

  // ─────────────────────────────────────────────────────────────
  // FUN STATS (all optional)
  // ─────────────────────────────────────────────────────────────

  /** Sheets changed */
  sheetsChanged?: number;

  /** Towels folded */
  towelsFolded?: number;

  /** Batteries replaced */
  batteriesReplaced?: number;

  // ─────────────────────────────────────────────────────────────
  // GUEST COMPLIMENTS (optional)
  // ─────────────────────────────────────────────────────────────

  /** Positive feedback from guests (no guest names) */
  guestCompliments?: Array<{
    text: string;
    date: string;  // ISO date
  }>;
}
```

---

## Platform Data (`platform.json`)

Global HostAI statistics for the platform-wide view.

```typescript
interface PlatformData {
  /** Report year */
  year: number;

  /** ISO timestamp when generated */
  generatedAt: string;

  // ─────────────────────────────────────────────────────────────
  // SCALE METRICS
  // ─────────────────────────────────────────────────────────────

  /** Total properties on platform */
  totalPropertiesManaged: number;

  /** Total property managers */
  totalPropertyManagers: number;

  /** Countries with active properties */
  countriesActive: number;

  // ─────────────────────────────────────────────────────────────
  // FINANCIAL
  // ─────────────────────────────────────────────────────────────

  /** Platform-wide revenue */
  platformGlobalRevenue: number;

  /** Total booking value processed */
  totalBookingValue: number;

  // ─────────────────────────────────────────────────────────────
  // AI METRICS
  // ─────────────────────────────────────────────────────────────

  /** AI conversations handled */
  aiConversationsHandled: number;

  /** Average response time in seconds (optional) */
  averageResponseTime?: number;

  // ─────────────────────────────────────────────────────────────
  // IMPACT
  // ─────────────────────────────────────────────────────────────

  /** Global economic impact */
  globalEconomicImpact: number;

  /** Total guests served */
  totalGuestsServed: number;

  // ─────────────────────────────────────────────────────────────
  // GROWTH
  // ─────────────────────────────────────────────────────────────

  /** Year-over-year growth percentage (optional) */
  yoyGrowth?: number;

  // ─────────────────────────────────────────────────────────────
  // TESTIMONIALS (optional)
  // ─────────────────────────────────────────────────────────────

  /** Featured PM testimonials (anonymized) */
  testimonials?: Array<{
    text: string;
    pmRegion?: string;  // e.g., "North America", "Europe"
  }>;
}
```

---

## Hash Functions

Use these to generate consistent, one-way identifiers.

### Guest Hash

```typescript
const hashGuestEmail = (email: string): string => {
  const normalized = email.toLowerCase().trim();
  return simpleHash(`guest:${normalized}`, 6);
};

// Example:
// hashGuestEmail("jordan.rivera@email.com") → "j4w8v2"
```

### Staff Hash

```typescript
const hashStaffEmail = (email: string): string => {
  const normalized = email.toLowerCase().trim();
  return simpleHash(`staff:${normalized}`, 6);
};

// Example:
// hashStaffEmail("elena.martinez@company.com") → "x9k2m1"
```

### Property Manager Hash

```typescript
const hashHostId = (uuid: string): string => {
  const hex = uuid.replace(/-/g, '').slice(0, 8);
  const num = parseInt(hex, 16);
  return num.toString(36).padStart(6, '0').slice(0, 6);
};

// Example:
// hashHostId("550e8400-e29b-41d4-a716-446655440000") → "nllvk0"
```

### Simple Hash Implementation

```typescript
const simpleHash = (input: string, length: number = 6): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const positive = Math.abs(hash);
  return positive.toString(36).padStart(length, '0').slice(0, length);
};
```

See `src/lib/hash.ts` for the full implementation.

---

## URL Structure

### Shareable Links

```
/s/{pmHash}/owner              → Owner view
/s/{pmHash}/guest?g={guestHash} → Guest view (specific guest)
/s/{pmHash}/staff?s={staffHash} → Staff view (specific staff)
/s/hostai                       → Platform view
```

### URL Generation

```typescript
// Owner
const ownerUrl = `/s/${pmHash}/owner`;

// Guest (with specific guest data)
const guestUrl = `/s/${pmHash}/guest?g=${hashGuestEmail(email)}`;

// Staff (with specific staff data)
const staffUrl = `/s/${pmHash}/staff?s=${hashStaffEmail(email)}`;
```

---

## Sample Data

Reference implementations in the repository:

| File | Description |
|------|-------------|
| `examples/consolidated/a7f3c2.json` | Complete PM file with owner, staff, and guests |
| `examples/consolidated/platform.json` | Platform-wide statistics |

---

## Validation Checklist

Before deploying data, verify:

- [ ] `pmId` matches the filename (e.g., `a7f3c2.json` has `pmId: "a7f3c2"`)
- [ ] `year` is correct (e.g., `2025`)
- [ ] `generatedAt` is a valid ISO timestamp
- [ ] `monthlyData` has exactly 12 entries (Jan-Dec)
- [ ] `guestOrigins` coordinates are `[longitude, latitude]` (not lat/long)
- [ ] All guest/staff keys are valid 6-character hashes
- [ ] No PII in any field (no names, emails, addresses)
- [ ] All required fields are present (see interfaces above)

# HostAI Wrapped SDK

Generate personalized year-in-review experiences.

## Quick Start

```typescript
import { WrappedSDK } from '@/lib/sdk';

// Generate data (UUID auto-created)
const data = WrappedSDK.generateGuestData({
  year: 2025,
  propertyName: 'Horizon Stays',
  guestName: 'Jordan Rivera',
  // ... see examples/guest-sample.json
});

// Export to JSON
const json = WrappedSDK.export(data);

// Load from JSON
const loaded = WrappedSDK.load(json);
```

## Data Scopes

| Scope | Who sees it | Key data |
|-------|-------------|----------|
| `owner` | Property owner | Revenue, occupancy, guest map |
| `guest` | Individual guest | Their journey, local impact |
| `staff` | Team member | Hours worked, reviews earned |
| `hostai` | HostAI brand | Platform-wide metrics |

## Methods

```typescript
// Generate (auto UUID)
WrappedSDK.generateOwnerData({ ... })
WrappedSDK.generateGuestData({ ... })
WrappedSDK.generateStaffData({ ... })
WrappedSDK.generateHostAIData({ ... })

// Import/Export
WrappedSDK.export(data)  // → JSON string
WrappedSDK.load(json)    // → data object

// Type checks
WrappedSDK.isOwner(data)
WrappedSDK.isGuest(data)
WrappedSDK.isStaff(data)
WrappedSDK.isHostAI(data)
```

## Sample Files

See `examples/` for complete JSON samples:
- `owner-sample.json`
- `guest-sample.json`
- `staff-sample.json`

## TypeScript Types

All types exported from `@/lib/sdk`:

```typescript
import type {
  OwnerWrappedData,
  GuestWrappedData,
  StaffWrappedData,
  HostAIWrappedData,
  WrappedData,  // union of all
} from '@/lib/sdk';
```

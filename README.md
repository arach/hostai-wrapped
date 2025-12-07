# HostAI Wrapped

A "Spotify Wrapped"-style year-in-review for vacation rental hosts, guests, and staff.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Static export for GitHub Pages:

```bash
pnpm build
# Output in /out - deploy to GitHub Pages
```

## URL Parameters

Load different views using query params:

```
/?view=owner     → Owner business view
/?view=guest     → Guest journey view
/?view=staff     → Staff appreciation view
/?view=hostai    → Platform view
```

Or load custom data:
```
/?data=examples/guest-sample.json
```

## SDK

Generate wrapped data for your users:

```typescript
import { WrappedSDK } from '@/lib/sdk';

const data = WrappedSDK.generateGuestData({
  year: 2025,
  propertyName: 'My Property',
  guestName: 'Guest Name',
  // ... see examples/*.json for all fields
});

const json = WrappedSDK.export(data);
```

See [SDK.md](./SDK.md) for full docs.

## Sample Data

`examples/` contains sample JSON files:
- `owner-sample.json` - Property owner metrics
- `guest-sample.json` - Guest journey data
- `staff-sample.json` - Staff achievements

## Tech Stack

- Next.js 16 (static export)
- TypeScript
- Tailwind CSS
- D3.js + Leaflet (maps)
- Recharts

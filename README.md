# HostAI Wrapped

A "Spotify Wrapped"-style year-in-review for vacation rental hosts, guests, and staff.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

```bash
pnpm build
# Output in /out - deploy to GitHub Pages
```

## URL Structure

| Route | Description |
|-------|-------------|
| `/` | Admin preview with audience switcher |
| `/s/{pmHash}/owner` | Owner shareable view |
| `/s/{pmHash}/guest` | Guest shareable view |
| `/s/{pmHash}/staff` | Staff shareable view |
| `/s/hostai` | HostAI platform view |

## Data Architecture

**Privacy-first design** - no PII stored. All identifiers are one-way hashes.

```
examples/consolidated/
├── {pmHash}.json    # One file per property manager (all audiences)
└── platform.json    # HostAI global stats
```

Each PM file contains:
- **Owner stats** - Revenue, occupancy, impact metrics
- **Staff records** - Keyed by `hash(email)`
- **Guest records** - Keyed by `hash(email)`

**[Full Data Schema Documentation →](./examples/consolidated/README.md)**

## Tech Stack

- Next.js 16 (static export)
- TypeScript
- Tailwind CSS
- D3.js + Leaflet (maps)

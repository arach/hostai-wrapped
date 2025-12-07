/**
 * HostAI Wrapped Design System
 *
 * A minimal typography system for consistent styling across all slides.
 *
 * TYPOGRAPHY SCALE
 * ================
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  HERO          text-6xl    60px    Main slide headlines            │
 * │  ████████████████████████████████████████████████████████████████  │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  TITLE         text-3xl    30px    Secondary headlines, big stats  │
 * │  ████████████████████████████████                                  │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  STAT          text-2xl    24px    Numbers in stat cards           │
 * │  ██████████████████████████                                        │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  BODY          text-lg     18px    Paragraphs, descriptions        │
 * │  ██████████████████                                                │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  LABEL         text-xs     12px    Tags, badges, card labels       │
 * │  ████████████                                                      │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  BUTTON        text-xs     12px    All interactive buttons         │
 * │  ████████████                                                      │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 *
 * FONT FAMILIES
 * =============
 *
 * Serif (font-serif)     → Headlines, hero text, editorial feel
 * Sans (font-sans)       → Body text, labels, UI elements
 * Mono (font-mono)       → Technical labels, URLs, code
 *
 *
 * USAGE EXAMPLES
 * ==============
 *
 * Hero headline:
 *   <h1 className={typography.hero}>What a year.</h1>
 *
 * Stat number:
 *   <div className={typography.stat}>$142k</div>
 *
 * Body paragraph:
 *   <p className={typography.body}>Here's to the guests you welcomed...</p>
 *
 * Label/badge:
 *   <span className={typography.label}>Annual Performance</span>
 *
 * Button:
 *   <button className={typography.button}>Copy URL</button>
 */

export const typography = {
  // Main slide headlines - big, bold, serif
  hero: 'text-5xl font-serif font-bold tracking-tighter leading-[0.9]',

  // Secondary headlines, section titles
  title: 'text-3xl font-serif font-bold tracking-tight',

  // Large numbers in stat cards
  stat: 'text-2xl font-bold tracking-tight',

  // Paragraphs, descriptions
  body: 'text-lg font-sans leading-relaxed',

  // Small body text
  bodySmall: 'text-base font-sans leading-relaxed',

  // Tags, badges, card labels - uppercase
  label: 'text-xs font-bold uppercase tracking-widest font-sans',

  // Card sublabels - muted
  sublabel: 'text-xs uppercase tracking-wider text-white/50 font-sans',

  // Buttons and CTAs
  button: 'text-xs font-bold uppercase tracking-wider',

  // Monospace for technical/URLs
  mono: 'text-xs font-mono',
} as const;

/**
 * COLOR TOKENS
 * ============
 *
 * Backgrounds use gradient classes defined in page.tsx
 * Text colors follow this pattern:
 *
 * Primary text:    text-white
 * Secondary text:  text-white/80 or text-white/60
 * Muted text:      text-white/50
 * Accent colors:   text-{color}-400 (emerald, blue, purple, etc.)
 */

export const colors = {
  text: {
    primary: 'text-white',
    secondary: 'text-white/80',
    muted: 'text-white/50',
  },
  accent: {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    amber: 'text-amber-400',
  },
} as const;

/**
 * SPACING
 * =======
 *
 * Consistent spacing between elements:
 *
 * Section gap:     mb-8 or gap-8
 * Card padding:    p-4 or p-5
 * Card gap:        gap-4
 * Inline gap:      gap-2 or gap-3
 */

export const spacing = {
  section: 'mb-8',
  card: 'p-4',
  cardLarge: 'p-5',
  grid: 'gap-4',
  inline: 'gap-2',
} as const;

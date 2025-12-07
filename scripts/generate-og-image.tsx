/**
 * Generate OG Image for HostAI Wrapped
 *
 * Run with: npx tsx scripts/generate-og-image.tsx
 *
 * This generates a static og-image.png in the public folder
 * that works with GitHub Pages static hosting.
 *
 * Since SVG can't embed external images easily for resvg,
 * we use sharp to composite layers.
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;

// Background image from intro slide
const BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop';

// HostAI logo URL
const HOSTAI_LOGO_URL = 'https://gethostai.com/images/hostai-logo-light.svg';

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function downloadSvgAsBuffer(url: string): Promise<Buffer> {
  const response = await fetch(url);
  const svgText = await response.text();
  return Buffer.from(svgText);
}

function createOverlaySvg(): string {
  return `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradient overlay for readability -->
    <linearGradient id="textOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(0,0,0,0.5)"/>
      <stop offset="40%" style="stop-color:rgba(0,0,0,0.3)"/>
      <stop offset="100%" style="stop-color:rgba(0,0,0,0.85)"/>
    </linearGradient>
    <!-- Purple tint overlay -->
    <linearGradient id="purpleTint" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(46,16,101,0.4)"/>
      <stop offset="50%" style="stop-color:rgba(76,29,149,0.3)"/>
      <stop offset="100%" style="stop-color:rgba(190,24,93,0.4)"/>
    </linearGradient>
  </defs>

  <!-- Gradient overlays -->
  <rect width="100%" height="100%" fill="url(#purpleTint)"/>
  <rect width="100%" height="100%" fill="url(#textOverlay)"/>

  <!-- 2025 Year Badge - top left -->
  <rect x="80" y="60" width="90" height="36" rx="18" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
  <text x="125" y="85" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" letter-spacing="1">2025</text>

  <!-- Main Title - matching intro slide style -->
  <text x="80" y="280" font-family="Georgia, 'Times New Roman', serif" font-size="120" font-weight="700" fill="white" letter-spacing="-4">
    What a
  </text>
  <text x="80" y="400" font-family="Georgia, 'Times New Roman', serif" font-size="120" font-weight="700" fill="white" letter-spacing="-4">
    year.
  </text>

  <!-- Subtitle - directly below title -->
  <text x="80" y="470" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="500" fill="rgba(255,255,255,0.9)" letter-spacing="0.5">
    Your year in hospitality, wrapped.
  </text>

  <!-- Footer: Powered by text only (logo composited separately) -->
  <rect x="80" y="555" width="240" height="50" rx="25" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="108" y="586" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="rgba(255,255,255,0.6)" letter-spacing="1.5">POWERED BY</text>
</svg>
`;
}

async function generateImage() {
  console.log('📥 Downloading background image...');
  const bgBuffer = await downloadImage(BACKGROUND_IMAGE_URL);

  console.log('📥 Downloading HostAI logo...');
  const logoBuffer = await downloadSvgAsBuffer(HOSTAI_LOGO_URL);

  console.log('🎨 Processing background...');
  const processedBg = await sharp(bgBuffer)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .toBuffer();

  console.log('✨ Creating overlay...');
  const overlaySvg = createOverlaySvg();
  const overlayBuffer = Buffer.from(overlaySvg);

  // Convert logo SVG to PNG for compositing
  const logoPng = await sharp(logoBuffer)
    .resize(80, 20, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  console.log('🔧 Compositing layers...');
  const finalImage = await sharp(processedBg)
    .composite([
      {
        input: overlayBuffer,
        top: 0,
        left: 0,
      },
      {
        input: logoPng,
        top: 570,
        left: 218,
      },
    ])
    .png()
    .toBuffer();

  const outputPath = path.join(process.cwd(), 'public', 'og-image.png');
  fs.writeFileSync(outputPath, finalImage);

  console.log(`✅ OG image generated: ${outputPath}`);
  console.log(`   Size: ${WIDTH}x${HEIGHT}px`);
}

generateImage().catch(console.error);

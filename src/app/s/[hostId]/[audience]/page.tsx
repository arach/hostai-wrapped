import { hashHostId } from '@/lib/hash';
import HostAudienceClient from './HostAudienceClient';

// Pre-generate all static routes at build time for GitHub Pages
// In production: import host UUIDs from a JSON file and generate hashes
const SAMPLE_HOST_UUIDS = [
  '550e8400-e29b-41d4-a716-446655440000', // Demo host
  // Add more host UUIDs here for static generation
];

export function generateStaticParams() {
  const audiences = ['owner', 'guest', 'staff'];
  const params: { hostId: string; audience: string }[] = [];

  for (const uuid of SAMPLE_HOST_UUIDS) {
    const hostHash = hashHostId(uuid);
    for (const audience of audiences) {
      params.push({ hostId: hostHash, audience });
    }
  }

  return params;
}

export default async function HostAudiencePage({
  params,
}: {
  params: Promise<{ hostId: string; audience: string }>;
}) {
  const { hostId, audience } = await params;

  return <HostAudienceClient hostId={hostId} audienceParam={audience} />;
}

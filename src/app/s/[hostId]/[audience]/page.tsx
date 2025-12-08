import { Suspense } from 'react';
import { hashHostId, SAMPLE_HOST_UUIDS } from '@/lib/hash';
import HostAudienceClient from './HostAudienceClient';

export function generateStaticParams() {
  const audiences = ['owner', 'guest', 'staff'];
  const params: { hostId: string; audience: string }[] = [];

  for (const host of SAMPLE_HOST_UUIDS) {
    const hostHash = hashHostId(host.uuid);
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

  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HostAudienceClient hostId={hostId} audienceParam={audience} />
    </Suspense>
  );
}

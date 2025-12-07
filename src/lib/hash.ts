import { Audience } from './types';

// Short hash generation for host IDs
// Takes a UUID and creates a short, URL-safe hash (6 chars)
// With ~200 hosts, 6 chars in base36 gives us 2.1 billion possibilities - no collisions
export const hashHostId = (uuid: string): string => {
  // Simple hash: take first 8 chars of UUID, parse as hex, convert to base36
  const hex = uuid.replace(/-/g, '').slice(0, 8);
  const num = parseInt(hex, 16);
  return num.toString(36).padStart(6, '0').slice(0, 6);
};

// Demo host UUID - in production this would come from context/props
export const DEMO_HOST_UUID = '550e8400-e29b-41d4-a716-446655440000';
export const DEMO_HOST_HASH = hashHostId(DEMO_HOST_UUID);

// Audience path mapping
export const AUDIENCE_PATHS: Record<Audience, string> = {
  'OWNER': 'owner',
  'GUEST': 'guest',
  'STAFF': 'staff',
  'HOSTAI': 'hostai'
};

// Generate dev/preview URL with full UUID
export const generateDevUrl = (hostUUID: string, audience: Audience): string => {
  if (audience === 'HOSTAI') {
    return `/s/hostai`;
  }
  return `/s/${hostUUID}/${AUDIENCE_PATHS[audience]}`;
};

// Generate short/production URL with hash
export const generateShortUrl = (hostUUID: string, audience: Audience): string => {
  if (audience === 'HOSTAI') {
    return `/s/hostai`;
  }
  const hash = hashHostId(hostUUID);
  return `/s/${hash}/${AUDIENCE_PATHS[audience]}`;
};

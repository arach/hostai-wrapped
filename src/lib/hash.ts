import { Audience } from './types';

// =============================================================================
// HASH UTILITIES
// =============================================================================
// Privacy-first hashing for all identifiers.
// All hashes are ONE-WAY and cannot be reversed.
// =============================================================================

/**
 * Simple hash function for generating short, URL-safe identifiers.
 * Uses a basic hash algorithm suitable for non-cryptographic purposes.
 *
 * @param input - String to hash
 * @param length - Desired output length (default: 6)
 * @returns URL-safe hash string
 */
const simpleHash = (input: string, length: number = 6): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to positive number and then to base36
  const positive = Math.abs(hash);
  return positive.toString(36).padStart(length, '0').slice(0, length);
};

// -----------------------------------------------------------------------------
// HOST/PROPERTY MANAGER HASHING
// -----------------------------------------------------------------------------

/**
 * Hash a host/property manager UUID to a short, URL-safe identifier.
 * Used for: URL paths, filename references
 *
 * @param uuid - Host's UUID
 * @returns 6-character hash (e.g., "a7f3c2")
 */
export const hashHostId = (uuid: string): string => {
  // Simple hash: take first 8 chars of UUID, parse as hex, convert to base36
  const hex = uuid.replace(/-/g, '').slice(0, 8);
  const num = parseInt(hex, 16);
  return num.toString(36).padStart(6, '0').slice(0, 6);
};

/**
 * Hash a property manager's email to a PM identifier.
 * ONE-WAY hash - cannot be reversed to get the email.
 *
 * @param email - PM's email address
 * @returns 6-character hash for PM identification
 */
export const hashPMEmail = (email: string): string => {
  const normalized = email.toLowerCase().trim();
  return simpleHash(normalized, 6);
};

// -----------------------------------------------------------------------------
// GUEST HASHING (Privacy-Critical)
// -----------------------------------------------------------------------------

/**
 * Hash a guest's email to a guest identifier.
 * ONE-WAY hash - cannot be reversed to get the email.
 * Used for: Looking up guest records in the consolidated JSON
 *
 * @param email - Guest's email address
 * @returns 6-character hash for guest lookup
 */
export const hashGuestEmail = (email: string): string => {
  const normalized = email.toLowerCase().trim();
  return simpleHash(`guest:${normalized}`, 6);
};

// -----------------------------------------------------------------------------
// STAFF HASHING (Privacy-Critical)
// -----------------------------------------------------------------------------

/**
 * Hash a staff member's email to a staff identifier.
 * ONE-WAY hash - cannot be reversed to get the email.
 * Used for: Looking up staff records in the consolidated JSON
 *
 * @param email - Staff member's email address
 * @returns 6-character hash for staff lookup
 */
export const hashStaffEmail = (email: string): string => {
  const normalized = email.toLowerCase().trim();
  return simpleHash(`staff:${normalized}`, 6);
};

// -----------------------------------------------------------------------------
// DEMO/SAMPLE DATA
// -----------------------------------------------------------------------------

// Demo host UUID - in production this would come from context/props
export const DEMO_HOST_UUID = '550e8400-e29b-41d4-a716-446655440000';
export const DEMO_HOST_HASH = hashHostId(DEMO_HOST_UUID);

// Sample host UUIDs for testing multiple properties
export const SAMPLE_HOST_UUIDS = [
  { uuid: '550e8400-e29b-41d4-a716-446655440000', name: 'Horizon Stays', location: 'Washington DC' },
  { uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', name: 'Coastal Retreats', location: 'Miami Beach' },
  { uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', name: 'Mountain View Rentals', location: 'Aspen' },
  { uuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012', name: 'Urban Nest Collective', location: 'Brooklyn' },
] as const;

// Demo PM hash (matches examples/consolidated/a7f3c2.json)
export const DEMO_PM_HASH = 'a7f3c2';

// Sample email hashes for testing (these match the consolidated sample data)
export const SAMPLE_HASHES = {
  guests: {
    'jordan.rivera@email.com': 'j4w8v2',
    'emma.wilson@email.com': 'm2k9r5',
    'kenji.tanaka@email.com': 'q7t3x1',
    'alex.chen@email.com': 'k5p2n8',
    'marie.dubois@email.com': 'w3m6v9',
  },
  staff: {
    'elena.martinez@company.com': 'x9k2m1',
    'james.wilson@company.com': 'p3n7q8',
    'sarah.kim@company.com': 'r8t4w2',
  }
} as const;

// -----------------------------------------------------------------------------
// URL GENERATION
// -----------------------------------------------------------------------------

// Audience path mapping
export const AUDIENCE_PATHS: Record<Audience, string> = {
  'OWNER': 'owner',
  'GUEST': 'guest',
  'STAFF': 'staff',
  'HOSTAI': 'hostai'
};

/**
 * Generate dev/preview URL with full UUID
 */
export const generateDevUrl = (hostUUID: string, audience: Audience): string => {
  if (audience === 'HOSTAI') {
    return `/s/hostai`;
  }
  return `/s/${hostUUID}/${AUDIENCE_PATHS[audience]}`;
};

/**
 * Generate short/production URL with hash
 */
export const generateShortUrl = (hostUUID: string, audience: Audience): string => {
  if (audience === 'HOSTAI') {
    return `/s/hostai`;
  }
  const hash = hashHostId(hostUUID);
  return `/s/${hash}/${AUDIENCE_PATHS[audience]}`;
};

/**
 * Generate a shareable guest URL.
 * The guest hash is derived from their email, so they can always
 * regenerate their URL by entering their email.
 *
 * @param pmHash - Property manager's hash
 * @param guestEmail - Guest's email (will be hashed)
 * @returns Full shareable URL path
 */
export const generateGuestUrl = (pmHash: string, guestEmail: string): string => {
  const guestHash = hashGuestEmail(guestEmail);
  return `/s/${pmHash}/guest?g=${guestHash}`;
};

/**
 * Generate a shareable staff URL.
 *
 * @param pmHash - Property manager's hash
 * @param staffEmail - Staff member's email (will be hashed)
 * @returns Full shareable URL path
 */
export const generateStaffUrl = (pmHash: string, staffEmail: string): string => {
  const staffHash = hashStaffEmail(staffEmail);
  return `/s/${pmHash}/staff?s=${staffHash}`;
};

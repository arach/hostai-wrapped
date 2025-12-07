// ============================================================================
// HostAI Wrapped SDK
// ============================================================================
//
// Usage:
//   import { WrappedSDK } from '@/lib/sdk';
//
//   // Generate wrapped data for export
//   const ownerData = WrappedSDK.generateOwnerData({ ... });
//   const json = WrappedSDK.export(ownerData);
//
//   // Load wrapped data from JSON
//   const data = WrappedSDK.load(jsonString);
//   if (WrappedSDK.isOwner(data)) { ... }
//
// ============================================================================

export * from './types';

import {
  WrappedData,
  WrappedScope,
  OwnerWrappedData,
  GuestWrappedData,
  StaffWrappedData,
  HostAIWrappedData,
  isOwnerData,
  isGuestData,
  isStaffData,
  isHostAIData,
} from './types';

// UUID generator (crypto-safe)
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ============================================================================
// SDK Class
// ============================================================================

export const WrappedSDK = {
  // --------------------------------------------------------------------------
  // Generate functions - create new wrapped data with UUID
  // --------------------------------------------------------------------------

  generateOwnerData(
    input: Omit<OwnerWrappedData, 'id' | 'scope' | 'generatedAt'>
  ): OwnerWrappedData {
    return {
      id: generateUUID(),
      scope: 'owner',
      generatedAt: new Date().toISOString(),
      ...input,
    };
  },

  generateGuestData(
    input: Omit<GuestWrappedData, 'id' | 'scope' | 'generatedAt'>
  ): GuestWrappedData {
    return {
      id: generateUUID(),
      scope: 'guest',
      generatedAt: new Date().toISOString(),
      ...input,
    };
  },

  generateStaffData(
    input: Omit<StaffWrappedData, 'id' | 'scope' | 'generatedAt'>
  ): StaffWrappedData {
    return {
      id: generateUUID(),
      scope: 'staff',
      generatedAt: new Date().toISOString(),
      ...input,
    };
  },

  generateHostAIData(
    input: Omit<HostAIWrappedData, 'id' | 'scope' | 'generatedAt'>
  ): HostAIWrappedData {
    return {
      id: generateUUID(),
      scope: 'hostai',
      generatedAt: new Date().toISOString(),
      ...input,
    };
  },

  // --------------------------------------------------------------------------
  // Export / Import
  // --------------------------------------------------------------------------

  /** Export wrapped data to JSON string */
  export(data: WrappedData): string {
    return JSON.stringify(data, null, 2);
  },

  /** Load wrapped data from JSON string */
  load(json: string): WrappedData {
    const data = JSON.parse(json) as WrappedData;

    // Validate required fields
    if (!data.id || !data.scope || !data.year) {
      throw new Error('Invalid wrapped data: missing required fields');
    }

    // Validate scope
    const validScopes: WrappedScope[] = ['owner', 'guest', 'staff', 'hostai'];
    if (!validScopes.includes(data.scope)) {
      throw new Error(`Invalid scope: ${data.scope}`);
    }

    return data;
  },

  /** Build URL for wrapped view */
  buildURL(baseURL: string, data: WrappedData, slide?: string): string {
    const audienceMap: Record<WrappedScope, string> = {
      owner: 'owner',
      guest: 'guest',
      staff: 'staff',
      hostai: 'hostai',
    };

    const audience = audienceMap[data.scope];
    const slideSlug = slide || 'intro';

    // URL format: /[audience]/[slide]?id=[uuid]
    return `${baseURL}/${audience}/${slideSlug}?id=${data.id}`;
  },

  // --------------------------------------------------------------------------
  // Type guards (re-exported for convenience)
  // --------------------------------------------------------------------------

  isOwner: isOwnerData,
  isGuest: isGuestData,
  isStaff: isStaffData,
  isHostAI: isHostAIData,

  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------

  /** Validate UUID format */
  isValidUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  },
};

// Default export
export default WrappedSDK;

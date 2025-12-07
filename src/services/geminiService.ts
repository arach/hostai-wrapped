import { HostData, Audience } from '../lib/types';

export const generateYearSummary = async (_data: HostData, audience: Audience): Promise<string> => {
  // Static fallback summaries for each audience type
  if (audience === 'GUEST') {
    return "You were one of <strong>842 guests</strong> who made this year unforgettable. We can't wait to welcome you back for another <strong>5-star stay</strong>.";
  }
  if (audience === 'STAFF') {
    return "Your hard work delivered <strong>5-star hospitality</strong> to over <strong>800 guests</strong>. Thank you for making every stay magical.";
  }
  if (audience === 'HOSTAI') {
    return "We powered over <strong>12,000 properties</strong> this year, processing <strong>$450M in value</strong>. Together, we are building the <strong>future of hospitality</strong>.";
  }
  // OWNER default
  return "You welcomed <strong>842 guests</strong> during a record-breaking <strong>Spring season</strong>. Your commitment to <strong>5-star hospitality</strong> set a new standard.";
};

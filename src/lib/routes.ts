import { Audience, SlideType } from './types';

// URL-friendly slug mappings
export const audienceSlugs: Record<string, Audience> = {
  'owner': 'OWNER',
  'guest': 'GUEST',
  'staff': 'STAFF',
  'hostai': 'HOSTAI',
};

export const slideSlugs: Record<string, SlideType> = {
  'intro': SlideType.INTRO,
  'journey': SlideType.MAP,      // "Your Journey" for guests, "Global Reach" for others
  'impact': SlideType.STATS,     // "Community Impact" / "Revenue" depending on audience
  'seasons': SlideType.SEASONS,
  'reviews': SlideType.REVIEW,
  'summary': SlideType.OUTRO,
};

// Reverse mappings for URL generation
export const audienceToSlug: Record<Audience, string> = {
  'OWNER': 'owner',
  'GUEST': 'guest',
  'STAFF': 'staff',
  'HOSTAI': 'hostai',
};

export const slideToSlug: Record<SlideType, string> = {
  [SlideType.INTRO]: 'intro',
  [SlideType.MAP]: 'journey',
  [SlideType.STATS]: 'impact',
  [SlideType.SEASONS]: 'seasons',
  [SlideType.REVIEW]: 'reviews',
  [SlideType.OUTRO]: 'summary',
};

// Slide sequences per audience
export const slideSequences: Record<Audience, SlideType[]> = {
  'OWNER': [SlideType.INTRO, SlideType.MAP, SlideType.STATS, SlideType.SEASONS, SlideType.REVIEW, SlideType.OUTRO],
  'GUEST': [SlideType.INTRO, SlideType.MAP, SlideType.STATS, SlideType.REVIEW, SlideType.OUTRO],
  'STAFF': [SlideType.INTRO, SlideType.STATS, SlideType.REVIEW, SlideType.MAP, SlideType.OUTRO],
  'HOSTAI': [SlideType.INTRO, SlideType.STATS, SlideType.MAP, SlideType.REVIEW, SlideType.OUTRO],
};

// Helper to get next/prev slide URLs
export function getSlideNavigation(audience: Audience, currentSlide: SlideType) {
  const sequence = slideSequences[audience];
  const currentIndex = sequence.indexOf(currentSlide);

  const prevSlide = currentIndex > 0 ? sequence[currentIndex - 1] : null;
  const nextSlide = currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : null;

  const audienceSlug = audienceToSlug[audience];

  return {
    prev: prevSlide ? `/${audienceSlug}/${slideToSlug[prevSlide]}` : null,
    next: nextSlide ? `/${audienceSlug}/${slideToSlug[nextSlide]}` : null,
    currentIndex,
    total: sequence.length,
  };
}

// Validate and parse URL params
export function parseRouteParams(audienceParam: string, slideParam: string): {
  audience: Audience | null;
  slide: SlideType | null;
  isValid: boolean;
} {
  const audience = audienceSlugs[audienceParam.toLowerCase()] || null;
  const slide = slideSlugs[slideParam.toLowerCase()] || null;

  // Check if this slide is valid for this audience
  const isValid = audience !== null && slide !== null && slideSequences[audience].includes(slide);

  return { audience, slide, isValid };
}

// Generate all valid paths for static export
export function generateStaticPaths() {
  const paths: { audience: string; slide: string }[] = [];

  for (const [audienceSlug, audience] of Object.entries(audienceSlugs)) {
    const slides = slideSequences[audience];
    for (const slide of slides) {
      paths.push({
        audience: audienceSlug,
        slide: slideToSlug[slide],
      });
    }
  }

  return paths;
}

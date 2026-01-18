import { CookieCategory, CategoryMetadata } from './types';

/**
 * Category metadata for UI and compliance
 */
export const CATEGORY_METADATA: Record<CookieCategory, CategoryMetadata> = {
  essential: {
    label: 'Essential Cookies',
    description:
      'Required for basic website functionality and security. These cannot be disabled.',
    essential: true,
    default: true,
    color: '#ef4444',
  },
  functional: {
    label: 'Functional Cookies',
    description:
      'Enhance your experience by remembering preferences and settings like language and theme.',
    essential: false,
    default: false,
    color: '#f97316',
  },
  analytics: {
    label: 'Analytics Cookies',
    description:
      'Help us understand how you use our website to improve its performance and content.',
    essential: false,
    default: false,
    color: '#eab308',
  },
  performance: {
    label: 'Performance Cookies',
    description:
      'Optimize website speed, caching, and content delivery for a faster experience.',
    essential: false,
    default: false,
    color: '#22c55e',
  },
  marketing: {
    label: 'Marketing Cookies',
    description:
      'Enable retargeting and conversion tracking across advertising platforms like Google and Facebook.',
    essential: false,
    default: false,
    color: '#06b6d4',
  },
  affiliate: {
    label: 'Affiliate Cookies',
    description:
      'Track referral sources and attribute sales to affiliate partners for commission purposes.',
    essential: false,
    default: false,
    color: '#3b82f6',
  },
  personalization: {
    label: 'Personalization Cookies',
    description:
      'Customize your experience through content recommendations, A/B testing, and user segmentation.',
    essential: false,
    default: false,
    color: '#8b5cf6',
  },
  'third-party': {
    label: 'Third-Party Cookies',
    description:
      'Enable third-party services like live chat, support widgets, and external integrations.',
    essential: false,
    default: false,
    color: '#ec4899',
  },
};

/**
 * Get category metadata
 */
export function getCategoryMetadata(
  category: CookieCategory
): CategoryMetadata | null {
  return CATEGORY_METADATA[category] || null;
}

/**
 * Get all categories sorted by importance
 */
export function getAllCategoriesSorted(): CookieCategory[] {
  return [
    'essential',
    'functional',
    'analytics',
    'performance',
    'marketing',
    'affiliate',
    'personalization',
    'third-party',
  ];
}

/**
 * Check if category is essential
 */
export function isEssentialCategory(category: CookieCategory): boolean {
  return CATEGORY_METADATA[category]?.essential ?? false;
}

/**
 * Get all essential categories
 */
export function getEssentialCategories(): CookieCategory[] {
  return getAllCategoriesSorted().filter(isEssentialCategory);
}

/**
 * Get all non-essential categories
 */
export function getNonEssentialCategories(): CookieCategory[] {
  return getAllCategoriesSorted().filter((cat) => !isEssentialCategory(cat));
}

/**
 * Category hierarchy for UI rendering
 */
export const CATEGORY_GROUPS = {
  required: ['essential'] as const,
  functional: ['functional', 'personalization'] as const,
  tracking: ['analytics', 'performance'] as const,
  marketing: ['marketing', 'affiliate'] as const,
  integration: ['third-party'] as const,
};

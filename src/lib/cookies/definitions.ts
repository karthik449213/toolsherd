import { CookieDefinition, CookieCategory } from './types';

/**
 * Master cookie inventory
 * Group cookies by provider and category
 */
export const COOKIE_DEFINITIONS: Record<CookieCategory, CookieDefinition[]> = {
  essential: [
    {
      id: 'session_token',
      category: 'essential',
      name: 'session_token',
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 86400 * 7, // 7 days
      description: 'Session authentication token',
      purpose: 'Maintains your login session and security',
      provider: 'Our Website',
      policyLink: 'https://example.com/privacy#essential',
    },
    {
      id: 'csrf_token',
      category: 'essential',
      name: '_csrf',
      secure: true,
      sameSite: 'Lax',
      description: 'CSRF protection token',
      purpose: 'Protects against cross-site request forgery attacks',
      provider: 'Our Website',
    },
    {
      id: 'consent_token',
      category: 'essential',
      name: 'cookie_consent_given',
      secure: true,
      sameSite: 'Lax',
      description: 'Records that consent was collected',
      purpose: 'Ensures compliance with GDPR consent requirements',
      provider: 'Our Website',
    },
  ],

  functional: [
    {
      id: 'language_preference',
      category: 'functional',
      name: 'language',
      secure: false,
      sameSite: 'Lax',
      maxAge: 86400 * 365, // 1 year
      description: 'Language preference',
      purpose: 'Remembers your language choice for website interface',
      provider: 'Our Website',
    },
    {
      id: 'theme_preference',
      category: 'functional',
      name: 'theme',
      secure: false,
      sameSite: 'Lax',
      maxAge: 86400 * 365,
      description: 'Dark/Light theme preference',
      purpose: 'Stores your preferred color scheme (dark/light mode)',
      provider: 'Our Website',
    },
    {
      id: 'ui_preferences',
      category: 'functional',
      name: 'ui_prefs',
      secure: false,
      sameSite: 'Lax',
      maxAge: 86400 * 365,
      description: 'UI customization settings',
      purpose: 'Remembers layout and display preferences',
      provider: 'Our Website',
    },
  ],

  analytics: [
    {
      id: 'ga_analytics',
      category: 'analytics',
      name: '_ga',
      secure: true,
      sameSite: 'None',
      maxAge: 63072000, // 2 years
      description: 'Google Analytics tracking',
      purpose: 'Measures website traffic and user behavior to improve our service',
      provider: 'Google Analytics',
      policyLink: 'https://support.google.com/analytics/answer/6004245',
    },
    {
      id: 'ga_session',
      category: 'analytics',
      name: '_ga_*',
      secure: true,
      sameSite: 'None',
      maxAge: 63072000,
      description: 'Google Analytics session tracking',
      purpose: 'Groups analytics requests into sessions',
      provider: 'Google Analytics',
    },
    {
      id: 'hotjar_analytics',
      category: 'analytics',
      name: '_hjid',
      secure: true,
      sameSite: 'None',
      maxAge: 365 * 24 * 60 * 60,
      description: 'Hotjar session tracking',
      purpose: 'Records session replays and heatmaps to understand user interactions',
      provider: 'Hotjar',
      policyLink: 'https://help.hotjar.com/hc/en-us/articles/115011640887',
    },
  ],

  performance: [
    {
      id: 'cdn_perf_tracking',
      category: 'performance',
      name: 'cf_clearance',
      secure: true,
      sameSite: 'Lax',
      description: 'Cloudflare performance optimization',
      purpose: 'Optimizes content delivery and caching performance',
      provider: 'Cloudflare CDN',
      policyLink: 'https://www.cloudflare.com/privacypolicy/',
    },
    {
      id: 'next_js_draft_mode',
      category: 'performance',
      name: '__prerender_bypass',
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
      description: 'Next.js draft mode token',
      purpose: 'Enables preview of draft content during development',
      provider: 'Our Website',
    },
  ],

  marketing: [
    {
      id: 'facebook_pixel',
      category: 'marketing',
      name: 'fr',
      secure: true,
      sameSite: 'None',
      maxAge: 7776000, // 90 days
      description: 'Facebook conversion pixel',
      purpose: 'Tracks conversions and enables retargeting advertising on Facebook',
      provider: 'Meta (Facebook)',
      policyLink: 'https://www.facebook.com/policies/cookies/',
    },
    {
      id: 'google_ads_conversion',
      category: 'marketing',
      name: 'IDE',
      secure: true,
      sameSite: 'None',
      maxAge: 1209600, // 14 days
      description: 'Google Ads conversion tracking',
      purpose: 'Measures advertising campaign effectiveness and enables retargeting',
      provider: 'Google Ads',
      policyLink: 'https://policies.google.com/technologies/ads',
    },
    {
      id: 'linkedin_insight_tag',
      category: 'marketing',
      name: 'li_buid',
      secure: true,
      sameSite: 'None',
      description: 'LinkedIn Insight Tag',
      purpose: 'Tracks conversions and enables B2B retargeting on LinkedIn',
      provider: 'LinkedIn',
      policyLink: 'https://www.linkedin.com/legal/cookie-policy',
    },
  ],

  affiliate: [
    {
      id: 'affiliate_commission',
      category: 'affiliate',
      name: 'aff_id',
      secure: true,
      sameSite: 'Lax',
      maxAge: 2592000, // 30 days
      description: 'Affiliate partner tracking',
      purpose: 'Tracks affiliate referrals for commission attribution',
      provider: 'Our Affiliate Program',
      policyLink: 'https://example.com/affiliate#terms',
    },
    {
      id: 'partner_attribution',
      category: 'affiliate',
      name: 'partner_id',
      secure: true,
      sameSite: 'Lax',
      maxAge: 2592000,
      description: 'Partner attribution cookie',
      purpose: 'Attributes sales to referral partners for revenue sharing',
      provider: 'Our Affiliate Program',
    },
  ],

  personalization: [
    {
      id: 'user_segment',
      category: 'personalization',
      name: 'user_segment',
      secure: true,
      sameSite: 'Lax',
      maxAge: 86400 * 90, // 90 days
      description: 'User segmentation data',
      purpose: 'Personalizes content and recommendations based on your interests',
      provider: 'Our Website',
    },
    {
      id: 'ab_test_variant',
      category: 'personalization',
      name: 'ab_variant',
      secure: true,
      sameSite: 'Lax',
      description: 'A/B test variant assignment',
      purpose: 'Assigns you to test variations to improve our service',
      provider: 'Our Website',
    },
    {
      id: 'recommendation_engine',
      category: 'personalization',
      name: 'rec_preference',
      secure: true,
      sameSite: 'Lax',
      maxAge: 86400 * 365,
      description: 'Content recommendation preferences',
      purpose: 'Powers personalized content recommendations',
      provider: 'Our Website',
    },
  ],

  'third-party': [
    {
      id: 'intercom_messenger',
      category: 'third-party',
      name: 'intercom-id',
      secure: true,
      sameSite: 'None',
      description: 'Intercom customer messaging',
      purpose: 'Enables live chat and customer support messaging',
      provider: 'Intercom',
      policyLink: 'https://www.intercom.com/terms-and-policies',
    },
    {
      id: 'zendesk_widget',
      category: 'third-party',
      name: 'zendesk_cookie',
      secure: true,
      sameSite: 'None',
      description: 'Zendesk support widget',
      purpose: 'Powers customer support widget and ticket system',
      provider: 'Zendesk',
      policyLink: 'https://www.zendesk.com/company/agreements-and-terms/privacy-policy/',
    },
  ],
};

/**
 * Get all cookies for a specific category
 */
export function getCookiesByCategory(
  category: CookieCategory
): CookieDefinition[] {
  return COOKIE_DEFINITIONS[category] || [];
}

/**
 * Get all cookies (flattened)
 */
export function getAllCookies(): CookieDefinition[] {
  return Object.values(COOKIE_DEFINITIONS).flat();
}

/**
 * Get cookie by ID
 */
export function getCookieById(id: string): CookieDefinition | undefined {
  return getAllCookies().find((cookie) => cookie.id === id);
}

/**
 * Get cookies by provider
 */
export function getCookiesByProvider(provider: string): CookieDefinition[] {
  return getAllCookies().filter((cookie) => cookie.provider === provider);
}

/**
 * Count cookies per category
 */
export function getCategoryCounts(): Record<CookieCategory, number> {
  return {
    essential: COOKIE_DEFINITIONS.essential.length,
    functional: COOKIE_DEFINITIONS.functional.length,
    analytics: COOKIE_DEFINITIONS.analytics.length,
    performance: COOKIE_DEFINITIONS.performance.length,
    marketing: COOKIE_DEFINITIONS.marketing.length,
    affiliate: COOKIE_DEFINITIONS.affiliate.length,
    personalization: COOKIE_DEFINITIONS.personalization.length,
    'third-party': COOKIE_DEFINITIONS['third-party'].length,
  };
}

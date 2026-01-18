/**
 * Cookie Management System - Configuration
 * Master settings for all cookie behavior
 */

import { CookieCategory } from '@/lib/cookies/types';

// Google Analytics Configuration
export const GA_CONFIG = {
  enabled: true,
  id: process.env.NEXT_PUBLIC_GA_ID,
  anonymizeIp: true,
  cookieDomain: 'auto',
  cookiePath: '/',
};

// Facebook Pixel Configuration
export const FB_PIXEL_CONFIG = {
  enabled: true,
  pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  trackPageView: true,
  trackConversions: true,
};

// Hotjar Configuration
export const HOTJAR_CONFIG = {
  enabled: false,
  siteId: process.env.NEXT_PUBLIC_HOTJAR_SITE_ID,
};

// Cookie Banner Configuration
export const BANNER_CONFIG = {
  // Position: 'top' | 'bottom' | 'modal'
  position: 'bottom' as const,
  
  // Auto-dismiss after accepting
  autoDismiss: true,
  dismissDelay: 0, // ms
  
  // Show banner delay
  showDelay: 500, // ms
  
  // Banner text can be customized per region
  text: {
    title: 'Cookie Preferences',
    description: 'We use cookies to enhance your experience.',
  },
};

// Consent expiration
export const CONSENT_CONFIG = {
  // Expire consent after (seconds)
  expirySeconds: 365 * 24 * 60 * 60, // 1 year
  
  // Re-prompt after (seconds) - optional
  rePromptSeconds: null,
  
  // Store consent in
  storageMethod: 'localStorage' as const, // or 'cookies'
};

// Categories to display in banner
export const VISIBLE_CATEGORIES: CookieCategory[] = [
  'essential',
  'functional',
  'analytics',
  'marketing',
  'personalization',
];

// Per-region configuration
export const REGION_CONFIG = {
  eu: {
    requiresExplicitConsent: true,
    mustNotPreTick: true,
    showCookieList: true,
    requiresGranularControl: true,
  },
  uk: {
    requiresExplicitConsent: true,
    mustNotPreTick: true,
    showCookieList: true,
    requiresGranularControl: true,
  },
  us_ca: {
    requiresExplicitConsent: false,
    mustNotPreTick: false,
    showCookieList: true,
    requiresGranularControl: true,
  },
  india: {
    requiresExplicitConsent: true,
    mustNotPreTick: true,
    showCookieList: true,
    requiresGranularControl: true,
  },
  global: {
    requiresExplicitConsent: true,
    mustNotPreTick: true,
    showCookieList: true,
    requiresGranularControl: true,
  },
};

// Tracking domains (for cross-domain tracking)
export const TRACKING_DOMAINS = [
  'example.com',
  'www.example.com',
];

// Exclude paths from cookie tracking
export const EXCLUDE_PATHS = [
  '/admin',
  '/api',
  '/health',
];

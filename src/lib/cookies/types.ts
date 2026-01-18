import { z } from 'zod';

/**
 * Cookie categories for compliance
 */
export const COOKIE_CATEGORIES = {
  ESSENTIAL: 'essential',
  FUNCTIONAL: 'functional',
  ANALYTICS: 'analytics',
  PERFORMANCE: 'performance',
  MARKETING: 'marketing',
  AFFILIATE: 'affiliate',
  PERSONALIZATION: 'personalization',
  THIRD_PARTY: 'third-party',
} as const;

export type CookieCategory = typeof COOKIE_CATEGORIES[keyof typeof COOKIE_CATEGORIES];

/**
 * Zod schema for cookie definition validation
 */
export const CookieDefinitionSchema = z.object({
  id: z.string().min(1),
  category: z.enum([
    'essential',
    'functional',
    'analytics',
    'performance',
    'marketing',
    'affiliate',
    'personalization',
    'third-party',
  ]),
  name: z.string().min(1),
  domain: z.string().optional(),
  secure: z.boolean().default(true),
  httpOnly: z.boolean().optional(),
  sameSite: z.enum(['Strict', 'Lax', 'None']).default('Lax'),
  maxAge: z.number().int().positive().optional(),
  description: z.string().min(10),
  purpose: z.string().min(10),
  provider: z.string().min(1),
  policyLink: z.string().url().optional(),
});

export type CookieDefinition = z.infer<typeof CookieDefinitionSchema>;

/**
 * Zod schema for consent record validation
 */
export const ConsentRecordSchema = z.object({
  version: z.string().default('1.0'),
  timestamp: z.number().int(),
  ipHash: z.string().optional(),
  categories: z.record(z.enum([
    'essential',
    'functional',
    'analytics',
    'performance',
    'marketing',
    'affiliate',
    'personalization',
    'third-party',
  ]), z.boolean()),
  individual: z.record(z.string(), z.boolean()).optional(),
  source: z.enum(['banner', 'settings', 'api']),
  explicit: z.boolean(),
  revokeUrl: z.string().optional(),
});

export type ConsentRecord = z.infer<typeof ConsentRecordSchema>;

/**
 * Zod schema for category metadata
 */
export const CategoryMetadataSchema = z.object({
  label: z.string(),
  description: z.string(),
  essential: z.boolean(),
  default: z.boolean(),
  color: z.string().optional(),
});

export type CategoryMetadata = z.infer<typeof CategoryMetadataSchema>;

/**
 * Compliance region types
 */
export const COMPLIANCE_REGIONS = {
  EU: 'eu',
  UK: 'uk',
  US_CA: 'us_ca',
  INDIA: 'india',
  GLOBAL: 'global',
} as const;

export type ComplianceRegion = typeof COMPLIANCE_REGIONS[keyof typeof COMPLIANCE_REGIONS];

/**
 * Default consent state (all non-essential disabled)
 */
export const DEFAULT_CONSENT: Record<CookieCategory, boolean> = {
  essential: true,
  functional: false,
  analytics: false,
  performance: false,
  marketing: false,
  affiliate: false,
  personalization: false,
  'third-party': false,
};

/**
 * LocalStorage key
 */
export const CONSENT_STORAGE_KEY = 'cookie_consent_v1';

/**
 * Consent expiry (1 year in seconds)
 */
export const CONSENT_EXPIRY_SECONDS = 365 * 24 * 60 * 60;

/**
 * Consent audit trail limit (store last 10 updates)
 */
export const CONSENT_AUDIT_LIMIT = 10;

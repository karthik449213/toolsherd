import { z } from 'zod';

/**
 * Consent Schema & Validation
 * 
 * Defines the structure and validation rules for cookie consent data.
 * Works across server and client components.
 */

// Cookie category enum
export enum ConsentCategory {
  ESSENTIAL = 'essential',
  FUNCTIONAL = 'functional',
  ANALYTICS = 'analytics',
  MARKETING = 'marketing',
  AFFILIATE = 'affiliate',
  PERSONALIZATION = 'personalization',
  PERFORMANCE = 'performance',
  THIRD_PARTY = 'third_party',
}

// Single category consent status
export const CategoryConsentSchema = z.object({
  essential: z.boolean().default(true), // Always true, user cannot disable
  functional: z.boolean().default(false),
  analytics: z.boolean().default(false),
  marketing: z.boolean().default(false),
  affiliate: z.boolean().default(false),
  personalization: z.boolean().default(false),
  performance: z.boolean().default(false),
  third_party: z.boolean().default(false),
}).strict();

export type CategoryConsent = z.infer<typeof CategoryConsentSchema>;

// Complete consent record with metadata
export const ConsentRecordSchema = z.object({
  // Consent categories
  categories: CategoryConsentSchema,

  // Timestamps
  consentDate: z.number().positive('Consent date must be positive timestamp'),
  expiryDate: z.number().positive('Expiry date must be positive timestamp'),

  // User interaction metadata
  userAgent: z.string().min(1, 'User agent required for security'),
  ipHash: z.string().optional().nullable(),
  country: z.string().length(2).optional().nullable(), // ISO 3166-1 alpha-2
  gdprApplicable: z.boolean().default(false),
  ccpaApplicable: z.boolean().default(false),

  // Consent method
  consentSource: z.enum([
    'banner_accept_all',
    'banner_reject_all',
    'banner_preferences',
    'preferences_page',
    'api_call',
    'implicit_accept',
  ]),

  // Version tracking
  version: z.string().default('1.0'),
  policyVersion: z.string().default('1.0'),

  // Revocation tracking
  revokedAt: z.number().optional().nullable(),
  revokeReason: z.string().optional().nullable(),
}).strict();

export type ConsentRecord = z.infer<typeof ConsentRecordSchema>;

// Schema for consent update (partial)
export const ConsentUpdateSchema = ConsentRecordSchema.omit({
  consentDate: true,
  expiryDate: true,
  userAgent: true,
}).partial();

export type ConsentUpdate = z.infer<typeof ConsentUpdateSchema>;

// Cookie-safe consent (compressed for storage)
export const CompactConsentSchema = z.object({
  c: CategoryConsentSchema, // categories
  d: z.number(), // consentDate (unix timestamp / 1000 for smaller size)
  e: z.number(), // expiryDate (unix timestamp / 1000)
  s: z.enum([
    'aba', // banner_accept_all
    'abr', // banner_reject_all
    'abp', // banner_preferences
    'pp',  // preferences_page
    'api', // api_call
    'ia',  // implicit_accept
  ]), // consentSource (abbreviated)
  v: z.string(), // version
  pv: z.string(), // policyVersion
}).strict();

export type CompactConsent = z.infer<typeof CompactConsentSchema>;

// Default consent (everything except essential = false)
export const DEFAULT_CONSENT: CategoryConsent = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
  affiliate: false,
  personalization: false,
  performance: false,
  third_party: false,
};

// Consent retrieval response (for API)
export const ConsentResponseSchema = z.object({
  success: z.boolean(),
  data: ConsentRecordSchema.optional(),
  error: z.string().optional(),
  cached: z.boolean().default(false),
  source: z.enum(['cookie', 'localStorage', 'server', 'default']),
});

export type ConsentResponse = z.infer<typeof ConsentResponseSchema>;

/**
 * Validation helpers
 */

export function isConsentRecord(value: unknown): value is ConsentRecord {
  try {
    ConsentRecordSchema.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function isExpired(expiryDate: number): boolean {
  return expiryDate < Date.now();
}

export function getDefaultConsent(
  source: ConsentRecord['consentSource'] = 'implicit_accept',
  userAgent: string = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
): ConsentRecord {
  const now = Date.now();
  const oneYearMs = 365 * 24 * 60 * 60 * 1000;

  return {
    categories: DEFAULT_CONSENT,
    consentDate: now,
    expiryDate: now + oneYearMs,
    userAgent,
    country: null,
    gdprApplicable: false,
    ccpaApplicable: false,
    consentSource: source,
    version: '1.0',
    policyVersion: '1.0',
  };
}

export function validateAndFix(consent: unknown): ConsentRecord {
  try {
    // Try strict parsing first
    return ConsentRecordSchema.parse(consent);
  } catch (error) {
    // If it fails, return default
    console.warn('Invalid consent record, using default', error);
    return getDefaultConsent();
  }
}

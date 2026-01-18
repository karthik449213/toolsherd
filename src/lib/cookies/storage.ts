'use client';

import {
  ConsentRecord,
  ConsentRecordSchema,
  CONSENT_STORAGE_KEY,
  CONSENT_EXPIRY_SECONDS,
  CookieCategory,
  DEFAULT_CONSENT,
} from './types';

/**
 * Storage handler for cookie consent preferences
 * Uses localStorage for persistent, user-readable storage
 */
export class ConsentStorage {
  private static readonly KEY = CONSENT_STORAGE_KEY;

  /**
   * Get stored consent record
   */
  static getConsent(): ConsentRecord | null {
    try {
      if (typeof window === 'undefined') return null;

      const stored = localStorage.getItem(this.KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      
      // Validate with Zod schema
      const validated = ConsentRecordSchema.parse(parsed);
      
      // Check if expired (GDPR requires re-consent periodically)
      const oneYearAgo = Date.now() - CONSENT_EXPIRY_SECONDS * 1000;
      if (validated.timestamp < oneYearAgo) {
        this.clearConsent();
        return null;
      }

      return validated;
    } catch (error) {
      console.error('[Cookies] Invalid stored consent:', error);
      return null;
    }
  }

  /**
   * Save consent record
   */
  static setConsent(consent: ConsentRecord): void {
    try {
      if (typeof window === 'undefined') return;

      // Validate before saving
      const validated = ConsentRecordSchema.parse({
        ...consent,
        timestamp: consent.timestamp || Date.now(),
        version: '1.0',
      });

      localStorage.setItem(this.KEY, JSON.stringify(validated));
    } catch (error) {
      console.error('[Cookies] Failed to save consent:', error);
    }
  }

  /**
   * Clear all consent
   */
  static clearConsent(): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.KEY);
    } catch (error) {
      console.error('[Cookies] Failed to clear consent:', error);
    }
  }

  /**
   * Check if user has given consent for a category
   */
  static hasConsentFor(category: CookieCategory): boolean {
    const consent = this.getConsent();
    
    if (!consent) {
      // No consent = block non-essential
      return category === 'essential';
    }

    // Check individual override first
    if (consent.individual?.[category] !== undefined) {
      return consent.individual[category];
    }

    // Fall back to category consent
    return consent.categories[category] ?? DEFAULT_CONSENT[category];
  }

  /**
   * Check if explicit consent was given
   */
  static isExplicitConsent(): boolean {
    const consent = this.getConsent();
    return consent?.explicit ?? false;
  }

  /**
   * Get consent source (how it was given)
   */
  static getConsentSource(): 'banner' | 'settings' | 'api' | null {
    const consent = this.getConsent();
    return consent?.source ?? null;
  }

  /**
   * Get consent timestamp
   */
  static getConsentTimestamp(): number | null {
    const consent = this.getConsent();
    return consent?.timestamp ?? null;
  }

  /**
   * Get current consent categories
   */
  static getCategories(): Record<CookieCategory, boolean> {
    const consent = this.getConsent();
    
    if (!consent) {
      return DEFAULT_CONSENT;
    }

    return consent.categories as Record<CookieCategory, boolean>;
  }

  /**
   * Update specific category consent
   */
  static updateCategory(
    category: CookieCategory,
    enabled: boolean,
    source: 'settings' | 'api' = 'settings'
  ): void {
    const current = this.getConsent() || this.createDefaultConsent();

    this.setConsent({
      ...current,
      categories: {
        ...current.categories,
        [category]: enabled,
      },
      source,
      timestamp: Date.now(),
    });
  }

  /**
   * Update individual cookie consent
   */
  static updateIndividualCookie(
    cookieId: string,
    enabled: boolean
  ): void {
    const current = this.getConsent() || this.createDefaultConsent();

    this.setConsent({
      ...current,
      individual: {
        ...current.individual,
        [cookieId]: enabled,
      },
      source: 'settings',
      timestamp: Date.now(),
    });
  }

  /**
   * Accept all non-essential cookies
   */
  static acceptAll(): void {
    const consent: ConsentRecord = {
      version: '1.0',
      timestamp: Date.now(),
      categories: {
        essential: true,
        functional: true,
        analytics: true,
        performance: true,
        marketing: true,
        affiliate: true,
        personalization: true,
        'third-party': true,
      },
      source: 'banner',
      explicit: true,
    };

    this.setConsent(consent);
  }

  /**
   * Reject all non-essential cookies
   */
  static rejectAll(): void {
    const consent: ConsentRecord = {
      version: '1.0',
      timestamp: Date.now(),
      categories: DEFAULT_CONSENT,
      source: 'banner',
      explicit: true,
    };

    this.setConsent(consent);
  }

  /**
   * Update all categories at once
   */
  static updateAllCategories(
    categories: Record<CookieCategory, boolean>
  ): void {
    const consent: ConsentRecord = {
      version: '1.0',
      timestamp: Date.now(),
      categories,
      source: 'settings',
      explicit: true,
    };

    this.setConsent(consent);
  }

  /**
   * Create default consent record
   */
  private static createDefaultConsent(): ConsentRecord {
    return {
      version: '1.0',
      timestamp: Date.now(),
      categories: DEFAULT_CONSENT,
      source: 'banner',
      explicit: false,
    };
  }

  /**
   * Export consent for audit/compliance
   */
  static exportConsent(): ConsentRecord | null {
    return this.getConsent();
  }

  /**
   * Check if user needs to see banner
   * (hasn't explicitly given consent yet)
   */
  static shouldShowBanner(): boolean {
    const consent = this.getConsent();
    return !consent || !consent.explicit;
  }
}

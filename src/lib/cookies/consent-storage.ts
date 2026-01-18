/**
 * Consent Storage System
 * 
 * Manages cookie consent with fallback chain:
 * 1. HTTP Cookies (primary - persists across domains/tabs)
 * 2. localStorage (fallback - restricted to origin)
 * 3. Memory (session only)
 * 
 * Supports server and client components
 */

import {
  ConsentRecord,
  ConsentRecordSchema,
  ConsentUpdate,
  ConsentCategory,
  DEFAULT_CONSENT,
  isExpired,
  getDefaultConsent,
  validateAndFix,
  type CompactConsent,
} from './consent-schema';
import {
  getClientCookie,
  setClientCookie,
  deleteClientCookie,
  getServerCookie,
  setServerCookie,
  deleteServerCookie,
  compressConsent,
  decompressConsent,
  encodeCookie,
  decodeCookie,
  CONSENT_COOKIE_NAME,
  CONSENT_COOKIE_MAX_AGE,
  CONSENT_COOKIE_SECURE,
  CONSENT_COOKIE_SAME_SITE,
} from './cookie-utils';

/**
 * Client-side consent storage
 * Used in React components and client-side code
 */

export class ClientConsentStorage {
  private static readonly LOCALSTORAGE_KEY = 'cookie_consent_v1';
  private static memoryCache: ConsentRecord | null = null;

  /**
   * Read consent with fallback chain
   * 1. Cookie
   * 2. localStorage
   * 3. Memory cache
   * 4. Default
   */
  static read(): ConsentRecord {
    try {
      // Check memory cache first (fastest)
      if (this.memoryCache && !isExpired(this.memoryCache.expiryDate)) {
        return this.memoryCache;
      }

      // Try cookie
      const cookieValue = getClientCookie(CONSENT_COOKIE_NAME);
      if (cookieValue) {
        const decoded = decodeCookie<CompactConsent>(cookieValue);
        if (decoded) {
          const record = decompressConsent(decoded);
          if (!isExpired(record.expiryDate)) {
            this.memoryCache = record;
            return record;
          } else {
            // Cookie expired, clean up
            this.delete();
          }
        }
      }

      // Try localStorage
      const localData = localStorage.getItem(this.LOCALSTORAGE_KEY);
      if (localData) {
        const decoded = decodeCookie<ConsentRecord>(localData);
        if (decoded && ConsentRecordSchema.safeParse(decoded).success) {
          const record = decoded;
          if (!isExpired(record.expiryDate)) {
            // Update cookie from localStorage
            this.write(record);
            this.memoryCache = record;
            return record;
          } else {
            localStorage.removeItem(this.LOCALSTORAGE_KEY);
          }
        }
      }

      // Return default
      const defaultConsent = getDefaultConsent('implicit_accept');
      this.memoryCache = defaultConsent;
      return defaultConsent;
    } catch (error) {
      console.error('Failed to read consent', error);
      return getDefaultConsent('implicit_accept');
    }
  }

  /**
   * Write consent to storage
   * Updates: Cookie + localStorage + memory
   */
  static write(record: ConsentRecord): void {
    try {
      // Validate
      const validated = validateAndFix(record);

      // Compress and encode
      const compact = compressConsent(validated);
      const encoded = encodeCookie(compact);

      // Check size
      const size = Buffer.byteLength(`${CONSENT_COOKIE_NAME}=${encoded}`);
      if (size > 4096) {
        console.warn('Consent cookie exceeds 4KB, trying localStorage only');
        // Store in localStorage instead
        try {
          localStorage.setItem(this.LOCALSTORAGE_KEY, encodeCookie(validated));
        } catch {
          console.error('Failed to store consent in localStorage');
        }
        return;
      }

      // Write to cookie
      setClientCookie(CONSENT_COOKIE_NAME, encoded, {
        maxAge: CONSENT_COOKIE_MAX_AGE,
        secure: CONSENT_COOKIE_SECURE,
        sameSite: CONSENT_COOKIE_SAME_SITE,
      });

      // Also write to localStorage as backup
      try {
        localStorage.setItem(this.LOCALSTORAGE_KEY, encodeCookie(validated));
      } catch {
        // localStorage might be disabled, but cookie is set, so continue
      }

      // Update memory cache
      this.memoryCache = validated;
    } catch (error) {
      console.error('Failed to write consent', error);
    }
  }

  /**
   * Update specific categories
   */
  static update(updates: Partial<ConsentRecord>): void {
    const current = this.read();
    const updated: ConsentRecord = {
      ...current,
      ...updates,
      categories: {
        ...current.categories,
        ...(updates.categories || {}),
      },
      consentDate: current.consentDate, // Don't change original consent date
    };
    this.write(updated);
  }

  /**
   * Update categories and preserve metadata
   */
  static updateCategories(categories: Partial<typeof DEFAULT_CONSENT>): void {
    const current = this.read();
    this.update({
      categories: {
        ...current.categories,
        ...categories,
      },
      consentDate: current.consentDate,
    });
  }

  /**
   * Accept all categories
   */
  static acceptAll(): void {
    const record = this.read();
    this.write({
      ...record,
      categories: {
        essential: true,
        functional: true,
        analytics: true,
        marketing: true,
        affiliate: true,
        personalization: true,
        performance: true,
        third_party: true,
      },
      consentSource: 'banner_accept_all',
      consentDate: Date.now(),
      expiryDate: Date.now() + CONSENT_COOKIE_MAX_AGE * 1000,
    });
  }

  /**
   * Reject all non-essential categories
   */
  static rejectAll(): void {
    const record = this.read();
    this.write({
      ...record,
      categories: {
        essential: true,
        functional: false,
        analytics: false,
        marketing: false,
        affiliate: false,
        personalization: false,
        performance: false,
        third_party: false,
      },
      consentSource: 'banner_reject_all',
      consentDate: Date.now(),
      expiryDate: Date.now() + CONSENT_COOKIE_MAX_AGE * 1000,
    });
  }

  /**
   * Check consent for specific category
   */
  static hasConsent(category: ConsentCategory): boolean {
    const record = this.read();
    return record.categories[category] === true;
  }

  /**
   * Check consent for multiple categories
   */
  static hasAllConsents(...categories: ConsentCategory[]): boolean {
    return categories.every((cat) => this.hasConsent(cat));
  }

  static hasAnyConsent(...categories: ConsentCategory[]): boolean {
    return categories.some((cat) => this.hasConsent(cat));
  }

  /**
   * Delete all consent (logout/revoke)
   */
  static delete(): void {
    try {
      deleteClientCookie(CONSENT_COOKIE_NAME);
      try {
        localStorage.removeItem(this.LOCALSTORAGE_KEY);
      } catch {
        // Ignore localStorage errors
      }
      this.memoryCache = null;
    } catch (error) {
      console.error('Failed to delete consent', error);
    }
  }

  /**
   * Get consent expiry remaining time (ms)
   */
  static getTimeRemaining(): number {
    const record = this.read();
    const remaining = record.expiryDate - Date.now();
    return Math.max(0, remaining);
  }

  /**
   * Check if consent will expire soon (within 30 days)
   */
  static isExpiringSoon(): boolean {
    const remaining = this.getTimeRemaining();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    return remaining < thirtyDaysMs;
  }

  /**
   * Refresh consent expiry (for automatic renewal)
   */
  static refresh(): void {
    const record = this.read();
    this.write({
      ...record,
      expiryDate: Date.now() + CONSENT_COOKIE_MAX_AGE * 1000,
    });
  }

  /**
   * Clear memory cache (useful for testing)
   */
  static clearMemoryCache(): void {
    this.memoryCache = null;
  }
}

/**
 * Server-side consent storage
 * Used in API routes and server components
 */

export class ServerConsentStorage {
  /**
   * Read consent from cookies (server-side)
   * Only available in API routes and server components
   */
  static async read(): Promise<ConsentRecord> {
    try {
      const cookieValue = await getServerCookie(CONSENT_COOKIE_NAME);

      if (cookieValue) {
        const decoded = decodeCookie<CompactConsent>(cookieValue);
        if (decoded) {
          const record = decompressConsent(decoded);
          if (!isExpired(record.expiryDate)) {
            return record;
          }
        }
      }

      return getDefaultConsent('implicit_accept');
    } catch (error) {
      console.error('Failed to read server consent', error);
      return getDefaultConsent('implicit_accept');
    }
  }

  /**
   * Write consent to cookies (server-side)
   */
  static async write(record: ConsentRecord): Promise<void> {
    try {
      const validated = validateAndFix(record);
      const compact = compressConsent(validated);
      const encoded = encodeCookie(compact);

      await setServerCookie(CONSENT_COOKIE_NAME, encoded, {
        maxAge: CONSENT_COOKIE_MAX_AGE,
        secure: CONSENT_COOKIE_SECURE,
        sameSite: CONSENT_COOKIE_SAME_SITE as 'Strict' | 'Lax' | 'None',
      });
    } catch (error) {
      console.error('Failed to write server consent', error);
      throw error;
    }
  }

  /**
   * Delete consent from cookies (server-side)
   */
  static async delete(): Promise<void> {
    try {
      await deleteServerCookie(CONSENT_COOKIE_NAME);
    } catch (error) {
      console.error('Failed to delete server consent', error);
      throw error;
    }
  }

  /**
   * Check consent for category (server-side)
   */
  static async hasConsent(category: ConsentCategory): Promise<boolean> {
    const record = await this.read();
    return record.categories[category] === true;
  }
}

/**
 * Adaptive consent storage - works on server and client
 */

export const ConsentStorage = {
  read: async (): Promise<ConsentRecord> => {
    if (typeof window === 'undefined') {
      return ServerConsentStorage.read();
    }
    return ClientConsentStorage.read();
  },

  hasConsent: (category: ConsentCategory): boolean => {
    if (typeof window === 'undefined') {
      console.warn('Use ServerConsentStorage.hasConsent() in server context');
      return false;
    }
    return ClientConsentStorage.hasConsent(category);
  },

  hasAllConsents: (...categories: ConsentCategory[]): boolean => {
    if (typeof window === 'undefined') {
      console.warn('Use ServerConsentStorage.hasAllConsents() in server context');
      return false;
    }
    return ClientConsentStorage.hasAllConsents(...categories);
  },

  hasAnyConsent: (...categories: ConsentCategory[]): boolean => {
    if (typeof window === 'undefined') {
      console.warn('Use ServerConsentStorage.hasAnyConsent() in server context');
      return false;
    }
    return ClientConsentStorage.hasAnyConsent(...categories);
  },
};

/**
 * Re-export for convenience
 */

export type { ConsentRecord, CategoryConsent, CompactConsent } from './consent-schema';
export { ConsentCategory } from './consent-schema';

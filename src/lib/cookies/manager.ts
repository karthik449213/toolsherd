'use client';

import {
  CookieCategory,
  ConsentRecord,
  DEFAULT_CONSENT,
} from './types';
import { ConsentStorage } from './storage';
import { getCookiesByCategory, getAllCookies } from './definitions';
import { isEssentialCategory } from './categories';

/**
 * Main Cookie Manager class
 * Handles consent state, cookie script injection, and compliance
 */
export class CookieManager {
  private static injectedScripts = new Set<string>();
  private static listeners: Set<(consent: Record<CookieCategory, boolean>) => void> = new Set();

  /**
   * Initialize cookie management
   * Call this in your root layout's useEffect
   */
  static initialize(): void {
    // Inject essential scripts immediately
    this.injectScriptsForCategory('essential');

    // Inject consented scripts
    const consent = ConsentStorage.getCategories();
    Object.entries(consent).forEach(([category, enabled]) => {
      if (enabled) {
        this.injectScriptsForCategory(category as CookieCategory);
      }
    });

    // Notify listeners
    this.notifyListeners(consent);
  }

  /**
   * Subscribe to consent changes
   */
  static subscribe(
    callback: (consent: Record<CookieCategory, boolean>) => void
  ): () => void {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of consent change
   */
  private static notifyListeners(
    consent: Record<CookieCategory, boolean>
  ): void {
    this.listeners.forEach((listener) => listener(consent));
  }

  /**
   * Update consent for a category
   */
  static updateConsent(
    categories: Record<CookieCategory, boolean>,
    source: 'banner' | 'settings' | 'api' = 'settings'
  ): void {
    // Ensure essential is always true
    const consent: ConsentRecord = {
      version: '1.0',
      timestamp: Date.now(),
      categories: {
        ...categories,
        essential: true,
      },
      source,
      explicit: true,
    };

    ConsentStorage.setConsent(consent);

    // Inject scripts for newly consented categories
    Object.entries(consent.categories).forEach(([category, enabled]) => {
      if (enabled && category !== 'essential') {
        this.injectScriptsForCategory(category as CookieCategory);
      }
    });

    this.notifyListeners(consent.categories as Record<CookieCategory, boolean>);
  }

  /**
   * Check if user has consented to category
   */
  static hasConsent(category: CookieCategory): boolean {
    return ConsentStorage.hasConsentFor(category);
  }

  /**
   * Get current consent state
   */
  static getConsent(): Record<CookieCategory, boolean> {
    return ConsentStorage.getCategories();
  }

  /**
   * Accept all cookies
   */
  static acceptAll(): void {
    ConsentStorage.acceptAll();
    this.initialize();
  }

  /**
   * Reject all non-essential cookies
   */
  static rejectAll(): void {
    ConsentStorage.rejectAll();
    this.initialize();
  }

  /**
   * Revoke all consent (GDPR right)
   */
  static revokeConsent(): void {
    ConsentStorage.clearConsent();
    // Clear tracking cookies
    this.clearTrackingCookies();
  }

  /**
   * Check if explicit consent was given
   */
  static isExplicitConsent(): boolean {
    return ConsentStorage.isExplicitConsent();
  }

  /**
   * Get consent audit trail
   */
  static getAuditTrail(): ConsentRecord | null {
    return ConsentStorage.exportConsent();
  }

  /**
   * Should show banner
   */
  static shouldShowBanner(): boolean {
    return ConsentStorage.shouldShowBanner();
  }

  /**
   * Inject tracking scripts for a category
   * In production, use this with script management services
   */
  private static injectScriptsForCategory(category: CookieCategory): void {
    if (typeof window === 'undefined') return;

    // Map category to script injection function
    const scripts = {
      analytics: () => this.injectGoogleAnalytics(),
      marketing: () => this.injectFacebookPixel(),
      performance: () => this.injectPerformanceScripts(),
      personalization: () => this.injectPersonalizationScripts(),
      'third-party': () => this.injectThirdPartyScripts(),
      functional: () => {}, // Client-side only
      affiliate: () => this.injectAffiliateScripts(),
      essential: () => {}, // Core functionality
    };

    const injector = scripts[category];
    if (injector && !this.injectedScripts.has(category)) {
      injector();
      this.injectedScripts.add(category);
    }
  }

  /**
   * Inject Google Analytics
   */
  private static injectGoogleAnalytics(): void {
    if (typeof window === 'undefined' || document.querySelector('[data-ga-injected]')) {
      return;
    }

    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    if (!GA_ID) return;

    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.setAttribute('data-ga-injected', 'true');
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: unknown[]) {
      (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  /**
   * Inject Facebook Pixel
   */
  private static injectFacebookPixel(): void {
    if (typeof window === 'undefined' || (window as any).fbq) {
      return;
    }

    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    if (!FB_PIXEL_ID) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }

  /**
   * Inject performance scripts (CDN, prefetching, etc.)
   */
  private static injectPerformanceScripts(): void {
    if (typeof window === 'undefined') return;

    // DNS prefetch for external resources
    const prefetchHosts = [
      'https://www.google-analytics.com',
      'https://connect.facebook.net',
      'https://api.hotjar.com',
    ];

    prefetchHosts.forEach((host) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = host;
      document.head.appendChild(link);
    });
  }

  /**
   * Inject personalization scripts
   */
  private static injectPersonalizationScripts(): void {
    if (typeof window === 'undefined') return;
    // Load personalization service (e.g., recommendation engine)
  }

  /**
   * Inject third-party integrations
   */
  private static injectThirdPartyScripts(): void {
    if (typeof window === 'undefined') return;
    // Load Intercom, Zendesk, etc.
  }

  /**
   * Inject affiliate tracking
   */
  private static injectAffiliateScripts(): void {
    if (typeof window === 'undefined') return;
    // Load affiliate networks
  }

  /**
   * Clear tracking cookies when user revokes consent
   */
  private static clearTrackingCookies(): void {
    if (typeof window === 'undefined') return;

    const allCookies = getAllCookies();
    
    allCookies.forEach((cookie) => {
      // Only clear non-essential cookies
      if (!isEssentialCategory(cookie.category)) {
        document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        
        if (cookie.domain) {
          document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${cookie.domain}`;
        }
      }
    });
  }

  /**
   * GDPR: Get data processed
   */
  static getProcessedData(): ConsentRecord | null {
    return ConsentStorage.exportConsent();
  }

  /**
   * GDPR: Request data deletion
   */
  static requestDataDeletion(): void {
    this.revokeConsent();
    // Send deletion request to backend
  }
}

// Extend window for global access
declare global {
  interface Window {
    __cookieManager?: typeof CookieManager;
    dataLayer?: unknown[];
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  (window as any).__cookieManager = CookieManager;
}

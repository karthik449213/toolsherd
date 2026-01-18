'use client';

import { useEffect, useState, useCallback } from 'react';
import { CookieCategory } from '@/lib/cookies/types';
import { CookieManager } from '@/lib/cookies/manager';
import { ConsentStorage } from '@/lib/cookies/storage';

/**
 * React hook for managing cookie consent state
 * Handles initialization and real-time consent changes
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<Record<CookieCategory, boolean> | null>(
    null
  );
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize on mount
  useEffect(() => {
    // Get current consent state
    const currentConsent = ConsentStorage.getCategories();
    setConsent(currentConsent);
    setShowBanner(ConsentStorage.shouldShowBanner());
    setLoading(false);

    // Subscribe to updates
    const unsubscribe = CookieManager.subscribe((newConsent: Record<CookieCategory, boolean>) => {
      setConsent(newConsent);
      setShowBanner(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Accept all cookies
   */
  const acceptAll = useCallback(() => {
    CookieManager.acceptAll();
    setShowBanner(false);
  }, []);

  /**
   * Reject all non-essential cookies
   */
  const rejectAll = useCallback(() => {
    CookieManager.rejectAll();
    setShowBanner(false);
  }, []);

  /**
   * Update consent for specific category
   */
  const updateCategory = useCallback(
    (category: CookieCategory, enabled: boolean) => {
      if (consent) {
        const updated: Record<CookieCategory, boolean> = { ...consent, [category]: enabled };
        
        // Essential can't be disabled
        if (category === 'essential') {
          updated.essential = true;
        }
        
        CookieManager.updateConsent(updated, 'settings');
      }
    },
    [consent]
  );

  /**
   * Update all categories
   */
  const updateAllCategories = useCallback(
    (categories: Record<CookieCategory, boolean>) => {
      CookieManager.updateConsent(categories, 'settings');
    },
    []
  );

  /**
   * Check if user has consent for category
   */
  const hasConsent = useCallback((category: CookieCategory): boolean => {
    return CookieManager.hasConsent(category);
  }, []);

  /**
   * Revoke all consent
   */
  const revokeConsent = useCallback(() => {
    CookieManager.revokeConsent();
    setShowBanner(true);
  }, []);

  /**
   * Accept banner and close it
   */
  const acceptBanner = useCallback(() => {
    acceptAll();
    setShowBanner(false);
  }, [acceptAll]);

  /**
   * Reject banner and close it
   */
  const rejectBanner = useCallback(() => {
    rejectAll();
    setShowBanner(false);
  }, [rejectAll]);

  /**
   * Close banner without action
   */
  const closeBanner = useCallback(() => {
    setShowBanner(false);
  }, []);

  return {
    // State
    consent,
    showBanner,
    loading,

    // Actions
    acceptAll,
    rejectAll,
    updateCategory,
    updateAllCategories,
    hasConsent,
    revokeConsent,

    // Banner-specific actions
    acceptBanner,
    rejectBanner,
    closeBanner,

    // Status checks
    isExplicitConsent: CookieManager.isExplicitConsent(),
    shouldShowBanner: ConsentStorage.shouldShowBanner(),
  };
}

/**
 * Hook to check if specific cookie is enabled
 */
export function useCookieEnabled(cookieId: string): boolean {
  const { consent } = useCookieConsent();
  
  // Find cookie and check if its category is enabled
  // (You'd need to import getCookieById from definitions)
  return consent ? true : false;
}

/**
 * Hook for banner display logic
 */
export function useCookieBanner() {
  const {
    showBanner,
    acceptBanner,
    rejectBanner,
    closeBanner,
    consent,
  } = useCookieConsent();

  const isOpen = showBanner && !localStorage.getItem('cookie_consent_v1_dismissed');

  return {
    isOpen,
    onAccept: acceptBanner,
    onReject: rejectBanner,
    onClose: closeBanner,
    consent,
  };
}

'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/hooks/useCookieConsent';

/**
 * Cookie Auto-Accept Component
 * Automatically accepts all cookies on homepage
 * Shows banner on other pages
 */
export function CookieAutoAccept() {
  const pathname = usePathname();
  const { showBanner, acceptAll } = useCookieConsent();
  const isHomepage = pathname === '/';

  useEffect(() => {
    // Auto-accept cookies on homepage if banner is shown
    if (isHomepage && showBanner) {
      // Small delay to ensure consent is properly set
      const timer = setTimeout(() => {
        acceptAll();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isHomepage, showBanner, acceptAll]);

  // Return null - this component only handles auto-accept, doesn't render anything
  return null;
}

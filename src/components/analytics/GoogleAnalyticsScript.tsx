'use client';

import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

/**
 * Google Analytics Script Component
 * Only loads after user explicitly consents to analytics cookies
 * Compliant with GDPR, CCPA, and Privacy regulations
 */
export function GoogleAnalyticsScript() {
  const { consent, loading } = useCookieConsent();

  useEffect(() => {
    // Don't load if still initializing
    if (loading) return;

    // Only load if user explicitly consented to analytics
    if (!consent?.analytics) {
      console.log('[Analytics] Consent not given for analytics cookies');
      return;
    }

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) {
      console.warn('[Analytics] No GA ID configured in environment variables');
      return;
    }

    // Dynamically inject GA script only after consent
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.onload = () => {
      // Initialize Google Analytics
      const dataLayer = window.dataLayer || [];
      window.dataLayer = dataLayer;
      
      function gtag(...args: any[]) {
        dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId, {
        page_path: window.location.pathname,
        anonymize_ip: true,
      });

      console.log('[Analytics] Google Analytics loaded with consent');
    };
    script.onerror = () => {
      console.error('[Analytics] Failed to load Google Analytics script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if component unmounts
    };
  }, [consent?.analytics, loading]);

  // Render nothing - this is a side-effect component
  return null;
}

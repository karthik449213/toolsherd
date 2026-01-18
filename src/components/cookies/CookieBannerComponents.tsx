'use client';

import React, { useEffect, useState } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CATEGORY_METADATA } from '@/lib/cookies/categories';

/**
 * CookieBannerMinimal - Dark cyber theme, minimal design
 * 
 * Features:
 * - First visit detection
 * - Accept All / Reject All buttons
 * - Link to preferences
 * - Accessible (WCAG 2.1 AA)
 * - Keyboard navigation
 * - Smooth animations
 */
export function CookieBannerMinimal() {
  const { showBanner, acceptAll, rejectAll } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle first render to show banner if needed
  useEffect(() => {
    if (showBanner) {
      setIsVisible(true);
      // Trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, [showBanner]);

  if (!isVisible) return null;

  const handleAccept = () => {
    setIsAnimating(false);
    setTimeout(() => {
      acceptAll();
      setIsVisible(false);
    }, 300);
  };

  const handleReject = () => {
    setIsAnimating(false);
    setTimeout(() => {
      rejectAll();
      setIsVisible(false);
    }, 300);
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isAnimating && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 opacity-100 backdrop-blur-sm"
          onClick={handleReject}
          aria-hidden="true"
        />
      )}

      {/* Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAnimating
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0'
        }`}
        role="region"
        aria-label="Cookie consent banner"
        aria-live="polite"
      >
        {/* Glow effect for cyber theme */}
        <div className="absolute inset-0 -top-px bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-lg" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-slate-900/95 border-t border-cyan-500/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Message Section */}
            <div className="flex-1 pr-4">
              <h2 className="text-sm font-semibold text-white tracking-wider uppercase">
                🔐 Privacy & Cookies
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                We use cookies to enhance your experience and analyze our traffic. Some are
                essential for functionality, others require your consent.{' '}
                <a
                  href="/privacy-policy#cookies"
                  className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:gap-2">
              {/* Reject Button */}
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-700/80 hover:text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-nowrap"
                aria-label="Reject all cookies"
              >
                Reject All
              </button>

              {/* Preferences Button */}
              <a
                href="/cookies/preferences"
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:border-purple-500 hover:bg-slate-700/80 hover:text-purple-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-nowrap"
                aria-label="Manage cookie preferences"
              >
                Preferences
              </a>

              {/* Accept Button - Primary CTA */}
              <button
                onClick={handleAccept}
                className="px-6 py-2 text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-nowrap shadow-lg hover:shadow-cyan-500/50"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * CookiePreferencesModal - Detailed cookie management
 * 
 * Features:
 * - Category toggles
 * - Per-cookie override (optional)
 * - Save preferences
 * - Accessible focus management
 */
export function CookiePreferencesModal() {
  const { consent, updateAllCategories, closeBanner } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<Record<string, boolean> | null>(null);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (consent) {
      setLocalConsent(consent);
    }
  }, [consent]);

  if (!localConsent) return null;

  const handleToggle = (category: string) => {
    if (category === 'essential') return; // Essential can't be disabled

    const updated = { ...localConsent, [category]: !localConsent[category] };
    setLocalConsent(updated);
    setHasChanged(true);
  };

  const handleSave = () => {
    updateAllCategories(localConsent as any);
    setHasChanged(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        🔐 Cookie Preferences
      </h1>
      <p className="mt-3 text-slate-400 text-sm leading-relaxed">
        Customize which cookies we can use on your device. Essential cookies are always
        enabled to ensure proper site functionality and security.
      </p>

      <div className="mt-8 space-y-4">
        {Object.entries(CATEGORY_METADATA).map(([category, meta]) => {
          const isEnabled = localConsent[category];
          const isEssential = category === 'essential';

          return (
            <div
              key={category}
              className="group flex items-start gap-4 rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 hover:border-slate-600 transition-all duration-200"
            >
              {/* Checkbox */}
              <div className="flex items-center pt-1">
                <input
                  type="checkbox"
                  id={`cookie-${category}`}
                  checked={isEnabled}
                  onChange={() => handleToggle(category)}
                  disabled={isEssential}
                  className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 focus:ring-offset-slate-900 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`${meta.label} cookies`}
                />
              </div>

              {/* Description */}
              <div className="flex-1">
                <label
                  htmlFor={`cookie-${category}`}
                  className="block font-semibold text-white cursor-pointer group-hover:text-cyan-300 transition-colors"
                >
                  {meta.label}
                  {isEssential && (
                    <span className="ml-2 text-xs font-normal px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                      Required
                    </span>
                  )}
                </label>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                  {meta.description}
                </p>
              </div>

              {/* Toggle indicator */}
              <div className="flex-shrink-0 pt-1">
                <div
                  className={`inline-flex h-6 w-10 items-center rounded-full transition-colors ${
                    isEnabled
                      ? 'bg-gradient-to-r from-cyan-500 to-cyan-600'
                      : 'bg-slate-700'
                  } ${isEssential ? 'ring-2 ring-cyan-500/50' : ''}`}
                >
                  <div
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isEnabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a
          href="/"
          className="px-6 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-700/80 hover:text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-center"
        >
          Cancel
        </a>
        <button
          onClick={handleSave}
          disabled={!hasChanged}
          className="px-6 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          aria-label="Save cookie preferences"
        >
          {hasChanged ? 'Save Preferences' : 'No Changes'}
        </button>
      </div>
    </div>
  );
}

/**
 * CookieBannerCompact - Inline banner (no overlay)
 * For less intrusive placement
 */
export function CookieBannerCompact() {
  const { showBanner, acceptAll, rejectAll } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showBanner) {
      setIsVisible(true);
    }
  }, [showBanner]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-cyan-500/30 bg-slate-900/95 backdrop-blur-xl px-4 py-4 sm:px-6 lg:px-8"
      role="region"
      aria-label="Cookie consent notice"
      aria-live="polite"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">
          We use cookies to enhance your experience.{' '}
          <a
            href="/privacy-policy#cookies"
            className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
          >
            Learn more
          </a>
        </p>
        <div className="flex gap-2">
          <button
            onClick={rejectAll}
            className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={acceptAll}
            className="px-3 py-2 text-xs font-semibold text-slate-900 bg-cyan-500 rounded hover:bg-cyan-600 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

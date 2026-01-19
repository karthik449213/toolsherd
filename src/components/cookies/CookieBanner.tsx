'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CookieCategory } from '@/lib/cookies/types';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CATEGORY_METADATA } from '@/lib/cookies/categories';
import { CATEGORY_GROUPS } from '@/lib/cookies/categories';

/**
 * Cookie Banner Component
 * Minimal, GDPR-compliant banner
 * - No pre-ticked boxes
 * - Clear accept/reject buttons
 * - Link to preferences
 * - Hidden on homepage (auto-accepts instead)
 */
export function CookieBanner() {
  const pathname = usePathname();
  const { showBanner, acceptAll, rejectAll, closeBanner } = useCookieConsent();
  const [isClient, setIsClient] = useState(false);
  const isHomepage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hide banner on homepage (auto-accept happens separately)
  if (!isClient || !showBanner || isHomepage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Message */}
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Cookie Preferences
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              We use cookies to enhance your browsing experience. Some are essential,
              others help us improve our service.{' '}
              <a
                href="/cookies"
                className="underline hover:no-underline"
              >
                Learn more
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 sm:gap-2">
            <button
              onClick={rejectAll}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Reject All
            </button>
            <button
              onClick={acceptAll}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Accept All
            </button>
            <a
              href="/cookies/preferences"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Preferences
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Cookie Preferences Modal/Page Component
 * Detailed granular controls
 */
export function CookiePreferences() {
  const { consent, updateAllCategories, updateCategory } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<Record<CookieCategory, boolean> | null>(null);

  useEffect(() => {
    if (consent) {
      setLocalConsent(consent);
    }
  }, [consent]);

  if (!localConsent) return null;

  const handleCategoryChange = (category: CookieCategory, enabled: boolean) => {
    if (category === 'essential') return; // Essential can't be disabled

    const updated = { ...localConsent, [category]: enabled };
    setLocalConsent(updated);
  };

  const handleSave = () => {
    updateAllCategories(localConsent);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Cookie Preferences
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Manage your cookie preferences below. Essential cookies cannot be disabled.
      </p>

      <div className="mt-8 space-y-6">
        {Object.entries(CATEGORY_GROUPS).map(([group, categories]) => (
          <div key={group}>
            {categories.map((category: CookieCategory) => {
              const meta = CATEGORY_METADATA[category];
              const isEnabled = localConsent[category];

              return (
                <div
                  key={category}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <input
                    type="checkbox"
                    id={category}
                    checked={isEnabled}
                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                    disabled={category === 'essential'}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={category}
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      {meta?.label}
                    </label>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {meta?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
        >
          Save Preferences
        </button>
        <a
          href="/"
          className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300"
        >
          Cancel
        </a>
      </div>
    </div>
  );
}

/**
 * Simple cookie toggle component
 */
interface CookieToggleProps {
  category: CookieCategory;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

export function CookieToggle({
  category,
  enabled,
  onChange,
  disabled = false,
}: CookieToggleProps) {
  const meta = CATEGORY_METADATA[category];

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{meta?.label}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{meta?.description}</p>
      </div>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="ml-4"
      />
    </div>
  );
}

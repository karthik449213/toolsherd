'use client';

import React from 'react';
import { CookieBannerMinimal, CookiePreferencesModal } from '@/components/cookies/CookieBannerComponents';

/**
 * CookiePreferencesPage
 * Full-page cookie preferences with dark cyber theme
 */
export default function CookiePreferencesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <a
                  href="/"
                  className="text-lg font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  🤖 AI Tools Directory
                </a>
              </div>
              <a
                href="/"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                ← Back
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <CookiePreferencesModal />

          {/* Additional Info */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Info Card 1 */}
            <div className="rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span>🛡️</span> Your Privacy
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                We respect your privacy and only collect data with your explicit consent. You
                can change your preferences at any time.
              </p>
            </div>

            {/* Info Card 2 */}
            <div className="rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span>📋</span> Data Rights
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                You have the right to access, modify, or delete your data. Visit our{' '}
                <a
                  href="/privacy-policy"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
                >
                  privacy policy
                </a>{' '}
                for more information.
              </p>
            </div>

            {/* Info Card 3 */}
            <div className="rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span>⏱️</span> Consent Duration
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Your consent preferences are stored for 1 year. After that, we'll ask you to
                review them again to ensure they still match your preferences.
              </p>
            </div>

            {/* Info Card 4 */}
            <div className="rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span>🔗</span> Third Parties
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                We use third-party services for analytics and marketing. Each has its own
                privacy policy - you can review them in our privacy documentation.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-6">
              {/* FAQ Item 1 */}
              <details className="group rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-white hover:text-cyan-300 transition-colors">
                  What are essential cookies?
                  <span className="text-xl transition-transform group-open:rotate-180">
                    ›
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  Essential cookies are required for the website to function properly. They
                  include session tokens, security cookies, and CSRF protection. These
                  cannot be disabled and do not require consent under GDPR.
                </p>
              </details>

              {/* FAQ Item 2 */}
              <details className="group rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-white hover:text-cyan-300 transition-colors">
                  How long do you keep my data?
                  <span className="text-xl transition-transform group-open:rotate-180">
                    ›
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  Analytics data is typically retained for 2 years. Marketing data for 90
                  days. Your consent preferences are kept for 1 year. We delete data sooner
                  if you request it.
                </p>
              </details>

              {/* FAQ Item 3 */}
              <details className="group rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-white hover:text-cyan-300 transition-colors">
                  Can I change my preferences later?
                  <span className="text-xl transition-transform group-open:rotate-180">
                    ›
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  Yes! You can change your preferences anytime by clicking "Cookie
                  Preferences" in the footer or revisiting this page. Your changes take
                  effect immediately.
                </p>
              </details>

              {/* FAQ Item 4 */}
              <details className="group rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-white hover:text-cyan-300 transition-colors">
                  How do I delete my data?
                  <span className="text-xl transition-transform group-open:rotate-180">
                    ›
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  You can request data deletion by contacting us at{' '}
                  <a
                    href="mailto:privacy@example.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
                  >
                    privacy@example.com
                  </a>{' '}
                  or through our data deletion form.
                </p>
              </details>
            </div>
          </section>

          {/* Support */}
          <section className="mt-16 rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8">
            <h2 className="text-xl font-bold text-white">Need Help?</h2>
            <p className="mt-3 text-sm text-slate-400">
              If you have questions about our cookie usage or privacy practices, please{' '}
              <a
                href="mailto:privacy@example.com"
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
              >
                contact us
              </a>{' '}
              or visit our{' '}
              <a
                href="/privacy-policy"
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
              >
                privacy policy
              </a>
              .
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-400">
              © 2026 AI Tools Directory. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Banner */}
      <CookieBannerMinimal />
    </div>
  );
}

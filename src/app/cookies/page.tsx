'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/privacy-policy" className="inline-block mb-8">
          <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-slate-800/50 rounded-lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Privacy Policy
          </Button>
        </Link>

        <article className="space-y-8 text-slate-300">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-cyan-100 font-mono">Cookie Policy</h1>
            <p className="text-lg text-slate-400">
              Last updated: January 18, 2026 • Effective immediately
            </p>
          </div>

          <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-6 rounded">
            <p className="text-sm text-slate-200 mb-2">
              <strong>Quick Summary:</strong> We use cookies to help you discover AI tools,
              improve your experience, and understand how our community uses the platform.
              You control which cookies we use—just update your preferences anytime.
            </p>
            <Link href="/cookies/preferences" className="inline-block mt-3">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg px-4 py-2 text-sm">
                Manage Cookie Preferences
              </Button>
            </Link>
          </div>

          <h2 className="text-2xl font-bold mt-8 text-cyan-300 font-mono">
            What Are Cookies?
          </h2>
          <p className="text-slate-300">
            Cookies are small text files stored on your device that help websites remember
            information about you. Think of them as digital sticky notes that make your
            browsing experience smoother. They don't contain viruses or track you around
            the internet by themselves they only work within the websites that set them.
          </p>

          <h2 className="text-2xl font-bold mt-8 text-cyan-300 font-mono">
            Our Approach to Cookies
          </h2>
          <p className="text-slate-300">
            We believe in <strong>transparency and control</strong>. Unless a cookie is
            essential for the website to work, we ask for your permission first. You can
            change your preferences at any time using the cookie banner that appears at
            the bottom of your screen.
          </p>

          <h2 className="text-2xl font-bold mt-8 text-cyan-300 font-mono">
            Types of Cookies We Use
          </h2>

          <div className="space-y-6">
            {/* Essential */}
            <div className="border-l-4 border-green-500 pl-6 bg-green-500/10 p-4 rounded">
              <h3 className="text-xl font-bold text-green-300 mb-2">
                🔒 Essential (Always Required)
              </h3>
              <p className="text-slate-300 mb-3">
                These cookies are strictly necessary to make our website work. Without them,
                features break—like staying logged in or completing a search. We don't need
                your permission to use these.
              </p>
              <p className="font-semibold text-slate-200 mb-2">What we store:</p>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>
                  <strong>Session ID:</strong> Remembers you're logged in across pages
                </li>
                <li>
                  <strong>Cookie Preferences:</strong> Your consent choices (so we don't keep
                  asking)
                </li>
                <li>
                  <strong>CSRF Protection:</strong> Prevents malicious form submissions
                </li>
                <li>
                  <strong>Language/Theme:</strong> Your display preferences (dark mode, etc.)
                </li>
              </ul>
              <p className="text-sm text-slate-400 mt-3">
                <strong>Expiry:</strong> Varies (most clear when you close your browser)
              </p>
            </div>

            {/* Analytics */}
            <div className="border-l-4 border-blue-500 pl-6 bg-blue-500/10 p-4 rounded">
              <h3 className="text-xl font-bold text-blue-300 mb-2">
                📊 Analytics (Help Us Improve)
              </h3>
              <p className="text-slate-300 mb-3">
                We use analytics to understand how you interact with our AI tools directory.
                This helps us discover which tools are most useful, identify broken links,
                and build features you actually want. <strong>No personal data is sold.</strong>
              </p>
              <p className="font-semibold text-slate-200 mb-2">What we learn:</p>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>Which AI tools you search for or click on</li>
                <li>How long you spend on each tool's page</li>
                <li>Common search queries (to improve rankings)</li>
                <li>Device type and browser (desktop vs. mobile?)</li>
                <li>Rough location (country level only, never your address)</li>
              </ul>
              <p className="text-sm text-slate-400 mt-3">
                <strong>Services:</strong> Google Analytics 4, Vercel Analytics
              </p>
              <p className="text-sm text-slate-400">
                <strong>Expiry:</strong> 13 months (then we delete it)
              </p>
            </div>

            {/* Marketing */}
            <div className="border-l-4 border-purple-500 pl-6 bg-purple-500/10 p-4 rounded">
              <h3 className="text-xl font-bold text-purple-300 mb-2">
                📢 Marketing (Show Relevant Ads)
              </h3>
              <p className="text-slate-300 mb-3">
                Marketing cookies let us show you ads about tools we think you'll find
                useful on other websites. They also help us measure if our promotions work.
                You can opt out anytime. we won't be offended!
              </p>
              <p className="font-semibold text-slate-200 mb-2">What we track:</p>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>AI tools you've viewed (so we can remind you later)</li>
                <li>Your interests in different AI categories</li>
                <li>Whether you clicked our ads on other platforms</li>
              </ul>
              <p className="text-sm text-slate-400 mt-3">
                <strong>Services:</strong> Facebook Pixel, Google Ads, LinkedIn Ads
              </p>
              <p className="text-sm text-slate-400">
                <strong>Expiry:</strong> 180 days or until you clear cookies
              </p>
            </div>

            {/* Affiliate */}
            <div className="border-l-4 border-orange-500 pl-6 bg-orange-500/10 p-4 rounded">
              <h3 className="text-xl font-bold text-orange-300 mb-2">
                🤝 Affiliate Tracking (Commission Attribution)
              </h3>
              <p className="text-slate-300 mb-3">
                When you click an affiliate link to purchase an AI tool subscription, this
                cookie tracks that you came from our site. It ensures the tool provider
                credits us with the referral (and we earn a small commission to keep the
                site running).
              </p>
              <p className="font-semibold text-slate-200 mb-2">What we track:</p>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>When you clicked a referral link</li>
                <li>Which tool you were interested in</li>
                <li>Whether the purchase completed</li>
              </ul>
              <p className="text-sm text-slate-400 mt-3">
                <strong>Services:</strong> Tool provider affiliate networks (e.g., ChatGPT
                affiliate program, RunwayML, Midjourney)
              </p>
              <p className="text-sm text-slate-400">
                <strong>Expiry:</strong> 30-90 days (varies by partner)
              </p>
            </div>

            {/* Performance */}
            <div className="border-l-4 border-teal-500 pl-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                ⚡ Performance (Speed & Stability)
              </h3>
              <p className="text-slate-300 mb-3">
                These cookies help us keep our website fast and reliable. They track error
                rates, page load times, and which features might be lagging. Think of it as
                our website's health monitor.
              </p>
              <p className="font-semibold text-slate-200 mb-2">What we monitor:</p>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li>Page load speed (which AI tools page loads slowly?)</li>
                <li>JavaScript errors (broken search filters?)</li>
                <li>Browser crash reports</li>
                <li>API response times</li>
              </ul>
              <p className="text-sm text-slate-400 mt-3">
                <strong>Services:</strong> Sentry (error tracking), Vercel Analytics
              </p>
              <p className="text-sm text-slate-400">
                <strong>Expiry:</strong> 30 days
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400 font-mono">
            Third-Party Services & Data Sharing
          </h2>
          <p className="text-slate-300 mb-4">
            We partner with trusted services to run the site better. Here's who gets access
            to what:
          </p>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-slate-800/40">
                <th className="border border-slate-300 p-3 text-left font-bold">Service</th>
                <th className="border border-slate-300 p-3 text-left font-bold">Purpose</th>
                <th className="border border-slate-300 p-3 text-left font-bold">Data Shared</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="border border-slate-300 p-3">
                  <strong>Google Analytics 4</strong>
                </td>
                <td className="border border-slate-300 p-3">Understand user behavior</td>
                <td className="border border-slate-300 p-3">
                  Anonymous page views, clicks, search queries
                </td>
              </tr>
              <tr className="bg-slate-800/40">
                <td className="border border-slate-300 p-3">
                  <strong>Vercel Analytics</strong>
                </td>
                <td className="border border-slate-300 p-3">Monitor performance</td>
                <td className="border border-slate-300 p-3">
                  Page load times, Core Web Vitals
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-3">
                  <strong>Facebook Pixel</strong>
                </td>
                <td className="border border-slate-300 p-3">Retarget ads on Facebook/Instagram</td>
                <td className="border border-slate-300 p-3">
                  Pages viewed, tools searched (anonymized)
                </td>
              </tr>
              <tr className="bg-slate-800/40">
                <td className="border border-slate-300 p-3">
                  <strong>Google Ads</strong>
                </td>
                <td className="border border-slate-300 p-3">Retarget ads on Google</td>
                <td className="border border-slate-300 p-3">
                  Site visit confirmation, browsing behavior
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-3">
                  <strong>Affiliate Networks</strong>
                </td>
                <td className="border border-slate-300 p-3">Track referral commissions</td>
                <td className="border border-slate-300 p-3">
                  Tool clicked, purchase completed (yes/no)
                </td>
              </tr>
              <tr className="bg-slate-800/40">
                <td className="border border-slate-300 p-3">
                  <strong>Sentry</strong>
                </td>
                <td className="border border-slate-300 p-3">Track errors & crashes</td>
                <td className="border border-slate-300 p-3">
                  Error messages, browser info (no personal data)
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm text-slate-300 mb-4">
            ℹ️ <strong>Important:</strong> All third-party services are GDPR and CCPA
            compliant. They don't sell your data to advertisers. They only help us run
            better ads and understand how people find us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400 font-mono">
            How You Control Cookies
          </h2>

          <h3 className="text-xl font-bold mt-6 mb-3 text-cyan-400 font-mono">
            Option 1: Cookie Banner (Easiest)
          </h3>
          <p className="text-slate-300 mb-4">
            See the cookie notice at the bottom of your screen? Click the settings button
            to:
          </p>
          <ul className="list-disc pl-5 text-slate-300 space-y-1 mb-4">
            <li>Turn categories on or off</li>
            <li>Accept all cookies</li>
            <li>Reject all (except essential)</li>
            <li>Your choices are saved for 1 year</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 text-cyan-400 font-mono">
            Option 2: Browser Settings
          </h3>
          <p className="text-slate-300 mb-4">
            Your browser can manage cookies too. You can:
          </p>
          <ul className="list-disc pl-5 text-slate-300 space-y-2 mb-4">
            <li>
              <strong>Chrome:</strong> Settings → Privacy → Cookies and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Preferences → Privacy → Cookies
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Privacy → Cookies and other site data
            </li>
          </ul>
          <p className="text-sm text-slate-300 mb-4">
            ⚠️ <strong>Heads up:</strong> Blocking essential cookies might break some
            features (like logging in).
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-cyan-400 font-mono">
            Option 3: Opt-Out of Tracking
          </h3>
          <ul className="list-disc pl-5 text-slate-300 space-y-2 mb-4">
            <li>
              <strong>Opt out of Google Analytics:</strong>{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Download the Google Analytics Opt-Out extension
              </a>
            </li>
            <li>
              <strong>Opt out of Facebook Ads:</strong> Facebook Ads Preferences → click
              "Why you're seeing this"
            </li>
            <li>
              <strong>Global opt-out:</strong> Visit{' '}
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                aboutads.info
              </a>{' '}
              to opt out of targeted ads across websites
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400 font-mono">
            Privacy Regulations We Follow
          </h2>

          <div className="space-y-4">
            <div className=" p-4 rounded border border-green-200">
              <h3 className="font-bold text-cyan-400 mb-2">
                🇪🇺 GDPR (Europe)
              </h3>
              <p className="text-slate-300">
                If you're in Europe, GDPR gives you the right to know what data we collect,
                correct it, delete it, or port it to another service. We collect your
                explicit consent before non-essential cookies. You can request access or
                deletion anytime just email us.
              </p>
            </div>

            <div className="p-4 rounded border border-blue-200">
              <h3 className="font-bold text-cyan-400 mb-2">
                🇮🇳 DPDP (India)
              </h3>
              <p className="text-slate-300">
                Under the Digital Personal Data Protection Act, we only collect data you
                give us permission for. You can withdraw consent anytime. We keep data only
                as long as needed (usually under 2 years).
              </p>
            </div>

            <div className="p-4 rounded border border-purple-200">
              <h3 className="font-bold text-cyan-400 mb-2">
                🇨🇦 PIPEDA (Canada)
              </h3>
              <p className="text-slate-300">
                We follow Canada's privacy laws and get your consent before collecting
                personal information. You can access or delete your info anytime.
              </p>
            </div>

            <div className=" p-4 rounded border border-amber-200">
              <h3 className="font-bold text-cyan-400 mb-2">
                🇺🇸 CCPA (California)
              </h3>
              <p className="text-slate-300">
                California residents have the right to know what data we collect, delete it,
                and opt out of "sales" (sharing with ads partners). We don't sell personal
                data. We only use it to show relevant ads.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400 font-mono">
            How Long We Keep Cookies
          </h2>
          <p className="text-slate-300 mb-4">
            We don't keep data longer than we need. Here's the timeline:
          </p>
          <ul className="list-disc pl-5 text-slate-300 space-y-2 mb-4">
            <li>
              <strong>Essential cookies:</strong> Clear when you log out or close browser
            </li>
            <li>
              <strong>Analytics:</strong> Deleted after 13 months automatically
            </li>
            <li>
              <strong>Marketing:</strong> Deleted after 180 days
            </li>
            <li>
              <strong>Affiliate:</strong> Deleted after 90 days
            </li>
            <li>
              <strong>Your consent choice:</strong> Remembered for 1 year, then we ask again
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400">
            Your Rights
          </h2>
          <p className="text-slate-300 mb-4">
            Depending on where you live, you have rights including:
          </p>
          <ul className="list-disc pl-5 text-slate-300 space-y-2 mb-4">
            <li>
              <strong>Right to Access:</strong> Know what data we have about you
            </li>
            <li>
              <strong>Right to Correct:</strong> Fix any wrong information
            </li>
            <li>
              <strong>Right to Delete:</strong> Ask us to erase your data
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Change your mind anytime
            </li>
            <li>
              <strong>Right to Portability:</strong> Get your data in a readable format
            </li>
            <li>
              <strong>Right to Object:</strong> Opt out of tracking and targeted ads
            </li>
          </ul>
          <p className="text-slate-300 mb-4">
            To exercise any of these rights, contact us at{' '}
            <strong>hello@toolsherd.com</strong> with your request and proof of identity.
            We'll respond within 30 days (or as required by law).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400">
            Do Not Track (DNT)
          </h2>
          <p className="text-slate-300 mb-4">
            Some browsers let you send a "Do Not Track" signal. We respect this signal and
            will disable non-essential analytics and marketing cookies if you enable it.
            Check your browser settings to turn it on.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400">
            Cookies for AI Tool Automation & Agents
          </h2>
          <p className="text-slate-300 mb-4">
            If you're using an AI agent or automation tool to scrape or interact with our
            site:
          </p>
          <ul className="list-disc pl-5 text-slate-300 space-y-2 mb-4">
            <li>
              <strong>Respect robots.txt:</strong> We've defined what can be crawled
            </li>
            <li>
              <strong>Rate limiting:</strong> Don't hammer our API (max 10 requests/sec)
            </li>
            <li>
              <strong>User-Agent identification:</strong> Tell us you're an automation tool
            </li>
            <li>
              <strong>Consent applies:</strong> Even bots need to follow our cookie rules
            </li>
            <li>
              <strong>Commercial use:</strong> If you're selling data from our site,
              contact us first (you might need a license)
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400">
            Updates to This Policy
          </h2>
          <p className="text-slate-300 mb-4">
            We might update this policy as technology and laws change. If we make big
            changes, we'll notify you here and via email (if you're logged in). Keep
            checking back!
          </p>

          <h2 className="text-2xl font-bold mt-8 text-cyan-300 font-mono">
            Questions?
          </h2>
          <p className="text-slate-300">
            We're here to help. If you have questions about cookies or privacy:
          </p>
          <ul className="list-disc pl-5 text-slate-300 space-y-2 mb-8">
            <li>
              Email: <strong>karthikpiinasi@gmail.com</strong>
            </li>
            <li>
              Data Protection Officer: <strong>privacy@toolsherd.in</strong>
            </li>
            <li>
              See our full <a href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                Privacy Policy
              </a>{' '}
              for more details
            </li>
          </ul>

          <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-lg mt-8">
            <p className="text-sm text-slate-200">
              <strong>📋 Summary:</strong> We use cookies to help you find great AI tools,
              keep you logged in, understand what works, and show you relevant ads. You
              control which cookies we use. No data is sold. Questions? We're transparent
              and happy to explain.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-4 mt-12 pt-8 border-t border-slate-700">
            <Link href="/privacy-policy">
              <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-slate-800/50 rounded-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Privacy Policy
              </Button>
            </Link>
            <Link href="/cookies/preferences">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg">
                Manage Preferences
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

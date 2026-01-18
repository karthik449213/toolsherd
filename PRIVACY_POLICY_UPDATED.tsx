'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bot, Instagram, Twitter, Mail, Shield, CheckCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <main className="bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-100 tracking-tight font-mono">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Last updated: January 18, 2026
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Compliant with GDPR • DPDP • CCPA • PIPEDA
          </p>
        </div>

        <div className="mb-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="text-blue-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="font-semibold text-blue-200">Your Privacy Matters</p>
              <p className="text-sm text-slate-300 mt-1">
                We're transparent about how we collect, use, and protect your data. You control 
                which cookies we use, and you can access or delete your data anytime.
              </p>
            </div>
          </div>
        </div>

        <div className="text-slate-300 space-y-8 prose prose-lg max-w-none prose-invert">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">1. What Information Do We Collect?</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you use our services. 
              The information we collect depends on your interactions with us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Name and Contact Data:</strong> Email address when you use our contact or 
                submission forms
              </li>
              <li>
                <strong>Tool Submission Data:</strong> Tool name, URL, description, and details 
                when you submit an AI tool to our directory
              </li>
              <li>
                <strong>Usage Data:</strong> How you interact with our site (via cookies and analytics)
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">2. How Do We Use Your Information?</h2>
            <p>We use the information we collect for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Respond to Your Inquiries:</strong> We use your email to respond to 
                questions via our contact form
              </li>
              <li>
                <strong>Manage Tool Submissions:</strong> Review and list AI tools, and ask 
                clarifications via email
              </li>
              <li>
                <strong>Operate and Improve Our Website:</strong> Understand how you use our site 
                to improve features and user experience
              </li>
              <li>
                <strong>Marketing & Retargeting:</strong> Show you relevant ads on other platforms 
                based on tools you viewed
              </li>
              <li>
                <strong>Security & Fraud Prevention:</strong> Protect our site and users from 
                malicious activity
              </li>
            </ul>
          </div>

          {/* Section 3 - COMPLETELY REWRITTEN */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">
              3. Will Your Information Be Shared?
            </h2>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">General Policy</h3>
            <p>
              We only share information with your consent, to comply with laws, to provide you with 
              services, to protect your rights, or to fulfill business obligations. We use trusted 
              third-party services to operate and improve our website.
            </p>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">Third-Party Services</h3>

            <div className="space-y-4 mt-4">
              {/* Analytics */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-blue-300 flex items-center gap-2">
                  <CheckCircle size={16} /> Analytics & Performance
                </h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <strong>Google Analytics 4</strong>
                    <ul className="list-disc pl-5 text-slate-300 mt-1">
                      <li>Purpose: Track traffic, understand which AI tools are popular</li>
                      <li>Data: Pages visited, tools clicked, search queries, device type</li>
                      <li>Retention: 13 months (then auto-deleted)</li>
                      <li>Sharing: Data not shared with advertisers</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <strong>Vercel Analytics</strong>
                    <ul className="list-disc pl-5 text-slate-300 mt-1">
                      <li>Purpose: Monitor page speed and performance</li>
                      <li>Data: Load times, Core Web Vitals, device info</li>
                      <li>Retention: 30 days</li>
                      <li>Sharing: Not shared outside our infrastructure</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <strong>Sentry</strong>
                    <ul className="list-disc pl-5 text-slate-300 mt-1">
                      <li>Purpose: Track and fix website errors</li>
                      <li>Data: Error messages, browser crashes (no personal data)</li>
                      <li>Retention: 30 days</li>
                      <li>Sharing: Error patterns used to improve reliability</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                  <CheckCircle size={16} /> Marketing & Retargeting
                </h4>
                <p className="text-sm text-slate-300 mt-2">
                  These services show you relevant ads on other websites based on AI tools you 
                  viewed on our site. Data is only used for ad targeting—not sold to other parties.
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <strong>Facebook Pixel</strong>
                    <ul className="list-disc pl-5 text-slate-300 mt-1">
                      <li>Purpose: Show relevant ads on Facebook/Instagram</li>
                      <li>Data: Tools you viewed</li>
                      <li>Retention: 180 days or until you clear cookies</li>
                      <li>Your Control: Toggle "Marketing" off in our cookie banner</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <strong>Google Ads (Floodlight)</strong>
                    <ul className="list-disc pl-5 text-slate-300 mt-1">
                      <li>Purpose: Show relevant ads on Google Search</li>
                      <li>Data: Your visit + tools browsed</li>
                      <li>Retention: Up to 1 year</li>
                      <li>Your Control: 
                        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" 
                           className="text-blue-400 hover:text-blue-300 ml-1">
                          Google Ads Preferences
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <strong>LinkedIn Ads</strong>
                    <ul className="list-disc pl-5 text-slate-300 mt-1">
                      <li>Purpose: Show relevant ads on LinkedIn</li>
                      <li>Data: General browsing patterns</li>
                      <li>Retention: 90 days</li>
                      <li>Your Control: LinkedIn ads preferences</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Affiliate */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-green-300 flex items-center gap-2">
                  <CheckCircle size={16} /> Affiliate Commissions
                </h4>
                <p className="text-sm text-slate-300 mt-2">
                  Some tools on our directory are affiliate links. When you purchase through our link:
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-300 mt-2">
                  <li>The tool provider knows you came from ToolsHerd</li>
                  <li>We earn a commission (typically 5-30% of subscription cost)</li>
                  <li>No extra cost to you—same price as direct purchase</li>
                  <li>Commission helps fund the free directory</li>
                  <li>Your data: Which tool you clicked, whether purchase completed</li>
                  <li>Retention: 30-90 days (per partner's policy)</li>
                </ul>
                <p className="text-sm text-slate-400 mt-3">
                  <strong>Affiliate Partners:</strong> OpenAI (ChatGPT), Runway, Midjourney, 
                  Synthesia, and other AI tool providers
                </p>
              </div>

              {/* Infrastructure */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-orange-300 flex items-center gap-2">
                  <CheckCircle size={16} /> Website Infrastructure
                </h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <strong>Vercel</strong>
                    <ul className="list-disc pl-5 text-slate-300 mt-1">
                      <li>Purpose: Hosting and content delivery</li>
                      <li>Data: Server logs, performance metrics</li>
                      <li>Retention: 30-90 days (standard CDN practice)</li>
                      <li>Location: United States</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-100 mt-6 mb-3">Legal Requirements</h3>
            <p className="text-sm">
              We may disclose your information if required by law, such as a court order, 
              government subpoena, investigation of fraud, or protection of our legal rights.
            </p>
          </div>

          {/* Section 4 - EXPANDED */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">
              4. How Long Do We Keep Your Information?
            </h2>
            <p>
              Different types of data are retained for different periods. We don't keep data longer 
              than necessary:
            </p>

            <div className="bg-slate-800/30 p-4 rounded-lg mt-4 space-y-3 text-sm">
              <div>
                <strong className="text-slate-100">Contact Form Data:</strong>
                <ul className="list-disc pl-5 text-slate-300 mt-1">
                  <li>Your name and email: 2 years (for follow-up)</li>
                  <li>Your message: 1 year</li>
                </ul>
              </div>
              <div>
                <strong className="text-slate-100">Tool Submission Data:</strong>
                <ul className="list-disc pl-5 text-slate-300 mt-1">
                  <li>Tool information: Kept indefinitely (maintains directory)</li>
                  <li>You can request removal anytime</li>
                </ul>
              </div>
              <div>
                <strong className="text-slate-100">Analytics Data:</strong>
                <ul className="list-disc pl-5 text-slate-300 mt-1">
                  <li>Google Analytics: 13 months (then auto-deleted)</li>
                  <li>Individual tracking IDs: 4 weeks</li>
                  <li>Performance metrics: 30 days</li>
                  <li>IP addresses: Never stored (anonymized immediately)</li>
                </ul>
              </div>
              <div>
                <strong className="text-slate-100">Marketing Data:</strong>
                <ul className="list-disc pl-5 text-slate-300 mt-1">
                  <li>Facebook Pixel: 180 days or when you clear cookies</li>
                  <li>Google Ads: 1 year</li>
                  <li>LinkedIn Ads: 90 days</li>
                </ul>
              </div>
              <div>
                <strong className="text-slate-100">Consent & Legal Compliance:</strong>
                <ul className="list-disc pl-5 text-slate-300 mt-1">
                  <li>Your consent choices: 1 year (then we ask again)</li>
                  <li>Consent audit log: 3 years (legal requirement)</li>
                  <li>Security logs: 6 months (fraud investigation)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-slate-400 mt-4">
              Most data is automatically deleted after the periods above. 
              <strong> You can request manual deletion anytime.</strong>
            </p>
          </div>

          {/* Section 5 - NEW: YOUR RIGHTS */}
          <div id="your-rights">
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">
              5. What Are Your Rights?
            </h2>
            <p>
              GDPR, DPDP, CCPA, and other privacy laws give you important rights. Here's how to 
              exercise them:
            </p>

            <div className="space-y-4 mt-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-blue-300">Right to Access (GDPR Art. 15, DPDP Art. 8)</h4>
                <p className="text-sm text-slate-300 mt-2">
                  You can request a copy of all data we have about you.
                </p>
                <div className="bg-slate-900 p-3 rounded mt-2 text-sm">
                  <p><strong>Email:</strong> privacy@toolsherd.com</p>
                  <p><strong>Subject:</strong> "Data Access Request"</p>
                  <p><strong>Response:</strong> Within 30 days, downloadable file with all your data</p>
                  <p><strong>Cost:</strong> Free</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-red-300">Right to Deletion (GDPR Art. 17, DPDP Art. 10)</h4>
                <p className="text-sm text-slate-300 mt-2">
                  You can ask us to delete your personal data.
                </p>
                <div className="bg-slate-900 p-3 rounded mt-2 text-sm">
                  <p><strong>Email:</strong> privacy@toolsherd.com</p>
                  <p><strong>Subject:</strong> "Delete My Data"</p>
                  <p><strong>We'll delete:</strong> Name, email, tool submissions, affiliate cookies</p>
                  <p><strong>Response:</strong> Within 30 days</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-green-300">
                  Right to Withdraw Consent (GDPR Art. 7, DPDP Art. 6)
                </h4>
                <p className="text-sm text-slate-300 mt-2">
                  You can change your mind about cookies anytime—no questions asked.
                </p>
                <div className="bg-slate-900 p-3 rounded mt-2 text-sm">
                  <p><strong>How:</strong> Click the 🍪 cookie icon at the bottom-right of your screen</p>
                  <p><strong>Effect:</strong> Immediate—your new preferences apply right away</p>
                  <p><strong>Note:</strong> You'll lose personalized ads, but keep full access to tools</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-purple-300">Right to Correction (GDPR Art. 16)</h4>
                <p className="text-sm text-slate-300 mt-2">
                  You can ask us to fix incorrect information.
                </p>
                <div className="bg-slate-900 p-3 rounded mt-2 text-sm">
                  <p><strong>Email:</strong> privacy@toolsherd.com</p>
                  <p><strong>Subject:</strong> "Correct My Data"</p>
                  <p><strong>Include:</strong> What's wrong and what it should be</p>
                  <p><strong>Response:</strong> Within 14 days</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-cyan-300">Right to Portability (GDPR Art. 20)</h4>
                <p className="text-sm text-slate-300 mt-2">
                  Get your data in a portable format (JSON or CSV) to move to another service.
                </p>
                <div className="bg-slate-900 p-3 rounded mt-2 text-sm">
                  <p><strong>Email:</strong> privacy@toolsherd.com</p>
                  <p><strong>Subject:</strong> "Export My Data"</p>
                  <p><strong>Includes:</strong> Profile, saved tools, search history</p>
                  <p><strong>Response:</strong> Within 30 days</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-orange-300">Right to Object (GDPR Art. 21)</h4>
                <p className="text-sm text-slate-300 mt-2">
                  You can object to certain types of processing.
                </p>
                <div className="bg-slate-900 p-3 rounded mt-2 text-sm">
                  <p><strong>Email:</strong> privacy@toolsherd.com</p>
                  <p><strong>Subject:</strong> "Objection to Processing"</p>
                  <p><strong>Can object to:</strong> Marketing, profiling, or affiliate tracking</p>
                  <p><strong>Response:</strong> Within 14 days</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded-lg mt-4">
              <p className="text-sm">
                <strong className="text-yellow-200">For GDPR (Europe):</strong> If we don't satisfy 
                your request, you can lodge a complaint with your local data protection authority.
              </p>
              <p className="text-sm mt-2">
                <strong className="text-yellow-200">For DPDP (India):</strong> You can file a 
                complaint with the Data Protection Board of India.
              </p>
            </div>
          </div>

          {/* Section 6 - NEW: DNT */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">6. Do Not Track (DNT)</h2>
            <p>
              Some browsers let you send a "Do Not Track" signal. We respect this signal and will 
              disable analytics and marketing cookies if you enable it.
            </p>

            <div className="bg-slate-800/30 p-4 rounded-lg mt-4 text-sm">
              <p className="font-semibold text-slate-100 mb-2">How to Enable DNT:</p>
              <ul className="list-disc pl-5 text-slate-300 space-y-1">
                <li><strong>Chrome:</strong> Settings → Privacy → Send "Do Not Track" requests</li>
                <li><strong>Firefox:</strong> Preferences → Privacy → Do Not Track</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Ask sites not to track</li>
                <li><strong>Edge:</strong> Settings → Privacy → Tracking prevention (set to "Strict")</li>
              </ul>
            </div>

            <p className="text-sm text-slate-400 mt-4">
              Even without DNT, our cookie banner gives you granular control over which cookies 
              we use.
            </p>
          </div>

          {/* Section 7 - NEW: CCPA OPT-OUT */}
          <div id="do-not-sell">
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">
              7. Do Not Sell My Personal Information (CCPA)
            </h2>
            <p>
              Under California law, some cookies count as "sale" of personal data. You have the right 
              to opt out.
            </p>

            <div className="bg-slate-800/50 p-4 rounded-lg mt-4">
              <p className="text-sm text-slate-300 mb-3">
                <strong>Services We Don't "Sell" (in CCPA terms):</strong>
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-300">
                <li>Google Analytics (anonymized data only)</li>
                <li>Vercel (hosting service)</li>
              </ul>

              <p className="text-sm text-slate-300 mt-4 mb-3">
                <strong>Services We Do "Sell" (in CCPA terms):</strong>
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-300">
                <li>Facebook Pixel (used for ad targeting)</li>
                <li>Google Ads (used for ad targeting)</li>
                <li>LinkedIn Ads (used for ad targeting)</li>
              </ul>

              <p className="text-sm text-slate-400 mt-4">
                Note: CCPA "sale" means sharing for value—even if no money changes hands. These 
                services are shared with ad partners so they can show you relevant ads.
              </p>
            </div>

            <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm font-semibold text-slate-100 mb-2">To Opt Out:</p>
              <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-2">
                <li>Click the 🍪 cookie icon at bottom-right</li>
                <li>Toggle <strong>"Marketing"</strong> off</li>
                <li>Click Save</li>
              </ol>
              <p className="text-sm text-slate-400 mt-3">
                That's it! No ads on Facebook, Google, or LinkedIn will be based on your browsing 
                on our site.
              </p>
            </div>
          </div>

          {/* Section 8 - UPDATES */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">
              8. Do We Make Updates to This Notice?
            </h2>
            <p>
              Yes, we update this notice as necessary to stay compliant with privacy laws. 
              The updated version will be indicated by an updated "Last updated" date at the top.
            </p>
            <p className="text-sm text-slate-400 mt-4">
              Major changes will also be announced via email (if you're logged in) and a banner on our site.
            </p>
          </div>

          {/* Section 9 - CONTACT */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 font-mono">
              9. How Can You Contact Us About This Policy?
            </h2>
            <p>If you have questions or comments about this policy:</p>

            <div className="bg-slate-800/50 p-6 rounded-lg mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-100">General Questions</p>
                  <p className="text-sm text-slate-300">
                    <a href="mailto:hello@toolsherd.com" className="text-blue-400 hover:text-blue-300">
                      hello@toolsherd.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield size={20} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-100">Privacy & Data Requests</p>
                  <p className="text-sm text-slate-300">
                    <a href="mailto:privacy@toolsherd.com" className="text-blue-400 hover:text-blue-300">
                      privacy@toolsherd.com
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Response time: 30 days (or as required by law)
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-400 mt-6">
              <strong>See Also:</strong>{' '}
              <Link href="/cookies" className="text-blue-400 hover:text-blue-300">
                Cookie Policy
              </Link>{' '}
              •{' '}
              <Link href="/terms-and-conditions" className="text-blue-400 hover:text-blue-300">
                Terms & Conditions
              </Link>
            </p>
          </div>

          {/* Summary Box */}
          <div className="mt-12 p-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg">
            <h3 className="font-semibold text-cyan-200 mb-3">TL;DR (The Short Version)</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✅ We tell you what cookies we use (Analytics, Marketing, Affiliate, Performance)</li>
              <li>✅ You control which cookies load (Easy toggle in our cookie banner)</li>
              <li>✅ We don't sell your data (We use it only for ads targeting and improvement)</li>
              <li>✅ You can delete your data anytime (Email privacy@toolsherd.com)</li>
              <li>✅ We follow GDPR, DPDP, and CCPA (All major privacy laws)</li>
              <li>✅ We're transparent (Detailed disclosures for every service)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

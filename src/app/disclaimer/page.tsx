// This is the content for your page.tsx file.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer - Tools Herd AI",
  description: "Disclaimer and Disclosure for Tools Herd AI.",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-100 tracking-tight font-mono">
            Disclaimer & Disclosure
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Last updated: September 17, 2025
          </p>
        </div>

        <div className="mt-12 text-slate-300 space-y-8 prose prose-lg max-w-none prose-invert">

          <h2>General Disclaimer</h2>
          <p>
            All the information on this website, Tools Herd AI , is published in good faith and for general information purposes only. We do not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk. We will not be liable for any losses and/or damages in connection with the use of our website.
          </p>

          <h2>External Links Disclaimer</h2>
          <p>
            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>
          <p>
            WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
          </p>

          <h2>Affiliate Disclosure</h2>
          <p>
            This Site may contain links to affiliate websites, and we may receive an affiliate commission for any purchases or actions made by you on the affiliate websites using such links. Our affiliates may include [e.g., PartnerStack, Impact, etc. - list them if you can, or keep it general].
          </p>
          <p>
            We are a participant in various affiliate programs. When you click on a link to a tool and make a purchase, we may earn a commission. This comes at no additional cost to you and helps us to maintain and grow this directory. We only list tools that we believe provide value to our users, and our participation in affiliate programs does not influence the information we provide.
          </p>

          <h2>No Professional Advice Disclaimer</h2>
          <p>
            The information provided on the Site is for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. The use or reliance of any information contained on this site is solely at your own risk.
          </p>

          <h2 className="text-cyan-300 font-mono">Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, you can contact us by email:
            <br />
            <Link href="mailto:karthikpiinasi@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">karthikpiinasi@gmail.com</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
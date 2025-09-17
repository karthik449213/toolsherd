// This is the content for your page.tsx file.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Tools Herd AI",
  description: "Privacy Policy for Tools Herd AI.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Last updated: September 17, 2025
          </p>
        </div>

        <div className="mt-12 text-slate-700 space-y-8 prose prose-lg max-w-none">
          <p>
            Welcome to Tools Herd AI ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at [your-email@example.com].
          </p>

          <h2 className="text-2xl font-bold text-slate-900">1. What Information Do We Collect?</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you use our services, such as when you submit our contact form or our "Submit a Tool" form. The personal information that we collect depends on the context of your interactions with us, but may include the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Name and Contact Data:</strong> We collect your name and email address when you use our contact or submission forms.</li>
            <li><strong>Tool Submission Data:</strong> When you submit a tool, we collect the tool's name, URL, description, and other related details you provide.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900">2. How Do We Use Your Information?</h2>
          <p>
            We use the information we collect or receive:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>To respond to your inquiries.</strong> We use your email to respond to questions you send via our contact form.</li>
            <li><strong>To manage tool submissions.</strong> We use the information you provide to review and potentially list AI tools on our directory. We may use your email to ask for clarification.</li>
            <li><strong>To operate and maintain our website.</strong> We may use data for analytics to understand how our site is used and to improve user experience.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-slate-900">3. Will Your Information Be Shared?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We use third-party services to operate our website:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Formspree:</strong> Our contact and submission forms are processed by Formspree. When you submit a form, your data is sent to Formspree so it can be forwarded to us. You can view Formspree's privacy policy <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">here</a>.</li>
            <li><strong>Supabase:</strong> If you create a user account, your authentication data is managed by Supabase. You can view Supabase's privacy policy <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">here</a>.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900">4. How Long Do We Keep Your Information?</h2>
          <p>
            We keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">5. Do We Make Updates to This Notice?</h2>
          <p>
            Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900">6. How Can You Contact Us About This Policy?</h2>
          <p>
            If you have questions or comments about this policy, you may email us at <Link href="mailto:[your-email@example.com]" className="text-blue-600 hover:underline">[your-email@example.com]</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
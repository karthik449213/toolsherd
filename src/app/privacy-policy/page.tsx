// This is the content for your page.tsx file.

"use client";

import Link from "next/link";
import { useState } from "react";
import { Bot, Instagram, Twitter } from "lucide-react";



const categories = [
  { id: "all", name: "All Tools" },
  { id: "content creation", name: "Content Creation" },
  { id: "productivity", name: "Productivity" },
  { id: "coding", name: "Coding" },
  { id: "marketing", name: "Marketing" },
  { id: "trading", name: "Trading" },
];

export default function PrivacyPolicyPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleFooterCategoryClick = (id: string) => {
    setActiveCategory(id);
    // Redirect to home page with category filter
    window.location.href = `/?category=${id}`;
  };
  return (
    <main className="bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-100 tracking-tight font-mono">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Last updated: September 17, 2025
          </p>
        </div>

        <div className="mt-12 text-slate-300 space-y-8 prose prose-lg max-w-none prose-invert">
          <p>
            Welcome to Tools Herd AI . We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at 
            karthikpiinasi@gmail.com .
          </p>

          <h2 className="text-2xl font-bold text-cyan-300 font-mono">1. What Information Do We Collect?</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you use our services, such as when you submit our contact form or our  form. The personal information that we collect depends on the context of your interactions with us, but may include the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Name and Contact Data:</strong> We collect your name and email address when you use our contact or submission forms.</li>
            <li><strong>Tool Submission Data:</strong> When you submit a tool, we collect the tool&apos;s name, URL, description, and other related details you provide.</li>
          </ul>

          <h2 className="text-2xl font-bold text-cyan-300 font-mono">2. How Do We Use Your Information?</h2>
          <p>
            We use the information we collect or receive:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>To respond to your inquiries.</strong> We use your email to respond to questions you send via our contact form.</li>
            <li><strong>To manage tool submissions.</strong> We use the information you provide to review and potentially list AI tools on our directory. We may use your email to ask for clarification.</li>
            <li><strong>To operate and maintain our website.</strong> We may use data for analytics to understand how our site is used and to improve user experience.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-cyan-300 font-mono">3. Will Your Information Be Shared?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We use third-party services to operate our website:
          </p>
          

          <h2 className="text-2xl font-bold text-cyan-300 font-mono">4. How Long Do We Keep Your Information?</h2>
          <p>
            We keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2 className="text-2xl font-bold text-cyan-300 font-mono">5. Do We Make Updates to This Notice?</h2>
          <p>
            Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated  date.
          </p>
          
          <h2 id="cookies" className="text-2xl font-bold text-cyan-300 font-mono mt-8">6. Cookie Policy & Consent</h2>
          <p>
            We use cookies to enhance your browsing experience and understand how you use our website. You have full control over which cookies we use—except for essential cookies required for basic functionality.
          </p>
          <p>
            <strong>Essential Cookies:</strong> These are required for the website to function (security, session management). You cannot disable these.
          </p>
          <p>
            <strong>Optional Cookies:</strong> We only set optional cookies (analytics, marketing, personalization) with your explicit consent. You can change your preferences at any time on our <a href="/cookies" className="text-cyan-400 underline hover:text-cyan-300">Cookie Policy page</a>.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Analytics:</strong> Help us understand user behavior and improve the website (Google Analytics, Sentry)</li>
            <li><strong>Marketing:</strong> Enable retargeting ads on social platforms</li>
            <li><strong>Affiliate:</strong> Track referral commissions when you purchase through our links</li>
            <li><strong>Functional:</strong> Remember your preferences (theme, language, layout)</li>
            <li><strong>Personalization:</strong> Customize content and recommendations</li>
          </ul>
          <p>
            For detailed information about each cookie, its purpose, and how to manage it, please visit our <a href="/cookies" className="text-cyan-400 underline hover:text-cyan-300">Cookie Policy</a>.
          </p>
          <h2 className="text-2xl font-bold text-cyan-300 font-mono">6. How Can You Contact Us About This Policy?</h2>
          <p>
            If you have questions or comments about this policy, you may email us at <Link href="mailto:karthikpiinasi@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">karthikpiinasi@gmail.com</Link>.
          </p>
        </div>
      </div>
        
    </main>
  );
}
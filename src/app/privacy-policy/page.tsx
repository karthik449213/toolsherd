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
            Welcome to Tools Herd AI . We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at 
            karthikpiinasi@gmail.com .
          </p>

          <h2 className="text-2xl font-bold text-slate-900">1. What Information Do We Collect?</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you use our services, such as when you submit our contact form or our  form. The personal information that we collect depends on the context of your interactions with us, but may include the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Name and Contact Data:</strong> We collect your name and email address when you use our contact or submission forms.</li>
            <li><strong>Tool Submission Data:</strong> When you submit a tool, we collect the tool&apos;s name, URL, description, and other related details you provide.</li>
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
          

          <h2 className="text-2xl font-bold text-slate-900">4. How Long Do We Keep Your Information?</h2>
          <p>
            We keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">5. Do We Make Updates to This Notice?</h2>
          <p>
            Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated  date.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900">6. How Can You Contact Us About This Policy?</h2>
          <p>
            If you have questions or comments about this policy, you may email us at <Link href="mailto:[your-email@example.com]" className="text-blue-600 hover:underline">karthikpiinasi@gmai.com</Link>.
          </p>
        </div>
      </div>
        <footer className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Bot className="h-8 w-8 text-emerald-400" />
                  <h3 className="text-xl font-bold">Tools Herd AI</h3>
                </div>
                <p className="text-slate-300 mb-6 max-w-md">
                  Discover, compare, and find the perfect AI tools for your needs. We curate the best AI solutions across all categories.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors" aria-label="GitHub">
                    <Instagram className="h-6 w-6" />
                  </a>
                       <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors" aria-label="GitHub">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* UPDATED: Footer Categories rendered dynamically and filter on click */}
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-slate-300">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => handleFooterCategoryClick(cat.id)}
                        className={`w-full text-left transition-colors ${
                          activeCategory === cat.id ? "text-white" : "hover:text-white"
                        }`}
                        aria-pressed={activeCategory === cat.id}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#feedback" className="hover:text-white transition-colors">
                      Send Feedback
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">© 2024 Tools Herd AI. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
    </main>
  );
}
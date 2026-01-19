import Link from 'next/link';
import { Bot, Facebook, Instagram, Twitter } from 'lucide-react';
import { blogCategories } from '@/lib/categoryMapping';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="h-8 w-8 text-cyan-400" />
              <h3 className="text-xl font-bold text-cyan-300 font-mono">Tools Herd AI</h3>
            </div>
            <p className="text-slate-400 mb-3 max-w-md">
              <span className="font-semibold text-cyan-300">Tools Herd AI</span> is a high-authority AI tools discovery, comparison, and decision-making platform built for professionals, founders, and businesses.
            </p>
            <p className="text-slate-400 mb-6 max-w-md text-sm">
              We help you discover, compare, evaluate, and adopt AI tools that deliver real business outcomes. If you're an AI founder or brand, we provide high-intent exposure, SEO authority, and qualified leads.
            </p>
            <div className="flex space-x-4">
             <Link href="/newsletter" className="text-slate-400 hover:text-cyan-300 transition-colors duration-200">
                  Newsletter
                </Link>
         <Link href="/twitter" className="text-slate-400 hover:text-cyan-300 transition-colors duration-200">
                      <Instagram className="h-6 w-6 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer" />
                </Link>
              
         <Link href="/twitter" className="text-slate-400 hover:text-cyan-300 transition-colors duration-200">
                      <Facebook className="h-6 w-6 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer" />
                </Link>
              
            
              
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-cyan-300">Tool Categories</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/tools?category=ai_agents" className="hover:text-cyan-300 transition-colors duration-200">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/tools?category=agentic_ai" className="hover:text-cyan-300 transition-colors duration-200">
                  Agentic AI
                </Link>
              </li>
              <li>
                <Link href="/tools?category=no_code_ai" className="hover:text-cyan-300 transition-colors duration-200">
                  No-Code AI
                </Link>
              </li>
              <li>
                <Link href="/tools?category=ai_automation" className="hover:text-cyan-300 transition-colors duration-200">
                  Automation
                </Link>
              </li>
              <li>
                <Link href="/tools?category=ai_seo" className="hover:text-cyan-300 transition-colors duration-200">
                  AI SEO
                </Link>
              </li>
              <li>
                <Link href="/tools?category=ai_content_engines" className="hover:text-cyan-300 transition-colors duration-200">
                  Content Engines
                </Link>
              </li>
              <li>
                <Link href="/tools?category=ai_creative_tools" className="hover:text-cyan-300 transition-colors duration-200">
                  Creative Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-cyan-300">Blog Topics</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {blogCategories.slice(0, 7).map((category) => (
                <li key={category.id}>
                  <Link href={`/blog?category=${category.id}`} className="hover:text-cyan-300 transition-colors duration-200 line-clamp-1">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-cyan-300">More Topics</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {blogCategories.slice(7).map((category) => (
                <li key={category.id}>
                  <Link href={`/blog?category=${category.id}`} className="hover:text-cyan-300 transition-colors duration-200 line-clamp-1">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-700">
                <Link href="/blog" className="hover:text-cyan-300 transition-colors duration-200 font-semibold">
                  View All Blog Posts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2024 Tools Herd AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 flex-wrap justify-center md:justify-end gap-y-2">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors duration-200">
              Cookies
            </Link>
            <Link href="/terms-and-conditions" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

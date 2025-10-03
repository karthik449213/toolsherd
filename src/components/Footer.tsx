import Link from 'next/link';
import { Bot, Twitter } from 'lucide-react';

export default function Footer() {
  return (
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
             <Link href="#" className="hover:text-white transition-colors">
                  Newsletter
                </Link>
         <Link href="#" className="hover:text-white transition-colors">
                  Newsletter
                </Link>
              
                <Twitter className="h-6 w-6" />
              
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/tools?category=content-creation" className="hover:text-white transition-colors">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link href="/tools?category=productivity" className="hover:text-white transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/tools?category=coding" className="hover:text-white transition-colors">
                  Coding
                </Link>
              </li>
              <li>
                <Link href="/tools?category=marketing" className="hover:text-white transition-colors">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/tools?category=trading" className="hover:text-white transition-colors">
                  Trading
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
               <Link href="#" className="hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 Tools Herd AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

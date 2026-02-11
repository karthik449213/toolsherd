'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { FeedbackForm } from '@/components/feedback-form';

export default function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
<header className="bg-gradient-to-b from-slate-950 to-slate-900 shadow-glow-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 sm:flex-none">
            <h1 className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-wider drop-shadow-md select-none font-mono truncate">Tools Herd AI</h1>
               
                  

          </div>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-1 justify-center">
            <Link href="/" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-xs lg:text-sm">Home</Link>
            <Link href="/blog" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-xs lg:text-sm">Blog</Link>
            <Link href="/about" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-xs lg:text-sm">About</Link>
            <Link href="/contact" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-xs lg:text-sm">Contact</Link>
            <Link href="/tools" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-xs lg:text-sm">Tools</Link>
            <Link href="/list-a-website" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-xs lg:text-sm whitespace-nowrap">List a Website</Link>
            <FeedbackForm />
          </nav>
          <div className="md:hidden ml-auto">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80 bg-gradient-to-b from-slate-950 to-slate-900 border-l border-cyan-500/20 text-slate-100">
                <SheetHeader>
                  <SheetTitle className="text-cyan-300 font-bold text-lg font-mono ">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <Link href="/" onClick={handleLinkClick} className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">Home</Link>
                  <Link href="/blog" onClick={handleLinkClick} className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">Blog</Link>
                  <Link href="/about" onClick={handleLinkClick} className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">About</Link>
                  <Link href="/contact" onClick={handleLinkClick} className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">Contact</Link>
                  <Link href="/tools" onClick={handleLinkClick} className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">Tools</Link>
                  <Link href="/list-a-website" onClick={handleLinkClick} className="block text-slate-200 hover:text-cyan-300 font-medium  duration-200 transition-colors">List a Website</Link>
                  <div className="pt-4 border-t border-cyan-500/20">
                    <FeedbackForm />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

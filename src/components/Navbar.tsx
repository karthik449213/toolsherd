'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { FeedbackForm } from '@/components/feedback-form';

export default function Navbar() {
  return (
<header className="bg-gradient-to-b from-slate-950 to-slate-900 border-b border-cyan-500/20 shadow-glow-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-cyan-300 tracking-wider drop-shadow-md select-none font-mono">Tools Herd </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-sm">Home</Link>
            <Link href="/blog" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-sm">Blog</Link>
            <Link href="/about" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-sm">About</Link>
            <Link href="/contact" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-sm">Contact</Link>
            <Link href="/tools" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-sm">Tools</Link>
            <Link href="/list-a-website" className="text-slate-200 hover:text-cyan-300 transition-colors duration-200 font-medium text-sm">List a Website</Link>
            <FeedbackForm />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80 bg-gradient-to-b from-slate-950 to-slate-900 border-l border-cyan-500/20 text-slate-100">
                <SheetHeader>
                  <SheetTitle className="text-cyan-300 font-bold text-lg font-mono">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <Link href="/" className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">Home</Link>
                  <Link href="/blog" className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">Blog</Link>
                  <Link href="/about" className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">About</Link>
                  <Link href="/contact" className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">Contact</Link>
                  <Link href="/list-a-website" className="block text-slate-200 hover:text-cyan-300 font-medium transition-colors duration-200">List a Website</Link>
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

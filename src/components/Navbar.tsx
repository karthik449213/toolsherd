'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { FeedbackForm } from '@/components/feedback-form';

export default function Navbar() {
  return (
<header className="bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg border-b border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-md select-none">Tools Herd AI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-emerald-200 transition-colors duration-300 font-semibold">Home</Link>
            <Link href="/blog" className="text-white hover:text-emerald-200 transition-colors duration-300 font-semibold">Blog</Link>
            <Link href="/about" className="text-white hover:text-emerald-200 transition-colors duration-300 font-semibold">About</Link>
            <Link href="/contact" className="text-white hover:text-emerald-200 transition-colors duration-300 font-semibold">Contact</Link>
            <Link href="/tools" className="text-white hover:text-emerald-200 transition-colors duration-300 font-semibold">Tools</Link>
            <Link href="/list-a-website" className="text-white hover:text-emerald-200 transition-colors duration-300 font-semibold">List a Website</Link>
            <FeedbackForm />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu" className="border-white text-white hover:bg-emerald-600 transition">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80 bg-gradient-to-b from-emerald-500 to-green-600 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white font-bold text-lg">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <Link href="/" className="block text-white hover:text-emerald-300 font-semibold transition-colors duration-300">Home</Link>
                  <Link href="/blog" className="block text-white hover:text-emerald-300 font-semibold transition-colors duration-300">Blog</Link>
                  <Link href="/about" className="block text-white hover:text-emerald-300 font-semibold transition-colors duration-300">About</Link>
                  <Link href="/contact" className="block text-white hover:text-emerald-300 font-semibold transition-colors duration-300">Contact</Link>
                  <Link href="/list-a-website" className="block text-white hover:text-emerald-300 font-semibold transition-colors duration-300">List a Website</Link>
                  <div className="pt-4 border-t border-emerald-400">
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

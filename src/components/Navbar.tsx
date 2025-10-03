'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { FeedbackForm } from '@/components/feedback-form';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-zinc-900">Tools Herd AI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-700 hover:text-emerald-600">Home</Link>
            <Link href="/blog" className="text-slate-700 hover:text-emerald-600">Blog</Link>
            <Link href="/about" className="text-slate-700 hover:text-emerald-600">About</Link>
            <Link href="/contact" className="text-slate-700 hover:text-emerald-600">Contact</Link>
            <Link href="/tools" className="text-slate-700 hover:text-emerald-600">Tools</Link>
            <Link href="/list-a-website" className="text-slate-700 hover:text-emerald-600">List a Website</Link>
            <FeedbackForm />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Link href="/" className="block text-slate-700 hover:text-emerald-600">Home</Link>
                  <Link href="/blog" className="block text-slate-700 hover:text-emerald-600">Blog</Link>
                  <Link href="/about" className="block text-slate-700 hover:text-emerald-600">About</Link>
                  <Link href="/contact" className="block text-slate-700 hover:text-emerald-600">Contact</Link>
                  <Link href="/list-a-website" className="block text-slate-700 hover:text-emerald-600">List a Website</Link>
                  <div className="pt-2">
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

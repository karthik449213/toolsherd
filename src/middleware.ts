/**
 * Middleware for cookie consent verification
 * 
 * Verifies consent before loading tracking scripts
 */

import { NextRequest, NextResponse } from 'next/server';

// Paths to exclude from middleware
const EXCLUDE_PATHS = [
  '/_next/',
  '/api/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for excluded paths
  if (EXCLUDE_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get consent from cookies
  const consentCookie = request.cookies.get('cookie_consent_v1');

  // Add consent header for use in layout/components
  const requestHeaders = new Headers(request.headers);
  
  if (consentCookie?.value) {
    requestHeaders.set('x-cookie-consent', consentCookie.value);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Apply middleware to all routes except Next.js internals and static files
  matcher: ['/((?!_next|.*\\..*).*)'],
};

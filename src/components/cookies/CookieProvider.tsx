'use client';

import React, { useEffect } from 'react';
import { CookieManager } from '@/lib/cookies/manager';

/**
 * Cookie Provider Component
 * Wrap your app with this in the root layout
 * 
 * Usage in app/layout.tsx:
 * ```tsx
 * import { CookieProvider } from '@/components/cookies/CookieProvider';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <CookieProvider>
 *           {children}
 *         </CookieProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function CookieProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize cookie manager on client-side
    CookieManager.initialize();
  }, []);

  return <>{children}</>;
}

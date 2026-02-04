import { NextRequest, NextResponse } from 'next/server';
import { getComplianceRegion } from '@/lib/cookies/compliance';

/**
 * POST /api/cookies/verify
 * Verify consent on the server-side before tracking/analytics
 * 
 * Usage:
 * ```typescript
 * const consent = await fetch('/api/cookies/verify', {
 *   method: 'POST',
 *   body: JSON.stringify({ category: 'analytics' })
 * }).then(r => r.json());
 * 
 * if (consent.allowed) {
 *   // Load tracking script
 * }
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category } = body as { category: string };

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    // Get user's region (could be from IP, user account, etc.)
    // For now, assume global
    const region = getComplianceRegion();

    // Get consent from localStorage via cookie header or body
    const consentCookie = request.cookies.get('cookie_consent_v1');
    
    let hasConsent = false;

    if (consentCookie?.value) {
      try {
        const consent = JSON.parse(consentCookie.value);
        hasConsent = consent.categories?.[category] ?? 
                    (category === 'essential' ? true : false);
      } catch (e) {
        hasConsent = category === 'essential';
      }
    }

    return NextResponse.json({
      allowed: hasConsent,
      category,
      region,
    });
  } catch (error) {
   
    return NextResponse.json(
      { error: 'Failed to verify consent' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_DEFINITIONS } from '@/lib/cookies/definitions';
import { CATEGORY_METADATA } from '@/lib/cookies/categories';

/**
 * GET /api/cookies/definitions
 * Return all cookie definitions and metadata
 * Used by frontend to display cookie information
 */
export async function GET(request: NextRequest) {
  try {
    // Get all cookies organized by category
    const cookies = Object.entries(COOKIE_DEFINITIONS).reduce(
      (acc, [category, defs]) => {
        acc[category] = defs.map((def) => ({
          id: def.id,
          name: def.name,
          category: def.category,
          description: def.description,
          purpose: def.purpose,
          provider: def.provider,
          policyLink: def.policyLink,
          // Don't expose internal config
          maxAge: def.maxAge,
        }));
        return acc;
      },
      {} as Record<string, unknown>
    );

    return NextResponse.json({
      success: true,
      timestamp: Date.now(),
      data: {
        categories: CATEGORY_METADATA,
        cookies,
      },
    });
  } catch (error) {
    console.error('[API] Error getting cookie definitions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve cookie definitions' },
      { status: 500 }
    );
  }
}

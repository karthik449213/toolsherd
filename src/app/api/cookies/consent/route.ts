import { NextRequest, NextResponse } from 'next/server';
import { ConsentRecordSchema, ConsentRecord, CookieCategory } from '@/lib/cookies/types';
import { ConsentStorage } from '@/lib/cookies/storage';
import { CookieManager } from '@/lib/cookies/manager';

/**
 * GET /api/cookies/consent
 * Retrieve current consent status
 */
export async function GET(request: NextRequest) {
  try {
    const consent = ConsentStorage.getConsent();
    
    if (!consent) {
      return NextResponse.json(
        {
          hasConsent: false,
          message: 'No consent record found',
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      hasConsent: true,
      consent: {
        timestamp: consent.timestamp,
        categories: consent.categories,
        explicit: consent.explicit,
        source: consent.source,
        version: consent.version,
      },
    });
  } catch (error) {
    console.error('[API] Error getting consent:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve consent' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cookies/consent
 * Save or update consent preferences
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate against schema
    const validated = ConsentRecordSchema.parse({
      version: '1.0',
      timestamp: Date.now(),
      categories: body.categories,
      individual: body.individual,
      source: body.source || 'api',
      explicit: body.explicit ?? true,
      ipHash: body.ipHash,
      revokeUrl: body.revokeUrl,
    });

    // Save to localStorage (client-side)
    // In a real app, you'd also save to a database for audit trail
    ConsentStorage.setConsent(validated);

    return NextResponse.json(
      {
        success: true,
        message: 'Consent saved successfully',
        timestamp: validated.timestamp,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Error saving consent:', error);

    if (error instanceof Error && error.message.includes('Zod')) {
      return NextResponse.json(
        { error: 'Invalid consent data', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save consent' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cookies/consent
 * Revoke all consent (GDPR right)
 */
export async function DELETE(request: NextRequest) {
  try {
    ConsentStorage.clearConsent();

    return NextResponse.json({
      success: true,
      message: 'All consent revoked successfully',
    });
  } catch (error) {
    console.error('[API] Error revoking consent:', error);
    return NextResponse.json(
      { error: 'Failed to revoke consent' },
      { status: 500 }
    );
  }
}

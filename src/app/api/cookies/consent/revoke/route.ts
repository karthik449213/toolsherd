import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/cookies/consent/revoke
 * Explicitly revoke consent (separate endpoint for tracking)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Track revocation for audit trail
    const revokedAt = new Date().toISOString();
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

    // TODO: Log to database for compliance audit
    

    return NextResponse.json({
      success: true,
      message: 'Consent revoked successfully',
      revokedAt,
    });
  } catch (error) {
   
    return NextResponse.json(
      { error: 'Failed to revoke consent' },
      { status: 500 }
    );
  }
}

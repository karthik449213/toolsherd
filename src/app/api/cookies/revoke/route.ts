/**
 * API Route: DELETE /api/cookies/revoke
 * 
 * Server-side endpoint for revoking all consent
 * Clears all consent cookies
 */

import { NextRequest, NextResponse } from 'next/server';
import { ServerConsentStorage } from '@/lib/cookies/consent-storage';

/**
 * DELETE handler - Revoke all consent
 */
export async function DELETE(request: NextRequest) {
  try {
    // Delete consent cookie
    await ServerConsentStorage.delete();

    return NextResponse.json(
      {
        success: true,
        message: 'All consent revoked successfully',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'private, no-cache',
        },
      }
    );
  } catch (error) {
  

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revoke consent',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler - CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      },
    }
  );
}

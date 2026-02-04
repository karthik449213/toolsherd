/**
 * API Route: POST /api/cookies/update
 * 
 * Server-side endpoint for updating consent
 * Handles consent writes with validation and security checks
 */

import { NextRequest, NextResponse } from 'next/server';
import { ServerConsentStorage } from '@/lib/cookies/consent-storage';
import {
  ConsentRecordSchema,
  ConsentUpdateSchema,
  ConsentCategory,
  getDefaultConsent,
} from '@/lib/cookies/consent-schema';

/**
 * POST handler - Save/update consent
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const updateData = ConsentUpdateSchema.safeParse(body);
    if (!updateData.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid consent data',
          details: updateData.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Get current consent
    const current = await ServerConsentStorage.read();

    // Merge updates
    const updated = {
      ...current,
      ...updateData.data,
      categories: {
        ...current.categories,
        ...(updateData.data.categories || {}),
      },
      consentDate: current.consentDate, // Preserve original consent date
    };

    // Ensure essential is always true
    updated.categories.essential = true;

    // Validate final record
    const validated = ConsentRecordSchema.safeParse(updated);
    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid final consent record',
          details: validated.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Save to server
    await ServerConsentStorage.write(validated.data);

    return NextResponse.json(
      {
        success: true,
        data: validated.data,
        message: 'Consent updated successfully',
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
        error: 'Failed to update consent',
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
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

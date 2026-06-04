import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';



export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      toolName,
      toolUrl,
      toolDescription,
      toolCategory,
      pricingModel,
      submitterEmail,
      submitterName,
      brandImageUrl,
    } = body

    // Validate required fields
    if (!toolName || !toolUrl || !toolDescription || !submitterEmail || !submitterName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('tool_submissions')
      .insert([
        {
          tool_name: toolName,
          tool_url: toolUrl,
          tool_description: toolDescription,
          tool_category: toolCategory || null,
          pricing_model: pricingModel,
          submitter_email: submitterEmail,
          submitter_name: submitterName,
          brand_image_url: brandImageUrl || null,
          created_at: new Date().toISOString(),
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Tool submitted successfully', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

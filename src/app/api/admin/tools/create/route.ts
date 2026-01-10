import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { ToolFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ToolFormData & { imageUrl: string };

    // Validate required fields
    if (!body.name || !body.slug || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase.from('ai_tools').insert({
      name: body.name,
      slug: body.slug,
      category: body.category,
      description: body.description,
      imageUrl: body.imageUrl,
      detailed_description: body.detailed_description,
      key_features: body.key_features,
      use_cases: body.use_cases,
      pricing_tiers: body.pricing_tiers,
      target_audience: body.target_audience,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      seo_keywords: body.seo_keywords,
      rating: body.rating,
      user_count: body.user_count,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create tool' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

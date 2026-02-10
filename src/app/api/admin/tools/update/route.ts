import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { ToolFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ToolFormData & { id: string; imageUrl: string };

    const { id, ...dataToUpdate } = body;

    // Validate required fields
    if (!body.name || !body.slug || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, slug, and category are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists for another tool
    if (body.slug) {
      const { data: existingTool, error: checkError } = await supabase
        .from('ai_tools')
        .select('id, slug')
        .eq('slug', body.slug)
        .neq('id', id)
        .limit(1);

      if (checkError) {
        return NextResponse.json(
          { error: 'Failed to validate slug uniqueness' },
          { status: 500 }
        );
      }

      if (existingTool && existingTool.length > 0) {
        return NextResponse.json(
          { error: `A tool with slug "${body.slug}" already exists. Please use a different slug.` },
          { status: 409 }
        );
      }
    }

    // Update in database
    const { data, error } = await supabase
      .from('ai_tools')
      .update({
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
        tags: body.tags,
        website_url: body.website_url,
        seo_title: body.seo_title,
        seo_description: body.seo_description,
        seo_keywords: body.seo_keywords,
        rating: body.rating,
        user_count: body.user_count,
      })
      .eq('id', id)
      .select('id, slug');

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to update tool' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

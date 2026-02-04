import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { ToolFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ToolFormData & { imageUrl: string };

    // Validate required fields
    if (!body.name || !body.slug || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, slug, and category are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingTool, error: checkError } = await supabase
      .from('ai_tools')
      .select('id, slug')
      .eq('slug', body.slug)
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
      tags: body.tags,
      website_url: body.website_url,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      seo_keywords: body.seo_keywords,
      rating: body.rating,
      user_count: body.user_count,
      is_published: true,
      featured: false,
    }).select('id, slug');

    if (error) {

      
      // Handle specific error codes
      if (error.code === '23505') {
        return NextResponse.json(
          { error: `Duplicate entry: A tool with this slug already exists. Please choose a different slug.` },
          { status: 409 }
        );
      }
      
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
   
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

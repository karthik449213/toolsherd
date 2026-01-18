import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { BlogFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BlogFormData & { 
      cover_image_url: string;
      bodyImages?: string[];
    };

    // Validate required fields
    if (!body.title || !body.slug || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const slug = body.slug || body.title.toLowerCase().replace(/\s+/g, '-');

    // Insert into database
    const { data, error } = await supabase.from('blog_post').insert({
      title: body.title,
      slug: slug,
      category: body.category,
      excerpt: body.excerpt,
      content_md: body.content,  // Column name is content_md in schema
      cover_image_url: body.cover_image_url,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      seo_keywords: body.seo_keywords,
      author: body.author,
      tags: body.tags,
      is_published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create blog post' },
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

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { BlogFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BlogFormData & { 
      id: string;
      cover_image_url: string;
      bodyImages?: string[];
    };

    const { id, ...dataToUpdate } = body;

    // Validate required fields
    if (!body.title || !body.slug || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists for another post
    if (body.slug) {
      const { data: existingBlog, error: checkError } = await supabase
        .from('blog_post')
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

      if (existingBlog && existingBlog.length > 0) {
        return NextResponse.json(
          { error: `A blog post with slug "${body.slug}" already exists. Please use a different slug.` },
          { status: 409 }
        );
      }
    }

    // Update in database
    const { data, error } = await supabase
      .from('blog_post')
      .update({
        title: body.title,
        slug: body.slug,
        category: body.category,
        excerpt: body.excerpt,
        content_md: body.content,  // Column name is content_md in schema
        cover_image_url: body.cover_image_url,
        seo_title: body.seo_title,
        seo_description: body.seo_description,
        seo_keywords: body.seo_keywords,
        author: body.author,
        tags: body.tags,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('id, slug');

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to update blog post' },
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

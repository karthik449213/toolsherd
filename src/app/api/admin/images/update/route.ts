import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface UpdateImageRequest {
  id: string;
  imageUrl: string;
  type: 'tool' | 'blog'; // 'tool' for ai_tools table, 'blog' for blog_post table
  field?: string; // 'imageUrl' for tools, 'cover_image_url' for blogs
}

export async function POST(request: NextRequest) {
  try {
    const body: UpdateImageRequest = await request.json();
    const { id, imageUrl, type, field } = body;

    if (!id || !imageUrl || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: id, imageUrl, type' },
        { status: 400 }
      );
    }

    if (!['tool', 'blog'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "tool" or "blog"' },
        { status: 400 }
      );
    }

    // Determine table and field
    const table = type === 'tool' ? 'ai_tools' : 'blog_post';
    const imageField = field || (type === 'tool' ? 'imageUrl' : 'cover_image_url');

    // Update the record
    const { error } = await supabase
      .from(table)
      .update({ [imageField]: imageUrl })
      .eq('id', id);

    if (error) {
      console.error(`Error updating ${type} image:`, error);
      return NextResponse.json(
        { error: `Failed to update ${type} image: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${type} image updated successfully`,
      imageUrl,
    });
  } catch (err) {

    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

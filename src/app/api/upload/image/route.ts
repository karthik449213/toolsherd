import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fieldName = (formData.get('fieldName') as string) || 'image';

    console.log('Upload started:', { fieldName, fileName: file.name, fileSize: file.size, fileType: file.type });

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // Determine which bucket to use based on fieldName
    let bucketName = 'tool_logos'; // default
    if (fieldName === 'featured' || fieldName === 'body' || fieldName.toLowerCase().includes('blog')) {
      bucketName = 'blog';
    } else if (fieldName === 'logo' || fieldName.toLowerCase().includes('tool')) {
      bucketName = 'tool_logos';
    }

    console.log('Bucket routing:', { fieldName, determinedBucket: bucketName });

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const fileExt = file.name.split('.').pop();
    const fileName = `${fieldName}-${timestamp}-${randomId}.${fileExt}`;

    console.log('Generated filename:', fileName);

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase with correct bucket
    console.log('Attempting upload to bucket:', bucketName);
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`uploads/${fileName}`, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error details:', {
        message: error.message,
        statusCode: (error as any).statusCode,
        error: error,
      });
      return NextResponse.json(
        { 
          error: `Failed to upload to ${bucketName}: ${error.message}`,
          details: error
        }, 
        { status: 500 }
      );
    }

    console.log('Upload successful, data:', data);

    // Get public URL from correct bucket
    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`uploads/${fileName}`);

    const publicUrl = publicData?.publicUrl;

    if (!publicUrl) {
      console.error('Failed to get public URL for file:', fileName);
      return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
    }

    console.log('Public URL generated:', publicUrl);

    return NextResponse.json({ url: publicUrl, fileName, bucket: bucketName }, { status: 200 });
  } catch (error) {
    console.error('Upload error details:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}


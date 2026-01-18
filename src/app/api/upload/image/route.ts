import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fieldName = (formData.get('fieldName') as string) || 'image';

    console.log('=== IMAGE UPLOAD START ===');
    console.log('Upload request:', { fieldName, fileName: file?.name, fileSize: file?.size, fileType: file?.type });

    if (!file) {
      console.error('No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type);
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File too large:', file.size);
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

    // Verify Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json(
        { error: 'Server configuration error: Missing Supabase credentials' },
        { status: 500 }
      );
    }

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
    console.log('Attempting upload to bucket:', bucketName, 'file:', fileName);
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`uploads/${fileName}`, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('❌ Supabase upload error:', {
        message: error.message,
        statusCode: (error as any).statusCode,
        fullError: JSON.stringify(error),
      });
      return NextResponse.json(
        { 
          error: `Upload failed: ${error.message}. Make sure the ${bucketName} bucket exists and is configured correctly.`,
          details: error.message,
          bucket: bucketName,
        }, 
        { status: 500 }
      );
    }

    console.log('✓ Upload successful, data:', data);

    // Get public URL from correct bucket
    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`uploads/${fileName}`);

    const publicUrl = publicData?.publicUrl;

    if (!publicUrl) {
      console.error('Failed to get public URL for file:', fileName);
      return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
    }

    console.log('✓ Public URL generated:', publicUrl);
    console.log('=== IMAGE UPLOAD SUCCESS ===');

    return NextResponse.json({ url: publicUrl, fileName, bucket: bucketName }, { status: 200 });
  } catch (error) {
    console.error('❌ Upload exception:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { 
        error: `Upload failed: ${errorMessage}`,
        details: errorMessage
      }, 
      { status: 500 }
    );
  }
}


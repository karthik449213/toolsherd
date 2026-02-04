import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fieldName = (formData.get('fieldName') as string) || 'image';

   
    

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

 

    // Verify Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
   
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



    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase with correct bucket
  
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`uploads/${fileName}`, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      
      return NextResponse.json(
        { 
          error: `Upload failed: ${error.message}. Make sure the ${bucketName} bucket exists and is configured correctly.`,
          details: error.message,
          bucket: bucketName,
        }, 
        { status: 500 }
      );
    }

    

    // Get public URL from correct bucket
    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`uploads/${fileName}`);

    const publicUrl = publicData?.publicUrl;

    if (!publicUrl) {
     
      return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
    }



    return NextResponse.json({ url: publicUrl, fileName, bucket: bucketName }, { status: 200 });
  } catch (error) {

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


# Image Upload Troubleshooting Guide

## 500 Error on Body Image Upload

If you're seeing a **500 error** when uploading body images, follow these steps:

### Step 1: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for error messages starting with "Upload failed for"
4. The error message should tell you what went wrong

### Step 2: Verify Supabase Bucket Configuration

Your images are being uploaded to the `blog` bucket. You need to verify:

#### 2a. Bucket Exists
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Storage** → **Buckets**
3. Verify you have a bucket named `blog`
4. ❌ If missing, you'll need to create it

#### 2b. Bucket is Public
1. Click on the `blog` bucket
2. Look for **Access settings** or similar option
3. Ensure it's set to **PUBLIC** (not private)
4. ❌ If it's private, click to make it public

#### 2c. Verify Permissions
1. In the `blog` bucket, click on **Policies** or **Access Control**
2. Ensure there's a policy allowing `INSERT` operations
3. Should have a policy similar to:
   ```
   CREATE POLICY "Allow public uploads"
   ON storage.objects
   FOR INSERT TO authenticated, anon
   WITH CHECK (bucket_id = 'blog');
   ```

### Step 3: Check Your Supabase URL and Keys
1. In your project's [Settings → API](https://app.supabase.com/project/_/settings/api)
2. Find: **Project URL** and **anon public key**
3. These should match what's in your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   ```
4. If they don't match, update them and restart your dev server

### Step 4: Check Image File Size
- Maximum size: **5MB per image**
- Recommended: **2-3MB** for optimal loading
- If your image is larger:
  - Use an online image compressor
  - Or resize using an image editor

### Step 5: Check Network Tab
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try uploading an image again
4. Look for the request to `/api/upload/image`
5. Click on it and check:
   - **Status**: Should be 200 (not 500)
   - **Response**: Should show `{"url":"...", "fileName":"...", "bucket":"blog"}`
   - **Headers**: Check content type is `multipart/form-data`

## Common Error Messages

### "Failed to upload to blog: ..."
- **Cause**: Bucket doesn't exist or is not public
- **Fix**: Follow Step 2 above

### "Failed to get public URL"
- **Cause**: Bucket permissions issue
- **Fix**: Verify bucket is PUBLIC (Step 2b)

### "File size exceeds 5MB limit"
- **Cause**: Your image is too large
- **Fix**: Compress the image before uploading

### "Invalid file type. Only images are allowed."
- **Cause**: You selected a non-image file
- **Fix**: Make sure you're uploading JPG, PNG, GIF, or WebP

### "No file provided"
- **Cause**: File wasn't properly attached to the request
- **Fix**: Try again or refresh the page

## Testing Upload

### Quick Test
1. Go to Admin → Create Blog Post
2. Fill in basic JSON content (title, slug, excerpt, etc.)
3. Click "Parse & Validate"
4. In "Upload Body Images" section, try uploading a small test image
5. If it succeeds, you'll see it in the gallery
6. If it fails, check the error message and follow troubleshooting steps

### Debug with Direct Upload
If admin dashboard upload doesn't work, test directly:

1. Open browser console (F12)
2. Run this code:
```javascript
const formData = new FormData();
const file = /* select an image somehow */;
formData.append('file', file);
formData.append('fieldName', 'body');

fetch('/api/upload/image', {
  method: 'POST',
  body: formData
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## Supabase Bucket Setup (If Starting Fresh)

If your `blog` bucket doesn't exist:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Storage**
4. Click **Create Bucket**
5. Name it `blog`
6. ✅ Check **Public bucket** checkbox
7. Click **Create**
8. Done! Now try uploading again

## Still Having Issues?

### Option A: Check API Logs
1. In Supabase dashboard, go to **Logs** or **Edge Functions**
2. Look for any errors related to storage operations
3. This might show what Supabase is rejecting

### Option B: Test File Directly in Supabase
1. Go to **Storage** → **blog** bucket
2. Click **Upload** button
3. Try uploading a test image directly
4. If this works, the bucket is fine (issue is in the API)
5. If this fails, the bucket has permission issues

### Option C: Restart Dev Server
Sometimes after changing environment variables:
1. Stop your dev server (Ctrl+C)
2. Restart it: `npm run dev`
3. Try uploading again

## Image Requirements

- **Format**: JPG, PNG, GIF, or WebP
- **Size**: Maximum 5MB (recommended 2-3MB)
- **Dimensions**: Recommended 1200px+ width
- **Aspect Ratio**: Any ratio works, but consistent aspect ratios look better

## For Production (Vercel)

When deployed to Vercel:
1. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Redeploy after adding/updating
3. Test uploads in production

---

**Need help?** Check the browser console (F12) for detailed error messages, which often tell you exactly what's wrong!

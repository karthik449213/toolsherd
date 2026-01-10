# Multiple Body Images Guide

## Overview
You can now upload multiple images throughout your blog post content. These images can be placed anywhere within your markdown content and will be rendered beautifully.

## How to Use

### Step 1: Upload Body Images
1. In the **"Upload Body Images"** section, drag and drop multiple image files or click to select
2. Upload up to 10 images (each up to 5MB)
3. Images are numbered 1-10 in the upload zone for easy reference
4. You can remove images by clicking the X button before publishing

### Step 2: Reference Images in Markdown
In your markdown content, reference images using the following syntax:

```
[Image 1]
[Image 2]
[Image 3]
```

### Example Blog Structure

```json
{
  "title": "Ultimate Travel Guide to Japan",
  "slug": "japan-travel-guide",
  "excerpt": "Discover the best destinations, food, and culture in Japan",
  "category": "Travel",
  "author": "John Doe",
  "reading_time_minutes": 8,
  "content_md": "# Japan Travel Guide

Japan is an incredible destination with ancient temples and modern cities.

[Image 1]

## Tokyo - The Capital

Tokyo is vibrant, fast-paced, and full of energy. From the neon lights of Shibuya to the peaceful gardens of the Imperial Palace.

[Image 2]

## Kyoto - Traditional Japan

Kyoto preserves traditional Japanese culture with thousands of temples and shrines.

[Image 3]

## Osaka - Food Paradise

Osaka is known as the nation's kitchen with incredible street food and local cuisine.",
  "seo_title": "Complete Japan Travel Guide",
  "seo_description": "Expert tips for visiting Japan including Tokyo, Kyoto, and Osaka",
  "seo_keywords": ["Japan", "Travel", "Tokyo", "Kyoto"],
  "tags": ["travel", "asia", "japan"]
}
```

## Image Rendering

- Images referenced as `[Image 1]`, `[Image 2]`, etc., are rendered full-width with a border
- Images automatically scale to fit the content area
- Images maintain their aspect ratio
- Maximum height is 384px to keep layouts readable

## Tips

✅ **DO:**
- Upload high-quality images (at least 1200px wide for best results)
- Number your images sequentially if using multiple images
- Use descriptive alt text in your JSON (add a notes field if needed)
- Test the preview to see how images look in context

❌ **DON'T:**
- Upload images over 5MB (will be rejected)
- Reference non-existent images (e.g., `[Image 5]` when you only uploaded 3)
- Use special characters in image filenames
- Upload the same image multiple times (optimization)

## Professional Blog Image Best Practices

1. **Featured Image**: Use for the cover/hero section (1200x630px recommended)
2. **Body Images**: Use throughout content for visual interest
   - Section headers: Include relevant imagery
   - Data/comparisons: Use infographics or comparison images
   - Step-by-step guides: One image per step
   - Reviews: Product/service images
   
3. **Image Count**: Professional blogs typically use 3-5 body images per post
   - Short posts (3-5 min read): 1-2 body images
   - Medium posts (5-10 min read): 2-4 body images
   - Long posts (10+ min read): 4-8 body images

4. **Image Optimization**:
   - Use WebP format for faster loading (but JPG/PNG work too)
   - Compress images to under 200KB each
   - Use consistent dimensions for cohesive design
   - Maintain consistent aspect ratios throughout

## Database Schema

The blog_post table now includes a `body_images` column (JSON array) that stores all uploaded image URLs.

```sql
body_images: ["url1", "url2", "url3", ...]
```

This allows you to:
- Display images throughout the blog post
- Maintain a gallery of all images used
- Edit and update image references later

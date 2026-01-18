# Blog Post Format Setup - Complete Guide

## Overview

Your blog post system now fully supports the exact JSON format you specified. The system has been updated to make creating blog posts with this format seamless and straightforward.

## Files Created/Updated

### 1. **BLOG_POST_FORMAT_GUIDE.md** (Main Reference)
   - Complete format specification with all fields
   - All 7 supported content block types with examples
   - Field reference table
   - Complete working example (the Emergent.sh post)
   - Validation rules
   - Publishing workflow

### 2. **BLOG_FORMAT_QUICK_REFERENCE.md** (Quick Lookup)
   - Minimal example
   - Content block cheat sheet
   - Slug rules with examples
   - SEO best practices
   - Common mistakes

### 3. **EMERGENT_SH_BLOG_POST.json** (Ready-to-Use Example)
   - Pre-formatted Emergent.sh blog post
   - Copy-paste ready into the admin panel
   - Demonstrates all supported content types

### 4. **Blog Creation UI Updates**
   - Updated `/admin/blog/create` template
   - Better inline instructions
   - Improved JSON template with realistic example

## Format Overview

Your blog posts should follow this structure:

```json
{
  "title": "string",           // Required
  "slug": "kebab-case-only",   // Required - URL slug
  "excerpt": "string",         // Required - Brief summary
  "category": "string",        // Required - Category name
  "author": "string",          // Required - Author name
  "tags": ["string"],          // Required - Array of tags
  "reading_time_minutes": 10,  // Required - Estimated time
  "seo_title": "string",       // Required - SEO title
  "seo_description": "string", // Required - SEO description
  "seo_keywords": ["string"],  // Required - SEO keywords
  "content": [                 // Required - Array of content blocks
    {
      "type": "heading|paragraph|list|quote|code|image",
      "level": 1,              // Only for headings (1-6)
      "content": "string",     // For heading, paragraph, quote, code
      "ordered": true|false,   // Only for lists
      "items": ["string"],     // Only for lists
      "src": "url",            // Only for images
      "alt": "string",         // Only for images
      "caption": "string"      // Optional for images
    }
  ]
}
```

## Supported Content Block Types

| Type | Required Fields | Description |
|------|-----------------|-------------|
| `heading` | type, level, content | H1-H6 headings |
| `paragraph` | type, content | Text paragraphs |
| `list` | type, ordered, items | Bullet or numbered lists |
| `quote` | type, content | Blockquote/pull quote |
| `code` | type, content | Code block |
| `image` | type, src, alt | Embedded image |

## How to Create a Blog Post

### Step 1: Prepare Your JSON
Use the template from `/admin/blog/create` or copy from `EMERGENT_SH_BLOG_POST.json`

### Step 2: Structure Your Content
Each paragraph, heading, code block, etc., becomes a separate content object in the array.

### Step 3: Access Admin Panel
Navigate to `/admin/blog/create`

### Step 4: Paste & Parse
- Click "Copy JSON Template" to see format
- Paste your JSON into the textarea
- Click "Parse JSON" button
- System validates all required fields

### Step 5: Upload Images
- Upload featured image (required for publishing)
- Optionally upload body images to reference in content

### Step 6: Preview
Review your blog post in real-time

### Step 7: Publish
Click "Publish Blog Post"

Your post is live at `/blog/{slug}`

## Examples

### Example 1: Simple Post
```json
{
  "title": "Getting Started with React",
  "slug": "getting-started-react",
  "excerpt": "Learn the basics of React development",
  "category": "Technology",
  "author": "Jane Developer",
  "tags": ["React", "JavaScript"],
  "reading_time_minutes": 7,
  "seo_title": "React Getting Started Guide 2026",
  "seo_description": "Complete beginner's guide to React",
  "seo_keywords": ["React tutorial", "JavaScript"],
  "content": [
    {"type": "heading", "level": 1, "content": "Getting Started with React"},
    {"type": "paragraph", "content": "React is a powerful JavaScript library..."},
    {"type": "list", "ordered": false, "items": ["Point 1", "Point 2"]},
    {"type": "code", "content": "import React from 'react';"}
  ]
}
```

### Example 2: The Provided Emergent.sh Post
Already provided in `EMERGENT_SH_BLOG_POST.json` - ready to copy-paste!

## Key Features of the System

✅ **Full-Stack Support**: Metadata + SEO + Rich Content  
✅ **Multiple Block Types**: 7 different content types supported  
✅ **Flexible Content**: Pass array or JSON string  
✅ **Real-time Validation**: Immediate feedback on parse errors  
✅ **Preview Before Publish**: See exactly how it will look  
✅ **Image Support**: Featured image + body images  
✅ **SEO Ready**: All necessary SEO fields included  

## Validation

The system validates:
- ✅ All 10 required fields present
- ✅ Slug format (lowercase, hyphens only)
- ✅ Content is valid array or JSON string
- ✅ Each content block has required fields
- ✅ Arrays contain correct data types
- ✅ Reading time is a positive number

## Common Mistakes to Avoid

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Missing fields | Check all 10 fields present |
| `"slug": "With Spaces"` | Use `"slug": "with-hyphens"` |
| `"tags": "tag1, tag2"` | Use `"tags": ["tag1", "tag2"]` |
| Content as string with extra quotes | Use valid JSON for content array |
| `"level": 7` for heading | Use level 1-6 only |
| Non-string array items | All items must be strings |

## File Locations

```
toolsherd/
├── BLOG_POST_FORMAT_GUIDE.md         ← Complete documentation
├── BLOG_FORMAT_QUICK_REFERENCE.md    ← Quick reference card
├── EMERGENT_SH_BLOG_POST.json        ← Ready-to-use example
└── src/
    └── app/
        └── admin/
            └── blog/
                └── create/
                    └── page.tsx      ← Updated UI with template
```

## Next Steps

1. **Try the Emergent.sh Example**
   - Copy content from `EMERGENT_SH_BLOG_POST.json`
   - Go to `/admin/blog/create`
   - Paste and parse
   - Upload featured image
   - Publish

2. **Create Your Own**
   - Reference `BLOG_FORMAT_QUICK_REFERENCE.md` for format
   - Follow examples in `BLOG_POST_FORMAT_GUIDE.md`
   - Use the template from admin panel

3. **Share Knowledge**
   - Team members can reference these guides
   - Standard format for all blog posts
   - Easy to maintain and extend

## Support

For questions about:
- **Format structure**: See `BLOG_POST_FORMAT_GUIDE.md`
- **Quick examples**: See `BLOG_FORMAT_QUICK_REFERENCE.md`
- **Content types**: See "Supported Block Types" section above
- **SEO guidance**: See `BLOG_POST_FORMAT_GUIDE.md` under "SEO Fields"

## Technical Details

- **Storage**: Supabase `blog_post` table
- **Validation**: `src/lib/jsonValidator.ts`
- **Content handling**: Both array and string formats supported
- **API endpoint**: `/api/admin/blog/create`
- **Display**: `src/app/blog/[slug]/page.tsx`

---

**Status**: ✅ Complete and Ready to Use

Your blog post system now accepts the exact format you specified with full support for all metadata, SEO, and content types!

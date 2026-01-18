# Quick Blog Post Format Reference

## Minimal Example
```json
{
  "title": "My Article Title",
  "slug": "my-article-title",
  "excerpt": "Brief summary",
  "category": "Technology",
  "author": "Your Name",
  "tags": ["tag1", "tag2"],
  "reading_time_minutes": 5,
  "seo_title": "SEO Title (50-60 chars)",
  "seo_description": "SEO description (150-160 chars)",
  "seo_keywords": ["keyword1", "keyword2"],
  "content": [
    {"type": "heading", "level": 1, "content": "Main Title"},
    {"type": "paragraph", "content": "Your text here"}
  ]
}
```

## Content Block Cheat Sheet

### Heading
```json
{"type": "heading", "level": 1, "content": "Text"}
```
Levels: 1-6 (H1-H6)

### Paragraph
```json
{"type": "paragraph", "content": "Your paragraph text."}
```

### Bullet List
```json
{
  "type": "list",
  "ordered": false,
  "items": ["Item 1", "Item 2", "Item 3"]
}
```

### Numbered List
```json
{
  "type": "list",
  "ordered": true,
  "items": ["First", "Second", "Third"]
}
```

### Quote
```json
{"type": "quote", "content": "Quote text"}
```

### Code Block
```json
{"type": "code", "content": "function example() {\n  return true;\n}"}
```

### Image
```json
{
  "type": "image",
  "src": "https://example.com/image.jpg",
  "alt": "Image description",
  "caption": "Optional caption"
}
```

## Slug Rules
✅ Lowercase letters, numbers, hyphens
❌ Spaces, uppercase, special characters

**Examples:**
- ✅ `emergent-sh-guide-vibe-coding`
- ✅ `getting-started-with-ai-2026`
- ❌ `Getting Started with AI 2026`
- ❌ `Getting_Started-With AI!`

## SEO Best Practices
| Field | Length | Note |
|-------|--------|------|
| seo_title | 50-60 chars | Include main keyword |
| seo_description | 150-160 chars | Natural language |
| seo_keywords | 5-10 items | Realistic phrases |

## Publishing Steps
1. Create JSON following this format
2. Copy to `/admin/blog/create`
3. Click "Copy JSON Template" to see format
4. Click "Parse JSON"
5. Upload featured image
6. Click "Publish Blog Post"

Live at: `/blog/{slug}`

## Common Mistakes
❌ `"content": "string of JSON"` - Use array or valid JSON string  
❌ Missing required fields - Check all 10 fields present  
❌ Slug with spaces - Use hyphens only  
❌ Invalid heading level - Use 1-6  
❌ Non-array tags/keywords - Must be arrays  

✅ Double-check required fields before publishing
✅ Use the template from the admin panel
✅ Preview your post before publishing
✅ Test slug is unique and URL-friendly

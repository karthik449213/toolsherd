# Blog Post Creation - Quick Start (2 Minutes)

## TL;DR - 3 Steps

### Step 1: Get Your JSON
Copy from one of these:
- **Template** (new post): Go to `/admin/blog/create`, click "Copy JSON Template"
- **Example** (Emergent.sh): Copy `EMERGENT_SH_BLOG_POST.json`

### Step 2: Edit & Go to Admin
- Edit the copied JSON with your content
- Go to `/admin/blog/create`
- Paste JSON → Click "Parse JSON"

### Step 3: Publish
- Upload featured image
- Click "Publish Blog Post"
- ✅ Live at `/blog/{your-slug}`

---

## Copy-Paste Template

```json
{
  "title": "Your Title Here",
  "slug": "your-title-here",
  "excerpt": "Brief summary goes here",
  "category": "Technology",
  "author": "Your Name",
  "tags": ["tag1", "tag2"],
  "reading_time_minutes": 5,
  "seo_title": "SEO Title (50-60 chars)",
  "seo_description": "SEO Description (150-160 chars)",
  "seo_keywords": ["keyword1", "keyword2", "keyword3"],
  "content": [
    {"type": "heading", "level": 1, "content": "Your Main Title"},
    {"type": "paragraph", "content": "Your first paragraph here."},
    {"type": "heading", "level": 2, "content": "Section Title"},
    {"type": "paragraph", "content": "More content here."},
    {"type": "list", "ordered": false, "items": ["Point 1", "Point 2", "Point 3"]},
    {"type": "paragraph", "content": "Final paragraph."}
  ]
}
```

---

## Content Block Types (Copy-Paste)

### Heading
```json
{"type": "heading", "level": 1, "content": "Title"}
```
Use levels 1-6 for H1-H6

### Paragraph
```json
{"type": "paragraph", "content": "Your text here."}
```

### Bullet List
```json
{"type": "list", "ordered": false, "items": ["Item 1", "Item 2"]}
```

### Numbered List
```json
{"type": "list", "ordered": true, "items": ["First", "Second"]}
```

### Quote
```json
{"type": "quote", "content": "The quote text"}
```

### Code
```json
{"type": "code", "content": "function hello() {\n  return true;\n}"}
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

---

## Rules to Remember

✅ **Slug**: lowercase, hyphens only  
✅ **Tags & Keywords**: Must be arrays `["tag1", "tag2"]`  
✅ **Reading Time**: Number (5, not "5")  
✅ **Heading Levels**: 1-6 only  
✅ **Content**: Array of objects (not escaped string)  

---

## Real Example

### Before Publishing
```json
{
  "title": "How to Learn Python",
  "slug": "how-to-learn-python",
  "excerpt": "A practical guide to getting started with Python",
  "category": "Programming",
  "author": "John Doe",
  "tags": ["Python", "Beginner", "Tutorial"],
  "reading_time_minutes": 8,
  "seo_title": "How to Learn Python: Beginner's Guide (2026)",
  "seo_description": "Learn Python from scratch with this comprehensive beginner's guide",
  "seo_keywords": ["learn python", "python tutorial", "python basics"],
  "content": [
    {"type": "heading", "level": 1, "content": "How to Learn Python"},
    {"type": "paragraph", "content": "Python is one of the most popular programming languages today. Here's how to get started."},
    {"type": "heading", "level": 2, "content": "Step 1: Set Up Your Environment"},
    {"type": "paragraph", "content": "First, download Python from python.org and install it on your computer."},
    {"type": "heading", "level": 2, "content": "What You'll Learn"},
    {"type": "list", "ordered": false, "items": ["Variables and data types", "Control flow", "Functions", "Object-oriented programming"]},
    {"type": "heading", "level": 2, "content": "Example Code"},
    {"type": "code", "content": "# Your first Python program\nprint('Hello, World!')"},
    {"type": "paragraph", "content": "Start with the basics and build your skills gradually."}
  ]
}
```

### After Publishing
Live at: `yoursite.com/blog/how-to-learn-python` ✅

---

## Checklist

- [ ] JSON is valid (parse without errors)
- [ ] All 10 required fields present
- [ ] Slug uses only lowercase and hyphens
- [ ] Reading time is a number
- [ ] Tags and keywords are arrays
- [ ] Featured image uploaded
- [ ] Clicked "Publish Blog Post"

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Parse error | Check JSON syntax (use jsonlint.com) |
| "Required field missing" | Ensure all 10 fields present |
| Slug error | Use lowercase, hyphens: `my-awesome-post` |
| Tags error | Use array format: `["tag1", "tag2"]` |
| Can't publish | Upload featured image first |

---

## Full Documentation

- **Complete Guide**: `BLOG_POST_FORMAT_GUIDE.md`
- **Quick Reference**: `BLOG_FORMAT_QUICK_REFERENCE.md`
- **Setup Info**: `BLOG_POST_SETUP_COMPLETE.md`
- **Example Post**: `EMERGENT_SH_BLOG_POST.json`

---

**Ready to publish?** Go to `/admin/blog/create` now! 🚀

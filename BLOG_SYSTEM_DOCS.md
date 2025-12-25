# Blog System Documentation

## Overview

This is a complete Next.js blog system that renders Markdown content stored in Supabase with full SEO support, clean typography, and reusable structure.

## Features

✅ **Markdown Rendering** with GitHub-flavored markdown (GFM) support
✅ **Server-Side Rendering** for better performance and SEO
✅ **Dynamic Routes** using Next.js App Router (`/blog/[slug]`)
✅ **SEO Optimization** with meta tags, Open Graph, and structured data (JSON-LD)
✅ **Responsive Design** with semantic HTML and clean spacing
✅ **Code Syntax Highlighting** with copy-to-clipboard functionality
✅ **Social Sharing** (Twitter, LinkedIn, WhatsApp, Email, Facebook, Reddit)
✅ **Markdown-to-HTML** conversion without client-side parsing
✅ **Dark Mode Support** for markdown content

## Database Schema

### `blog_post` Table

The blog system expects a Supabase table with the following fields:

```sql
CREATE TABLE blog_post (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content_md TEXT NOT NULL,  -- MARKDOWN CONTENT ONLY
  cover_image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  author TEXT,
  tags TEXT[],
  category TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx                 # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx             # Dynamic blog post page
│   ├── globals.css
│   ├── markdown-content.css         # Markdown-specific styles
│   └── layout.tsx
├── components/
│   ├── MarkdownRenderer.tsx         # Markdown rendering component
│   ├── CodeBlock.tsx                # Code block with syntax highlighting
│   ├── BlogPostCard.tsx
│   ├── BlogPostComponent.tsx
│   └── ...
├── lib/
│   ├── supabaseClient.ts
│   ├── types.ts
│   ├── blogUtils.ts                 # Blog utility functions
│   └── utils.ts
└── ...
```

## Key Components

### 1. **MarkdownRenderer** (`src/components/MarkdownRenderer.tsx`)

Renders markdown content with full support for:

- **Headings** (h1-h6) with responsive sizing
- **Paragraphs** with proper line height (1.7+)
- **Links** with target="_blank" for external URLs
- **Images** with responsive sizing and captions
- **Code Blocks** with language detection and copy button
- **Inline Code** with background styling
- **Lists** (unordered and ordered)
- **Blockquotes** with special styling
- **Tables** with proper styling
- **Line Breaks** and horizontal rules
- **GitHub-flavored markdown** extensions

```tsx
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

<MarkdownRenderer 
  content={markdownContent} 
  className="prose-content"
/>
```

### 2. **CodeBlock** (`src/components/CodeBlock.tsx`)

Renders code blocks with:
- Language detection
- Copy-to-clipboard button
- Dark theme styling
- Monospace font

### 3. **Blog Post Page** (`src/app/blog/[slug]/page.tsx`)

Features:
- Dynamic routing based on slug
- Server-side rendering for performance
- SEO metadata generation
- JSON-LD structured data
- Social sharing buttons
- Author information
- Tags display
- Related posts section

## Markdown Support

The blog supports all GitHub-flavored markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

Regular paragraph with **bold**, *italic*, and ***bold italic***.

- List item 1
- List item 2
- Nested list
  - Nested item

1. Numbered item
2. Second item

[Link text](https://example.com)

![Alt text](image-url.jpg)

> Blockquote text
> Multi-line support

\`inline code\`

\`\`\`javascript
// Code block with language
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

## Styling

### Markdown Content Styles

All markdown styling is controlled by `src/app/markdown-content.css` with:

- **Max Content Width**: 65 characters (optimal for readability)
- **Line Height**: 1.75 for paragraphs, 1.8 for first paragraph
- **Color Variables**: Uses CSS custom properties for light/dark mode
- **Responsive Design**: Adjusts for mobile devices
- **Dark Mode**: Automatically adjusts colors for `prefers-color-scheme: dark`

Key CSS classes:
- `.prose-content` - Main container
- All child selectors are scoped to `.prose-content`

### No Inline Styles

All styling comes from:
1. **Tailwind CSS** in components
2. **CSS file** for markdown rendering
3. **CSS variables** for theming

No hardcoded colors or inline styles.

## SEO Features

### 1. Metadata Generation

The blog post page automatically generates:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Returns title, description, keywords, Open Graph tags, Twitter tags
}
```

Uses:
- `seo_title` (fallback to `title`)
- `seo_description` (fallback to `excerpt`)
- `seo_keywords` array
- `cover_image_url` for OG:image

### 2. Structured Data (JSON-LD)

Automatically generates BlogPosting schema:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "image": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": {...},
  "publisher": {...}
}
```

### 3. Open Graph Tags

Automatically sets:
- `og:title`
- `og:description`
- `og:image`
- `og:type: article`
- `article:published_time`
- `article:author`

### 4. Twitter Card

Automatically sets:
- `twitter:card: summary_large_image`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:creator`

### 5. Semantic HTML

Uses semantic HTML tags:
```tsx
<article>
  <header>
    <h1>Title</h1>
    <time dateTime={ISO}>Date</time>
  </header>
  <MarkdownRenderer content={content} />
  <footer>
    {author && <section>About Author</section>}
    <section>Share buttons</section>
    <section>Comments</section>
  </footer>
</article>
```

## Performance

### Server-Side Rendering

- Blog pages are rendered on the server
- No client-side markdown parsing
- Markdown is converted to HTML on the server
- Faster page loads and better SEO

### Image Optimization

Uses Next.js `Image` component:
```tsx
<Image
  src={coverImageUrl}
  alt={title}
  fill
  className="object-cover w-full h-full"
  priority
/>
```

Benefits:
- Automatic lazy loading
- Responsive sizing
- WebP format support
- LQIP (Low Quality Image Placeholder)

## Usage Examples

### Basic Blog Post

Create a blog post in Supabase:

```sql
INSERT INTO blog_post (
  title, 
  slug, 
  excerpt, 
  content_md, 
  author, 
  published_at,
  tags
) VALUES (
  'Getting Started with React',
  'getting-started-with-react',
  'Learn the basics of React and start building modern web applications.',
  '# Getting Started\n\nReact is a...',
  'John Doe',
  NOW(),
  ARRAY['React', 'JavaScript', 'Web Development']
);
```

### Accessing the Blog Post

Navigate to: `/blog/getting-started-with-react`

### Using Blog Utilities

```tsx
import { 
  formatDate, 
  calculateReadingTime,
  generateSocialShareUrls,
  getRelatedPosts 
} from '@/lib/blogUtils';

// Format date
const formattedDate = formatDate(new Date());

// Calculate reading time
const readingTime = calculateReadingTime(markdownContent);

// Generate social share URLs
const shareUrls = generateSocialShareUrls(post);

// Get related posts
const related = getRelatedPosts(post, allPosts, 3);
```

## Configuration

### Environment Variables

Ensure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Markdown Plugins

The system uses:
- **react-markdown** - Core markdown rendering
- **remark-gfm** - GitHub-flavored markdown support
- **remark-breaks** - Soft line breaks support

## Responsive Design

All components are responsive:

- **Mobile** (< 640px): Single column layout, smaller headings
- **Tablet** (640px - 1024px): Two column layout with sidebar
- **Desktop** (> 1024px): Full layout with sidebar

## Dark Mode

The system supports dark mode through CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

Users can toggle dark mode in their OS settings or browser preferences.

## Future Enhancements

- [ ] Comments system integration
- [ ] Related posts fetching from Supabase
- [ ] Reading time estimation in metadata
- [ ] Blog post search functionality
- [ ] Pagination for blog listing
- [ ] Category filtering
- [ ] Author pages
- [ ] RSS feed generation
- [ ] Syntax highlighting with Prism.js
- [ ] Table of Contents generation

## Troubleshooting

### Markdown not rendering

1. Ensure `content_md` field contains markdown (not HTML)
2. Check that react-markdown is installed: `npm list react-markdown`
3. Verify MarkdownRenderer component is imported correctly

### Images not displaying

1. Ensure image URLs are correct and publicly accessible
2. Check image CORS settings
3. Verify cover_image_url is set in database

### SEO not working

1. Check metadata is generated in `generateMetadata()` function
2. Verify structured data in page source (`<script type="application/ld+json">`)
3. Test with Google Search Console

### Styling issues

1. Check markdown-content.css is imported in layout.tsx
2. Verify Tailwind CSS is configured correctly
3. Check for conflicting CSS rules

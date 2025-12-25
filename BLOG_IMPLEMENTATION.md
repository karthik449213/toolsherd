# Blog Post Implementation Guide

This guide explains the comprehensive blog post system that has been implemented in your Next.js project.

## Overview

The blog implementation includes:

1. **Enhanced Blog Post Page** (`src/app/blog/[slug]/page.tsx`) - Server-side rendered blog post pages with full SEO support
2. **Blog Post Component** (`src/components/BlogPostComponent.tsx`) - Reusable client-side component
3. **Blog Post Card** (`src/components/BlogPostCard.tsx`) - Card component for blog post previews
4. **Content Builder Components** (`src/components/ContentBuilder.tsx`) - Rich text content components
5. **Quote Block Component** (`src/components/QuoteBlock.tsx`) - Highlighted quote blocks
6. **Blog Utilities** (`src/lib/blogUtils.ts`) - Helper functions for blog operations
7. **Enhanced Types** (`src/lib/types.ts`) - TypeScript interfaces for blog data

## Features

### 1. SEO & Metadata

- **Open Graph Tags** - For social media sharing previews
- **Twitter Card Tags** - For Twitter sharing
- **JSON-LD Structured Data** - For search engine optimization
- **Dynamic Metadata Generation** - Using Next.js `generateMetadata`

### 2. Blog Post Page Structure

#### Header
- Back to Blog link
- Publication date and author
- Reading time estimate
- Featured title and excerpt

#### Featured Image
- Responsive image display
- Automatic image optimization

#### Main Content
- Prose-formatted content with proper typography
- Code syntax highlighting support
- Link styling
- List and blockquote styling

#### Author Bio Section
- Author name and description
- Positioned after main content

#### Social Sharing Section
- Twitter share button
- LinkedIn share button
- WhatsApp share button
- Email share button
- Pre-populated share URLs

#### Comments Section
- Placeholder for future comment integration
- Call-to-action for community engagement

#### Sidebar
- **Related Posts** - Links to related articles
- **Tags** - Clickable tag filter links
- **Newsletter Signup** - Email subscription form

#### Footer
- Quick navigation links
- About section
- Contact information
- Copyright notice

### 3. Responsive Design

- Mobile-first approach
- Desktop layout with sidebar
- Tablets with adaptive grid
- Fully responsive typography
- Touch-friendly buttons and links

### 4. Content Components

#### Code Block
```typescript
import { CodeBlock } from '@/components/ContentBuilder';

<CodeBlock 
  code="console.log('Hello World')" 
  language="javascript"
  showLineNumbers={true}
/>
```

#### Quote Block
```typescript
import { QuoteBlock } from '@/components/QuoteBlock';

<QuoteBlock 
  text="This is an important insight"
  author="John Doe"
/>
```

#### Images with Captions
```typescript
import { ImageWithCaption } from '@/components/ContentBuilder';

<ImageWithCaption
  src="/image.jpg"
  alt="Description"
  caption="Image caption text"
  width={800}
  height={400}
/>
```

#### Lists
```typescript
import { UnorderedList, OrderedList } from '@/components/ContentBuilder';

<UnorderedList items={['Item 1', 'Item 2', 'Item 3']} />
<OrderedList items={['First', 'Second', 'Third']} />
```

#### Alerts
```typescript
import { AlertBlock } from '@/components/ContentBuilder';

<AlertBlock
  type="info"
  title="Information"
  message="This is an info message"
/>
// Types: 'info', 'warning', 'success', 'error'
```

### 5. Blog Post Card

Display blog posts in lists or grids:

```typescript
import BlogPostCard from '@/components/BlogPostCard';

<BlogPostCard
  title="Blog Post Title"
  excerpt="Brief description..."
  slug="blog-slug"
  author="Author Name"
  publishedAt={new Date()}
  coverImage="/image.jpg"
  tags={['AI', 'Technology']}
  readingTime={5}
/>
```

### 6. Reusable Blog Post Component

For displaying blog posts in different contexts:

```typescript
import BlogPostComponent from '@/components/BlogPostComponent';

<BlogPostComponent
  title="Blog Title"
  author="Author Name"
  publishedAt={new Date()}
  excerpt="Brief description"
  content={htmlContent}
  coverImage="/image.jpg"
  slug="post-slug"
  tags={['tag1', 'tag2']}
  relatedPosts={[...]}
/>
```

## Utility Functions

### blogUtils.ts

#### Date Formatting
```typescript
import { formatDate, formatDateISO } from '@/lib/blogUtils';

formatDate(new Date()); // "December 25, 2025"
formatDateISO(new Date()); // "2025-12-25"
```

#### Reading Time
```typescript
import { calculateReadingTime } from '@/lib/blogUtils';

const readingTime = calculateReadingTime(contentHtml);
```

#### Social Sharing URLs
```typescript
import { generateSocialShareUrls } from '@/lib/blogUtils';

const urls = generateSocialShareUrls(post, 'https://yourdomain.com');
// Returns: { twitter, linkedin, whatsapp, email, facebook, reddit }
```

#### Slug Generation
```typescript
import { generateSlug } from '@/lib/blogUtils';

generateSlug("My Awesome Blog Post!") // "my-awesome-blog-post"
```

#### Blog Organization
```typescript
import { 
  groupPostsByCategory,
  sortPostsByDate,
  filterPostsByTag,
  getRelatedPosts
} from '@/lib/blogUtils';

// Group by category
const grouped = groupPostsByCategory(posts);

// Sort by date
const sorted = sortPostsByDate(posts, 'desc');

// Filter by tag
const filtered = filterPostsByTag(posts, 'AI');

// Get related posts
const related = getRelatedPosts(currentPost, allPosts, 3);
```

#### Structured Data
```typescript
import { generateBlogMetadata, generateStructuredData } from '@/lib/blogUtils';

const metadata = generateBlogMetadata(post, 'https://yourdomain.com');
const jsonLd = generateStructuredData(post, 'https://yourdomain.com');
```

## Database Schema

The blog posts are stored in Supabase with the following fields:

```sql
CREATE TABLE blog_post (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  coverImageUrl VARCHAR(500),
  author VARCHAR(100),
  tags TEXT[], -- JSON array of tags
  category VARCHAR(100),
  seoTitle VARCHAR(255),
  seoDescription VARCHAR(255),
  seoKeywords TEXT[], -- JSON array of keywords
  publishedat TIMESTAMP,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## Styling

All components use Tailwind CSS for styling:

- **Prose Plugin** - For rich text content formatting
- **Responsive Utilities** - Mobile-first design
- **Custom Styling** - Headings, links, code blocks
- **Dark Mode Support** - Built-in dark mode compatibility

## Best Practices

1. **SEO Optimization**
   - Use descriptive titles and excerpts
   - Include relevant tags and keywords
   - Add cover images for social sharing
   - Keep content well-structured

2. **Content Structure**
   - Use semantic HTML elements
   - Include heading hierarchy (h2, h3)
   - Break content into sections
   - Use code blocks for technical content

3. **Performance**
   - Optimize images for web
   - Use Next.js Image component
   - Server-side rendering for SEO
   - Lazy load related content

4. **Accessibility**
   - Use semantic HTML
   - Include alt text for images
   - Ensure color contrast
   - Provide text alternatives for visual content

## Customization

### Theme Colors

Edit the color classes in components to match your brand:
- Primary: `bg-blue-*` → Change to your brand color
- Secondary: `bg-slate-*` → Change to your accent color

### Typography

Modify Tailwind prose settings in `globals.css` or `tailwind.config.ts`:

```javascript
theme: {
  typography: (theme) => ({
    DEFAULT: {
      css: {
        // Custom typography settings
      }
    }
  })
}
```

### Newsletter Integration

Update the newsletter form in sidebar to integrate with your email service:

```typescript
// In BlogPostComponent.tsx
<form onSubmit={handleSubscribe}>
  <input type="email" placeholder="Your email" />
  <button type="submit">Subscribe</button>
</form>
```

### Comment System

Replace the comment placeholder with your preferred system:
- Disqus
- Commento
- Utterances
- Custom implementation

## Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_BLOG_API=https://api.yourdomain.com
```

## Migration Guide

If you're migrating from an old blog system:

1. Update database schema to match the new structure
2. Update blog post content to use new HTML structure
3. Add metadata fields (seoTitle, seoDescription, etc.)
4. Update image URLs to use Next.js Image component
5. Test blog pages for proper rendering

## Troubleshooting

### Images not displaying
- Check image URLs are accessible
- Verify Image component has correct dimensions
- Check Next.js Image optimization is working

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check prose plugin is installed
- Verify custom CSS is loaded

### SEO issues
- Check JSON-LD structured data in browser dev tools
- Verify Open Graph tags are in HTML head
- Test with SEO tools (Google Search Console, etc.)

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

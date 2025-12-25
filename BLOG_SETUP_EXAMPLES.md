# Blog Post Setup Examples

This document shows you how to set up and use the blog system with examples.

## Example 1: Creating a Blog Post in Supabase

### SQL Insert Statement

```sql
INSERT INTO blog_post (
  id,
  title,
  slug,
  excerpt,
  content_md,
  cover_image_url,
  seo_title,
  seo_description,
  seo_keywords,
  author,
  tags,
  category,
  published_at
) VALUES (
  1,
  'Introduction to React Hooks',
  'introduction-to-react-hooks',
  'Learn how to use React Hooks to manage state and side effects in your functional components.',
  '# Introduction to React Hooks

React Hooks revolutionized how we write React components. In this comprehensive guide, we''ll explore the most important hooks and how to use them effectively.

## What are Hooks?

Hooks are functions that let you "hook into" React features. They were introduced in React 16.8 and have become an essential part of modern React development.

> Hooks let you use state and other React features without writing a class.

### Why Use Hooks?

- **Simpler Code**: Write cleaner, more readable components
- **Code Reusability**: Share stateful logic between components
- **Better Testing**: Easier to test in isolation

## Common Hooks

### useState

The `useState` hook lets you add state to functional components.

\`\`\`javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

### useEffect

The `useEffect` hook lets you perform side effects in functional components.

\`\`\`javascript
import { useEffect, useState } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
\`\`\`

## Best Practices

1. **Only call hooks at the top level** - Don''t call hooks inside loops or conditions
2. **Use the ESLint plugin** - Install `eslint-plugin-react-hooks`
3. **Keep side effects organized** - Use multiple `useEffect` calls for different concerns
4. **Memoize expensive computations** - Use `useMemo` for heavy calculations

## Conclusion

React Hooks are a powerful way to write modern React applications. By mastering hooks, you''ll write cleaner, more maintainable code.

---

*Happy coding!*',
  'https://images.unsplash.com/photo-1633356713697-4f4db09c97f5?w=1200&h=630&fit=crop',
  'Master React Hooks in 2025 | Complete Guide',
  'Learn React Hooks with practical examples. Understand useState, useEffect, and custom hooks.',
  ARRAY['react', 'javascript', 'hooks', 'tutorial'],
  'Sarah Johnson',
  ARRAY['React', 'JavaScript', 'Web Development', 'Hooks'],
  'Technology',
  NOW() - INTERVAL '5 days'
);
```

## Example 2: Markdown Content Tips

### Proper Markdown Structure

```markdown
# Main Title (H1)

Use H1 for the main title of your post. You typically only have one H1.

## Section Title (H2)

Use H2 for major sections. These will appear in a table of contents (if implemented).

### Subsection Title (H3)

Use H3 for subsections within major sections.

### Code Examples

Always include a language identifier:

\`\`\`javascript
// Good - has language identifier
const name = "John";
\`\`\`

\`\`\`
// Poor - no language identifier
const name = "John";
\`\`\`

### Lists

Unordered lists:
- Item 1
- Item 2
- Item 3

Ordered lists:
1. First step
2. Second step
3. Third step

### Blockquotes

Use blockquotes for important notes or quotes:

> This is an important message that readers should pay attention to.

### Links

[Link text](https://example.com)
[Internal link](/about)

### Images

![Alt text that describes the image](https://images.unsplash.com/photo-example.jpg)

Use descriptive alt text for accessibility.

### Tables

| Feature | Description | Example |
|---------|-------------|---------|
| Hooks | State management | useState, useEffect |
| Components | UI building blocks | Button, Card |
| Props | Component inputs | className, onClick |

```

## Example 3: Using the Blog Utilities

```typescript
import { 
  calculateReadingTime,
  generateSocialShareUrls,
  formatDate,
  generateStructuredData 
} from '@/lib/blogUtils';

// In your blog post page component
const post = {
  id: 1,
  title: 'Introduction to React Hooks',
  slug: 'introduction-to-react-hooks',
  excerpt: 'Learn React Hooks...',
  content: '# Introduction...',
  author: 'Sarah Johnson',
  publishedAt: new Date('2025-01-10'),
  updatedAt: new Date('2025-01-20'),
  coverImageUrl: 'https://...',
  tags: ['React', 'JavaScript'],
  seoTitle: 'Master React Hooks in 2025',
  seoDescription: 'Learn React Hooks with practical examples',
};

// Get reading time
const readingTime = calculateReadingTime(post.content);
console.log(`Reading time: ${readingTime} minutes`);

// Get social share URLs
const shareUrls = generateSocialShareUrls(post, 'https://yourdomain.com');
console.log(shareUrls.twitter); // https://twitter.com/intent/tweet?...

// Format date
const dateString = formatDate(post.publishedAt);
console.log(dateString); // Jan 10, 2025

// Generate structured data for JSON-LD
const structuredData = generateStructuredData(post, 'https://yourdomain.com');
// Use in: <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
```

## Example 4: Complete Blog Post Page Component

The blog post page is already implemented in `src/app/blog/[slug]/page.tsx`.

Key features:

```tsx
// 1. Dynamic route parameter
const { slug } = await params;

// 2. Server-side data fetching
const { data, error } = await supabase
  .from('blog_post')
  .select('*')
  .eq('slug', slug)
  .limit(1);

// 3. SEO metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Returns title, description, OpenGraph tags, etc.
}

// 4. Markdown rendering
<MarkdownRenderer content={post.content} />

// 5. Social sharing
<a href={twitterShareUrl}>Share on Twitter</a>

// 6. Structured data (JSON-LD)
<Script
  id="blog-structured-data"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

## Example 5: Blog Post Database Query

```typescript
// Get a single blog post by slug
const fetchBlogPost = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_post')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
};

// Get all blog posts (with pagination)
const fetchAllBlogPosts = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('blog_post')
    .select('*')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
};

// Get blog posts by tag
const fetchPostsByTag = async (tag: string) => {
  const { data, error } = await supabase
    .from('blog_post')
    .select('*')
    .contains('tags', [tag])
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Get blog posts by category
const fetchPostsByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('blog_post')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
};
```

## Example 6: Markdown Features

The blog supports all these markdown features:

### Syntax Highlighting

\`\`\`python
def hello_world():
    print("Hello, World!")

hello_world()
\`\`\`

### Lists with Nesting

- React
  - Hooks
  - Components
  - Props
- Vue
  - Composition API
  - Templates

### Emphasis

- **Bold text**
- *Italic text*
- ***Bold and italic***
- ~~Strikethrough~~ (if supported)

### Horizontal Rule

---

### Footnotes and Citations

Some text[^1]

[^1]: This is a footnote

### Escaping

You can escape special characters with backslash:

\# This is not a heading
\* This is not emphasis

## Tips for Content Writers

1. **Use clear headings** - Help readers scan the content
2. **Break up text** - Use short paragraphs and lists
3. **Include code examples** - Show practical usage
4. **Use blockquotes wisely** - For important notes
5. **Optimize images** - Compress before uploading
6. **Write descriptive alt text** - For accessibility
7. **Test your markdown** - Preview before publishing
8. **Link appropriately** - Internal and external links

## Publishing Checklist

- [ ] Title is clear and descriptive
- [ ] Slug is URL-friendly (lowercase, hyphens, no spaces)
- [ ] Excerpt summarizes the post (150-160 characters)
- [ ] SEO title and description are set
- [ ] Keywords are relevant and separated by commas
- [ ] Author information is correct
- [ ] Tags are relevant (3-5 tags)
- [ ] Category is appropriate
- [ ] Cover image is optimized and accessible via URL
- [ ] Markdown content is properly formatted
- [ ] All code examples are tested
- [ ] Links work (internal and external)
- [ ] Published date is set
- [ ] Preview looks good on mobile and desktop

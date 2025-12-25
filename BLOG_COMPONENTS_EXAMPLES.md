/**
 * Blog Components Usage Examples
 * This file demonstrates how to use all the blog components and utilities
 */

// ============================================
// 1. USING THE BLOG POST PAGE (Server Component)
// ============================================

// File: src/app/blog/[slug]/page.tsx
// The blog post page automatically:
// - Fetches post data from Supabase
// - Generates SEO metadata
// - Renders structured data (JSON-LD)
// - Displays social sharing buttons
// - Shows author info and comments section

// No additional setup needed - it works out of the box!

// ============================================
// 2. USING CONTENT BUILDER COMPONENTS
// ============================================

import {
  Paragraph,
  Heading2,
  Heading3,
  CodeBlock,
  ImageWithCaption,
  UnorderedList,
  OrderedList,
  AlertBlock,
  HighlightText,
  Divider,
  ContentSection,
} from '@/components/ContentBuilder';

// Example: Building a blog post with rich content
export function BlogPostWithRichContent() {
  return (
    <article>
      <Heading2>Getting Started with AI Tools</Heading2>

      <Paragraph>
        Artificial Intelligence has revolutionized the way we work and create. Let's explore the best AI tools available today.
      </Paragraph>

      <AlertBlock
        type="info"
        title="Important Note"
        message="Always use AI tools responsibly and ethically in your projects."
      />

      <Heading3>Installation Steps</Heading3>

      <OrderedList
        items={[
          'Download the tool from the official website',
          'Install dependencies using npm',
          'Configure your API keys',
          'Start using the tool in your project',
        ]}
      />

      <CodeBlock
        code={`npm install ai-tool
const tool = require('ai-tool');
tool.initialize({ apiKey: 'YOUR_KEY' });`}
        language="javascript"
        showLineNumbers={true}
      />

      <Heading3>Best Practices</Heading3>

      <UnorderedList
        items={[
          'Always validate user input',
          'Implement error handling',
          'Cache results when possible',
          'Monitor API usage and costs',
        ]}
      />

      <ImageWithCaption
        src="/blog/ai-workflow.jpg"
        alt="AI Workflow Diagram"
        caption="Typical AI tool workflow in production"
        width={800}
        height={400}
      />

      <AlertBlock
        type="success"
        title="Success!"
        message="You're now ready to integrate AI tools into your application."
      />

      <Paragraph>
        Remember to <HighlightText color="yellow">always test thoroughly</HighlightText> before deploying to production.
      </Paragraph>

      <Divider />

      <Paragraph>
        For more information, visit the official documentation or join our community forum.
      </Paragraph>
    </article>
  );
}

// ============================================
// 3. USING BLOG POST CARD
// ============================================

import BlogPostCard from '@/components/BlogPostCard';

export function BlogPostList() {
  const posts = [
    {
      title: 'Introduction to ChatGPT',
      excerpt: 'Learn how to effectively use ChatGPT in your daily workflow.',
      slug: 'intro-to-chatgpt',
      author: 'John Doe',
      publishedAt: new Date('2025-12-15'),
      coverImage: '/blog/chatgpt.jpg',
      tags: ['AI', 'ChatGPT', 'Tutorial'],
      readingTime: 5,
    },
    {
      title: 'Advanced Prompt Engineering',
      excerpt: 'Master the art of writing effective prompts for AI models.',
      slug: 'advanced-prompt-engineering',
      author: 'Jane Smith',
      publishedAt: new Date('2025-12-10'),
      coverImage: '/blog/prompts.jpg',
      tags: ['AI', 'Prompts', 'Advanced'],
      readingTime: 8,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} {...post} />
      ))}
    </div>
  );
}

// ============================================
// 4. USING REUSABLE BLOG POST COMPONENT
// ============================================

import BlogPostComponent from '@/components/BlogPostComponent';

export function BlogPostDisplay() {
  const post = {
    title: 'The Future of AI',
    author: 'Sarah Johnson',
    publishedAt: new Date('2025-12-20'),
    updatedAt: new Date('2025-12-21'),
    excerpt: 'Exploring the future trends and possibilities of artificial intelligence.',
    content: '<h2>Introduction</h2><p>AI is rapidly evolving...</p>',
    coverImage: '/blog/ai-future.jpg',
    slug: 'future-of-ai',
    tags: ['AI', 'Future', 'Technology', 'Trends'],
    relatedPosts: [
      {
        title: 'Current AI Landscape',
        slug: 'current-ai-landscape',
        excerpt: 'An overview of the current state of AI.',
      },
      {
        title: 'AI Ethics and Responsibility',
        slug: 'ai-ethics',
        excerpt: 'Important considerations for ethical AI development.',
      },
    ],
  };

  return <BlogPostComponent {...post} />;
}

// ============================================
// 5. USING QUOTE BLOCKS
// ============================================

import QuoteBlock from '@/components/QuoteBlock';

export function BlogWithQuotes() {
  return (
    <article>
      <h1>Inspirational Moments in Tech</h1>

      <QuoteBlock
        text="The only way to do great work is to love what you do."
        author="Steve Jobs"
      />

      <p>This quote perfectly captures the essence of being a developer...</p>

      <QuoteBlock
        text="Technology is best when it brings people together."
        author="Matt Mullenweg"
      />
    </article>
  );
}

// ============================================
// 6. USING BLOG UTILITIES
// ============================================

import {
  formatDate,
  calculateReadingTime,
  generateSocialShareUrls,
  generateSlug,
  generateBlogMetadata,
  generateStructuredData,
  sortPostsByDate,
  filterPostsByTag,
  getRelatedPosts,
} from '@/lib/blogUtils';

export function UtilitiesExample() {
  // Format a date
  const formatted = formatDate(new Date());
  console.log(formatted); // "December 25, 2025"

  // Calculate reading time
  const content = 'Lorem ipsum dolor sit amet...'; // long content
  const readTime = calculateReadingTime(content);
  console.log(`${readTime} min read`);

  // Generate social share URLs
  const post = {
    title: 'My Blog Post',
    slug: 'my-blog-post',
    excerpt: 'This is about...',
  };
  const shareUrls = generateSocialShareUrls(post as any, 'https://myblog.com');
  console.log(shareUrls);
  // { twitter: '...', linkedin: '...', whatsapp: '...', email: '...', facebook: '...', reddit: '...' }

  // Generate slug
  const slug = generateSlug('My Awesome Blog Post!');
  console.log(slug); // "my-awesome-blog-post"

  // Generate SEO metadata
  const metadata = generateBlogMetadata(post as any, 'https://myblog.com');
  console.log(metadata);
  // { title, description, keywords, author, publishedDate, ... }

  // Generate structured data
  const structuredData = generateStructuredData(post as any, 'https://myblog.com');
  console.log(JSON.stringify(structuredData, null, 2));

  // Sort posts
  const posts = []; // array of BlogPost
  const sorted = sortPostsByDate(posts, 'desc');

  // Filter by tag
  const aiPosts = filterPostsByTag(posts, 'AI');

  // Get related posts
  const currentPost = posts[0];
  const related = getRelatedPosts(currentPost, posts, 3);

  return <div>Check console for utility examples</div>;
}

// ============================================
// 7. BUILDING A COMPLETE BLOG PAGE
// ============================================

import { supabase } from '@/lib/supabaseClient';
import { BlogPost } from '@/lib/types';

export async function CompleteBlogPage() {
  // Fetch all posts
  const { data: postsData } = await supabase
    .from('blog_post')
    .select('*')
    .order('publishedat', { ascending: false });

  const posts: BlogPost[] = (postsData || []).map((row: any) => ({
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    coverImageUrl: row.coverImageUrl,
    slug: row.slug,
    publishedAt: new Date(row.publishedat),
    author: row.author,
    content: row.content,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  }));

  return (
    <div>
      <h1>Latest Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt || ''}
            slug={post.slug}
            author={post.author || undefined}
            publishedAt={post.publishedAt}
            coverImage={post.coverImageUrl || undefined}
            readingTime={calculateReadingTime(post.content)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// 8. CREATING STRUCTURED DATA SCRIPT
// ============================================

export function StructuredDataExample() {
  const post = {
    id: 1,
    title: 'How to Learn AI',
    slug: 'how-to-learn-ai',
    excerpt: 'A comprehensive guide to learning AI in 2025',
    content: '...',
    coverImageUrl: '/blog/ai-learning.jpg',
    publishedAt: new Date(),
    updatedAt: new Date(),
    author: 'Alex Chen',
  };

  const structuredData = generateStructuredData(post as any);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// ============================================
// 9. RESPONSIVE BLOG GRID LAYOUT
// ============================================

export function ResponsiveBlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Blog cards automatically stack on mobile */}
      {/* 1 column on mobile (xs) */}
      {/* 2 columns on tablet (md) */}
      {/* 3 columns on desktop (lg) */}
    </div>
  );
}

// ============================================
// 10. CUSTOM CONTENT SECTION
// ============================================

import { ContentSection } from '@/components/ContentBuilder';

export function CustomSection() {
  return (
    <ContentSection className="bg-blue-50 rounded-lg p-6">
      <h2>Featured Content</h2>
      <p>This section has custom styling applied.</p>
    </ContentSection>
  );
}

export default {
  BlogPostWithRichContent,
  BlogPostList,
  BlogPostDisplay,
  BlogWithQuotes,
  UtilitiesExample,
  CompleteBlogPage,
  StructuredDataExample,
  ResponsiveBlogGrid,
  CustomSection,
};

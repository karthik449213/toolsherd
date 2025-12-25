/**
 * Blog Post Utilities
 * Helpful functions for blog post operations
 */

import { BlogPost, BlogMetadata } from './types';

/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format a date to ISO string (YYYY-MM-DD)
 */
export const formatDateISO = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Calculate reading time based on content
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Generate blog metadata for SEO
 */
export const generateBlogMetadata = (post: BlogPost, baseUrl: string = 'https://example.com'): BlogMetadata => {
  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords: post.seoKeywords || [],
    author: post.author || 'AI Tools Team',
    publishedDate: formatDateISO(post.publishedAt),
    modifiedDate: formatDateISO(post.updatedAt),
    imageUrl: post.coverImageUrl || '/og-image.png',
    url: `${baseUrl}/blog/${post.slug}`,
    articleSection: post.category || 'Technology',
  };
};

/**
 * Generate structured data (JSON-LD) for a blog post
 */
export const generateStructuredData = (
  post: BlogPost,
  baseUrl: string = 'https://example.com'
): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.coverImageUrl || '/og-image.png',
    datePublished: formatDateISO(post.publishedAt),
    dateModified: formatDateISO(post.updatedAt),
    author: {
      '@type': 'Person',
      name: post.author || 'AI Tools Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Tools',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    url: `${baseUrl}/blog/${post.slug}`,
    articleSection: post.category || 'Technology',
    keywords: post.seoKeywords?.join(', ') || 'technology, ai, tools',
  };
};

/**
 * Generate social sharing URLs
 */
export const generateSocialShareUrls = (
  post: BlogPost,
  baseUrl: string = 'https://example.com'
): Record<string, string> => {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const encodedExcerpt = encodeURIComponent(post.excerpt || post.title);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };
};

/**
 * Extract plain text from HTML
 */
export const stripHtmlTags = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate a slug from a title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Group blog posts by category
 */
export const groupPostsByCategory = (posts: BlogPost[]): Record<string, BlogPost[]> => {
  return posts.reduce(
    (groups, post) => {
      const category = post.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(post);
      return groups;
    },
    {} as Record<string, BlogPost[]>
  );
};

/**
 * Sort blog posts by date
 */
export const sortPostsByDate = (posts: BlogPost[], order: 'asc' | 'desc' = 'desc'): BlogPost[] => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

/**
 * Filter blog posts by tag
 */
export const filterPostsByTag = (posts: BlogPost[], tag: string): BlogPost[] => {
  return posts.filter((post) => post.tags?.includes(tag));
};

/**
 * Get related posts based on tags
 */
export const getRelatedPosts = (post: BlogPost, allPosts: BlogPost[], limit: number = 3): BlogPost[] => {
  if (!post.tags || post.tags.length === 0) {
    return allPosts.filter((p) => p.id !== post.id).slice(0, limit);
  }

  const scoredPosts = allPosts
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      post: p,
      score: p.tags?.filter((tag) => post.tags?.includes(tag)).length || 0,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map((item) => item.post);
};

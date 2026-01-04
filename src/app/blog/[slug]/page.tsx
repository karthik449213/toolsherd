import { Metadata } from 'next';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Tag,
} from 'lucide-react';

import { BlogPost, RawBlogPost } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
}

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const formatDateISO = (d: Date) => d.toISOString().split('T')[0];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const fetchPost = async (table: string): Promise<RawBlogPost[]> => {
    const { data, error } = await supabase.from(table).select('*').eq('slug', slug).limit(1);
    if (error) throw error;
    return (data ?? []) as RawBlogPost[];
  };

  const postData = await fetchPost('blog_post');
  
  // Filter only published posts
  const publishedPosts = postData.filter(post => post.is_published !== false);

  if (!postData || postData.length === 0) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const row = postData[0];
  const title = row.seo_title || row.title || 'Untitled';
  const description = row.seo_description || row.excerpt || 'Read this insightful blog post.';
  const image = row.cover_image_url || '/og-image.png';
  const keywords = row.seo_keywords || ['blog', 'article', 'technology', row.title || 'article'];

  return {
    title,
    description,
    keywords,
    authors: row.author ? [{ name: row.author }] : [],
    openGraph: {
      title,
      description,
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: row.published_at || new Date().toISOString(),
      authors: row.author ? [row.author] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: row.author ? `@${row.author.replace(/\s+/g, '')}` : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const fetchPost = async (table: string): Promise<RawBlogPost[]> => {
    const { data, error } = await supabase.from(table).select('*').eq('slug', slug).limit(1);
    if (error) throw error;
    return (data ?? []) as RawBlogPost[];
  };

  let postData: RawBlogPost[] = [];

  postData = await fetchPost('blog_post');

  if (!postData || postData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog Post Not Found</h1>
          <p className="text-slate-600 mb-8">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const row = postData[0];
  const post: BlogPost = {
    id: row.id ?? 0,
    title: row.title ?? 'Untitled',
    excerpt: row.excerpt ?? null,
    coverImageUrl: row.cover_image_url ?? null,
    slug: row.slug ?? '',
    publishedAt: row.published_at ? new Date(row.published_at) : new Date(),
    author: row.author ?? null,
    content: row.content_md ?? '',
    createdAt: row.created_at ? new Date(row.created_at) : new Date(),
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
    tags: row.tags ?? [],
  };

  // Fetch related posts based on tags
  let relatedPosts: BlogPost[] = [];
  if (post.tags && post.tags.length > 0) {
    try {
      const { data: allPostsData, error: allPostsError } = await supabase
        .from('blog_post')
        .select('*')
        .eq('is_published', true)
        .neq('slug', post.slug)
        .order('published_at', { ascending: false })
        .limit(20);
      
      if (!allPostsError && allPostsData) {
        // First, get posts with matching tags
        const tagMatchedPosts = allPostsData
          .filter((p: any) => {
            const postTags = p.tags || [];
            return post.tags!.some((tag: string) => postTags.includes(tag));
          })
          .map((p: any) => ({
            id: p.id ?? 0,
            title: p.title ?? 'Untitled',
            excerpt: p.excerpt ?? null,
            coverImageUrl: p.cover_image_url ?? null,
            slug: p.slug ?? '',
            publishedAt: p.published_at ? new Date(p.published_at) : new Date(),
            author: p.author ?? null,
            content: p.content_md ?? '',
            createdAt: p.created_at ? new Date(p.created_at) : new Date(),
            updatedAt: p.updated_at ? new Date(p.updated_at) : new Date(),
            tags: p.tags ?? [],
          }));

        // If we don't have enough tag-matched posts, add recent posts
        let finalRelatedPosts = tagMatchedPosts;
        if (finalRelatedPosts.length < 3) {
          const recentPosts = allPostsData
            .filter((p: any) => !tagMatchedPosts.some(tp => tp.slug === p.slug))
            .map((p: any) => ({
              id: p.id ?? 0,
              title: p.title ?? 'Untitled',
              excerpt: p.excerpt ?? null,
              coverImageUrl: p.cover_image_url ?? null,
              slug: p.slug ?? '',
              publishedAt: p.published_at ? new Date(p.published_at) : new Date(),
              author: p.author ?? null,
              content: p.content_md ?? '',
              createdAt: p.created_at ? new Date(p.created_at) : new Date(),
              updatedAt: p.updated_at ? new Date(p.updated_at) : new Date(),
              tags: p.tags ?? [],
            }));
          
          finalRelatedPosts = [
            ...tagMatchedPosts,
            ...recentPosts
          ].slice(0, 3);
        } else {
          finalRelatedPosts = tagMatchedPosts.slice(0, 3);
        }

        relatedPosts = finalRelatedPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  } else {
    // If post has no tags, just fetch recent posts
    try {
      const { data: recentPostsData, error: recentError } = await supabase
        .from('blog_post')
        .select('*')
        .eq('is_published', true)
        .neq('slug', post.slug)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (!recentError && recentPostsData) {
        relatedPosts = recentPostsData.map((p: any) => ({
          id: p.id ?? 0,
          title: p.title ?? 'Untitled',
          excerpt: p.excerpt ?? null,
          coverImageUrl: p.cover_image_url ?? null,
          slug: p.slug ?? '',
          publishedAt: p.published_at ? new Date(p.published_at) : new Date(),
          author: p.author ?? null,
          content: p.content_md ?? '',
          createdAt: p.created_at ? new Date(p.created_at) : new Date(),
          updatedAt: p.updated_at ? new Date(p.updated_at) : new Date(),
          tags: p.tags ?? [],
        }));
      }
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  }

  // Structured data (JSON-LD) for SEO
  const structuredData = {
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
        url: '/logo.png',
      },
    },
  };

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blog/${post.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt || post.title + ' ' + shareUrl)}`;

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Blog Post Header */}
        <header className="relative bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/blog" className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {/* Post Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={formatDateISO(post.publishedAt)}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="text-sm text-slate-500">
                {post.content ? `${Math.ceil(post.content.split(/\s+/).length / 200)} min read` : ''}
              </div>
            </div>

            {/* Post Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Post Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-slate-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.coverImageUrl && (
          <div className="w-full h-96 relative overflow-hidden bg-slate-200">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        )}

        {/* Main Content */}
        <main className="py-16 bg-gradient-to-br from-slate-700 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-3 bg-white rounded-lg shadow-md p-8">
                {post.content && (
                  <div className="prose-content">
                    <MarkdownRenderer content={post.content} />
                  </div>
                )}

                {/* Author Bio Section */}
                {post.author && (
                  <section className="mt-12 pt-8 border-t-2 border-slate-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">About the Author</h3>
                        <p className="text-slate-700 mb-4">
                          {post.author} is a tech enthusiast and writer passionate about exploring AI and innovative tools.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Social Sharing Section */}
                <section className="mt-12 pt-8 border-t-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share This Article
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                    <a
                      href={linkedInShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href={emailShareUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      aria-label="Share via Email"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  </div>
                </section>

                {/* Comment Section Placeholder */}
                <section className="mt-12 pt-8 border-t-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Comments</h3>
                  <div className="bg-slate-100 rounded-lg p-8 text-center">
                    <p className="text-slate-600">Comments section coming soon. Join our community to share your thoughts!</p>
                  </div>
                </section>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                        <div className="group p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatDate(relatedPost.publishedAt)}
                          </p>
                          {relatedPost.tags && relatedPost.tags.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {relatedPost.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-slate-600 text-sm">No related articles found. Check back soon!</p>
                  )}
                </div>
              </div>

                {/* Tags Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Technology
                        </span>
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          AI
                        </span>
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Tutorial
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* Footer */}
       
      </div>
    </>
  );
}
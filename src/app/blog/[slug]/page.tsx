import { Metadata } from 'next';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-300 mb-4 font-mono">Blog Post Not Found</h1>
          <p className="text-slate-400 mb-8">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
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
      <div className="min-h-screen bg-slate-900">
        {/* Blog Post Header */}
        <header className="relative bg-slate-900/50 border-b border-cyan-500/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {/* Post Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <time dateTime={formatDateISO(post.publishedAt)}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-cyan-400" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="text-sm text-slate-500">
                {post.content ? `${Math.ceil(post.content.split(/\s+/).length / 200)} min read` : ''}
              </div>
            </div>

            {/* Post Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-4 leading-tight font-mono">
              {post.title}
            </h1>

            {/* Post Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-slate-300 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.coverImageUrl && (
          <div className="w-full bg-slate-800/50 border-b border-cyan-500/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="relative w-full overflow-hidden rounded-lg shadow-glow-medium border border-cyan-500/20">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-contain"
                  priority
                  quality={85}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="py-16 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-3 bg-slate-800/40 border border-cyan-500/20 rounded-lg shadow-glow-medium p-8">
                {post.content && (
                  <div className="prose-content text-slate-300 mb-8 space-y-6">
                    {(() => {
                      try {
                        const contentData = JSON.parse(post.content);
                        return (
                          <div className="space-y-6">
                            {Array.isArray(contentData) ? (
                              contentData.map((block: any, idx: number) => {
                                if (block.type === 'heading') {
                                  const headingClass = `font-bold text-cyan-300 font-mono mt-8 mb-4 scroll-mt-20 ${
                                    block.level === 1 ? 'text-4xl leading-tight' :
                                    block.level === 2 ? 'text-3xl border-b-2 border-cyan-400/40 pb-3' :
                                    block.level === 3 ? 'text-2xl text-cyan-200' :
                                    block.level === 4 ? 'text-xl text-cyan-200' :
                                    block.level === 5 ? 'text-lg text-cyan-100' :
                                    'text-base text-cyan-100'
                                  }`;
                                  
                                  return block.level === 1 ? (
                                    <h1 key={idx} className={headingClass}>{block.content}</h1>
                                  ) : block.level === 2 ? (
                                    <h2 key={idx} className={headingClass}>{block.content}</h2>
                                  ) : block.level === 3 ? (
                                    <h3 key={idx} className={headingClass}>{block.content}</h3>
                                  ) : block.level === 4 ? (
                                    <h4 key={idx} className={headingClass}>{block.content}</h4>
                                  ) : block.level === 5 ? (
                                    <h5 key={idx} className={headingClass}>{block.content}</h5>
                                  ) : (
                                    <h6 key={idx} className={headingClass}>{block.content}</h6>
                                  );
                                } else if (block.type === 'paragraph') {
                                  return (
                                    <p key={idx} className="text-slate-300 leading-relaxed font-mono text-base lg:text-lg hyphens-auto break-words">
                                      {block.content}
                                    </p>
                                  );
                                } else if (block.type === 'list') {
                                  const ListTag = block.ordered ? 'ol' : 'ul';
                                  return (
                                    <ListTag key={idx} className={`my-4 pl-6 space-y-2 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
                                      {Array.isArray(block.items) && block.items.map((item: string, itemIdx: number) => (
                                        <li key={itemIdx} className="text-slate-300 leading-relaxed font-mono">{item}</li>
                                      ))}
                                    </ListTag>
                                  );
                                } else if (block.type === 'code') {
                                  return (
                                    <div key={idx} className="my-6">
                                      <pre className="bg-slate-900/80 border border-cyan-400/30 rounded-lg p-4 overflow-x-auto shadow-lg">
                                        <code className="text-cyan-300 text-sm font-mono leading-relaxed">{block.content}</code>
                                      </pre>
                                    </div>
                                  );
                                } else if (block.type === 'quote') {
                                  return (
                                    <blockquote key={idx} className="border-l-4 border-cyan-400 pl-6 py-2 italic text-slate-300 bg-cyan-400/5 pr-4 rounded-r-lg my-6 font-mono">
                                      {block.content}
                                    </blockquote>
                                  );
                                } else if (block.type === 'image') {
                                  return (
                                    <figure key={idx} className="my-8 bg-slate-900/40 border border-cyan-500/20 rounded-lg overflow-hidden shadow-glow-medium">
                                      <Image 
                                        src={block.url} 
                                        alt={block.alt || 'Content image'} 
                                        width={700}
                                        height={400}
                                        className="w-full h-auto object-contain"
                                        quality={85}
                                      />
                                      {block.alt && <figcaption className="text-sm text-slate-400 text-center mt-4 px-4 py-2 font-mono italic">{block.alt}</figcaption>}
                                    </figure>
                                  );
                                }
                                return null;
                              })
                            ) : (
                              <p className="text-slate-400 font-mono">{JSON.stringify(contentData)}</p>
                            )}
                          </div>
                        );
                      } catch (e) {
                        // Fallback: display as plain text
                        return <p className="text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">{post.content}</p>;
                      }
                    })()}
                  </div>
                )}

                {/* Author Bio Section */}
                {post.author && (
                  <section className="mt-12 pt-8 border-t-2 border-cyan-500/10">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-cyan-300 mb-2">About the Author</h3>
                        <p className="text-slate-400 mb-4">
                          {post.author} is a tech enthusiast and writer passionate about exploring AI and innovative tools.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Social Sharing Section */}
                <section className="mt-12 pt-8 border-t-2 border-cyan-500/10">
                  <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share This Article
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                    <a
                      href={linkedInShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href={emailShareUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                      aria-label="Share via Email"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  </div>
                </section>

                {/* Comment Section Placeholder */}
                <section className="mt-12 pt-8 border-t-2 border-cyan-500/10">
                  <h3 className="text-lg font-bold text-cyan-300 mb-4">Comments</h3>
                  <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-8 text-center">
                    <p className="text-slate-400">Comments section coming soon. Join our community to share your thoughts!</p>
                  </div>
                </section>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
              {/* Related Posts */}
              <div className="bg-slate-800/40 border border-cyan-500/20 rounded-lg shadow-glow-medium p-6 mb-6">
                <h3 className="text-lg font-bold text-cyan-300 mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                        <div className="group p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-cyan-500/30">
                          <h4 className="font-semibold text-cyan-200 group-hover:text-cyan-100 transition-colors line-clamp-2 text-sm">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatDate(relatedPost.publishedAt)}
                          </p>
                          {relatedPost.tags && relatedPost.tags.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {relatedPost.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No related articles found. Check back soon!</p>
                  )}
                </div>
              </div>

                {/* Tags Section */}
                <div className="bg-slate-800/40 border border-cyan-500/20 rounded-lg shadow-glow-medium p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2 font-mono">
                    <Tag className="h-5 w-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-block bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="inline-block bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                          Technology
                        </span>
                        <span className="inline-block bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                          AI
                        </span>
                        <span className="inline-block bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
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
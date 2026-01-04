'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Share2,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Calendar,
  User,
} from 'lucide-react';

export interface BlogPostComponentProps {
  title: string;
  author?: string;
  publishedAt: Date;
  updatedAt?: Date;
  excerpt?: string;
  content: string;
  coverImage?: string;
  slug: string;
  tags?: string[];
  relatedPosts?: Array<{
    title: string;
    slug: string;
    excerpt?: string;
  }>;
}

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const formatDateISO = (d: Date) => d.toISOString().split('T')[0];

export const BlogPostComponent: React.FC<BlogPostComponentProps> = ({
  title,
  author,
  publishedAt,
  updatedAt,
  excerpt,
  content,
  coverImage,
  slug,
  tags = ['Technology', 'AI', 'Tutorial'],
  relatedPosts = [],
}) => {
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://example.com'}/blog/${slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(excerpt || title + ' ' + shareUrl)}`;

  const readingTime = Math.ceil(content.split(/\s+/).length / 200);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Featured Image */}
      {coverImage && (
        <div className="w-full h-96 relative overflow-hidden bg-slate-200">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}

      {/* Main Content */}
      <main className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <article className="lg:col-span-3 bg-white rounded-lg shadow-md p-8" suppressHydrationWarning>
              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-black mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={formatDateISO(publishedAt)}>
                    {formatDate(publishedAt)}
                  </time>
                </div>
                {author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{author}</span>
                  </div>
                )}
                <div className="text-sm text-black">
                  {readingTime} min read
                </div>
              </div>

              {/* Post Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4 leading-tight">
                {title}
              </h1>

              {/* Excerpt */}
              {excerpt && (
                <p className="text-xl text-black leading-relaxed mb-8">
                  {excerpt}
                </p>
              )}

              {/* Content */}
              {content && (
                <div
                  className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-black prose-a:text-blue-600 prose-strong:text-slate-900 prose-code:text-red-600 prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}

              {/* Author Bio Section */}
              {author && (
                <section className="mt-12 pt-8 border-t-2 border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">About the Author</h3>
                      <p className="text-black mb-4">
                        {author} is a passionate tech enthusiast and writer dedicated to exploring artificial intelligence,
                        innovative tools, and cutting-edge technologies that shape our digital future.
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                  <a
                    href={linkedInShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href={emailShareUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
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
                  <p className="text-black mb-4">
                    Comments section coming soon. Join our community to share your thoughts!
                  </p>
                  <p className="text-sm text-black">
                    We're working on integrating a powerful comment system to enhance reader engagement.
                  </p>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Related Posts</h3>
                  <div className="space-y-3">
                    {relatedPosts.map((post) => (
                      <div key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          {post.title}
                        </Link>
                        {post.excerpt && (
                          <p className="text-sm text-black mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags Section */}
              {tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mt-6 border border-blue-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Stay Updated</h3>
                <p className="text-sm text-black mb-4">
                  Get the latest AI tools and tech articles delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-3">About AI Tools</h4>
              <p className="text-black text-sm">
                Exploring the latest in artificial intelligence and innovative tools to enhance productivity and creativity.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-blue-600 hover:text-blue-800 transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3">Contact</h4>
              <p className="text-black text-sm">
                Have a question or suggestion?{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Get in touch
                </Link>
              </p>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-black text-sm">
            <p>&copy; 2025 AI Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostComponent;

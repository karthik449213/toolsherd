import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

import {
  Calendar,
  User,
  ArrowLeft,
} from 'lucide-react';

import { BlogPost, RawBlogPost } from '@/lib/types';

interface Props {
  params: { slug: string };
}

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;

  const fetchPost = async (table: string): Promise<RawBlogPost[]> => {
    const { data, error } = await supabase.from(table).select('*').eq('slug', slug).limit(1);
    if (error) throw error;
    return (data ?? []) as RawBlogPost[];
  };

  let postData: RawBlogPost[] = [];
  
    postData = await fetchPost('blog_posts');
  

  if (!postData || postData.length === 0) {
    return <div>Blog post not found.</div>;
  }

  const row = postData[0];
  const post: BlogPost = {
    id: row.id ?? 0,
    title: row.title ?? 'Untitled',
    excerpt: row.excerpt ?? null,
    coverImageUrl: row.coverImageUrl ?? null,
    slug: row.slug ?? '',
    publishedAt: row.publishedat ? new Date(row.publishedat) : new Date(),
    author: row.author ?? null,
    content: row.content ?? '',
    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
    updatedAt: row.updatedAt ? new Date(row.updatedAt) : new Date(),
  };

  return (
    <div className="min-h-screen bg-slate-50">


      {/* Blog Post Content */}
      <main className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-slate-600 hover:text-emerald-600 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {post.coverImageUrl && (
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-8">
              <div className="flex items-center text-sm text-slate-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishedAt)}
                {post.author && (
                  <>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </>
                )}
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-6">{post.title}</h1>
              {post.excerpt && (
                <p className="text-xl text-slate-600 mb-8">{post.excerpt}</p>
              )}
              {post.content && (
                <div className="prose prose-lg max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      
    </div>
  );
}

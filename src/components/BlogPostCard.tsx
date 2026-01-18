'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  author?: string;
  publishedAt: Date;
  coverImage?: string;
  tags?: string[];
  readingTime?: number;
}

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  excerpt,
  slug,
  author,
  publishedAt,
  coverImage,
  tags = [],
  readingTime,
}) => {
  return (
    <article className="bg-slate-800/40 border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/50 hover:shadow-glow-medium transition-all duration-300 flex flex-col h-full">
      {/* Cover Image */}
      {coverImage && (
        <div className="relative h-48 overflow-hidden bg-slate-700/50">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-cyan-400" />
            <time dateTime={publishedAt.toISOString()}>{formatDate(publishedAt)}</time>
          </div>
          {author && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-cyan-400" />
              <span>{author}</span>
            </div>
          )}
          {readingTime && <span className="text-slate-500">{readingTime} min read</span>}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2 hover:text-cyan-300 transition-colors duration-200">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">{excerpt}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded text-xs font-medium border border-cyan-500/20"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-block text-slate-500 text-xs">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200"
        >
          Read Article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard;

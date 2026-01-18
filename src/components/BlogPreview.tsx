'use client';

import React from 'react';
import { BlogFormData } from '@/lib/types';

interface BlogPreviewProps {
  data: BlogFormData;
  imageUrl?: string;
  bodyImages?: string[];
}

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'quote' | 'image';
  level?: number;
  content?: string;
  items?: string[];
  ordered?: boolean;
}

export default function BlogPreview({ data, imageUrl, bodyImages }: BlogPreviewProps) {
  // Safety check - ensure data exists and has required fields
  if (!data) {
    return <div className="text-red-600">Error: No data provided to preview</div>;
  }

  // Parse JSON content
  const parseContent = (): ContentBlock[] => {
    try {
      if (!data.content) return [];
      
      if (typeof data.content === 'string') {
        const parsed = JSON.parse(data.content);
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(data.content) ? (data.content as unknown as ContentBlock[]) : [];
    } catch (error) {
      console.error('Error parsing content:', error);
      return [];
    }
  };

  const contentBlocks = parseContent();

  const renderBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case 'heading': {
        const level = Math.min(Math.max(block.level || 1, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6;
        const headingClasses = {
          1: 'text-4xl font-bold mt-8 mb-6',
          2: 'text-3xl font-bold mt-6 mb-4',
          3: 'text-2xl font-bold mt-5 mb-3',
          4: 'text-xl font-bold mt-4 mb-2',
          5: 'text-lg font-bold mt-3 mb-2',
          6: 'text-base font-bold mt-2 mb-2',
        };
        return React.createElement(
          `h${level}` as any,
          { key: idx, className: `text-slate-900 ${headingClasses[level] || headingClasses[1]}` },
          block.content
        );
      }

      case 'paragraph':
        return (
          <p key={idx} className="text-slate-700 mb-4 leading-relaxed">
            {block.content}
          </p>
        );

      case 'list':
        const ListTag = block.ordered ? 'ol' : 'ul';
        const listClass = block.ordered ? 'list-decimal' : 'list-disc';
        return (
          <ListTag key={idx} className={`${listClass} list-inside space-y-2 mb-4 text-slate-700 ml-4`}>
            {block.items?.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ListTag>
        );

      case 'code':
        return (
          <pre key={idx} className="bg-slate-900 text-cyan-300 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm">
            <code>{block.content}</code>
          </pre>
        );

      case 'quote':
        return (
          <blockquote key={idx} className="border-l-4 border-emerald-600 pl-4 italic text-slate-700 my-4 bg-slate-50 p-4 rounded">
            {block.content}
          </blockquote>
        );

      case 'image':
        return (
          <div key={idx} className="my-6 rounded-lg overflow-hidden border border-slate-200">
            <img
              src={block.content}
              alt="Blog content"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Preview</h2>

      {/* Featured Image */}
      {imageUrl && (
        <div className="w-full h-96 rounded-xl overflow-hidden bg-slate-100 border border-slate-300">
          <img src={imageUrl} alt={data.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-slate-900">{data.title || 'Untitled'}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 pt-4 border-t border-slate-200">
          <span>By {data.author || 'Unknown Author'}</span>
          <span>•</span>
          <span>{data.reading_time_minutes || 0} min read</span>
          <span>•</span>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{data.category || 'Uncategorized'}</span>
        </div>
      </div>

      {/* Excerpt */}
      {data.excerpt && (
        <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
          <p className="text-lg text-slate-700 italic">{data.excerpt}</p>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-slate max-w-none space-y-4">
        {contentBlocks.length > 0 ? (
          <div className="text-slate-700 leading-relaxed space-y-4">
            {contentBlocks.map((block, idx) => renderBlock(block, idx))}
          </div>
        ) : (
          <p className="text-slate-500 italic">No content blocks parsed</p>
        )}
      </div>

      {/* Tags */}
      {data.tags && Array.isArray(data.tags) && data.tags.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span key={tag} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SEO Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-8">
        <h3 className="font-semibold text-slate-900 mb-4">SEO Information</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-slate-600">Title: <span className="font-medium text-slate-900">{data.seo_title || 'Not provided'}</span></p>
          </div>
          <div>
            <p className="text-slate-600">Description: <span className="font-medium text-slate-900">{data.seo_description || 'Not provided'}</span></p>
          </div>
          <div>
            <p className="text-slate-600">Keywords: <span className="font-medium text-slate-900">{Array.isArray(data.seo_keywords) && data.seo_keywords.length > 0 ? data.seo_keywords.join(', ') : 'Not provided'}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

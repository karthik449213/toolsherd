'use client';

import React from 'react';
import { BlogFormData } from '@/lib/types';

interface BlogPreviewProps {
  data: BlogFormData;
  imageUrl?: string;
  bodyImages?: string[];
}

export default function BlogPreview({ data, imageUrl, bodyImages }: BlogPreviewProps) {
  // Simple markdown to HTML converter
  const parseMarkdown = (md: string) => {
    return md
      .split('\n\n')
      .map((paragraph) => {
        // Headers
        if (paragraph.startsWith('###')) {
          return `<h3>${paragraph.replace(/^###\s/, '')}</h3>`;
        }
        if (paragraph.startsWith('##')) {
          return `<h2>${paragraph.replace(/^##\s/, '')}</h2>`;
        }
        if (paragraph.startsWith('#')) {
          return `<h1>${paragraph.replace(/^#\s/, '')}</h1>`;
        }
        // Lists
        if (paragraph.startsWith('-') || paragraph.startsWith('*')) {
          const items = paragraph.split('\n').map((line) => `<li>${line.replace(/^[-*]\s/, '')}</li>`);
          return `<ul>${items.join('')}</ul>`;
        }
        if (paragraph.match(/^\d+\./)) {
          const items = paragraph.split('\n').map((line) => `<li>${line.replace(/^\d+\.\s/, '')}</li>`);
          return `<ol>${items.join('')}</ol>`;
        }
        // Blockquotes
        if (paragraph.startsWith('>')) {
          const content = paragraph.replace(/^>\s/, '');
          return `<blockquote>${content}</blockquote>`;
        }
        // Regular paragraph
        return `<p>${paragraph}</p>`;
      })
      .join('');
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
        <h1 className="text-5xl font-bold text-slate-900">{data.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 pt-4 border-t border-slate-200">
          <span>By {data.author}</span>
          <span>•</span>
          <span>{data.reading_time_minutes} min read</span>
          <span>•</span>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{data.category}</span>
        </div>
      </div>

      {/* Excerpt */}
      <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
        <p className="text-lg text-slate-700 italic">{data.excerpt}</p>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none space-y-4">
        <div className="text-slate-700 leading-relaxed">
          {data.content_md.split('\n').map((line, idx) => {
            // Skip empty lines unless they're paragraph breaks
            if (!line.trim()) return null;

            // Check for image references [Image 1], [Image 2], etc.
            const imageMatch = line.match(/\[Image (\d+)\]/);
            if (imageMatch && bodyImages && bodyImages.length > 0) {
              const imageNum = parseInt(imageMatch[1]) - 1;
              if (imageNum >= 0 && imageNum < bodyImages.length) {
                return (
                  <div key={idx} className="my-6 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={bodyImages[imageNum]}
                      alt={`Blog image ${imageNum + 1}`}
                      className="w-full h-auto object-cover max-h-96"
                    />
                  </div>
                );
              }
            }

            // Headers
            if (line.startsWith('###')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-slate-900 mt-4 mb-2">
                  {line.replace(/^###\s/, '')}
                </h3>
              );
            }
            if (line.startsWith('##')) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-6 mb-4">
                  {line.replace(/^##\s/, '')}
                </h2>
              );
            }
            if (line.startsWith('#')) {
              return (
                <h1 key={idx} className="text-4xl font-bold text-slate-900 mt-8 mb-4">
                  {line.replace(/^#\s/, '')}
                </h1>
              );
            }

            // Lists
            if (line.startsWith('-') || line.startsWith('*')) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 mb-4 text-slate-700">
                  <li>{line.replace(/^[-*]\s/, '')}</li>
                </ul>
              );
            }

            if (line.match(/^\d+\./)) {
              return (
                <ol key={idx} className="list-decimal list-inside space-y-2 mb-4 text-slate-700">
                  <li>{line.replace(/^\d+\.\s/, '')}</li>
                </ol>
              );
            }

            // Blockquotes
            if (line.startsWith('>')) {
              return (
                <blockquote key={idx} className="border-l-4 border-emerald-600 pl-4 italic text-slate-700 my-4">
                  {line.replace(/^>\s/, '')}
                </blockquote>
              );
            }

            // Regular text
            return (
              <p key={idx} className="text-slate-700 mb-4">
                {line}
              </p>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
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
            <p className="text-slate-600">Title: <span className="font-medium text-slate-900">{data.seo_title}</span></p>
          </div>
          <div>
            <p className="text-slate-600">Description: <span className="font-medium text-slate-900">{data.seo_description}</span></p>
          </div>
          <div>
            <p className="text-slate-600">Keywords: <span className="font-medium text-slate-900">{data.seo_keywords.join(', ')}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

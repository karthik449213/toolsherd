'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { CodeBlock } from './CodeBlock';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * MarkdownRenderer Component
 * Renders Markdown content with GitHub-flavored markdown support
 * Supports headings, lists, blockquotes, code blocks, links, and images
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  if (!content) {
    return <div className={className}>No content available</div>;
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold text-slate-900 mt-8 mb-4 leading-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4 leading-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-3 leading-tight">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-bold text-slate-900 mt-4 mb-2 leading-tight">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-lg font-bold text-slate-900 mt-3 mb-2 leading-tight">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-base font-bold text-slate-900 mt-2 mb-1 leading-tight">
            {children}
          </h6>
        ),

        // Paragraphs
        p: ({ children }) => (
          <p className="text-slate-900 leading-relaxed my-4">
            {children}
          </p>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),

        // Images
        img: ({ src, alt }) => (
          <figure className="my-8">
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
            {alt && (
              <figcaption className="text-sm text-black text-center mt-2">
                {alt}
              </figcaption>
            )}
          </figure>
        ),

        // Code blocks
        code: ({ children, className: codeClassName, ...props }: any) => {
          const language = codeClassName?.replace('language-', '') || 'text';
          const isInline = !codeClassName;

          if (isInline) {
            return (
              <code className="bg-slate-100 text-red-600 px-2 py-1 rounded font-mono text-sm">
                {children}
              </code>
            );
          }

          return (
            <CodeBlock language={language} code={String(children).trim()} />
          );
        },

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 my-4 text-slate-900">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 my-4 text-slate-900">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="ml-4">
            {children}
          </li>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-slate-900 bg-blue-50 py-2 pr-4 rounded">
            {children}
          </blockquote>
        ),

        // Horizontal rule
        hr: () => (
          <hr className="my-8 border-t-2 border-slate-200" />
        ),

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-slate-300">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-slate-100">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody>
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="border border-slate-300">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="border border-slate-300 px-4 py-2 text-left font-bold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-slate-300 px-4 py-2">
            {children}
          </td>
        ),

        // Strong and emphasis
        strong: ({ children }) => (
          <strong className="font-bold text-slate-900">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-black">
            {children}
          </em>
        ),
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

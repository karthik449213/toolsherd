'use client';

import React from 'react';
import { Quote as QuoteIcon } from 'lucide-react';

interface QuoteBlockProps {
  text: string;
  author?: string;
  className?: string;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({
  text,
  author,
  className = '',
}) => {
  return (
    <blockquote
      className={`
        my-8 pl-6 border-l-4 border-blue-500 bg-blue-50 py-4 px-6 rounded-r-lg
        ${className}
      `}
    >
      <div className="flex gap-3">
        <QuoteIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <p className="text-lg text-slate-800 italic font-medium mb-2">{text}</p>
          {author && (
            <p className="text-sm text-slate-600 font-semibold">— {author}</p>
          )}
        </div>
      </div>
    </blockquote>
  );
};

export default QuoteBlock;

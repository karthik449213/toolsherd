'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * CodeBlock Component
 * Renders code blocks with syntax highlighting and copy functionality
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden bg-slate-900 shadow-lg">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
        <span className="text-sm font-mono text-slate-400">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 text-sm rounded bg-slate-700 hover:bg-slate-600 text-slate-100 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-4">
        <code className={`language-${language} text-slate-100 font-mono text-sm leading-relaxed`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

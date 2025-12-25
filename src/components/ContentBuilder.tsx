'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { AlertCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ListProps {
  items: string[];
  ordered?: boolean;
}

interface AlertProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  message: string;
}

// Paragraph
export const Paragraph: React.FC<{ children: ReactNode }> = ({ children }) => (
  <p className="text-lg text-slate-700 mb-4 leading-relaxed">{children}</p>
);

// Heading
export const Heading2: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-bold text-slate-900 mb-4 mt-8">{children}</h2>
);

export const Heading3: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-6">{children}</h3>
);

// Code Block
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
}) => {
  const lines = code.split('\n');

  return (
    <div className="bg-slate-900 text-slate-100 rounded-lg p-4 my-6 overflow-x-auto">
      <div className="flex gap-2 text-xs text-slate-400 mb-3">
        <span className="font-mono font-semibold">{language.toUpperCase()}</span>
      </div>
      <pre className="font-mono text-sm leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            {showLineNumbers && (
              <span className="text-slate-500 mr-4 w-8 text-right select-none">
                {idx + 1}
              </span>
            )}
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
};

// Image with Caption
export const ImageWithCaption: React.FC<ImageProps> = ({
  src,
  alt,
  caption,
  width = 800,
  height = 400,
}) => (
  <figure className="my-6">
    <div className="relative w-full h-auto">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto rounded-lg"
      />
    </div>
    {caption && (
      <figcaption className="text-center text-sm text-slate-600 mt-3 italic">
        {caption}
      </figcaption>
    )}
  </figure>
);

// Unordered List
export const UnorderedList: React.FC<ListProps> = ({ items }) => (
  <ul className="list-disc list-inside space-y-2 my-4 text-slate-700">
    {items.map((item, idx) => (
      <li key={idx} className="text-lg leading-relaxed">
        {item}
      </li>
    ))}
  </ul>
);

// Ordered List
export const OrderedList: React.FC<ListProps> = ({ items }) => (
  <ol className="list-decimal list-inside space-y-2 my-4 text-slate-700">
    {items.map((item, idx) => (
      <li key={idx} className="text-lg leading-relaxed">
        {item}
      </li>
    ))}
  </ol>
);

// Alert Components
export const AlertBlock: React.FC<AlertProps> = ({ type, title, message }) => {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-900',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-900',
    },
  };

  const style = styles[type];
  const IconComponent =
    type === 'warning' ? AlertTriangle : type === 'success' ? CheckCircle2 : type === 'error' ? AlertCircle : Info;

  return (
    <div className={`${style.bg} border-l-4 ${style.border} rounded-r-lg p-4 my-6`}>
      <div className="flex gap-3">
        <IconComponent className={`${style.icon} h-5 w-5 flex-shrink-0 mt-0.5`} />
        <div>
          {title && <h4 className={`${style.title} font-semibold mb-1`}>{title}</h4>}
          <p className="text-slate-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Highlight Text
export const HighlightText: React.FC<{ children: ReactNode; color?: 'yellow' | 'blue' | 'green' }> = ({
  children,
  color = 'yellow',
}) => {
  const colors = {
    yellow: 'bg-yellow-200 text-yellow-900',
    blue: 'bg-blue-200 text-blue-900',
    green: 'bg-green-200 text-green-900',
  };

  return <mark className={`${colors[color]} px-2 py-1 rounded`}>{children}</mark>;
};

// Divider
export const Divider: React.FC = () => <hr className="my-8 border-slate-300" />;

// Content Section Container
export const ContentSection: React.FC<ContentSectionProps> = ({ children, className = '' }) => (
  <section className={`my-8 ${className}`}>{children}</section>
);

export default {
  Paragraph,
  Heading2,
  Heading3,
  CodeBlock,
  ImageWithCaption,
  UnorderedList,
  OrderedList,
  AlertBlock,
  HighlightText,
  Divider,
  ContentSection,
};

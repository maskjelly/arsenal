import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { CodeComponent } from 'react-markdown/lib/complex-types';

interface MarkdownContentProps {
  content: string;
}

// CodeBlock component to render code syntax highlighting
const CodeBlock: CodeComponent = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={oneDark}
      language={match[1]}
      PreTag="div"
      className="rounded-lg mb-4"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-zinc-100" {...props}>
      {children}
    </code>
  );
};

// Main MarkdownContent component
export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div className="prose max-w-full text-zinc-100">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-zinc-100">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3 text-zinc-100">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mb-2 text-zinc-100">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-zinc-100 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 list-disc pl-6 text-zinc-100">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-decimal pl-6 text-zinc-100">{children}</ol>,
          li: ({ children }) => <li className="mb-1 text-zinc-100">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-zinc-600 pl-4 italic mb-4 text-zinc-200">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-zinc-600 my-4" />,
          strong: ({ children }) => <strong className="font-bold text-zinc-100">{children}</strong>,
          em: ({ children }) => <em className="italic text-zinc-100">{children}</em>,
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

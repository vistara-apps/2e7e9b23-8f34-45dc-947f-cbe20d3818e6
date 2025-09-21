'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../lib/utils';

interface GeneratedOutputProps {
  content: string;
  variant?: 'textBlock' | 'copyable';
  title?: string;
}

export function GeneratedOutput({
  content,
  variant = 'textBlock',
  title = 'Generated Content',
}: GeneratedOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {variant === 'copyable' && (
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span className="text-sm">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="bg-background/50 rounded-md p-4">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>

      {variant === 'textBlock' && (
        <button
          onClick={handleCopy}
          className="mt-4 w-full bg-primary/10 text-primary py-2 px-4 rounded-md hover:bg-primary/20 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy to Clipboard</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

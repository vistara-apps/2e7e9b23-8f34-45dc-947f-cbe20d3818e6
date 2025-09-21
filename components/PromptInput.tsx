'use client';

import { cn } from '../lib/utils';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'textarea' | 'singleline';
  className?: string;
}

export function PromptInput({
  value,
  onChange,
  placeholder = 'Enter your prompt...',
  variant = 'textarea',
  className,
}: PromptInputProps) {
  const baseClasses = 'w-full px-4 py-3 bg-background border border-surface rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200';

  if (variant === 'singleline') {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(baseClasses, className)}
      />
    );
  }

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={cn(baseClasses, 'resize-none', className)}
    />
  );
}

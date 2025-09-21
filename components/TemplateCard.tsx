'use client';

import { PromptTemplate } from '../lib/types';
import { cn } from '../lib/utils';

interface TemplateCardProps {
  template: PromptTemplate;
  isSelected?: boolean;
  onClick: () => void;
  variant?: 'premium' | 'free';
}

export function TemplateCard({
  template,
  isSelected = false,
  onClick,
  variant = 'free',
}: TemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-surface bg-surface hover:border-primary/30',
        variant === 'premium' && 'relative'
      )}
    >
      {variant === 'premium' && (
        <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
          Premium
        </div>
      )}
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground">{template.name}</h3>
          <p className="text-sm text-foreground/70 mt-1">{template.description}</p>
        </div>
        
        <div className="bg-background/50 rounded-md p-3">
          <p className="text-xs text-foreground/60 font-mono leading-relaxed">
            {template.promptStructure.length > 120
              ? `${template.promptStructure.slice(0, 120)}...`
              : template.promptStructure}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { TemplateCard } from './TemplateCard';
import { GeneratedOutput } from './GeneratedOutput';
import { FarcasterAction } from './FarcasterAction';
import { PROMPT_TEMPLATES } from '../lib/constants';
import { PromptTemplate, GenerationResponse } from '../lib/types';

export function TemplateLibrary() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');

  const filteredTemplates = PROMPT_TEMPLATES.filter(template => {
    if (filter === 'free') return !template.isPremium;
    if (filter === 'premium') return template.isPremium;
    return true;
  });

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedTemplate || !customInput.trim()) {
      setError('Please select a template and provide your app details');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'prompt',
          input: customInput.trim(),
          template: selectedTemplate.promptStructure,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate prompt');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Prompt Template Library</h2>
        <p className="text-foreground/70">
          Choose from curated templates for common use cases
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-surface rounded-lg p-1">
        {[
          { id: 'all' as const, label: 'All Templates' },
          { id: 'free' as const, label: 'Free' },
          { id: 'premium' as const, label: 'Premium' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === tab.id
                ? 'bg-primary text-white'
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.templateId}
            template={template}
            isSelected={selectedTemplate?.templateId === template.templateId}
            onClick={() => handleTemplateSelect(template)}
            variant={template.isPremium ? 'premium' : 'free'}
          />
        ))}
      </div>

      {/* Selected Template Details */}
      {selectedTemplate && (
        <div className="bg-surface rounded-lg p-6 shadow-card space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{selectedTemplate.name}</h3>
            <p className="text-foreground/70 text-sm mb-4">{selectedTemplate.description}</p>
            
            <div className="bg-background/50 rounded-md p-4 mb-4">
              <p className="text-sm text-foreground/80 font-mono">
                {selectedTemplate.promptStructure}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Your App Details
            </label>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Provide details about your app to customize this template..."
              className="w-full h-24 px-4 py-3 bg-background border border-surface rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !customInput.trim()}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating...</span>
              </span>
            ) : (
              'Generate from Template'
            )}
          </button>
        </div>
      )}

      {/* Output Section */}
      {result && (
        <div className="space-y-4">
          <GeneratedOutput
            content={result.generatedText}
            variant="copyable"
            title="Generated Prompt"
          />
          
          <FarcasterAction
            content={result.generatedText}
            variant="postPrompt"
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PromptInput } from './PromptInput';
import { GeneratedOutput } from './GeneratedOutput';
import { GenerationResponse } from '../lib/types';

export function DescriptionGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please describe your app first');
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
          type: 'description',
          input: input.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate description');
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
        <h2 className="text-2xl font-bold mb-2">App Description Generator</h2>
        <p className="text-foreground/70">
          Describe your app idea and get an engaging, SEO-friendly description
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <PromptInput
          value={input}
          onChange={setInput}
          placeholder="Describe your Mimi app... (e.g., 'A social app for artists to showcase their work and connect with collectors')"
          variant="textarea"
        />
        
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !input.trim()}
          className="mt-4 w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Generating...</span>
            </span>
          ) : (
            'Generate Description'
          )}
        </button>
      </div>

      {/* Output Section */}
      {result && (
        <GeneratedOutput
          content={result.generatedText}
          variant="textBlock"
          title="Generated App Description"
        />
      )}
    </div>
  );
}

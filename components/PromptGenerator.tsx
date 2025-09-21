'use client';

import { useState } from 'react';
import { PromptInput } from './PromptInput';
import { GeneratedOutput } from './GeneratedOutput';
import { FarcasterAction } from './FarcasterAction';
import { GenerationResponse } from '../lib/types';

export function PromptGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please describe what kind of prompt you need');
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
          input: input.trim(),
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
        <h2 className="text-2xl font-bold mb-2">AI Prompt Generator</h2>
        <p className="text-foreground/70">
          Create engaging prompts for social media and community interaction
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-surface rounded-lg p-6 shadow-card">
        <PromptInput
          value={input}
          onChange={setInput}
          placeholder="What kind of prompt do you need? (e.g., 'A prompt to encourage users to share their favorite app features')"
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
          className="mt-4 w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Generating...</span>
            </span>
          ) : (
            'Generate Prompt'
          )}
        </button>
      </div>

      {/* Output Section */}
      {result && (
        <div className="space-y-4">
          <GeneratedOutput
            content={result.generatedText}
            variant="copyable"
            title="Generated AI Prompt"
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

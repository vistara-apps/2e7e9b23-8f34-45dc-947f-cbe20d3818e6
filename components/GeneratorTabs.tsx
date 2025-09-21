'use client';

import { useState } from 'react';
import { DescriptionGenerator } from './DescriptionGenerator';
import { PromptGenerator } from './PromptGenerator';
import { TemplateLibrary } from './TemplateLibrary';
import { cn } from '../lib/utils';

type TabType = 'description' | 'prompt' | 'templates';

export function GeneratorTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    { id: 'description' as TabType, label: 'App Description', icon: '📝' },
    { id: 'prompt' as TabType, label: 'AI Prompts', icon: '🤖' },
    { id: 'templates' as TabType, label: 'Templates', icon: '📚' },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-surface rounded-lg p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground/70 hover:text-foreground hover:bg-surface/50'
            )}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'description' && <DescriptionGenerator />}
        {activeTab === 'prompt' && <PromptGenerator />}
        {activeTab === 'templates' && <TemplateLibrary />}
      </div>
    </div>
  );
}

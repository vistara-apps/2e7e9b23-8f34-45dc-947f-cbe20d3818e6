import { PromptTemplate } from './types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    templateId: 'community-engagement',
    name: 'Community Engagement',
    description: 'Encourage users to interact and share their experiences',
    promptStructure: 'Hey [Community Name]! 🚀 What\'s your favorite feature in [App Name]? Share your thoughts and let\'s build something amazing together! Drop a comment below 👇',
    tags: ['community', 'engagement', 'social'],
    isPremium: false,
  },
  {
    templateId: 'feature-highlight',
    name: 'Feature Highlight',
    description: 'Showcase a specific app feature to drive adoption',
    promptStructure: '✨ New Feature Alert! [App Name] now has [Feature Name] - [Brief Description]. Try it out and tell us what you think! Who wants to be the first to test it? 🎯',
    tags: ['features', 'announcement', 'adoption'],
    isPremium: false,
  },
  {
    templateId: 'user-onboarding',
    name: 'User Onboarding',
    description: 'Welcome new users and guide them through first steps',
    promptStructure: 'Welcome to [App Name]! 👋 Ready to get started? Here\'s what you can do first: [Action 1], [Action 2], [Action 3]. Need help? Our community is here for you! 💪',
    tags: ['onboarding', 'welcome', 'guidance'],
    isPremium: false,
  },
  {
    templateId: 'feedback-collection',
    name: 'Feedback Collection',
    description: 'Gather user feedback and suggestions',
    promptStructure: '📝 We\'re always improving [App Name]! What would you like to see next? Your feedback shapes our roadmap. Comment with your ideas or vote on existing suggestions! 🗳️',
    tags: ['feedback', 'improvement', 'roadmap'],
    isPremium: true,
  },
  {
    templateId: 'social-challenge',
    name: 'Social Challenge',
    description: 'Create viral challenges to boost engagement',
    promptStructure: '🏆 [Challenge Name] is here! Show us your [Challenge Action] using [App Name] and tag 3 friends to join. Best submission wins [Prize]! Ready to play? 🎮',
    tags: ['challenge', 'viral', 'gamification'],
    isPremium: true,
  },
  {
    templateId: 'milestone-celebration',
    name: 'Milestone Celebration',
    description: 'Celebrate achievements and milestones',
    promptStructure: '🎉 Amazing! We just hit [Milestone Number] [Milestone Type] on [App Name]! This wouldn\'t be possible without our incredible community. What should we celebrate next? 🥳',
    tags: ['milestone', 'celebration', 'community'],
    isPremium: true,
  },
];

export const GENERATION_LIMITS = {
  FREE_DAILY: 5,
  PREMIUM_DAILY: 50,
  COST_PER_GENERATION: 0.01, // in USD
};

export const APP_CONFIG = {
  name: 'MimiPromptGen',
  tagline: 'Generate compelling app descriptions and AI prompts for your Mimi app.',
  version: '1.0.0',
  supportEmail: 'support@mimipromptgen.com',
};

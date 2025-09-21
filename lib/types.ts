export interface User {
  userId: string;
  creationDate: string;
  promptCredits: number;
  savedTemplates: string[];
}

export interface PromptTemplate {
  templateId: string;
  name: string;
  description: string;
  promptStructure: string;
  tags: string[];
  isPremium: boolean;
}

export interface GeneratedContent {
  contentId: string;
  userId: string;
  promptUsed: string;
  generatedText: string;
  contentType: 'description' | 'prompt';
  generationDate: string;
}

export interface GenerationRequest {
  type: 'description' | 'prompt';
  input: string;
  template?: string;
}

export interface GenerationResponse {
  success: boolean;
  generatedText: string;
  type: string;
  input: string;
  error?: string;
}

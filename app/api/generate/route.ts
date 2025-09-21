import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { type, input, template } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });

    if (!input && !template) {
      return NextResponse.json(
        { error: 'Input or template is required' },
        { status: 400 }
      );
    }

    let prompt = '';
    
    if (type === 'description') {
      prompt = `Generate an engaging and SEO-friendly app description for a Base Mimi app with the following details: ${input}. 

The description should:
- Be 2-3 sentences long
- Highlight the main value proposition
- Include relevant keywords for discoverability
- Sound exciting and professional
- Appeal to the target audience

Format the response as a clean description without quotes or extra formatting.`;
    } else if (type === 'prompt') {
      if (template) {
        prompt = `Based on this template: "${template}", generate a compelling AI prompt for a Base Mimi app. Fill in any placeholders with relevant content based on: ${input}

The prompt should:
- Be engaging and actionable
- Encourage user interaction
- Be suitable for social media sharing
- Include clear call-to-action
- Be concise but compelling

Format the response as a ready-to-use prompt.`;
      } else {
        prompt = `Generate an engaging AI prompt for a Base Mimi app based on: ${input}

The prompt should:
- Encourage community engagement
- Be suitable for Farcaster or social platforms
- Include a clear call-to-action
- Be concise and shareable
- Drive user interaction

Format the response as a ready-to-use social media prompt.`;
      }
    }

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are an expert copywriter specializing in app descriptions and social media prompts for Web3 and social applications. Generate compelling, engaging content that drives user action.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const generatedText = completion.choices[0]?.message?.content?.trim();

    if (!generatedText) {
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      generatedText,
      type,
      input 
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}

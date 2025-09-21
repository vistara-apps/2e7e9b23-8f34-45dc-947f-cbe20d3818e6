# MimiPromptGen

A Base Mini App for generating compelling app descriptions and AI prompts for Mimi apps, leveraging social primitives and community engagement.

## Features

- **AI-Powered Description Generator**: Automatically generate engaging and SEO-friendly descriptions for Base Mimi apps
- **Prompt Library & Generator**: Curated library of effective AI prompts for common use cases
- **Social Prompting Integration**: Generate prompts optimized for Farcaster and social platforms
- **Template System**: Pre-built templates for community engagement, feature highlights, and more

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network integration via OnchainKit
- **AI**: OpenAI API for content generation
- **Mini App**: MiniKit for Base App integration

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mimipromptgen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # App providers
├── components/            # React components
│   ├── AppShell.tsx      # Main app shell
│   ├── GeneratorTabs.tsx # Tab navigation
│   ├── DescriptionGenerator.tsx
│   ├── PromptGenerator.tsx
│   ├── TemplateLibrary.tsx
│   └── ...               # Other components
├── lib/                  # Utilities and types
│   ├── types.ts         # TypeScript types
│   ├── utils.ts         # Utility functions
│   └── constants.ts     # App constants
└── public/              # Static assets
```

## Key Components

### AppShell
Main application wrapper providing consistent layout and styling.

### GeneratorTabs
Tab navigation system for switching between different generation modes.

### DescriptionGenerator
AI-powered tool for generating app descriptions based on user input.

### PromptGenerator
Creates engaging AI prompts for social media and community interaction.

### TemplateLibrary
Curated collection of prompt templates for common use cases.

## API Routes

### `/api/generate`
POST endpoint for AI content generation. Accepts:
- `type`: 'description' or 'prompt'
- `input`: User's description or requirements
- `template`: Optional template structure

## Design System

The app uses a custom design system with:
- **Colors**: Dark theme with accent colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components with variants

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Required for OnchainKit integration
- `OPENAI_API_KEY`: Required for AI content generation

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js.

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   Make sure to set the environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

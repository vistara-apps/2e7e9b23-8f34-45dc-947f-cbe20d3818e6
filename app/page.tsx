import { AppShell } from '../components/AppShell'
import { GeneratorTabs } from '../components/GeneratorTabs'

export default function Home() {
  return (
    <AppShell>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              MimiPromptGen
            </h1>
            <p className="text-base text-foreground/80 max-w-md mx-auto">
              Generate compelling app descriptions and AI prompts for your Mimi app
            </p>
          </div>

          {/* Main Content */}
          <GeneratorTabs />
        </div>
      </div>
    </AppShell>
  )
}

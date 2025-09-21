import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MimiPromptGen - AI-Powered App Description & Prompt Generator',
  description: 'Generate compelling app descriptions and AI prompts for your Mimi app. Leverage social primitives to boost engagement.',
  keywords: ['AI', 'prompt generation', 'app descriptions', 'Base', 'Mimi', 'social'],
  authors: [{ name: 'MimiPromptGen Team' }],
  openGraph: {
    title: 'MimiPromptGen',
    description: 'Generate compelling app descriptions and AI prompts for your Mimi app.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MimiPromptGen',
    description: 'Generate compelling app descriptions and AI prompts for your Mimi app.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

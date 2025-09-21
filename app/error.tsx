'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong!
        </h2>
        <p className="text-foreground/70 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

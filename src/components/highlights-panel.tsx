'use client'

import { formatDuration } from '@/lib/utils'

interface Highlight {
  id: string
  title: string
  startTime: number
  endTime: number
  note: string | null
}

interface HighlightsPanelProps {
  highlights: Highlight[]
  onSeek: (time: number) => void
}

export function HighlightsPanel({ highlights, onSeek }: HighlightsPanelProps) {
  if (highlights.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">⭐</div>
        <h3 className="font-semibold text-gray-900 mb-1">No highlights yet</h3>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">
          Click the star icon on any transcript segment to save a highlight.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {highlights.map((highlight) => {
        const duration = highlight.endTime - highlight.startTime
        return (
          <div
            key={highlight.id}
            className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 hover:border-yellow-200 transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-500">⭐</span>
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{highlight.title}</h4>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                    {formatDuration(highlight.startTime)}
                  </span>
                  <span>→</span>
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                    {formatDuration(highlight.endTime)}
                  </span>
                  <span>·</span>
                  <span>{formatDuration(duration)}</span>
                </div>
                {highlight.note && (
                  <p className="text-xs text-gray-500 italic leading-relaxed">{highlight.note}</p>
                )}
              </div>
              <button
                onClick={() => onSeek(highlight.startTime)}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-white border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Jump to
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

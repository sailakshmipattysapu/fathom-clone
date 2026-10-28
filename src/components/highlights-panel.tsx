'use client'

import React from 'react'
import { formatDuration } from '@/lib/utils'
import { toast } from 'sonner'

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
      <div className="text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">⭐</div>
        <h3 className="font-bold text-white mb-1">No highlights yet</h3>
        <p className="text-xs text-gray-400 max-w-xs mx-auto">
          Click the star icon on any transcript segment or during live call playback to save a highlight moment.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 text-xs text-white">
      {highlights.map((highlight) => {
        const duration = highlight.endTime - highlight.startTime
        return (
          <div
            key={highlight.id}
            className="bg-[#0d1117] border border-[#21262d] hover:border-[#00b4d8] rounded-xl p-3.5 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-amber-400">⭐</span>
                  <h4 className="text-xs font-bold text-white truncate">{highlight.title}</h4>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                  <span className="font-mono bg-[#161b22] px-2 py-0.5 rounded text-[#00b4d8]">
                    {formatDuration(Math.floor(highlight.startTime))}
                  </span>
                  <span>→</span>
                  <span className="font-mono bg-[#161b22] px-2 py-0.5 rounded text-[#00b4d8]">
                    {formatDuration(Math.floor(highlight.endTime))}
                  </span>
                  <span>·</span>
                  <span className="text-gray-500">{formatDuration(Math.floor(duration))} clip</span>
                </div>

                {highlight.note && (
                  <p className="text-[11px] text-gray-300 italic bg-[#161b22] p-2 rounded-lg border border-[#21262d]">
                    {highlight.note}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onSeek(highlight.startTime)}
                  className="bg-[#21262d] hover:bg-[#30363d] text-[#00b4d8] border border-[#00b4d8]/30 px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1"
                >
                  <span>▶</span>
                  <span>Jump</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://fathom.video/clip/${highlight.id}`)
                    toast.success('Clip link copied!')
                  }}
                  className="bg-[#161b22] hover:bg-[#21262d] text-gray-300 px-2 py-1 rounded text-[10px]"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

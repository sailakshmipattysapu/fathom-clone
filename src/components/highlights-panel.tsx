'use client'

import React, { useState } from 'react'
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
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function handleShare(highlight: Highlight) {
    navigator.clipboard.writeText(`https://fathom.video/clip/${highlight.id}`)
    setCopiedId(highlight.id)
    toast.success('Clip link copied!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (highlights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 animate-float"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,191,36,0.08))', border: '1px solid rgba(245,158,11,0.2)' }}>
          ⭐
        </div>
        <h3 className="font-bold text-white text-sm mb-2">No highlights yet</h3>
        <p className="text-xs text-[#4a5568] max-w-[220px] leading-relaxed">
          Click ⭐ on any transcript segment or press the highlight button during live playback to save a key moment.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 text-xs p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-black text-[#4a5568] uppercase tracking-widest">
          {highlights.length} Highlight{highlights.length !== 1 ? 's' : ''} Saved
        </span>
        <span className="badge badge-amber">{highlights.length}</span>
      </div>

      {highlights.map((highlight, idx) => {
        const clipDuration = highlight.endTime - highlight.startTime
        return (
          <div
            key={highlight.id}
            className="group rounded-xl p-3.5 transition-all duration-200 animate-fade-up"
            style={{
              animationDelay: `${idx * 50}ms`,
              background: 'rgba(17,22,32,0.7)',
              border: '1px solid rgba(30,37,53,0.8)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,158,11,0.3)'
              ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(22,28,40,0.8)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(30,37,53,0.8)'
              ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(17,22,32,0.7)'
            }}
          >
            <div className="flex items-start gap-3">
              {/* Star icon */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  boxShadow: '0 0 8px rgba(245,158,11,0.1)',
                }}>
                <span className="text-sm">⭐</span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate mb-2">{highlight.title}</h4>

                {/* Timestamp pills */}
                <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(0,180,216,0.12)', color: '#00b4d8', border: '1px solid rgba(0,180,216,0.2)' }}>
                    {formatDuration(Math.floor(highlight.startTime))}
                  </span>
                  <span className="text-[#4a5568]">→</span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(0,180,216,0.12)', color: '#00b4d8', border: '1px solid rgba(0,180,216,0.2)' }}>
                    {formatDuration(Math.floor(highlight.endTime))}
                  </span>
                  <span className="text-[10px] text-[#4a5568]">{formatDuration(Math.floor(clipDuration))} clip</span>
                </div>

                {/* Note */}
                {highlight.note && (
                  <p className="text-[10px] text-[#8b9ab2] italic px-3 py-2 rounded-lg leading-relaxed mb-2.5"
                    style={{ background: 'rgba(8,12,20,0.6)', border: '1px solid rgba(30,37,53,0.6)' }}>
                    &ldquo;{highlight.note}&rdquo;
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    onClick={() => onSeek(highlight.startTime)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all hover:scale-[1.02]"
                    style={{
                      background: 'rgba(0,180,216,0.12)',
                      border: '1px solid rgba(0,180,216,0.25)',
                      color: '#00b4d8',
                    }}>
                    <span>▶</span>
                    <span>Jump to</span>
                  </button>
                  <button
                    onClick={() => handleShare(highlight)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all hover:scale-[1.02]"
                    style={{
                      background: copiedId === highlight.id ? 'rgba(16,185,129,0.12)' : 'rgba(17,22,32,0.8)',
                      border: `1px solid ${copiedId === highlight.id ? 'rgba(16,185,129,0.3)' : 'rgba(30,37,53,0.8)'}`,
                      color: copiedId === highlight.id ? '#10b981' : '#8b9ab2',
                    }}>
                    <span>{copiedId === highlight.id ? '✓' : '🔗'}</span>
                    <span>{copiedId === highlight.id ? 'Copied!' : 'Share Clip'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

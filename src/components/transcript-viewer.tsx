'use client'

import { useRef, useEffect } from 'react'
import { formatDuration } from '@/lib/utils'
import { toast } from 'sonner'

interface Segment {
  id: string
  speaker: string
  text: string
  startTime: number
  endTime: number
  order: number
}

interface TranscriptViewerProps {
  segments: Segment[]
  currentTime: number
  onSeek: (time: number) => void
  meetingId: string
  onHighlightCreated?: (highlight: any) => void
}

// Assign consistent colors to speakers
const SPEAKER_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
  'bg-teal-100 text-teal-700',
]

function getSpeakerColor(speaker: string, speakers: string[]): string {
  const idx = speakers.indexOf(speaker)
  return SPEAKER_COLORS[idx % SPEAKER_COLORS.length]
}

export function TranscriptViewer({
  segments,
  currentTime,
  onSeek,
  meetingId,
  onHighlightCreated,
}: TranscriptViewerProps) {
  const activeRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const speakers = Array.from(new Set(segments.map((s) => s.speaker)))

  // Find active segment
  const activeSegmentId = segments.find(
    (seg) => currentTime >= seg.startTime && currentTime <= seg.endTime
  )?.id

  // Auto-scroll to active segment
  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current
      const el = activeRef.current
      const elTop = el.offsetTop
      const containerScrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      if (elTop < containerScrollTop || elTop > containerScrollTop + containerHeight - 100) {
        container.scrollTo({ top: elTop - 80, behavior: 'smooth' })
      }
    }
  }, [activeSegmentId])

  async function handleHighlight(seg: Segment) {
    try {
      const res = await fetch(`/api/meetings/${meetingId}/highlights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: seg.text.slice(0, 60) + (seg.text.length > 60 ? '...' : ''),
          startTime: seg.startTime,
          endTime: seg.endTime,
          note: `Highlighted by ${seg.speaker}`,
        }),
      })
      if (res.ok) {
        const highlight = await res.json()
        onHighlightCreated?.(highlight)
        toast.success('Highlight saved!')
      } else {
        toast.error('Failed to save highlight')
      }
    } catch {
      toast.error('Failed to save highlight')
    }
  }

  if (segments.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-center text-gray-400">
        <div>
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm">No transcript available for this meeting.</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="overflow-y-auto">
      <div className="px-6 py-4 space-y-1">
        {segments.map((seg) => {
          const isActive = seg.id === activeSegmentId
          const speakerColor = getSpeakerColor(seg.speaker, speakers)

          return (
            <div
              key={seg.id}
              ref={isActive ? activeRef : null}
              className={`transcript-segment group rounded-lg px-3 py-3 cursor-pointer hover:bg-blue-50/50 ${
                isActive ? 'active' : ''
              }`}
              onClick={() => onSeek(seg.startTime)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-0.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${speakerColor}`}
                  >
                    {seg.speaker[0]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-800">{seg.speaker}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSeek(seg.startTime)
                      }}
                      className="text-xs text-gray-400 hover:text-blue-500 font-mono transition-colors"
                    >
                      {formatDuration(seg.startTime)}
                    </button>
                  </div>
                  <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {seg.text}
                  </p>
                </div>
                {/* Highlight button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleHighlight(seg)
                  }}
                  title="Save as highlight"
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-yellow-500 hover:bg-yellow-50 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

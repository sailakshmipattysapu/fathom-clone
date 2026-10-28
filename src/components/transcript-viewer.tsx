'use client'

import React, { useRef, useEffect, useState } from 'react'
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

const SPEAKER_COLORS = [
  'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  'bg-amber-500/20 text-amber-300 border-amber-500/40',
  'bg-pink-500/20 text-pink-300 border-pink-500/40',
  'bg-blue-500/20 text-blue-300 border-blue-500/40',
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
  const [filterQuery, setFilterQuery] = useState('')

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
      if (elTop < containerScrollTop || elTop > containerScrollTop + containerHeight - 120) {
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
        toast.success('Highlight bookmarked!')
      } else {
        toast.error('Failed to save highlight')
      }
    } catch {
      toast.error('Failed to save highlight')
    }
  }

  const filteredSegments = segments.filter((s) =>
    s.text.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.speaker.toLowerCase().includes(filterQuery.toLowerCase())
  )

  if (segments.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-center text-gray-500">
        <div>
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm">No transcript available for this meeting.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#0d1117] text-white">
      {/* Transcript Search Filter */}
      <div className="p-3 border-b border-[#21262d] bg-[#12161f] flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter transcript by keyword or speaker..."
          className="bg-transparent text-xs text-white placeholder-gray-500 w-full focus:outline-none"
        />
        {filterQuery && (
          <button onClick={() => setFilterQuery('')} className="text-xs text-gray-400 hover:text-white">
            ✕
          </button>
        )}
      </div>

      {/* Segments Scroll Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-1">
        {filteredSegments.map((seg) => {
          const isActive = seg.id === activeSegmentId
          const speakerColor = getSpeakerColor(seg.speaker, speakers)

          return (
            <div
              key={seg.id}
              ref={isActive ? activeRef : null}
              className={`transcript-segment group rounded-xl p-3 cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#00b4d8]/10 border-l-4 border-[#00b4d8]'
                  : 'hover:bg-[#161b22] border-l-4 border-transparent'
              }`}
              onClick={() => onSeek(seg.startTime)}
            >
              <div className="flex items-start gap-3">
                {/* Speaker avatar initial */}
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${speakerColor}`}
                >
                  {seg.speaker.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-200">{seg.speaker}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSeek(seg.startTime)
                      }}
                      className="text-[11px] text-[#00b4d8] hover:underline font-mono"
                    >
                      {formatDuration(Math.floor(seg.startTime))}
                    </button>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isActive ? 'text-white font-medium' : 'text-gray-300'
                    }`}
                  >
                    {seg.text}
                  </p>
                </div>

                {/* Star Highlight Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleHighlight(seg)
                  }}
                  title="Bookmark moment"
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-amber-400 p-1.5 transition-opacity"
                >
                  ⭐️
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import React, { useState, useCallback } from 'react'
import { formatDate, platformIcon, formatDuration } from '@/lib/utils'
import { FathomHeader } from '@/components/fathom-header'
import { SEED_MEETINGS } from '@/lib/seed-data'
import Link from 'next/link'

interface SearchSegment {
  id: string
  speaker: string
  text: string
  startTime: number
  endTime: number
}

interface SearchResult {
  meetingId: string
  meetingTitle: string
  meetingDate: string
  platform: string
  segments: SearchSegment[]
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-[#00b4d8]/30 text-[#00b4d8] font-bold rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searched, setSearched] = useState(false)

  const doSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    setSearched(true)
    const lower = q.toLowerCase()

    // Search through seed data transcripts
    const matches: SearchResult[] = []

    SEED_MEETINGS.forEach((meeting, idx) => {
      const matchingSegments = meeting.transcript.filter(
        (seg) => seg.text.toLowerCase().includes(lower) || seg.speaker.toLowerCase().includes(lower)
      )

      if (matchingSegments.length > 0) {
        matches.push({
          meetingId: (idx + 1).toString(),
          meetingTitle: meeting.title,
          meetingDate: meeting.date.toISOString(),
          platform: meeting.platform,
          segments: matchingSegments.map((s, sIdx) => ({
            id: sIdx.toString(),
            speaker: s.speaker,
            text: s.text,
            startTime: s.startTime,
            endTime: s.endTime,
          })),
        })
      }
    })

    setResults(matches)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    doSearch(query)
  }

  const totalMatches = results.reduce((acc, r) => acc + r.segments.length, 0)

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      <FathomHeader activeTab="My Calls" onSearch={(q) => { setQuery(q); doSearch(q); }} />

      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Cross-Meeting Transcript Search</h1>
          <p className="text-xs text-gray-400 mt-1">
            Search across every spoken word and transcript in your meeting repository.
          </p>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                doSearch(e.target.value)
              }}
              placeholder="Search by topic, speaker name, decision (e.g. 'calendar', 'pricing', 'Alex')..."
              className="w-full bg-[#12161f] border border-[#21262d] focus:border-[#00b4d8] text-white text-sm pl-11 pr-24 py-3 rounded-xl focus:outline-none shadow-xl"
              autoFocus
            />
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[#00b4d8] text-black font-bold text-xs px-4 rounded-lg hover:bg-[#0096c7]"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-2 border-b border-[#21262d]">
              <span>
                Found <strong className="text-white">{totalMatches}</strong> match
                {totalMatches !== 1 ? 'es' : ''} across{' '}
                <strong className="text-white">{results.length}</strong> meeting
                {results.length !== 1 ? 's' : ''}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16 bg-[#12161f] border border-[#21262d] rounded-2xl p-8">
                <span className="text-4xl block mb-2">🔍</span>
                <h3 className="text-sm font-bold text-white mb-1">No matches found</h3>
                <p className="text-xs text-gray-400">
                  Try searching for keywords like &ldquo;calendar&rdquo;, &ldquo;pricing&rdquo;, &ldquo;Priya&rdquo;, or &ldquo;beta&rdquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((result) => (
                  <div
                    key={result.meetingId}
                    className="bg-[#12161f] border border-[#21262d] rounded-2xl p-5 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#21262d]">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <span>{platformIcon(result.platform)}</span>
                          <span className="capitalize">{result.platform}</span>
                          <span>·</span>
                          <span>{formatDate(new Date(result.meetingDate))}</span>
                        </div>
                        <Link
                          href={`/meetings/${result.meetingId}`}
                          className="text-base font-bold text-white hover:text-[#00b4d8] transition-colors"
                        >
                          {result.meetingTitle}
                        </Link>
                      </div>
                      <Link
                        href={`/meetings/${result.meetingId}`}
                        className="bg-[#21262d] hover:bg-[#30363d] text-[#00b4d8] text-xs px-3 py-1.5 rounded-lg font-semibold"
                      >
                        Open Meeting →
                      </Link>
                    </div>

                    <div className="space-y-2">
                      {result.segments.map((seg) => (
                        <Link
                          key={seg.id}
                          href={`/meetings/${result.meetingId}`}
                          className="block p-3 rounded-xl bg-[#0d1117] hover:bg-[#161b22] border border-[#21262d] transition-all group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-200">{seg.speaker}</span>
                            <span className="text-[11px] font-mono text-[#00b4d8]">
                              {formatDuration(Math.floor(seg.startTime))}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {highlight(seg.text, query)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Initial Suggestions */}
        {!searched && (
          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 text-center">
            <h3 className="text-sm font-bold text-white mb-2">Try quick searches:</h3>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {['Calendar Integration', 'AI Summarization', 'Pricing Model', 'Priya Patel', 'TechCorp', 'Session Migration'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term)
                      doSearch(term)
                    }}
                    className="bg-[#0d1117] hover:bg-[#161b22] border border-[#21262d] hover:border-[#00b4d8] text-xs text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-all"
                  >
                    &ldquo;{term}&rdquo;
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

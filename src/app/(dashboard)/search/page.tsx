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
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: 'rgba(0,180,216,0.25)', color: '#00b4d8', borderRadius: 3, padding: '0 2px', fontWeight: 700 }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

const QUICK_TERMS = ['Calendar Integration', 'AI Summarization', 'Pricing Model', 'Priya Patel', 'TechCorp', 'Session Migration']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searched, setSearched] = useState(false)

  const doSearch = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return }
    setSearched(true)
    const lower = q.toLowerCase()
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
            id: sIdx.toString(), speaker: s.speaker, text: s.text, startTime: s.startTime, endTime: s.endTime,
          })),
        })
      }
    })
    setResults(matches)
  }, [])

  const totalMatches = results.reduce((acc, r) => acc + r.segments.length, 0)

  return (
    <div className="min-h-screen dashboard-gradient text-white flex flex-col">
      <FathomHeader activeTab="My Calls" onSearch={(q) => { setQuery(q); doSearch(q) }} />

      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1 animate-fade-up">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(124,58,237,0.15))',
                border: '1px solid rgba(0,180,216,0.25)',
              }}>
              <svg className="w-5 h-5 text-[#00b4d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Cross-Meeting Search</h1>
              <p className="text-xs text-[#4a5568]">Search every spoken word across all your recordings</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={(e) => { e.preventDefault(); doSearch(query) }} className="mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-[#4a5568] group-focus-within:text-[#00b4d8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); doSearch(e.target.value) }}
              placeholder='Search by topic, speaker, or keyword — try "calendar", "pricing", "Priya"...'
              autoFocus
              className="w-full text-sm pl-11 pr-28 py-3.5 rounded-2xl focus:outline-none transition-all duration-200"
              style={{
                background: 'rgba(17,22,32,0.9)',
                border: '1px solid rgba(30,37,53,0.8)',
                color: '#e8edf5',
                caretColor: '#00b4d8',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,180,216,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,180,216,0.08)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(30,37,53,0.8)'; e.currentTarget.style.boxShadow = 'none' }}
            />
            <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 btn-primary px-4 py-2 text-xs font-bold rounded-xl">
              Search
            </button>
          </div>
        </form>

        {/* Quick term chips */}
        {!searched && (
          <div className="animate-fade-up">
            <p className="text-xs font-semibold text-[#4a5568] mb-3 tracking-wider uppercase">Try a quick search</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {QUICK_TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); doSearch(term) }}
                  className="text-xs px-3.5 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(17,22,32,0.8)',
                    border: '1px solid rgba(30,37,53,0.8)',
                    color: '#8b9ab2',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,180,216,0.35)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#00b4d8'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(30,37,53,0.8)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#8b9ab2'
                  }}
                >
                  &ldquo;{term}&rdquo;
                </button>
              ))}
            </div>

            {/* Placeholder state */}
            <div className="text-center py-16 rounded-2xl"
              style={{ background: 'rgba(17,22,32,0.4)', border: '1px solid rgba(30,37,53,0.5)' }}>
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 animate-float"
                style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.12), rgba(124,58,237,0.08))', border: '1px solid rgba(0,180,216,0.15)' }}>
                🔍
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Search your entire library</h3>
              <p className="text-xs text-[#4a5568] max-w-xs mx-auto">
                Instantly surface any spoken word, decision, or commitment from every meeting you&apos;ve ever recorded.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {searched && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-5 pb-4"
              style={{ borderBottom: '1px solid rgba(30,37,53,0.6)' }}>
              {results.length > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">
                    {totalMatches} match{totalMatches !== 1 ? 'es' : ''}
                  </span>
                  <span className="text-xs text-[#4a5568]">across {results.length} meeting{results.length !== 1 ? 's' : ''}</span>
                  <span className="badge badge-cyan">{query}</span>
                </div>
              ) : (
                <span className="text-sm text-[#4a5568]">No matches found for &ldquo;{query}&rdquo;</span>
              )}
              <button onClick={() => { setQuery(''); setResults([]); setSearched(false) }}
                className="text-xs text-[#8b9ab2] hover:text-[#e8edf5] transition-colors flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16 rounded-2xl animate-scale-in"
                style={{ background: 'rgba(17,22,32,0.5)', border: '1px solid rgba(30,37,53,0.6)' }}>
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  🔍
                </div>
                <h3 className="text-sm font-bold text-white mb-2">No matches found</h3>
                <p className="text-xs text-[#4a5568] mb-4">Try searching for &ldquo;calendar&rdquo;, &ldquo;pricing&rdquo;, or a speaker name like &ldquo;Priya&rdquo;.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {QUICK_TERMS.slice(0, 3).map(t => (
                    <button key={t} onClick={() => { setQuery(t); doSearch(t) }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium text-[#00b4d8] transition-all hover:bg-[rgba(0,180,216,0.1)]"
                      style={{ border: '1px solid rgba(0,180,216,0.2)' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {results.map((result, ri) => (
                  <div key={result.meetingId} className="rounded-2xl overflow-hidden animate-fade-up"
                    style={{ animationDelay: `${ri * 80}ms`, background: 'rgba(17,22,32,0.7)', border: '1px solid rgba(30,37,53,0.7)' }}>
                    {/* Meeting header */}
                    <div className="flex items-center justify-between p-4"
                      style={{ borderBottom: '1px solid rgba(30,37,53,0.5)', background: 'rgba(10,14,22,0.5)' }}>
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-[#4a5568] mb-1">
                          <span>{platformIcon(result.platform)}</span>
                          <span className="capitalize">{result.platform}</span>
                          <span>·</span>
                          <span>{formatDate(new Date(result.meetingDate))}</span>
                          <span className="badge badge-cyan">{result.segments.length} match{result.segments.length !== 1 ? 'es' : ''}</span>
                        </div>
                        <Link href={`/meetings/${result.meetingId}`}
                          className="text-sm font-bold text-white hover:text-[#00b4d8] transition-colors">
                          {result.meetingTitle}
                        </Link>
                      </div>
                      <Link href={`/meetings/${result.meetingId}`}
                        className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-all hover:scale-[1.02]"
                        style={{
                          background: 'rgba(0,180,216,0.1)',
                          border: '1px solid rgba(0,180,216,0.2)',
                          color: '#00b4d8',
                        }}>
                        Open →
                      </Link>
                    </div>

                    {/* Segments */}
                    <div className="divide-y divide-[#1e2535]">
                      {result.segments.slice(0, 4).map((seg) => (
                        <Link key={seg.id} href={`/meetings/${result.meetingId}`}
                          className="flex items-start gap-3 p-4 transition-all hover:bg-[rgba(255,255,255,0.01)] block group">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                              style={{ background: `hsl(${(seg.speaker.charCodeAt(0) * 37) % 360}, 55%, 40%)` }}>
                              {seg.speaker.charAt(0)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-bold text-[#e8edf5]">{seg.speaker}</span>
                              <span className="font-mono text-[10px] text-[#00b4d8]">{formatDuration(Math.floor(seg.startTime))}</span>
                            </div>
                            <p className="text-xs text-[#8b9ab2] group-hover:text-[#c8d8e8] transition-colors leading-relaxed">
                              {highlight(seg.text, query)}
                            </p>
                          </div>
                          <svg className="w-3.5 h-3.5 text-[#4a5568] group-hover:text-[#00b4d8] flex-shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                      {result.segments.length > 4 && (
                        <Link href={`/meetings/${result.meetingId}`}
                          className="block p-3 text-center text-xs font-semibold text-[#00b4d8] hover:bg-[rgba(0,180,216,0.04)] transition-colors">
                          +{result.segments.length - 4} more matches — Open meeting →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

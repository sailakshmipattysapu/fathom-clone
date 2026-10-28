'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { formatDate, platformIcon } from '@/lib/utils'
import { formatDuration } from '@/lib/utils'
import Link from 'next/link'
import { toast } from 'sonner'

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
      <mark key={i} className="bg-yellow-100 text-yellow-900 rounded px-0.5">
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
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.results)
      }
    } catch {
      toast.error('Search failed')
    } finally {
      setLoading(false)
    }
  }, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      doSearch(query)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Search</h1>
        <p className="text-sm text-gray-500">Search across all your meeting transcripts</p>
      </div>

      {/* Search input */}
      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder='Search your meetings... (press Enter)'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full pl-12 pr-32 py-4 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
        <button
          onClick={() => doSearch(query)}
          disabled={loading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl disabled:opacity-50 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500 text-sm">
            Try different keywords or check your spelling.
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            Found {results.reduce((acc, r) => acc + r.segments.length, 0)} matches in {results.length} meeting{results.length !== 1 ? 's' : ''}
          </p>
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.meetingId} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <span>{platformIcon(result.platform)}</span>
                      <span className="capitalize">{result.platform}</span>
                      <span>·</span>
                      <span>{formatDate(new Date(result.meetingDate))}</span>
                    </div>
                    <Link
                      href={`/meetings/${result.meetingId}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {result.meetingTitle}
                    </Link>
                  </div>
                  <Link
                    href={`/meetings/${result.meetingId}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Open →
                  </Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {result.segments.map((seg) => (
                    <div key={seg.id} className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-gray-700">{seg.speaker}</span>
                        <span className="text-xs text-gray-400">
                          {formatDuration(seg.startTime)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {highlight(seg.text, query)}
                      </p>
                      <Link
                        href={`/meetings/${result.meetingId}`}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                        Jump to {formatDuration(seg.startTime)}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!searched && (
        <div className="text-center py-16 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm">Type something to search your meeting transcripts</p>
        </div>
      )}
    </div>
  )
}

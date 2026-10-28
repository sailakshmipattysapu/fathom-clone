'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { MeetingCard } from '@/components/meeting-card'
import { CalendarConnectBanner } from '@/components/calendar-connect-banner'
import { toast } from 'sonner'

interface Meeting {
  id: string
  title: string
  date: string
  duration: number
  platform: string
  attendees: Array<{ name: string; email: string; avatarUrl: string }>
  summary: { overview: string } | null
  _count: { transcript: number; actionItems: number; highlights: number }
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [calendarConnected, setCalendarConnected] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const fetchMeetings = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      const res = await fetch(`/api/meetings?${params}`)
      if (res.ok) {
        const data = await res.json()
        setMeetings(data.meetings)
      }
    } catch {
      toast.error('Failed to load meetings')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchMeetings()
  }, [fetchMeetings])

  async function handleSeedData() {
    setSeeding(true)
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      if (res.ok) {
        toast.success('Sample meetings loaded!')
        setCalendarConnected(true)
        fetchMeetings()
      } else {
        toast.error('Failed to load sample data')
      }
    } catch {
      toast.error('Failed to load sample data')
    } finally {
      setSeeding(false)
    }
  }

  async function handleConnectCalendar() {
    try {
      const res = await fetch('/api/calendar/connect', { method: 'POST' })
      if (res.ok) {
        setCalendarConnected(true)
        toast.success('Calendar connected!')
      }
    } catch {
      toast.error('Failed to connect calendar')
    }
  }

  const showBanner = !calendarConnected && meetings.length === 0 && !loading

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Loading...' : `${meetings.length} meeting${meetings.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          onClick={handleSeedData}
          disabled={seeding}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {seeding ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Load sample data
            </>
          )}
        </button>
      </div>

      {/* Calendar banner */}
      {showBanner && (
        <CalendarConnectBanner
          onConnect={handleConnectCalendar}
          onLoadSample={handleSeedData}
        />
      )}

      {/* Search */}
      {(meetings.length > 0 || search) && (
        <div className="relative mb-6">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search meetings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
      )}

      {/* Meetings list */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : meetings.length === 0 && !showBanner ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📹</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No meetings found</h3>
          <p className="text-gray-500 text-sm">
            {search ? 'Try a different search term.' : 'Connect your calendar or load sample data to get started.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  )
}

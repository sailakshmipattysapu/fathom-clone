'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { formatDuration, formatDate, formatTime, platformIcon } from '@/lib/utils'
import { TranscriptViewer } from '@/components/transcript-viewer'
import { VideoPlayer } from '@/components/video-player'
import { SummaryPanel } from '@/components/summary-panel'
import { ActionItemsPanel } from '@/components/action-items-panel'
import { HighlightsPanel } from '@/components/highlights-panel'
import { toast } from 'sonner'

interface MeetingData {
  id: string
  title: string
  date: string
  duration: number
  platform: string
  videoUrl: string | null
  attendees: Array<{ name: string; email: string; avatarUrl: string }>
  transcript: Array<{
    id: string
    speaker: string
    text: string
    startTime: number
    endTime: number
    order: number
  }>
  summary: {
    id: string
    template: string
    overview: string
    keyPoints: string[]
    decisions: string[]
    nextSteps: string[]
  } | null
  actionItems: Array<{
    id: string
    text: string
    assignee: string | null
    completed: boolean
  }>
  highlights: Array<{
    id: string
    title: string
    startTime: number
    endTime: number
    note: string | null
  }>
}

type Tab = 'summary' | 'actions' | 'highlights'

export default function MeetingDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [meeting, setMeeting] = useState<MeetingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('summary')
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const seekRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const res = await fetch(`/api/meetings/${id}`)
        if (res.ok) {
          const data = await res.json()
          setMeeting(data)
        } else {
          toast.error('Meeting not found')
        }
      } catch {
        toast.error('Failed to load meeting')
      } finally {
        setLoading(false)
      }
    }
    fetchMeeting()
  }, [id])

  const handleSeek = useCallback((time: number) => {
    if (seekRef.current) {
      seekRef.current(time)
    }
  }, [])

  const handleSummaryUpdate = useCallback((summary: MeetingData['summary']) => {
    setMeeting((prev) => prev ? { ...prev, summary } : prev)
  }, [])

  const handleActionItemToggle = useCallback(async (itemId: string, completed: boolean) => {
    setMeeting((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        actionItems: prev.actionItems.map((item) =>
          item.id === itemId ? { ...item, completed } : item
        ),
      }
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-gray-500">Loading meeting...</p>
        </div>
      </div>
    )
  }

  if (!meeting) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-5xl mb-4">😔</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Meeting not found</h3>
          <p className="text-gray-500 text-sm">This meeting may have been deleted.</p>
        </div>
      </div>
    )
  }

  const date = new Date(meeting.date)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top bar */}
      <div className="px-8 py-5 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>{platformIcon(meeting.platform)}</span>
              <span className="capitalize">{meeting.platform}</span>
              <span>·</span>
              <span>{formatDate(date)}</span>
              <span>·</span>
              <span>{formatTime(date)}</span>
              <span>·</span>
              <span>{formatDuration(meeting.duration)}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{meeting.title}</h1>
            {/* Attendees */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                {meeting.attendees.slice(0, 5).map((attendee, i) => (
                  <div
                    key={i}
                    title={attendee.name}
                    className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600 overflow-hidden"
                  >
                    {attendee.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={attendee.avatarUrl} alt={attendee.name} className="w-full h-full object-cover" />
                    ) : (
                      attendee.name[0]
                    )}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {meeting.attendees.map((a) => a.name).join(', ')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                try {
                  const res = await fetch(`/api/meetings/${id}/share`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                  })
                  if (res.ok) {
                    const data = await res.json()
                    navigator.clipboard.writeText(data.shareUrl)
                    toast.success('Share link copied to clipboard!')
                  }
                } catch {
                  toast.error('Failed to create share link')
                }
              }}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Video + Transcript */}
        <div className="flex-[3] flex flex-col overflow-hidden border-r border-gray-100">
          {/* Video player */}
          <div className="flex-shrink-0 bg-gray-900">
            <VideoPlayer
              videoUrl={meeting.videoUrl}
              title={meeting.title}
              onTimeUpdate={setCurrentTime}
              onSeekReady={(fn) => { seekRef.current = fn }}
            />
          </div>

          {/* Transcript */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Transcript</h2>
            </div>
            <TranscriptViewer
              segments={meeting.transcript}
              currentTime={currentTime}
              onSeek={handleSeek}
              meetingId={id}
              onHighlightCreated={(highlight) => {
                setMeeting((prev) =>
                  prev ? { ...prev, highlights: [...prev.highlights, highlight] } : prev
                )
              }}
            />
          </div>
        </div>

        {/* Right: Tabs */}
        <div className="flex-[2] flex flex-col overflow-hidden min-w-0">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 flex-shrink-0">
            {(
              [
                { id: 'summary', label: 'Summary' },
                { id: 'actions', label: `Actions (${meeting.actionItems.length})` },
                { id: 'highlights', label: `Highlights (${meeting.highlights.length})` },
              ] as { id: Tab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3.5 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'summary' && (
              <SummaryPanel
                meetingId={id}
                summary={meeting.summary}
                onSummaryUpdate={handleSummaryUpdate}
              />
            )}
            {activeTab === 'actions' && (
              <ActionItemsPanel
                items={meeting.actionItems}
                onToggle={handleActionItemToggle}
              />
            )}
            {activeTab === 'highlights' && (
              <HighlightsPanel
                highlights={meeting.highlights}
                onSeek={handleSeek}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

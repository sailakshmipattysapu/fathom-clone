'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDuration, formatDate, formatTime, platformIcon } from '@/lib/utils'
import { FathomHeader } from '@/components/fathom-header'
import { TranscriptViewer } from '@/components/transcript-viewer'
import { VideoPlayer } from '@/components/video-player'
import { SummaryPanel } from '@/components/summary-panel'
import { ActionItemsPanel } from '@/components/action-items-panel'
import { HighlightsPanel } from '@/components/highlights-panel'
import { SEED_MEETINGS } from '@/lib/seed-data'
import { toast } from 'sonner'

type Tab = 'summary' | 'actions' | 'highlights'

export default function MeetingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const idStr = (params?.id as string) || '1'
  const index = Math.max(0, parseInt(idStr, 10) - 1)
  const defaultMeeting = SEED_MEETINGS[index % SEED_MEETINGS.length]

  const [meeting, setMeeting] = useState<any>(defaultMeeting)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('summary')
  const [currentTime, setCurrentTime] = useState(0)
  const [showShareModal, setShowShareModal] = useState(false)
  const seekRef = useRef<((time: number) => void) | null>(null)

  // Fetch real meeting if API exists, else fall back to SEED_MEETINGS smoothly
  useEffect(() => {
    async function fetchMeeting() {
      try {
        const res = await fetch(`/api/meetings/${idStr}`)
        if (res.ok) {
          const data = await res.json()
          if (data && data.title) {
            setMeeting(data)
          }
        }
      } catch {
        // Fall back to seed data seamlessly
      }
    }
    fetchMeeting()
  }, [idStr])

  const handleSeek = useCallback((time: number) => {
    if (seekRef.current) {
      seekRef.current(time)
    }
  }, [])

  const handleSummaryUpdate = useCallback((summary: any) => {
    setMeeting((prev: any) => (prev ? { ...prev, summary } : prev))
  }, [])

  const handleActionItemToggle = useCallback((itemId: string, completed: boolean) => {
    setMeeting((prev: any) => {
      if (!prev) return prev
      return {
        ...prev,
        actionItems: prev.actionItems.map((item: any) =>
          item.id === itemId || item.text === itemId ? { ...item, completed } : item
        ),
      }
    })
  }, [])

  const handleAddHighlightFromPlayer = (timestamp: number) => {
    const newHighlight = {
      id: Date.now().toString(),
      title: `Moment captured at ${formatDuration(Math.floor(timestamp))}`,
      startTime: Math.max(0, timestamp - 5),
      endTime: timestamp + 15,
      note: 'Bookmarked during playback',
    }
    setMeeting((prev: any) => ({
      ...prev,
      highlights: [newHighlight, ...(prev?.highlights || [])],
    }))
    toast.success('Highlight moment saved!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00b4d8] border-t-transparent animate-spin" />
      </div>
    )
  }

  const date = new Date(meeting.date)
  const duration = meeting.duration || 180

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      <FathomHeader activeTab="My Calls" />

      {/* Breadcrumb & Meeting Top Bar */}
      <div className="px-6 py-3.5 bg-[#12161f] border-b border-[#21262d] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>←</span>
            <span>All Calls</span>
          </Link>
          <span className="text-gray-600">/</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">{platformIcon(meeting.platform)}</span>
            <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {meeting.title}
            </h1>
          </div>
          <span className="text-[11px] bg-[#21262d] text-gray-300 px-2 py-0.5 rounded font-mono">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>🔗</span>
            <span>Share Clip</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left (Player + Transcript) & Right (Summary + Actions + Highlights) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Player & Transcript */}
        <div className="flex-[3] flex flex-col border-r border-[#21262d] overflow-hidden min-h-[400px]">
          {/* Custom Video Player / Waveform visualizer */}
          <VideoPlayer
            videoUrl={meeting.videoUrl}
            title={meeting.title}
            duration={duration}
            currentSpeaker={meeting.attendees?.[0]?.name || 'Sarah Chen'}
            onTimeUpdate={setCurrentTime}
            onSeekReady={(fn) => {
              seekRef.current = fn
            }}
            onAddHighlight={handleAddHighlightFromPlayer}
          />

          {/* Transcript Viewer */}
          <div className="flex-1 overflow-y-auto">
            <TranscriptViewer
              segments={meeting.transcript || []}
              currentTime={currentTime}
              onSeek={handleSeek}
              meetingId={idStr}
              onHighlightCreated={(highlight) => {
                setMeeting((prev: any) => ({
                  ...prev,
                  highlights: [highlight, ...(prev?.highlights || [])],
                }))
              }}
            />
          </div>
        </div>

        {/* Right Column: Tabbed Intelligence Drawer */}
        <div className="flex-[2] flex flex-col bg-[#12161f] overflow-hidden min-w-[320px]">
          {/* Tabs */}
          <div className="flex border-b border-[#21262d] bg-[#0d1117] text-xs">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-3 text-center font-bold transition-colors border-b-2 ${
                activeTab === 'summary'
                  ? 'border-[#00b4d8] text-[#00b4d8] bg-[#12161f]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`flex-1 py-3 text-center font-bold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'actions'
                  ? 'border-[#00b4d8] text-[#00b4d8] bg-[#12161f]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span>Actions</span>
              <span className="bg-[#21262d] text-gray-300 text-[10px] px-1.5 py-0.2 rounded-full">
                {meeting.actionItems?.length || 0}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('highlights')}
              className={`flex-1 py-3 text-center font-bold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'highlights'
                  ? 'border-[#00b4d8] text-[#00b4d8] bg-[#12161f]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span>Highlights</span>
              <span className="bg-[#21262d] text-gray-300 text-[10px] px-1.5 py-0.2 rounded-full">
                {meeting.highlights?.length || 0}
              </span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'summary' && (
              <SummaryPanel
                meetingId={idStr}
                summary={meeting.summary}
                onSummaryUpdate={handleSummaryUpdate}
              />
            )}
            {activeTab === 'actions' && (
              <ActionItemsPanel
                items={meeting.actionItems || []}
                onToggle={handleActionItemToggle}
              />
            )}
            {activeTab === 'highlights' && (
              <HighlightsPanel
                highlights={meeting.highlights || []}
                onSeek={handleSeek}
              />
            )}
          </div>
        </div>
      </div>

      {/* Share Clip Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="text-lg font-bold mb-1">Share Meeting Clip</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Anyone with this link can view the recording, synchronized transcript, and AI summary without needing a Fathom account.
            </p>

            <div className="bg-[#0d1117] border border-[#30363d] p-2.5 rounded-xl flex items-center gap-2 mb-4">
              <input
                readOnly
                value={`https://fathom.video/share/${meeting.id || idStr}`}
                className="bg-transparent text-xs text-gray-300 w-full focus:outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://fathom.video/share/${meeting.id || idStr}`)
                  toast.success('Public share link copied!')
                  setShowShareModal(false)
                }}
                className="bg-[#00b4d8] text-black font-bold text-xs px-3.5 py-1.5 rounded-lg flex-shrink-0"
              >
                Copy
              </button>
            </div>

            <div className="text-[11px] text-gray-400 space-y-1.5">
              <p>✓ Viewer permissions: View only</p>
              <p>✓ Privacy: Attendee consent verified</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

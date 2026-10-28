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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-base)' }}
      >
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--cyan)', borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  const date = new Date(meeting.date)
  const duration = meeting.duration || 180

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'summary', label: 'Summary' },
    { id: 'actions', label: 'Actions', count: meeting.actionItems?.length || 0 },
    { id: 'highlights', label: 'Highlights', count: meeting.highlights?.length || 0 },
  ]

  return (
    <div
      className="min-h-screen text-white flex flex-col font-sans"
      style={{ background: 'var(--bg-base)' }}
    >
      <FathomHeader activeTab="My Calls" />

      {/* ── Premium Header Bar ── */}
      <div
        className="px-5 py-3 flex items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(180deg, rgba(17,22,32,0.98) 0%, rgba(12,16,24,0.95) 100%)',
          borderBottom: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: breadcrumb + title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Back button */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 shrink-0"
            style={{
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-subtle)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)'
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-default)'
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-subtle)'
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)'
            }}
          >
            <span>←</span>
            <span>All Calls</span>
          </Link>

          <span style={{ color: 'var(--border-default)' }}>/</span>

          {/* Platform icon + meeting title */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0">{platformIcon(meeting.platform)}</span>
            <h1
              className="text-sm sm:text-base font-bold truncate"
              style={{
                background: 'linear-gradient(135deg, #e8edf5 0%, #8b9ab2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {meeting.title}
            </h1>
          </div>

          {/* Metadata badges */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="badge badge-cyan">{formatDuration(duration)}</span>
            <span
              className="badge"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {formatDate(date)}
            </span>
          </div>
        </div>

        {/* Right: share button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="btn-primary text-xs px-4 py-2 flex items-center gap-2 shrink-0"
        >
          <span>🔗</span>
          <span>Share Clip</span>
        </button>
      </div>

      {/* ── Main Split Layout ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Left Column: Player + Transcript */}
        <div
          className="flex-[3] flex flex-col overflow-hidden min-h-[400px] animate-fade-up"
          style={{ borderRight: '1px solid var(--border-subtle)' }}
        >
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

        {/* Right Column: Tabbed Intelligence Panel */}
        <div
          className="flex-[2] flex flex-col overflow-hidden min-w-[320px] animate-fade-up delay-75"
          style={{ background: 'var(--bg-surface)' }}
        >
          {/* Pill Tab Switcher */}
          <div
            className="p-3 shrink-0"
            style={{
              background: 'rgba(6,10,16,0.6)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: 'var(--gradient-brand)',
                            color: '#000',
                            boxShadow: 'var(--shadow-cyan)',
                          }
                        : {
                            color: 'var(--text-secondary)',
                            background: 'transparent',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'
                    }}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                        style={
                          isActive
                            ? { background: 'rgba(0,0,0,0.25)', color: '#000' }
                            : { background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }
                        }
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'summary' && (
              <div className="animate-fade-up">
                <SummaryPanel
                  meetingId={idStr}
                  summary={meeting.summary}
                  onSummaryUpdate={handleSummaryUpdate}
                />
              </div>
            )}
            {activeTab === 'actions' && (
              <div className="animate-fade-up">
                <ActionItemsPanel
                  items={meeting.actionItems || []}
                  onToggle={handleActionItemToggle}
                />
              </div>
            )}
            {activeTab === 'highlights' && (
              <div className="animate-fade-up">
                <HighlightsPanel
                  highlights={meeting.highlights || []}
                  onSeek={handleSeek}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Share Clip Modal (glassmorphism) ── */}
      {showShareModal && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowShareModal(false)
          }}
        >
          <div
            className="animate-scale-in rounded-2xl max-w-md w-full p-6 relative"
            style={{
              background: 'rgba(17,22,32,0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,180,216,0.2)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,180,216,0.08)',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-200"
              style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'
              }}
            >
              ✕
            </button>

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
              style={{ background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-cyan)' }}
            >
              🔗
            </div>

            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Share Meeting Clip
            </h3>
            <p className="text-xs mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Anyone with this link can view the recording, synchronized transcript, and AI summary — no Fathom account needed.
            </p>

            {/* Link input row */}
            <div
              className="flex items-center gap-2 p-2 rounded-xl mb-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-default)',
              }}
            >
              <input
                readOnly
                value={`https://fathom.video/share/${meeting.id || idStr}`}
                className="bg-transparent text-xs flex-1 focus:outline-none"
                style={{ color: 'var(--text-secondary)' }}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://fathom.video/share/${meeting.id || idStr}`
                  )
                  toast.success('Public share link copied!')
                  setShowShareModal(false)
                }}
                className="btn-primary text-xs px-4 py-1.5 shrink-0"
              >
                Copy
              </button>
            </div>

            {/* Permissions info */}
            <div
              className="rounded-xl p-3 space-y-1.5 text-[11px]"
              style={{
                background: 'rgba(0,180,216,0.05)',
                border: '1px solid rgba(0,180,216,0.15)',
                color: 'var(--text-secondary)',
              }}
            >
              <p>✓ Viewer permissions: View only</p>
              <p>✓ Privacy: Attendee consent verified</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

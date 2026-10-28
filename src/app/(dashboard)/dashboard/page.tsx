'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FathomHeader } from '@/components/fathom-header'
import { AskFathomDrawer } from '@/components/ask-fathom-drawer'
import { TestCallModal } from '@/components/test-call-modal'
import { OnboardingTutorialModal } from '@/components/onboarding-tutorial-modal'
import { TeamCallsView } from '@/components/team-calls-view'
import { PlaylistsView } from '@/components/playlists-view'
import { DealsView } from '@/components/deals-view'
import { SEED_MEETINGS } from '@/lib/seed-data'
import { formatDuration, formatDate, platformIcon } from '@/lib/utils'

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabQuery = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState('My Calls')
  const [isAskFathomOpen, setIsAskFathomOpen] = useState(true)
  const [isTestCallOpen, setIsTestCallOpen] = useState(false)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [filterQuery, setFilterQuery] = useState('')
  const [autoRecord, setAutoRecord] = useState(true)
  const [autoShare, setAutoShare] = useState(true)

  useEffect(() => {
    if (tabQuery === 'team') setActiveTab('Team Calls')
    else if (tabQuery === 'playlists') setActiveTab('Playlists')
    else if (tabQuery === 'deals') setActiveTab('Deals')
    else if (tabQuery === 'alerts') setActiveTab('Alerts')
    else setActiveTab('My Calls')
  }, [tabQuery])

  const filteredMeetings = SEED_MEETINGS.filter((m) =>
    m.title.toLowerCase().includes(filterQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      {/* Top Header */}
      <FathomHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          if (tab === 'My Calls') router.push('/dashboard')
          else if (tab === 'Team Calls') router.push('/dashboard?tab=team')
          else if (tab === 'Playlists') router.push('/dashboard?tab=playlists')
          else if (tab === 'Deals') router.push('/dashboard?tab=deals')
          else if (tab === 'Alerts') router.push('/dashboard?tab=alerts')
        }}
        onSearch={(q) => setFilterQuery(q)}
        onOpenAskFathom={() => setIsAskFathomOpen(true)}
      />

      {/* Main Container + Right AI Drawer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Center Content */}
        <div className="flex-1 overflow-y-auto">
          {/* TAB 1: MY CALLS */}
          {activeTab === 'My Calls' && (
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
              {/* "LEARN HOW TO USE FATHOM" Section (From Screenshot 144442.png & 144335.png) */}
              <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    LEARN HOW TO USE FATHOM
                  </h2>
                  <span className="text-xs text-[#00b4d8] font-semibold flex items-center gap-1 cursor-pointer">
                    <span>⚡ Quick Onboarding</span>
                  </span>
                </div>

                {/* 3 Tutorial Cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Card 1: Self-Guided Tutorial */}
                  <div
                    onClick={() => setIsOnboardingOpen(true)}
                    className="group bg-[#0d1117] border border-[#21262d] hover:border-[#00b4d8] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <div className="aspect-video bg-gradient-to-tr from-cyan-900/40 to-blue-900/40 relative flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80"
                        alt="Tutorial"
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-[#00b4d8] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg">
                          📄
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs font-bold text-white group-hover:text-[#00b4d8] transition-colors">
                        Self-Guided Tutorial - 1 min
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Tutorial contains 6 interactive slides</p>
                    </div>
                  </div>

                  {/* Card 2: Start Test Call */}
                  <div
                    onClick={() => setIsTestCallOpen(true)}
                    className="group bg-[#0d1117] border border-[#00b4d8]/40 hover:border-[#00b4d8] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(0,180,216,0.1)]"
                  >
                    <div className="aspect-video bg-gradient-to-tr from-purple-900/40 to-cyan-900/40 relative flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                        alt="Test Call"
                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-[#00b4d8] text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xl animate-pulse">
                          ▶
                        </div>
                      </div>
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        LIVE DEMO
                      </span>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs font-bold text-[#00b4d8] group-hover:text-white transition-colors">
                        Start Test Call - 2 mins
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Don&apos;t worry, she&apos;s just a recording</p>
                    </div>
                  </div>

                  {/* Card 3: Attend Tips & Tricks Webinar */}
                  <div
                    onClick={() => alert('Webinar schedule: Every Tuesday and Thursday at 10 AM PT')}
                    className="group bg-[#0d1117] border border-[#21262d] hover:border-[#00b4d8] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <div className="aspect-video bg-gradient-to-tr from-emerald-900/40 to-cyan-900/40 relative flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80"
                        alt="Webinar"
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-[#00b4d8] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg">
                          📺
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs font-bold text-white group-hover:text-[#00b4d8] transition-colors">
                        Attend Tips & Tricks Webinar
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Live session on maximizing Fathom</p>
                    </div>
                  </div>
                </div>

                {/* Meeting Preferences Checkboxes (From Screenshot 144442.png) */}
                <div className="mt-6 pt-5 border-t border-[#21262d] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={autoRecord}
                        onChange={(e) => setAutoRecord(e.target.checked)}
                        className="w-4 h-4 rounded bg-[#0d1117] border-[#30363d] text-[#00b4d8] focus:ring-0"
                      />
                      <span>Fathom will auto-record starting with your next external meeting</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={autoShare}
                        onChange={(e) => setAutoShare(e.target.checked)}
                        className="w-4 h-4 rounded bg-[#0d1117] border-[#30363d] text-[#00b4d8] focus:ring-0"
                      />
                      <span>AI meeting summaries & recordings will be shared with attendees automatically.</span>
                    </label>
                  </div>

                  <Link
                    href="/settings"
                    className="text-[#00b4d8] hover:text-[#0096c7] font-semibold flex items-center gap-1 self-start sm:self-center"
                  >
                    <span>⚙️</span>
                    <span>Edit Settings</span>
                  </Link>
                </div>
              </div>

              {/* RECENT CALL RECORDINGS LIST */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">Your Call Recordings</h2>
                    <p className="text-xs text-gray-400">
                      Showing {filteredMeetings.length} recorded meetings with AI summaries and transcripts
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Live Test Call Trigger */}
                    <button
                      onClick={() => setIsTestCallOpen(true)}
                      className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <span>📹</span>
                      <span>Start Test Call</span>
                    </button>
                  </div>
                </div>

                {/* Meetings Cards Grid */}
                <div className="grid gap-4">
                  {filteredMeetings.map((meeting, index) => {
                    const meetingId = (index + 1).toString()
                    return (
                      <div
                        key={meeting.title}
                        className="bg-[#12161f] border border-[#21262d] hover:border-[#00b4d8]/60 rounded-xl p-4 sm:p-5 transition-all hover:bg-[#151a24] group shadow-lg"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Left: Meeting Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                              <span>{platformIcon(meeting.platform)}</span>
                              <span className="capitalize">{meeting.platform}</span>
                              <span>·</span>
                              <span>{formatDate(new Date(meeting.date))}</span>
                              <span>·</span>
                              <span className="bg-[#21262d] text-gray-300 px-2 py-0.5 rounded font-mono">
                                {formatDuration(meeting.duration)}
                              </span>
                              {meeting.attendees.length >= 6 && (
                                <span className="bg-[#00b4d8]/10 text-[#00b4d8] border border-[#00b4d8]/30 px-2 py-0.5 rounded font-bold text-[10px]">
                                  8-PERSON ALL HANDS
                                </span>
                              )}
                            </div>

                            <Link
                              href={`/meetings/${meetingId}`}
                              className="text-base font-bold text-white group-hover:text-[#00b4d8] transition-colors"
                            >
                              {meeting.title}
                            </Link>

                            {/* Summary preview */}
                            <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                              {meeting.summary.overview}
                            </p>

                            {/* Attendees Avatars */}
                            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#21262d]">
                              <div className="flex -space-x-2">
                                {meeting.attendees.slice(0, 5).map((att, i) => (
                                  <div
                                    key={i}
                                    title={att.name}
                                    className="w-6 h-6 rounded-full bg-[#21262d] border border-[#0d1117] flex items-center justify-center text-[10px] font-bold text-[#00b4d8]"
                                  >
                                    {att.name.charAt(0)}
                                  </div>
                                ))}
                                {meeting.attendees.length > 5 && (
                                  <div className="w-6 h-6 rounded-full bg-[#161b22] border border-[#0d1117] flex items-center justify-center text-[9px] text-gray-300">
                                    +{meeting.attendees.length - 5}
                                  </div>
                                )}
                              </div>
                              <span className="text-[11px] text-gray-400">
                                {meeting.attendees.map((a) => a.name).join(', ')}
                              </span>
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[#21262d]">
                            <div className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full font-semibold">
                              ✓ {meeting.actionItems.length} Action Items
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <Link
                                href={`/meetings/${meetingId}`}
                                className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all"
                              >
                                View Recording & Notes →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEAM CALLS */}
          {activeTab === 'Team Calls' && <TeamCallsView />}

          {/* TAB 3: PLAYLISTS */}
          {activeTab === 'Playlists' && <PlaylistsView />}

          {/* TAB 4: DEALS */}
          {activeTab === 'Deals' && <DealsView />}

          {/* TAB 5: ALERTS */}
          {activeTab === 'Alerts' && (
            <div className="p-8 max-w-4xl mx-auto text-white">
              <h2 className="text-2xl font-bold mb-2">Meeting Alerts & Mentions</h2>
              <p className="text-xs text-gray-400 mb-6">
                Receive instant notifications when competitor names, pricing discussions, or customer risks are mentioned.
              </p>
              <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0d1117] rounded-xl border border-[#21262d]">
                  <div>
                    <h3 className="text-sm font-bold text-white">Competitor Mentions</h3>
                    <p className="text-xs text-gray-400">Alerts when competitors or alternative tools are referenced</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded font-semibold">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0d1117] rounded-xl border border-[#21262d]">
                  <div>
                    <h3 className="text-sm font-bold text-white">Objection & Churn Risk</h3>
                    <p className="text-xs text-gray-400">Trigger Slack alert when pricing friction is detected</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded font-semibold">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right "Ask FATHOM" AI Drawer (Matches Screenshot 144353.png & 144442.png) */}
        <AskFathomDrawer
          isOpen={isAskFathomOpen}
          onToggle={() => setIsAskFathomOpen(!isAskFathomOpen)}
        />
      </div>

      {/* Floating Onboarding Helper Avatar in Bottom Left (From Screenshot 144335.png & 144442.png) */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsOnboardingOpen(true)}
          className="relative group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xl glow-cyan">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
              alt="Fathom Assistant"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-[#00b4d8] text-black text-[9px] font-bold px-1 rounded-full border border-black">
            AI
          </span>
        </button>

        {/* Speech Bubble */}
        <div
          onClick={() => setIsOnboardingOpen(true)}
          className="bg-[#161b22] border border-[#30363d] text-xs font-semibold text-gray-200 px-3.5 py-2 rounded-xl shadow-2xl cursor-pointer hover:border-[#00b4d8] hover:text-white transition-all flex items-center gap-2 select-none"
        >
          <span>Start your onboarding here!</span>
          <span className="text-[#00b4d8]">→</span>
        </div>
      </div>

      {/* Interactive Modals */}
      <TestCallModal isOpen={isTestCallOpen} onClose={() => setIsTestCallOpen(false)} />
      <OnboardingTutorialModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartTestCall={() => {
          setIsOnboardingOpen(false)
          setIsTestCallOpen(true)
        }}
      />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0e14] text-white p-8">Loading Fathom workspace...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

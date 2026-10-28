'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

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
    <div className="min-h-screen dashboard-gradient text-white flex flex-col font-sans">
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

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">

          {/* MY CALLS TAB */}
          {activeTab === 'My Calls' && (
            <div className={`max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>

              {/* Onboarding Section */}
              <div className="rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(17,22,32,0.95) 0%, rgba(12,16,24,0.98) 100%)',
                  border: '1px solid rgba(30,37,53,0.8)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                {/* Section header */}
                <div className="px-6 pt-5 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(124,58,237,0.15))', border: '1px solid rgba(0,180,216,0.2)' }}>
                      <svg className="w-4 h-4 text-[#00b4d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xs font-black uppercase tracking-widest text-[#8b9ab2]">LEARN HOW TO USE FATHOM</h2>
                    </div>
                  </div>
                  <button onClick={() => setIsOnboardingOpen(true)}
                    className="text-[11px] font-semibold text-[#00b4d8] hover:text-[#48cae4] transition-colors flex items-center gap-1">
                    <span>⚡</span> Quick Onboarding
                  </button>
                </div>

                {/* Tutorial Cards */}
                <div className="px-6 pb-5 grid sm:grid-cols-3 gap-3">
                  {/* Card 1: Tutorial */}
                  <div onClick={() => setIsOnboardingOpen(true)}
                    className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{ border: '1px solid rgba(30,37,53,0.8)', background: 'rgba(8,12,20,0.6)' }}>
                    <div className="aspect-video relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80"
                        alt="Tutorial" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(8,12,20,0.9) 0%, transparent 60%)' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-base shadow-xl transition-transform duration-300 group-hover:scale-110"
                          style={{ background: 'linear-gradient(135deg, #00b4d8, #0096c7)', boxShadow: '0 0 20px rgba(0,180,216,0.4)' }}>
                          📄
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs font-bold text-white group-hover:text-[#00b4d8] transition-colors">Self-Guided Tutorial · 1 min</p>
                      <p className="text-[10px] text-[#4a5568] mt-0.5">6 interactive slides</p>
                    </div>
                  </div>

                  {/* Card 2: Test Call */}
                  <div onClick={() => setIsTestCallOpen(true)}
                    className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      border: '1px solid rgba(0,180,216,0.3)',
                      background: 'rgba(8,12,20,0.6)',
                      boxShadow: '0 0 20px rgba(0,180,216,0.06)',
                    }}>
                    <div className="aspect-video relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                        alt="Test Call" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(8,12,20,0.9) 0%, transparent 60%)' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110"
                          style={{ background: 'linear-gradient(135deg, #00b4d8, #0096c7)', boxShadow: '0 0 25px rgba(0,180,216,0.5)' }}>
                          <span className="text-black font-black text-sm">▶</span>
                        </div>
                      </div>
                      <span className="absolute top-2.5 right-2.5 text-[9px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: '#ef4444', color: 'white', boxShadow: '0 0 10px rgba(239,68,68,0.4)' }}>
                        LIVE DEMO
                      </span>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs font-bold text-[#00b4d8] group-hover:text-white transition-colors">Start Test Call · 2 mins</p>
                      <p className="text-[10px] text-[#4a5568] mt-0.5">Don&apos;t worry, she&apos;s a recording</p>
                    </div>
                  </div>

                  {/* Card 3: Webinar */}
                  <div onClick={() => alert('Webinar: Every Tuesday & Thursday at 10 AM PT')}
                    className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{ border: '1px solid rgba(30,37,53,0.8)', background: 'rgba(8,12,20,0.6)' }}>
                    <div className="aspect-video relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80"
                        alt="Webinar" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(8,12,20,0.9) 0%, transparent 60%)' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-base shadow-xl transition-transform duration-300 group-hover:scale-110"
                          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
                          📺
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs font-bold text-white group-hover:text-[#10b981] transition-colors">Tips &amp; Tricks Webinar</p>
                      <p className="text-[10px] text-[#4a5568] mt-0.5">Live session · Free to join</p>
                    </div>
                  </div>
                </div>

                {/* Preferences Row */}
                <div className="px-6 pb-5 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ borderColor: 'rgba(30,37,53,0.6)' }}>
                  <div className="space-y-3">
                    {[
                      { id: 'autoRecord', checked: autoRecord, setter: setAutoRecord, label: 'Auto-record starting with your next external meeting' },
                      { id: 'autoShare', checked: autoShare, setter: setAutoShare, label: 'Auto-share AI summaries & recordings with attendees' },
                    ].map(item => (
                      <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`toggle-track ${item.checked ? 'on' : ''}`} onClick={() => item.setter(!item.checked)}>
                          <div className="toggle-thumb" />
                        </div>
                        <span className="text-xs text-[#8b9ab2] group-hover:text-[#e8edf5] transition-colors">{item.label}</span>
                      </label>
                    ))}
                  </div>
                  <Link href="/settings" className="flex items-center gap-1.5 text-[11px] text-[#00b4d8] hover:text-[#48cae4] font-semibold transition-colors whitespace-nowrap">
                    <span>⚙️</span> Edit Settings
                  </Link>
                </div>
              </div>

              {/* Calls Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Your Call Recordings</h2>
                  <p className="text-xs text-[#4a5568] mt-1">
                    {filteredMeetings.length} meetings with AI summaries & transcripts
                  </p>
                </div>
                <button
                  onClick={() => setIsTestCallOpen(true)}
                  className="btn-primary flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl"
                >
                  <span>📹</span>
                  <span>Start Test Call</span>
                </button>
              </div>

              {/* Meeting Cards */}
              <div className="space-y-3">
                {filteredMeetings.length === 0 ? (
                  /* Empty State */
                  <div className="text-center py-20 animate-fade-up">
                    <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-6 animate-float"
                      style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(124,58,237,0.1))', border: '1px solid rgba(0,180,216,0.2)' }}>
                      🔍
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">No recordings found</h3>
                    <p className="text-sm text-[#4a5568] mb-6">Try a different search or start a test call</p>
                    <button onClick={() => setIsTestCallOpen(true)} className="btn-primary px-6 py-2.5 text-sm font-bold rounded-xl">
                      Start Test Call
                    </button>
                  </div>
                ) : (
                  filteredMeetings.map((meeting, index) => {
                    const meetingId = (index + 1).toString()
                    const isLarge = meeting.attendees.length >= 6
                    return (
                      <div
                        key={meeting.title}
                        className="meeting-card p-5 animate-fade-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Left: Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-2 text-[10px] text-[#4a5568] mb-2">
                              <span className="text-sm">{platformIcon(meeting.platform)}</span>
                              <span className="capitalize font-medium text-[#8b9ab2]">{meeting.platform}</span>
                              <span className="text-[#1e2535]">·</span>
                              <span>{formatDate(new Date(meeting.date))}</span>
                              <span className="text-[#1e2535]">·</span>
                              <span className="font-mono px-1.5 py-0.5 rounded-md font-semibold"
                                style={{ background: 'rgba(30,37,53,0.8)', color: '#8b9ab2' }}>
                                {formatDuration(meeting.duration)}
                              </span>
                              {isLarge && (
                                <span className="badge badge-cyan">8-PERSON ALL HANDS</span>
                              )}
                            </div>

                            <Link href={`/meetings/${meetingId}`}
                              className="block text-sm font-bold text-white hover:text-[#00b4d8] transition-colors duration-200 truncate">
                              {meeting.title}
                            </Link>

                            <p className="text-xs text-[#4a5568] mt-1.5 leading-relaxed line-clamp-2">
                              {meeting.summary.overview}
                            </p>

                            {/* Attendees */}
                            <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(30,37,53,0.6)' }}>
                              <div className="flex -space-x-1.5">
                                {meeting.attendees.slice(0, 5).map((att, i) => (
                                  <div
                                    key={i}
                                    title={att.name}
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2"
                                    style={{
                                      background: `hsl(${(att.name.charCodeAt(0) * 37) % 360}, 60%, 40%)`,
                                      borderColor: '#111620',
                                    }}
                                  >
                                    {att.name.charAt(0)}
                                  </div>
                                ))}
                                {meeting.attendees.length > 5 && (
                                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-[#8b9ab2] border-2"
                                    style={{ background: '#1a2030', borderColor: '#111620' }}>
                                    +{meeting.attendees.length - 5}
                                  </div>
                                )}
                              </div>
                              <span className="text-[10px] text-[#4a5568] truncate">
                                {meeting.attendees.slice(0, 3).map(a => a.name).join(', ')}
                                {meeting.attendees.length > 3 && ` +${meeting.attendees.length - 3}`}
                              </span>
                            </div>
                            
                          </div>

                          {/* Right: Actions */}
                          <div className="flex md:flex-col items-center md:items-end gap-3 justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 flex-shrink-0"
                            style={{ borderColor: 'rgba(30,37,53,0.6)' }}>
                            <div className="badge badge-emerald">
                              ✓ {meeting.actionItems.length} Action Items
                            </div>
                            <Link href={`/meetings/${meetingId}`}
                              className="btn-primary flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-black rounded-xl whitespace-nowrap">
                              <span>View Notes</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'Team Calls' && <TeamCallsView />}
          {activeTab === 'Playlists' && <PlaylistsView />}
          {activeTab === 'Deals' && <DealsView />}

          {/* ALERTS TAB */}
          {activeTab === 'Alerts' && (
            <div className="p-6 lg:p-8 max-w-3xl mx-auto animate-fade-up">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white mb-1">Meeting Alerts & Mentions</h2>
                <p className="text-sm text-[#4a5568]">
                  Get instant notifications when keywords, competitors, or risks are mentioned in any call.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(30,37,53,0.8)', background: 'rgba(17,22,32,0.6)' }}>
                <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'rgba(30,37,53,0.6)' }}>
                  <span className="text-xs font-black uppercase tracking-widest text-[#4a5568]">ACTIVE ALERT RULES</span>
                  <button className="btn-primary text-xs font-bold px-3 py-1.5 rounded-lg">+ New Alert</button>
                </div>
                <div className="divide-y divide-[#1e2535]">
                  {[
                    { name: 'Competitor Mentions', desc: 'Alerts when competitors are referenced in calls', status: 'ACTIVE', color: '#10b981' },
                    { name: 'Objection & Churn Risk', desc: 'Trigger Slack alert when pricing friction is detected', status: 'ACTIVE', color: '#10b981' },
                    { name: 'Budget Discussion', desc: 'Flag any mention of pricing or budgetary concerns', status: 'PAUSED', color: '#f59e0b' },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                      <div>
                        <h3 className="text-sm font-bold text-white">{alert.name}</h3>
                        <p className="text-xs text-[#4a5568] mt-0.5">{alert.desc}</p>
                      </div>
                      <span className="badge" style={{
                        background: `rgba(${alert.color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.12)`,
                        color: alert.color,
                        border: `1px solid rgba(${alert.color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.25)`,
                      }}>
                        {alert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ask FATHOM Right Drawer */}
        <AskFathomDrawer
          isOpen={isAskFathomOpen}
          onToggle={() => setIsAskFathomOpen(!isAskFathomOpen)}
        />
      </div>

      {/* Floating Onboarding Helper */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsOnboardingOpen(true)}
          className="relative group"
        >
          <div className="w-12 h-12 rounded-full p-[2px] glow-cyan"
            style={{ background: 'linear-gradient(135deg, #00b4d8, #7c3aed)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
              alt="Fathom Assistant" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 text-[8px] font-black px-1 rounded-full"
            style={{ background: '#00b4d8', color: '#000', border: '2px solid #060a10' }}>
            AI
          </span>
        </button>

        <div onClick={() => setIsOnboardingOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          style={{
            background: 'rgba(17,22,32,0.95)',
            border: '1px solid rgba(30,37,53,0.9)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          }}>
          <span className="text-xs font-semibold text-[#e8edf5]">Start your onboarding here!</span>
          <span className="text-[#00b4d8] font-bold">→</span>
        </div>
      </div>

      <TestCallModal isOpen={isTestCallOpen} onClose={() => setIsTestCallOpen(false)} />
      <OnboardingTutorialModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartTestCall={() => { setIsOnboardingOpen(false); setIsTestCallOpen(true) }}
      />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen dashboard-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4 animate-float"
            style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(124,58,237,0.15))', border: '1px solid rgba(0,180,216,0.2)' }}>
            <span className="text-[#00b4d8] font-black text-xl">F</span>
          </div>
          <div className="flex gap-1 justify-center">
            <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
          </div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}

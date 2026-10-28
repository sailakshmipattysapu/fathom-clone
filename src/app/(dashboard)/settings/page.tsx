'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FathomHeader } from '@/components/fathom-header'

// Reusable toggle using the CSS classes from globals.css
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`toggle-track${on ? ' on' : ''}`}
      aria-checked={on}
      role="switch"
    >
      <span className="toggle-thumb" />
    </button>
  )
}

// Section header with gradient icon
function SectionHeader({
  icon,
  label,
  badge,
}: {
  icon: string
  label: string
  badge?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
          style={{ background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-cyan)' }}
        >
          {icon}
        </div>
        <h2 className="text-[11px] uppercase tracking-[0.12em] font-bold" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </h2>
      </div>
      {badge}
    </div>
  )
}

// Premium dark select
function DarkSelect({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-field text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
      style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
    >
      {children}
    </select>
  )
}

// Setting row inside a card
function SettingRow({
  label,
  description,
  control,
  borderTop = true,
}: {
  label: React.ReactNode
  description?: string
  control: React.ReactNode
  borderTop?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${borderTop ? 'border-t' : ''}`}
      style={borderTop ? { borderColor: 'var(--border-subtle)' } : {}}
    >
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
          {label}
        </div>
        {description && (
          <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  )
}

export default function SettingsPage() {
  const [botName, setBotName] = useState("sailakshmi's Fathom Notetaker")
  const [isEditingBot, setIsEditingBot] = useState(false)
  const [autoRecordScope, setAutoRecordScope] = useState('All meetings')
  const [autoShareScope, setAutoShareScope] = useState('Summary & recording')
  const [shareAudience, setShareAudience] = useState('with attendees')

  const [zoomEnhanced, setZoomEnhanced] = useState(false)
  const [zoomUnscheduled, setZoomUnscheduled] = useState(false)
  const [meetUnscheduled, setMeetUnscheduled] = useState(false)
  const [autoActionItems, setAutoActionItems] = useState(true)
  const [recordingBanner, setRecordingBanner] = useState(true)
  const [autoConsent, setAutoConsent] = useState(false)
  const [inMeetingChat, setInMeetingChat] = useState(true)
  const [anonymizedData, setAnonymizedData] = useState(true)

  const [showSupportBot, setShowSupportBot] = useState(true)
  const [supportMessage, setSupportMessage] = useState('')

  return (
    <div
      className="min-h-screen text-white flex flex-col font-sans dashboard-gradient"
      style={{ background: 'var(--bg-base)' }}
    >
      <FathomHeader activeTab="Settings" />

      <div className="max-w-3xl mx-auto w-full px-4 py-8 space-y-8">

        {/* ── Auto-record / Auto-share pill bar ── */}
        <div
          className="animate-fade-up glass-card rounded-2xl px-5 py-4 flex flex-wrap items-center justify-center gap-3 text-xs"
          style={{
            background: 'linear-gradient(135deg, rgba(0,180,216,0.06) 0%, rgba(124,58,237,0.04) 100%)',
            border: '1px solid rgba(0,180,216,0.18)',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Auto-record</span>
          <DarkSelect value={autoRecordScope} onChange={setAutoRecordScope}>
            <option>All meetings</option>
            <option>External meetings only</option>
            <option>Internal meetings only</option>
          </DarkSelect>

          <span style={{ color: 'var(--text-secondary)' }}>and auto-share</span>
          <DarkSelect value={autoShareScope} onChange={setAutoShareScope}>
            <option>Summary &amp; recording</option>
            <option>Summary only</option>
            <option>Recording only</option>
          </DarkSelect>

          <DarkSelect value={shareAudience} onChange={setShareAudience}>
            <option>with attendees</option>
            <option>with team members only</option>
            <option>only with me</option>
          </DarkSelect>
        </div>

        {/* ── 1. VIDEO CONFERENCING ── */}
        <div className="animate-fade-up delay-75">
          <SectionHeader icon="🎥" label="Video Conferencing" />

          <div className="space-y-3">
            {/* Zoom */}
            <div
              className="glass-card card-hover rounded-2xl p-5 space-y-0"
              style={{ borderRadius: '16px' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{ background: 'linear-gradient(135deg,#2d8cff,#1a5fb4)', boxShadow: '0 0 12px rgba(45,140,255,0.35)' }}
                  >
                    📹
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      Zoom
                      <span className="badge badge-emerald ml-2">Fully Enabled</span>
                    </h3>
                  </div>
                </div>
              </div>

              <SettingRow
                label="Enhanced Recording"
                description="Record gallery mode with improved quality"
                control={<Toggle on={zoomEnhanced} onToggle={() => setZoomEnhanced(!zoomEnhanced)} />}
              />
              <SettingRow
                label="Auto-capture unscheduled Zoom meetings"
                control={<Toggle on={zoomUnscheduled} onToggle={() => setZoomUnscheduled(!zoomUnscheduled)} />}
              />
            </div>

            {/* Google Meet */}
            <div className="glass-card card-hover rounded-2xl p-5" style={{ borderRadius: '16px' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{ background: 'linear-gradient(135deg,#34a853,#188038)', boxShadow: '0 0 12px rgba(52,168,83,0.35)' }}
                  >
                    🟢
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex flex-wrap items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      Google Meet
                      <span className="badge badge-amber">Partially Enabled</span>
                    </h3>
                    <p className="text-[11px] mt-0.5 max-w-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      Limited to scheduled desktop calls. Install Chrome extension for full support.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert('Opening Chrome Web Store...')}
                  className="btn-ghost text-[11px] font-semibold px-3 py-1.5 flex items-center gap-1.5 shrink-0"
                  style={{ color: 'var(--cyan)', borderColor: 'rgba(0,180,216,0.35)' }}
                >
                  Install Extension ⤓
                </button>
              </div>

              <SettingRow
                label="Auto-capture unscheduled Google Meet meetings"
                control={<Toggle on={meetUnscheduled} onToggle={() => setMeetUnscheduled(!meetUnscheduled)} />}
              />
            </div>

            {/* Microsoft Teams */}
            <div className="glass-card card-hover rounded-2xl p-5" style={{ borderRadius: '16px' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                  style={{ background: 'linear-gradient(135deg,#6264a7,#4b4d8c)', boxShadow: '0 0 12px rgba(98,100,167,0.35)' }}
                >
                  🟣
                </div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Microsoft Teams
                  <span className="badge badge-emerald ml-2">Fully Enabled</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. PREMIUM FEATURES ── */}
        <div className="animate-fade-up delay-150">
          <SectionHeader
            icon="✨"
            label="Premium Features"
            badge={
              <span className="badge badge-amber text-[10px]">
                🎁 30 days left in free preview
              </span>
            }
          />

          <div className="glass-card rounded-2xl p-5" style={{ borderRadius: '16px' }}>
            {/* Bot Name */}
            <div className="flex items-center justify-between gap-4 pb-3">
              <div>
                <p className="text-xs font-bold flex flex-wrap items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  🤖 Bot Name:
                  <span style={{ color: 'var(--cyan)', fontFamily: 'monospace' }}>{botName}</span>
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  The name attendees see when Fathom joins your call.
                </p>
              </div>
              <button
                onClick={() => setIsEditingBot(true)}
                className="btn-ghost text-xs px-3 py-1.5"
              >
                Edit ✎
              </button>
            </div>

            <SettingRow
              label={
                <span className="flex items-center gap-2">
                  ✨ Auto-Generate Action Items
                  <span className="badge badge-cyan">Recommended</span>
                </span>
              }
              description="Fathom AI automatically extracts action items from your meetings."
              control={<Toggle on={autoActionItems} onToggle={() => setAutoActionItems(!autoActionItems)} />}
            />

            <SettingRow
              label="Default Meeting Summary Template"
              description="External meetings only. Attendees always see the Enhanced template when you share."
              control={
                <DarkSelect value="Enhanced (Default)" onChange={() => {}}>
                  <option>Enhanced (Default)</option>
                  <option>Sales (BANT &amp; Objections)</option>
                  <option>Engineering Technical Sync</option>
                  <option>1-on-1 Feedback</option>
                </DarkSelect>
              }
            />

            <SettingRow
              label="Recording Notification Banner"
              description="Displays recording consent notice to attendees upon joining."
              control={<Toggle on={recordingBanner} onToggle={() => setRecordingBanner(!recordingBanner)} />}
            />

            <SettingRow
              label="Auto-consent to Recording"
              description="Automatically accept recording consent on your behalf."
              control={<Toggle on={autoConsent} onToggle={() => setAutoConsent(!autoConsent)} />}
            />

            <SettingRow
              label="In-meeting Chat Capture"
              description="Save chat messages alongside your transcript."
              control={<Toggle on={inMeetingChat} onToggle={() => setInMeetingChat(!inMeetingChat)} />}
            />

            <SettingRow
              label="Anonymized Data Sharing"
              description="Contribute anonymous usage data to improve Fathom AI."
              control={<Toggle on={anonymizedData} onToggle={() => setAnonymizedData(!anonymizedData)} />}
            />
          </div>
        </div>

        {/* ── 3. INTEGRATIONS ── */}
        <div className="animate-fade-up delay-200">
          <SectionHeader icon="⚡" label="Integrations" />

          <div className="glass-card rounded-2xl overflow-hidden divide-y divide-[#1e2535]" style={{ borderRadius: '16px' }}>
            {[
              {
                emoji: '🤖',
                name: 'Claude AI',
                desc: 'Ask anything about your meetings using Anthropic Claude',
                action: () => alert('Claude API is integrated! Provide ANTHROPIC_API_KEY in .env'),
                actionLabel: 'Configured ✓',
                actionVariant: 'cyan' as const,
              },
              {
                emoji: '🧠',
                name: 'ChatGPT',
                desc: 'Query meeting history and transcripts with OpenAI',
                action: () => {},
                actionLabel: 'Connect',
                actionVariant: 'ghost' as const,
              },
              {
                emoji: '💬',
                name: 'Slack',
                desc: 'Automatically send meeting highlights to Slack channels in real-time',
                action: () => {},
                actionLabel: 'Connect',
                actionVariant: 'ghost' as const,
              },
              {
                emoji: '☁️',
                name: 'Salesforce',
                desc: 'Sync summaries & highlights to Contacts, Accounts, and Opportunities',
                action: () => {},
                actionLabel: 'Connect',
                actionVariant: 'ghost' as const,
              },
              {
                emoji: '🟧',
                name: 'HubSpot',
                desc: 'Sync summaries & highlights to Contacts, Companies, and Deals',
                action: () => {},
                actionLabel: 'Connect',
                actionVariant: 'ghost' as const,
              },
              {
                emoji: '⚡',
                name: 'MCP Server',
                desc: 'Connect Fathom to external tools for real-time context and actions',
                action: () => {},
                actionLabel: 'Set Up ↗',
                actionVariant: 'cyan' as const,
              },
            ].map(({ emoji, name, desc, action, actionLabel, actionVariant }) => (
              <div
                key={name}
                className="p-4 flex items-center justify-between gap-4 transition-all duration-200"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <h4 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{name}</h4>
                    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                  </div>
                </div>
                <button
                  onClick={action}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-all duration-200 ${
                    actionVariant === 'cyan'
                      ? 'btn-ghost'
                      : 'btn-ghost'
                  }`}
                  style={
                    actionVariant === 'cyan'
                      ? { color: 'var(--cyan)', borderColor: 'rgba(0,180,216,0.35)' }
                      : { color: 'var(--text-secondary)' }
                  }
                >
                  {actionLabel}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. HIGHLIGHT OPTIONS ── */}
        <div className="animate-fade-up delay-300">
          <SectionHeader icon="🏷️" label="Highlight Options" />

          <div className="glass-card rounded-2xl p-5 space-y-2.5" style={{ borderRadius: '16px' }}>
            {[
              { label: 'HIGHLIGHT', color: 'var(--cyan)', bg: 'rgba(0,180,216,0.1)', border: 'rgba(0,180,216,0.35)', isDefault: true },
              { label: 'POSITIVE REACTION', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.35)' },
              { label: 'NEEDS REVIEW', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.35)' },
              { label: 'FEEDBACK', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.35)' },
            ].map(({ label, color, bg, border, isDefault }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200"
                style={{ color, background: bg, border: `1px solid ${border}` }}
              >
                <span>{label}</span>
                {isDefault ? (
                  <span className="text-[10px] font-semibold opacity-60">Default</span>
                ) : (
                  <button
                    onClick={() => alert(`Remove ${label}?`)}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => alert('New highlight category created!')}
              className="text-xs font-semibold pt-1 flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)' }}
            >
              + ADD MORE
            </button>
          </div>
        </div>

        {/* ── 5. DELETE ACCOUNT ── */}
        <div
          className="animate-fade-up delay-400 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '16px',
          }}
        >
          <div>
            <h3 className="text-sm font-bold badge-red" style={{ color: '#ef4444' }}>DELETE ACCOUNT</h3>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Permanent action — all recordings, transcripts, and AI summaries will be erased.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete your account?')) {
                alert('Account deletion request acknowledged.')
              }
            }}
            className="text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 shrink-0"
            style={{ background: '#ef4444', color: 'white' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#dc2626' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#ef4444' }}
          >
            Delete Account 🗑
          </button>
        </div>
      </div>

      {/* ── Floating Support Widget ── */}
      {showSupportBot && (
        <div
          className="fixed bottom-6 right-6 z-40 w-80 shadow-2xl overflow-hidden animate-scale-in"
          style={{
            background: 'rgba(17,22,32,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,180,216,0.12)',
          }}
        >
          {/* Header */}
          <div
            className="p-3.5 flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg,rgba(0,180,216,0.12) 0%,rgba(124,58,237,0.06) 100%)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-cyan)' }}
              >
                🌊
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Fathom Support</p>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>We&apos;re here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setShowSupportBot(false)}
              className="text-sm w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'white'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)' }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3" style={{ background: 'rgba(12,16,24,0.8)' }}>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Fathom Support Bot:</span>{' '}
              Hey there 👋 How can we help you today?
            </p>

            <div className="space-y-1.5">
              {[
                { icon: '🤖', label: 'Ask AI — INSTANT', action: () => alert('AI Instant Answers: Fathom is working cleanly.') },
                { icon: '✉️', label: 'Open a Ticket (<1 biz day)', action: () => alert('Ticket form open') },
                { icon: '💡', label: 'Share Feedback', action: () => alert('Feedback modal open') },
              ].map(({ icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full text-left text-xs p-2.5 rounded-xl flex items-center justify-between transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,180,216,0.08)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,180,216,0.25)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                >
                  <span>{icon} {label}</span>
                  <span style={{ color: 'var(--text-muted)' }}>→</span>
                </button>
              ))}
            </div>

            <div className="pt-1">
              <div
                className="flex items-center gap-2 rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
              >
                <input
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 bg-transparent text-xs px-3 py-2 focus:outline-none"
                  style={{ color: 'var(--text-primary)' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && supportMessage.trim()) {
                      alert(`Message sent: ${supportMessage}`)
                      setSupportMessage('')
                    }
                  }}
                />
                <button
                  className="px-3 py-2 text-xs font-bold"
                  style={{ color: 'var(--cyan)' }}
                  onClick={() => { if (supportMessage.trim()) { alert(`Message sent: ${supportMessage}`); setSupportMessage('') } }}
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Bot Name Modal ── */}
      {isEditingBot && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="glass-card animate-scale-in rounded-2xl max-w-md w-full p-6 relative"
            style={{
              background: 'rgba(17,22,32,0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,180,216,0.2)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,180,216,0.1)',
            }}
          >
            <button
              onClick={() => setIsEditingBot(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-200"
              style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'white' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)' }}
            >
              ✕
            </button>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
              style={{ background: 'var(--gradient-brand)', boxShadow: 'var(--shadow-cyan)' }}
            >
              🤖
            </div>
            <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Edit Bot Display Name
            </h3>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Enter the name attendees will see when Fathom joins the call.
            </p>
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="input-field w-full text-sm p-3 mb-4"
            />
            <button
              onClick={() => setIsEditingBot(false)}
              className="btn-primary w-full py-2.5 text-xs"
            >
              Save Bot Name
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FathomHeader } from '@/components/fathom-header'

export default function SettingsPage() {
  const [botName, setBotName] = useState("sailakshmi's Fathom Notetaker")
  const [isEditingBot, setIsEditingBot] = useState(false)
  const [autoRecordScope, setAutoRecordScope] = useState('All meetings')
  const [autoShareScope, setAutoShareScope] = useState('Summary & recording')
  const [shareAudience, setShareAudience] = useState('with attendees')

  // Toggles
  const [zoomEnhanced, setZoomEnhanced] = useState(false)
  const [zoomUnscheduled, setZoomUnscheduled] = useState(false)
  const [meetUnscheduled, setMeetUnscheduled] = useState(false)
  const [autoActionItems, setAutoActionItems] = useState(true)
  const [recordingBanner, setRecordingBanner] = useState(true)
  const [autoConsent, setAutoConsent] = useState(false)
  const [inMeetingChat, setInMeetingChat] = useState(true)
  const [anonymizedData, setAnonymizedData] = useState(true)

  // Floating support widget
  const [showSupportBot, setShowSupportBot] = useState(true)
  const [supportMessage, setSupportMessage] = useState('')

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      <FathomHeader activeTab="Settings" />

      <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-10">
        {/* Top Scope Row (From Screenshot 144542.png) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-300 bg-[#12161f] border border-[#21262d] p-3.5 rounded-xl">
          <span>Auto-record</span>
          <select
            value={autoRecordScope}
            onChange={(e) => setAutoRecordScope(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded text-white font-medium focus:outline-none"
          >
            <option>All meetings</option>
            <option>External meetings only</option>
            <option>Internal meetings only</option>
          </select>

          <span>and auto-share</span>
          <select
            value={autoShareScope}
            onChange={(e) => setAutoShareScope(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded text-white font-medium focus:outline-none"
          >
            <option>Summary & recording</option>
            <option>Summary only</option>
            <option>Recording only</option>
          </select>

          <select
            value={shareAudience}
            onChange={(e) => setShareAudience(e.target.value)}
            className="bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded text-white font-medium focus:outline-none"
          >
            <option>with attendees</option>
            <option>with team members only</option>
            <option>only with me</option>
          </select>
        </div>

        {/* 1. VIDEO CONFERENCING */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            VIDEO CONFERENCING
          </h2>

          {/* Zoom Card */}
          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-lg">
                  📹
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Zoom:</span>
                    <span className="text-emerald-400 font-semibold text-xs">Fully Enabled</span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs border-t border-[#21262d]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-200 font-medium">Enhanced Recording: Record gallery mode and with improved recording quality</p>
                </div>
                <button
                  onClick={() => setZoomEnhanced(!zoomEnhanced)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    zoomEnhanced ? 'bg-[#00b4d8]' : 'bg-[#21262d]'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      zoomEnhanced ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-200 font-medium">Auto-capture unscheduled Zoom meetings</p>
                </div>
                <button
                  onClick={() => setZoomUnscheduled(!zoomUnscheduled)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    zoomUnscheduled ? 'bg-[#00b4d8]' : 'bg-[#21262d]'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      zoomUnscheduled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Google Meet Card */}
          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-lg">
                  🟢
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Google Meet:</span>
                    <span className="text-amber-400 font-semibold text-xs">Partially Enabled</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Usage limited to scheduled calls joined via desktop app. Install Chrome extension to use on any meeting.
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert('Opening Chrome Web Store...')}
                className="bg-[#21262d] hover:bg-[#30363d] text-[#00b4d8] border border-[#00b4d8]/40 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <span>Install Chrome Extension ⤓</span>
              </button>
            </div>

            <div className="pt-2 text-xs border-t border-[#21262d] flex items-center justify-between">
              <p className="text-gray-200 font-medium">Auto-capture unscheduled Google Meet meetings</p>
              <button
                onClick={() => setMeetUnscheduled(!meetUnscheduled)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  meetUnscheduled ? 'bg-[#00b4d8]' : 'bg-[#21262d]'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    meetUnscheduled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Microsoft Teams Card */}
          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-lg">
                🟣
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Microsoft Teams:</span>
                  <span className="text-emerald-400 font-semibold text-xs">Fully Enabled</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PREMIUM FEATURES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              PREMIUM FEATURES
            </h2>
            <span className="text-[11px] text-amber-300 bg-[#232115] border border-[#635016] px-2 py-0.5 rounded-full">
              🎁 30 DAYS LEFT IN FREE PREVIEW
            </span>
          </div>

          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-5 space-y-4 text-xs">
            {/* Bot Name */}
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="font-bold text-white flex items-center gap-2">
                  <span>🤖 Bot Name:</span>
                  <span className="text-[#00b4d8] font-mono">{botName}</span>
                </p>
                <p className="text-gray-400 mt-0.5">The name your Fathom notetaker will go by when it joins meetings.</p>
              </div>
              <button
                onClick={() => setIsEditingBot(true)}
                className="bg-[#21262d] hover:bg-[#30363d] text-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <span>Edit ✎</span>
              </button>
            </div>

            {/* Auto-Generate Action Items */}
            <div className="flex items-center justify-between py-2 border-t border-[#21262d]">
              <div>
                <p className="font-bold text-white flex items-center gap-2">
                  <span>✨ Auto-Generate Action Items</span>
                  <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">
                    RECOMMENDED
                  </span>
                </p>
                <p className="text-gray-400 mt-0.5">Fathom AI will automatically extract any action items discussed on your meetings</p>
              </div>
              <button
                onClick={() => setAutoActionItems(!autoActionItems)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  autoActionItems ? 'bg-[#00b4d8]' : 'bg-[#21262d]'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    autoActionItems ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Default Summary Template */}
            <div className="flex items-center justify-between py-2 border-t border-[#21262d]">
              <div>
                <p className="font-bold text-white">Default Meeting Summary Template</p>
                <p className="text-gray-400 mt-0.5">External meetings only. Attendees always see the Enhanced template if you share.</p>
              </div>
              <select className="bg-[#0d1117] border border-[#30363d] text-gray-200 text-xs px-3 py-1.5 rounded-lg">
                <option>Enhanced (Default)</option>
                <option>Sales (BANT & Objections)</option>
                <option>Engineering Technical Sync</option>
                <option>1-on-1 Feedback</option>
              </select>
            </div>

            {/* Recording Notification Banner */}
            <div className="flex items-center justify-between py-2 border-t border-[#21262d]">
              <div>
                <p className="font-bold text-white">Recording Notification Banner</p>
                <p className="text-gray-400 mt-0.5">Displays recording consent notice to attendees upon joining</p>
              </div>
              <button
                onClick={() => setRecordingBanner(!recordingBanner)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  recordingBanner ? 'bg-[#00b4d8]' : 'bg-[#21262d]'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    recordingBanner ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. INTEGRATIONS */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            INTEGRATIONS
          </h2>

          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl divide-y divide-[#21262d] text-xs">
            {/* Claude */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h4 className="font-bold text-white">Claude AI</h4>
                  <p className="text-gray-400">Ask anything about your meetings using Anthropic Claude</p>
                </div>
              </div>
              <button
                onClick={() => alert('Claude API is integrated and ready! You can provide ANTHROPIC_API_KEY in .env')}
                className="bg-[#21262d] hover:bg-[#30363d] text-[#00b4d8] border border-[#00b4d8]/40 px-3 py-1.5 rounded-lg"
              >
                Configured ✓
              </button>
            </div>

            {/* ChatGPT */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <h4 className="font-bold text-white">ChatGPT</h4>
                  <p className="text-gray-400">Query meeting history and transcripts with OpenAI</p>
                </div>
              </div>
              <button className="bg-[#21262d] hover:bg-[#30363d] text-gray-300 px-3 py-1.5 rounded-lg">
                Connect
              </button>
            </div>

            {/* Slack */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h4 className="font-bold text-white">Slack</h4>
                  <p className="text-gray-400">Automatically send meeting highlights to Slack channels in real-time</p>
                </div>
              </div>
              <button className="bg-[#21262d] hover:bg-[#30363d] text-gray-300 px-3 py-1.5 rounded-lg">
                Connect
              </button>
            </div>

            {/* Salesforce */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">☁️</span>
                <div>
                  <h4 className="font-bold text-white">Salesforce</h4>
                  <p className="text-gray-400">Sync call summaries & highlights to matching Contacts, Accounts, and open Opportunities</p>
                </div>
              </div>
              <button className="bg-[#21262d] hover:bg-[#30363d] text-gray-300 px-3 py-1.5 rounded-lg">
                Connect
              </button>
            </div>

            {/* HubSpot */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🟧</span>
                <div>
                  <h4 className="font-bold text-white">HubSpot</h4>
                  <p className="text-gray-400">Sync call summaries & highlights to matching Contacts, Companies, and open Deals</p>
                </div>
              </div>
              <button className="bg-[#21262d] hover:bg-[#30363d] text-gray-300 px-3 py-1.5 rounded-lg">
                Connect
              </button>
            </div>

            {/* MCP Server */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-bold text-white">MCP Server</h4>
                  <p className="text-gray-400">Connect Fathom to external tools using an MCP server for real-time context, actions, and secure integrations</p>
                </div>
              </div>
              <button className="bg-[#21262d] hover:bg-[#30363d] text-[#00b4d8] px-3 py-1.5 rounded-lg">
                Set Up ↗
              </button>
            </div>
          </div>
        </div>

        {/* 4. HIGHLIGHT OPTIONS (From Screenshot 144609.png & 144621.png) */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            HIGHLIGHT OPTIONS
          </h2>

          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-5 space-y-3">
            <div className="bg-[#00b4d8]/20 border border-[#00b4d8] text-[#00b4d8] font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
              <span>HIGHLIGHT</span>
              <span>Default</span>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
              <span>POSITIVE REACTION</span>
              <span>🗑</span>
            </div>

            <div className="bg-amber-500/20 border border-amber-500 text-amber-300 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
              <span>NEEDS REVIEW</span>
              <span>🗑</span>
            </div>

            <div className="bg-orange-500/20 border border-orange-500 text-orange-400 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
              <span>FEEDBACK</span>
              <span>🗑</span>
            </div>

            <button
              onClick={() => alert('New highlight category created!')}
              className="text-xs text-gray-400 hover:text-white pt-2 flex items-center gap-1 font-semibold"
            >
              <span>+ ADD MORE</span>
            </button>
          </div>
        </div>

        {/* 5. DELETE ACCOUNT (From Screenshot 144621.png) */}
        <div className="bg-[#1a1114] border border-[#4a1c24] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-red-400">DELETE ACCOUNT</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Deleting your account is permanent. All recordings, transcripts, and AI summaries will be erased.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete your account?')) {
                alert('Account deletion request acknowledged.')
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            Delete Account 🗑
          </button>
        </div>
      </div>

      {/* Floating Support Widget (From Screenshot 144641.png) */}
      {showSupportBot && (
        <div className="fixed bottom-6 right-6 z-40 bg-[#161b22] border border-[#30363d] rounded-2xl w-80 shadow-2xl overflow-hidden text-xs">
          <div className="p-3 bg-[#12161f] border-b border-[#21262d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base text-[#00b4d8]">🌊</span>
              <div>
                <p className="font-bold text-white leading-tight">Fathom Support</p>
                <p className="text-[10px] text-gray-400">We&apos;re here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setShowSupportBot(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          <div className="p-3.5 space-y-3 bg-[#0d1117]">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Fathom Support Bot:</span> Hey there 👋 How can we help you today?
            </p>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => alert('AI Instant Answers: Fathom is working cleanly.')}
                className="w-full text-left bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] p-2 rounded-lg text-gray-200 flex items-center justify-between"
              >
                <span>🤖 Ask AI - INSTANT</span>
                <span>→</span>
              </button>
              <button
                onClick={() => alert('Ticket form open')}
                className="w-full text-left bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] p-2 rounded-lg text-gray-200 flex items-center justify-between"
              >
                <span>✉️ Open a Ticket (&lt;1 biz day)</span>
                <span>→</span>
              </button>
              <button
                onClick={() => alert('Feedback modal open')}
                className="w-full text-left bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] p-2 rounded-lg text-gray-200 flex items-center justify-between"
              >
                <span>💡 Share Feedback</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bot Modal */}
      {isEditingBot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full p-6 text-white relative">
            <button
              onClick={() => setIsEditingBot(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-3">Edit Bot Display Name</h3>
            <p className="text-xs text-gray-400 mb-4">
              Enter the name you want attendees to see when Fathom joins the call.
            </p>
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00b4d8] text-sm text-white p-2.5 rounded-lg mb-4 focus:outline-none"
            />
            <button
              onClick={() => setIsEditingBot(false)}
              className="w-full bg-[#00b4d8] text-black font-bold py-2.5 rounded-lg text-xs"
            >
              Save Bot Name
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

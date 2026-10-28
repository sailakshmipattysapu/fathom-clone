'use client'

import React, { useState } from 'react'
import { FathomHeader } from '@/components/fathom-header'
import { toast } from 'sonner'

interface Integration {
  id: string
  name: string
  description: string
  emoji: string
  category: string
  connected: boolean
  comingSoon?: boolean
}

const INITIAL_INTEGRATIONS: Integration[] = [
  { id: 'claude', name: 'Claude AI', description: 'Ask anything about your meetings and extract action items with superhuman accuracy.', emoji: '🤖', category: 'AI Models', connected: true },
  { id: 'google-calendar', name: 'Google Calendar', description: 'Auto-join scheduled meetings and sync your entire calendar schedule.', emoji: '📅', category: 'Calendar', connected: true },
  { id: 'zoom', name: 'Zoom', description: 'Record and transcribe your Zoom meetings automatically with full speaker attribution.', emoji: '📹', category: 'Video Conferencing', connected: true },
  { id: 'meet', name: 'Google Meet', description: 'Native Chrome extension capture for any Google Meet call — no bot required.', emoji: '🟢', category: 'Video Conferencing', connected: true },
  { id: 'teams', name: 'Microsoft Teams', description: 'Auto-join and transcribe Teams calls across your entire organization.', emoji: '🟣', category: 'Video Conferencing', connected: true },
  { id: 'slack', name: 'Slack', description: 'Send meeting summaries, highlight clips, and action items directly to channels.', emoji: '💬', category: 'Productivity', connected: false },
  { id: 'salesforce', name: 'Salesforce', description: 'Sync call summaries & highlights to matching Contacts, Accounts, and Deals.', emoji: '☁️', category: 'CRM', connected: false },
  { id: 'hubspot', name: 'HubSpot', description: 'Automatically log calls, transcripts, and deal momentum into HubSpot CRM.', emoji: '🟧', category: 'CRM', connected: false },
  { id: 'notion', name: 'Notion', description: 'Push structured meeting summaries and databases to your Notion workspace.', emoji: '📓', category: 'Productivity', connected: false },
  { id: 'mcp', name: 'MCP Server', description: 'Model Context Protocol server for real-time AI tools and developer agents.', emoji: '⚡', category: 'Developer & API', connected: false },
]

const CATEGORIES = ['All', 'AI Models', 'Video Conferencing', 'Calendar', 'CRM', 'Productivity', 'Developer & API']

const CATEGORY_COLORS: Record<string, string> = {
  'AI Models': '#a78bfa',
  'Video Conferencing': '#00b4d8',
  'Calendar': '#34d399',
  'CRM': '#f59e0b',
  'Productivity': '#60a5fa',
  'Developer & API': '#f472b6',
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS)
  const [activeCategory, setActiveCategory] = useState('All')

  const handleToggleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.connected
          toast.success(next ? `✅ Connected to ${item.name}!` : `Disconnected from ${item.name}`)
          return { ...item, connected: next }
        }
        return item
      })
    )
  }

  const filtered = activeCategory === 'All' ? integrations : integrations.filter(i => i.category === activeCategory)
  const connectedCount = integrations.filter(i => i.connected).length

  return (
    <div className="min-h-screen dashboard-gradient text-white flex flex-col font-sans">
      <FathomHeader activeTab="Settings" />

      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1 animate-fade-up">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(124,58,237,0.15))', border: '1px solid rgba(0,180,216,0.25)' }}>
                <svg className="w-5 h-5 text-[#00b4d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Integrations</h1>
                <p className="text-xs text-[#4a5568]">Connect your workspace to every tool your team uses</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
              {connectedCount} of {integrations.length} connected
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="text-[11px] font-bold px-3.5 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: activeCategory === cat ? 'linear-gradient(135deg, #00b4d8, #0096c7)' : 'rgba(17,22,32,0.8)',
                border: `1px solid ${activeCategory === cat ? 'transparent' : 'rgba(30,37,53,0.8)'}`,
                color: activeCategory === cat ? '#000' : '#8b9ab2',
                boxShadow: activeCategory === cat ? '0 0 12px rgba(0,180,216,0.3)' : 'none',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Integrations grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((item, idx) => {
            const catColor = CATEGORY_COLORS[item.category] || '#00b4d8'
            return (
              <div
                key={item.id}
                className="glass-card card-hover rounded-2xl p-5 flex flex-col animate-fade-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${catColor}12`, border: `1px solid ${catColor}25` }}>
                      {item.emoji}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">{item.name}</h3>
                      <span className="text-[10px] font-semibold"
                        style={{ color: catColor }}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {item.connected ? (
                    <span className="badge badge-emerald flex-shrink-0">✓ Connected</span>
                  ) : (
                    <span className="badge flex-shrink-0"
                      style={{ background: 'rgba(30,37,53,0.5)', color: '#4a5568', border: '1px solid rgba(30,37,53,0.8)' }}>
                      Not Connected
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#8b9ab2] leading-relaxed flex-1 mb-4">{item.description}</p>

                <div className="flex justify-between items-center pt-3"
                  style={{ borderTop: '1px solid rgba(30,37,53,0.6)' }}>
                  {item.connected && (
                    <span className="text-[9px] text-[#4a5568] font-medium">Last sync: just now</span>
                  )}
                  <div className={`${!item.connected ? 'ml-auto' : ''}`}>
                    <button
                      onClick={() => handleToggleConnect(item.id)}
                      className="text-xs px-4 py-2 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]"
                      style={item.connected ? {
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#ef4444',
                      } : {
                        background: 'linear-gradient(135deg, #00b4d8, #0096c7)',
                        color: '#000',
                        boxShadow: '0 0 12px rgba(0,180,216,0.25)',
                      }}>
                      {item.connected ? 'Disconnect' : 'Connect →'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

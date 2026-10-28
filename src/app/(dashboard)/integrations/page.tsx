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
  {
    id: 'claude',
    name: 'Claude AI',
    description: 'Ask anything about your meetings and extract action items.',
    emoji: '🤖',
    category: 'AI Models',
    connected: true,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Auto-join scheduled meetings and synchronize your schedule.',
    emoji: '📅',
    category: 'Calendar',
    connected: true,
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Record and transcribe your Zoom meetings automatically.',
    emoji: '📹',
    category: 'Video Conferencing',
    connected: true,
  },
  {
    id: 'meet',
    name: 'Google Meet',
    description: 'Native Chrome extension capture for any Google Meet call.',
    emoji: '🟢',
    category: 'Video Conferencing',
    connected: true,
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Auto-join and transcribe Teams calls across your organization.',
    emoji: '🟣',
    category: 'Video Conferencing',
    connected: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send meeting summaries, highlight clips, and action items to channels.',
    emoji: '💬',
    category: 'Productivity',
    connected: false,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Sync call summaries & highlights to matching Contacts, Accounts, and Deals.',
    emoji: '☁️',
    category: 'CRM',
    connected: false,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Automatically log calls, transcripts, and deal momentum into HubSpot CRM.',
    emoji: '🟧',
    category: 'CRM',
    connected: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Push structured meeting summaries and databases to your Notion workspace.',
    emoji: '📓',
    category: 'Productivity',
    connected: false,
  },
  {
    id: 'mcp',
    name: 'MCP Server',
    description: 'Model Context Protocol server for real-time AI tools and agents.',
    emoji: '⚡',
    category: 'Developer & API',
    connected: false,
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS)

  const handleToggleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.connected
          toast.success(next ? `Connected to ${item.name}!` : `Disconnected from ${item.name}`)
          return { ...item, connected: next }
        }
        return item
      })
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      <FathomHeader activeTab="Settings" />

      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Integrations & Connected Apps</h1>
          <p className="text-xs text-gray-400 mt-1">
            Connect Fathom to your video platforms, CRM systems, calendars, and productivity tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="bg-[#12161f] border border-[#21262d] hover:border-[#30363d] rounded-2xl p-5 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.name}</h3>
                      <span className="text-[10px] text-gray-400 font-medium">{item.category}</span>
                    </div>
                  </div>

                  {item.connected ? (
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                      Connected ✓
                    </span>
                  ) : (
                    <span className="text-[11px] bg-[#21262d] text-gray-400 px-2 py-0.5 rounded-full font-medium">
                      Not Connected
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#21262d] flex justify-end">
                <button
                  onClick={() => handleToggleConnect(item.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                    item.connected
                      ? 'bg-[#21262d] hover:bg-[#30363d] text-gray-300'
                      : 'bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold'
                  }`}
                >
                  {item.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

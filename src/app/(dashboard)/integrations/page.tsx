'use client'

import { useState } from 'react'
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

const INTEGRATIONS: Integration[] = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Auto-join scheduled meetings and sync your calendar.',
    emoji: '📅',
    category: 'Calendar',
    connected: false,
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    description: 'Connect your Outlook calendar for automatic meeting joining.',
    emoji: '📆',
    category: 'Calendar',
    connected: false,
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
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Auto-join and transcribe Teams meetings.',
    emoji: '🟣',
    category: 'Video Conferencing',
    connected: false,
  },
  {
    id: 'meet',
    name: 'Google Meet',
    description: 'Record and transcribe Google Meet calls.',
    emoji: '🟢',
    category: 'Video Conferencing',
    connected: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send meeting summaries and action items directly to Slack channels.',
    emoji: '💬',
    category: 'Communication',
    connected: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Automatically export action items and summaries to your Notion workspace.',
    emoji: '📝',
    category: 'Productivity',
    connected: false,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Log call notes and action items to your HubSpot CRM automatically.',
    emoji: '🧡',
    category: 'CRM',
    connected: false,
    comingSoon: false,
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS)
  const [connecting, setConnecting] = useState<string | null>(null)

  async function handleConnect(integration: Integration) {
    if (integration.connected) {
      // Disconnect
      setIntegrations((prev) =>
        prev.map((i) => (i.id === integration.id ? { ...i, connected: false } : i))
      )
      toast.success(`${integration.name} disconnected`)
      return
    }

    setConnecting(integration.id)
    await new Promise((r) => setTimeout(r, 1000)) // Simulate API call

    if (integration.id === 'google-calendar') {
      // Call real API for calendar
      try {
        const res = await fetch('/api/calendar/connect', { method: 'POST' })
        if (!res.ok) throw new Error()
      } catch {
        toast.error('Failed to connect calendar')
        setConnecting(null)
        return
      }
    }

    setIntegrations((prev) =>
      prev.map((i) => (i.id === integration.id ? { ...i, connected: true } : i))
    )
    toast.success(`${integration.name} connected!`)
    setConnecting(null)
  }

  const categories = Array.from(new Set(integrations.map((i) => i.category)))

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Integrations</h1>
        <p className="text-sm text-gray-500">
          Connect your tools to get the most out of Fathom.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {integrations
              .filter((i) => i.category === category)
              .map((integration) => (
                <div
                  key={integration.id}
                  className={`bg-white border rounded-xl p-6 flex items-start gap-4 transition-all ${
                    integration.connected
                      ? 'border-green-200 bg-green-50/30'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="text-3xl flex-shrink-0">{integration.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{integration.name}</h3>
                      {integration.connected && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Connected
                        </span>
                      )}
                      {integration.comingSoon && (
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      {integration.description}
                    </p>
                    <button
                      onClick={() => handleConnect(integration)}
                      disabled={connecting === integration.id || integration.comingSoon}
                      className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                        integration.connected
                          ? 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-100'
                          : 'text-white bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {connecting === integration.id
                        ? 'Connecting...'
                        : integration.connected
                        ? 'Disconnect'
                        : integration.comingSoon
                        ? 'Coming soon'
                        : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { toast } from 'sonner'

interface CalendarConnectBannerProps {
  onConnect: () => void
  onLoadSample?: () => void
}

export function CalendarConnectBanner({ onConnect, onLoadSample }: CalendarConnectBannerProps) {
  const [connecting, setConnecting] = useState(false)

  async function handleConnect(provider: string) {
    setConnecting(true)
    await new Promise((r) => setTimeout(r, 800))
    onConnect()
    setConnecting(false)
    toast.success(`${provider} connected!`)
  }

  return (
    <div className="mb-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl overflow-hidden">
      <div className="px-8 py-10 flex flex-col md:flex-row items-center gap-8">
        {/* Illustration */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center text-5xl border border-white/20">
            📅
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">
            Connect your calendar to get started
          </h2>
          <p className="text-blue-200 text-sm mb-6 max-w-md">
            Fathom will automatically join your scheduled meetings, record, transcribe, and generate AI summaries — so you can focus on the conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={() => handleConnect('Google Calendar')}
              disabled={connecting}
              className="flex items-center justify-center gap-2 bg-white text-gray-800 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {connecting ? 'Connecting...' : 'Connect Google Calendar'}
            </button>

            <button
              onClick={() => handleConnect('Outlook')}
              disabled={connecting}
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-white/20 border border-white/20 transition-colors disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="#0078D4"/>
                <text x="4" y="17" fill="white" fontSize="14" fontWeight="bold">O</text>
              </svg>
              Connect Outlook
            </button>
          </div>
        </div>

        {/* Or try sample */}
        {onLoadSample && (
          <div className="flex-shrink-0 border-l border-white/20 pl-8 hidden md:block">
            <p className="text-blue-200 text-xs mb-3 text-center">or try Fathom with</p>
            <button
              onClick={onLoadSample}
              className="flex items-center gap-2 text-white text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Sample meetings
            </button>
          </div>
        )}
      </div>

      {/* Feature pills */}
      <div className="bg-black/10 px-8 py-4 flex flex-wrap gap-4 justify-center border-t border-white/10">
        {[
          { icon: '🎙️', text: 'Auto-joins meetings' },
          { icon: '✨', text: 'AI summaries' },
          { icon: '✅', text: 'Action items' },
          { icon: '🔍', text: 'Searchable transcripts' },
        ].map((feature) => (
          <div key={feature.text} className="flex items-center gap-1.5 text-xs text-blue-200">
            <span>{feature.icon}</span>
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface FathomHeaderProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  onSearch?: (query: string) => void
  onOpenAskFathom?: () => void
}

export function FathomHeader({
  activeTab = 'My Calls',
  onTabChange,
  onSearch,
  onOpenAskFathom,
}: FathomHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showReferModal, setShowReferModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const tabs = [
    { name: 'My Calls', href: '/dashboard' },
    { name: 'Team Calls', href: '/dashboard?tab=team' },
    { name: 'Playlists', href: '/dashboard?tab=playlists' },
    { name: 'Alerts', href: '/dashboard?tab=alerts' },
    { name: 'Deals', href: '/dashboard?tab=deals' },
  ]

  const handleTabClick = (tabName: string, href: string) => {
    if (onTabChange) {
      onTabChange(tabName)
    } else {
      router.push(href)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0d1117] border-b border-[#21262d] px-4 lg:px-6 h-14 flex items-center justify-between select-none">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            {/* Fathom Iconic Logo SVG */}
            <div className="flex items-center text-white font-extrabold text-xl tracking-wider">
              <span>FATHOM</span>
              <svg className="w-5 h-5 ml-1.5 text-[#00b4d8]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 14.5L10 8.5L12 10.5L6 16.5L4 14.5Z" />
                <path d="M10 14.5L16 8.5L18 10.5L12 16.5L10 14.5Z" opacity="0.8" />
                <path d="M16 14.5L20 10.5L22 12.5L18 16.5L16 14.5Z" opacity="0.6" />
              </svg>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-64 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Call Recordings"
              className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#00b4d8] text-xs text-gray-200 placeholder-gray-400 pl-9 pr-8 py-1.5 rounded-md focus:outline-none transition-colors"
            />
            <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[10px] text-gray-500 font-mono">
              ⌘K
            </span>
          </form>
        </div>

        {/* Center: Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-4 lg:space-x-6 h-full text-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name || (activeTab === '' && tab.name === 'My Calls')
            return (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name, tab.href)}
                className={`relative h-full flex items-center px-2 lg:px-3 font-medium transition-colors text-xs sm:text-sm ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00b4d8] shadow-[0_0_8px_#00b4d8]" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Refer button */}
          <button
            onClick={() => setShowReferModal(true)}
            className="hidden md:flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2.5 py-1 rounded hover:bg-[#161b22] transition-colors"
          >
            <span>🎁</span>
            <span>Refer</span>
          </button>

          {/* Settings link */}
          <Link
            href="/settings"
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2 py-1 rounded hover:bg-[#161b22] transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {/* Help & Feedback */}
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2 py-1 rounded hover:bg-[#161b22] transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Help & Feedback</span>
          </button>

          {/* Points Pill (25 Points) */}
          <div className="flex items-center gap-1 bg-[#232115] border border-[#635016] text-[#f5c518] px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer hover:bg-[#2e2b1c] transition-colors">
            <span>⭐</span>
            <span>25</span>
          </div>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 p-[1.5px] focus:outline-none"
            >
              <div className="w-full h-full rounded-full bg-[#0d1117] flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                SA
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl py-1 text-xs text-gray-200 z-50">
                <div className="px-3 py-2 border-b border-[#21262d]">
                  <p className="font-semibold text-white">Sailakshmi</p>
                  <p className="text-gray-400 truncate">sailakshmipattysapu@gmail.com</p>
                </div>
                <Link href="/dashboard" className="block px-3 py-2 hover:bg-[#21262d]">
                  My Recordings
                </Link>
                <Link href="/settings" className="block px-3 py-2 hover:bg-[#21262d]">
                  Account Settings
                </Link>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#21262d]"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Refer Modal */}
      {showReferModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full p-6 text-white relative">
            <button
              onClick={() => setShowReferModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="text-center">
              <span className="text-4xl">🎁</span>
              <h3 className="text-xl font-bold mt-2">Refer Fathom to Friends</h3>
              <p className="text-sm text-gray-400 mt-2">
                Give your colleagues free access to Fathom AI summaries, and earn 25 points for every team member who joins!
              </p>
              <div className="mt-4 flex items-center gap-2 bg-[#0d1117] border border-[#30363d] p-2 rounded-lg">
                <input
                  readOnly
                  value="https://fathom.video/invite/sailakshmi"
                  className="bg-transparent text-xs text-gray-300 w-full focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://fathom.video/invite/sailakshmi')
                    alert('Referral link copied!')
                  }}
                  className="bg-[#00b4d8] text-black font-semibold text-xs px-3 py-1.5 rounded hover:bg-[#0096c7]"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help & Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full p-6 text-white relative">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00b4d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Fathom Support & Feedback
            </h3>
            <div className="space-y-3 text-sm">
              <button
                onClick={() => alert('Opening AI Assistant chat...')}
                className="w-full text-left p-3 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#00b4d8] flex items-center justify-between"
              >
                <span>🤖 Ask AI - INSTANT</span>
                <span className="text-xs text-[#00b4d8]">Immediate</span>
              </button>
              <button
                onClick={() => alert('Support ticket portal opened')}
                className="w-full text-left p-3 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#00b4d8] flex items-center justify-between"
              >
                <span>✉️ Open a Ticket</span>
                <span className="text-xs text-gray-400">&lt;1 biz day</span>
              </button>
              <button
                onClick={() => alert('Feedback submitted! Thank you.')}
                className="w-full text-left p-3 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#00b4d8] flex items-center justify-between"
              >
                <span>💡 Share Feedback</span>
                <span className="text-xs text-amber-400">Roadmap</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

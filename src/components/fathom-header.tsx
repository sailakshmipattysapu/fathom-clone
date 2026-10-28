'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  const [isFocused, setIsFocused] = useState(false)
  const [copied, setCopied] = useState(false)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const userMenuRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { name: 'My Calls', icon: '📹' },
    { name: 'Team Calls', icon: '👥' },
    { name: 'Playlists', icon: '📋' },
    { name: 'Alerts', icon: '🔔' },
    { name: 'Deals', icon: '💼' },
  ]

  const tabHrefs: Record<string, string> = {
    'My Calls': '/dashboard',
    'Team Calls': '/dashboard?tab=team',
    'Playlists': '/dashboard?tab=playlists',
    'Alerts': '/dashboard?tab=alerts',
    'Deals': '/dashboard?tab=deals',
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Global ⌘K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('fathom-search')?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleTabClick = (tabName: string) => {
    if (onTabChange) {
      onTabChange(tabName)
    } else {
      router.push(tabHrefs[tabName] || '/dashboard')
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

  const handleCopy = () => {
    navigator.clipboard.writeText('https://fathom.video/invite/sailakshmi')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 select-none"
        style={{
          background: 'rgba(8, 12, 20, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(30, 37, 53, 0.8)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <div className="h-14 px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2 group flex-shrink-0">
              <span className="text-white font-black text-lg tracking-widest group-hover:text-[#00b4d8] transition-colors duration-200">
                FATHOM
              </span>
              <svg className="w-5 h-5 text-[#00b4d8] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 14.5L10 8.5L12 10.5L6 16.5L4 14.5Z" />
                <path d="M10 14.5L16 8.5L18 10.5L12 16.5L10 14.5Z" opacity="0.75" />
                <path d="M16 14.5L20 10.5L22 12.5L18 16.5L16 14.5Z" opacity="0.5" />
              </svg>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'w-72 lg:w-88' : 'w-56 lg:w-72'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`w-3.5 h-3.5 transition-colors duration-200 ${isFocused ? 'text-[#00b4d8]' : 'text-[#4a5568]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="fathom-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search recordings, transcripts..."
                  className="w-full text-[11px] text-[#e8edf5] placeholder-[#4a5568] pl-8 pr-12 py-1.5 rounded-lg focus:outline-none transition-all duration-200"
                  style={{
                    background: isFocused ? 'rgba(17, 22, 32, 0.95)' : 'rgba(12, 16, 24, 0.8)',
                    border: `1px solid ${isFocused ? 'rgba(0, 180, 216, 0.5)' : 'rgba(30, 37, 53, 0.8)'}`,
                    boxShadow: isFocused ? '0 0 0 3px rgba(0, 180, 216, 0.08), 0 0 20px rgba(0, 180, 216, 0.06)' : 'none',
                  }}
                />
                <span className="absolute right-2.5 text-[9px] text-[#4a5568] font-mono bg-[#0c1018] border border-[#1e2535] px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              </div>
            </form>
          </div>

          {/* Center: Navigation Tabs */}
          <nav className="flex items-center h-full gap-0.5 sm:gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name
              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name)}
                  className={`nav-tab relative h-full flex items-center px-2.5 lg:px-4 text-xs font-semibold tracking-wide transition-all duration-200 group ${
                    isActive ? 'active text-white' : 'text-[#4a5568] hover:text-[#8b9ab2]'
                  }`}
                >
                  <span className="hidden lg:inline mr-1.5 text-[10px]">{tab.icon}</span>
                  <span className="whitespace-nowrap">{tab.name}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-t"
                      style={{
                        background: 'linear-gradient(90deg, #00b4d8, #7c3aed)',
                        width: 'calc(100% - 12px)',
                        boxShadow: '0 0 10px rgba(0, 180, 216, 0.6)',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Ask Fathom AI button */}
            {onOpenAskFathom && (
              <button
                onClick={onOpenAskFathom}
                className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,180,216,0.12) 0%, rgba(124,58,237,0.08) 100%)',
                  border: '1px solid rgba(0, 180, 216, 0.2)',
                  color: '#00b4d8',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(0,180,216,0.2) 0%, rgba(124,58,237,0.15) 100%)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,180,216,0.4)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(0,180,216,0.12) 0%, rgba(124,58,237,0.08) 100%)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,180,216,0.2)'
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Ask FATHOM</span>
              </button>
            )}

            {/* Refer */}
            <button
              onClick={() => setShowReferModal(true)}
              className="hidden md:flex items-center gap-1.5 text-[11px] text-[#8b9ab2] hover:text-white px-2 py-1.5 rounded-lg hover:bg-[#111620] transition-all duration-200"
            >
              <span>🎁</span>
              <span className="hidden lg:inline">Refer</span>
            </button>

            {/* Settings */}
            <Link
              href="/settings"
              className="flex items-center gap-1.5 text-[11px] text-[#8b9ab2] hover:text-white px-2 py-1.5 rounded-lg hover:bg-[#111620] transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Help */}
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#8b9ab2] hover:text-white px-2 py-1.5 rounded-lg hover:bg-[#111620] transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden lg:inline">Help</span>
            </button>

            {/* Points badge */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(35, 33, 21, 0.9)',
                border: '1px solid rgba(99, 80, 22, 0.6)',
                color: '#f5c518',
                boxShadow: '0 0 8px rgba(245, 197, 24, 0.15)',
              }}
            >
              <span>⭐</span>
              <span>25</span>
            </div>

            {/* User avatar */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="relative flex-shrink-0 w-7 h-7 rounded-full focus:outline-none group"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #10b981)',
                  padding: '1.5px',
                  boxShadow: showUserMenu ? '0 0 12px rgba(0,180,216,0.4)' : 'none',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0c1018] flex items-center justify-center text-[10px] font-black text-white">
                  SA
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl py-1 z-50 animate-slide-down"
                  style={{
                    background: 'rgba(15, 20, 30, 0.97)',
                    border: '1px solid rgba(30, 37, 53, 0.9)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 16px 50px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
                  }}>
                  <div className="px-3 py-3 border-b border-[#1e2535]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #f59e0b, #10b981)' }}>
                        SA
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-xs truncate">Sailakshmi</p>
                        <p className="text-[#4a5568] text-[10px] truncate">sailakshmi@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  {[
                    { label: 'My Recordings', icon: '📹', href: '/dashboard' },
                    { label: 'Account Settings', icon: '⚙️', href: '/settings' },
                    { label: 'Integrations', icon: '🔗', href: '/integrations' },
                  ].map(item => (
                    <Link key={item.label} href={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 text-[11px] text-[#8b9ab2] hover:text-white hover:bg-[#111620] transition-all"
                      onClick={() => setShowUserMenu(false)}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-[#1e2535] mt-1 pt-1">
                    <button
                      onClick={() => router.push('/login')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] text-red-400 hover:bg-red-500/8 hover:text-red-300 transition-all text-left">
                      <span>🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Refer Modal */}
      {showReferModal && (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowReferModal(false)}>
          <div className="w-full max-w-md rounded-2xl p-6 text-white animate-scale-in"
            style={{
              background: 'rgba(14, 19, 30, 0.98)',
              border: '1px solid rgba(30, 37, 53, 0.9)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
            }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(124,58,237,0.15))', border: '1px solid rgba(0,180,216,0.2)' }}>
                  🎁
                </div>
                <div>
                  <h3 className="text-base font-bold">Refer Friends & Earn</h3>
                  <p className="text-[11px] text-[#4a5568]">⭐ 25 points per referral</p>
                </div>
              </div>
              <button onClick={() => setShowReferModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#4a5568] hover:text-white hover:bg-[#111620] transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-[#8b9ab2] mb-5 leading-relaxed">
              Share Fathom with your colleagues. When they join, you both get premium features unlocked for free.
            </p>
            <div className="flex items-center gap-2 rounded-xl p-2" style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid rgba(30,37,53,0.9)' }}>
              <span className="text-xs text-[#8b9ab2] flex-1 pl-2 font-mono truncate">https://fathom.video/invite/sailakshmi</span>
              <button onClick={handleCopy}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                style={{
                  background: copied ? 'rgba(16,185,129,0.2)' : 'linear-gradient(135deg, #00b4d8, #0096c7)',
                  color: copied ? '#10b981' : '#000',
                  border: copied ? '1px solid rgba(16,185,129,0.3)' : 'none',
                }}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowFeedbackModal(false)}>
          <div className="w-full max-w-sm rounded-2xl p-6 text-white animate-scale-in"
            style={{
              background: 'rgba(14, 19, 30, 0.98)',
              border: '1px solid rgba(30, 37, 53, 0.9)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
            }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>🛟</span> Help & Feedback
              </h3>
              <button onClick={() => setShowFeedbackModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#4a5568] hover:text-white hover:bg-[#111620] transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {[
                { icon: '🤖', label: 'Ask AI — INSTANT', sub: 'Immediate', color: '#00b4d8' },
                { icon: '✉️', label: 'Open a Ticket', sub: '<1 biz day', color: '#8b9ab2' },
                { icon: '📖', label: 'Browse Help Docs', sub: 'Self-serve', color: '#8b9ab2' },
              ].map(item => (
                <button key={item.label}
                  onClick={() => {
                    if (item.label.includes('AI')) alert('AI assistant opening...')
                    else if (item.label.includes('Ticket')) alert('Support portal opened')
                    else alert('Help docs opened')
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-xs transition-all duration-200 hover:bg-[#111620] text-left"
                  style={{ border: '1px solid rgba(30,37,53,0.9)', background: 'rgba(8,12,20,0.6)' }}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    <span className="font-medium text-[#e8edf5]">{item.label}</span>
                  </div>
                  <span className="font-semibold" style={{ color: item.color }}>{item.sub}</span>
                </button>
              ))}
            </div>
            {feedbackSent ? (
              <div className="p-3 rounded-xl text-center animate-fade-up"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <span className="text-emerald-400 font-semibold text-xs">✓ Thanks for your feedback!</span>
              </div>
            ) : (
              <div>
                <textarea
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Share a thought, feature request, or bug report..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl resize-none focus:outline-none transition-all"
                  style={{
                    background: 'rgba(8,12,20,0.8)',
                    border: '1px solid rgba(30,37,53,0.9)',
                    color: '#e8edf5',
                    caretColor: '#00b4d8',
                  }}
                />
                <button onClick={() => { setFeedbackSent(true); setTimeout(() => { setFeedbackSent(false); setFeedbackText(''); setShowFeedbackModal(false) }, 2000) }}
                  className="btn-primary w-full py-2.5 text-xs font-bold mt-2">
                  Send Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

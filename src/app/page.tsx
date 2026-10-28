'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TestCallModal } from '@/components/test-call-modal'

export default function LandingPage() {
  const [isTestCallOpen, setIsTestCallOpen] = useState(false)
  const [demoTemplate, setDemoTemplate] = useState('general')

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans selection:bg-[#00b4d8] selection:text-black">
      {/* Sticky Top Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-[#21262d] px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white font-extrabold text-xl tracking-wider">FATHOM</span>
            <svg className="w-5 h-5 text-[#00b4d8]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 14.5L10 8.5L12 10.5L6 16.5L4 14.5Z" />
              <path d="M10 14.5L16 8.5L18 10.5L12 16.5L10 14.5Z" opacity="0.8" />
              <path d="M16 14.5L20 10.5L22 12.5L18 16.5L16 14.5Z" opacity="0.6" />
            </svg>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs text-gray-300 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo" className="hover:text-white transition-colors">Live Interactive Demo</a>
            <Link href="/dashboard?tab=team" className="hover:text-white transition-colors">Team Edition</Link>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(0,180,216,0.3)] hover:scale-105 active:scale-95"
          >
            Launch Web App →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 text-center overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00b4d8]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#161b22] border border-[#30363d] text-gray-300 text-xs px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00b4d8] animate-ping" />
            <span>The #1 Rated AI Meeting Assistant on G2 & Zoom App Store</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Never take meeting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#48cae4] to-[#90e0ef]">
              notes again.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fathom records, transcribes, highlights, and summarizes your meetings with superhuman precision.
            Stay 100% focused on the conversation while AI does the documentation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-[#00b4d8] hover:bg-[#0096c7] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(0,180,216,0.4)] hover:scale-105 active:scale-95"
            >
              Open Fathom Workspace Free
            </Link>
            <button
              onClick={() => setIsTestCallOpen(true)}
              className="w-full sm:w-auto bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#00b4d8] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>📹</span>
              <span>Simulate 2-Min Test Call</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-14 pt-8 border-t border-[#21262d]/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span>ZOOM APP MARKETPLACE ⭐ 4.9</span>
            <span>GOOGLE MEET CERTIFIED</span>
            <span>MICROSOFT TEAMS PARTNER</span>
            <span>SOC2 TYPE II COMPLIANT</span>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo Stage */}
      <section id="demo" className="py-12 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
            INTERACTIVE EXPERIENCE
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            See Fathom in action right on this page
          </h2>
          <p className="text-xs text-gray-400 mt-2">
            Click timestamps, switch AI summary templates, or test action item extractions.
          </p>
        </div>

        {/* Demo App Window Mockup */}
        <div className="bg-[#12161f] border border-[#21262d] rounded-2xl overflow-hidden shadow-2xl">
          {/* Mock Window Header */}
          <div className="px-4 py-3 bg-[#0d1117] border-b border-[#21262d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-gray-400 ml-2 font-mono">
                fathom.video/meetings/q4-roadmap-planning
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#00b4d8]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>AI Summary Ready</span>
            </div>
          </div>

          {/* Mock Window Body */}
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#21262d]">
            {/* Left: Video Player Mock */}
            <div className="p-5 flex flex-col justify-between bg-[#090d14]">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-950 via-slate-900 to-black p-4 flex flex-col justify-between border border-[#21262d]">
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-black/60 px-2.5 py-1 rounded-full text-white font-mono">
                    📹 Zoom Call · 5 Attendees
                  </span>
                  <span className="bg-[#00b4d8] text-black font-bold px-2 py-0.5 rounded text-[10px]">
                    HD RECORDING
                  </span>
                </div>

                <div className="text-center my-auto">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#161b22] border border-[#00b4d8] flex items-center justify-center text-2xl shadow-xl">
                    🎙️
                  </div>
                  <p className="text-xs font-bold text-white mt-2">Sarah Chen (VP Product)</p>
                  <p className="text-[11px] text-gray-400">
                    &ldquo;Calendar integration is our #1 priority for Q4, MVP in 6 weeks.&rdquo;
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                  <div className="w-1/3 bg-[#00b4d8] h-full" />
                </div>
              </div>

              {/* Transcript snippet preview */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#00b4d8]/10 border-l-2 border-[#00b4d8]">
                  <span className="font-bold text-[#00b4d8]">Sarah Chen [00:15]:</span>
                  <span className="text-gray-200 ml-2">
                    Let&apos;s finalize the Q4 commitments before we share with leadership.
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#12161f]">
                  <span className="font-bold text-purple-400">Priya Patel [00:32]:</span>
                  <span className="text-gray-300 ml-2">
                    Tech spec for Google Calendar & Outlook is ready for architecture review.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: AI Summary with Interactive Template Switcher */}
            <div className="p-5 flex flex-col justify-between bg-[#12161f]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Instant AI Summary
                  </span>
                  <div className="flex gap-1 bg-[#0d1117] p-1 rounded-lg border border-[#21262d]">
                    {['general', 'sales', 'engineering'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setDemoTemplate(t)}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${
                          demoTemplate === t ? 'bg-[#00b4d8] text-black' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-[#0d1117] p-3 rounded-xl border border-[#21262d]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Executive Overview</span>
                    <p className="text-gray-200 mt-1 leading-relaxed">
                      {demoTemplate === 'general' &&
                        'The team aligned on shipping the Calendar Integration MVP within 6 weeks and staging AI summarization for closed beta.'}
                      {demoTemplate === 'sales' &&
                        'Customer demand high: 3 enterprise deals delayed due to missing automated calendar sync. Shipping MVP unlocks $140k ARR pipeline.'}
                      {demoTemplate === 'engineering' &&
                        'Technical decisions made: OAuth tokens will refresh via Redis cache with fallback chain to PostgreSQL. Alex and Jordan pairing tomorrow.'}
                    </p>
                  </div>

                  <div className="bg-[#0d1117] p-3 rounded-xl border border-[#21262d]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Extracted Action Items</span>
                    <ul className="mt-2 space-y-1.5 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-[#00b4d8]">✓</span>
                        <span>Priya: Share project plan by Friday EOD</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#00b4d8]">✓</span>
                        <span>James: Review React onboarding flow components</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#00b4d8]">✓</span>
                        <span>Marcus: Schedule pricing review with finance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#21262d] flex justify-between items-center text-xs">
                <span className="text-gray-400">Powered by Claude 3.5 Sonnet</span>
                <Link
                  href="/dashboard"
                  className="bg-[#00b4d8] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#0096c7]"
                >
                  Explore Full Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
            WHY TEAMS LOVE FATHOM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Engineered for high-performing teams
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#12161f] border border-[#21262d] hover:border-[#00b4d8]/50 p-6 rounded-2xl transition-all hover:scale-[1.02]">
            <span className="text-3xl mb-4 block">🎙️</span>
            <h3 className="text-base font-bold text-white mb-2">99.8% Accurate Transcripts</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              State-of-the-art speaker separation, acronym handling, and multi-speaker transcription for Zoom, Google Meet, and Microsoft Teams.
            </p>
          </div>

          <div className="bg-[#12161f] border border-[#21262d] hover:border-[#00b4d8]/50 p-6 rounded-2xl transition-all hover:scale-[1.02]">
            <span className="text-3xl mb-4 block">⚡</span>
            <h3 className="text-base font-bold text-white mb-2">Mid-Call Moment Highlighting</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Click a single button during any meeting to bookmark critical insights. Fathom captures the surrounding 30 seconds for instant sharing.
            </p>
          </div>

          <div className="bg-[#12161f] border border-[#21262d] hover:border-[#00b4d8]/50 p-6 rounded-2xl transition-all hover:scale-[1.02]">
            <span className="text-3xl mb-4 block">🤖</span>
            <h3 className="text-base font-bold text-white mb-2">Multi-Template AI Summaries</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Different meetings need different notes. Switch seamlessly between Sales BANT summaries, 1-on-1 coaching notes, and Engineering sprint recaps.
            </p>
          </div>

          <div className="bg-[#12161f] border border-[#21262d] hover:border-[#00b4d8]/50 p-6 rounded-2xl transition-all hover:scale-[1.02]">
            <span className="text-3xl mb-4 block">🔗</span>
            <h3 className="text-base font-bold text-white mb-2">Frictionless Public Clip Sharing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Share a clean timestamped clip link with clients, prospects, or executives who don&apos;t have a Fathom account.
            </p>
          </div>

          <div className="bg-[#12161f] border border-[#21262d] hover:border-[#00b4d8]/50 p-6 rounded-2xl transition-all hover:scale-[1.02]">
            <span className="text-3xl mb-4 block">📊</span>
            <h3 className="text-base font-bold text-white mb-2">Team Analytics & Coaching</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Track talk-time ratios, customer objections, and monologue lengths across your entire sales and customer success team.
            </p>
          </div>

          <div className="bg-[#12161f] border border-[#21262d] hover:border-[#00b4d8]/50 p-6 rounded-2xl transition-all hover:scale-[1.02]">
            <span className="text-3xl mb-4 block">🔄</span>
            <h3 className="text-base font-bold text-white mb-2">Automatic CRM Sync</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Automatically logs call notes, action items, and deal sentiment into Salesforce, HubSpot, Slack, and Notion without lifting a finger.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Free forever for individuals. Scale with your team.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Free Plan</h3>
              <p className="text-xs text-gray-400 mt-1">Perfect for individuals</p>
              <div className="text-3xl font-extrabold text-white my-4">$0</div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>✓ Unlimited meeting recording</li>
                <li>✓ Unlimited transcripts</li>
                <li>✓ Basic AI summaries</li>
                <li>✓ Public clip sharing</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="mt-6 w-full bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-white text-center py-2.5 rounded-xl text-xs font-bold block"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-[#161b22] border-2 border-[#00b4d8] rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(0,180,216,0.2)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00b4d8] text-black text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
              MOST POPULAR
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Fathom Pro</h3>
              <p className="text-xs text-gray-400 mt-1">Advanced AI & customization</p>
              <div className="text-3xl font-extrabold text-white my-4">
                $15 <span className="text-xs text-gray-400 font-normal">/ user / mo</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>✓ Everything in Free</li>
                <li>✓ Advanced Claude 3.5 Summaries</li>
                <li>✓ Custom summary templates</li>
                <li>✓ Automated action item sync</li>
                <li>✓ Notion & Slack integrations</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="mt-6 w-full bg-[#00b4d8] hover:bg-[#0096c7] text-black text-center py-2.5 rounded-xl text-xs font-bold block"
            >
              Start 14-Day Trial
            </Link>
          </div>

          {/* Team Edition */}
          <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Team Edition</h3>
              <p className="text-xs text-gray-400 mt-1">For sales & CS organizations</p>
              <div className="text-3xl font-extrabold text-white my-4">
                $29 <span className="text-xs text-gray-400 font-normal">/ user / mo</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>✓ Everything in Pro</li>
                <li>✓ Salesforce & HubSpot auto-logging</li>
                <li>✓ Team conversation analytics</li>
                <li>✓ Shared call playlists & coaching</li>
                <li>✓ Deal momentum signals</li>
              </ul>
            </div>
            <Link
              href="/dashboard?tab=team"
              className="mt-6 w-full bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-white text-center py-2.5 rounded-xl text-xs font-bold block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#21262d] bg-[#0d1117] px-6 py-8 text-center text-xs text-gray-500">
        <p>© 2026 Fathom Clone — Built for 8x Product Engineering Assignment. All rights reserved.</p>
      </footer>

      {/* Test Call Modal */}
      <TestCallModal isOpen={isTestCallOpen} onClose={() => setIsTestCallOpen(false)} />
    </div>
  )
}

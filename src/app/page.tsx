'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { TestCallModal } from '@/components/test-call-modal'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else { setCount(Math.floor(current)) }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])
  return <>{count.toLocaleString()}{suffix}</>
}

export default function LandingPage() {
  const [isTestCallOpen, setIsTestCallOpen] = useState(false)
  const [demoTemplate, setDemoTemplate] = useState('general')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen hero-gradient text-white flex flex-col font-sans selection:bg-[#00b4d8]/30 selection:text-white">

      {/* ===================== NAVBAR ===================== */}
      <nav className="sticky top-0 z-50"
        style={{
          background: 'rgba(6, 10, 16, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(30, 37, 53, 0.6)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.5)',
        }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-white font-black text-xl tracking-widest group-hover:text-[#00b4d8] transition-colors duration-200">FATHOM</span>
              <svg className="w-5 h-5 text-[#00b4d8] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 14.5L10 8.5L12 10.5L6 16.5L4 14.5Z" />
                <path d="M10 14.5L16 8.5L18 10.5L12 16.5L10 14.5Z" opacity="0.75" />
                <path d="M16 14.5L20 10.5L22 12.5L18 16.5L16 14.5Z" opacity="0.5" />
              </svg>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-xs font-medium">
              {['Features', 'Demo', 'Team Edition', 'Pricing'].map((item) => (
                <a key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#8b9ab2] hover:text-white transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-xs font-semibold text-[#8b9ab2] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#111620] transition-all">
              Sign In
            </Link>
            <Link href="/dashboard"
              className="btn-primary text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5">
              <span>Launch App</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===================== HERO ===================== */}
      <section className="relative pt-24 pb-20 px-4 text-center overflow-hidden">
        {/* Multi-layer ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,180,216,0.13) 0%, transparent 70%)',
          }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,180,216,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.6) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />

        <div className={`max-w-4xl mx-auto relative z-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(17,22,32,0.8)',
              border: '1px solid rgba(30,37,53,0.8)',
              backdropFilter: 'blur(12px)',
            }}>
            <span className="w-2 h-2 rounded-full bg-[#00b4d8]" style={{ boxShadow: '0 0 8px rgba(0,180,216,0.8)', animation: 'pulseGlow 2s ease-in-out infinite' }} />
            <span className="text-xs text-[#8b9ab2] font-medium">#1 Rated AI Meeting Assistant on G2 &amp; Zoom App Store</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.08] mb-6">
            <span className="text-white">Never take meeting</span>
            <br />
            <span className="gradient-text-subtle">notes again.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8b9ab2] max-w-2xl mx-auto mb-10 leading-relaxed">
            Fathom records, transcribes, highlights, and summarizes your meetings with superhuman accuracy.
            Stay 100% present while AI handles the documentation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard"
              className="btn-primary w-full sm:w-auto text-sm font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2">
              <span>Open Fathom Free</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <button
              onClick={() => setIsTestCallOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 text-sm font-bold px-7 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'rgba(17,22,32,0.8)',
                border: '1px solid rgba(30,37,53,0.8)',
                color: '#e8edf5',
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,180,216,0.4)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(30,37,53,0.8)'}
            >
              <span style={{ fontSize: 16 }}>📹</span>
              <span>Simulate 2-Min Test Call</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Active Teams', value: 80000, suffix: '+' },
              { label: 'Meetings Recorded', value: 12, suffix: 'M+' },
              { label: 'G2 Rating', value: 4.9, suffix: '/5' },
              { label: 'Time Saved / User / Mo', value: 4.2, suffix: 'hrs' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-4 px-3 rounded-2xl animate-fade-up"
                style={{
                  animationDelay: `${i * 100 + 200}ms`,
                  background: 'rgba(17,22,32,0.5)',
                  border: '1px solid rgba(30,37,53,0.6)',
                  backdropFilter: 'blur(10px)',
                }}>
                <div className="text-2xl font-black gradient-text-subtle">
                  {mounted ? (
                    typeof stat.value === 'number' && stat.value > 100
                      ? <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      : <>{stat.value}{stat.suffix}</>
                  ) : <>—</>}
                </div>
                <div className="text-[10px] text-[#4a5568] mt-1 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== INTERACTIVE DEMO ===================== */}
      <section id="demo" className="py-16 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-widest text-[#00b4d8] font-black">INTERACTIVE EXPERIENCE</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">See Fathom in action</h2>
          <p className="text-sm text-[#4a5568] mt-2">Click timestamps, switch AI summary templates, try action items.</p>
        </div>

        {/* Demo Window */}
        <div className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(12,16,24,0.95)',
            border: '1px solid rgba(30,37,53,0.8)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02)',
          }}>
          {/* Title bar */}
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ background: 'rgba(8,12,20,0.8)', borderBottom: '1px solid rgba(30,37,53,0.6)' }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-[#4a5568] ml-3 font-mono">fathom.video/meetings/q4-roadmap-planning</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#10b981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" style={{ boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
              AI Summary Ready
            </div>
          </div>

          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1e2535]">
            {/* Left: Video Preview */}
            <div className="p-5 space-y-4">
              {/* Video frame */}
              <div className="aspect-video rounded-xl overflow-hidden relative border"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,22,30,1) 0%, rgba(10,15,25,1) 100%)',
                  borderColor: 'rgba(30,37,53,0.6)',
                }}>
                <div className="absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,180,216,0.06) 0%, transparent 70%)' }} />
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.6)', color: '#e8edf5', backdropFilter: 'blur(8px)' }}>
                    📹 Zoom Call · 5 Attendees
                  </span>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded"
                    style={{ background: '#00b4d8', color: '#000' }}>HD</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto border-2 flex items-center justify-center text-2xl mb-3"
                      style={{
                        background: 'rgba(17,22,32,0.9)',
                        borderColor: '#00b4d8',
                        boxShadow: '0 0 20px rgba(0,180,216,0.3)',
                      }}>
                      🎙️
                    </div>
                    <p className="text-xs font-bold text-white">Sarah Chen (VP Product)</p>
                    <p className="text-[10px] text-[#8b9ab2] mt-1 max-w-[200px] mx-auto">
                      &ldquo;Calendar integration is our #1 priority for Q4, MVP in 6 weeks.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(30,37,53,0.8)' }}>
                    <div className="h-full rounded-full w-1/3"
                      style={{ background: 'linear-gradient(90deg, #00b4d8, #7c3aed)' }} />
                  </div>
                  <div className="flex justify-between mt-1 text-[9px] text-[#4a5568]">
                    <span>22:15</span><span>58:42</span>
                  </div>
                </div>
              </div>

              {/* Transcript snippet */}
              <div className="space-y-2">
                {[
                  { speaker: 'Sarah Chen', color: '#00b4d8', time: '00:15', text: "Let's finalize the Q4 commitments before we share with leadership.", active: true },
                  { speaker: 'Priya Patel', color: '#a78bfa', time: '00:32', text: "Tech spec for Google Calendar & Outlook is ready for architecture review.", active: false },
                ].map((seg, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl transition-all"
                    style={{
                      background: seg.active ? 'rgba(0,180,216,0.06)' : 'rgba(17,22,32,0.5)',
                      borderLeft: `2px solid ${seg.active ? '#00b4d8' : 'transparent'}`,
                    }}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                      style={{ background: seg.color.includes('a78') ? '#7c3aed' : '#0096c7' }}>
                      {seg.speaker.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold" style={{ color: seg.color }}>{seg.speaker}</span>
                        <span className="text-[9px] font-mono text-[#4a5568]">[{seg.time}]</span>
                      </div>
                      <p className="text-[10px] text-[#8b9ab2] leading-relaxed">{seg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Summary Panel */}
            <div className="p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-white uppercase tracking-wider">Instant AI Summary</span>
                <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid rgba(30,37,53,0.6)' }}>
                  {['general', 'sales', 'engineering'].map((t) => (
                    <button key={t} onClick={() => setDemoTemplate(t)}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-md capitalize transition-all duration-200"
                      style={{
                        background: demoTemplate === t ? 'linear-gradient(135deg, #00b4d8, #0096c7)' : 'transparent',
                        color: demoTemplate === t ? '#000' : '#8b9ab2',
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="p-3.5 rounded-xl" style={{ background: 'rgba(8,12,20,0.7)', border: '1px solid rgba(30,37,53,0.6)' }}>
                  <span className="text-[9px] font-black text-[#4a5568] uppercase tracking-wider">Executive Overview</span>
                  <p className="text-xs text-[#c8d8e8] mt-2 leading-relaxed">
                    {demoTemplate === 'general' && 'The team aligned on shipping the Calendar Integration MVP within 6 weeks and staging AI summarization for closed beta.'}
                    {demoTemplate === 'sales' && 'Customer demand high: 3 enterprise deals delayed due to missing automated calendar sync. Shipping MVP unlocks $140k ARR pipeline.'}
                    {demoTemplate === 'engineering' && 'OAuth tokens will refresh via Redis cache with fallback chain to PostgreSQL. Alex and Jordan pairing tomorrow on architecture.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl" style={{ background: 'rgba(8,12,20,0.7)', border: '1px solid rgba(30,37,53,0.6)' }}>
                  <span className="text-[9px] font-black text-[#4a5568] uppercase tracking-wider">Extracted Action Items</span>
                  <ul className="mt-2 space-y-2">
                    {[
                      'Priya: Share project plan by Friday EOD',
                      'James: Review React onboarding flow components',
                      'Marcus: Schedule pricing review with finance',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] text-[#8b9ab2]">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black mt-0.5"
                          style={{ background: 'rgba(0,180,216,0.15)', color: '#00b4d8', border: '1px solid rgba(0,180,216,0.2)' }}>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(30,37,53,0.5)' }}>
                <span className="text-[10px] text-[#4a5568]">Powered by Claude 3.5 Sonnet</span>
                <Link href="/dashboard"
                  className="btn-primary text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5">
                  Explore Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section id="features" className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-[#00b4d8] font-black">WHY TEAMS LOVE FATHOM</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Engineered for high-performing teams</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: '🎙️', title: '99.8% Accurate Transcripts', desc: 'State-of-the-art speaker separation, acronym handling, and multi-speaker transcription for Zoom, Google Meet, and Microsoft Teams.', color: '#00b4d8' },
            { icon: '⚡', title: 'Mid-Call Moment Highlighting', desc: 'Click a single button during any meeting to bookmark critical insights. Fathom captures surrounding 30 seconds for instant sharing.', color: '#7c3aed' },
            { icon: '🤖', title: 'Multi-Template AI Summaries', desc: 'Switch seamlessly between Sales BANT summaries, 1-on-1 coaching notes, and Engineering sprint recaps with a single click.', color: '#10b981' },
            { icon: '🔗', title: 'Frictionless Clip Sharing', desc: 'Share timestamped clip links with clients and prospects who don\'t have a Fathom account — no login required.', color: '#f59e0b' },
            { icon: '📊', title: 'Team Analytics & Coaching', desc: 'Track talk-time ratios, customer objections, and monologue lengths across your entire sales and customer success team.', color: '#00b4d8' },
            { icon: '🔄', title: 'Automatic CRM Sync', desc: 'Automatically logs call notes, action items, and deal sentiment into Salesforce, HubSpot, Slack, and Notion without lifting a finger.', color: '#7c3aed' },
          ].map((feature, i) => (
            <div key={i} className="glass-card card-hover rounded-2xl p-6 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}08)`,
                  border: `1px solid ${feature.color}30`,
                }}>
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-[#8b9ab2] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-[#00b4d8] font-black">TRANSPARENT PRICING</span>
          <h2 className="text-3xl font-black text-white mt-2">Free forever for individuals.</h2>
          <p className="text-sm text-[#4a5568] mt-2">Scale seamlessly with your team.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Free */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-base font-black text-white">Free</h3>
              <p className="text-xs text-[#4a5568] mt-1">Perfect for individuals</p>
              <div className="text-4xl font-black text-white my-5">\$0
                <span className="text-sm text-[#4a5568] font-normal"> / forever</span>
              </div>
              <ul className="space-y-2.5">
                {['Unlimited recording', 'Unlimited transcripts', 'Basic AI summaries', 'Public clip sharing'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#8b9ab2]">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0"
                      style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/dashboard"
              className="mt-6 w-full btn-ghost text-center py-3 text-xs font-bold rounded-xl block">
              Get Started Free
            </Link>
          </div>

          {/* Pro — Featured */}
          <div className="rounded-2xl p-6 flex flex-col relative"
            style={{
              background: 'linear-gradient(135deg, rgba(0,180,216,0.08) 0%, rgba(124,58,237,0.05) 100%)',
              border: '1px solid rgba(0,180,216,0.35)',
              boxShadow: '0 0 40px rgba(0,180,216,0.1), 0 20px 60px rgba(0,0,0,0.4)',
            }}>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-4 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #00b4d8, #0096c7)', color: '#000' }}>
              MOST POPULAR
            </span>
            <div className="flex-1">
              <h3 className="text-base font-black text-white">Fathom Pro</h3>
              <p className="text-xs text-[#4a5568] mt-1">Advanced AI &amp; customization</p>
              <div className="text-4xl font-black text-white my-5">\$15
                <span className="text-sm text-[#4a5568] font-normal"> / user / mo</span>
              </div>
              <ul className="space-y-2.5">
                {['Everything in Free', 'Advanced Claude 3.5 Summaries', 'Custom summary templates', 'Automated action item sync', 'Notion & Slack integrations'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#8b9ab2]">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0"
                      style={{ background: 'rgba(0,180,216,0.15)', color: '#00b4d8', border: '1px solid rgba(0,180,216,0.2)' }}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/dashboard" className="btn-primary mt-6 w-full text-center py-3 text-xs font-black rounded-xl block">
              Start 14-Day Trial
            </Link>
          </div>

          {/* Team */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-base font-black text-white">Team Edition</h3>
              <p className="text-xs text-[#4a5568] mt-1">For sales &amp; CS organizations</p>
              <div className="text-4xl font-black text-white my-5">\$29
                <span className="text-sm text-[#4a5568] font-normal"> / user / mo</span>
              </div>
              <ul className="space-y-2.5">
                {['Everything in Pro', 'Salesforce & HubSpot sync', 'Team conversation analytics', 'Shared playlists & coaching', 'Deal momentum signals'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#8b9ab2]">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0"
                      style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/dashboard?tab=team"
              className="mt-6 w-full btn-ghost text-center py-3 text-xs font-bold rounded-xl block">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== CTA SECTION ===================== */}
      <section className="py-20 px-4 max-w-3xl mx-auto w-full text-center">
        <div className="rounded-3xl p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,180,216,0.08) 0%, rgba(124,58,237,0.05) 100%)',
            border: '1px solid rgba(0,180,216,0.2)',
          }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,180,216,0.1) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4">Ready to reclaim your attention?</h2>
            <p className="text-sm text-[#8b9ab2] mb-8 max-w-lg mx-auto">Join 80,000+ teams who&apos;ve stopped taking notes and started having better conversations.</p>
            <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 text-sm font-black px-8 py-4 rounded-2xl">
              <span>Start Free Today</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-[11px] text-[#4a5568] mt-4">No credit card required · Free forever for individuals</p>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="mt-auto px-6 py-8"
        style={{ borderTop: '1px solid rgba(30,37,53,0.6)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-sm tracking-widest">FATHOM</span>
            <svg className="w-4 h-4 text-[#00b4d8]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 14.5L10 8.5L12 10.5L6 16.5L4 14.5Z" />
              <path d="M10 14.5L16 8.5L18 10.5L12 16.5L10 14.5Z" opacity="0.7" />
            </svg>
          </div>
          <p className="text-[11px] text-[#4a5568]">
            © 2026 Fathom Clone — Built for 8x Product Engineering Assignment.
          </p>
          <div className="flex items-center gap-5 text-[10px] text-[#4a5568] font-medium">
            <span>SOC2 TYPE II</span>
            <span>GDPR</span>
            <span>256-BIT SSL</span>
          </div>
        </div>
      </footer>

      <TestCallModal isOpen={isTestCallOpen} onClose={() => setIsTestCallOpen(false)} />
    </div>
  )
}

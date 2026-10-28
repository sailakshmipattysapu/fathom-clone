'use client'

import React, { useState } from 'react'

interface OnboardingTutorialModalProps {
  isOpen: boolean
  onClose: () => void
  onStartTestCall: () => void
}

export function OnboardingTutorialModal({
  isOpen,
  onClose,
  onStartTestCall,
}: OnboardingTutorialModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: '1. Connect Your Calendar & Video Tool',
      description:
        'Fathom automatically syncs with Google Calendar or Outlook and joins your Zoom, Google Meet, or Microsoft Teams calls seamlessly.',
      badge: 'Zero Configuration',
      graphic: '🗓️ ⇄ 📹',
    },
    {
      title: '2. Silent, Bot-Free Capture',
      description:
        'Fathom captures high-fidelity audio and video from the call with zero lag and zero disruption to your meeting flow.',
      badge: 'Background Capture',
      graphic: '🎧 ⚡ 📼',
    },
    {
      title: '3. Instant Timestamped Transcripts',
      description:
        'Every word is transcribed with speaker identification and precise timestamps. Click any word to jump straight to that moment.',
      badge: 'Interactive Audio Sync',
      graphic: '🎙️ ➔ 📝',
    },
    {
      title: '4. AI Summaries & Multi-Templates',
      description:
        'Switch between General, Sales (BANT & Objections), Engineering Sync, or 1-on-1 coaching templates with a single click.',
      badge: 'Powered by Claude AI',
      graphic: '🤖 ➔ 📋',
    },
    {
      title: '5. Automated Action Items Extraction',
      description:
        'Never let a task fall through the cracks. Fathom extracts who promised what, deadlines, and automatically pushes them to Slack or Notion.',
      badge: 'Task Intelligence',
      graphic: '✅ ➔ 🚀',
    },
    {
      title: '6. Highlight & Share Clips Instantly',
      description:
        'Click to bookmark moments mid-call or post-call. Share a trim link with customers or team members who were not on the call.',
      badge: 'Public Clip Links',
      graphic: '✂️ ➔ 🔗',
    },
  ]

  if (!isOpen) return null

  const slide = slides[currentSlide]

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-xl rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl animate-scale-in"
        style={{
          background: 'rgba(14, 19, 30, 0.98)',
          border: '1px solid rgba(30, 37, 53, 0.9)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,180,216,0.1)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#111620] transition-all"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-widest text-[#00b4d8] font-black">
            Interactive Product Tour
          </span>
          <h2 className="text-2xl font-black mt-1">Master Fathom in 60 Seconds</h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-2"
            style={{
              background: 'rgba(35, 33, 21, 0.9)',
              border: '1px solid rgba(99, 80, 22, 0.6)',
              color: '#f5c518',
            }}
          >
            <span>⭐</span>
            <span>Earn 5 Points upon completion</span>
          </div>
        </div>

        {/* Slide Card */}
        <div 
          className="rounded-2xl p-8 text-center min-h-[220px] flex flex-col items-center justify-center transition-all duration-300"
          style={{
            background: 'rgba(8, 12, 20, 0.8)',
            border: '1px solid rgba(30, 37, 53, 0.8)',
          }}
        >
          <div className="text-5xl mb-4 select-none animate-float">{slide.graphic}</div>
          <span className="badge badge-cyan mb-3">
            {slide.badge}
          </span>
          <h3 className="text-lg font-bold text-white mb-2">{slide.title}</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">{slide.description}</p>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-gradient-to-r from-[#00b4d8] to-[#7c3aed] shadow-[0_0_8px_rgba(0,180,216,0.6)]' : 'w-2 bg-[#21262d]'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div 
          className="flex items-center justify-between mt-6 pt-4"
          style={{ borderTop: '1px solid rgba(30, 37, 53, 0.6)' }}
        >
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="text-xs font-semibold text-gray-400 hover:text-white disabled:opacity-30 px-3 py-1.5 transition-colors"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((prev) => prev + 1)}
                className="btn-primary text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose()
                  onStartTestCall()
                }}
                className="btn-primary text-xs font-black px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(0,180,216,0.4)]"
              >
                Try It Live: Start Test Call ▶
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

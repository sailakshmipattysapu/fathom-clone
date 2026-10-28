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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#12161f] border border-[#30363d] rounded-2xl max-w-xl w-full p-6 text-white relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded hover:bg-[#21262d]"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
            Interactive Product Tour
          </span>
          <h2 className="text-2xl font-bold mt-1">Learn how to use Fathom</h2>
          <div className="inline-flex items-center gap-1.5 bg-[#232115] border border-[#635016] text-[#f5c518] px-3 py-1 rounded-full text-xs font-semibold mt-2">
            <span>⭐</span>
            <span>Earn 5 Points upon completion</span>
          </div>
        </div>

        {/* Slide Card */}
        <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-8 text-center min-h-[220px] flex flex-col items-center justify-center">
          <div className="text-5xl mb-4 select-none">{slide.graphic}</div>
          <span className="text-[11px] font-semibold bg-[#161b22] border border-[#30363d] text-[#00b4d8] px-2.5 py-0.5 rounded-full mb-2">
            {slide.badge}
          </span>
          <h3 className="text-lg font-bold text-white mb-2">{slide.title}</h3>
          <p className="text-sm text-gray-400 max-w-md leading-relaxed">{slide.description}</p>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide ? 'w-6 bg-[#00b4d8]' : 'w-2 bg-[#21262d]'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#21262d]">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="text-xs text-gray-400 hover:text-white disabled:opacity-30 px-3 py-1.5"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((prev) => prev + 1)}
                className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-semibold text-xs px-4 py-2 rounded-lg transition-all"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose()
                  onStartTestCall()
                }}
                className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold text-xs px-5 py-2 rounded-lg shadow-lg"
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

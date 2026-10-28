'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface TestCallModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TestCallModal({ isOpen, onClose }: TestCallModalProps) {
  const router = useRouter()
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle')
  const [callDuration, setCallDuration] = useState(0)
  const [transcriptLines, setTranscriptLines] = useState<Array<{ speaker: string; text: string; time: number }>>([])
  const [highlights, setHighlights] = useState<string[]>([])
  const [highlightToast, setHighlightToast] = useState<string | null>(null)

  const simulatedScript = [
    { speaker: 'Alex (Product Lead)', text: 'Hey Sailakshmi! Thanks for hopping onto this quick test call.', delay: 2 },
    { speaker: 'Alex (Product Lead)', text: 'Fathom is now actively recording and generating real-time transcription.', delay: 6 },
    { speaker: 'You', text: 'Looks great! I can see the live transcript capturing my voice.', delay: 10 },
    { speaker: 'Alex (Product Lead)', text: 'Exactly. Try clicking the "Highlight Moment" button right now — it marks key moments mid-call.', delay: 14 },
    { speaker: 'Alex (Product Lead)', text: 'Our key takeaway: Calendar sync is ready, and we need to deploy the production build by Friday.', delay: 19 },
    { speaker: 'Alex (Product Lead)', text: 'Action item for Priya: review the OpenAPI spec. Action item for Marcus: setup finance sync.', delay: 24 },
    { speaker: 'Alex (Product Lead)', text: 'When you are ready, hit "End Call & Generate Notes" to see the full AI summary and highlights.', delay: 28 },
  ]

  // Timer effect
  useEffect(() => {
    let interval: any
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [callState])

  // Script player effect
  useEffect(() => {
    if (callState !== 'connected') return

    const timeouts = simulatedScript.map((line) => {
      return setTimeout(() => {
        setTranscriptLines((prev) => [...prev, { speaker: line.speaker, text: line.text, time: line.delay }])
      }, line.delay * 1000)
    })

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [callState])

  const handleStartCall = () => {
    setCallState('calling')
    setTimeout(() => {
      setCallState('connected')
    }, 1500)
  }

  const handleAddHighlight = () => {
    const timestampStr = `${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`
    const note = `Highlight captured mid-call at ${timestampStr}`
    setHighlights((prev) => [...prev, note])
    setHighlightToast(note)
    setTimeout(() => setHighlightToast(null), 3000)
  }

  const handleEndCall = async () => {
    setCallState('completed')
    // Navigate to meeting detail to see the generated summary & transcript!
    setTimeout(() => {
      onClose()
      router.push('/meetings/1')
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#12161f] border border-[#30363d] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-white">
        {/* Header bar */}
        <div className="px-5 py-3.5 bg-[#0d1117] border-b border-[#21262d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold">
              {callState === 'connected' ? 'Fathom Live Notetaker — Meeting in Progress' : 'Start Test Call'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-[#21262d]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {callState === 'idle' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#1c2333] border-2 border-[#00b4d8] flex items-center justify-center text-3xl mb-4 shadow-[0_0_20px_rgba(0,180,216,0.3)]">
              📹
            </div>
            <h3 className="text-xl font-bold mb-2">Simulate a Real-Time Meeting Call</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
              Test how Fathom joins your meeting, transcribes speech live, captures mid-call highlights with one click, and synthesizes action items.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleStartCall}
                className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <span>▶ Start 2-Min Test Call</span>
              </button>
              <button
                onClick={onClose}
                className="bg-[#161b22] hover:bg-[#21262d] text-gray-300 px-5 py-2.5 rounded-xl border border-[#30363d]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {callState === 'calling' && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#00b4d8] border-t-transparent animate-spin mb-4" />
            <h3 className="text-lg font-semibold">Connecting to Fathom Notetaker Bot...</h3>
            <p className="text-xs text-gray-400 mt-1">Simulating Zoom / Google Meet room connection</p>
          </div>
        )}

        {callState === 'connected' && (
          <div className="flex flex-col h-[460px]">
            {/* Top Video Stage */}
            <div className="flex-1 bg-[#090d14] relative p-4 flex flex-col justify-between">
              {/* Speaker Video / Avatar */}
              <div className="flex items-center justify-center h-full">
                <div className="relative text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 p-1 mx-auto shadow-2xl relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Speaker"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-[#090d14] flex items-center justify-center text-[10px]">
                      🎙️
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white mt-2">Alex — Fathom Test Host</p>
                  <p className="text-xs text-gray-400">Speaking now...</p>
                </div>
              </div>

              {/* Status bar */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-gray-300 flex items-center gap-2 border border-[#30363d]">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>
                  {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-gray-500">|</span>
                <span className="text-[#00b4d8] text-[10px]">FATHOM BOT RECORDING</span>
              </div>

              {/* Highlight Notification Toast */}
              {highlightToast && (
                <div className="absolute top-4 right-4 bg-[#00b4d8] text-black font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl animate-bounce">
                  ⭐ {highlightToast}
                </div>
              )}
            </div>

            {/* Live Streaming Transcript */}
            <div className="h-44 bg-[#0d1117] border-t border-[#21262d] p-3 overflow-y-auto space-y-2 text-xs">
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold px-1">
                Live Speech-to-Text Transcript:
              </div>
              {transcriptLines.map((line, index) => (
                <div key={index} className="flex items-start gap-2 animate-fadeIn">
                  <span className="font-semibold text-[#00b4d8] flex-shrink-0">{line.speaker}:</span>
                  <span className="text-gray-200">{line.text}</span>
                </div>
              ))}
            </div>

            {/* Bottom Call Controls */}
            <div className="p-3 bg-[#161b22] border-t border-[#21262d] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Highlights captured:</span>
                <span className="bg-[#21262d] text-[#00b4d8] px-2 py-0.5 rounded font-mono font-bold">
                  {highlights.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Highlight Button Mid-Call */}
                <button
                  onClick={handleAddHighlight}
                  className="bg-[#21262d] hover:bg-[#30363d] border border-[#00b4d8]/50 hover:border-[#00b4d8] text-[#00b4d8] font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <span>⭐️</span>
                  <span>Highlight Moment</span>
                </button>

                {/* End Call Button */}
                <button
                  onClick={handleEndCall}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <span>📞 End Call & Generate Notes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {callState === 'completed' && (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-xl font-bold mb-2">Meeting Finished!</h3>
            <p className="text-sm text-gray-400">
              Generating Claude AI meeting summary, action items, and timestamped transcript...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

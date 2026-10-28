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
    { speaker: 'You', text: 'Looks great! I can see the live transcript capturing my voice with near-zero latency.', delay: 10 },
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
    setTimeout(() => {
      onClose()
      router.push('/meetings/1')
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative text-white animate-scale-in"
        style={{
          background: 'rgba(14, 19, 30, 0.98)',
          border: '1px solid rgba(30, 37, 53, 0.9)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,180,216,0.1)',
        }}
      >
        {/* Header bar */}
        <div 
          className="px-5 py-3.5 flex items-center justify-between"
          style={{
            background: 'rgba(8, 12, 20, 0.85)',
            borderBottom: '1px solid rgba(30, 37, 53, 0.8)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <span 
              className={`w-2.5 h-2.5 rounded-full ${callState === 'connected' ? 'bg-red-500 animate-pulse' : 'bg-[#00b4d8]'}`}
              style={callState === 'connected' ? { boxShadow: '0 0 10px rgba(239,68,68,0.8)' } : {}}
            />
            <span className="text-xs font-bold tracking-wide uppercase text-gray-300">
              {callState === 'connected' ? 'Fathom Live Notetaker — Meeting in Progress' : 'Start Test Call'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#111620] transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {callState === 'idle' && (
          <div className="p-8 sm:p-10 text-center animate-fade-up">
            <div 
              className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-5 animate-float"
              style={{
                background: 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(124,58,237,0.15))',
                border: '1px solid rgba(0,180,216,0.3)',
                boxShadow: '0 0 30px rgba(0,180,216,0.25)',
              }}
            >
              📹
            </div>
            <h3 className="text-2xl font-black mb-2 text-white">Simulate a Live Meeting Call</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
              Experience Fathom entering your room, streaming speech-to-text in real time, bookmarking critical highlights mid-call, and compiling instant AI summaries.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleStartCall}
                className="btn-primary text-xs font-black px-7 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <span>▶ Start 2-Min Test Call</span>
              </button>
              <button
                onClick={onClose}
                className="btn-ghost text-xs font-semibold px-5 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {callState === 'calling' && (
          <div className="p-14 text-center animate-fade-up">
            <div 
              className="w-16 h-16 mx-auto rounded-full border-3 border-[#00b4d8] border-t-transparent animate-spin mb-5"
              style={{ boxShadow: '0 0 25px rgba(0,180,216,0.3)' }}
            />
            <h3 className="text-base font-bold text-white mb-1">Connecting to Fathom Bot...</h3>
            <p className="text-xs text-[#00b4d8] font-mono">Initializing audio capture pipeline & WebRTC socket</p>
          </div>
        )}

        {callState === 'connected' && (
          <div className="flex flex-col h-[480px]">
            {/* Top Video Stage */}
            <div className="flex-1 bg-[#060a10] relative p-4 flex flex-col justify-between overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0,180,216,0.2) 0%, transparent 70%)',
                }}
              />

              {/* Speaker Video / Avatar */}
              <div className="flex items-center justify-center h-full relative z-10">
                <div className="relative text-center">
                  <div 
                    className="w-24 h-24 rounded-full p-[3px] mx-auto shadow-2xl relative glow-cyan"
                    style={{ background: 'linear-gradient(135deg, #00b4d8, #7c3aed)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Speaker"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-2 border-[#090d14] flex items-center justify-center text-[11px] shadow-lg">
                      🎙️
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white mt-3">Alex Rivera (Product Lead)</p>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] animate-ping" />
                    <span className="text-[10px] text-gray-400 font-mono">Speaking now...</span>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-gray-300 flex items-center gap-2.5 border border-[#30363d] z-20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-white">
                  {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-[#00b4d8] text-[9px] font-bold tracking-wider">FATHOM NOTETAKER ACTIVE</span>
              </div>

              {/* Highlight Notification Toast */}
              {highlightToast && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-[11px] px-3.5 py-1.5 rounded-xl shadow-2xl animate-bounce-in z-20 flex items-center gap-1.5">
                  <span>⭐</span>
                  <span>{highlightToast}</span>
                </div>
              )}
            </div>

            {/* Live Streaming Transcript */}
            <div className="h-44 bg-[#0a0e17] border-t border-[#1e2535] p-3.5 overflow-y-auto space-y-2 text-xs scrollbar-hide">
              <div className="text-[9px] uppercase tracking-widest text-[#00b4d8] font-bold px-1 mb-1">
                Real-Time Streaming Transcript:
              </div>
              {transcriptLines.map((line, index) => (
                <div key={index} className="flex items-start gap-2.5 animate-fade-up">
                  <span className={`text-[11px] font-bold flex-shrink-0 ${line.speaker === 'You' ? 'text-purple-400' : 'text-[#00b4d8]'}`}>
                    {line.speaker}:
                  </span>
                  <span className="text-gray-200 leading-relaxed text-[11px]">{line.text}</span>
                </div>
              ))}
            </div>

            {/* Bottom Call Controls */}
            <div className="p-3.5 bg-[#0f1420] border-t border-[#1e2535] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="text-[11px]">Highlights:</span>
                <span className="badge badge-amber font-mono font-bold">
                  {highlights.length} saved
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Highlight Button Mid-Call */}
                <button
                  onClick={handleAddHighlight}
                  className="bg-[#1a2030] hover:bg-[#222b40] border border-[#f5c518]/40 hover:border-[#f5c518] text-[#f5c518] font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <span>⭐</span>
                  <span>Highlight Moment</span>
                </button>

                {/* End Call Button */}
                <button
                  onClick={handleEndCall}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95 flex items-center gap-1.5"
                >
                  <span>📞</span>
                  <span>End Call & Generate Notes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {callState === 'completed' && (
          <div className="p-14 text-center animate-fade-up">
            <div className="text-4xl mb-3 animate-bounce">✨</div>
            <h3 className="text-2xl font-black mb-2 text-white">Call Completed!</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
              Synthesizing Claude 3.5 summary, extracting high-priority action items, and indexing synchronized video playback...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

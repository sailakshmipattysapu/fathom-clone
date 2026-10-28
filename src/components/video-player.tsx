'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { formatDuration } from '@/lib/utils'

interface VideoPlayerProps {
  videoUrl?: string | null
  title: string
  duration?: number
  currentSpeaker?: string
  onTimeUpdate?: (time: number) => void
  onSeekReady?: (seekFn: (time: number) => void) => void
  onAddHighlight?: (timestamp: number) => void
}

export function VideoPlayer({
  videoUrl,
  title,
  duration = 180,
  currentSpeaker = 'Sarah Chen',
  onTimeUpdate,
  onSeekReady,
  onAddHighlight,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [waveformHeights, setWaveformHeights] = useState<number[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  // Initialize randomized waveform heights
  useEffect(() => {
    const bars = Array.from({ length: 64 }, () => Math.floor(Math.random() * 65) + 20)
    setWaveformHeights(bars)
  }, [])

  const seek = useCallback(
    (time: number) => {
      const clamped = Math.max(0, Math.min(time, duration))
      setCurrentTime(clamped)
      onTimeUpdate?.(clamped)
    },
    [duration, onTimeUpdate]
  )

  useEffect(() => {
    if (onSeekReady) {
      onSeekReady(seek)
    }
  }, [onSeekReady, seek])

  // Playback timer simulation
  useEffect(() => {
    let interval: any
    if (playing) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setPlaying(false)
            return duration
          }
          const next = prev + 0.25 * speed
          onTimeUpdate?.(next)
          return next
        })
      }, 250)
    }
    return () => clearInterval(interval)
  }, [playing, duration, speed, onTimeUpdate])

  function togglePlay() {
    setPlaying(!playing)
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const bar = progressRef.current
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newTime = ratio * duration
    seek(newTime)
  }

  function handleSpeedChange() {
    const speeds = [0.75, 1, 1.25, 1.5, 2]
    const idx = speeds.indexOf(speed)
    const next = speeds[(idx + 1) % speeds.length]
    setSpeed(next)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative w-full bg-[#090d14] border-b border-[#21262d] flex flex-col justify-between overflow-hidden select-none">
      {/* Visualizer Canvas Area */}
      <div className="relative aspect-video max-h-[290px] w-full flex items-center justify-center p-6 bg-gradient-to-b from-[#0b0e14] via-[#0f141f] to-[#090d14]">
        {/* Subtle Video Glow Ring */}
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-2xl relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Speaker"
              className="w-full h-full object-cover rounded-full"
            />
            {playing && (
              <span className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-[#090d14] flex items-center justify-center text-[10px]">
                🎙️
              </span>
            )}
          </div>

          <p className="text-xs font-bold text-white mt-2">{currentSpeaker}</p>
          <p className="text-[10px] text-gray-400">
            {playing ? 'Playing synced audio transcript' : 'Paused · Click Play or click any transcript line'}
          </p>

          {/* Dynamic Audio Waveform Bars */}
          <div className="flex items-center gap-1 h-10 mt-3 px-4">
            {waveformHeights.map((h, i) => {
              const isPast = (i / waveformHeights.length) * 100 <= progress
              return (
                <div
                  key={i}
                  style={{
                    height: playing ? `${Math.max(15, (h * Math.sin(currentTime + i)) % 100)}%` : `${h * 0.4}%`,
                  }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPast ? 'bg-[#00b4d8]' : 'bg-[#21262d]'
                  }`}
                />
              )
            })}
          </div>
        </div>

        {/* Big Center Play Overlay when paused */}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl pl-1 shadow-2xl transition-transform hover:scale-110"
          >
            ▶
          </button>
        )}
      </div>

      {/* Scrub & Control Bar */}
      <div className="bg-[#12161f] border-t border-[#21262d] px-4 py-2.5">
        {/* Progress Bar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-1.5 bg-[#21262d] hover:h-2.5 rounded-full cursor-pointer relative transition-all mb-2"
        >
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-[#00b4d8] rounded-full relative"
          >
            <div className="w-3 h-3 rounded-full bg-white absolute right-0 top-1/2 -translate-y-1/2 shadow" />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#00b4d8] transition-colors p-1"
            >
              {playing ? '⏸ Pause' : '▶ Play'}
            </button>

            <button
              onClick={() => seek(currentTime - 10)}
              className="hover:text-white transition-colors"
              title="Rewind 10s"
            >
              ⟲ 10s
            </button>
            <button
              onClick={() => seek(currentTime + 10)}
              className="hover:text-white transition-colors"
              title="Fast Forward 10s"
            >
              10s ⟳
            </button>

            <span className="font-mono text-gray-400">
              {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Pill */}
            <button
              onClick={handleSpeedChange}
              className="bg-[#21262d] hover:bg-[#30363d] px-2 py-0.5 rounded text-[11px] font-mono text-gray-200"
            >
              {speed}×
            </button>

            {/* Quick Bookmark Moment */}
            <button
              onClick={() => onAddHighlight?.(currentTime)}
              className="bg-[#21262d] hover:bg-[#30363d] border border-[#00b4d8]/40 text-[#00b4d8] px-2.5 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1"
            >
              <span>⭐️</span>
              <span>Highlight Moment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

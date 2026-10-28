'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { formatDuration } from '@/lib/utils'

interface VideoPlayerProps {
  videoUrl: string | null
  title: string
  onTimeUpdate?: (time: number) => void
  onSeekReady?: (seekFn: (time: number) => void) => void
}

export function VideoPlayer({ videoUrl, title, onTimeUpdate, onSeekReady }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const progressRef = useRef<HTMLDivElement>(null)

  const seek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  useEffect(() => {
    if (onSeekReady) {
      onSeekReady(seek)
    }
  }, [onSeekReady, seek])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.pause()
    } else {
      v.play()
    }
    setPlaying(!playing)
  }

  function handleTimeUpdate() {
    const v = videoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
    onTimeUpdate?.(v.currentTime)
  }

  function handleLoadedMetadata() {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const bar = progressRef.current
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newTime = ratio * duration
    seek(newTime)
  }

  function handleSpeedChange() {
    const speeds = [0.75, 1, 1.25, 1.5, 2]
    const idx = speeds.indexOf(speed)
    const next = speeds[(idx + 1) % speeds.length]
    setSpeed(next)
    if (videoRef.current) {
      videoRef.current.playbackRate = next
    }
  }

  function handleFullscreen() {
    if (videoRef.current) {
      videoRef.current.requestFullscreen?.()
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  // Placeholder when no video
  if (!videoUrl) {
    return (
      <div className="relative w-full bg-gray-900" style={{ aspectRatio: '16/9', maxHeight: '280px' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-300 text-sm font-medium">{title}</p>
          <p className="text-gray-600 text-xs mt-1">Video not available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full bg-black group" style={{ aspectRatio: '16/9', maxHeight: '280px' }}>
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
      />

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="w-full h-1.5 bg-gray-600 rounded-full mb-3 cursor-pointer hover:h-2.5 transition-all"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-blue-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow -translate-x-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/pause */}
            <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
              {playing ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Time */}
            <span className="text-xs text-gray-300 font-mono">
              {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed */}
            <button
              onClick={handleSpeedChange}
              className="text-xs text-gray-300 hover:text-white font-medium bg-gray-800/60 px-2 py-1 rounded transition-colors"
            >
              {speed}×
            </button>

            {/* Fullscreen */}
            <button onClick={handleFullscreen} className="text-white hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Center play button */}
      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

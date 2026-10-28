'use client'

import React, { useState } from 'react'

export function PlaylistsView() {
  const [activeClip, setActiveClip] = useState<string | null>(null)

  const playlists = [
    {
      title: 'ThinkBionics - New Features & Design Feedback',
      stats: '3 Highlights (18 min) · Last updated Nov 25',
      clips: [
        { title: 'James discusses UI updates and recent design changes', date: 'July 28', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', duration: '4:12' },
        { title: 'Maria explains the new marketing strategy for Q4 rollout', date: 'July 27', thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80', duration: '6:45' },
        { title: 'David reviews Q4 sales performance and target quota', date: 'July 24', thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', duration: '7:03' },
      ],
    },
    {
      title: 'CRM Updates & HubSpot / Salesforce Sync',
      stats: '2 Highlights (5 min) · Last updated Nov 21',
      clips: [
        { title: 'Noah highlights technical challenges and webhook architecture', date: 'July 21', thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80', duration: '2:30' },
        { title: 'Ethan discusses feature requests from enterprise pilot users', date: 'July 20', thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', duration: '2:30' },
      ],
    },
    {
      title: 'Q3 Upcoming Sprints & Tech Architecture',
      stats: '3 Highlights (26 min) · Last updated Oct 19',
      clips: [
        { title: 'Logan walks through the key latency & performance metrics', date: 'July 19', thumb: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&auto=format&fit=crop&q=80', duration: '8:15' },
        { title: 'Ava leads a brainstorming session on real-time streaming UI', date: 'July 18', thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&auto=format&fit=crop&q=80', duration: '9:40' },
        { title: 'Liam shares insights from the competitive intelligence analysis', date: 'July 18', thumb: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&auto=format&fit=crop&q=80', duration: '8:05' },
      ],
    },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto text-white animate-fade-up">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-2">
        <span className="text-[10px] uppercase tracking-widest text-[#00b4d8] font-black">
          PLAYLISTS
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">
          Curate &amp; share highlight reel collections
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed">
          Playlists let you organize key moments across dozens of calls into shareable video libraries for training, leadership syncs, and customer stories.
        </p>

        <div className="grid sm:grid-cols-3 gap-3.5 text-left max-w-2xl mx-auto mb-8">
          <div className="glass-card card-hover p-4 rounded-xl">
            <span className="text-amber-400 font-bold">•</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Organize customer feedback across multiple sprint calls
            </p>
          </div>
          <div className="glass-card card-hover p-4 rounded-xl">
            <span className="text-amber-400 font-bold">•</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Build training libraries of exemplary sales pitches
            </p>
          </div>
          <div className="glass-card card-hover p-4 rounded-xl">
            <span className="text-amber-400 font-bold">•</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Share customer objection snippets with product leads
            </p>
          </div>
        </div>
      </div>

      {/* Playlists Collections */}
      <div className="space-y-6">
        {playlists.map((playlist) => (
          <div 
            key={playlist.title} 
            className="glass-card rounded-2xl p-6 shadow-xl"
            style={{ border: '1px solid rgba(30, 37, 53, 0.9)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📁</span>
                  <span>{playlist.title}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{playlist.stats}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://fathom.video/playlist/${encodeURIComponent(playlist.title)}`)
                  alert('Playlist share link copied to clipboard!')
                }}
                className="btn-ghost text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 self-start sm:self-center"
              >
                <span>🔗</span>
                <span>Share Playlist</span>
              </button>
            </div>

            {/* Video Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {playlist.clips.map((clip) => (
                <div
                  key={clip.title}
                  onClick={() => setActiveClip(clip.title)}
                  className="group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(10, 14, 22, 0.8)',
                    border: '1px solid rgba(30, 37, 53, 0.8)',
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={clip.thumb}
                      alt={clip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full btn-primary text-black flex items-center justify-center font-bold text-sm shadow-xl">
                        ▶
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded font-mono">
                      {clip.duration}
                    </span>
                    <span className="absolute top-2 left-2 bg-black/70 text-[10px] text-gray-300 px-1.5 py-0.5 rounded">
                      {clip.date}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-200 font-semibold line-clamp-2 leading-relaxed group-hover:text-[#00b4d8] transition-colors">
                      {clip.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Clip Modal */}
      {activeClip && (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
          <div 
            className="rounded-2xl max-w-2xl w-full p-6 text-white relative shadow-2xl animate-scale-in"
            style={{
              background: 'rgba(14, 19, 30, 0.98)',
              border: '1px solid rgba(30, 37, 53, 0.9)',
            }}
          >
            <button
              onClick={() => setActiveClip(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-base font-bold mb-3">{activeClip}</h3>
            <div className="bg-black aspect-video rounded-xl flex items-center justify-center relative overflow-hidden mb-4 border border-[#21262d]">
              <div className="text-center">
                <span className="text-5xl animate-float block mb-2">🎬</span>
                <p className="text-xs text-gray-400">Playing synchronized highlight moment snippet</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Speaker: Lead Engineering / Customer Success</span>
              <button
                onClick={() => {
                  alert('Clip link copied!')
                  setActiveClip(null)
                }}
                className="btn-primary px-4 py-2 text-xs font-bold rounded-xl"
              >
                Copy Shareable Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

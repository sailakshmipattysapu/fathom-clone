'use client'

import React, { useState } from 'react'

export function PlaylistsView() {
  const [activeClip, setActiveClip] = useState<string | null>(null)

  const playlists = [
    {
      title: 'ThinkBionics - New Features',
      stats: '3 Highlights (18 min) · Last updated Nov 25',
      clips: [
        { title: 'James discusses UI updates and recent changes', date: 'July 28', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', duration: '4:12' },
        { title: 'Maria explains the new marketing strategy for Q4', date: 'July 27', thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80', duration: '6:45' },
        { title: 'David reviews Q4 sales performance and targets', date: 'July 24', thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', duration: '7:03' },
      ],
    },
    {
      title: 'CRM Updates & HubSpot Sync',
      stats: '2 Highlights (5 min) · Last updated Nov 21',
      clips: [
        { title: 'Noah highlights technical challenges and proposal', date: 'July 21', thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80', duration: '2:30' },
        { title: 'Ethan discusses feature requests from recent users', date: 'July 20', thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', duration: '2:30' },
      ],
    },
    {
      title: 'Q3 Upcoming Sprints & Tech Architecture',
      stats: '3 Highlights (26 min) · Last updated Oct 19',
      clips: [
        { title: 'Logan walks through the key performance metrics', date: 'July 19', thumb: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&auto=format&fit=crop&q=80', duration: '8:15' },
        { title: 'Ava leads a brainstorming session on innovative UI', date: 'July 18', thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&auto=format&fit=crop&q=80', duration: '9:40' },
        { title: 'Liam shares insights from the competitive analysis', date: 'July 18', thumb: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&auto=format&fit=crop&q=80', duration: '8:05' },
      ],
    },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      {/* Header from Screenshot 144425.png */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
        <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
          PLAYLISTS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-6">
          Create shareable playlists of highlights
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mb-6">
          Playlists allow you to save highlights from your calls into organized collections that are easily shareable.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-8">
          <div className="bg-[#12161f] border border-[#21262d] p-4 rounded-xl">
            <span className="text-amber-400 font-bold">•</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Organize feedback across multiple meetings
            </p>
          </div>
          <div className="bg-[#12161f] border border-[#21262d] p-4 rounded-xl">
            <span className="text-amber-400 font-bold">•</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Create training libraries of key moments in customer calls
            </p>
          </div>
          <div className="bg-[#12161f] border border-[#21262d] p-4 rounded-xl">
            <span className="text-amber-400 font-bold">•</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Share customer testimonials with leadership & design
            </p>
          </div>
        </div>
      </div>

      {/* Playlists Collections */}
      <div className="space-y-8">
        {playlists.map((playlist) => (
          <div key={playlist.title} className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
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
                className="text-xs bg-[#21262d] hover:bg-[#30363d] text-[#00b4d8] border border-[#00b4d8]/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
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
                  className="group bg-[#0d1117] border border-[#21262d] hover:border-[#00b4d8] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={clip.thumb}
                      alt={clip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-[#00b4d8] text-black flex items-center justify-center font-bold text-sm shadow-lg">
                        ▶
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded font-mono">
                      {clip.duration}
                    </span>
                    <span className="absolute top-2 left-2 bg-black/60 text-[10px] text-gray-300 px-1.5 py-0.5 rounded">
                      {clip.date}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-200 font-medium line-clamp-2 leading-snug">
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-2xl w-full p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setActiveClip(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded hover:bg-[#21262d]"
            >
              ✕
            </button>
            <h3 className="text-base font-bold mb-3">{activeClip}</h3>
            <div className="bg-black aspect-video rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
              <div className="text-center">
                <span className="text-5xl">🎬</span>
                <p className="text-xs text-gray-400 mt-2">Playing synchronized highlight moment snippet</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Speaker: Lead Engineering / Customer Success</span>
              <button
                onClick={() => {
                  alert('Clip link copied!')
                  setActiveClip(null)
                }}
                className="bg-[#00b4d8] text-black font-semibold px-4 py-2 rounded-lg"
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

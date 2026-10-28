'use client'

import React, { useState } from 'react'

export function TeamCallsView() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [showTrialModal, setShowTrialModal] = useState(false)

  const teamMembers = [
    { name: 'Anne Lee', role: 'Sales', calls: 15, talkTime: '11%', monologue: '3.2m', questions: '7.3', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Allison Kors', role: 'Sales', calls: 29, talkTime: '27%', monologue: '0.3m', questions: '1.2', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Cooper Dor', role: 'Customer Success', calls: 26, talkTime: '58%', monologue: '0.6m', questions: '3.5', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { name: 'David Park', role: 'Engineering Lead', calls: 18, talkTime: '35%', monologue: '1.8m', questions: '5.1', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto text-white animate-fade-up">
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-2">
        <span className="text-[10px] uppercase tracking-widest text-[#00b4d8] font-black">
          FATHOM TEAM EDITION
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-6">
          Supercharge your entire sales & engineering team
        </h1>

        <div className="grid sm:grid-cols-3 gap-3.5 text-left max-w-2xl mx-auto mb-8">
          <div className="glass-card card-hover p-4 rounded-xl">
            <span className="text-amber-400 text-sm">✓</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Team customer calls all in one searchable library
            </p>
          </div>
          <div className="glass-card card-hover p-4 rounded-xl">
            <span className="text-amber-400 text-sm">✓</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Automate CRM note logging across Salesforce & HubSpot
            </p>
          </div>
          <div className="glass-card card-hover p-4 rounded-xl">
            <span className="text-amber-400 text-sm">✓</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Conversational talk-time metrics and coaching tips
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowTrialModal(true)}
          className="btn-primary text-xs font-black px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(0,180,216,0.35)]"
        >
          Start 14-Day Free Team Trial
        </button>
      </div>

      {/* Analytics Dashboard Preview */}
      <div 
        className="glass-card rounded-2xl p-6 shadow-2xl"
        style={{
          border: '1px solid rgba(30, 37, 53, 0.9)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div className="grid sm:grid-cols-2 gap-4 pb-6 border-b border-[#21262d]">
          {/* Recent Calls Metric */}
          <div className="flex items-center gap-4 bg-[#0a0e17] border border-[#21262d] p-4 rounded-xl">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Recent Team Calls</p>
              <h2 className="text-3xl font-black text-white mt-0.5">68</h2>
            </div>
            {/* Visual Sparkline Bars */}
            <div className="flex items-end gap-1.5 h-12 ml-auto">
              {[40, 65, 30, 85, 95, 60, 75, 100, 80, 90].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className="w-2.5 bg-gradient-to-t from-[#00b4d8] to-[#7c3aed] rounded-t-sm transition-all hover:scale-110"
                />
              ))}
            </div>
          </div>

          {/* Talk Time Metric */}
          <div className="flex items-center gap-4 bg-[#0a0e17] border border-[#21262d] p-4 rounded-xl">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Average Talk Ratio</p>
              <h2 className="text-3xl font-black text-white mt-0.5">42%</h2>
            </div>
            {/* Circular Gauge */}
            <div className="w-12 h-12 rounded-full border-3 border-[#00b4d8] border-r-transparent flex items-center justify-center font-bold text-xs text-[#00b4d8] ml-auto glow-cyan">
              42%
            </div>
          </div>
        </div>

        {/* Team Members Breakdown Table */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Coaching Benchmarks</span>
              <span className="badge badge-cyan">14 Reps</span>
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="badge badge-cyan">Salesforce Synced</span>
              <span className="badge badge-amber">HubSpot Connected</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#21262d]">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 uppercase bg-[#080c14] border-b border-[#21262d]">
                <tr>
                  <th className="py-3 px-4 font-bold text-[10px]">Team Member</th>
                  <th className="py-3 px-4 font-bold text-[10px]">Role</th>
                  <th className="py-3 px-4 font-bold text-[10px]">Calls</th>
                  <th className="py-3 px-4 font-bold text-[10px]">Talk Time</th>
                  <th className="py-3 px-4 font-bold text-[10px]">Monologue</th>
                  <th className="py-3 px-4 font-bold text-[10px]">Questions</th>
                  <th className="py-3 px-4 font-bold text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#21262d] bg-[#0d1117]/80">
                {teamMembers.map((member) => (
                  <tr key={member.name} className="hover:bg-[#151a24] transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover border border-[#21262d]" />
                      <span className="font-semibold text-white">{member.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{member.role}</td>
                    <td className="py-3 px-4 text-gray-200 font-mono">{member.calls}</td>
                    <td className="py-3 px-4 text-[#00b4d8] font-bold">{member.talkTime}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono">{member.monologue}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono">{member.questions}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedMember(member.name)}
                        className="btn-ghost text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                      >
                        View Coaching
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trial Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
          <div 
            className="rounded-2xl max-w-md w-full p-6 text-white text-center relative shadow-2xl animate-scale-in"
            style={{
              background: 'rgba(14, 19, 30, 0.98)',
              border: '1px solid rgba(30, 37, 53, 0.9)',
            }}
          >
            <button
              onClick={() => setShowTrialModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="text-4xl mb-3 animate-bounce">🚀</div>
            <h3 className="text-xl font-bold mb-2">Start Fathom Team Edition Trial</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Your 14-day free trial has been activated for sailakshmi&apos;s workspace. Invite team members anytime from the Settings page.
            </p>
            <button
              onClick={() => setShowTrialModal(false)}
              className="btn-primary text-xs font-bold px-6 py-2.5 rounded-xl w-full"
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}

      {/* Member Coaching Modal */}
      {selectedMember && (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
          <div 
            className="rounded-2xl max-w-lg w-full p-6 text-white relative shadow-2xl animate-scale-in"
            style={{
              background: 'rgba(14, 19, 30, 0.98)',
              border: '1px solid rgba(30, 37, 53, 0.9)',
            }}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-1">Coaching Insights: {selectedMember}</h3>
            <p className="text-xs text-gray-400 mb-4">AI analysis synthesized across 15 recorded customer meetings</p>
            <div className="space-y-3 text-xs">
              <div className="bg-[#0a0e17] p-3.5 rounded-xl border border-[#21262d]">
                <span className="font-bold text-emerald-400">Strengths:</span>
                <p className="text-gray-300 mt-1 leading-relaxed">Excellent discovery question cadence. Asks an average of 7.3 open-ended questions per call.</p>
              </div>
              <div className="bg-[#0a0e17] p-3.5 rounded-xl border border-[#21262d]">
                <span className="font-bold text-amber-400">Coaching Opportunity:</span>
                <p className="text-gray-300 mt-1 leading-relaxed">Monologue lengths exceed 3 minutes during pricing presentation. Recommend pausing after feature slides to check client comprehension.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

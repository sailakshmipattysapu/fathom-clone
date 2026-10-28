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
    <div className="p-6 max-w-6xl mx-auto text-white">
      {/* Hero Banner (From Screenshot 144409.png) */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
        <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
          FATHOM TEAM EDITION
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-6">
          Bring the productivity boost of Fathom to your entire team
        </h1>

        <div className="grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-8">
          <div className="bg-[#12161f] border border-[#21262d] p-4 rounded-xl">
            <span className="text-amber-400 text-lg">✓</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Your team&apos;s customer calls all in one (searchable) place
            </p>
          </div>
          <div className="bg-[#12161f] border border-[#21262d] p-4 rounded-xl">
            <span className="text-amber-400 text-lg">✓</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Automate post-call CRM data entry for your entire team
            </p>
          </div>
          <div className="bg-[#12161f] border border-[#21262d] p-4 rounded-xl">
            <span className="text-amber-400 text-lg">✓</span>
            <p className="text-xs text-gray-300 font-medium mt-1">
              Conversational analytics to help you identify coaching opportunities
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowTrialModal(true)}
          className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(0,180,216,0.3)] text-sm"
        >
          Start 14-Day Free Trial
        </button>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#21262d]">
          {/* Recent Calls Metric */}
          <div className="flex items-center gap-4 bg-[#0d1117] border border-[#21262d] p-4 rounded-xl w-full lg:w-1/2">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">Recent Calls</p>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">68</h2>
            </div>
            {/* Visual Sparkline Bars */}
            <div className="flex items-end gap-1.5 h-12 ml-auto">
              {[40, 65, 30, 85, 95, 60, 75, 100, 80, 90].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className="w-2.5 bg-[#00b4d8] rounded-t-sm transition-all hover:bg-[#00e5ff]"
                />
              ))}
            </div>
          </div>

          {/* Talk Time Metric */}
          <div className="flex items-center gap-4 bg-[#0d1117] border border-[#21262d] p-4 rounded-xl w-full lg:w-1/2">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">Average Talk Time</p>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">42%</h2>
            </div>
            {/* Circular Gauge */}
            <div className="w-12 h-12 rounded-full border-4 border-[#00b4d8] border-r-transparent flex items-center justify-center font-bold text-xs text-[#00b4d8] ml-auto">
              42%
            </div>
          </div>
        </div>

        {/* Team Members Breakdown Table */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Team Members</span>
              <span className="bg-[#21262d] text-gray-300 text-xs px-2 py-0.5 rounded-full">14</span>
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>CRM Sync:</span>
              <span className="text-[#00b4d8] bg-[#00b4d8]/10 px-2 py-0.5 rounded border border-[#00b4d8]/30">
                Salesforce Active
              </span>
              <span className="text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded border border-orange-400/30">
                HubSpot Connected
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 uppercase bg-[#0d1117] border-y border-[#21262d]">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Recent Calls</th>
                  <th className="py-3 px-4">Talk Time</th>
                  <th className="py-3 px-4">Monologue</th>
                  <th className="py-3 px-4">Questions</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#21262d]">
                {teamMembers.map((member) => (
                  <tr key={member.name} className="hover:bg-[#161b22] transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover" />
                      <span className="font-semibold text-white">{member.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{member.role}</td>
                    <td className="py-3 px-4 text-gray-200 font-mono">{member.calls}</td>
                    <td className="py-3 px-4 text-[#00b4d8] font-semibold">{member.talkTime}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono">{member.monologue}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono">{member.questions}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedMember(member.name)}
                        className="text-xs bg-[#21262d] hover:bg-[#30363d] text-gray-200 px-2.5 py-1 rounded transition-colors"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full p-6 text-white text-center relative">
            <button
              onClick={() => setShowTrialModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold mb-2">Start Fathom Team Edition Trial</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Your 14-day free trial has been activated for sailakshmi&apos;s workspace. Invite team members anytime from the Settings page.
            </p>
            <button
              onClick={() => setShowTrialModal(false)}
              className="bg-[#00b4d8] text-black font-bold text-xs px-6 py-2.5 rounded-xl w-full"
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}

      {/* Member Coaching Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-lg w-full p-6 text-white relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-1">Coaching Insights: {selectedMember}</h3>
            <p className="text-xs text-gray-400 mb-4">AI analysis synthesized across 15 recorded customer meetings</p>
            <div className="space-y-3 text-xs">
              <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d]">
                <span className="font-semibold text-emerald-400">Strengths:</span>
                <p className="text-gray-300 mt-1">Excellent discovery question cadence. Asks an average of 7.3 open-ended questions per call.</p>
              </div>
              <div className="bg-[#0d1117] p-3 rounded-lg border border-[#21262d]">
                <span className="font-semibold text-amber-400">Coaching Opportunity:</span>
                <p className="text-gray-300 mt-1">Monologue lengths exceed 3 minutes during pricing presentation. Recommend pausing after feature slides to check client comprehension.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

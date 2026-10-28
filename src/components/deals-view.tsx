'use client'

import React, { useState } from 'react'

export function DealsView() {
  const [selectedDeal, setSelectedDeal] = useState<any | null>(null)

  const deals = [
    { name: 'ThinkBionics - Enterprise Tier', rep: 'Tim Kuvalis', amount: '$45,000', status: 'Proposal Sent', stage: 'Negotiation', closeDate: 'Nov 24, 2026', calls: 5, sentiment: 'Positive (88%)', objections: 'Enterprise SSO setup' },
    { name: 'BioRev - Team Edition Upsell', rep: 'Anne Lee', amount: '$28,000', status: 'Pilot Active', stage: 'Evaluation', closeDate: 'Oct 29, 2026', calls: 3, sentiment: 'Neutral (65%)', objections: 'Budget approval' },
    { name: 'Supertokens - 150 Seats', rep: 'Allison Kors', amount: '$12,500', status: 'Closing', stage: 'Verbal Won', closeDate: 'Oct 22, 2026', calls: 4, sentiment: 'Very Positive (94%)', objections: 'None' },
    { name: 'Nostra - Core Platform Sync', rep: 'Cooper Dor', amount: '$35,000', status: 'Discovery', stage: 'Qualified', closeDate: 'Oct 21, 2026', calls: 2, sentiment: 'Positive (79%)', objections: 'HubSpot integration validation' },
    { name: 'isclaims.com - Full Rollout', rep: 'Tim Kuvalis', amount: '$18,000', status: 'Demo Completed', stage: 'Solution Review', closeDate: 'Oct 19, 2026', calls: 3, sentiment: 'Positive (82%)', objections: 'Security questionnaire' },
    { name: 'Fountain Forward - Growth', rep: 'Anne Lee', amount: '$22,000', status: 'Contract Review', stage: 'Legal', closeDate: 'Sep 25, 2026', calls: 6, sentiment: 'Very Positive (91%)', objections: 'Standard MSA terms' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto text-white animate-fade-up">
      {/* Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-2">
        <span className="text-[10px] uppercase tracking-widest text-[#00b4d8] font-black">
          DEAL MOMENTUM INTELLIGENCE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-3">
          Forecast with live conversation intelligence
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed">
          Centralize every meeting signal to eliminate pipeline surprises. Fathom automatically extracts buying signals, stakeholder objections, and contract milestones directly into Salesforce & HubSpot.
        </p>
      </div>

      {/* Deals Table Card */}
      <div 
        className="glass-card rounded-2xl p-6 shadow-2xl"
        style={{ border: '1px solid rgba(30, 37, 53, 0.9)' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-white">Active Opportunities</h2>
            <span className="badge badge-cyan font-mono font-bold">
              145 Deals
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select className="bg-[#0a0e17] border border-[#21262d] text-xs text-gray-300 rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer">
              <option>All Reps</option>
              <option>Tim Kuvalis</option>
              <option>Anne Lee</option>
              <option>Allison Kors</option>
            </select>
            <select className="bg-[#0a0e17] border border-[#21262d] text-xs text-gray-300 rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer">
              <option>Any Close Date</option>
              <option>This Quarter</option>
              <option>Next 30 Days</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#21262d]">
          <table className="w-full text-left text-xs">
            <thead className="text-gray-400 uppercase bg-[#080c14] border-b border-[#21262d]">
              <tr>
                <th className="py-3 px-4 font-bold text-[10px]">Deal Opportunity</th>
                <th className="py-3 px-4 font-bold text-[10px]">Account Exec</th>
                <th className="py-3 px-4 font-bold text-[10px]">ARR Value</th>
                <th className="py-3 px-4 font-bold text-[10px]">Pipeline Stage</th>
                <th className="py-3 px-4 font-bold text-[10px]">Sentiment</th>
                <th className="py-3 px-4 font-bold text-[10px]">Target Close</th>
                <th className="py-3 px-4 font-bold text-[10px]">Signals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d] bg-[#0d1117]/80">
              {deals.map((deal) => (
                <tr key={deal.name} className="hover:bg-[#151a24] transition-colors cursor-pointer">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00b4d8]" style={{ boxShadow: '0 0 6px rgba(0,180,216,0.8)' }} />
                    {deal.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">{deal.rep}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-200">{deal.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#161b22] border border-[#30363d] px-2 py-0.5 rounded text-[10px] font-semibold text-gray-300">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">{deal.sentiment}</td>
                  <td className="py-3.5 px-4 text-gray-400">{deal.closeDate}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedDeal(deal)}
                      className="btn-ghost text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                    >
                      Inspect Signals
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Deal Signal Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
          <div 
            className="rounded-2xl max-w-lg w-full p-6 text-white relative shadow-2xl animate-scale-in"
            style={{
              background: 'rgba(14, 19, 30, 0.98)',
              border: '1px solid rgba(30, 37, 53, 0.9)',
            }}
          >
            <button
              onClick={() => setSelectedDeal(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-1">{selectedDeal.name}</h3>
            <p className="text-xs text-gray-400 mb-4 font-mono">
              Value: {selectedDeal.amount} · Owner: {selectedDeal.rep} · Stage: {selectedDeal.stage}
            </p>
            <div className="space-y-3 text-xs">
              <div className="bg-[#0a0e17] p-3.5 rounded-xl border border-[#21262d]">
                <span className="font-bold text-[#00b4d8]">AI Customer Sentiment Analysis:</span>
                <p className="text-gray-300 mt-1 leading-relaxed">
                  Call transcript highlights enthusiastic champion interest in the automated transcript seeking. Budget is pre-allocated under Q4 software budget.
                </p>
              </div>
              <div className="bg-[#0a0e17] p-3.5 rounded-xl border border-[#21262d]">
                <span className="font-bold text-amber-400">Identified Objections &amp; Blockers:</span>
                <p className="text-gray-300 mt-1 leading-relaxed">
                  {selectedDeal.objections}. Infosec review requested for SOC2 Type II audit report before final contract execution.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#21262d] flex justify-end">
              <button
                onClick={() => setSelectedDeal(null)}
                className="btn-primary text-xs font-bold px-4 py-2 rounded-xl"
              >
                Close Signals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

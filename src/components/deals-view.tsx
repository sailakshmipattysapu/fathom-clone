'use client'

import React, { useState } from 'react'

export function DealsView() {
  const [selectedDeal, setSelectedDeal] = useState<any | null>(null)

  const deals = [
    { name: 'ThinkBionics - New Deal', rep: 'Tim Kuvalis', amount: '$45,000', status: 'Proposal Sent', stage: 'Negotiation', closeDate: 'Nov 24, 2026', calls: 5, sentiment: 'Positive (88%)', objections: 'Enterprise SSO setup' },
    { name: 'BioRev - Team Edition Upsell', rep: 'Anne Lee', amount: '$28,000', status: 'Pilot Active', stage: 'Evaluation', closeDate: 'Oct 29, 2026', calls: 3, sentiment: 'Neutral (65%)', objections: 'Budget approval' },
    { name: 'Supertokens - 3 seats', rep: 'Allison Kors', amount: '$12,500', status: 'Closing', stage: 'Verbal Won', closeDate: 'Oct 22, 2026', calls: 4, sentiment: 'Very Positive (94%)', objections: 'None' },
    { name: 'Nostra - new deals', rep: 'Cooper Dor', amount: '$35,000', status: 'Discovery', stage: 'Qualified', closeDate: 'Oct 21, 2026', calls: 2, sentiment: 'Positive (79%)', objections: 'HubSpot integration validation' },
    { name: 'isclaims.com - New Deal', rep: 'Tim Kuvalis', amount: '$18,000', status: 'Demo Completed', stage: 'Solution Review', closeDate: 'Oct 19, 2026', calls: 3, sentiment: 'Positive (82%)', objections: 'Security questionnaire' },
    { name: 'Fountain Forward - Marketing', rep: 'Anne Lee', amount: '$22,000', status: 'Contract Review', stage: 'Legal', closeDate: 'Sep 25, 2026', calls: 6, sentiment: 'Very Positive (91%)', objections: 'Standard MSA terms' },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      {/* Banner from Screenshot 144506.png */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
        <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
          DEAL MOMENTUM INTELLIGENCE
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
          See deal momentum instantly
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mb-6">
          Centralize every meeting signal to forecast with confidence. Fathom automatically logs customer sentiment, objections, and next steps into Salesforce & HubSpot.
        </p>
      </div>

      {/* Deals Table Card */}
      <div className="bg-[#12161f] border border-[#21262d] rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">Deals</h2>
            <span className="bg-[#21262d] text-gray-300 text-xs px-2.5 py-0.5 rounded-full font-mono">
              145
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select className="bg-[#0d1117] border border-[#30363d] text-xs text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>All Reps</option>
              <option>Tim Kuvalis</option>
              <option>Anne Lee</option>
              <option>Allison Kors</option>
            </select>
            <select className="bg-[#0d1117] border border-[#30363d] text-xs text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>Any Close Date</option>
              <option>This Quarter</option>
              <option>Next 30 Days</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-gray-400 uppercase bg-[#0d1117] border-y border-[#21262d]">
              <tr>
                <th className="py-3 px-4">Deal</th>
                <th className="py-3 px-4">Rep</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Sentiment</th>
                <th className="py-3 px-4">Close Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {deals.map((deal) => (
                <tr key={deal.name} className="hover:bg-[#161b22] transition-colors cursor-pointer">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00b4d8]" />
                    {deal.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">{deal.rep}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-gray-200">{deal.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#161b22] border border-[#30363d] px-2 py-0.5 rounded text-[11px] text-gray-300">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-medium">{deal.sentiment}</td>
                  <td className="py-3.5 px-4 text-gray-400">{deal.closeDate}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedDeal(deal)}
                      className="bg-[#21262d] hover:bg-[#30363d] text-[#00b4d8] text-xs px-2.5 py-1 rounded transition-colors"
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

      {/* Deal Signals Drawer Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-lg w-full p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setSelectedDeal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-xs text-[#00b4d8] mb-1">
              <span>CRM Signals</span>
              <span>·</span>
              <span>{selectedDeal.calls} Calls Analyzed</span>
            </div>
            <h3 className="text-xl font-bold mb-4">{selectedDeal.name}</h3>

            <div className="space-y-3 text-xs">
              <div className="bg-[#0d1117] p-3 rounded-xl border border-[#21262d]">
                <p className="text-gray-400 uppercase text-[10px] font-semibold">Deal Momentum Recap</p>
                <p className="text-gray-200 mt-1 leading-relaxed">
                  Prospect demonstrated high engagement during the technical deep dive call. Confirmed decision criteria aligns directly with Fathom automatic transcription and CRM syncing.
                </p>
              </div>

              <div className="bg-[#0d1117] p-3 rounded-xl border border-[#21262d]">
                <p className="text-gray-400 uppercase text-[10px] font-semibold">Detected Objections</p>
                <p className="text-amber-300 mt-1">{selectedDeal.objections}</p>
              </div>

              <div className="bg-[#0d1117] p-3 rounded-xl border border-[#21262d] flex justify-between items-center">
                <span className="text-gray-400">Target Close Date:</span>
                <span className="font-semibold text-white">{selectedDeal.closeDate}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDeal(null)}
              className="mt-6 w-full bg-[#00b4d8] text-black font-bold py-2.5 rounded-xl text-xs hover:bg-[#0096c7]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

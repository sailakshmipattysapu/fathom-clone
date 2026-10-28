'use client'

import { useState } from 'react'
import { toast } from 'sonner'

interface Summary {
  id: string
  template: string
  overview: string
  keyPoints: string[]
  decisions: string[]
  nextSteps: string[]
}

interface SummaryPanelProps {
  meetingId: string
  summary: Summary | null
  onSummaryUpdate: (summary: Summary) => void
}

const TEMPLATES = [
  { id: 'general', label: 'General' },
  { id: 'sales', label: 'Sales' },
  { id: 'engineering', label: 'Engineering' },
  { id: '1on1', label: '1:1' },
]

export function SummaryPanel({ meetingId, summary, onSummaryUpdate }: SummaryPanelProps) {
  const [activeTemplate, setActiveTemplate] = useState(summary?.template || 'general')
  const [regenerating, setRegenerating] = useState(false)

  async function handleRegenerate() {
    setRegenerating(true)
    try {
      const res = await fetch(`/api/meetings/${meetingId}/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: activeTemplate }),
      })
      if (res.ok) {
        const data = await res.json()
        onSummaryUpdate(data)
        toast.success('Summary regenerated!')
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to regenerate summary')
      }
    } catch {
      toast.error('Failed to regenerate summary')
    } finally {
      setRegenerating(false)
    }
  }

  if (!summary) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">✨</div>
        <h3 className="font-semibold text-gray-900 mb-1">No summary yet</h3>
        <p className="text-sm text-gray-500 mb-6">Generate an AI summary of this meeting.</p>

        {/* Template selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                activeTemplate === t.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
        >
          {regenerating ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate summary
            </>
          )}
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Template switcher */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeTemplate === t.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          title="Regenerate with AI"
          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          {regenerating ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          Regenerate
        </button>
      </div>

      {/* Overview */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Overview</h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 rounded-xl p-4 border border-blue-50">
          {summary.overview}
        </p>
      </div>

      {/* Key Points */}
      {summary.keyPoints?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Key Points</h3>
          <ul className="space-y-2">
            {summary.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Decisions */}
      {summary.decisions?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Decisions Made</h3>
          <ul className="space-y-2">
            {summary.decisions.map((decision, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {decision}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {summary.nextSteps?.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Next Steps</h3>
          <ul className="space-y-2">
            {summary.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

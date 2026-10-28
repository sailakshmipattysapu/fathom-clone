'use client'

import React, { useState } from 'react'
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
  { id: 'sales', label: 'Sales (BANT)' },
  { id: 'engineering', label: 'Engineering' },
  { id: '1on1', label: '1-on-1' },
]

export function SummaryPanel({ meetingId, summary, onSummaryUpdate }: SummaryPanelProps) {
  const [activeTemplate, setActiveTemplate] = useState(summary?.template || 'general')
  const [regenerating, setRegenerating] = useState(false)
  const [copied, setCopied] = useState(false)

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
        toast.success(`Summary regenerated with ${activeTemplate} template!`)
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

  function handleCopy() {
    if (!summary) return
    const text = `MEETING SUMMARY: ${summary.template.toUpperCase()}
OVERVIEW:
${summary.overview}

KEY POINTS:
${summary.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

DECISIONS:
${summary.decisions.map((d) => `- ${d}`).join('\n')}

NEXT STEPS:
${summary.nextSteps.map((s) => `→ ${s}`).join('\n')}
`
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Summary copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (!summary) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">✨</div>
        <h3 className="font-bold text-white mb-1">No summary generated</h3>
        <p className="text-xs text-gray-400 mb-6">Choose a template and generate with Claude AI.</p>
        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          className="bg-[#00b4d8] hover:bg-[#0096c7] text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg"
        >
          {regenerating ? 'Analyzing with Claude...' : 'Generate with Claude AI 🤖'}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-white text-xs">
      {/* Template Switcher & Copy Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#21262d]">
        <div className="flex gap-1 bg-[#0d1117] border border-[#21262d] p-1 rounded-lg">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`text-[11px] font-medium px-2.5 py-1 rounded transition-colors ${
                activeTemplate === t.id
                  ? 'bg-[#00b4d8] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-gray-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="bg-[#00b4d8]/20 hover:bg-[#00b4d8]/30 border border-[#00b4d8]/50 text-[#00b4d8] px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-semibold"
          >
            <span>{regenerating ? '⏳' : '⚡'}</span>
            <span>{regenerating ? 'Regenerating...' : 'AI Switch'}</span>
          </button>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-4">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
          Executive Overview
        </h4>
        <p className="text-gray-200 leading-relaxed text-xs">{summary.overview}</p>
      </div>

      {/* Key Points */}
      {summary.keyPoints?.length > 0 && (
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Key Discussion Points
          </h4>
          <ul className="space-y-2">
            {summary.keyPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 bg-[#0d1117] border border-[#21262d] p-3 rounded-lg"
              >
                <span className="w-5 h-5 rounded-full bg-[#00b4d8]/20 text-[#00b4d8] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-300 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Decisions Made */}
      {summary.decisions?.length > 0 && (
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Decisions Made
          </h4>
          <ul className="space-y-2">
            {summary.decisions.map((decision, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 bg-[#0d1117] border border-[#21262d] p-3 rounded-lg"
              >
                <span className="text-emerald-400 text-sm flex-shrink-0">✓</span>
                <span className="text-gray-200 leading-relaxed">{decision}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {summary.nextSteps?.length > 0 && (
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Next Steps
          </h4>
          <ul className="space-y-2">
            {summary.nextSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 bg-[#0d1117] border border-[#21262d] p-3 rounded-lg"
              >
                <span className="text-[#00b4d8] text-sm flex-shrink-0">➔</span>
                <span className="text-gray-200 leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

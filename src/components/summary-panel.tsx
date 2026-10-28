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
  { id: 'general', label: 'General', icon: '📋' },
  { id: 'sales', label: 'Sales', icon: '💼' },
  { id: 'engineering', label: 'Engineering', icon: '⚙️' },
  { id: '1on1', label: '1-on-1', icon: '👤' },
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
    const text = `MEETING SUMMARY — ${summary.template.toUpperCase()}\n\nOVERVIEW:\n${summary.overview}\n\nKEY POINTS:\n${summary.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nDECISIONS:\n${summary.decisions.map(d => `• ${d}`).join('\n')}\n\nNEXT STEPS:\n${summary.nextSteps.map(s => `→ ${s}`).join('\n')}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Summary copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const sectionStyle = {
    background: 'rgba(8, 12, 20, 0.7)',
    border: '1px solid rgba(30, 37, 53, 0.8)',
    borderRadius: 12,
    padding: '14px',
  }

  if (!summary) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 animate-float"
          style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(124,58,237,0.1))', border: '1px solid rgba(0,180,216,0.2)' }}>
          ✨
        </div>
        <h3 className="font-bold text-white text-sm mb-2">No summary yet</h3>
        <p className="text-xs text-[#4a5568] mb-6 leading-relaxed max-w-[220px]">
          Choose a template below and generate an AI summary powered by Claude.
        </p>
        {/* Template selector */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-5">
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => setActiveTemplate(t.id)}
              className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: activeTemplate === t.id ? 'linear-gradient(135deg, #00b4d8, #0096c7)' : 'rgba(17,22,32,0.8)',
                border: `1px solid ${activeTemplate === t.id ? 'transparent' : 'rgba(30,37,53,0.8)'}`,
                color: activeTemplate === t.id ? '#000' : '#8b9ab2',
              }}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
        <button onClick={handleRegenerate} disabled={regenerating}
          className="btn-primary px-6 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 disabled:opacity-60">
          {regenerating ? (
            <><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg><span>Analyzing...</span></>
          ) : (
            <><span>🤖</span><span>Generate with Claude AI</span></>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 text-xs p-4">
      {/* Template switcher + actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4"
        style={{ borderBottom: '1px solid rgba(30,37,53,0.6)' }}>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid rgba(30,37,53,0.6)' }}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200"
              style={{
                background: activeTemplate === t.id ? 'linear-gradient(135deg, #00b4d8, #0096c7)' : 'transparent',
                color: activeTemplate === t.id ? '#000' : '#8b9ab2',
                boxShadow: activeTemplate === t.id ? '0 0 10px rgba(0,180,216,0.3)' : 'none',
              }}
            >
              <span className="text-[10px]">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
            style={{
              background: copied ? 'rgba(16,185,129,0.12)' : 'rgba(17,22,32,0.8)',
              border: `1px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(30,37,53,0.8)'}`,
              color: copied ? '#10b981' : '#8b9ab2',
            }}>
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button onClick={handleRegenerate} disabled={regenerating}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
            style={{
              background: 'rgba(0,180,216,0.1)',
              border: '1px solid rgba(0,180,216,0.25)',
              color: '#00b4d8',
              opacity: regenerating ? 0.6 : 1,
            }}>
            {regenerating
              ? <><svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg><span>Regenerating...</span></>
              : <><span>⚡</span><span>Regenerate</span></>
            }
          </button>
        </div>
      </div>

      {/* Overview */}
      <div style={sectionStyle}>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[9px] font-black text-[#4a5568] uppercase tracking-widest">Executive Overview</span>
        </div>
        <p className="text-[#c8d8e8] leading-relaxed">{summary.overview}</p>
      </div>

      {/* Key Points */}
      {summary.keyPoints?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] font-black text-[#4a5568] uppercase tracking-widest">Key Discussion Points</span>
          </div>
          <ul className="space-y-1.5">
            {summary.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl animate-fade-up"
                style={{ ...sectionStyle, animationDelay: `${i * 50}ms` }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(0,180,216,0.15)', color: '#00b4d8', border: '1px solid rgba(0,180,216,0.2)' }}>
                  {i + 1}
                </span>
                <span className="text-[#c8d8e8] leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Decisions */}
      {summary.decisions?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] font-black text-[#4a5568] uppercase tracking-widest">Decisions Made</span>
          </div>
          <ul className="space-y-1.5">
            {summary.decisions.map((decision, i) => (
              <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl"
                style={sectionStyle}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                  ✓
                </span>
                <span className="text-[#c8d8e8] leading-relaxed">{decision}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {summary.nextSteps?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] font-black text-[#4a5568] uppercase tracking-widest">Next Steps</span>
          </div>
          <ul className="space-y-1.5">
            {summary.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl"
                style={sectionStyle}>
                <span className="flex-shrink-0 text-[#00b4d8] font-bold">→</span>
                <span className="text-[#c8d8e8] leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-center text-[9px] text-[#4a5568] pt-2">Powered by Claude 3 Haiku · Anthropic</p>
    </div>
  )
}

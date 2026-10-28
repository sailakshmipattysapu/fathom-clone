'use client'

import React, { useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface AskFathomDrawerProps {
  isOpen: boolean
  onToggle: () => void
}

export function AskFathomDrawer({ isOpen, onToggle }: AskFathomDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi Sailakshmi! I'm your Fathom AI assistant. I have full context across all your calls and team recordings. Ask me anything about what was discussed, promised action items, or upcoming decisions.",
      timestamp: 'Just now',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [scope, setScope] = useState('My Calls')

  const quickPrompts = [
    "Things I promised I'd do by this week",
    'Summarize my meetings from this week',
    'Any looming deadlines?',
    'Surprise me with an insight',
  ]

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate intelligent meeting knowledgebase lookup or call Anthropic API
    try {
      // Build dynamic reply based on seeded meeting knowledge
      setTimeout(() => {
        let reply = ''
        const lower = promptText.toLowerCase()

        if (lower.includes('promised') || lower.includes('action')) {
          reply = `Here are the key commitments extracted from your recent calls:

1. **Priya Patel**: Share detailed AI summarization project plan by Friday.
2. **James Liu**: Submit onboarding flow PR by Thursday EOD.
3. **Marcus Williams**: Schedule pricing model review with finance team for next Thursday.
4. **Sarah Chen**: Talk to Alex about stepping up as API refactor lead.
5. **Emma Thompson**: Prepare custom demo tailored to TechCorp's technical meeting requirements.`
        } else if (lower.includes('summarize') || lower.includes('meetings')) {
          reply = `Here is a high-level summary across your recent meetings:

• **Q4 Product Roadmap Planning**: Prioritized Calendar Integration as MVP (6 weeks) and AI Summarization as P2 closed beta.
• **Customer Discovery (TechCorp Inc.)**: High-value enterprise lead; 15-seat pilot with path to 200 seats.
• **Engineering Weekly Sync**: Resolved session token migration strategy; test coverage is at 67% (targeting 80%).
• **All Hands (October 2026)**: Q3 revenue grew 34% QoQ, hitting $8M ARR with 118% net retention.`
        } else if (lower.includes('deadline')) {
          reply = `Key upcoming deadlines detected:

⚠️ **End of Month (4 days)**: Test coverage target of 80% (currently 67% in Eng Weekly Sync).
📅 **Next Thursday**: Finance pricing model meeting with Marcus & Sarah.
🚀 **Thursday EOD**: James Liu submitting the React onboarding components PR.`
        } else {
          reply = `Based on your recent recordings across ${scope}:

The team has strong momentum on product delivery. Enterprise sales pipeline has 12 deals in motion, with particular demand for AI transcription and automated action item syncing into Notion & Slack.`
        }

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages((prev) => [...prev, aiMsg])
        setIsTyping(false)
      }, 700)
    } catch {
      setIsTyping(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-30 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-white p-3 rounded-full shadow-2xl flex items-center gap-2 group transition-all"
        title="Open Ask Fathom"
      >
        <span className="text-lg">✨</span>
        <span className="text-xs font-semibold text-gray-200 group-hover:text-white pr-1">Ask Fathom</span>
      </button>
    )
  }

  return (
    <div className="w-80 lg:w-96 bg-[#0d1117] border-l border-[#21262d] flex flex-col h-full flex-shrink-0 z-30">
      {/* Drawer Header */}
      <div className="p-3.5 border-b border-[#21262d] flex items-center justify-between bg-[#12161f]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white flex items-center gap-1.5">
            <span className="text-[#00b4d8]">✨</span>
            ASK FATHOM
          </span>
          <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[10px] font-bold px-1.5 py-0.5 rounded">
            AI
          </span>
        </div>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-[#21262d] transition-colors"
          title="Collapse Drawer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Gift Banner (From Screenshot 144353.png) */}
      <div className="bg-[#1c1809] border-b border-[#4d3c0b] p-3 text-[11px] text-[#f5c518] leading-snug flex items-start gap-2">
        <span className="text-sm">🎁</span>
        <div>
          <span className="font-semibold text-amber-300">Account-level Ask Fathom is here!</span> We&apos;re gifting
          you unlimited use until Nov 1. Limits may apply after.{' '}
          <a href="#" className="underline text-amber-200 hover:text-white">
            Learn More
          </a>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-xl p-3 leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#00b4d8] text-black font-medium'
                  : 'bg-[#161b22] border border-[#30363d] text-gray-200'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>
            </div>
            <span className="text-[10px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] p-3 rounded-xl max-w-[60%]">
            <div className="w-1.5 h-1.5 bg-[#00b4d8] rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-[#00b4d8] rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 bg-[#00b4d8] rounded-full animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] text-gray-400 ml-1">Analyzing calls...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-3 py-2 border-t border-[#21262d] bg-[#0d1117] flex flex-wrap gap-1.5 justify-end">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendPrompt(prompt)}
            className="text-[11px] bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-gray-300 hover:text-white px-2.5 py-1.5 rounded-full transition-colors text-right"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-[#21262d] bg-[#12161f]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendPrompt(inputValue)
          }}
          className="relative bg-[#0d1117] border border-[#30363d] rounded-xl focus-within:border-[#00b4d8] transition-colors"
        >
          <textarea
            rows={2}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendPrompt(inputValue)
              }
            }}
            placeholder="Ask anything..."
            className="w-full bg-transparent p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none resize-none"
          />

          <div className="flex items-center justify-between px-2.5 pb-2">
            {/* Scope dropdown */}
            <div className="relative">
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="bg-[#161b22] border border-[#30363d] text-[11px] text-gray-300 rounded px-2 py-1 appearance-none pr-5 focus:outline-none cursor-pointer"
              >
                <option>My Calls</option>
                <option>Team Calls</option>
                <option>This Meeting</option>
              </select>
              <span className="absolute right-1.5 top-1.5 text-[9px] text-gray-400 pointer-events-none">
                ▼
              </span>
            </div>

            {/* Submit Arrow */}
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-[#00b4d8] disabled:opacity-30 text-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs hover:bg-[#0096c7] transition-all"
            >
              ↑
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

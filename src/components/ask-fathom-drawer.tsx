'use client'

import React, { useState, useRef, useEffect } from 'react'

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
      content: "Hi Sailakshmi! I'm your Fathom AI assistant. I have full context across all your calls and team recordings. Ask me anything about what was discussed, promised, or decided.",
      timestamp: 'Just now',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [scope, setScope] = useState('My Calls')
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const quickPrompts = [
    "Things I promised I'd do this week",
    'Summarize my meetings from this week',
    'Any looming deadlines?',
    'Surprise me with an insight',
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

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

    setTimeout(() => {
      let reply = ''
      const lower = promptText.toLowerCase()

      if (lower.includes('promised') || lower.includes('action')) {
        reply = `Here are the key commitments extracted from your recent calls:\n\n**1. Priya Patel** — Share detailed AI summarization project plan by Friday EOD.\n\n**2. James Liu** — Submit React onboarding flow PR by Thursday EOD.\n\n**3. Marcus Williams** — Schedule pricing model review with finance team.\n\n**4. Sarah Chen** — Talk to Alex about API refactor technical lead role.\n\n**5. Emma Thompson** — Prepare custom demo tailored to TechCorp's enterprise requirements.`
      } else if (lower.includes('summarize') || lower.includes('meetings')) {
        reply = `Here is a high-level synthesis across your recent meetings:\n\n📋 **Q4 Roadmap** — Calendar Integration set as 6-week MVP. AI Summarization in closed beta.\n\n🏢 **TechCorp Discovery** — High-value enterprise lead; 15-seat pilot targeting 200 seats.\n\n⚙️ **Eng Weekly** — Session token migration resolved. Test coverage at 67%, targeting 80%.\n\n🚀 **All Hands Oct '26** — Q3 revenue $8M ARR, 34% QoQ growth, 118% net retention.`
      } else if (lower.includes('deadline')) {
        reply = `Key upcoming deadlines detected:\n\n⚠️ **4 days** — Test coverage target of 80% (currently 67%).\n\n📅 **Next Thursday** — Finance pricing model meeting with Marcus & Sarah.\n\n🚀 **Thursday EOD** — James Liu submitting React onboarding PR.\n\n💼 **Nov 1** — TechCorp pilot review checkpoint.`
      } else if (lower.includes('insight') || lower.includes('surprise')) {
        reply = `💡 **Insight of the day:**\n\nAcross your last 12 meetings, *"calendar integration"* was mentioned 23 times — more than any other feature. Three enterprise deals are blocked on this single capability. If shipped this sprint, it could unlock ~$140k ARR.`
      } else {
        reply = `Based on your recent recordings across **${scope}**:\n\nThe team has strong product delivery momentum. Enterprise pipeline has 12 active deals. Key opportunity: customer demand for automated action item sync into Notion and Slack is the highest-requested integration this quarter.`
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 900)
  }

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-20 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 animate-bounce-in"
        style={{
          background: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(124,58,237,0.1))',
          border: '1px solid rgba(0,180,216,0.3)',
          color: '#00b4d8',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 20px rgba(0,180,216,0.15), 0 8px 30px rgba(0,0,0,0.4)',
        }}
        title="Open Ask Fathom"
      >
        <span className="text-sm">✨</span>
        <span className="text-xs font-bold">Ask FATHOM</span>
      </button>
    )
  }

  return (
    <div
      className="w-72 lg:w-80 flex flex-col flex-shrink-0 animate-fade-in"
      style={{
        background: 'rgba(10, 14, 22, 0.98)',
        borderLeft: '1px solid rgba(30, 37, 53, 0.8)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5"
        style={{ borderBottom: '1px solid rgba(30,37,53,0.6)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(124,58,237,0.15))',
              border: '1px solid rgba(0,180,216,0.25)',
            }}>
            <span className="text-sm">✨</span>
          </div>
          <div>
            <span className="text-xs font-black text-white tracking-wider">ASK FATHOM</span>
          </div>
          <span className="badge badge-cyan text-[9px]">AI</span>
        </div>
        <button
          onClick={onToggle}
          className="w-6 h-6 flex items-center justify-center rounded-md text-[#4a5568] hover:text-white hover:bg-[#111620] transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Gift Banner */}
      <div className="px-4 py-3 flex items-start gap-2.5"
        style={{
          background: 'linear-gradient(135deg, rgba(28,24,9,0.95), rgba(20,16,5,0.95))',
          borderBottom: '1px solid rgba(77,60,11,0.4)',
        }}>
        <span className="text-base flex-shrink-0">🎁</span>
        <div className="text-[10px] leading-relaxed">
          <span className="font-bold text-amber-300">Account-level Ask Fathom is here!</span>
          <span className="text-amber-500/80"> We&apos;re gifting unlimited use until Nov 1. </span>
          <a href="#" className="text-amber-400 underline hover:text-amber-200 transition-colors">Learn More</a>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex flex-col animate-fade-up ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            style={{ animationDelay: `${idx * 30}ms` }}
          >
            {msg.role === 'assistant' && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]"
                  style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.25), rgba(124,58,237,0.2))' }}>
                  ✨
                </div>
                <span className="text-[9px] font-bold text-[#00b4d8] tracking-wider">FATHOM AI</span>
              </div>
            )}
            <div
              className="max-w-[92%] rounded-xl px-3 py-2.5 text-[11px] leading-relaxed"
              style={msg.role === 'user'
                ? {
                    background: 'linear-gradient(135deg, #00b4d8, #0096c7)',
                    color: '#000',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(0,180,216,0.3)',
                  }
                : {
                    background: 'rgba(17, 22, 32, 0.8)',
                    border: '1px solid rgba(30,37,53,0.8)',
                    color: '#c8d8e8',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }
              }
            >
              <div className="whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                    .replace(/\n/g, '<br/>')
                }}>
              </div>
            </div>
            <span className="text-[9px] text-[#4a5568] mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-2 animate-fade-up">
            <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]"
              style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.25), rgba(124,58,237,0.2))' }}>
              ✨
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(17,22,32,0.8)', border: '1px solid rgba(30,37,53,0.8)' }}>
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
              <span className="text-[10px] text-[#4a5568] ml-1">Analyzing calls...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div className="px-4 py-3 flex flex-wrap gap-1.5 justify-end"
        style={{ borderTop: '1px solid rgba(30,37,53,0.5)' }}>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendPrompt(prompt)}
            className="text-[10px] font-medium px-2.5 py-1.5 rounded-full transition-all duration-200 text-right hover:scale-[1.02]"
            style={{
              background: 'rgba(17,22,32,0.8)',
              border: '1px solid rgba(30,37,53,0.8)',
              color: '#8b9ab2',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#00b4d8'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,180,216,0.3)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#8b9ab2'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(30,37,53,0.8)'
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="p-3.5"
        style={{ borderTop: '1px solid rgba(30,37,53,0.5)' }}>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendPrompt(inputValue) }}
          className="rounded-xl overflow-hidden transition-all duration-200"
          style={{ border: '1px solid rgba(30,37,53,0.8)', background: 'rgba(8,12,20,0.8)' }}
          onFocus={() => {
            const form = document.activeElement?.closest('form')
            if (form) (form as HTMLElement).style.borderColor = 'rgba(0,180,216,0.4)'
          }}
        >
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendPrompt(inputValue)
              }
            }}
            placeholder="Ask anything about your meetings..."
            className="w-full bg-transparent p-3 text-[11px] text-[#e8edf5] placeholder-[#4a5568] focus:outline-none resize-none"
          />
          <div className="flex items-center justify-between px-3 pb-2.5">
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="text-[10px] font-semibold px-2 py-1 rounded-lg focus:outline-none cursor-pointer appearance-none"
              style={{
                background: 'rgba(17,22,32,0.8)',
                border: '1px solid rgba(30,37,53,0.8)',
                color: '#8b9ab2',
              }}
            >
              <option>My Calls</option>
              <option>Team Calls</option>
              <option>This Meeting</option>
            </select>

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm transition-all duration-200 disabled:opacity-30 hover:scale-110"
              style={{
                background: inputValue.trim() ? 'linear-gradient(135deg, #00b4d8, #0096c7)' : 'rgba(30,37,53,0.8)',
                color: inputValue.trim() ? '#000' : '#4a5568',
                boxShadow: inputValue.trim() ? '0 0 12px rgba(0,180,216,0.4)' : 'none',
              }}
            >
              ↑
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

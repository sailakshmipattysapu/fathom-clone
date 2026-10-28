'use client'

import React, { useState } from 'react'

interface ActionItem {
  id: string
  text: string
  assignee: string | null
  completed: boolean
}

interface ActionItemsPanelProps {
  items: ActionItem[]
  onToggle: (id: string, completed: boolean) => void
}

const ASSIGNEE_COLORS: Record<string, string> = {
  'S': '#00b4d8', 'P': '#a78bfa', 'J': '#34d399', 'M': '#f59e0b',
  'A': '#fb7185', 'E': '#60a5fa', 'D': '#c084fc', 'R': '#4ade80',
}
function getColor(name: string) {
  return ASSIGNEE_COLORS[name.charAt(0).toUpperCase()] || '#00b4d8'
}

export function ActionItemsPanel({ items, onToggle }: ActionItemsPanelProps) {
  const [localItems, setLocalItems] = useState(items)
  const [newText, setNewText] = useState('')
  const [newAssignee, setNewAssignee] = useState('')
  const [addingNew, setAddingNew] = useState(false)

  const completedCount = localItems.filter((i) => i.completed).length
  const percent = localItems.length > 0 ? Math.round((completedCount / localItems.length) * 100) : 0

  function handleToggle(id: string) {
    const item = localItems.find((i) => i.id === id)
    if (!item) return
    const newCompleted = !item.completed
    setLocalItems((prev) => prev.map((i) => (i.id === id ? { ...i, completed: newCompleted } : i)))
    onToggle(id, newCompleted)
  }

  function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    if (!newText.trim()) return
    const newItem: ActionItem = {
      id: Date.now().toString(),
      text: newText,
      assignee: newAssignee || 'You',
      completed: false,
    }
    setLocalItems((prev) => [newItem, ...prev])
    setNewText('')
    setNewAssignee('')
    setAddingNew(false)
  }

  return (
    <div className="space-y-4 text-xs p-4">
      {/* Progress bar */}
      <div className="rounded-xl p-3.5"
        style={{ background: 'rgba(8,12,20,0.7)', border: '1px solid rgba(30,37,53,0.8)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#8b9ab2]">
            {completedCount}/{localItems.length} completed
          </span>
          <span className="text-[10px] font-black tabular-nums"
            style={{
              background: 'linear-gradient(135deg, #00b4d8, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            {percent}%
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(30,37,53,0.8)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #00b4d8, #7c3aed)',
              boxShadow: `0 0 8px rgba(0,180,216,0.4)`,
            }}
          />
        </div>
      </div>

      {/* Add new action item */}
      <div>
        {!addingNew ? (
          <button onClick={() => setAddingNew(true)}
            className="w-full flex items-center gap-2 p-3 rounded-xl text-[10px] font-semibold transition-all hover:scale-[1.01]"
            style={{
              background: 'rgba(0,180,216,0.05)',
              border: '1px dashed rgba(0,180,216,0.25)',
              color: '#00b4d8',
            }}>
            <span className="text-base leading-none">+</span>
            <span>Add action item</span>
          </button>
        ) : (
          <form onSubmit={handleAddItem} className="space-y-2 animate-fade-up">
            <input
              type="text" autoFocus
              value={newText} onChange={(e) => setNewText(e.target.value)}
              placeholder="Describe the action item..."
              className="input-field w-full px-3 py-2 rounded-xl text-xs"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)}
                placeholder="Assignee (optional)"
                className="input-field flex-1 px-3 py-2 rounded-xl text-xs"
              />
              <button type="submit" className="btn-primary px-4 py-2 rounded-xl text-[11px] font-bold">Add</button>
              <button type="button" onClick={() => { setAddingNew(false); setNewText(''); setNewAssignee('') }}
                className="px-3 py-2 rounded-xl text-[11px] font-bold text-[#8b9ab2] hover:text-white transition-colors"
                style={{ background: 'rgba(30,37,53,0.5)', border: '1px solid rgba(30,37,53,0.8)' }}>
                ✕
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Items List */}
      <ul className="space-y-2">
        {localItems.map((item, idx) => {
          const color = item.assignee ? getColor(item.assignee) : '#00b4d8'
          return (
            <li
              key={item.id}
              className="group rounded-xl p-3 transition-all duration-200 animate-fade-up"
              style={{
                animationDelay: `${idx * 40}ms`,
                background: item.completed ? 'rgba(8,12,20,0.4)' : 'rgba(17,22,32,0.7)',
                border: `1px solid ${item.completed ? 'rgba(30,37,53,0.4)' : 'rgba(30,37,53,0.8)'}`,
                opacity: item.completed ? 0.55 : 1,
              }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                {/* Custom checkbox */}
                <div
                  onClick={() => handleToggle(item.id)}
                  className="flex-shrink-0 w-4.5 h-4.5 rounded-md border flex items-center justify-center mt-0.5 transition-all duration-200 cursor-pointer"
                  style={{
                    width: 18, height: 18,
                    background: item.completed ? 'linear-gradient(135deg, #00b4d8, #0096c7)' : 'rgba(8,12,20,0.8)',
                    border: item.completed ? 'none' : '1.5px solid rgba(30,37,53,0.9)',
                    boxShadow: item.completed ? '0 0 8px rgba(0,180,216,0.4)' : 'none',
                  }}
                >
                  {item.completed && (
                    <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`text-xs leading-relaxed block ${item.completed ? 'line-through text-[#4a5568]' : 'text-[#c8d8e8]'}`}>
                    {item.text}
                  </span>

                  {item.assignee && (
                    <span className="inline-flex items-center gap-1.5 mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        color,
                      }}>
                      <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black text-white"
                        style={{ background: color }}>
                        {item.assignee.charAt(0)}
                      </span>
                      {item.assignee}
                    </span>
                  )}
                </div>
              </label>
            </li>
          )
        })}
      </ul>

      {localItems.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center text-xl mb-3"
            style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.15)' }}>
            ✅
          </div>
          <p className="text-xs text-[#4a5568]">No action items yet. Add one above!</p>
        </div>
      )}
    </div>
  )
}

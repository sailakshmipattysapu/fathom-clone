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

export function ActionItemsPanel({ items, onToggle }: ActionItemsPanelProps) {
  const [localItems, setLocalItems] = useState(items)
  const [newText, setNewText] = useState('')
  const [newAssignee, setNewAssignee] = useState('')

  const completedCount = localItems.filter((i) => i.completed).length

  function handleToggle(id: string) {
    const item = localItems.find((i) => i.id === id)
    if (!item) return
    const newCompleted = !item.completed
    setLocalItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: newCompleted } : i))
    )
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
  }

  return (
    <div className="space-y-6 text-white text-xs">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5 font-medium">
          <span>{completedCount} of {localItems.length} completed</span>
          <span className="text-[#00b4d8] font-mono">
            {localItems.length > 0 ? Math.round((completedCount / localItems.length) * 100) : 0}%
          </span>
        </div>
        <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00b4d8] rounded-full transition-all duration-300"
            style={{ width: `${localItems.length > 0 ? (completedCount / localItems.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Add New Item Input */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="+ Add new action item..."
          className="flex-1 bg-[#0d1117] border border-[#21262d] focus:border-[#00b4d8] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
        />
        <input
          type="text"
          value={newAssignee}
          onChange={(e) => setNewAssignee(e.target.value)}
          placeholder="Assignee (e.g. Priya)"
          className="w-32 bg-[#0d1117] border border-[#21262d] focus:border-[#00b4d8] rounded-lg px-2.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#00b4d8] text-black font-bold px-3 py-2 rounded-lg text-xs hover:bg-[#0096c7]"
        >
          Add
        </button>
      </form>

      {/* Items List */}
      <ul className="space-y-2.5">
        {localItems.map((item) => (
          <li
            key={item.id}
            className={`p-3 rounded-xl border transition-all ${
              item.completed
                ? 'bg-[#0d1117]/60 border-[#21262d] opacity-60'
                : 'bg-[#0d1117] border-[#21262d] hover:border-[#30363d]'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggle(item.id)}
                className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#00b4d8] mt-0.5 focus:ring-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`text-xs leading-relaxed block ${
                    item.completed ? 'line-through text-gray-500' : 'text-gray-200'
                  }`}
                >
                  {item.text}
                </span>

                {item.assignee && (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] bg-[#161b22] border border-[#30363d] text-[#00b4d8] px-2 py-0.5 rounded-full font-medium">
                    <span>👤</span>
                    <span>{item.assignee}</span>
                  </span>
                )}
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

'use client'

import { useState } from 'react'

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

const ASSIGNEE_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
]

function getAssigneeColor(assignee: string, assignees: string[]): string {
  const idx = assignees.indexOf(assignee)
  return ASSIGNEE_COLORS[idx % ASSIGNEE_COLORS.length]
}

export function ActionItemsPanel({ items, onToggle }: ActionItemsPanelProps) {
  const [localItems, setLocalItems] = useState(items)

  const uniqueAssignees = Array.from(new Set(items.filter((i) => i.assignee).map((i) => i.assignee as string)))
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

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-semibold text-gray-900 mb-1">No action items</h3>
        <p className="text-sm text-gray-500">No action items were found in this meeting.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      {items.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span>{completedCount} of {localItems.length} completed</span>
            <span>{Math.round((completedCount / localItems.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / localItems.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Group by assignee */}
      {uniqueAssignees.length > 0 ? (
        <div className="space-y-6">
          {uniqueAssignees.map((assignee) => {
            const assigneeItems = localItems.filter((i) => i.assignee === assignee)
            const color = getAssigneeColor(assignee, uniqueAssignees)
            return (
              <div key={assignee}>
                <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${color}`}>
                  <span>{assignee[0]}</span>
                  <span>{assignee}</span>
                </div>
                <ul className="space-y-2">
                  {assigneeItems.map((item) => (
                    <li key={item.id}>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleToggle(item.id)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </div>
                        <span
                          className={`text-sm leading-relaxed flex-1 ${
                            item.completed ? 'line-through text-gray-400' : 'text-gray-700 group-hover:text-gray-900'
                          }`}
                        >
                          {item.text}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {/* Unassigned */}
          {localItems.filter((i) => !i.assignee).length > 0 && (
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-gray-100 text-gray-600">
                Unassigned
              </div>
              <ul className="space-y-2">
                {localItems
                  .filter((i) => !i.assignee)
                  .map((item) => (
                    <li key={item.id}>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleToggle(item.id)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </div>
                        <span
                          className={`text-sm leading-relaxed flex-1 ${
                            item.completed ? 'line-through text-gray-400' : 'text-gray-700 group-hover:text-gray-900'
                          }`}
                        >
                          {item.text}
                        </span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {localItems.map((item) => (
            <li key={item.id}>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggle(item.id)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <span
                  className={`text-sm leading-relaxed ${
                    item.completed ? 'line-through text-gray-400' : 'text-gray-700 group-hover:text-gray-900'
                  }`}
                >
                  {item.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

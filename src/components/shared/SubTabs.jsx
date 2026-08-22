import React from 'react'

const ACTIVE = {
  stack: 'bg-stack text-black',
  queue: 'bg-queue text-black',
  linkedlist: 'bg-linkedlist text-black',
  recursion: 'bg-recursion text-black',
  sorting: 'bg-sorting text-black',
  searching: 'bg-searching text-black',
}

export default function SubTabs({ tabs, active, onChange, color = 'stack' }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
            active === t.id
              ? ACTIVE[color]
              : 'border border-line bg-panel2/60 text-dim hover:text-white'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

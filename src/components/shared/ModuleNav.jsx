import React from 'react'

const RING = {
  stack: 'border-stack/60 bg-stack/[0.06]',
  queue: 'border-queue/60 bg-queue/[0.06]',
  linkedlist: 'border-linkedlist/60 bg-linkedlist/[0.06]',
  recursion: 'border-recursion/60 bg-recursion/[0.06]',
  sorting: 'border-sorting/60 bg-sorting/[0.06]',
  searching: 'border-searching/60 bg-searching/[0.06]',
}

const DOT = {
  stack: 'bg-stack',
  queue: 'bg-queue',
  linkedlist: 'bg-linkedlist',
  recursion: 'bg-recursion',
  sorting: 'bg-sorting',
  searching: 'bg-searching',
}

const TITLE = {
  stack: 'text-stack',
  queue: 'text-queue',
  linkedlist: 'text-linkedlist',
  recursion: 'text-recursion',
  sorting: 'text-sorting',
  searching: 'text-searching',
}

export default function ModuleNav({ modules, activeId, onSelect }) {
  return (
    <nav className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {modules.map((m) => {
        const isActive = m.id === activeId
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`rounded-xl border px-4 py-3 text-left transition-all ${
              isActive
                ? RING[m.color]
                : 'border-line bg-panel/50 hover:border-line2 hover:bg-panel2/60'
            }`}
          >
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${DOT[m.color]} ${!isActive && 'opacity-60'}`} />
            <div
              className={`mt-1.5 text-sm font-semibold ${
                isActive ? TITLE[m.color] : 'text-dim'
              }`}
            >
              {m.title}
            </div>
            <div className="mono mt-0.5 text-xxs text-muted">{m.sub}</div>
          </button>
        )
      })}
    </nav>
  )
}

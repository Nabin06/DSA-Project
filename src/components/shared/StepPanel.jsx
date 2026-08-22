import React, { useEffect, useRef } from 'react'

const TEXT = {
  stack: 'text-stack border-stack/40 bg-stack/[0.08]',
  queue: 'text-queue border-queue/40 bg-queue/[0.08]',
  linkedlist: 'text-linkedlist border-linkedlist/40 bg-linkedlist/[0.08]',
  recursion: 'text-recursion border-recursion/40 bg-recursion/[0.08]',
  sorting: 'text-sorting border-sorting/40 bg-sorting/[0.08]',
  searching: 'text-searching border-searching/40 bg-searching/[0.08]',
}

const BTN = {
  stack: 'bg-stack text-black',
  queue: 'bg-queue text-black',
  linkedlist: 'bg-linkedlist text-black',
  recursion: 'bg-recursion text-black',
  sorting: 'bg-sorting text-black',
  searching: 'bg-searching text-black',
}

/**
 * steps: [{ label: string }]
 * index: current step index (0-based)
 */
export default function StepPanel({ steps, index, onIndexChange, color = 'stack' }) {
  const listRef = useRef(null)
  const activeRef = useRef(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [index])

  if (!steps || steps.length === 0) {
    return (
      <div className="flex h-full min-h-[120px] items-center justify-center rounded-xl border border-line bg-panel2/40 text-xs text-muted">
        Run to start stepping
      </div>
    )
  }

  const canPrev = index > 0
  const canNext = index < steps.length - 1

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button
          disabled={!canPrev}
          onClick={() => onIndexChange(index - 1)}
          className="mono text-xxs text-dim disabled:opacity-30 hover:text-white"
        >
          ← Prev
        </button>
        <div className="mono text-xxs text-muted">
          {index + 1} / {steps.length}
        </div>
        <button
          disabled={!canNext}
          onClick={() => onIndexChange(index + 1)}
          className="mono text-xxs text-dim disabled:opacity-30 hover:text-white"
        >
          Next →
        </button>
      </div>

      <div className={`mono fade-slide mb-3 rounded-lg border px-3 py-2 text-xs font-semibold ${TEXT[color]}`}>
        {steps[index].label}
      </div>

      <div
        ref={listRef}
        className="max-h-[180px] overflow-y-auto rounded-lg border border-line bg-panel2/30"
      >
        {steps.map((s, i) => (
          <div
            key={i}
            ref={i === index ? activeRef : null}
            onClick={() => onIndexChange(i)}
            className={`mono flex cursor-pointer gap-3 px-3 py-1.5 text-xxs ${
              i === index
                ? `border-l-2 ${TEXT[color]}`
                : 'border-l-2 border-transparent text-muted hover:text-dim'
            }`}
          >
            <span className="w-4 shrink-0 text-right opacity-50">{i + 1}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RunButton({ onClick, label = 'Run', color = 'stack', disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-5 py-2 text-sm font-semibold disabled:opacity-40 ${BTN[color]}`}
    >
      {label}
    </button>
  )
}

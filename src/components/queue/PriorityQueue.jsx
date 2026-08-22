import React, { useState } from 'react'
import { TextField, GhostButton, SolidButton, InfoBox } from '../shared/Bits.jsx'

export default function PriorityQueue() {
  const [items, setItems] = useState([
    { value: 'Fire alarm', priority: 1 },
    { value: 'Low disk space', priority: 3 },
    { value: 'New email', priority: 5 },
  ])
  const [value, setValue] = useState('')
  const [priority, setPriority] = useState('3')
  const [msg, setMsg] = useState('')

  const sorted = [...items].sort((a, b) => a.priority - b.priority)

  const insert = () => {
    if (!value.trim()) return
    const p = Number(priority) || 0
    setItems((s) => [...s, { value: value.trim(), priority: p }])
    setMsg(`Inserted "${value.trim()}" with priority ${p}`)
    setValue('')
  }
  const popMin = () => {
    if (sorted.length === 0) return
    const top = sorted[0]
    setMsg(`Dequeued highest priority: "${top.value}" (p=${top.priority})`)
    setItems((s) => {
      const idx = s.indexOf(top)
      return s.filter((_, i) => i !== idx)
    })
  }
  const clear = () => {
    setItems([])
    setMsg('Cleared')
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
      <div>
        <div className="mono mb-2 text-xxs text-muted">
          QUEUE &nbsp;(sorted by priority, 1 = highest)
        </div>
        <div className="flex flex-col gap-2">
          {sorted.length === 0 && (
            <div className="mono rounded-lg border border-line bg-panel2/30 px-4 py-6 text-center text-xxs text-muted">
              Empty
            </div>
          )}
          {sorted.map((it, i) => (
            <div
              key={`${it.value}-${i}`}
              className={`mono pop-in flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${
                i === 0 ? 'border-queue bg-queue/10 text-queue' : 'border-line2 bg-panel2/50 text-white'
              }`}
            >
              <span>{it.value}</span>
              <span className="rounded-md border border-line px-2 py-0.5 text-xxs text-muted">
                p={it.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <TextField value={value} onChange={setValue} placeholder="Value..." className="border-line" />
        <div className="mt-2">
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Priority (1 = highest)"
            className="w-full rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <SolidButton color="queue" onClick={insert} className="mt-3 w-full">
          Insert
        </SolidButton>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <GhostButton onClick={popMin} disabled={items.length === 0}>
            Dequeue
          </GhostButton>
          <GhostButton onClick={clear} disabled={items.length === 0}>
            Clear
          </GhostButton>
        </div>

        {msg && <div className="mono mt-3 rounded-lg border border-queue/30 bg-queue/[0.06] px-3 py-2 text-xxs text-queue">{msg}</div>}

        <div className="mt-4">
          <InfoBox title="Priority Queue" badges={['insert O(log n)', 'peek O(1)', 'extract O(log n)']}>
            Elements are served by priority, not arrival order. Lower number = higher priority here.
            Typically backed by a binary heap.
          </InfoBox>
        </div>
      </div>
    </div>
  )
}

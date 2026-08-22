import React, { useState } from 'react'
import { TextField, GhostButton, SolidButton, InfoBox } from '../shared/Bits.jsx'
import QueueSlots from './QueueSlots.jsx'

const CAPACITY = 6

export default function LinearQueue() {
  const [items, setItems] = useState(['B', 'C', '50'])
  const [value, setValue] = useState('')
  const [msg, setMsg] = useState('Dequeued: A')

  const enqueue = () => {
    if (!value.trim() || items.length >= CAPACITY) return
    setItems((s) => [...s, value.trim()])
    setValue('')
  }
  const dequeue = () => {
    if (items.length === 0) return
    setMsg(`Dequeued: ${items[0]}`)
    setItems((s) => s.slice(1))
  }
  const clear = () => {
    setItems([])
    setMsg('Cleared')
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
      <div>
        <QueueSlots items={items} capacity={CAPACITY} frontIdx={0} rearIdx={items.length - 1} />
      </div>

      <div>
        <div className="flex gap-3">
          <TextField value={value} onChange={setValue} onEnter={enqueue} placeholder="Value..." className="border-line" />
          <SolidButton color="queue" onClick={enqueue} className="shrink-0">
            Enqueue
          </SolidButton>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <GhostButton onClick={dequeue} disabled={items.length === 0}>
            Dequeue
          </GhostButton>
          <GhostButton onClick={clear} disabled={items.length === 0}>
            Clear
          </GhostButton>
        </div>

        {msg && <div className="mono mt-3 rounded-lg border border-queue/30 bg-queue/[0.06] px-3 py-2 text-xxs text-queue">{msg}</div>}

        <div className="mt-4">
          <InfoBox
            title="FIFO · Linear Queue"
            badges={['enqueue O(1)', 'dequeue O(1)', 'peek O(1)']}
          >
            Enqueue at rear, dequeue from front. Fixed array — space before front is wasted once dequeued.
          </InfoBox>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { TextField, GhostButton, InfoBox } from '../shared/Bits.jsx'
import QueueSlots from './QueueSlots.jsx'

const CAPACITY = 6

export default function DequeQueue() {
  const [items, setItems] = useState(['X', 'Y', 'Z', '10'])
  const [value, setValue] = useState('')
  const [msg, setMsg] = useState('Added rear')

  const addFront = () => {
    if (!value.trim() || items.length >= CAPACITY) return
    setItems((s) => [value.trim(), ...s])
    setMsg('Added front')
    setValue('')
  }
  const addRear = () => {
    if (!value.trim() || items.length >= CAPACITY) return
    setItems((s) => [...s, value.trim()])
    setMsg('Added rear')
    setValue('')
  }
  const removeFront = () => {
    if (items.length === 0) return
    setMsg(`Removed front: ${items[0]}`)
    setItems((s) => s.slice(1))
  }
  const removeRear = () => {
    if (items.length === 0) return
    setMsg(`Removed rear: ${items[items.length - 1]}`)
    setItems((s) => s.slice(0, -1))
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
      <div>
        <QueueSlots items={items} capacity={CAPACITY} frontIdx={0} rearIdx={items.length - 1} twoWay />
      </div>

      <div>
        <TextField value={value} onChange={setValue} placeholder="Value..." className="border-line" />

        <div className="mt-3 grid grid-cols-2 gap-3">
          <GhostButton onClick={addFront} disabled={items.length >= CAPACITY}>
            ← Add Front
          </GhostButton>
          <GhostButton onClick={addRear} disabled={items.length >= CAPACITY}>
            Add Rear →
          </GhostButton>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <GhostButton onClick={removeFront} disabled={items.length === 0}>
            ← Remove Front
          </GhostButton>
          <GhostButton onClick={removeRear} disabled={items.length === 0}>
            Remove Rear →
          </GhostButton>
        </div>

        {msg && <div className="mono mt-3 rounded-lg border border-queue/30 bg-queue/[0.06] px-3 py-2 text-xxs text-queue">{msg}</div>}

        <div className="mt-4">
          <InfoBox
            title="Deque · Double-Ended Queue"
            badges={['addFront O(1)', 'addRear O(1)', 'remFront O(1)', 'remRear O(1)']}
          >
            Insert and delete at both ends. Generalizes stack and queue. Used in sliding window problems,
            browser history, undo/redo operations.
          </InfoBox>
        </div>
      </div>
    </div>
  )
}

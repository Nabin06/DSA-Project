import React, { useState, useMemo } from 'react'
import { TextField, GhostButton, SolidButton, InfoBox } from '../shared/Bits.jsx'

const CAPACITY = 6
const RADIUS = 80
const CENTER = 100

export default function CircularQueue() {
  // slots is a fixed-size array; front/rear are indices that wrap with % CAPACITY
  const [slots, setSlots] = useState(() => {
    const s = Array(CAPACITY).fill(undefined)
    s[0] = '3'
    s[1] = 'C'
    s[2] = '50'
    return s
  })
  const [front, setFront] = useState(0)
  const [count, setCount] = useState(3)
  const [value, setValue] = useState('')

  const rear = (front + count - 1 + CAPACITY) % CAPACITY

  const enqueue = () => {
    if (!value.trim() || count >= CAPACITY) return
    const nextRear = (front + count) % CAPACITY
    const copy = [...slots]
    copy[nextRear] = value.trim()
    setSlots(copy)
    setCount((c) => c + 1)
    setValue('')
  }
  const dequeue = () => {
    if (count === 0) return
    const copy = [...slots]
    copy[front] = undefined
    setSlots(copy)
    setFront((f) => (f + 1) % CAPACITY)
    setCount((c) => c - 1)
  }
  const clear = () => {
    setSlots(Array(CAPACITY).fill(undefined))
    setFront(0)
    setCount(0)
  }

  const positions = useMemo(() => {
    return Array.from({ length: CAPACITY }).map((_, i) => {
      const angle = (i / CAPACITY) * 2 * Math.PI - Math.PI / 2
      return {
        x: CENTER + RADIUS * Math.cos(angle),
        y: CENTER + RADIUS * Math.sin(angle),
      }
    })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
      <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
        {positions.map((p, i) => {
          const filled = slots[i] !== undefined
          const isFront = i === front && filled
          const isRear = i === rear && filled
          return (
            <div
              key={i}
              className={`mono absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-semibold ${
                filled
                  ? isFront || isRear
                    ? 'border-queue bg-queue/10 text-queue pop-in'
                    : 'border-line2 bg-panel2/60 text-white'
                  : 'border-line bg-panel2/10 text-muted'
              }`}
              style={{ left: p.x, top: p.y }}
            >
              {slots[i] ?? ''}
              <span className="mono absolute -bottom-4 text-[9px] text-muted">[{i}]</span>
            </div>
          )
        })}
        <div className="mono absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xxs text-muted">
          size: {count}
        </div>
      </div>

      <div>
        <div className="flex gap-3">
          <TextField value={value} onChange={setValue} onEnter={enqueue} placeholder="Value..." className="border-line" />
          <SolidButton color="queue" onClick={enqueue} className="shrink-0">
            Enqueue
          </SolidButton>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <GhostButton onClick={dequeue} disabled={count === 0}>
            Dequeue
          </GhostButton>
          <GhostButton onClick={clear} disabled={count === 0}>
            Clear
          </GhostButton>
        </div>

        <div className="mt-4">
          <InfoBox
            title="FIFO · Circular Queue"
            badges={['enqueue O(1)', 'dequeue O(1)', 'peek O(1)']}
          >
            Rear wraps to index 0 when array end is reached. No wasted slots. Efficient reuse of space.
          </InfoBox>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { TextField, GhostButton, SolidButton, InfoBox } from '../shared/Bits.jsx'

const CAPACITY = 8

export default function StackOperations() {
  const [stack, setStack] = useState(['88', '17', '42'])
  const [value, setValue] = useState('')
  const [flash, setFlash] = useState(null)

  const push = () => {
    if (!value.trim() || stack.length >= CAPACITY) return
    setStack((s) => [...s, value.trim()])
    setValue('')
  }
  const pop = () => {
    if (stack.length === 0) return
    setFlash(`Popped "${stack[stack.length - 1]}"`)
    setStack((s) => s.slice(0, -1))
  }
  const peek = () => {
    if (stack.length === 0) return
    setFlash(`Top is "${stack[stack.length - 1]}"`)
  }
  const clear = () => {
    setStack([])
    setFlash('Cleared')
  }

  const slots = Array.from({ length: CAPACITY })

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[140px_1fr]">
      <div className="flex flex-col items-center">
        <span className="mono mb-1 text-xxs text-muted">TOP</span>
        <div className="flex flex-col-reverse gap-1.5">
          {slots.map((_, i) => {
            const val = stack[i]
            const isTop = i === stack.length - 1
            return (
              <div
                key={i}
                className={`mono flex h-9 w-24 items-center justify-center rounded-md border text-sm font-semibold ${
                  val !== undefined
                    ? isTop
                      ? 'border-stack bg-stack/10 text-stack pop-in'
                      : 'border-line2 bg-panel2/60 text-white'
                    : 'border-line bg-panel2/20 text-transparent'
                }`}
              >
                {val ?? '·'}
              </div>
            )
          })}
        </div>
        <span className="mono mt-1 text-xxs text-muted">BTM</span>
        <span className="mono mt-2 rounded bg-panel2 px-2 py-0.5 text-xxs text-muted">
          {stack.length}/{CAPACITY}
        </span>
      </div>

      <div>
        <div className="flex gap-3">
          <TextField
            value={value}
            onChange={setValue}
            onEnter={push}
            placeholder="Value..."
            className="border-line"
          />
          <SolidButton color="stack" onClick={push} className="shrink-0">
            Push
          </SolidButton>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <GhostButton onClick={pop} disabled={stack.length === 0}>
            Pop
          </GhostButton>
          <GhostButton onClick={peek} disabled={stack.length === 0}>
            Peek
          </GhostButton>
          <GhostButton onClick={clear} disabled={stack.length === 0}>
            Clear
          </GhostButton>
        </div>

        {flash && (
          <div className="mono mt-3 text-xxs text-stack fade-slide">{flash}</div>
        )}

        <div className="mt-4">
          <InfoBox
            title="LIFO · Last In, First Out"
            badges={['push O(1)', 'pop O(1)', 'peek O(1)', 'search O(n)']}
          >
            Push adds to top. Pop removes from top. Only the top element is accessible at any time.
          </InfoBox>
        </div>
      </div>
    </div>
  )
}

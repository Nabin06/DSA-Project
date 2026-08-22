import React from 'react'

const ACTIVE = {
  stack: 'border-stack text-stack bg-stack/10',
  queue: 'border-queue text-queue bg-queue/10',
  linkedlist: 'border-linkedlist text-linkedlist bg-linkedlist/10',
  recursion: 'border-recursion text-recursion bg-recursion/10',
}

export default function StackBox({ title = 'STACK', items = [], size = 6, color = 'stack' }) {
  const slots = Array.from({ length: size })
  return (
    <div className="flex flex-col items-center rounded-xl border border-line bg-panel2/30 p-3">
      <span className="mono mb-2 text-xxs text-muted">{title}</span>
      <span className="mono mb-1 text-xxs text-muted">TOP</span>
      <div className="flex flex-col-reverse gap-1.5">
        {slots.map((_, i) => {
          const val = items[i]
          const isTop = i === items.length - 1
          return (
            <div
              key={i}
              className={`mono flex h-9 w-14 items-center justify-center rounded-md border text-xs font-semibold ${
                val !== undefined
                  ? isTop
                    ? `${ACTIVE[color]} pop-in`
                    : 'border-line2 bg-panel2/60 text-white'
                  : 'border-line bg-panel2/10 text-transparent'
              }`}
            >
              {val ?? '·'}
            </div>
          )
        })}
      </div>
      <span className="mono mt-1 text-xxs text-muted">BTM</span>
    </div>
  )
}

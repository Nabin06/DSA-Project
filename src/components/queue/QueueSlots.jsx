import React from 'react'

export default function QueueSlots({ items, capacity, frontIdx, rearIdx, twoWay = false }) {
  const slots = Array.from({ length: capacity })
  return (
    <div className="inline-flex flex-col">
      <div className="flex items-end gap-4">
        {twoWay && <span className="mono mb-6 text-xxs text-queue">⇅ FRONT</span>}
        <div className="flex gap-2">
          {slots.map((_, i) => {
            const val = items[i]
            const isFront = i === frontIdx && val !== undefined
            const isRear = i === rearIdx && val !== undefined
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`mono flex h-11 w-14 items-center justify-center rounded-md border text-sm font-semibold ${
                    val !== undefined
                      ? isFront || isRear
                        ? 'border-queue bg-queue/10 text-queue pop-in'
                        : 'border-line2 bg-panel2/60 text-white'
                      : 'border-line bg-panel2/10 text-transparent'
                  }`}
                >
                  {val ?? '·'}
                </div>
                <span className="mono text-xxs text-muted">[{i}]</span>
              </div>
            )
          })}
        </div>
        {twoWay && <span className="mono mb-6 text-xxs text-queue">REAR ⇅</span>}
      </div>
      {!twoWay && (
        <div className="mono mt-1 flex justify-between text-xxs text-queue">
          <span>FRONT →</span>
          <span>← REAR</span>
        </div>
      )}
      <div className="mono mt-2 text-xxs text-muted">
        size: {items.length}/{capacity}
      </div>
    </div>
  )
}

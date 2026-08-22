import React, { useMemo, useState, useEffect } from 'react'
import { buildFibTrace, layoutTree } from '../../lib/fibTree.js'

const N_OPTIONS = [3, 4, 5, 6, 7]

const SPACING_X = 56
const SPACING_Y = 76
const OFFSET_X = 36
const OFFSET_Y = 36
const NODE_R = 18

export default function FibonacciView() {
  const [n, setN] = useState(5)
  const [idx, setIdx] = useState(0)

  const trace = useMemo(() => buildFibTrace(n), [n])
  const { positions, leafCount } = useMemo(() => layoutTree(trace.root), [trace])

  useEffect(() => setIdx(0), [n])

  const event = trace.events[idx]
  const returnedIds = useMemo(() => {
    const s = new Set()
    for (let i = 0; i <= idx; i++) {
      const e = trace.events[i]
      if (e.type === 'return') s.add(e.nodeId)
    }
    return s
  }, [idx, trace])

  const activeStack = event.stack
  const activeTop = activeStack[activeStack.length - 1]
  const stackSet = new Set(activeStack)

  const width = Math.max(leafCount * SPACING_X + OFFSET_X * 2, 300)
  const maxDepth = Math.max(...Object.values(positions).map((p) => p.depth))
  const height = (maxDepth + 1) * SPACING_Y + OFFSET_Y

  const nodeIds = Object.keys(trace.nodeMap)

  const stateFor = (id) => {
    if (returnedIds.has(Number(id))) return 'returned'
    if (Number(id) === activeTop) return 'active'
    if (stackSet.has(Number(id))) return 'instack'
    return 'pending'
  }

  const COLORS = {
    returned: { stroke: '#34d399', fill: 'rgba(52,211,153,0.12)', text: '#34d399' },
    active: { stroke: '#60a5fa', fill: 'rgba(96,165,250,0.15)', text: '#60a5fa' },
    instack: { stroke: '#a78bfa', fill: 'rgba(167,139,250,0.12)', text: '#a78bfa' },
    pending: { stroke: '#2a2a36', fill: '#131319', text: '#55555f' },
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="mono flex items-center gap-2 text-sm text-dim">
          fib(
          <div className="flex gap-1">
            {N_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setN(opt)}
                className={`h-7 w-7 rounded-md text-xs font-semibold ${
                  n === opt ? 'bg-recursion text-black' : 'border border-line text-dim hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          )
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            disabled={idx === 0}
            onClick={() => setIdx((i) => i - 1)}
            className="mono text-xxs text-dim disabled:opacity-30 hover:text-white"
          >
            ← Prev
          </button>
          <span className="mono text-xxs text-muted">
            {idx + 1} / {trace.events.length}
          </span>
          <button
            disabled={idx === trace.events.length - 1}
            onClick={() => setIdx((i) => i + 1)}
            className="mono text-xxs text-dim disabled:opacity-30 hover:text-white"
          >
            Next →
          </button>
        </div>
      </div>

      <div
        className={`mono fade-slide mt-4 rounded-lg border px-3 py-2 text-xs font-semibold ${
          event.type === 'return'
            ? 'border-queue/40 bg-queue/[0.08] text-queue'
            : 'border-recursion/40 bg-recursion/[0.08] text-recursion'
        }`}
      >
        {event.type === 'return' && <span className="mr-2 rounded bg-queue/20 px-1.5 py-0.5 text-[10px]">RETURN</span>}
        {event.label}
        <span className="float-right text-muted">depth: {trace.nodeMap[event.nodeId].depth}</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
        <div className="overflow-x-auto rounded-xl border border-line bg-panel2/30 p-4">
          <svg width={width} height={height}>
            {nodeIds.map((id) => {
              const node = trace.nodeMap[id]
              if (!node.children.length) return null
              const p = positions[id]
              return node.children.map((c) => {
                const cp = positions[c.id]
                return (
                  <line
                    key={`${id}-${c.id}`}
                    x1={OFFSET_X + p.x * SPACING_X}
                    y1={OFFSET_Y + p.depth * SPACING_Y}
                    x2={OFFSET_X + cp.x * SPACING_X}
                    y2={OFFSET_Y + cp.depth * SPACING_Y}
                    stroke="#22222c"
                    strokeWidth={1.5}
                  />
                )
              })
            })}
            {nodeIds.map((id) => {
              const node = trace.nodeMap[id]
              const p = positions[id]
              const st = stateFor(id)
              const c = COLORS[st]
              const cx = OFFSET_X + p.x * SPACING_X
              const cy = OFFSET_Y + p.depth * SPACING_Y
              return (
                <g key={id}>
                  <circle cx={cx} cy={cy} r={NODE_R} fill={c.fill} stroke={c.stroke} strokeWidth={st === 'active' ? 2.5 : 1.5} />
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={c.text} fontWeight="600">
                    {node.n}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div>
          <div className="mono mb-2 text-xxs text-muted">CALL STACK</div>
          <div className="flex flex-col gap-1.5">
            {[...activeStack].reverse().map((id, i) => (
              <div
                key={id}
                className={`mono rounded-lg border px-3 py-1.5 text-center text-xs ${
                  i === 0
                    ? 'border-recursion bg-recursion/10 text-recursion'
                    : 'border-stack/40 bg-stack/[0.06] text-stack'
                }`}
              >
                fib({trace.nodeMap[id].n})
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mono mt-4 flex flex-wrap gap-4 text-xxs text-muted">
        <LegendDot color="#60a5fa" label="Active call" />
        <LegendDot color="#34d399" label="Returned" />
        <LegendDot color="#a78bfa" label="In stack" />
        <LegendDot color="#3a3a46" label="Pending" />
      </div>
    </div>
  )
}

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
}

import React, { useEffect, useMemo, useState } from 'react'
import { generateHanoiMoves, pegsAfter } from '../../lib/hanoi.js'
import { InfoBox } from '../shared/Bits.jsx'

const N_OPTIONS = [2, 3, 4, 5]
const DISK_COLORS = ['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#34d399', '#22d3ee']

export default function TowerOfHanoiView() {
  const [n, setN] = useState(3)
  const [step, setStep] = useState(0) // number of moves applied (0..moves.length)

  const moves = useMemo(() => generateHanoiMoves(n), [n])
  const totalMoves = moves.length

  useEffect(() => setStep(0), [n])

  const pegs = useMemo(() => pegsAfter(n, moves, step), [n, moves, step])
  const currentMove = step > 0 ? moves[step - 1] : null

  const maxWidth = 30 + n * 14

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="mono flex items-center gap-2 text-sm text-dim">
          disks =
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
          <span className="ml-2 text-xxs text-muted">
            2^{n}-1 = {totalMoves} total moves
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button onClick={() => setStep(0)} className="mono text-xxs text-dim hover:text-white" title="Restart">
            ⏮
          </button>
          <button
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="mono text-xxs text-dim disabled:opacity-30 hover:text-white"
          >
            ← Prev
          </button>
          <span className="mono text-xxs text-muted">
            Move {step}/{totalMoves}
          </span>
          <button
            disabled={step === totalMoves}
            onClick={() => setStep((s) => s + 1)}
            className="mono text-xxs text-dim disabled:opacity-30 hover:text-white"
          >
            Next →
          </button>
        </div>
      </div>

      <div
        className={`mono fade-slide mt-4 rounded-lg border px-3 py-2 text-center text-xs font-semibold ${
          currentMove ? 'border-recursion/40 bg-recursion/[0.08] text-recursion' : 'border-line bg-panel2/30 text-muted'
        }`}
      >
        {currentMove
          ? `Move disk ${currentMove.disk} from Peg ${currentMove.from} → Peg ${currentMove.to}`
          : 'Initial state — press Next to begin'}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 rounded-xl border border-line bg-panel2/20 p-6">
        {['A', 'B', 'C'].map((peg) => (
          <div key={peg} className="flex flex-col items-center">
            <div className="relative flex h-[220px] w-full flex-col-reverse items-center">
              <div className="absolute bottom-0 h-1 w-full rounded bg-line2" />
              <div className="absolute bottom-0 h-[200px] w-1 rounded-t bg-line2" />
              <div className="z-10 flex flex-col-reverse items-center gap-1 pb-1">
                {pegs[peg].map((disk) => (
                  <div
                    key={disk}
                    className="pop-in mono flex h-6 items-center justify-center rounded text-xs font-bold text-black"
                    style={{ width: 30 + disk * 14, background: DISK_COLORS[(disk - 1) % DISK_COLORS.length] }}
                  >
                    {disk}
                  </div>
                ))}
              </div>
            </div>
            <span className="mono mt-2 text-xs text-muted">Peg {peg}</span>
          </div>
        ))}
      </div>

      <div className="mono mt-4 flex flex-wrap gap-2">
        {moves.map((m, i) => (
          <button
            key={i}
            onClick={() => setStep(i + 1)}
            className={`rounded-md border px-2 py-1 text-[10px] ${
              i + 1 === step
                ? 'border-recursion bg-recursion/10 text-recursion'
                : i + 1 < step
                ? 'border-line2 text-dim'
                : 'border-line text-muted'
            }`}
          >
            {i + 1}: D{m.disk} {m.from}→{m.to}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <InfoBox title="Tower of Hanoi">
          Move n disks from A to C using B as auxiliary. Rule: never place a larger disk on a smaller one.
          Solved recursively: move n−1 disks to B, move disk n to C, move n−1 disks from B to C. Always
          requires 2ⁿ−1 moves.
        </InfoBox>
      </div>
    </div>
  )
}

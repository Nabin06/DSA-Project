import React, { useState } from 'react'
import { TextField, SolidButton, TokenChip } from '../shared/Bits.jsx'
import StackBox from '../shared/StackBox.jsx'
import StepPanel from '../shared/StepPanel.jsx'
import { checkParens, tokenize } from '../../lib/stackAlgorithms.js'

export default function ParensView() {
  const [expr, setExpr] = useState('(A+[B*{C}])')
  const [run, setRun] = useState(null)
  const [idx, setIdx] = useState(0)

  const handleRun = () => {
    const result = checkParens(expr)
    setRun(result)
    setIdx(0)
  }

  const current = run?.steps[idx]
  const tokens = tokenize(expr)

  return (
    <div>
      <div className="flex gap-3">
        <TextField value={expr} onChange={setExpr} onEnter={handleRun} className="border-line" />
        <SolidButton color="stack" onClick={handleRun}>
          Check
        </SolidButton>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
        <div className="space-y-4">
          <div>
            <div className="mono mb-2 text-xxs text-muted">EXPRESSION</div>
            <div className="flex flex-wrap gap-1.5">
              {tokens.map((t, i) => (
                <TokenChip key={i} color="stack">
                  {t}
                </TokenChip>
              ))}
            </div>
          </div>
          <StackBox items={current?.stack ?? []} color="stack" />
        </div>

        <div>
          <StepPanel steps={run?.steps} index={idx} onIndexChange={setIdx} color="stack" />

          {run && idx === run.steps.length - 1 && (
            <div
              className={`mt-4 rounded-xl border p-4 text-center ${
                run.valid ? 'border-queue/30 bg-queue/[0.06]' : 'border-danger/30 bg-danger/[0.06]'
              }`}
            >
              <div className="mono text-xxs text-muted">RESULT</div>
              <div className={`mono mt-1 text-lg font-bold ${run.valid ? 'text-queue' : 'text-danger'}`}>
                {run.valid ? 'Balanced ✓' : 'Not Balanced ✗'}
              </div>
              {!run.valid && <div className="mono mt-1 text-xxs text-muted">{run.failReason}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

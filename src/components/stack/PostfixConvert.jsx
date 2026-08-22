import React, { useState } from 'react'
import { TextField, SolidButton, TokenChip } from '../shared/Bits.jsx'
import StackBox from '../shared/StackBox.jsx'
import StepPanel from '../shared/StepPanel.jsx'
import { infixToPostfix, tokenize } from '../../lib/stackAlgorithms.js'

export default function PostfixConvert() {
  const [expr, setExpr] = useState('(A+B)*C-D')
  const [run, setRun] = useState(null)
  const [idx, setIdx] = useState(0)

  const handleRun = () => {
    const result = infixToPostfix(expr)
    setRun(result)
    setIdx(0)
  }

  const tokens = tokenize(expr)
  const current = run?.steps[idx]

  return (
    <div>
      <div className="flex gap-3">
        <TextField value={expr} onChange={setExpr} onEnter={handleRun} className="border-line" />
        <SolidButton color="stack" onClick={handleRun}>
          Run
        </SolidButton>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
        <div className="space-y-4">
          <div>
            <div className="mono mb-2 text-xxs text-muted">INFIX EXPRESSION</div>
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
            <div className="mt-4 rounded-xl border border-stack/30 bg-stack/[0.06] p-4 text-center">
              <div className="mono text-xxs text-muted">POSTFIX RESULT</div>
              <div className="mono mt-1 text-lg font-bold text-stack">{run.result}</div>
            </div>
          )}

          {current && (
            <div className="mt-4">
              <div className="mono mb-2 text-xxs text-muted">OUTPUT</div>
              <div className="flex flex-wrap gap-1.5">
                {current.output.map((t, i) => (
                  <TokenChip key={i} active color="stack">
                    {t}
                  </TokenChip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

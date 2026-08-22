import React, { useState } from 'react'
import { TextField, SolidButton, TokenChip } from '../shared/Bits.jsx'
import StackBox from '../shared/StackBox.jsx'
import StepPanel from '../shared/StepPanel.jsx'
import { evalInfix, tokenize } from '../../lib/stackAlgorithms.js'

export default function EvalInfixView() {
  const [expr, setExpr] = useState('3+4*2')
  const [run, setRun] = useState(null)
  const [idx, setIdx] = useState(0)

  const handleRun = () => {
    const result = evalInfix(expr)
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
          Evaluate
        </SolidButton>
      </div>
      <div className="mono mt-2 text-xxs text-muted">
        Two-stack algorithm. Try: 3+4*2 or (1+2)*3 or 10-2*5
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
        <div className="space-y-4">
          <div>
            <div className="mono mb-2 text-xxs text-muted">EXPRESSION</div>
            <div className="flex flex-wrap gap-1.5">
              {tokens.map((t, i) => (
                <TokenChip key={i} active={i === (current?.tokIdx ?? -1)} color="stack">
                  {t}
                </TokenChip>
              ))}
            </div>
          </div>
          <StackBox title="OPERAND STACK" items={current?.operands ?? []} color="stack" />
          <StackBox title="OPERATOR STACK" items={current?.operators ?? []} color="stack" />
        </div>

        <div>
          <StepPanel steps={run?.steps} index={idx} onIndexChange={setIdx} color="stack" />

          {run && idx === run.steps.length - 1 && (
            <div className="mt-4 rounded-xl border border-stack/30 bg-stack/[0.06] p-4 text-center">
              <div className="mono text-xxs text-muted">RESULT</div>
              <div className="mono mt-1 text-lg font-bold text-stack">{run.result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

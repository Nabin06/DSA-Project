import React, { useState } from 'react'
import SubTabs from '../shared/SubTabs.jsx'
import StepPanel, { RunButton } from '../shared/StepPanel.jsx'
import { TextField, GhostButton, InfoBox } from '../shared/Bits.jsx'
import { SEARCH_INFO } from '../../lib/searchAlgorithms.js'

const VARIANTS = [
  { id: 'linear', label: 'Linear' },
  { id: 'binary', label: 'Binary · O(log n)' },
]

function randomArray(n = 9) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10)
}

export default function SearchingModule() {
  const [variant, setVariant] = useState('linear')
  const [input, setInput] = useState('11, 22, 25, 12, 64, 90, 45, 33')
  const [target, setTarget] = useState('64')
  const [steps, setSteps] = useState([])
  const [idx, setIdx] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const parseInput = () => {
    const arr = input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map(Number)
    if (arr.some((n) => Number.isNaN(n))) {
      setError('Enter valid comma-separated numbers')
      return null
    }
    if (arr.length < 1) {
      setError('Enter at least 1 number')
      return null
    }
    const t = Number(target)
    if (Number.isNaN(t)) {
      setError('Enter a valid target number')
      return null
    }
    setError('')
    return { arr, t }
  }

  const run = () => {
    const parsed = parseInput()
    if (!parsed) return
    const { arr, t } = parsed
    const { steps, result } = SEARCH_INFO[variant].fn(arr, t)
    setSteps(steps)
    setIdx(0)
    setResult(result)
  }

  const shuffle = () => {
    const arr = randomArray()
    setInput(arr.join(', '))
    setTarget(String(arr[Math.floor(Math.random() * arr.length)]))
    setError('')
    setSteps([])
    setIdx(0)
    setResult(null)
  }

  const changeVariant = (v) => {
    setVariant(v)
    setSteps([])
    setIdx(0)
    setResult(null)
  }

  const current = steps[idx]
  const array = current?.array ?? (parseInputSafeArr(input) || [])
  const compare = current?.compare ?? []
  const range = current?.range ?? null
  const found = current?.found

  return (
    <div>
      <SubTabs tabs={VARIANTS} active={variant} onChange={changeVariant} color="searching" />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mono overflow-x-auto rounded-xl border border-line bg-panel2/30 p-6">
            {array.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted">Enter numbers and press Run</div>
            ) : (
              <div className="flex w-max items-center gap-2">
                {array.map((v, i) => {
                  const isCompare = compare.includes(i)
                  const inRange = range ? i >= range[0] && i <= range[1] : true
                  const isFoundHere = found && isCompare
                  let boxColor = 'border-line2 bg-panel2/60 text-white'
                  if (isFoundHere) boxColor = 'border-sorting bg-sorting/20 text-sorting'
                  else if (isCompare) boxColor = 'border-searching bg-searching/20 text-searching'
                  else if (!inRange) boxColor = 'border-line bg-panel2/20 text-muted opacity-40'

                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className={`flex h-11 w-12 items-center justify-center rounded-md border text-sm font-semibold transition-colors ${boxColor}`}
                      >
                        {v}
                      </div>
                      <span className="text-[9px] text-muted">[{i}]</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {result !== null && steps.length > 0 && idx === steps.length - 1 && (
            <div
              className={`mono mt-3 rounded-lg border px-3 py-2 text-xxs ${
                result === -1
                  ? 'border-danger/40 bg-danger/[0.08] text-danger'
                  : 'border-sorting/40 bg-sorting/[0.08] text-sorting'
              }`}
            >
              {result === -1 ? 'Target not found in array' : `Target found at index ${result}`}
            </div>
          )}

          <div className="mt-5 rounded-xl border border-line bg-panel2/30 p-4">
            <div className="mono mb-2 text-xxs font-semibold text-searching">INPUT ARRAY</div>
            <TextField value={input} onChange={setInput} placeholder="e.g. 11, 22, 25, 12, 64" className="border-line" />
            <div className="mono mt-3 mb-1 text-xxs text-muted">Target value:</div>
            <TextField value={target} onChange={setTarget} placeholder="Value to find..." className="border-line" />
            {error && <div className="mono mt-2 text-xxs text-danger">{error}</div>}
            <div className="mt-3 flex gap-3">
              <RunButton onClick={run} label="Run Search" color="searching" />
              <GhostButton onClick={shuffle}>🎲 Random</GhostButton>
            </div>
          </div>

          <div className="mt-4">
            <InfoBox title={SEARCH_INFO[variant].name}>
              <span className="text-searching">{SEARCH_INFO[variant].complexity}</span>
            </InfoBox>
          </div>
        </div>

        <div>
          <div className="mono mb-2 text-xxs font-semibold text-searching">STEP TRACE</div>
          <StepPanel steps={steps} index={idx} onIndexChange={setIdx} color="searching" />
        </div>
      </div>
    </div>
  )
}

function parseInputSafeArr(input) {
  const arr = input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map(Number)
  if (arr.some((n) => Number.isNaN(n))) return null
  return arr
}

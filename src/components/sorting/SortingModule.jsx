import React, { useState } from 'react'
import SubTabs from '../shared/SubTabs.jsx'
import StepPanel, { RunButton } from '../shared/StepPanel.jsx'
import { TextField, GhostButton, InfoBox } from '../shared/Bits.jsx'
import { SORT_INFO } from '../../lib/sortAlgorithms.js'

const VARIANTS = [
  { id: 'bubble', label: 'Bubble' },
  { id: 'selection', label: 'Selection' },
  { id: 'insertion', label: 'Insertion' },
  { id: 'merge', label: 'Merge' },
  { id: 'quick', label: 'Quick' },
]

function randomArray(n = 8) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10)
}

export default function SortingModule() {
  const [variant, setVariant] = useState('bubble')
  const [input, setInput] = useState('64, 25, 12, 22, 11, 90, 45')
  const [steps, setSteps] = useState([])
  const [idx, setIdx] = useState(0)
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
    if (arr.length < 2) {
      setError('Enter at least 2 numbers')
      return null
    }
    setError('')
    return arr
  }

  const run = () => {
    const arr = parseInput()
    if (!arr) return
    const { steps } = SORT_INFO[variant].fn(arr)
    setSteps(steps)
    setIdx(0)
  }

  const shuffle = () => {
    const arr = randomArray()
    setInput(arr.join(', '))
    setError('')
    setSteps([])
    setIdx(0)
  }

  const changeVariant = (v) => {
    setVariant(v)
    setSteps([])
    setIdx(0)
  }

  const current = steps[idx]
  const array = current?.array ?? (parseInputSafe(input) || [])
  const compare = current?.compare ?? []
  const swap = current?.swap ?? []
  const range = current?.range ?? null
  const sortedIdx = current?.sortedIdx ?? []
  const maxVal = Math.max(...array, 1)

  return (
    <div>
      <SubTabs tabs={VARIANTS} active={variant} onChange={changeVariant} color="sorting" />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="rounded-xl border border-line bg-panel2/30 p-6">
            {array.length === 0 ? (
              <div className="mono py-8 text-center text-xs text-muted">Enter numbers and press Run</div>
            ) : (
              <div className="flex h-[220px] items-end justify-center gap-2">
                {array.map((v, i) => {
                  const isCompare = compare.includes(i)
                  const isSwap = swap.includes(i)
                  const isSorted = sortedIdx.includes(i)
                  const inRange = range ? i >= range[0] && i <= range[1] : true
                  let barColor = 'bg-panel2 border border-line2'
                  if (isSorted) barColor = 'bg-sorting/70 border border-sorting'
                  else if (isSwap) barColor = 'bg-danger/70 border border-danger'
                  else if (isCompare) barColor = 'bg-searching/70 border border-searching'
                  else if (!inRange) barColor = 'bg-panel2/40 border border-line opacity-40'

                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="mono text-xxs text-dim">{v}</span>
                      <div
                        className={`mono w-9 rounded-t-md transition-all duration-200 ${barColor}`}
                        style={{ height: `${(v / maxVal) * 160 + 8}px` }}
                      />
                      <span className="mono text-[9px] text-muted">[{i}]</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-5 rounded-xl border border-line bg-panel2/30 p-4">
            <div className="mono mb-2 text-xxs font-semibold text-sorting">INPUT ARRAY</div>
            <TextField value={input} onChange={setInput} placeholder="e.g. 64, 25, 12, 22, 11" className="border-line" />
            {error && <div className="mono mt-2 text-xxs text-danger">{error}</div>}
            <div className="mt-3 flex gap-3">
              <RunButton onClick={run} label="Run Sort" color="sorting" />
              <GhostButton onClick={shuffle}>🎲 Random</GhostButton>
            </div>
          </div>

          <div className="mt-4">
            <InfoBox title={SORT_INFO[variant].name}>
              <span className="text-sorting">{SORT_INFO[variant].complexity}</span>
            </InfoBox>
          </div>
        </div>

        <div>
          <div className="mono mb-2 text-xxs font-semibold text-sorting">STEP TRACE</div>
          <StepPanel steps={steps} index={idx} onIndexChange={setIdx} color="sorting" />
        </div>
      </div>
    </div>
  )
}

function parseInputSafe(input) {
  const arr = input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map(Number)
  if (arr.some((n) => Number.isNaN(n))) return null
  return arr
}

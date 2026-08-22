import React, { useMemo, useRef, useState } from 'react'
import SubTabs from '../shared/SubTabs.jsx'
import { TextField, GhostButton, SolidButton, DangerButton, InfoBox } from '../shared/Bits.jsx'

const VARIANTS = [
  { id: 'singly', label: 'Singly' },
  { id: 'doubly', label: 'Doubly' },
  { id: 'circular', label: 'Circular' },
]

const VARIANT_INFO = {
  singly: 'Singly linked — each node holds [data | next→]. Insert at head O(1), tail/search O(n).',
  doubly: 'Doubly linked — [←prev | data | next→]. Bidirectional traversal; O(1) delete given a node reference.',
  circular: "Circular — tail's next points back to head. No NULL sentinel. Used in round-robin scheduling.",
}

function addressFor(id) {
  return '0x' + (0xa0 + id).toString(16).toUpperCase()
}

export default function LinkedListModule() {
  const [variant, setVariant] = useState('singly')
  const idCounter = useRef(5)
  const [nodes, setNodes] = useState([
    { id: 1, data: '10' },
    { id: 2, data: '20' },
    { id: 3, data: '30' },
    { id: 4, data: '40' },
  ])

  const [insertVal, setInsertVal] = useState('')
  const [insertRef, setInsertRef] = useState('')
  const [insertIdx, setInsertIdx] = useState('')
  const [deleteRef, setDeleteRef] = useState('')
  const [deleteIdx, setDeleteIdx] = useState('')
  const [msg, setMsg] = useState('')

  const nextId = () => ++idCounter.current

  const findIndexByValue = (val) => nodes.findIndex((n) => n.data === val)

  // ---- insert operations ----
  const insertAtHead = () => {
    if (!insertVal.trim()) return
    setNodes((s) => [{ id: nextId(), data: insertVal.trim() }, ...s])
    setMsg(`Inserted "${insertVal.trim()}" at head`)
    setInsertVal('')
  }
  const insertAtTail = () => {
    if (!insertVal.trim()) return
    setNodes((s) => [...s, { id: nextId(), data: insertVal.trim() }])
    setMsg(`Inserted "${insertVal.trim()}" at tail`)
    setInsertVal('')
  }
  const insertBefore = () => {
    if (!insertVal.trim() || !insertRef.trim()) return
    const i = findIndexByValue(insertRef.trim())
    if (i === -1) return setMsg(`No node with value "${insertRef}" found`)
    setNodes((s) => [...s.slice(0, i), { id: nextId(), data: insertVal.trim() }, ...s.slice(i)])
    setMsg(`Inserted "${insertVal.trim()}" before "${insertRef.trim()}"`)
    setInsertVal('')
  }
  const insertAfter = () => {
    if (!insertVal.trim() || !insertRef.trim()) return
    const i = findIndexByValue(insertRef.trim())
    if (i === -1) return setMsg(`No node with value "${insertRef}" found`)
    setNodes((s) => [...s.slice(0, i + 1), { id: nextId(), data: insertVal.trim() }, ...s.slice(i + 1)])
    setMsg(`Inserted "${insertVal.trim()}" after "${insertRef.trim()}"`)
    setInsertVal('')
  }
  const insertAtIndex = () => {
    const idx = Number(insertIdx)
    if (!insertVal.trim() || Number.isNaN(idx) || idx < 0 || idx > nodes.length) return
    setNodes((s) => [...s.slice(0, idx), { id: nextId(), data: insertVal.trim() }, ...s.slice(idx)])
    setMsg(`Inserted "${insertVal.trim()}" at index ${idx}`)
    setInsertVal('')
    setInsertIdx('')
  }

  // ---- delete operations ----
  const deleteHead = () => {
    if (nodes.length === 0) return
    setMsg(`Deleted head "${nodes[0].data}"`)
    setNodes((s) => s.slice(1))
  }
  const deleteTail = () => {
    if (nodes.length === 0) return
    setMsg(`Deleted tail "${nodes[nodes.length - 1].data}"`)
    setNodes((s) => s.slice(0, -1))
  }
  const deleteBefore = () => {
    const i = findIndexByValue(deleteRef.trim())
    if (i <= 0) return setMsg(`No node before "${deleteRef}"`)
    setMsg(`Deleted "${nodes[i - 1].data}" (before "${deleteRef}")`)
    setNodes((s) => [...s.slice(0, i - 1), ...s.slice(i)])
  }
  const deleteAfter = () => {
    const i = findIndexByValue(deleteRef.trim())
    if (i === -1 || i >= nodes.length - 1) return setMsg(`No node after "${deleteRef}"`)
    setMsg(`Deleted "${nodes[i + 1].data}" (after "${deleteRef}")`)
    setNodes((s) => [...s.slice(0, i + 1), ...s.slice(i + 2)])
  }
  const deleteAtIndex = () => {
    const idx = Number(deleteIdx)
    if (Number.isNaN(idx) || idx < 0 || idx >= nodes.length) return
    setMsg(`Deleted "${nodes[idx].data}" at index ${idx}`)
    setNodes((s) => s.filter((_, i) => i !== idx))
    setDeleteIdx('')
  }
  const reverse = () => {
    setNodes((s) => [...s].reverse())
    setMsg('List reversed')
  }
  const clear = () => {
    setNodes([])
    setMsg('Cleared')
  }

  const addresses = useMemo(() => nodes.map((n) => addressFor(n.id)), [nodes])

  return (
    <div>
      <SubTabs tabs={VARIANTS} active={variant} onChange={setVariant} color="linkedlist" />

      <div className="mt-5 overflow-x-auto rounded-xl border border-line bg-panel2/30 p-6">
        {nodes.length === 0 ? (
          <div className="mono py-8 text-center text-xs text-muted">List is empty</div>
        ) : (
          <div className="flex w-max items-center">
            <div className="mr-4 flex flex-col items-center">
              <span className="mono text-xxs text-muted">HEAD</span>
              <span className="mono text-linkedlist">→</span>
            </div>
            {nodes.map((n, i) => (
              <React.Fragment key={n.id}>
                <NodeCard
                  address={addresses[i]}
                  data={n.data}
                  next={
                    i < nodes.length - 1
                      ? addresses[i + 1]
                      : variant === 'circular'
                      ? addresses[0]
                      : 'NULL'
                  }
                  prev={variant === 'doubly' ? (i > 0 ? addresses[i - 1] : 'NULL') : null}
                  index={i}
                />
                {i < nodes.length - 1 && <Arrow variant={variant} />}
                {i === nodes.length - 1 && variant === 'circular' && (
                  <span className="mono ml-3 shrink-0 text-xxs text-linkedlist">↩ wraps to HEAD</span>
                )}
                {i === nodes.length - 1 && variant !== 'circular' && (
                  <span className="mono ml-3 shrink-0 rounded-md border border-line px-3 py-1 text-xxs text-muted">
                    NULL
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="mono mt-2 text-xxs text-muted">
        length: {nodes.length} &nbsp;&nbsp; head = {nodes[0] ? addresses[0] : '—'} &nbsp;&nbsp; tail ={' '}
        {nodes.length ? addresses[nodes.length - 1] : '—'}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* INSERT */}
        <div className="rounded-xl border border-line bg-panel2/30 p-4">
          <div className="mono mb-3 text-xxs font-semibold text-linkedlist">INSERT</div>
          <TextField value={insertVal} onChange={setInsertVal} placeholder="New node value..." className="border-line" />

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SolidButton color="linkedlist" onClick={insertAtHead}>
              At Head
            </SolidButton>
            <SolidButton color="linkedlist" onClick={insertAtTail}>
              At Tail
            </SolidButton>
          </div>

          <div className="mono mt-4 mb-1 text-xxs text-muted">Relative to node with value:</div>
          <TextField value={insertRef} onChange={setInsertRef} placeholder="Reference node value..." className="border-line" />
          <div className="mt-2 grid grid-cols-2 gap-3">
            <GhostButton onClick={insertBefore}>↑ Before</GhostButton>
            <GhostButton onClick={insertAfter}>↓ After</GhostButton>
          </div>

          <div className="mono mt-4 mb-1 text-xxs text-muted">At specific index:</div>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <input
              type="number"
              value={insertIdx}
              onChange={(e) => setInsertIdx(e.target.value)}
              placeholder="Index..."
              className="w-full rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <SolidButton color="linkedlist" onClick={insertAtIndex} className="mt-2 w-full">
            Insert at [i]
          </SolidButton>
        </div>

        {/* DELETE */}
        <div className="rounded-xl border border-line bg-panel2/30 p-4">
          <div className="mono mb-3 text-xxs font-semibold text-danger">DELETE</div>
          <div className="grid grid-cols-2 gap-3">
            <DangerButton onClick={deleteHead}>Head</DangerButton>
            <DangerButton onClick={deleteTail}>Tail</DangerButton>
          </div>

          <div className="mono mt-4 mb-1 text-xxs text-muted">Relative to node with value:</div>
          <TextField value={deleteRef} onChange={setDeleteRef} placeholder="Reference node value..." className="border-line" />
          <div className="mt-2 grid grid-cols-2 gap-3">
            <DangerButton onClick={deleteBefore}>Delete Before</DangerButton>
            <DangerButton onClick={deleteAfter}>Delete After</DangerButton>
          </div>

          <div className="mono mt-4 mb-1 text-xxs text-muted">At specific index:</div>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <input
              type="number"
              value={deleteIdx}
              onChange={(e) => setDeleteIdx(e.target.value)}
              placeholder="Index..."
              className="w-full rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <DangerButton onClick={deleteAtIndex} className="mt-2 w-full">
            Delete at [i]
          </DangerButton>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <GhostButton onClick={reverse}>↺ Reverse</GhostButton>
            <GhostButton onClick={clear}>Clear</GhostButton>
          </div>
        </div>
      </div>

      {msg && <div className="mono mt-4 rounded-lg border border-linkedlist/30 bg-linkedlist/[0.06] px-3 py-2 text-xxs text-linkedlist">{msg}</div>}

      <div className="mt-4">
        <InfoBox title={null}>
          <span className="text-linkedlist">{VARIANT_INFO[variant]}</span>
        </InfoBox>
      </div>
    </div>
  )
}

function NodeCard({ address, data, next, prev, index }) {
  return (
    <div className="mono relative flex shrink-0 flex-col rounded-lg border border-linkedlist/40 bg-linkedlist/[0.05]">
      <div className="border-b border-linkedlist/20 px-3 py-1 text-center text-[10px] text-muted">{address}</div>
      <div className="flex divide-x divide-linkedlist/20">
        {prev !== null && (
          <div className="flex flex-col items-center px-3 py-2">
            <span className="text-[9px] text-muted">PREV</span>
            <span className="text-[10px] text-dim">{prev}</span>
          </div>
        )}
        <div className="flex flex-col items-center px-4 py-2">
          <span className="text-[9px] text-muted">DATA</span>
          <span className="text-lg font-bold text-white">{data}</span>
        </div>
        <div className="flex flex-col items-center px-3 py-2">
          <span className="text-[9px] text-muted">NEXT</span>
          <span className="text-[10px] text-dim">{next}</span>
        </div>
      </div>
      <div className="border-t border-linkedlist/20 py-0.5 text-center text-[9px] text-muted">[{index}]</div>
    </div>
  )
}

function Arrow({ variant }) {
  return (
    <div className="mono mx-2 flex shrink-0 flex-col items-center text-linkedlist">
      <span>→</span>
      {variant === 'doubly' && <span>←</span>}
    </div>
  )
}

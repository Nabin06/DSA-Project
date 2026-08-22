import React, { useState } from 'react'
import ModuleNav from './components/shared/ModuleNav.jsx'
import StackModule from './components/stack/StackModule.jsx'
import QueueModule from './components/queue/QueueModule.jsx'
import LinkedListModule from './components/linkedlist/LinkedListModule.jsx'
import RecursionModule from './components/recursion/RecursionModule.jsx'
import SortingModule from './components/sorting/SortingModule.jsx'
import SearchingModule from './components/searching/SearchingModule.jsx'

const MODULES = [
  {
    id: 'stack',
    title: 'Stack',
    sub: 'Ops · Postfix · Prefix · Eval · Parens',
    section: 'S2',
    color: 'stack',
    Component: StackModule,
  },
  {
    id: 'queue',
    title: 'Queue',
    sub: 'Linear · Circular · Deque · Priority',
    section: 'S3',
    color: 'queue',
    Component: QueueModule,
  },
  {
    id: 'linkedlist',
    title: 'Linked List',
    sub: 'Singly · Doubly · Circular',
    section: 'S4',
    color: 'linkedlist',
    Component: LinkedListModule,
  },
  {
    id: 'recursion',
    title: 'Recursion',
    sub: 'Fibonacci · Factorial · Tower of Hanoi',
    section: 'S5',
    color: 'recursion',
    Component: RecursionModule,
  },
  {
    id: 'sorting',
    title: 'Sorting',
    sub: 'Bubble · Selection · Insertion · Merge · Quick',
    section: 'S6',
    color: 'sorting',
    Component: SortingModule,
  },
  {
    id: 'searching',
    title: 'Searching',
    sub: 'Linear · Binary O(log n)',
    section: 'S7',
    color: 'searching',
    Component: SearchingModule,
  },
]

export default function App() {
  const [activeId, setActiveId] = useState('stack')
  const active = MODULES.find((m) => m.id === activeId)
  const Active = active.Component

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <div className="mono text-xxs tracking-[0.18em] text-muted">
              ENCT 252 &nbsp;·&nbsp; DATA STRUCTURES &amp; ALGORITHMS
            </div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
              DSA Visualizer
            </h1>
          </div>
          <div className="mono text-xxs tracking-wide text-muted">Interactive Learning Tool</div>
        </header>

        <ModuleNav modules={MODULES} activeId={activeId} onSelect={setActiveId} />

        <section className="mt-6 rounded-2xl border border-line bg-panel/60">
          <div
            className="flex items-center justify-between border-b border-line px-6 py-4"
          >
            <div className="flex items-center gap-2">
              <ColorDot color={active.color} />
              <h2 className="text-sm font-semibold text-white">{active.title}</h2>
            </div>
            <div className="mono text-xxs text-muted">
              {active.section} &nbsp;·&nbsp; ENCT 252
            </div>
          </div>

          <div className="p-6">
            <Active />
          </div>
        </section>
      </div>
    </div>
  )
}

function ColorDot({ color }) {
  const map = {
    stack: 'bg-stack',
    queue: 'bg-queue',
    linkedlist: 'bg-linkedlist',
    recursion: 'bg-recursion',
    sorting: 'bg-sorting',
    searching: 'bg-searching',
  }
  return <span className={`h-2 w-2 rounded-full ${map[color]}`} />
}

import React, { useState } from 'react'
import SubTabs from '../shared/SubTabs.jsx'
import LinearQueue from './LinearQueue.jsx'
import CircularQueue from './CircularQueue.jsx'
import DequeQueue from './DequeQueue.jsx'
import PriorityQueue from './PriorityQueue.jsx'

const TABS = [
  { id: 'linear', label: 'Linear' },
  { id: 'circular', label: 'Circular' },
  { id: 'deque', label: 'Deque' },
  { id: 'priority', label: 'Priority' },
]

export default function QueueModule() {
  const [tab, setTab] = useState('linear')

  return (
    <div>
      <SubTabs tabs={TABS} active={tab} onChange={setTab} color="queue" />
      <div className="mt-5">
        {tab === 'linear' && <LinearQueue />}
        {tab === 'circular' && <CircularQueue />}
        {tab === 'deque' && <DequeQueue />}
        {tab === 'priority' && <PriorityQueue />}
      </div>
    </div>
  )
}

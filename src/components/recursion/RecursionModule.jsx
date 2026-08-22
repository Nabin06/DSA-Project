import React, { useState } from 'react'
import SubTabs from '../shared/SubTabs.jsx'
import FibonacciView from './FibonacciView.jsx'
import TowerOfHanoiView from './TowerOfHanoiView.jsx'

const TABS = [
  { id: 'fib', label: 'Fibonacci' },
  { id: 'hanoi', label: 'Tower of Hanoi' },
]

export default function RecursionModule() {
  const [tab, setTab] = useState('fib')
  return (
    <div>
      <SubTabs tabs={TABS} active={tab} onChange={setTab} color="recursion" />
      <div className="mt-5">
        {tab === 'fib' && <FibonacciView />}
        {tab === 'hanoi' && <TowerOfHanoiView />}
      </div>
    </div>
  )
}

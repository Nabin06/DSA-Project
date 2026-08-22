import React, { useState } from 'react'
import SubTabs from '../shared/SubTabs.jsx'
import StackOperations from './StackOperations.jsx'
import PostfixConvert from './PostfixConvert.jsx'
import PrefixConvert from './PrefixConvert.jsx'
import EvalPostfixView from './EvalPostfixView.jsx'
import EvalInfixView from './EvalInfixView.jsx'
import ParensView from './ParensView.jsx'

const TABS = [
  { id: 'ops', label: 'Operations' },
  { id: 'postfix', label: '→ Postfix' },
  { id: 'prefix', label: '→ Prefix' },
  { id: 'evalPostfix', label: 'Eval Postfix' },
  { id: 'evalInfix', label: 'Eval Infix' },
  { id: 'parens', label: 'Parens' },
]

export default function StackModule() {
  const [tab, setTab] = useState('ops')

  return (
    <div>
      <SubTabs tabs={TABS} active={tab} onChange={setTab} color="stack" />
      <div className="mt-5">
        {tab === 'ops' && <StackOperations />}
        {tab === 'postfix' && <PostfixConvert />}
        {tab === 'prefix' && <PrefixConvert />}
        {tab === 'evalPostfix' && <EvalPostfixView />}
        {tab === 'evalInfix' && <EvalInfixView />}
        {tab === 'parens' && <ParensView />}
      </div>
    </div>
  )
}

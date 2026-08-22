import React from 'react'

export function InfoBox({ title, children, badges = [] }) {
  return (
    <div className="rounded-xl border border-line bg-panel2/40 p-4">
      {title && <div className="text-xs font-semibold text-white">{title}</div>}
      <div className="mt-1 text-xxs leading-relaxed text-dim">{children}</div>
      {badges.length > 0 && (
        <div className="mono mt-3 flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-md border border-line bg-panel px-2 py-0.5 text-xxs text-muted"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function TextField({ value, onChange, placeholder, className = '', onEnter }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
      className={`w-full rounded-lg px-3 py-2 text-sm ${className}`}
    />
  )
}

export function TokenChip({ children, active, color = 'stack' }) {
  const ACTIVE = {
    stack: 'border-stack text-stack bg-stack/10',
    queue: 'border-queue text-queue bg-queue/10',
    linkedlist: 'border-linkedlist text-linkedlist bg-linkedlist/10',
    recursion: 'border-recursion text-recursion bg-recursion/10',
    sorting: 'border-sorting text-sorting bg-sorting/10',
    searching: 'border-searching text-searching bg-searching/10',
  }
  return (
    <span
      className={`mono inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md border px-2 text-xs ${
        active ? ACTIVE[color] : 'border-line text-dim'
      }`}
    >
      {children}
    </span>
  )
}

export function Slot({ children, empty, active, color = 'stack', small }) {
  const ACTIVE = {
    stack: 'border-stack text-stack bg-stack/10',
    queue: 'border-queue text-queue bg-queue/10',
    linkedlist: 'border-linkedlist text-linkedlist bg-linkedlist/10',
    recursion: 'border-recursion text-recursion bg-recursion/10',
    sorting: 'border-sorting text-sorting bg-sorting/10',
    searching: 'border-searching text-searching bg-searching/10',
  }
  return (
    <div
      className={`mono pop-in flex items-center justify-center rounded-md border font-semibold ${
        small ? 'h-9 w-14 text-xs' : 'h-11 w-16 text-sm'
      } ${empty ? 'border-line2 bg-panel2/40 text-transparent' : active ? ACTIVE[color] : 'border-line2 bg-panel2/60 text-white'}`}
    >
      {children}
    </div>
  )
}

export function GhostButton({ children, onClick, disabled, active, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-30 ${
        active
          ? 'border-white/30 text-white'
          : 'border-line text-dim hover:border-line2 hover:text-white'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export function SolidButton({ children, onClick, disabled, color = 'stack', className = '' }) {
  const MAP = {
    stack: 'bg-stack',
    queue: 'bg-queue',
    linkedlist: 'bg-linkedlist',
    recursion: 'bg-recursion',
    sorting: 'bg-sorting',
    searching: 'bg-searching',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm font-semibold text-black disabled:opacity-40 ${MAP[color]} ${className}`}
    >
      {children}
    </button>
  )
}

export function DangerButton({ children, onClick, disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border border-danger/40 px-4 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10 disabled:opacity-30 ${className}`}
    >
      {children}
    </button>
  )
}

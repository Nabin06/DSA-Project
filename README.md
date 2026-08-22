# DSA Visualizer

A React + Vite + Tailwind recreation of the "DSA Visualizer" tool — interactive,
step-through visualizations for Stacks, Queues, Linked Lists, and Recursion.

## Modules

- **Stack** — manual Push/Pop/Peek/Clear, Infix→Postfix, Infix→Prefix,
  Evaluate Postfix, Evaluate Infix (two-stack algorithm), and a balanced
  parentheses checker. Every algorithm runs as a step-by-step trace you can
  scrub through with Prev/Next.
- **Queue** — Linear (fixed array, FIFO), Circular (ring buffer), Deque
  (double-ended), and Priority Queue.
- **Linked List** — Singly, Doubly, and Circular variants with full
  insert (head/tail/before/after/index) and delete (head/tail/before/after/
  index/reverse/clear) operations, rendered as address-linked node cards.
- **Recursion** — a live Fibonacci call-tree with call-stack panel, and a
  Tower of Hanoi solver with peg animation and full move history.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx                     # shell: header + module nav + active module
  index.css                   # Tailwind entry + base styles
  components/
    shared/                   # ModuleNav, SubTabs, StepPanel, StackBox, Bits (buttons/fields)
    stack/                    # StackModule + 6 sub-tools
    queue/                    # QueueModule + Linear/Circular/Deque/Priority
    linkedlist/                # LinkedListModule (Singly/Doubly/Circular)
    recursion/                # RecursionModule + Fibonacci/TowerOfHanoi
  lib/
    stackAlgorithms.js        # infix<->postfix/prefix, eval, parens — all step-traced
    fibTree.js                # recursion tree builder + call/return event trace
    hanoi.js                  # move generator + peg-state simulator
```

## Customizing the theme

Colors live in `tailwind.config.js` under `theme.extend.colors` — each module
(`stack`, `queue`, `linkedlist`, `recursion`) has its own accent color used
consistently across buttons, borders, and highlights for that section.

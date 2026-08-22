// Builds the full binary recursion tree for fib(n) and a linear trace of
// call/return events in real recursive execution order.

export function buildFibTrace(n) {
  let idCounter = 0

  function build(val, depth, parentId) {
    const id = idCounter++
    const node = { id, n: val, depth, parentId, children: [] }
    if (val > 1) {
      node.children.push(build(val - 1, depth + 1, id))
      node.children.push(build(val - 2, depth + 1, id))
    }
    return node
  }

  const root = build(n, 0, null)

  const events = []
  const stack = []

  function simulate(node) {
    stack.push(node.id)
    events.push({
      type: 'call',
      nodeId: node.id,
      n: node.n,
      stack: [...stack],
      label: `Call fib(${node.n})`,
    })

    let value
    if (node.n <= 1) {
      value = node.n
    } else {
      const left = simulate(node.children[0])
      const right = simulate(node.children[1])
      value = left + right
    }

    events.push({
      type: 'return',
      nodeId: node.id,
      n: node.n,
      stack: [...stack],
      label: `Return fib(${node.n}) = ${value}`,
      value,
    })
    stack.pop()
    return value
  }

  simulate(root)

  // flatten all nodes for lookup
  const nodeMap = {}
  ;(function collect(node) {
    nodeMap[node.id] = node
    node.children.forEach(collect)
  })(root)

  return { root, nodeMap, events, result: events[events.length - 1].value }
}

// Assigns x (0..leafCount-1) / depth coordinates to every node for drawing.
export function layoutTree(root) {
  let counter = 0
  const positions = {}

  function visit(node) {
    if (node.children.length === 0) {
      positions[node.id] = { x: counter, depth: node.depth }
      counter++
    } else {
      node.children.forEach(visit)
      const xs = node.children.map((c) => positions[c.id].x)
      positions[node.id] = { x: (xs[0] + xs[xs.length - 1]) / 2, depth: node.depth }
    }
  }
  visit(root)
  return { positions, leafCount: counter }
}

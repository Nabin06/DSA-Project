export function generateHanoiMoves(n) {
  const moves = []
  function solve(count, from, to, aux) {
    if (count === 0) return
    solve(count - 1, from, aux, to)
    moves.push({ disk: count, from, to })
    solve(count - 1, aux, to, from)
  }
  solve(n, 'A', 'C', 'B')
  return moves
}

// Returns { A: [3,2,1], B: [], C: [] } after applying `movesUpTo` moves (inclusive count).
export function pegsAfter(n, moves, movesUpTo) {
  const pegs = { A: [], B: [], C: [] }
  for (let d = n; d >= 1; d--) pegs.A.push(d)
  for (let i = 0; i < movesUpTo; i++) {
    const { from, to } = moves[i]
    const disk = pegs[from].pop()
    pegs[to].push(disk)
  }
  return pegs
}

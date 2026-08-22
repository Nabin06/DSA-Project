// ---- shared helpers ----------------------------------------------------

const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 }
const isOperator = (c) => c in PRECEDENCE
const isOpenBracket = (c) => c === '(' || c === '[' || c === '{'
const isCloseBracket = (c) => c === ')' || c === ']' || c === '}'
const MATCH = { ')': '(', ']': '[', '}': '{' }

// tokenizer: splits "(A+B)*C-D" into ['(', 'A', '+', 'B', ')', '*', 'C', '-', 'D']
export function tokenize(expr) {
  const tokens = []
  let i = 0
  while (i < expr.length) {
    const c = expr[i]
    if (/\s/.test(c)) {
      i++
      continue
    }
    if (/[A-Za-z0-9]/.test(c)) {
      let j = i
      while (j < expr.length && /[A-Za-z0-9.]/.test(expr[j])) j++
      tokens.push(expr.slice(i, j))
      i = j
    } else {
      tokens.push(c)
      i++
    }
  }
  return tokens
}

// ---- Infix -> Postfix ---------------------------------------------------

export function infixToPostfix(expr) {
  const tokens = tokenize(expr)
  const steps = []
  const stack = []
  const output = []

  const snap = (label) =>
    steps.push({ label, stack: [...stack], output: [...output] })

  for (const tok of tokens) {
    if (isOpenBracket(tok)) {
      stack.push(tok)
      snap(`Push "${tok}"`)
    } else if (isCloseBracket(tok)) {
      const open = MATCH[tok]
      while (stack.length && stack[stack.length - 1] !== open) {
        output.push(stack.pop())
        snap(`Pop "${output[output.length - 1]}" → output`)
      }
      stack.pop()
      snap(`Discard "${open}"`)
    } else if (isOperator(tok)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        PRECEDENCE[stack[stack.length - 1]] >= PRECEDENCE[tok]
      ) {
        output.push(stack.pop())
        snap(`Pop "${output[output.length - 1]}" (higher prec) → output`)
      }
      stack.push(tok)
      snap(`Push operator "${tok}"`)
    } else {
      output.push(tok)
      snap(`Operand "${tok}" → output`)
    }
  }
  while (stack.length) {
    output.push(stack.pop())
    snap(`Pop remaining "${output[output.length - 1]}"`)
  }

  return { steps, result: output.join(' ') }
}

// ---- Infix -> Prefix ------------------------------------------------------
// classic algorithm: reverse expression (swapping brackets), run postfix, reverse result

const SWAP = { '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{' }

export function infixToPrefix(expr) {
  const tokens = tokenize(expr)
  const reversedTokens = [...tokens].reverse().map((t) => SWAP[t] ?? t)
  const reversedExprDisplay = reversedTokens

  const steps = []
  const stack = []
  const output = []

  steps.push({
    label: 'Reverse expression & swap brackets',
    stack: [],
    output: [],
    reversed: reversedTokens,
  })

  for (const tok of reversedTokens) {
    if (isOpenBracket(tok)) {
      stack.push(tok)
      steps.push({ label: `Push "${tok}" to stack`, stack: [...stack], output: [...output], reversed: reversedTokens })
    } else if (isCloseBracket(tok)) {
      const open = MATCH[tok]
      while (stack.length && stack[stack.length - 1] !== open) {
        output.push(stack.pop())
        steps.push({ label: `Pop "${output[output.length - 1]}" → output`, stack: [...stack], output: [...output], reversed: reversedTokens })
      }
      stack.pop()
      steps.push({ label: `Discard "${open}"`, stack: [...stack], output: [...output], reversed: reversedTokens })
    } else if (isOperator(tok)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        PRECEDENCE[stack[stack.length - 1]] > PRECEDENCE[tok] // strictly greater keeps prefix right-assoc friendly
      ) {
        output.push(stack.pop())
        steps.push({ label: `Pop "${output[output.length - 1]}" (higher prec) → output`, stack: [...stack], output: [...output], reversed: reversedTokens })
      }
      stack.push(tok)
      steps.push({ label: `Push operator "${tok}"`, stack: [...stack], output: [...output], reversed: reversedTokens })
    } else {
      output.push(tok)
      steps.push({ label: `Operand "${tok}" → output`, stack: [...stack], output: [...output], reversed: reversedTokens })
    }
  }
  while (stack.length) {
    output.push(stack.pop())
    steps.push({ label: `Pop remaining "${output[output.length - 1]}"`, stack: [...stack], output: [...output], reversed: reversedTokens })
  }

  const prefixResult = [...output].reverse().join(' ')
  steps.push({ label: 'Reverse result → prefix', stack: [], output: [...output], reversed: reversedTokens, finalResult: prefixResult })

  return { steps, result: prefixResult, reversedExprDisplay }
}

// ---- Evaluate Postfix -----------------------------------------------------

export function evalPostfix(exprStr) {
  const tokens = exprStr.trim().split(/\s+/).filter(Boolean)
  const steps = []
  const stack = []

  const apply = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return a / b
      case '^': return Math.pow(a, b)
      default: return NaN
    }
  }

  for (const tok of tokens) {
    if (isOperator(tok)) {
      const b = stack.pop()
      const a = stack.pop()
      const res = apply(a, b, tok)
      stack.push(res)
      steps.push({ label: `Pop ${b}, ${a} → ${a} ${tok} ${b} = ${res}`, stack: [...stack] })
    } else {
      const val = Number(tok)
      stack.push(val)
      steps.push({ label: `Push ${val}`, stack: [...stack] })
    }
  }

  return { steps, result: stack[0], tokens }
}

// ---- Evaluate Infix (two-stack algorithm) ---------------------------------

export function evalInfix(expr) {
  const tokens = tokenize(expr)
  const steps = []
  const operands = []
  const operators = []

  const applyTop = () => {
    const op = operators.pop()
    const b = operands.pop()
    const a = operands.pop()
    let res
    switch (op) {
      case '+': res = a + b; break
      case '-': res = a - b; break
      case '*': res = a * b; break
      case '/': res = a / b; break
      case '^': res = Math.pow(a, b); break
      default: res = NaN
    }
    operands.push(res)
    steps.push({
      label: `Apply "${op}": ${a} ${op} ${b} = ${res}`,
      operands: [...operands],
      operators: [...operators],
    })
  }

  for (const tok of tokens) {
    if (isOpenBracket(tok)) {
      operators.push(tok)
      steps.push({ label: `Push "("`, operands: [...operands], operators: [...operators] })
    } else if (isCloseBracket(tok)) {
      while (operators.length && !isOpenBracket(operators[operators.length - 1])) {
        applyTop()
      }
      operators.pop()
      steps.push({ label: `Discard "("`, operands: [...operands], operators: [...operators] })
    } else if (isOperator(tok)) {
      while (
        operators.length &&
        isOperator(operators[operators.length - 1]) &&
        PRECEDENCE[operators[operators.length - 1]] >= PRECEDENCE[tok]
      ) {
        applyTop()
      }
      operators.push(tok)
      steps.push({ label: `Push operator "${tok}"`, operands: [...operands], operators: [...operators] })
    } else {
      const val = Number(tok)
      operands.push(val)
      steps.push({ label: `Push operand ${val}`, operands: [...operands], operators: [...operators] })
    }
  }
  while (operators.length) {
    const op = operators[operators.length - 1]
    applyTop()
  }
  steps.push({ label: `Apply remaining: result = ${operands[0]}`, operands: [...operands], operators: [...operators] })

  return { steps, result: operands[0], tokens }
}

// ---- Balanced Parens Checker -----------------------------------------------

export function checkParens(expr) {
  const tokens = tokenize(expr)
  const steps = []
  const stack = []
  let valid = true
  let failReason = ''

  for (const tok of tokens) {
    if (isOpenBracket(tok)) {
      stack.push(tok)
      steps.push({ label: `Push "${tok}"`, stack: [...stack] })
    } else if (isCloseBracket(tok)) {
      const open = MATCH[tok]
      const top = stack[stack.length - 1]
      if (top === open) {
        stack.pop()
        steps.push({ label: `Pop "${open}" matches "${tok}"`, stack: [...stack] })
      } else {
        valid = false
        failReason = top
          ? `Mismatch: expected closer for "${top}", got "${tok}"`
          : `Unexpected "${tok}" — stack is empty`
        steps.push({ label: failReason, stack: [...stack] })
        break
      }
    } else {
      steps.push({ label: `Skip "${tok}"`, stack: [...stack] })
    }
  }

  if (valid && stack.length > 0) {
    valid = false
    failReason = `Unclosed "${stack[stack.length - 1]}" left on stack`
    steps.push({ label: failReason, stack: [...stack] })
  }
  if (valid) {
    steps.push({ label: 'Stack empty at end → balanced ✓', stack: [] })
  }

  return { steps, valid, failReason }
}

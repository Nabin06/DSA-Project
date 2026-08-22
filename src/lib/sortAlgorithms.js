// Each function takes an array of numbers and returns { steps, result }
// steps: [{ label, array, compare?: [i,j], swap?: [i,j], sortedIdx?: number[] }]
// `array` is a full snapshot of the array state at that step (for easy rendering).

// ---- Bubble Sort -----------------------------------------------------------

export function bubbleSort(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []
  const sorted = []

  steps.push({ label: 'Initial array', array: [...arr], sortedIdx: [] })

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        label: `Compare arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`,
        array: [...arr],
        compare: [j, j + 1],
        sortedIdx: [...sorted],
      })
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swappedInPass = true
        steps.push({
          label: `Swap → arr[${j}]=${arr[j]}, arr[${j + 1}]=${arr[j + 1]}`,
          array: [...arr],
          swap: [j, j + 1],
          sortedIdx: [...sorted],
        })
      }
    }
    sorted.unshift(n - i - 1)
    steps.push({
      label: `arr[${n - i - 1}]=${arr[n - i - 1]} is in final position`,
      array: [...arr],
      sortedIdx: [...sorted],
    })
    if (!swappedInPass) break
  }
  sorted.push(...Array.from({ length: n }, (_, i) => i).filter((i) => !sorted.includes(i)))
  steps.push({ label: 'Array sorted ✓', array: [...arr], sortedIdx: Array.from({ length: n }, (_, i) => i) })

  return { steps, result: arr }
}

// ---- Selection Sort ---------------------------------------------------------

export function selectionSort(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []
  const sorted = []

  steps.push({ label: 'Initial array', array: [...arr], sortedIdx: [] })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    steps.push({
      label: `Pass ${i + 1}: assume min is arr[${i}]=${arr[i]}`,
      array: [...arr],
      compare: [i, minIdx],
      sortedIdx: [...sorted],
    })
    for (let j = i + 1; j < n; j++) {
      steps.push({
        label: `Compare arr[${j}]=${arr[j]} with current min arr[${minIdx}]=${arr[minIdx]}`,
        array: [...arr],
        compare: [j, minIdx],
        sortedIdx: [...sorted],
      })
      if (arr[j] < arr[minIdx]) {
        minIdx = j
        steps.push({
          label: `New min found: arr[${minIdx}]=${arr[minIdx]}`,
          array: [...arr],
          compare: [minIdx],
          sortedIdx: [...sorted],
        })
      }
    }
    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      steps.push({
        label: `Swap arr[${i}] and arr[${minIdx}] → arr[${i}]=${arr[i]}`,
        array: [...arr],
        swap: [i, minIdx],
        sortedIdx: [...sorted],
      })
    }
    sorted.push(i)
    steps.push({
      label: `arr[${i}]=${arr[i]} is in final position`,
      array: [...arr],
      sortedIdx: [...sorted],
    })
  }
  sorted.push(n - 1)
  steps.push({ label: 'Array sorted ✓', array: [...arr], sortedIdx: Array.from({ length: n }, (_, i) => i) })

  return { steps, result: arr }
}

// ---- Insertion Sort ---------------------------------------------------------

export function insertionSort(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []

  steps.push({ label: 'Initial array', array: [...arr], sortedIdx: [0] })

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1
    steps.push({
      label: `Pick key=${key} at index ${i}`,
      array: [...arr],
      compare: [i],
      sortedIdx: Array.from({ length: i }, (_, k) => k),
    })
    while (j >= 0 && arr[j] > key) {
      steps.push({
        label: `arr[${j}]=${arr[j]} > key=${key} → shift right`,
        array: [...arr],
        compare: [j, j + 1],
        sortedIdx: Array.from({ length: i }, (_, k) => k),
      })
      arr[j + 1] = arr[j]
      j--
      steps.push({
        label: `Shifted. Array now: [${arr.join(', ')}]`,
        array: [...arr],
        sortedIdx: Array.from({ length: i }, (_, k) => k),
      })
    }
    arr[j + 1] = key
    steps.push({
      label: `Insert key=${key} at index ${j + 1}`,
      array: [...arr],
      swap: [j + 1],
      sortedIdx: Array.from({ length: i + 1 }, (_, k) => k),
    })
  }
  steps.push({ label: 'Array sorted ✓', array: [...arr], sortedIdx: Array.from({ length: n }, (_, i) => i) })

  return { steps, result: arr }
}

// ---- Merge Sort ---------------------------------------------------------------

export function mergeSort(input) {
  const arr = [...input]
  const steps = []

  steps.push({ label: 'Initial array', array: [...arr], sortedIdx: [] })

  function merge(lo, mid, hi) {
    const left = arr.slice(lo, mid + 1)
    const right = arr.slice(mid + 1, hi + 1)
    steps.push({
      label: `Merge halves [${left.join(',')}] and [${right.join(',')}]`,
      array: [...arr],
      range: [lo, hi],
    })
    let i = 0,
      j = 0,
      k = lo
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k] = left[i]
        i++
      } else {
        arr[k] = right[j]
        j++
      }
      steps.push({
        label: `Place ${arr[k]} at index ${k}`,
        array: [...arr],
        swap: [k],
        range: [lo, hi],
      })
      k++
    }
    while (i < left.length) {
      arr[k] = left[i]
      steps.push({ label: `Place remaining ${arr[k]} at index ${k}`, array: [...arr], swap: [k], range: [lo, hi] })
      i++
      k++
    }
    while (j < right.length) {
      arr[k] = right[j]
      steps.push({ label: `Place remaining ${arr[k]} at index ${k}`, array: [...arr], swap: [k], range: [lo, hi] })
      j++
      k++
    }
  }

  function sort(lo, hi) {
    if (lo >= hi) return
    const mid = Math.floor((lo + hi) / 2)
    steps.push({ label: `Split [${lo}..${hi}] at mid=${mid}`, array: [...arr], range: [lo, hi] })
    sort(lo, mid)
    sort(mid + 1, hi)
    merge(lo, mid, hi)
  }

  sort(0, arr.length - 1)
  steps.push({ label: 'Array sorted ✓', array: [...arr], sortedIdx: Array.from({ length: arr.length }, (_, i) => i) })

  return { steps, result: arr }
}

// ---- Quick Sort -----------------------------------------------------------------

export function quickSort(input) {
  const arr = [...input]
  const steps = []

  steps.push({ label: 'Initial array', array: [...arr], sortedIdx: [] })

  function partition(lo, hi) {
    const pivot = arr[hi]
    steps.push({ label: `Pivot = arr[${hi}] = ${pivot}`, array: [...arr], compare: [hi], range: [lo, hi] })
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      steps.push({
        label: `Compare arr[${j}]=${arr[j]} with pivot=${pivot}`,
        array: [...arr],
        compare: [j, hi],
        range: [lo, hi],
      })
      if (arr[j] < pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        steps.push({
          label: `arr[${j}] < pivot → swap arr[${i}] and arr[${j}]`,
          array: [...arr],
          swap: [i, j],
          range: [lo, hi],
        })
      }
    }
    ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
    steps.push({
      label: `Place pivot at index ${i + 1}`,
      array: [...arr],
      swap: [i + 1, hi],
      range: [lo, hi],
    })
    return i + 1
  }

  function sort(lo, hi) {
    if (lo < hi) {
      const p = partition(lo, hi)
      sort(lo, p - 1)
      sort(p + 1, hi)
    }
  }

  sort(0, arr.length - 1)
  steps.push({ label: 'Array sorted ✓', array: [...arr], sortedIdx: Array.from({ length: arr.length }, (_, i) => i) })

  return { steps, result: arr }
}

export const SORT_INFO = {
  bubble: { name: 'Bubble Sort', complexity: 'O(n²) time · O(1) space', fn: bubbleSort },
  selection: { name: 'Selection Sort', complexity: 'O(n²) time · O(1) space', fn: selectionSort },
  insertion: { name: 'Insertion Sort', complexity: 'O(n²) time · O(1) space', fn: insertionSort },
  merge: { name: 'Merge Sort', complexity: 'O(n log n) time · O(n) space', fn: mergeSort },
  quick: { name: 'Quick Sort', complexity: 'O(n log n) avg · O(n²) worst · O(log n) space', fn: quickSort },
}

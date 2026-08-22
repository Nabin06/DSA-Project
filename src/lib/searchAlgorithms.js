// steps: [{ label, array, compare?: number[], found?: boolean, range?: [lo,hi] }]

// ---- Linear Search -----------------------------------------------------------
// O(n) time · O(1) space — scans left to right, no ordering required.

export function linearSearch(input, target) {
  const arr = [...input]
  const steps = []
  let foundIdx = -1

  steps.push({ label: `Searching for ${target} — scan left to right`, array: [...arr] })

  for (let i = 0; i < arr.length; i++) {
    steps.push({ label: `Compare arr[${i}]=${arr[i]} with target=${target}`, array: [...arr], compare: [i] })
    if (arr[i] === target) {
      foundIdx = i
      steps.push({ label: `Match! Found ${target} at index ${i}`, array: [...arr], compare: [i], found: true })
      break
    }
  }
  if (foundIdx === -1) {
    steps.push({ label: `${target} not found in array`, array: [...arr], found: false })
  }

  return { steps, result: foundIdx }
}

// ---- Binary Search -------------------------------------------------------------
// O(log n) time · O(1) space — requires a SORTED array. Halves the search
// range each step by comparing the target to the middle element.

export function binarySearch(input, target) {
  const arr = [...input].sort((a, b) => a - b) // binary search requires sorted input
  const steps = []
  let lo = 0
  let hi = arr.length - 1
  let foundIdx = -1

  steps.push({ label: `Array sorted for binary search: [${arr.join(', ')}]`, array: [...arr], range: [lo, hi] })

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    steps.push({
      label: `Range [${lo}..${hi}] → mid=${mid}, arr[${mid}]=${arr[mid]}`,
      array: [...arr],
      compare: [mid],
      range: [lo, hi],
    })
    if (arr[mid] === target) {
      foundIdx = mid
      steps.push({ label: `Match! Found ${target} at index ${mid}`, array: [...arr], compare: [mid], found: true, range: [lo, hi] })
      break
    } else if (arr[mid] < target) {
      steps.push({ label: `arr[${mid}]=${arr[mid]} < target=${target} → search right half`, array: [...arr], compare: [mid], range: [lo, hi] })
      lo = mid + 1
    } else {
      steps.push({ label: `arr[${mid}]=${arr[mid]} > target=${target} → search left half`, array: [...arr], compare: [mid], range: [lo, hi] })
      hi = mid - 1
    }
  }
  if (foundIdx === -1) {
    steps.push({ label: `${target} not found in array`, array: [...arr], found: false })
  }

  return { steps, result: foundIdx, sortedArray: arr }
}

export const SEARCH_INFO = {
  linear: { name: 'Linear Search', complexity: 'O(n) time · O(1) space · no ordering required', fn: linearSearch },
  binary: { name: 'Binary Search', complexity: 'O(log n) time · O(1) space · requires sorted array', fn: binarySearch },
}

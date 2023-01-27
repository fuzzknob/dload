type Fn = () => void | Promise<void>

const functions: Fn[] = []

let hasInitialized = false

export function waitToInitialize(fn: Fn) {
  if (hasInitialized) {
    // eslint-disable-next-line
    fn()
    return
  }
  functions.push(fn)
}

export async function initialize() {
  for (const fn of functions) {
    await fn()
  }
  hasInitialized = true
}

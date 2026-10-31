function clearKeys() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith('rr-'))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    return
  }
}

export function resetDemo() {
  clearKeys()
  window.location.assign('/')
}
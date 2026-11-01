import type { Preferences } from '../utils/planner'

export type PlannerSession = {
  prefs: Preferences
  days: string[][]
}

const SESSION_KEY = 'rr-planner-session-v2'
const OPTIMIZE_KEY = 'rr-optimize-request'

export function loadSession(): PlannerSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as PlannerSession) : null
  } catch {
    return null
  }
}

export function saveSession(session: PlannerSession) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    return
  }
}

export function requestOptimize() {
  try {
    localStorage.setItem(OPTIMIZE_KEY, '1')
  } catch {
    return
  }
}

export function consumeOptimizeRequest(): boolean {
  try {
    const pending = localStorage.getItem(OPTIMIZE_KEY) === '1'
    localStorage.removeItem(OPTIMIZE_KEY)
    return pending
  } catch {
    return false
  }
}
import { monthlyUsage as defaults } from '../data/hotel'
import type { MonthlyUsage } from '../types/hotel'

const KEY = 'rr-usage'

export const monthOrder = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']

export function loadUsage(): MonthlyUsage[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as MonthlyUsage[]) : defaults
  } catch {
    return defaults
  }
}

export function saveUsage(data: MonthlyUsage[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    return
  }
}

export function resetUsage() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    return
  }
}
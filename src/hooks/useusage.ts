 import { useState } from 'react'
import { monthlyUsage as defaults } from '../data/hotel'
import { loadUsage, monthOrder, resetUsage, saveUsage } from '../services/usageStore'
import type { MonthlyUsage } from '../types/hotel'

export function useUsage() {
  const [usage, setUsage] = useState<MonthlyUsage[]>(loadUsage)

  function addMonth(entry: MonthlyUsage) {
    const next = [...usage.filter((item) => item.month !== entry.month), entry].sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month),
    )
    saveUsage(next)
    setUsage(next)
  }

  function reset() {
    resetUsage()
    setUsage(defaults)
  }

  return { usage, addMonth, reset }
}

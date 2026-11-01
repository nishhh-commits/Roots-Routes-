import { areaActions, indicatorActions, metricActions } from '../data/actions'
import { usageUnits } from '../data/hotel'
import type { MonthlyUsage } from '../types/hotel'
import type { Breakdown, Indicator } from '../types/sustainability'

export type Attention = {
  id: string
  level: 'watch' | 'info'
  observation: string
  basis: string
  action: string
}

const keys = ['water', 'energy', 'waste'] as const
const names = { water: 'Water use', energy: 'Energy use', waste: 'Waste' }

export function buildAttention(usage: MonthlyUsage[], indicators: Indicator[], breakdowns: Breakdown[]): Attention[] {
  const items: Attention[] = []

  if (usage.length >= 2) {
    const previous = usage[usage.length - 2]
    const latest = usage[usage.length - 1]
    keys.forEach((key) => {
      if (latest[key] > previous[key]) {
        const pct = Math.round(((latest[key] - previous[key]) / previous[key]) * 1000) / 10
        items.push({
          id: `rise-${key}`,
          level: 'watch',
          observation: `${names[key]} rose ${pct}% compared with ${previous.month}.`,
          basis: `${previous[key]} to ${latest[key]} ${usageUnits[key]}`,
          action: metricActions[key],
        })
      }
    })
    if (!keys.some((key) => latest[key] > previous[key])) {
      items.push({
        id: 'all-down',
        level: 'info',
        observation: `Water, energy and waste all fell compared with ${previous.month}.`,
        basis: `Latest month: ${latest.month}`,
        action: 'Keep the current practices and log next month to confirm the trend.',
      })
    }
  }

  indicators.forEach((indicator) => {
    const off = indicator.higherIsBetter ? indicator.value < indicator.target : indicator.value > indicator.target
    if (off) {
      items.push({
        id: `target-${indicator.id}`,
        level: 'watch',
        observation: `${indicator.label} is ${indicator.value}${indicator.unit}, against a target of ${indicator.target}${indicator.unit}.`,
        basis: 'Sustainability indicator',
        action: indicatorActions[indicator.id] ?? 'Review this indicator with your team.',
      })
    }
  })

  breakdowns.forEach((breakdown) => {
    const total = breakdown.items.reduce((sum, item) => sum + item.value, 0)
    const top = breakdown.items.reduce((a, b) => (a.value >= b.value ? a : b))
    const share = Math.round((top.value / total) * 100)
    items.push({
      id: `top-${breakdown.key}`,
      level: 'info',
      observation: `${top.name} is the largest share of ${breakdown.key} use at ${share}%.`,
      basis: `${top.value} of ${total} ${breakdown.unit} (demo breakdown)`,
      action: areaActions[`${breakdown.key}:${top.name}`] ?? `Start the review with ${top.name.toLowerCase()}.`,
    })
  })

  return items.sort((a, b) => (a.level === b.level ? 0 : a.level === 'watch' ? -1 : 1))
}
import type { Reading, ResourceType } from '../types/reading'

export type ResourceSummary = {
  resource: ResourceType
  latest: Reading
  previous: Reading | null
  changePct: number | null
  total: number
  count: number
}

const resources: ResourceType[] = ['water', 'energy', 'waste']

export function summariseFeed(readings: Reading[]) {
  const sorted = [...readings].sort((a, b) => a.recordedAt.localeCompare(b.recordedAt))
  const latest = sorted.length > 0 ? sorted[sorted.length - 1] : null
  const perResource: ResourceSummary[] = []

  resources.forEach((resource) => {
    const list = sorted.filter((item) => item.resource === resource)
    if (list.length === 0) {
      return
    }
    const last = list[list.length - 1]
    const previous = list.length > 1 ? list[list.length - 2] : null
    perResource.push({
      resource,
      latest: last,
      previous,
      changePct: previous ? Math.round(((last.value - previous.value) / previous.value) * 1000) / 10 : null,
      total: Math.round(list.reduce((sum, item) => sum + item.value, 0) * 100) / 100,
      count: list.length,
    })
  })

  return { latest, perResource }
}
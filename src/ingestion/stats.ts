import type { Reading, ReadingResource } from '../types/reading'

export type ResourceSummary = {
  resource: ReadingResource
  count: number
  total: number
  average: number
  latest: Reading
  previous: Reading | null
  changePct: number | null
}

export type FeedSummary = {
  totalReadings: number
  latest: Reading | null
  perResource: ResourceSummary[]
}

const resources: ReadingResource[] = ['water', 'energy', 'waste']

function sortNewestFirst(readings: Reading[]): Reading[] {
  return [...readings].sort(
    (a, b) =>
      new Date(b.recordedAt).getTime() -
      new Date(a.recordedAt).getTime(),
  )
}

export function summariseFeed(readings: Reading[]): FeedSummary {
  const sorted = sortNewestFirst(readings)

  const perResource: ResourceSummary[] = resources.flatMap((resource) => {
    const matching = sorted.filter(
      (reading) => reading.resource === resource,
    )

    if (matching.length === 0) return []

    const latest = matching[0]
    const previous = matching[1] ?? null

    const total = matching.reduce(
      (sum, reading) => sum + reading.value,
      0,
    )

    const changePct =
      previous && previous.value !== 0
        ? Math.round(
            ((latest.value - previous.value) / previous.value) * 100,
          )
        : null

    return [{
      resource,
      count: matching.length,
      total,
      average: total / matching.length,
      latest,
      previous,
      changePct,
    }]
  })

  return {
    totalReadings: sorted.length,
    latest: sorted[0] ?? null,
    perResource,
  }
}
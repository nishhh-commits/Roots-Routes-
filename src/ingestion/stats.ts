import type { Reading, ReadingResource } from '../types/reading'

export type ResourceSummary = {
  resource: ReadingResource
  count: number
  total: number
  average: number
  unit: string
}

export type FeedSummary = {
  totalReadings: number
  perResource: ResourceSummary[]
}

export function summariseFeed(readings: Reading[]): FeedSummary {
  const resources: ReadingResource[] = [
    'water',
    'energy',
    'waste',
  ]

  const perResource: ResourceSummary[] = resources.map((resource) => {
    const matchingReadings = readings.filter(
      (reading) => reading.resource === resource,
    )

    const total = matchingReadings.reduce(
      (sum, reading) => sum + reading.value,
      0,
    )

    return {
      resource,
      count: matchingReadings.length,
      total,
      average:
        matchingReadings.length > 0
          ? total / matchingReadings.length
          : 0,
      unit: matchingReadings[0]?.unit ?? '',
    }
  })

  return {
    totalReadings: readings.length,
    perResource,
  }
}